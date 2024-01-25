import {ForwardedRef, forwardRef, Fragment, useEffect, useMemo, useState} from 'react';

import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {rgba} from 'polished';

import {
  CustomCode,
  CustomLink,
  Divider,
  FlexBox,
  MdxImage,
  Typography,
  TypographyProps,
} from '../../components';
import {markdownToHtml} from '../../functions';
import {CssProp, systemCss} from '../../system';

export interface MarkdownRendererProps {
  content?: string | MDXRemoteSerializeResult;
}

const MarkdownRenderer = (
  {content, ...props}: MarkdownRendererProps,
  ref?: ForwardedRef<HTMLDivElement>,
) => {
  const [tempContent, setTempContent] = useState(content);

  const finalContent = useMemo(() => {
    if (typeof content === 'string') {
      return tempContent;
    }
    return content;
  }, [content, tempContent]);

  useEffect(() => {
    const updateTempContent = async () => {
      if (typeof content !== 'string') return;
      setTempContent(await markdownToHtml(content));
    };
    updateTempContent();
  }, [content]);

  if (!finalContent || typeof finalContent === 'string') {
    return null;
  }

  return (
    <div ref={ref} css={containerCss} {...props}>
      <MDXRemote
        {...finalContent}
        components={{
          a: ({href, children}) => (
            <CustomLink href={href ?? ''} defaultStyle>
              {children}
            </CustomLink>
          ),
          img: ({src, alt}) => (
            <MdxImage css={imageBoxCss} as="span" src={src ?? ''} alt={alt ?? ''} priority />
          ),
          table: ({children}) => (
            <div css={tableBoxCss}>
              <table css={tableCss}>{children}</table>
            </div>
          ),
          CustomLink,
          CustomCode,
          Typography: ({...props}: TypographyProps) => <Typography {...props} useHeadingId />,
          Divider,
          FlexBox,
          Fragment,
        }}
      />
    </div>
  );
};

export default forwardRef<HTMLDivElement, MarkdownRendererProps>(MarkdownRenderer);

const containerCss: CssProp = (theme) =>
  systemCss({
    p: {
      py: '0.1875rem',
    },
    em: {
      fontStyle: 'italic',
    },
    'strong, h1, h2, h3, h4, h5, h6': {
      fontWeight: 600,
    },
    h1: {
      fontSize: theme.fontSizes.p32,
    },
    h2: {
      fontSize: theme.fontSizes.p28,
    },
    h3: {
      fontSize: theme.fontSizes.p24,
    },
    h4: {
      fontSize: theme.fontSizes.p20,
    },
    h5: {
      fontSize: theme.fontSizes.p18,
    },
    'h6, p': {
      fontSize: theme.fontSizes.p16,
    },
    '.ml--double': {
      ml: '2.5rem',
    },
    'ol, ul': {
      ml: '1.25rem',
      py: '0.4rem',
      listStyle: 'revert',
      '&.alpha': {
        listStyle: 'lower-alpha',
      },
      '& > li + li': {
        mt: '0.2rem',
      },
    },
    'ol li::marker': {
      fontWeight: 500,
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
    '*:not(pre) > code': {
      backgroundColor: 'rgba(135, 131, 120, 0.15)',
      borderRadius: '0.1875rem',
      fontSize: '90%',
      p: '0.25rem', // 0.25rem 0.45rem
      color: 'rgba(212, 76, 71, 1)',
    },
    /** Markdown "> blah blah.." */
    blockquote: {
      my: '0.5rem', // 0.75rem
      py: '0.3125rem',
      px: '0.9375rem',
      backgroundColor: rgba(theme.colors.gray100, 0.8),
      borderLeft: `0.25rem solid ${theme.colors.gray300}`,
    },
    'li > blockquote': {mt: '0.25rem'},
  });

const imageBoxCss: CssProp = systemCss({display: 'block'});

const tableBoxCss: CssProp = systemCss({
  overflowX: 'auto',
  table: {minWidth: '40rem'},
});

const tableCss: CssProp = () => {
  const colorBorderDefault = '#d0d7de';
  const colorCanvasDefault = '#ffffff';
  const colorBorderMuted = 'hsla(210,18%,87%,1)';
  const colorCanvasSubtle = '#f6f8fa';
  return systemCss({
    borderSpacing: 0,
    borderCollapse: 'collapse',
    display: 'block',
    width: 'max-content',
    maxWidth: '100%',
    overflow: 'auto',
    marginTop: 0,
    marginBottom: ['0.5rem', null, 0],
    '& th': {
      fontWeight: 600,
    },
    '& th, & td': {
      padding: '0.375rem 0.8125rem',
      border: `1px solid ${colorBorderDefault}`,
    },
    '& tr': {
      backgroundColor: `${colorCanvasDefault}`,
      borderTop: `1px solid ${colorBorderMuted}`,
    },
    '& tr:nth-of-type(2n)': {
      backgroundColor: colorCanvasSubtle,
    },
    '& img': {
      backgroundColor: 'transparent',
    },
  });
};
