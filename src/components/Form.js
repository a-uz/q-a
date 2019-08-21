import React from 'react';

import Input from './Input';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';

import '../styles/Form.css';

function Form({ onSubmitCallback }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();

    // Since this form will be reused, saving the data
    // will be handled in a HOC
    onSubmitCallback(title, description, imageURL);

    // Reset state
    setTitle('');
    setDescription('');
    setImageURL('');
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <Input
          id="title"
          type="text"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Textarea
          id="description"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          optional
        />
        <Input
          id="imageURL"
          type="url"
          label="Image URL"
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
          optional
        />
      </div>
      <div>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}

export default Form;
