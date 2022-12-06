import React, {useMemo} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {rgba} from 'polished';

import {
  changeFirstCharUpperCase,
  CssProp,
  CustomCode,
  ProjectDocument,
  systemCss,
  Typography,
} from '@src/shared';

export interface ProjectInfoProps extends Omit<ProjectDocument, 'content' | 'extension' | 'id'> {}

const isExternalLink = (href: string) => /^http/.test(href);

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  subject,
  date,
  skills,
  category,
  links,
  summary,
  thumbnail,
  ...props
}) => {
  const periodText = useMemo(() => {
    const createDateText = (aDate: string | number | Date) => {
      return new Date(aDate).toLocaleDateString().replace(/(\s+|\.$)/g, '');
    };
    if (typeof date === 'object') {
      const {start, end} = date;
      return `${createDateText(start)} ~ ${end ? createDateText(end) : 'ing..'}`;
    }
    return createDateText(date);
  }, [date]);

  const linkNodes = useMemo(() => {
    return links?.reduce((result, {text, href}, i) => {
      if (!href) {
        return result;
      }
      const linkNode = isExternalLink(href) ? (
        <a key={i} css={linkCss} href={href} rel="noreferrer" target="_blank">
          {text}
        </a>
      ) : (
        <Link key={i} href={href} passHref legacyBehavior>
          <a css={linkCss}>{text}</a>
        </Link>
      );
      result.push(linkNode);
      return result;
    }, [] as React.ReactNode[]);
  }, [links]);

  return (
    <div css={containerCss} {...props}>
      <Typography backgroundColor="green" color="green" variant="h2">
        {subject}
      </Typography>

      <div css={infoBoxCss}>
        <dl css={textListCss}>
          <div css={textItemCss}>
            <dt>Period</dt>
            <dd>
              <CustomCode color="orange">{periodText}</CustomCode>
            </dd>
          </div>
          {skills && skills.length > 0 && (
            <div css={textItemCss}>
              <dt>Skills</dt>
              <dd>
                {skills.map((skill, idx) => (
                  <CustomCode key={idx}>{skill}</CustomCode>
                ))}
              </dd>
            </div>
          )}
          <div css={textItemCss}>
            <dt>Category</dt>
            <dd>
              <Typography isBold color={category.type === 'project' ? 'blue' : 'green'}>
                {changeFirstCharUpperCase(category.type)}
              </Typography>
              {category.isTeam && <span>&nbsp;{'(Team)'}</span>}
            </dd>
          </div>
          {linkNodes && (
            <div css={textItemCss}>
              <dt>Links</dt>
              <dd>{linkNodes}</dd>
            </div>
          )}
          {summary && (
            <div css={textItemCss}>
              <dt>Summary</dt>
              <dd>{summary}</dd>
            </div>
          )}
        </dl>
        {thumbnail && (
          <div css={thumbnailBoxCss}>
            <Image src={thumbnail} alt="thumbnail_image" fill />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '0.5rem',
  },
});

const infoBoxCss: CssProp = systemCss({
  display: 'flex',
  flexDirection: ['column-reverse', 'row'],
  justifyContent: ['normal', 'space-between'],
  alignItems: 'center',
  rowGap: ['1rem', 'normal'],
});

const textListCss: CssProp = systemCss({
  flexGrow: [0, 3],
  width: '100%',
  '& > * + *': {
    mt: '0.5rem',
  },
});
const textItemCss: CssProp = systemCss({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.5rem',

  '@media screen and (max-width: 374px)': {
    display: 'block',
  },

  dt: {
    minWidth: '5rem',
    fontWeight: 'bold',
  },
  dd: {
    flex: '1 1 0',

    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flexWrap: 'wrap',
  },
});

const thumbnailBoxCss: CssProp = systemCss({
  flexGrow: [0, 2],
  width: '100%',
  maxWidth: ['none', '18.75rem'],
  position: 'relative',
  aspectRatio: '16/9',
  overflow: 'hidden',
});

const linkCss: CssProp = (theme) =>
  systemCss({
    color: theme.colors.gray500,
    borderBottom: `1px solid ${rgba(theme.colors.gray500, 0.5)}`,
    fontWeight: 'bold',
    textDecoration: 'none',
    outline: 'none',
    opacity: 0.7,
  });
