/* CREATE MARKDOWN */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const {createFrontMatter} = require('./frontMatter');

const docsDir = path.join(process.cwd(), 'docs');
// ---

// [CONSTANTS] ===============================
const createSuccessMessage = (filePath, language) => {
  const messages = {
    Korean: [
      '문서 생성이 완료되었습니다. 내용을 작성해주세요.',
      `${chalk.bold.blue('[문서 경로]')}: ${filePath}`,
    ],
    English: [
      'Document creation complete. Please fill out the contents.',
      `${chalk.bold.blue('[Document path]')}: ${filePath}`,
    ],
  };
  return messages[language].join('\n');
};

// [FUNCTIONS] ===============================
const createDirectory = (dir) => {
  try {
    if (fs.existsSync(dir)) {
      return;
    }
    fs.mkdirSync(dir, {recursive: true});
  } catch (e) {
    console.error(e);
  }
};

const createFile = (filePath, data = '') => {
  try {
    fs.writeFileSync(filePath, data);
  } catch (e) {
    console.error(e);
  }
};

const getFilePath = (aTargetFolder, aExtension, aFileName) => {
  try {
    const fileName = `${aFileName}.${aExtension}`;
    const filePath = path.join(aTargetFolder, fileName);
    return filePath;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const execFileMaker = (answers) => {
  try {
    const {language, extension, format, fileName, ...restAnswers} = answers;
    const targetFolder = path.join(docsDir, `${format.toLowerCase()}s`);
    createDirectory(targetFolder);
    const filePath = getFilePath(targetFolder, extension, fileName);
    const frontMatter = createFrontMatter(restAnswers);
    createFile(filePath, frontMatter);

    const successMessage = createSuccessMessage(filePath, language);
    const separatorText = chalk.yellow.bold('-'.repeat(30));
    console.log(`${separatorText}\n${successMessage}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {execFileMaker};
