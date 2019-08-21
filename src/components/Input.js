import React from 'react';
import classNames from 'classnames';

import '../styles/Input.css';

function Input({
  id,
  type,
  label,
  value,
  optional,
  onChange,
  onBlur,
  error,
  required = false
}) {
  const inputClassnames = classNames({ errorOutline: !!error });

  return (
    <div className="input">
      <label htmlFor={id}>
        <span>
          {label}
          {optional && <i> optional</i>}
        </span>
        <input
          id={id}
          className={inputClassnames}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      </label>
      {!!error && <p className="errorText">{error}</p>}
    </div>
  );
}

export default Input;
