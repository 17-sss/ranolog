import {rgba} from 'polished';

import {CssProp, systemCss} from '../../system';

export interface MarkdownRendererProps {
  contentHtml: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({contentHtml, ...props}) => {
  return <div css={containerCss} dangerouslySetInnerHTML={{__html: contentHtml}} {...props} />;
};

export default MarkdownRenderer;

const containerCss: CssProp = (theme) =>
  systemCss({
    p: {
      py: '0.1875rem',
    },
    em: {
      fontStyle: 'italic',
    },
    'strong, h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
    },
    '*:not(br) + h1, *:not(br) + h2, *:not(br) + h3, *:not(br) + h4, *:not(br) + h5, *:not(br) + h6':
      {
        mt: '1.5rem',
      },
    h1: {
      fontSize: [theme.fontSizes.p28, theme.fontSizes.p32],
    },
    h2: {
      fontSize: [theme.fontSizes.p24, theme.fontSizes.p28],
    },
    h3: {
      fontSize: [theme.fontSizes.p20, theme.fontSizes.p24],
    },
    h4: {
      fontSize: [theme.fontSizes.p18, theme.fontSizes.p20],
    },
    h5: {
      fontSize: [theme.fontSizes.p16, theme.fontSizes.p18],
    },
    'h6, p': {
      fontSize: [theme.fontSizes.p14, theme.fontSizes.p16],
    },

    'ol, ul': {
      ml: '1.25rem',
      py: '0.4rem',
      listStyle: 'revert',
      '&.alpha': {
        listStyle: 'lower-alpha',
      },
    },

    hr: {
      border: 'none',
      boxShadow: `0 0 0 0.1px ${theme.colors.black}`,
      my: '0.75rem',
      '&.thin': {
        boxShadow: `0 0 0 0.04px ${theme.colors.black}`,
        my: '0.25rem',
      },
    },

    a: {
      color: theme.colors.gray500,
      borderBottom: `1px solid ${rgba(theme.colors.gray500, 0.5)}`,
      fontWeight: 'bold',
      textDecoration: 'none',
      outline: 'none',
      opacity: 0.7,
    },

    /** normal `code`  */
    '*:not(pre) > code': {
      fontFamily: `'SFMono-Regular', Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace`,
      backgroundColor: 'rgba(135, 131, 120, 0.15)',
      borderRadius: '0.1875rem',
      fontSize: '85%',
      p: '0.25rem 0.45rem',
      color: 'rgba(212, 76, 71, 1)',
    },

    /** Markdown "> blah blah.." */
    blockquote: {
      my: '0.75rem',
      py: '0.3125rem',
      px: '0.9375rem',
      backgroundColor: rgba(theme.colors.gray100, 0.8),
      borderLeft: `0.25rem solid ${theme.colors.gray300}`,
    },

    table: {
      my: '0.5rem',
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },
    tr: {
      backgroundColor: theme.colors.white,
      '&:nth-of-type(2n)': {
        backgroundColor: theme.colors.gray100,
      },
      th: {
        fontWeight: 'bold',
      },
      'th, td': {
        py: '0.5rem',
        px: '1rem',
        border: `1px solid ${rgba(theme.colors.gray300, 0.8)}`,
      },
    },
  });
