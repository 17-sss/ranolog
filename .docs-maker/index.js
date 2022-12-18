const {getResultAnswers, execFileMaker} = require('./core');

const execDocsMaker = async () => {
  try {
    const answers = await getResultAnswers();
    execFileMaker(answers);
  } catch (e) {
    console.error(e);
  }
};

execDocsMaker();
