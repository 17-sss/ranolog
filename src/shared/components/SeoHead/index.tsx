import React from 'react';

import Head from 'next/head';

import {siteVerificationData} from '@root/ranolog.config';

/** Use in 'ranolog.config.ts' file  */
export interface DefaultSeoMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  author?: string;
  site?: string;
  siteName: string;
}

type PartialSeoMeta = Partial<DefaultSeoMeta>;
export interface SeoHeadProps extends PartialSeoMeta {
  children?: React.ReactNode;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  type = 'website',
  site,
  author,
  siteName,

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
      {author && <meta key="author" name="author" content={author} />}
      {site && <meta key="twitter:site" name="twitter:site" content={site} />}
      {siteName && <meta key="og:site_name" property="og:site_name" content={siteName} />}

      {/* OWNERSHIP VERIFICATION */}
      {Object.entries(siteVerificationData)?.map(([key, value]) => (
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
