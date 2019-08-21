import React from 'react';

import '../styles/Button.css';

function Button({ id, children }) {
  return (
    <button id={id} type="button" className="btn">
      {children}
    </button>
  );
}

export default Button;
