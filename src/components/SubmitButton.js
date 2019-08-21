import React from 'react';

import '../styles/Button.css';

function SubmitButton({ id, children }) {
  return (
    <button id={id} type="submit" className="btn">
      {children}
    </button>
  );
}

export default SubmitButton;
