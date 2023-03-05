const forms = require('forms');
// https://www.npmjs.com/package/forms
const express = require('express');

const { fields, validators } = forms;

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @param {*} callback 
 */
const passwordValidator = (form, field, callback) => {
  // Check if there's digits
  if (!field.value.match(/\d/)) {
    return callback('Need at least 1 digit');
  }

  // Check if there's alphabets
  if (!field.value.match(/[a-zA-Z]/)) {
    return callback('Need at least 1 letter');
  }

  // Check for special characters
  if (!field.value.match(/[\.,!@#$]/)) {
    return callback('Need at least 1 special character (. , ! @ # $)');
  }

  callback();
}

const createForm = () => forms.create({
  username: fields.string({
    required: true,
  }),
  password: fields.password({
    required: true,
    validators: [
      validators.minlength(8, 'Need at least 8 characters'),
      passwordValidator,
    ],
  }),
  confirm: fields.password({
    required: true,
    validators: [validators.matchField('password', 'Passwords do not match')],
  }),
});

const indexHTML = (formHTML) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Demo Forms</title>
  </head>

  <body>
    <form method="POST">
      ${formHTML}

      <input type="submit"/>
    </form>
  </body>
</html>
`;

const successHTML = (username) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Demo Forms</title>
  </head>

  <body>
    <h1>Successfully signed up ${username}</h1>
  </body>
</html>
`;


// ------------------ SERVER ----------------------

// Setup the server
const app = express();

// We just wanna render a simple HTML page with forms for this example, so no need
// some handlebar stuff.
app.get('/', (_, res) => {
  const signUpForm = createForm();
  res.send(indexHTML(signUpForm.toHTML()));
});

app.post('/', (req, res) => {
  const signUpForm = createForm();
  signUpForm.handle(req, {
    success: form => {
      // there is a request and the form is valid
      // form.data contains the submitted data
      res.send(successHTML(form.data.username));
    },
    error: form => {
      // the data in the request didn't validate,
      // calling form.toHTML() again will render the error messages
      res.send(indexHTML(form.toHTML()));
    },
    empty: form => {
      // there was no form data in the request
      res.send(indexHTML(form.toHTML()));
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});