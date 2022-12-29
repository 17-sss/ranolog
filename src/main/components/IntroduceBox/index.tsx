import Image from 'next/image';
import {rgba} from 'polished';

import {CustomCode, CssProp, systemCss, commonBlurDataURL} from '@src/shared';

export interface IntroduceBoxProps {
  title: string;
  description?: string;
  bannerImage: string;
}

const IntroduceBox: React.FC<IntroduceBoxProps> = ({title, description, bannerImage, ...props}) => {
  return (
    <div css={containerCss} {...props}>
      <div css={introBoxCss}>
        <p className="title">{title}</p>
        {description && (
          <p className="description">
            <CustomCode css={descriptionCodeCss} color="gray">
              {description}
            </CustomCode>
          </p>
        )}
      </div>
      <div css={imageBoxCss}>
        <Image
          src={bannerImage}
          alt="main_banner"
          fill
          priority
          placeholder="blur"
          blurDataURL={commonBlurDataURL}
        />
      </div>
    </div>
  );
};

export default IntroduceBox;

const INTRO_RATIO = '28/9';

const containerCss: CssProp = systemCss({
  position: 'relative',
  aspectRatio: INTRO_RATIO,
  overflow: 'hidden',
});

const introBoxCss: CssProp = (theme) => {
  const PX_VALUES = ['1rem', '2rem'];
  return systemCss({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    px: PX_VALUES,

    width: PX_VALUES.map((v) => `calc(100%${v ? ` - (${v} * 2)` : ''})`),
    height: '100%',
    position: 'absolute',
    zIndex: 1,

    '.title': {
      fontSize: [theme.fontSizes.p28, theme.fontSizes.p32],
      fontWeight: 600,
      color: theme.colors.gray700,
      textShadow: `4px 1px 2px ${theme.colors.white}`,
    },
    '.description': {
      fontSize: [theme.fontSizes.p16, theme.fontSizes.p18],
    },
  });
};

const descriptionCodeCss: CssProp = (theme) =>
  systemCss({
    backgroundColor: rgba(theme.colors.white, 0.9),
  });

const imageBoxCss: CssProp = systemCss({
  position: 'relative',
  zIndex: 0,
  opacity: 0.8,

  aspectRatio: INTRO_RATIO,
  img: {
    objectFit: 'cover',
    objectPosition: '0% 55%',
  },
});
