import {Fragment, useEffect, useMemo, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {GiHamburgerMenu} from 'react-icons/gi';

import configData from '@root/blog.config';

import {useMedia} from '../../hooks';
import {
  centerBetweenAlignChildren,
  centerAlignedChildren,
  commonPxValues,
  fixedToScreen,
} from '../../styles';
import {CssProp, systemCss} from '../../system';

const {profileImage, links} = configData;

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({...props}) => {
  const {isMobile} = useMedia();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    return links.map(({name, displayName, link}) => {
      if (name === 'root') {
        return;
      }
      return (
        <li key={name} css={menuItemCss}>
          <Link href={link} passHref legacyBehavior>
            <a onClick={() => isMobile && setIsMobileMenuOpen(false)}>{displayName}</a>
          </Link>
        </li>
      );
    });
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen, isMobile]);

  return (
    <Fragment>
      <header css={headerCss}>
        <div css={headerInnerBoxCss} {...props}>
          {isMobile ? (
            <button
              css={mobileMenuButtonCss}
              onClick={() => setIsMobileMenuOpen((state) => !state)}
            >
              <GiHamburgerMenu />
            </button>
          ) : (
            <ul css={menuCss}>{menuItems}</ul>
          )}
          <Link href={links.find(({name}) => name === 'root')?.link ?? '/'} passHref legacyBehavior>
            <a css={profileImageBoxCss} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
              <Image src={profileImage} alt="profile_image" fill />
            </a>
          </Link>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div css={mobileMenuBoxCss}>
          <ul css={menuCss}>{menuItems}</ul>
        </div>
      )}
    </Fragment>
  );
};

export default Header;

// Style - Constants
export const HEADER_HEIGHTS = ['3.25rem', '3.5rem', '3.75rem'];

// Style
const headerCss: CssProp = [
  centerAlignedChildren,
  fixedToScreen({top: 0, left: 0, right: 0}),
  (theme) =>
    systemCss({
      zIndex: 10,
      height: HEADER_HEIGHTS,
      px: commonPxValues,
      backgroundColor: theme.colors.white,
      boxShadow: `0 0rem 1rem -0.5rem ${theme.colors.black}`,
    }),
];

const headerInnerBoxCss: CssProp = [centerBetweenAlignChildren, systemCss({width: '100%'})];

const menuCss: CssProp = systemCss({
  display: ['block', 'flex'],
  '& > * + *': {
    ml: [0, '0.5rem'],
    mt: ['1.25rem', 0],
  },
});

const menuItemCss: CssProp = (theme) =>
  systemCss({
    fontFamily: `'Poor Story'`,
    fontSize: [theme.fontSizes.p24, theme.fontSizes.p20],
    color: theme.colors.gray500,
    '&:hover': {
      color: theme.colors.blue300,
    },
  });

const profileImageBoxCss: CssProp = (theme) => {
  const imageSizes = HEADER_HEIGHTS.map((height) => `calc(${height ?? 0} - 1.125rem)`);
  return systemCss({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    border: `1px solid ${theme.colors.gray300}`,
    width: imageSizes,
    height: imageSizes,
  });
};

const mobileMenuButtonCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      fontSize: theme.fontSizes.p20,
    }),
];

const mobileMenuBoxCss: CssProp = [
  fixedToScreen({top: HEADER_HEIGHTS}),
  (theme) => {
    const PADDING_TOP = '1.25rem';
    return systemCss({
      zIndex: 1,
      height: HEADER_HEIGHTS.map((height) => `calc(100% - (${height ?? 0} + ${PADDING_TOP}))`),
      width: commonPxValues.map((value) => `calc(100% - (${value ?? 0} * 2))`),
      pt: PADDING_TOP,
      px: commonPxValues,
      backgroundColor: theme.colors.white,
    });
  },
];
