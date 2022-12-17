const {getResultAnswers} = require('./core');

const execDocsMaker = async () => {
  try {
    const answers = await getResultAnswers();
    console.log(answers);
  } catch (e) {
    console.error(e);
  }
};

execDocsMaker();
