import React from 'react';

import chevronup from '../assets/chevron-up.svg';
import chevrondown from '../assets/chevron-down.svg';

import '../styles/Vote.css';

function Vote({ count = 0, onUpvote, onDownvote }) {
  return (
    <div className="votes">
      <button type="button" onClick={onUpvote}>
        <img src={chevronup} alt="Upvote question" />
      </button>
      <p>{count}</p>
      <button type="button" onClick={onDownvote}>
        <img src={chevrondown} alt="Downvote question" />
      </button>
    </div>
  );
}

export default Vote;
