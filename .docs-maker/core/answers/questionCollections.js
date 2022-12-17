/* CREATE ==> inquirer.QuestionCollection */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const docsDir = path.join(process.cwd(), 'docs');
// ---

// [CONSTANTS] ===============================
const requiredText = `${chalk.red('*')}`;

// 1) LANGUAGE -----------
const languageCollection = {
  type: 'list',
  name: 'language',
  message: 'Please select a language.',
  choices: ['Korean', 'English'],
};

// 2) BASIC -----------
const basicMessageInfo = {
  Korean: {
    extension: {message: '마크다운 파일의 확장자를 선택해주세요.', prefix: requiredText},
    format: {message: '문서 형식을 선택해주세요.', prefix: requiredText},
  },
  English: {
    extension: {message: 'Please select the extension of the markdown file.', prefix: requiredText},
    format: {message: 'Please select a document type.', prefix: requiredText},
  },
};

// 3-1) FORMAT : COMMON -----------
const FORMAT_SUFFIX = {
  getMultipleInput: (addString) => ({
    Korean: ['다수 입력 가능', `${' '}${chalk.bold.yellow('|')} 구분 기호를 사용`, addString]
      .filter((v) => v)
      .join(chalk.bold.gray(' :: ')),
    English: [
      'Multiple categories can be entered.',
      `Use ${chalk.bold.yellow('|')} as a delimiter.`,
      addString,
    ]
      .filter((v) => v)
      .join(chalk.bold.gray(' :: ')),
  }),
  getVaildDate: (addString) => ({
    Korean: [`${chalk.bgWhite('yyyy.mm.dd')} 형식으로 입력해주세요.`, addString]
      .filter((v) => v)
      .join(chalk.bold.gray(' :: ')),
    English: [`Please enter in the format ${chalk.bgWhite('yyyy.mm.dd')}.`, addString]
      .filter((v) => v)
      .join(chalk.bold.gray(' :: ')),
  }),
  noEndDate: {
    Korean: `입력하지 않을 시, "${chalk.bgCyan('~ing')}"로 표시됩니다.`,
    English: `If not entered, "${chalk.bgCyan('~ing')}" is displayed.`,
  },
  enterLink: {
    Korean: `${chalk.bgWhite('[Title](link)')} 형식으로 작성`,
    English: `Write in ${chalk.bgWhite('[Title](link)')} format`,
  },
};

const commonFormatMessageInfo = {
  Korean: {
    fileName: {message: '파일명을 입력해주세요.', prefix: requiredText},
    subject: {message: '제목을 입력해주세요.', prefix: requiredText},
    summary: {message: '요약 내용을 입력해주세요.'},
  },
  English: {
    fileName: {message: 'Please enter a file name.', prefix: requiredText},
    subject: {message: 'Please enter the subject.', prefix: requiredText},
    summary: {message: 'Please enter a summary.'},
  },
};

// 3-1) FORMAT : Post -----------
const postFormatMessageInfo = {
  Korean: {
    date: {
      message: '날짜를 입력해주세요.',
      prefix: requiredText,
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getVaildDate().Korean}\n${' '}`,
    },
    category: {
      message: '카테고리를 입력해주세요.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().Korean}\n${' '}`,
    },
    thumbnail: {message: '썸네일 이미지 경로(path)를 등록해주세요.'},
  },
  English: {
    date: {
      message: 'Please enter a date.',
      prefix: requiredText,
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getVaildDate().English}\n${' '}`,
    },
    category: {
      message: 'Please enter a category.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().English}\n${' '}`,
    },
    thumbnail: {message: 'Please register the thumbnail image path.'},
  },
};

// 3-2) FORMAT : Project -----------
const projectFormatMessageInfo = {
  Korean: {
    startDate: {
      message: '프로젝트 시작 날짜를 입력해주세요.',
      prefix: requiredText,
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getVaildDate().Korean}\n${' '}`,
    },
    endDate: {
      message: '프로젝트 종료 날짜를 입력해주세요.',
      suffix: `\n${chalk.blue('->')}${' '}${
        FORMAT_SUFFIX.getVaildDate(FORMAT_SUFFIX.noEndDate.Korean).Korean
      }\n${' '}`,
    },
    skills: {
      message: '사용한 기술들을 작성해주세요.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().Korean}\n${' '}`,
    },
    projectType: {message: '프로젝트 타입을 선택해주세요.', prefix: requiredText},
    isTeam: {message: '다른 사람들과 함께 만들었나요?'},
    links: {
      message: '관련 Link 정보를 입력해주세요.',
      suffix: `\n${chalk.blue('->')}${' '}${
        FORMAT_SUFFIX.getMultipleInput(FORMAT_SUFFIX.enterLink.Korean).Korean
      }\n${' '}`,
    },
    thumbnail: {message: '썸네일 이미지 경로(path)를 등록해주세요.'},
  },
  English: {
    startDate: {
      message: 'Please enter the project start date.',
      prefix: requiredText,
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getVaildDate().English}\n${' '}`,
    },
    endDate: {
      message: 'Please enter a project end date.',
      suffix: `\n${chalk.blue('->')}${' '}${
        FORMAT_SUFFIX.getVaildDate(FORMAT_SUFFIX.noEndDate.English).English
      }\n${' '}`,
    },
    skills: {
      message: 'Please write down the skills you used.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().English}\n${' '}`,
    },
    projectType: {message: 'Please select a project type.', prefix: requiredText},
    isTeam: {message: 'Did you make it with others?'},
    links: {
      message: 'Please enter related links.',
      suffix: `\n${chalk.blue('->')}${' '}${
        FORMAT_SUFFIX.getMultipleInput(FORMAT_SUFFIX.enterLink.English).English
      }\n${' '}`,
    },
    thumbnail: {message: 'Please register the thumbnail image path.'},
  },
};

// 3-3) FORMAT : Resume -----------
const resumeFormatMessageInfo = {
  Korean: {
    name: {message: '자신의 이름을 입력하세요.', prefix: requiredText},
    job: {message: '직업을 입력해주세요.', prefix: requiredText},
    email: {message: '이메일을 입력해주세요.'},
    introduce: {
      message: '간단한 소개를 입력해주세요.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().Korean}\n${' '}`,
    },
  },
  English: {
    name: {message: 'Please enter your name.', prefix: requiredText},
    job: {message: 'Please enter your job.', prefix: requiredText},
    email: {message: 'Please enter your email.'},
    introduce: {
      message: 'Please enter a brief introduction.',
      suffix: `\n${chalk.blue('->')}${' '}${FORMAT_SUFFIX.getMultipleInput().English}\n${' '}`,
    },
  },
};

// [FUNCTIONS : COMMON] ===============================
const isFileExist = (filePath) => fs.existsSync(filePath);
const isValidDateText = (dateText) => {
  const REGEX_DATE = /\d{4}[\/|\-|\.]\d{2}[\/|\-|\.]\d{2}/;
  const date = new Date(dateText);
  return REGEX_DATE.test(dateText) && date instanceof Date && !isNaN(date);
};
const removeSpaces = (text) => text.replace(/\s+/g, '');

const createValidate = (language) => async (value) => {
  if (!removeSpaces(value)) {
    return language === 'English' ? 'Please enter a value.' : '값을 입력해주세요.';
  }
  return true;
};

const createFileValidate = (language, docsFolderName, extension) => async (value) => {
  if (!removeSpaces(value)) {
    return commonFormatMessageInfo[language]['fileName'].message;
  }
  const fileName = path.join(docsDir, docsFolderName, `${value}.${extension}`);
  if (isFileExist(fileName)) {
    return language === 'English'
      ? 'The same file exists. Please enter again.'
      : '같은 파일이 존재합니다. 다시 입력해주세요.';
  }
  return true;
};

const createDateValidate =
  (language, noValueMessage, isRequired = true) =>
  async (value) => {
    const removeSpacesValue = removeSpaces(value);
    if (!removeSpacesValue && isRequired) {
      return noValueMessage;
    }
    if (removeSpacesValue && !isValidDateText(value)) {
      return language === 'English'
        ? 'Invalid date information. Please enter again.'
        : '잘못된 날짜 정보입니다. 다시 입력해주세요.';
    }
    return true;
  };

// [FUNCTIONS : CREATE COLLECTION] ===============================
// 1) BASIC -----------
const createBasicCollections = (language) => {
  const messageInfo = basicMessageInfo[language];
  return [
    {...messageInfo['extension'], name: 'extension', type: 'list', choices: ['mdx', 'md']},
    {
      ...messageInfo['format'],
      name: 'format',
      type: 'list',
      choices: ['Post', 'Project', 'Resume'],
    },
  ];
};

// 2-1) FORMAT : COMMON -----------
const createCommonFormatCollections = (language, docsFolderName, extension) => {
  const messageInfo = commonFormatMessageInfo[language];
  return [
    {
      ...messageInfo['fileName'],
      name: 'fileName',
      type: 'input',
      validate: createFileValidate(language, docsFolderName, extension),
    },
    {
      ...messageInfo['subject'],
      name: 'subject',
      type: 'input',
      validate: createValidate(language),
    },
    {...messageInfo['summary'], name: 'summary', type: 'input'},
  ];
};

// 2-2) FORMAT : POST -----------
const createPostFormatCollections = (extension) => (language) => {
  const messageInfo = postFormatMessageInfo[language];
  return [
    ...createCommonFormatCollections(language, 'posts', extension),
    {
      ...messageInfo['date'],
      name: 'date',
      type: 'input',
      validate: createDateValidate(language, messageInfo['date'].message),
    },
    {
      ...messageInfo['category'],
      name: 'category',
      type: 'input',
    },
    {...messageInfo['thumbnail'], name: 'thumbnail', type: 'input'},
  ];
};

// 2-2) FORMAT : Project -----------
const createProjectFormatCollections = (extension) => (language) => {
  const messageInfo = projectFormatMessageInfo[language];
  return [
    ...createCommonFormatCollections(language, 'projects', extension),
    {
      ...messageInfo['startDate'],
      name: 'startDate',
      type: 'input',
      validate: createDateValidate(language, messageInfo['startDate'].message),
    },
    {
      ...messageInfo['endDate'],
      name: 'endDate',
      type: 'input',
      validate: createDateValidate(language, messageInfo['endDate'].messsage, false),
    },
    {
      ...messageInfo['skills'],
      name: 'skills',
      type: 'input',
    },
    {
      ...messageInfo['projectType'],
      name: 'projectType',
      type: 'list',
      choices: ['project', 'library'],
    },
    {
      ...messageInfo['isTeam'],
      name: 'isTeam',
      type: 'confirm',
    },
    {
      ...messageInfo['links'],
      name: 'links',
      type: 'input',
    },
    {...messageInfo['thumbnail'], name: 'thumbnail', type: 'input'},
  ];
};

const createResumeFormatCollections = (extension) => (language) => {
  const messageInfo = resumeFormatMessageInfo[language];
  return [
    ...createCommonFormatCollections(language, 'resumes', extension),
    {...messageInfo['name'], name: 'name', type: 'input', validate: createValidate(language)},
    {...messageInfo['job'], name: 'job', type: 'input', validate: createValidate(language)},
    {...messageInfo['email'], name: 'email', type: 'input'},
    {...messageInfo['introduce'], name: 'introduce', type: 'input'},
  ];
};

module.exports = {
  languageCollection,
  createBasicCollections,
  createPostFormatCollections,
  createProjectFormatCollections,
  createResumeFormatCollections,
};
