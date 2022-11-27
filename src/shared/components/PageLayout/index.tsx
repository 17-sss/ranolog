import {commonPxValues, commonWidthCss, findPrevStyledValue} from '../../styles';
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
        <div css={mainInnerCss}>{children}</div>
      </main>
      {/* FOOTER */}
    </div>
  );
};

export default PageLayout;

const layoutCss: CssProp = systemCss({
  '& > *': {px: commonPxValues},
});
const mainCss: CssProp = (theme) => {
  const PADDING_BOTTOM = ['1.5rem', null, '2rem'];
  return systemCss({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,

    pt: HEADER_HEIGHTS,
    pb: PADDING_BOTTOM,
    minHeight: HEADER_HEIGHTS.map(
      (headerHeight, idx) =>
        `calc(100vh - (${headerHeight ?? 0} + ${findPrevStyledValue(PADDING_BOTTOM, idx)}))`,
    ),
  });
};
const mainInnerCss: CssProp = [commonWidthCss, systemCss({mt: '1rem'})];
