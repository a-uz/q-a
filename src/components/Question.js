import React from 'react';

import NotFound from './NotFound';

import { getQuestion } from '../storage';

function Question({ match }) {
  const id = Number(match.params.id);

  const [question, setQuestion] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const questionFromStorage = await getQuestion(id);
      setLoading(false);

      if (!questionFromStorage) {
        setNotFound(true);
        return;
      }

      setQuestion(questionFromStorage);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return null;
  }

  if (!loading && notFound) {
    return <NotFound />;
  }

  const { title, created, description, imageURL } = question;

  return (
    <div>
      <h2>{title}</h2>
      <p>Posted: {new Date(created).toLocaleDateString()}</p>
      {!!imageURL && (
        <a href={imageURL} rel="noopener noreferrer" target="_blank">
          Link to image
        </a>
      )}
      {!!description && <p>{description}</p>}
    </div>
  );
}

export default Question;
