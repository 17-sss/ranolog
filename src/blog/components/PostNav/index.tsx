import {rgba} from 'polished';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';

import {CssProp, PostDocument, singleLineEllipsis, systemCss} from '@src/shared';

export type PostDocumentSummaryInfo = Pick<PostDocument, 'id' | 'subject'>;
export interface PostNavProps {
  prevDocInfo?: PostDocumentSummaryInfo;
  nextDocInfo?: PostDocumentSummaryInfo;
  onNavButtonClick: (id: string) => void;
}

const PostNav: React.FC<PostNavProps> = ({
  prevDocInfo,
  nextDocInfo,
  onNavButtonClick,
  ...props
}) => {
  return (
    <nav css={containerCss} {...props}>
      {[prevDocInfo, nextDocInfo].map((aPostDoc, idx) => {
        if (!aPostDoc) {
          return <div key={idx} />;
        }
        const isPrev = idx % 2 === 0;
        return (
          <button key={idx} css={postButtonCss} onClick={() => onNavButtonClick(aPostDoc.id)}>
            <p css={postTextCss} className="type">
              {isPrev && <FiArrowLeft />}
              <span>{isPrev ? 'Previous' : 'Next'}</span>
              {isPrev || <FiArrowRight />}
            </p>
            <p css={postTextCss} className="subject">
              <span>{aPostDoc.subject}&nbsp;</span>
            </p>
          </button>
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

const postButtonCss: CssProp = (theme) =>
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
