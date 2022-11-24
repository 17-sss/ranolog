import {useMemo} from 'react';

import Link from 'next/link';
import {rgba} from 'polished';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';

import {CssProp, PostDocument, singleLineEllipsis, systemCss} from '@shared';

export interface PostNavProps {
  nextDoc?: PostDocument;
  prevDoc?: PostDocument;
}

const PostNav: React.FC<PostNavProps> = ({nextDoc, prevDoc, ...props}) => {
  const isExistPrevOrNext = useMemo(() => {
    return [nextDoc, prevDoc].some((v) => v);
  }, [nextDoc, prevDoc]);

  if (!isExistPrevOrNext) {
    return null;
  }

  return (
    <nav css={containerCss}>
      {[prevDoc, nextDoc].map((aPostDoc, idx) => {
        if (!aPostDoc) {
          return <div key={idx} />;
        }
        const isPrev = idx % 2 === 0;
        return (
          <Link key={idx} href={`/blog/${aPostDoc.id}`} passHref legacyBehavior>
            <a css={postLinkCss}>
              <p css={postTextCss} className="type">
                {isPrev && <FiArrowLeft />}
                <span>{isPrev ? 'Previous' : 'Next'}</span>
                {isPrev || <FiArrowRight />}
              </p>
              <p css={postTextCss} className="subject">
                <span>{aPostDoc.subject}</span>
              </p>
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export default PostNav;

const containerCss: CssProp = systemCss({
  display: 'flex',
  flexDirection: ['column', 'row'],
  alignItems: ['normal', 'center'],
  justifyContent: ['center', 'space-between'],
  rowGap: ['0.5rem', 'normal'],
});

const postLinkCss: CssProp = (theme) =>
  systemCss({
    px: '1rem',
    py: '1.25rem',
    border: `1px solid ${theme.colors.gray300}`,
    borderRadius: '0.25rem',
    background: `linear-gradient(${theme.colors.white}, ${theme.colors.gray100})`,
    width: ['auto', '30%'],

    '&:hover': {
      background: `linear-gradient(${theme.colors.white}, ${rgba(theme.colors.gray200, 0.8)})`,
    },
  });

const postTextCss: CssProp = (theme) =>
  systemCss({
    display: 'flex',
    alignItems: 'center',
    '&.type': {
      color: rgba(theme.colors.gray400, 0.8),
      fontWeight: 'bold',
      fontStyle: 'italic',
      columnGap: '0.25rem',
    },
    '&.subject': {
      color: theme.colors.gray700,
      fontWeight: 500,
      span: [singleLineEllipsis],
    },
  });