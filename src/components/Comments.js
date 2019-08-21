import React from 'react';
import formatDistanceNow from 'date-fns/formatDistanceToNow';

import Form from './Form';

import { getComments, saveComment } from '../storage';

import '../styles/Comments.css';

function Comments({ questionId }) {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const commentsFromStorage = await getComments(Number(questionId));

      if (!ignore) {
        setComments(commentsFromStorage);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [questionId, loading]);

  async function onSaveComment(title, description, imageURL) {
    await saveComment(questionId, title, description, imageURL);
    // Reload comments
    setLoading(true);
  }

  return (
    <div className="comments">
      <h3>Post a comment</h3>
      <Form onSubmitCallback={onSaveComment} />
      {!loading && comments.length === 0 ? (
        <>
          <h3>No comments here</h3>
          <p>Be the first one to respond!</p>
        </>
      ) : (
        <>
          <h3>Comments</h3>
          {comments.map(({ id, title, created, description, imageURL }) => (
            <div key={id} className="comment">
              <b>{title}</b>
              {!!description && <p>{description}</p>}
              {!!imageURL && (
                <a href={imageURL} rel="noopener noreferrer" target="_blank">
                  Link to image
                </a>
              )}
              <p>{`${formatDistanceNow(new Date(created))} ago`}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
