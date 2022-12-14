import Image from 'next/image';
import Link from 'next/link';

import {commonBlurDataURL, CssProp, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectListProps {
  projectDocs: ProjectDocument[];
}

const ProjectList: React.FC<ProjectListProps> = ({projectDocs, ...props}) => {
  return (
    <ul css={listCss} {...props}>
      {projectDocs.map(({id, subject, summary, thumbnail}, idx) => {
        return (
          <li key={idx} css={itemCss}>
            <Link href={`/projects/${id}`} passHref legacyBehavior>
              <a css={linkCss}>
                <div css={thumbnailBoxCss(thumbnail ? 'cover' : 'contain')}>
                  <Image
                    src={thumbnail || '/no-pictures.png'}
                    alt={`${subject} (thumbnail)`}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={commonBlurDataURL}
                  />
                </div>

                <dl css={textListCss}>
                  <div css={textItemCss}>
                    <dt>Subject</dt>
                    <dd>{subject}</dd>
                  </div>
                  {summary && (
                    <div css={textItemCss}>
                      <dt>Summary</dt>
                      <dd>{summary}</dd>
                    </div>
                  )}
                </dl>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectList;

const listCss: CssProp = systemCss({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
  gridTemplateColumns: [`repeat(1, 1fr)`, `repeat(2, 1fr)`],
  gap: '1rem',
});

const itemCss: CssProp = (theme) =>
  systemCss({
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.gray200}`,
    borderRadius: '0.5rem',
    '&:hover': {
      boxShadow: `0 3px 15px rgb(0 0 0 / 20%)`,
    },
  });

const linkCss: CssProp = systemCss({
  px: '1rem',
  py: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  rowGap: '1rem',
});

const thumbnailBoxCss: (objectFit: 'contain' | 'cover') => CssProp = (objectFit) => (theme) =>
  systemCss({
    position: 'relative',
    aspectRatio: '16/9',
    overflow: 'hidden',
    img: {
      objectFit,
    },
  });

const textListCss: CssProp = systemCss({
  '& > * + *': {
    mt: '0.5rem',
  },
});
const textItemCss: CssProp = systemCss({
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.5rem',
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
  },
});
