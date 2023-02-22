import React, {useState} from 'react';

const SimpleStates = () => {
  const [show, setShow] = useState(false);

  const onButtonClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <h1>Simple States</h1>

      <button onClick={onButtonClick}>Toggle</button>

      {show && <p>I'm visible now!</p>}
    </div>
  )
};

export default SimpleStates;
