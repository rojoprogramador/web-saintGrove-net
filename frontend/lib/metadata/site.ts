/**
 * Site metadata utilities for SEO
 */

import { Metadata } from 'next';
import { SEO_CONFIG, APP_CONFIG } from '@/lib/constants';

interface GenerateMetadataParams {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Generate SEO metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords,
  ogImage,
  canonical,
}: GenerateMetadataParams = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${APP_CONFIG.name}`
    : SEO_CONFIG.defaultTitle;

  const pageDescription = description || SEO_CONFIG.defaultDescription;
  const pageKeywords = keywords || SEO_CONFIG.defaultKeywords;
  const pageOgImage = ogImage || `${APP_CONFIG.url}${SEO_CONFIG.ogImage}`;
  const pageCanonical = canonical || APP_CONFIG.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: APP_CONFIG.name }],
    creator: APP_CONFIG.name,
    publisher: APP_CONFIG.name,
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
      canonical: pageCanonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageCanonical,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: pageOgImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: APP_CONFIG.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      creator: SEO_CONFIG.twitterHandle,
      images: [pageOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}/logo.png`,
    description: APP_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cali',
      addressCountry: 'CO',
    },
    sameAs: [
      'https://instagram.com/saintgrove',
      'https://linkedin.com/company/saintgrove',
      'https://youtube.com/@saintgrove',
    ],
  };
}
