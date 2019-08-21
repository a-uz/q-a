import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

import '../styles/Header.css';

function Header() {
  return (
    <header className="mainHeader">
      <div>
        <Link to="/">
          <h1>Q&A</h1>
        </Link>
        <Link to="/questions/new">
          <Button>Ask question</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
