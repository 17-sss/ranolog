import React, {useMemo} from 'react';

import Image from 'next/image';

import {
  changeFirstCharUpperCase,
  CssProp,
  CustomCode,
  ProjectDocument,
  systemCss,
  Typography,
  CustomLink,
  createDateText,
  commonBlurDataURL,
} from '@src/shared';

export interface ProjectInfoProps extends Omit<ProjectDocument, 'content' | 'extension' | 'id'> {}

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
    if (typeof date === 'object') {
      const {start, end} = date;
      return `${createDateText(start)} ~ ${end ? createDateText(end) : 'ing..'}`;
    }
    return createDateText(date);
  }, [date]);

  const linkNodes = useMemo(() => {
    if (!links || links.length === 0) {
      return;
    }
    return links.map(({href, text}, idx) => {
      if (!href) {
        return;
      }
      return (
        <CustomLink key={idx} href={href}>
          {text}
        </CustomLink>
      );
    });
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
            <Image
              src={thumbnail}
              alt="thumbnail_image"
              fill
              priority
              placeholder="blur"
              blurDataURL={commonBlurDataURL}
            />
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
    fontWeight: 600,
  },
  dd: {
    flex: '1 1 0',

    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flexWrap: 'wrap',

    lineHeight: 1.2,
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
