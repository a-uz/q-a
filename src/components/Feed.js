import React from 'react';
import { Link } from 'react-router-dom';
import formatDistanceNow from 'date-fns/formatDistanceToNow';

import Vote from './Vote';

import { getQuestions, updateQuestionVoteCount } from '../storage';

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
      const questionsFromStorage = await getQuestions();
      setQuestions(questionsFromStorage.reverse());
      setLoading(false);
    };

    fetchData();
  }, [loading]);

  if (!loading && questions.length === 0) {
    return <EmptyFeed />;
  }

  async function upvote(id) {
    await updateQuestionVoteCount(id, 1);
    // Reload feed
    setLoading(true);
  }

  async function downvote(id) {
    await updateQuestionVoteCount(id, -1);
    // Reload feed
    setLoading(true);
  }

  return (
    <div>
      {questions.map(({ id, title, created, votes }) => (
        <div key={id} className="questionContainer">
          <Vote
            count={votes}
            onUpvote={() => upvote(id)}
            onDownvote={() => downvote(id)}
          />
          <div className="question">
            <p>Posted {formatDistanceNow(new Date(created))} ago</p>
            <Link to={`/questions/${id}`}>
              <b>{title}</b>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
