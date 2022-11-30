import Image, {StaticImageData} from 'next/image';
import {rgba} from 'polished';

import {Code, CssProp, systemCss} from '@src/shared';

export interface IntroduceBoxProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

const IntroduceBox: React.FC<IntroduceBoxProps> = ({title, description, imageSrc, ...props}) => {
  return (
    <div css={containerCss} {...props}>
      <div css={introBoxCss}>
        <p className="title">{title}</p>
        <p className="description">
          <Code css={descriptionCodeCss} color="gray">
            {description}
          </Code>
        </p>
      </div>
      <div css={imageBoxCss}>
        <Image src={imageSrc} alt="main_banner" fill />
      </div>
    </div>
  );
};

export default IntroduceBox;

const containerCss: CssProp = systemCss({
  position: 'relative',
  aspectRatio: '28/9',
  overflow: 'hidden',
});

const introBoxCss: CssProp = (theme) => {
  const PX_VALUE = '2rem';
  return systemCss({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    px: PX_VALUE,

    width: `calc(100% - (${PX_VALUE} * 2))`,
    height: '100%',
    position: 'absolute',
    zIndex: 1,

    '.title': {
      fontSize: [theme.fontSizes.p28, theme.fontSizes.p32],
      fontWeight: 'bold',
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

  aspectRatio: 'inherit',
  img: {
    objectFit: 'cover',
    objectPosition: '0% 55%',
  },
});