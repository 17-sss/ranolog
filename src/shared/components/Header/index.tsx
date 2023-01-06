import {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {GiHamburgerMenu} from 'react-icons/gi';
import {CSSTransition} from 'react-transition-group';

import {commonBlurDataURL} from '../../constants';
import {changeFirstCharUpperCase} from '../../functions';
import {useMedia, useScrollDirection} from '../../hooks';
import {
  centerBetweenAlignChildren,
  centerAlignedChildren,
  commonPxValues,
  fixedToScreen,
  defaultFontFamily,
} from '../../styles';
import {CssProp, systemCss} from '../../system';

export type LinkName = 'home' | 'blog' | 'projects' | 'resume';

export interface HeaderProps {
  profileImage: string;
  linkNames: LinkName[];
}

interface HeaderLink {
  name: LinkName;
  displayName: string;
  link: string;
}

const TRANSITION_TIMEOUT = 300;

const Header: React.FC<HeaderProps> = ({profileImage, linkNames, ...props}) => {
  const {isMobile} = useMedia();
  const scrollDir = useScrollDirection({initialDirection: 'up', thresholdPixels: 100});

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const links: HeaderLink[] = useMemo(() => {
    const result = linkNames.map((name) => {
      const displayName = changeFirstCharUpperCase(name);
      let link = `/${name}`;
      if (name === 'home') {
        link = '/';
      }
      return {name, displayName, link};
    });
    return result;
  }, [linkNames]);

  const handleLinkClick = useCallback(() => {
    if (!isMobile) {
      return;
    }
    const MS = 100;
    setTimeout(() => setIsMobileMenuOpen(false), MS);
  }, [isMobile]);

  const menuItems = useMemo(() => {
    return links.map(({name, displayName, link}) => {
      if (name === 'home') {
        return;
      }
      return (
        <li key={name} css={menuItemCss}>
          <Link href={link} passHref legacyBehavior>
            <a onClick={handleLinkClick}>{displayName}</a>
          </Link>
        </li>
      );
    });
  }, [handleLinkClick, links]);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen, isMobile]);

  return (
    <Fragment>
      <CSSTransition
        nodeRef={headerRef}
        in={isMobileMenuOpen || scrollDir === 'up'}
        timeout={TRANSITION_TIMEOUT}
        unmountOnExit
      >
        <header ref={headerRef} css={[headerCss, headerTransitionCss]}>
          <div css={headerInnerBoxCss} {...props}>
            {/* MENU */}
            <div>
              {isMobile ? (
                <button
                  css={mobileMenuButtonCss}
                  onClick={() => setIsMobileMenuOpen((state) => !state)}
                  aria-label="mobile menu button"
                >
                  <GiHamburgerMenu />
                </button>
              ) : (
                <ul css={menuCss}>{menuItems}</ul>
              )}
            </div>
            {/* PROFILE */}
            <Link
              href={links.find(({name}) => name === 'home')?.link ?? '/'}
              passHref
              legacyBehavior
            >
              <a css={profileImageBoxCss} onClick={handleLinkClick}>
                <Image
                  src={profileImage}
                  alt="profile_image"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={commonBlurDataURL}
                />
              </a>
            </Link>
          </div>
        </header>
      </CSSTransition>
      {isMobileMenuOpen && (
        <div css={mobileMenuBoxCss}>
          <ul css={[menuCss, mobileMenuCss]}>{menuItems}</ul>
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
const headerTransitionCss: CssProp = systemCss({
  '&.enter': {
    opacity: 0,
  },
  '&.enter-active': {
    opacity: 1,
    transition: `opacity ${TRANSITION_TIMEOUT}ms`,
  },
  '&.exit': {
    opacity: 1,
  },
  '&.exit-active': {
    opacity: 0,
    transition: `opacity ${TRANSITION_TIMEOUT}ms`,
  },
});

const headerInnerBoxCss: CssProp = [centerBetweenAlignChildren, systemCss({width: '100%'})];

const menuCss: CssProp = systemCss({
  display: ['none', 'flex'],
  '& > * + *': {
    ml: [0, '0.5rem'],
    mt: ['1.25rem', 0],
  },
});
const mobileMenuCss: CssProp = systemCss({display: 'block'});

const menuItemCss: CssProp = (theme) =>
  systemCss({
    fontFamily: `'Poor Story', ${defaultFontFamily}`,
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
      zIndex: 10,
      height: HEADER_HEIGHTS.map((height) => `calc(100% - (${height ?? 0} + ${PADDING_TOP}))`),
      width: commonPxValues.map((value) => `calc(100% - (${value ?? 0} * 2))`),
      pt: PADDING_TOP,
      px: commonPxValues,
      backgroundColor: theme.colors.white,
    });
  },
];
