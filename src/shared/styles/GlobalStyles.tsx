import {Global, css} from '@emotion/react';

import {theme} from '../theme';

const resetCss = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const defaultCss = css`
  html,
  body {
    width: 100%;
    height: 100%;
    font-size: ${theme.fontSizes.p16};
  }
  body {
    font-family: Pretendard, 'Noto Sans KR', 'Roboto', Lato, sans-serif;
    line-height: 1.6;
    letter-spacing: -0.04em;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button,
  textarea {
    padding: 0;
    font-size: ${theme.fontSizes.p16}; /* firefox */
    background-color: transparent;
    border: none;
    outline: none;
  }
  button {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  #__next,
  body > #root /* storybook only */ {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 374px) {
    html {
      font-size: ${theme.fontSizes.p14};
    }
  }
`;

export const GlobalStyles = () => {
  return <Global styles={[resetCss, defaultCss]} />;
};
