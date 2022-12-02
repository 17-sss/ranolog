import {rgba} from 'polished';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';

import {DefaultDocument} from '../../../lib';
import {singleLineEllipsis} from '../../styles';
import {CssProp, systemCss} from '../../system';

export type DocumentSummaryInfo<TDoc extends DefaultDocument = DefaultDocument> = Pick<
  TDoc,
  'id' | 'subject'
>;
export interface DocNavProps<TDoc extends DefaultDocument = DefaultDocument> {
  prevDoc?: DocumentSummaryInfo<TDoc>;
  nextDoc?: DocumentSummaryInfo<TDoc>;
  onNavButtonClick: (id: string) => void;
}

const DocNav = <TDoc extends DefaultDocument = DefaultDocument>({
  prevDoc,
  nextDoc,
  onNavButtonClick,
  ...props
}: DocNavProps<TDoc>) => {
  return (
    <nav css={containerCss} {...props}>
      {[prevDoc, nextDoc].map((aDoc, idx) => {
        if (!aDoc) {
          return <div key={idx} />;
        }
        const isPrev = idx % 2 === 0;
        return (
          <button key={idx} css={navButtonCss} onClick={() => onNavButtonClick(aDoc.id)}>
            <p css={docTextCss} className="type">
              {isPrev && <FiArrowLeft />}
              <span>{isPrev ? 'Previous' : 'Next'}</span>
              {isPrev || <FiArrowRight />}
            </p>
            <p css={docTextCss} className="subject">
              <span>{aDoc.subject}&nbsp;</span>
            </p>
          </button>
        );
      })}
    </nav>
  );
};

export default DocNav;

const containerCss: CssProp = systemCss({
  display: 'flex',
  flexDirection: ['column', 'row'],
  alignItems: ['normal', 'center'],
  justifyContent: ['center', 'space-between'],
  rowGap: ['0.5rem', 'normal'],
});

const navButtonCss: CssProp = (theme) =>
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

const docTextCss: CssProp = (theme) =>
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
