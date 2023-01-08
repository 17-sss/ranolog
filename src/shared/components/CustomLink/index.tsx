import {useMemo, PropsWithChildren} from 'react';

import Link from 'next/link';
import {rgba} from 'polished';

import {CssProp, systemCss} from '../../system';

export interface CustomLinkProps extends PropsWithChildren {
  href: string;
  disableStyle?: boolean;
}

const isExternalLink = (href: string) => /^http/.test(href);
const isMailto = (href: string) => /^mailto/.test(href);

const CustomLink: React.FC<CustomLinkProps> = ({href, children, disableStyle, ...props}) => {
  const isNotInternal = useMemo(() => {
    return isExternalLink(href) || isMailto(href);
  }, [href]);

  if (isNotInternal) {
    const anchorProps = isExternalLink(href) ? {rel: 'noreferrer', target: '_blank'} : undefined;
    return (
      <a css={disableStyle || linkCss} href={href} {...anchorProps} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} passHref legacyBehavior>
      <a css={disableStyle || linkCss} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default CustomLink;

const linkCss: CssProp = (theme) =>
  systemCss({
    color: theme.colors.gray500,
    borderBottom: `1px solid ${rgba(theme.colors.gray500, 0.5)}`,
    fontWeight: 600,
    textDecoration: 'none',
    outline: 'none',
    opacity: 0.7,
  });
