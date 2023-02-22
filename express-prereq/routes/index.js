const {Router} = require('express');

const router = Router();

router.get('/', (_, res) => {
  res.render('index.hbs', {name: 'World'});
});
router.get('/signup', (_, res) => {
  res.render('signup.hbs');
})

router.post('/signup', (req, res) => {
  const {username, password} = req.body;

  console.log(`Attempted signup: ${username} ${password}`);
  
  res.render('signup.hbs', {success: true});
})

module.exports = router;