import {Fragment, useCallback, useEffect, useMemo, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {GiHamburgerMenu} from 'react-icons/gi';

import profileImage from '../../assets/agumon.jpeg';
import {LINKS} from '../../constants';
import {useMedia} from '../../hooks';
import {
  centerBetweenAlignChildren,
  centerAlignedChildren,
  commonWidthCss,
  absoluteOnParent,
  commonPxValue,
} from '../../styles';
import {CssProp, systemCss} from '../../system';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({...props}) => {
  const {isMobile} = useMedia();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    const linkList = Object.entries(LINKS);
    return linkList.map(([key, {displayName, link}]) => {
      if (key === 'root') {
        return;
      }
      return (
        <li key={key} css={menuItemCss}>
          <Link href={link}>{displayName}</Link>
        </li>
      );
    });
  }, []);

  const handleMobileMenuBtnClick = useCallback(() => {
    return setIsMobileMenuOpen((state) => !state);
  }, []);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <Fragment>
      <header css={headerCss} {...props}>
        <div css={headerInnerBoxCss}>
          {isMobile ? (
            <button css={mobileMenuButtonCss} onClick={handleMobileMenuBtnClick}>
              <GiHamburgerMenu />
            </button>
          ) : (
            <ul css={menuCss}>{menuItems}</ul>
          )}
          <Link href={LINKS.root.link}>
            <div css={profileImageBoxCss}>
              <Image src={profileImage} alt="profile_image" fill />
            </div>
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
const HEADER_HEIGHTS = ['3.25rem', '3.5rem', '3.75rem'];

// Style
const headerCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      position: 'sticky',
      top: 0,
      zIndex: 1,
      height: HEADER_HEIGHTS,
      backgroundColor: theme.colors.white,
      boxShadow: `0 0rem 1rem -0.5rem ${theme.colors.black}`,
    }),
];

const headerInnerBoxCss: CssProp = [centerBetweenAlignChildren, commonWidthCss];

const menuCss: CssProp = systemCss({
  display: ['block', 'flex'],
  alignItems: ['normal', 'center'],
  justifyContent: ['normal', 'center'],
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
  const imageSizes = HEADER_HEIGHTS.map((height) => `calc(${height} - 1.125rem)`);
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
  absoluteOnParent({top: HEADER_HEIGHTS}),
  (theme) =>
    systemCss({
      height: HEADER_HEIGHTS.map((height) => `calc(100% - ${height})`),
      width: commonPxValue.map((value) => `calc(100% - (${value} * 2))`),
      pt: '1.25rem',
      px: commonPxValue,
      backgroundColor: theme.colors.white,
    }),
];
