import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Q&A</h1>
      <Link to="/questions/new">Ask question</Link>
    </header>
  );
}

export default Header;
