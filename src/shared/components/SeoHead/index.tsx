import React from 'react';

import Head from 'next/head';

import {siteVerificationData} from '@root/blog.data';

export type MetaDataType = {
  [key in
    | 'title'
    | 'description'
    | 'keywords'
    | 'image'
    | 'url'
    | 'canonical'
    | 'type'
    | 'site'
    | 'author']?: string;
};

export interface SeoHeadProps extends MetaDataType {
  children?: React.ReactNode;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  type,
  site,
  author,

  children,
  ...props
}) => {
  return (
    <Head {...props}>
      {title && (
        <>
          <title key="title">{title}</title>
          <meta key="og:title" property="og:title" content={title} />
          <meta key="twitter:title" name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta key="og:description" property="og:description" content={description} />
          <meta key="twitter:description" name="twitter:description" content={description} />
        </>
      )}
      {keywords && <meta key="keywords" name="keywords" content={keywords} />}
      {image && (
        <>
          <meta key="og:image" property="og:image" content={image} />
          <meta key="twitter:image" name="twitter:image" content={image} />
        </>
      )}
      {url && <meta key="og:url" property="og:url" content={url} />}
      {canonical && <link key="canonical" rel="canonical" href={canonical} />}
      {type && <meta key="og:type" property="og:type" content={type} />}
      {site && <meta key="twitter:site" name="twitter:site" content={site} />}
      {author && <meta key="author" name="author" content={author} />}

      {/* OWNERSHIP VERIFICATION */}
      {Object.entries(siteVerificationData).map(([key, value]) => (
        <meta key={key} name={`${key}-site-verification`} content={value} />
      ))}

      {/* DEFAULT */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta key="twitter:card" name="twitter:card" content="summary" />

      {children}
    </Head>
  );
};

export default SeoHead;
