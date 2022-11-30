import {FaGithub} from 'react-icons/fa';
import {HiOutlineMail} from 'react-icons/hi';

import configData from '@root/blog.config';

import {centerAlignedChildren, commonPxValues} from '../../styles';
import {CssProp, systemCss} from '../../system';

export interface FooterProps {
  author: string;
  contact: Partial<typeof configData.contact>;
}

type FooterIcons = {
  [key in keyof typeof configData.contact]: React.ReactNode;
};
const ICONS: FooterIcons = {
  github: <FaGithub />,
  email: <HiOutlineMail />,
};

const Footer: React.FC<FooterProps> = ({author, contact, ...props}) => {
  return (
    <footer css={footerCss}>
      <div css={footerInnerBoxCss} {...props}>
        <ul css={contactListCss}>
          {Object.entries(contact).map(([key, value]) => {
            const iconNode = ICONS[key as keyof FooterIcons];
            if (!iconNode) {
              return;
            }
            return (
              <li key={key}>
                <a css={contactLinkCss} href={value} rel="noreferrer" target="_blank">
                  {iconNode}
                </a>
              </li>
            );
          })}
        </ul>
        <p css={copyrightCss}>
          Copyright © {new Date().getFullYear()} {author}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

// Style - Constants
export const FOOTER_HEIGHTS = ['7.25rem', '7.5rem', '7.75rem'];

const footerCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      height: FOOTER_HEIGHTS,
      px: commonPxValues,
      backgroundColor: theme.colors.white,
      boxShadow: `0 -0.3rem 0.4rem -0.5rem ${theme.colors.black}`,
    }),
];

const footerInnerBoxCss: CssProp = [
  centerAlignedChildren,
  systemCss({
    flexDirection: 'column',
    width: '100%',
    '& > * + *': {
      mt: '0.5rem',
    },
  }),
];

const contactListCss: CssProp = [
  centerAlignedChildren,
  systemCss({
    '& > * + *': {
      ml: '0.5rem',
    },
  }),
];
const contactLinkCss: CssProp = (theme) => [
  centerAlignedChildren,
  systemCss({
    color: theme.colors.gray600,
    '&:hover': {
      color: theme.colors.gray500,
    },
    svg: {
      fontSize: theme.fontSizes.p20,
    },
  }),
];

const copyrightCss: CssProp = systemCss({
  fontFamily: `'Poor Story'`,
});
