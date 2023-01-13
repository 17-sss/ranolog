import {ForwardedRef, forwardRef, Fragment, useEffect, useMemo, useState} from 'react';

import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {rgba} from 'polished';

import {
  CustomCode,
  CustomLink,
  Divider,
  FlexBox,
  Typography,
  TypographyProps,
} from '../../components';
import {markdownToHtml} from '../../functions';
import {CssProp, systemCss} from '../../system';

export interface MarkdownRendererProps {
  content: string | MDXRemoteSerializeResult;
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

  if (typeof finalContent === 'string') {
    return null;
  }

  return (
    <div ref={ref} css={[containerCss, codeCss]} {...props}>
      <MDXRemote
        {...finalContent}
        components={{
          a: ({href, children}) => (
            <CustomLink href={href ?? ''} defaultStyle>
              {children}
            </CustomLink>
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
    '*:not(br) + h1, *:not(br) + h2, *:not(br) + h3, *:not(br) + h4, *:not(br) + h5, *:not(br) + h6':
      {
        mt: '1.5rem',
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
    hr: {
      border: 'none',
      boxShadow: `0 0 0 0.1px ${theme.colors.black}`,
      my: '0.75rem',
      '&.thin': {
        boxShadow: `0 0 0 0.04px ${theme.colors.black}`,
        my: '0.25rem',
      },
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
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
        fontWeight: 600,
      },
      'th, td': {
        py: '0.5rem',
        px: '1rem',
        border: `1px solid ${rgba(theme.colors.gray300, 0.8)}`,
      },
    },
  });

const codeCss: CssProp = systemCss({
  '*:not(pre) > code': {
    backgroundColor: 'rgba(135, 131, 120, 0.15)',
    borderRadius: '0.1875rem',
    fontSize: '90%',
    p: '0.25rem 0.45rem',
    color: 'rgba(212, 76, 71, 1)',
  },
});
