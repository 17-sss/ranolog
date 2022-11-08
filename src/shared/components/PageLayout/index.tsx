import {commonWidthCss, findPrevStyledValue} from '../../styles';
import {CssProp, systemCss} from '../../system';
import Header, {HEADER_HEIGHTS} from '../Header';

export interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children, ...props}) => {
  return (
    <div css={layoutCss} {...props}>
      <Header css={commonWidthCss} />
      <main css={mainCss}>
        <div className="inner">{children}</div>
      </main>
    </div>
  );
};

export default PageLayout;

const layoutCss: CssProp = systemCss({
  height: '100%',
  overflow: 'auto',
});

const mainCss: CssProp = (theme) => {
  const MAIN_PY = ['1.5rem', null, '2rem'];
  return systemCss({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    py: MAIN_PY,

    minHeight: HEADER_HEIGHTS.map(
      (headerHeight, idx) =>
        `calc(100% - (${headerHeight ?? 0} + (${findPrevStyledValue(MAIN_PY, idx)} * 2)))`,
    ),
    '.inner': [commonWidthCss],
  });
};
