import type {
  WebSite,
  Organization,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  Service,
  Person,
  WithContext,
  SearchAction,
} from 'schema-dts';
import siteConfig from '@/config/site.config';

/**
 * Create WebSite schema for homepage
 */
export function createWebsiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    } as SearchAction,
  };
}

/**
 * Create Organization schema
 */
export function createOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: siteConfig.socialLinks,
    contactPoint: siteConfig.phone
      ? {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          contactType: 'customer service',
        }
      : undefined,
  };
}

/**
 * Create BlogPosting schema for blog posts
 */
export function createBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: Date;
  dateModified?: Date;
  author: { name: string; url?: string };
}): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image,
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified?.toISOString() || post.datePublished.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}

/**
 * Create BreadcrumbList schema
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Create Person schema for about page
 */
export function createPersonSchema(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vishal Shanbhag',
    givenName: 'Vishal',
    familyName: 'Shanbhag',
    jobTitle: 'Senior Architect & Engineering Lead',
    url: `${siteConfig.url}/about`,
    sameAs: [
      'https://www.linkedin.com/in/vishal-shanbhag-70b679a/',
      'https://www.baeldung.com/author/vishalshanbhag/',
      'https://javapro.io/author/vishalshanbhag/',
      'https://medium.com/@vvsvish',
    ],
    knowsAbout: [
      'Enterprise Architecture',
      'AI Integration',
      'Java/JVM',
      'Cloud-Native Architecture',
      'Banking & FinTech',
      'Technical Leadership',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Mumbai University',
    },
    knowsLanguage: ['English', 'Hindi', 'Marathi', 'Konkani', 'German'],
  };
}

/**
 * Create Service schema for work page
 */
export function createServiceSchema(): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: [
      'Senior Architecture Advisory',
      'AI Integration',
      'Technical Hiring Advisory',
      'Embedded Engineering',
    ],
    provider: {
      '@type': 'Person',
      name: 'Vishal Shanbhag',
      jobTitle: 'Senior Architect & Engineering Lead',
      url: siteConfig.url,
      sameAs: [
        'https://www.linkedin.com/in/vishal-shanbhag-70b679a/',
      ],
    } as Person,
    description:
      'Senior engineering judgement for post-MVP companies. Architecture, hiring, tech selection, and hardening. 20+ years building enterprise-grade systems for banking, SaaS, and AI-driven products.',
    areaServed: ['DE', 'UK', 'US', 'EU'],
  };
}

/**
 * Create FAQPage schema
 */
export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
