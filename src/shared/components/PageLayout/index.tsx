import {PropsWithChildren} from 'react';

import {staticDataInfo} from '@root/ranolog.config';

import {commonPxValues, commonWidthCss, findPrevStyledValue} from '../../styles';
import {CssProp, systemCss} from '../../system';
import Footer, {FOOTER_HEIGHTS} from '../Footer';
import Header, {HEADER_HEIGHTS} from '../Header';

const layoutStaticData = staticDataInfo.layout;

export interface PageLayoutProps extends PropsWithChildren {}

const PageLayout: React.FC<PageLayoutProps> = ({children, ...props}) => {
  return (
    <div css={layoutCss} {...props}>
      <Header
        css={commonWidthCss}
        linkNames={['home', 'blog', 'projects', 'resume']}
        profileImage={layoutStaticData.header.profileImage}
      />
      <main css={mainCss}>
        <div css={mainInnerCss}>{children}</div>
      </main>
      <Footer css={commonWidthCss} {...layoutStaticData.footer} />
    </div>
  );
};

export default PageLayout;

const layoutCss: CssProp = systemCss({
  '& > *': {px: commonPxValues},
});
const mainCss: CssProp = (theme) =>
  systemCss({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,

    pt: HEADER_HEIGHTS,
    minHeight: HEADER_HEIGHTS.map((headerHeight, idx) => {
      const footerHeight = findPrevStyledValue(FOOTER_HEIGHTS, idx);
      return `calc(100vh - (${headerHeight ?? 0} + ${footerHeight}))`;
    }),
  });

const mainInnerCss: CssProp = [commonWidthCss, systemCss({mt: '1.25rem', mb: '2rem'})];
