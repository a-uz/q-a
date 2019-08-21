import React from 'react';

import Form from './Form';

import { saveQuestion } from '../storage';

function NewQuestion({ history }) {
  async function onSubmit(title, description, imageURL) {
    const questionId = await saveQuestion(title, description, imageURL);

    history.push(`/questions/${questionId}`);
  }

  return (
    <div>
      <h1>New question</h1>
      <Form onSubmitCallback={onSubmit} />
    </div>
  );
}

export default NewQuestion;
