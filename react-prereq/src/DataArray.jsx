import React, {useState} from 'react';

// There is an issue - submitting the form doesnt seem to add the name into the list

const DataArray = () => {
  const data = [
    'Bob',
    'Alice',
    'Eve',
    'Tan Ah Kao',
  ];
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // What happens if this is not added here?

    if (!name) return;

    data.push(name);
    setName('');
  }

  return (
    <>
      <h1>List of Names</h1>

      <form onSubmit={onSubmit}>
        <input type="text" id="name" placeholder="Type a name" value={name} onChange={e => setName(e.target.value)}/> 
        <input type="submit" value="Add Name" />
      </form>

      <div>
        <ul>
          {data.map((d, index) => <li key={index}>{d}</li>)}
        </ul>
      </div>
    </>
  );
}

export default DataArray;
