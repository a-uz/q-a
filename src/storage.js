import { openDB } from 'idb';

const QuestionsDB = openDB('Questions', 1, {
  // Called if this version of the database has never been opened before
  // Used to specify the schema for the database
  upgrade: upgradeDB => {
    // const question = {
    //   id: '1',
    //   created: '2019-08-17T15:55:53.463Z',
    //   title: 'Sample title',
    //   description: "Sample description",
    //   votes: 1,
    //   imageURL: 'https://www.example.com/assets/image.jpg'
    // };

    const questionsStore = upgradeDB.createObjectStore('questions', {
      keyPath: 'id',
      autoIncrement: true
    });

    questionsStore.createIndex('created', 'created');

    // const comment = {
    //   id: 1,
    //   questionId: 1,
    //   created: '2019-08-17T15:56:23.164Z',
    //   title: 'Sample title',
    //   description: "Sample description",
    //   votes: 1,
    //   imageURL: 'https://www.example.com/assets/image.jpg'
    // };

    const commentsStore = upgradeDB.createObjectStore('comments', {
      keyPath: 'id',
      autoIncrement: true
    });

    commentsStore.createIndex('questionId', 'questionId');
    commentsStore.createIndex('created', 'created');
  }
});

/**
 * Get all questions
 */
async function getQuestions() {
  const db = await QuestionsDB;
  const questions = await db.getAllFromIndex('questions', 'created');

  return questions;
}

/**
 * Get question
 * @param {number} id
 */
async function getQuestion(id) {
  const db = await QuestionsDB;

  return db.get('questions', id);
}

/**
 * Save question
 * @param {string} title
 * @param {string} [description]
 * @param {string} [imageURL]
 */
async function saveQuestion(title, description, imageURL) {
  const db = await QuestionsDB;
  const question = {
    title,
    created: new Date().toISOString()
  };

  if (description) {
    question.description = description;
  }

  if (imageURL) {
    question.imageURL = imageURL;
  }

  return db.add('questions', question);
}

/**
 * Update vote count for the question
 * @param {number} questionId
 * @param {number} by increment or decrement
 */
async function updateQuestionVoteCount(questionId, by) {
  const db = await QuestionsDB;
  const tx = db.transaction('questions', 'readwrite');

  const question = await tx.store.get(questionId);

  tx.store.put({ ...question, votes: (question.votes || 0) + by });

  await tx.done;
}

/**
 * Get all comments for the question
 * @param {number} questionId
 */
async function getComments(questionId) {
  const db = await QuestionsDB;
  const comments = db.getAllFromIndex('comments', 'questionId', questionId);

  // TODO: sort by 'created' index
  return comments;
}

/**
 * Save question
 * @param {number} questionId
 * @param {string} title
 * @param {string} [description]
 * @param {string} [imageURL]
 */
async function saveComment(questionId, title, description, imageURL) {
  const db = await QuestionsDB;
  const comment = {
    questionId,
    title,
    created: new Date().toISOString()
  };

  if (description) {
    comment.description = description;
  }

  if (imageURL) {
    comment.imageURL = imageURL;
  }

  return db.add('comments', comment);
}

/**
 * Update vote count for the comment
 * @param {number} commentId
 * @param {number} by increment or decrement
 */
async function updateCommentVoteCount(commentId, by) {
  const db = await QuestionsDB;
  const tx = db.transaction('comments', 'readwrite');

  const question = await tx.store.get(commentId);

  tx.store.put({ ...question, votes: (question.votes || 0) + by });

  await tx.done;
}

export {
  getQuestions,
  getQuestion,
  saveQuestion,
  updateQuestionVoteCount,
  getComments,
  saveComment,
  updateCommentVoteCount
};
