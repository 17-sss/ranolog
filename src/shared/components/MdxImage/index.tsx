import {ElementType} from 'react';

import {css} from '@emotion/react';
import Image, {ImageProps} from 'next/image';

import {siteUrl} from '@root/ranolog.config';

import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';
import {AliasElementType} from '../../types';

type PickImageProps = Pick<ImageProps, 'src' | 'placeholder' | 'blurDataURL' | 'priority'>;

export interface MdxImageProps extends PickImageProps {
  alt?: string;
  as?: AliasElementType;
}

function MdxImage({
  src,
  placeholder,
  blurDataURL,
  priority,
  alt,
  as = 'div',
  ...props
}: MdxImageProps) {
  function getSearchParamSizes(src: ImageProps['src']) {
    let width = 0;
    let height = 0;
    if (typeof src !== 'string') {
      return {width, height};
    }
    const origin = siteUrl || window?.location.origin;
    const url = origin ? new URL(src, origin) : new URL(src);
    const widthParam = url.searchParams.get('w') || url.searchParams.get('width');
    if (widthParam) {
      width = parseInt(widthParam);
    }
    const heightParam = url.searchParams.get('h') || url.searchParams.get('height');
    if (heightParam) {
      height = parseInt(heightParam);
    }
    return {width, height};
  }

  const {width, height} = getSearchParamSizes(src);
  const imageProps = {src, placeholder, blurDataURL, priority};

  if (width && height) {
    return <Image alt={alt ?? ''} width={width} height={height} {...imageProps} />;
  }

  const Component = as as ElementType;
  return (
    <Component css={[containerCss, autoSizeCss(width, height)]} {...props}>
      <Image
        css={fillImageCss}
        alt={alt ?? ''}
        sizes={`(max-width: ${theme.breakpointValues[0] - 1}px) 100vw, 50vw`}
        fill
        {...imageProps}
      />
    </Component>
  );
}
export default MdxImage;

const containerCss: CssProp = systemCss({position: 'relative', maxWidth: '100%'});
const autoSizeCss: (width?: number, height?: number) => CssProp = (width, height) => {
  if (!width && !height) {
    return;
  }
  return systemCss({
    width: !width && height ? 'auto' : ['100%', width],
    height: !height && width ? 'auto' : ['100%', height],
  });
};
const fillImageCss: CssProp = css`
  position: relative !important;
  object-fit: cover;
`;
