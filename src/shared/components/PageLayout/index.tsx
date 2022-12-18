import {configData} from '@root/ranolog.config';

import {commonPxValues, commonWidthCss, findPrevStyledValue} from '../../styles';
import {CssProp, systemCss} from '../../system';
import Footer, {FOOTER_HEIGHTS} from '../Footer';
import Header, {HEADER_HEIGHTS} from '../Header';

export interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children, ...props}) => {
  return (
    <div css={layoutCss} {...props}>
      <Header css={commonWidthCss} {...configData.header} />
      <main css={mainCss}>
        <div css={mainInnerCss}>{children}</div>
      </main>
      <Footer css={commonWidthCss} {...configData.footer} />
    </div>
  );
};

export default PageLayout;

const layoutCss: CssProp = systemCss({
  '& > *': {px: commonPxValues},
});
const mainCss: CssProp = (theme) => {
  const MARGIN_BOTTOM = '6.25rem';
  return systemCss({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,

    pt: HEADER_HEIGHTS,
    mb: MARGIN_BOTTOM,
    minHeight: HEADER_HEIGHTS.map((headerHeight, idx) => {
      const footerHeight = findPrevStyledValue(FOOTER_HEIGHTS, idx);
      return `calc(100vh - (${headerHeight ?? 0} + ${MARGIN_BOTTOM} + ${footerHeight}))`;
    }),
  });
};
const mainInnerCss: CssProp = [commonWidthCss, systemCss({mt: '1rem'})];
