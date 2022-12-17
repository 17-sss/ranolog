const inquirer = require('inquirer');

const {
  languageCollection,
  createBasicCollections,
  createPostFormatCollections,
  createProjectFormatCollections,
  createResumeFormatCollections,
} = require('./questionCollections');

const prompt = inquirer.createPromptModule();

const getAnswer = async (collection) => {
  const name = collection['name'];
  const answer = await prompt(collection);
  return answer[name];
};

const getAnswers = async (collections) => {
  const result = {};
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    result[collection['name']] = await getAnswer(collection);
  }
  return result;
};

const getFormatAnswers = async (language, formatType, extension) => {
  const collectionFuncs = {
    post: createPostFormatCollections(extension),
    project: createProjectFormatCollections(extension),
    resume: createResumeFormatCollections(extension),
  };
  const collectionFunc = collectionFuncs[formatType.toLowerCase()];
  const result = await getAnswers(collectionFunc(language));
  return result;
};

const getResultAnswers = async () => {
  try {
    const language = await getAnswer(languageCollection);
    const basicAnswers = await getAnswers(createBasicCollections(language));
    const formatAnswers = await getFormatAnswers(
      language,
      basicAnswers.format,
      basicAnswers.extension,
    );
    const result = {...basicAnswers, ...formatAnswers};
    return result;
  } catch (e) {
    console.error(e);
    return {};
  }
};

module.exports = {getResultAnswers};
