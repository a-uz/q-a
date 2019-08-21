import React from 'react';

import '../styles/Textarea.css';

function Textarea({ id, type, label, value, optional, onChange, cols, rows }) {
  return (
    <div className="textarea">
      <label htmlFor={id}>
        <span>
          {label}
          {optional && <i> optional</i>}
        </span>
        <textarea
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          cols={cols}
          rows={rows}
        />
      </label>
    </div>
  );
}

export default Textarea;
