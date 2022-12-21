const {format} = require('date-fns');

// COMMON -------------------------
const createDeduplicatedArray = (array) => {
  const set = new Set(array);
  return Array.from(set);
};

const createDateText = (aDate) => {
  const currentDate = aDate ? new Date(aDate) : new Date();
  return format(new Date(currentDate), 'yyyy-MM-dd');
};

// DATA -------------------------
const createSplitTexts = (text, splitter = '|') =>
  createDeduplicatedArray(text.split(splitter).filter((v) => v));

const createSplitTextsForLink = (text, splitter = '|') => {
  const createLinks = (aSplitTexts) => {
    const REGEX_LINK = /\[(?<text>[^\[]+)\]\((?<href>.*)\)/g;
    return aSplitTexts.reduce((result, mdLinkText) => {
      const match = [...mdLinkText.matchAll(REGEX_LINK)];
      if (!match || match.length === 0) {
        return result;
      }
      const {text, href} = match[0].groups;
      result.push({text, href});
      return result;
    }, []);
  };
  const splitTexts = createSplitTexts(text, splitter);
  return createLinks(splitTexts);
};

const createObjectMatter = (aAnswers) => {
  const result = {};
  for (const key in aAnswers) {
    const value = aAnswers[key];
    switch (key) {
      case 'date': /* post : date */ {
        result[key] = createDateText(value);
        break;
      }
      case 'startDate': /* project : date.start */
      case 'endDate': /* project : date.end */ {
        const isDate = key === 'startDate' || (key === 'endDate' && !!value);
        const currKey = key.replace(/date/i, '');
        if (!('date' in result)) {
          result['date'] = {};
        }
        result['date'][currKey] = isDate ? createDateText(value) : value;
        break;
      }

      case 'projectType': /* project : category.type */
      case 'isTeam': /* project : category.isTeam */ {
        let currKey = key;
        if (currKey === 'projectType') {
          currKey = 'type';
        }
        if (!('category' in result)) {
          result['category'] = {};
        }
        result['category'][currKey] = value;
        break;
      }
      case 'category': /* post : category */
      case 'skills': /* project : skills */
      case 'introduce': /* resume : introduce */ {
        result[key] = createSplitTexts(value);
        break;
      }
      case 'links': /* project : links */ {
        result[key] = createSplitTextsForLink(value);
        break;
      }
      case 'thumbnail': /* post & project : thumbnail */ {
        if (/^\//.test(value)) {
          result[key] = value;
          break;
        }
        result[key] = value ? `/${value}` : value;
        break;
      }
      default: /* 일반 Text */ {
        result[key] = value;
        break;
      }
    }
  }
  return result;
};

const convertObjectMatterToText = (objectMatter) => {
  const resultTexts = [];
  const objectMatterText = JSON.stringify(objectMatter, null, 2);
  const texts = objectMatterText.split(/\n/g);
  texts.forEach((text) => {
    if (/^[\{|\}]/.test(text)) {
      resultTexts.push('---');
      return;
    }
    const removeSpaceText = text.replace(/^\s{2}/g, '');
    const removeDoubleQuotedFromKey = removeSpaceText.replace(/(?:\")(\w+)(?:\")(\:)/g, '$1$2');
    const isNotSpacesFront = !/^\s+/.test(removeDoubleQuotedFromKey);
    if (isNotSpacesFront) {
      const deleteLastCommaText = removeDoubleQuotedFromKey.replace(/\,$/g, '');
      return resultTexts.push(deleteLastCommaText);
    }
    resultTexts.push(removeDoubleQuotedFromKey);
  });
  return resultTexts.join('\n');
};

const createFrontMatter = (answers) => {
  const objectMatter = createObjectMatter(answers);
  const result = convertObjectMatterToText(objectMatter);
  return result;
};

module.exports = {createFrontMatter};
