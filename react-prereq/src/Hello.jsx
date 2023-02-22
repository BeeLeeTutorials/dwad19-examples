import React from 'react';
import {Link} from 'react-router-dom';

const Hello = ({name}) => (
  <div>
    <h1>Hello {name}!</h1>

    <ul>
      <li><Link to={'simple-states'}>Simple States</Link></li>
    </ul>
  </div>
)

export default Hello;
