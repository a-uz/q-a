import React from 'react';
import { Link } from 'react-router-dom';

import { getQuestions } from '../storage';

import '../styles/Feed.css';

function EmptyFeed() {
  return (
    <div className="emptyFeed">
      <h1>No questions here</h1>
      <p>Be the first one to ask!</p>
    </div>
  );
}

function Feed() {
  const [loading, setLoading] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setQuestions(await getQuestions());
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!loading && questions.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div>
      {questions.map(({ id, title, created }) => (
        <div key={id} className="question">
          <p>Posted: {new Date(created).toLocaleString()}</p>
          <Link to={`/questions/${id}`}>
            <b>{title}</b>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Feed;
