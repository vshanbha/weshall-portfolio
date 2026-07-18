/**
 * English translations
 */
export const en = {
  // Site
  site: {
    name: 'We Shall Build',
    description: 'Senior architect and hands-on engineer. 20+ years building enterprise-grade systems for banking, SaaS, and AI-driven products.',
  },

  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    blog: 'Blog',
    services: 'What I do',
    contact: 'Contact',
    features: 'Features',
    docs: 'Docs',
    getStarted: 'Get Started',
  },

  // Common
  common: {
    readMore: 'Read more',
    loading: 'Loading...',
    error: 'An error occurred',
    notFound: 'Page not found',
    backHome: 'Back to home',
    copied: 'Copied!',
    copy: 'Copy',
  },

  // Hero Section
  hero: {
    title: 'Build what matters.',
    bridge: 'For founders and technical leads at growth-stage companies: senior engineering judgement when the stakes are high and the path isn\'t clear.',
    cta: {
        primary: 'Talk to me',
      secondary: 'Read the latest',
    },
  },

  // Tech Stack Section
  techStack: {
    astro: {
      name: 'Astro 6',
      desc: 'Server islands & content layer',
    },
    tailwind: {
      name: 'Tailwind v4',
      desc: 'Zero-runtime CSS engine',
    },
    typescript: {
      name: 'TypeScript',
      desc: 'Strict type safety defaults',
    },
    motion: {
      name: 'Motion',
      desc: 'Declarative animations',
    },
  },

  // Feature Tabs Section
  features: {
    sectionTitle: 'Everything you need.',
    sectionTitleHighlight: "Nothing you don't.",
    sectionDescription:
      'We stripped away the bloat and kept the primitives that actually speed up development for agencies and freelancers.',
    tabs: {
      design: {
        label: 'Design System',
        desc: 'Global tokens & typography',
        title: 'CSS-First Design Tokens',
        content:
          "Velocity implements a complete design system using Tailwind v4's new CSS-first configuration. No messy JavaScript config files for theme values.",
      },
      seo: {
        label: 'SEO & Meta',
        desc: 'OpenGraph & sitemaps',
        title: 'Automated SEO Handling',
        content:
          "Astro's content collections power strictly typed metadata injection for every page. Social share images are generated automatically.",
      },
      perf: {
        label: 'Performance',
        desc: '100/100 Core Web Vitals',
        title: 'Zero JS by Default',
        content:
          "We utilize Astro's island architecture to ensure your marketing pages ship 0kb of JavaScript to the client unless explicitly interactive.",
      },
      components: {
        label: 'Components',
        desc: 'Reusable UI primitives',
        title: 'Type-Safe Components',
        content:
          'Build with confidence using TypeScript-first components. Full prop validation and IDE autocompletion out of the box.',
      },
      i18n: {
        label: 'Internationalization',
        desc: 'Multi-language support',
        title: 'Built-in Internationalization',
        content:
          'First-class support for multi-language sites with type-safe translations, automatic locale detection, and SEO-friendly URL structures.',
      },
    },
  },

  // Credibility Section
  credibility: {
    badge: 'Production Tested',
    title: 'Built by We shall build Team. Born from',
    titleHighlight: 'deadline pressure',
    paragraph1:
      "We're a digital agency that ships high-performance marketing sites. We got tired of spending the first 3 days of every project setting up the same tooling, SEO configs, and type definitions.",
    paragraph2:
      "Velocity isn't a theoretical exercise. It's the exact codebase we use to deliver client projects in 14-21 days instead of the industry standard 60.",
    stats: {
      lighthouse: {
        score: 'Perfect',
        label: 'Lighthouse Scores',
      },
      delivery: {
        days: '14 Days',
        label: 'Avg. Delivery Time',
      },
    },
    standard: {
      title: 'The Velocity Standard',
      items: [
        'No unused CSS in production',
        'Images optimized at build time',
        'Type-safe Content Collections',
        'Accessible primitives pre-configured',
      ],
    },
    testimonial: {
      quote: "\"The cleanest boilerplate I've seen in 2024. It cuts the fluff.\"",
      author: '— Alex C., Senior Frontend Dev',
    },
  },

  // CTA Section
  cta: {
    title: 'Build what matters.',
    titleHighlight: '',
    description: 'Every project starts with a conversation. Let\'s talk about what you\'re building — and how to get it across the line.',
    button: 'Start a Conversation',
    docs: '',
    command: '',
  },

  // Footer
  footer: {
    copyright: '© {year} We Shall Build. All rights reserved.',
    madeWith: 'Made with',
    maintainedBy: 'Maintained by',
    links: {
      documentation: 'Documentation',
      github: 'GitHub',
      twitter: 'Twitter',
      license: 'License',
    },
  },

  // Home page
  home: {
    stories: {
      title: 'Engagement stories',
      items: [
        {
          title: 'BlueMoney',
          subtitle: 'Short-term lending, Nigeria',
          paragraphs: [
            'Three founders with successful careers elsewhere wanted to pivot from inventory lending into a regulated short-term lending business. They understood their customer intimately: small businesses dealing primarily in cash, no credit history, but creditworthy.',
            'Their in-house developer was promoted to Founding Engineer, but lending is a regulated business. I came in around July\u00a02025 to map the loan workflow and compare platforms. I convinced them to use mature software instead of building from scratch. By October they were technically ready; launched January\u00a02026 after regulatory delays. Monthly sounding board calls continue.',
          ],
        },
        {
          title: 'Inbotiqa',
          subtitle: 'Enterprise email processing, global banking',
          paragraphs: [
            'I joined as the founding engineer. We built the system that processes 100,000+ transactional emails a day for global banking, at 99.9% availability.',
            'The numbers I care about are the operational ones: turnaround-time compliance went from 40–60% to over 95%; same-day close-out from 22% to 85%; email volume dropped 43%, and complaints went to zero.',
            'Inbotiqa is a Techstars portfolio company and went through their Fintech accelerator in London in 2019.',
          ],
        },
        {
          title: 'HDFC Life Insurance',
          subtitle: 'Strategic architecture consulting, India',
          paragraphs: [
            'Led the evaluation and selection of Serverless/MBaaS platforms in 2015, years before they became industry standard. Architected an internal mobile platform for policyholders\' families to request verified home care for elderly parents.',
            'The work was strategic architecture consulting: evaluating nascent technology, making the build vs. buy decision, and designing a system that would remain maintainable long after the engagement ended.',
          ],
        },
      ],
    },
  },

  // Services page
  services: {
    meta: {
      title: 'What I do',
      description: 'Senior engineering judgement for growth-stage companies. Architecture, hiring, tech selection, and hardening.',
    },
    hero: {
      title: 'Senior engineering judgement.',
      description: 'For founders and technical leads at growth-stage companies who need a second senior operator in the room. Not a lecturer, not a slide deck, not an overconfident hallucinator. An engineer who has seen the patterns and can help you navigate them.',
    },
    howwork: {
      title: 'How I work',
      paragraphs: [
        'I work alongside founders and technical leads who need senior engineering judgement — for a decision, a hire, a technology bet, or a sanity check.',
        'The relationship starts with a conversation. A paid sounding board session, 30 or 60 minutes, where you bring the problem and I bring the experience. No pitch, no obligation, no sales process.',
        'We figure out together what needs to happen next. Sometimes it is a single conversation. Sometimes it leads to ongoing work. The shape of the engagement follows the shape of the problem.',
      ],
    },
    cta: {
      title: 'Talk to me',
      description: 'A 30-minute or 60-minute sounding board session. No pitch, no obligation.',
      button: 'Talk to me',
    },
  },

  // About page
  about: {
    meta: {
      title: 'About',
      description: 'Builder, senior architect, and hands-on engineer. 20+ years from Mumbai to Cologne.',
    },
    origin: {
      title: 'Origin',
      paragraphs: [
        'I come from Mumbai, India. These days I am in Hürth, near Cologne, Germany.',
        'I graduated as an electronics engineer from Mumbai University in 2002. I stumbled into software because, after the 9/11 attacks of 2001, jobs dried up and a financial crisis loomed. The software industry was the first to hire. I have been building production systems ever since.',
        'I came to Germany in 2023 because my wife was transferred. I like to travel, and the startup, software, and climate tech scene here? Das gefällt mir. I am staying.',
        'I speak five languages at varying levels of decline: English — native, Hindi and Marathi native, Konkani conversational, German at B1 and counting.',
      ],
    },
    whatido: {
      title: 'What I do',
      paragraphs: [
        'I am, by nature, a builder. Most of my work starts the same way: a whiteboard or a napkin drawing, a founder saying, "I have an idea that needs software to give it life." Within a few months, that idea becomes a working prototype — and prototypes, when they solve something real, attract users, funding, and a team.',
        'When the system already exists, and the team is hitting the ceiling of what the current architecture can carry, the same instinct applies. I sit in a room with a founder or a CTO and a few senior engineers, and we take it apart together until we can all see what is actually there. Then we put it back together, sequenced, in a way the business can scale and the team can execute.',
        'I work with companies that have found their footing and need to build the systems that carry them through the next phase — without breaking what is already working.',
      ],
    },
    careerarc: {
      title: 'The career arc, briefly',
      paragraphs: [
        'My first big job out of university was at <strong>Infosys</strong>, in their Banking & Capital Markets group. That is where I got my first global exposure: on-site in Richmond, Virginia, for a major US bank, harmonising a relational data model across 500+ tables.',
        '2006 took me to <strong>Lehman Brothers</strong> in Mumbai. I survived the 2008 bankruptcy. Met my future co-founder there.',
        'A stint at <strong>Nomura</strong> followed, and in 2011, I joined as the founding engineer. We built <strong>Inbotiqa</strong> together.',
      ],
      highlights: [
        {
          name: 'Inbotiqa / YUDOmail',
          description: ' is the work I am asked about most. I built the system that processes 100,000+ transactional emails a day for global banking, at 99.9% availability. The numbers I care about are the operational ones: turnaround-time compliance went from 40–60% to over 95%; same-day close-out from 22% to 85%; email volume dropped 43%, and complaints went to zero. Inbotiqa is a Techstars portfolio company and went through their Fintech accelerator in London in 2019.',
        },
        {
          name: 'BauAI',
          description: ' (Sep 2025 – Feb 2026) is the most recent. A vibe-coding-generated codebase that needed to become a scalable, production-ready product. The work was less "add more AI" and more "decide which AI-generated decisions survive contact with users."',
        },
      ],
      earlier: 'Earlier: <strong>HDFC Life Insurance</strong> (early serverless, 2015), <strong>Progress Software</strong> (2011).',
      linkedin: {
        text: 'Connect with me on LinkedIn',
        url: 'https://www.linkedin.com/in/vishal-shanbhag-70b679a/',
        note: '; drop a note when you connect, or I might filter you as spam.',
      },
    },
    speaking: {
      title: 'Speaking, writing, mentorship',
      articles: {
        title: 'Select articles',
        intro: 'I write for JavaPro and Baeldung — two names every Java professional recognises.',
        items: [
          { title: 'Bridging Java and Python for AI/ML in Production: The Case for GraalPy on GraalVM', url: 'https://javapro.io/2026/03/10/bridging-java-and-python-for-ai-ml-in-production-the-case-for-graalpy-on-graalvm/', platform: 'JavaPro' },
          { title: 'Greener Code: Sustainable Java Deployments with Native Builds and Knative Serverless on Kubernetes', url: 'https://javapro.io/2025/06/11/greener-code-sustainable-java-deployments-with-native-builds-and-knative-serverless-on-kubernetes/', platform: 'JavaPro' },
          { title: 'How to Secure Ollama Server', url: 'https://medium.com/@vvsvish/how-to-secure-ollama-server-64cde5e59971', platform: 'Medium' },
          { title: 'Flutter ain\'t going away', url: 'https://medium.com/@vvsvish', platform: 'Level Up Coding' },
          { title: 'Why you shouldn\'t use Langchain\'s indexing API?', url: 'https://medium.com/@vvsvish', platform: 'Level Up Coding' },
          { title: 'Baeldung Author Page', url: 'https://www.baeldung.com/author/vishalshanbhag/', platform: 'Baeldung' },
        ],
      },
    },
    offtheclock: {
      title: 'Off the clock',
      paragraphs: [
        'I trek, I travel, I write — in order of increasing frequency. I travel mostly by public transport. I cook rarely, badly, and enthusiastically (all three are related). I live to eat. I am, like every self-respecting Indian, a fan of spicy food, particularly the Malwani style Bombay duck, which is a fish, not a bird, and is named after my hometown. Yes, it confuses everyone.',
        "I got married first, fell in love later — in India, that is called an arranged marriage. I do not read books much, but the Mahabharata, R.K. Narayan's condensed English version, which I read years ago, is the one that has stayed with me. I grew up on Kishore Kumar, Asha Bhosle, and R.D. Burman, and am now trying to make sense of German music.",
      ],
      closingLead: 'If you have an idea that needs software to give it life, ',
      closing: 'talk to me.',
    },
    cta: {
      title: 'Have a problem worth solving?',
      button: 'Start a Conversation',
    },
  },

  // Contact page
  contact: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Vishal Shanbhag.',
    },
    hero: {
      badge: 'Get in Touch',
      title: "Let's",
      titleHighlight: 'connect.',
      description: 'Have a question, suggestion, or just want to say hello? We would love to hear from you.',
    },
    form: {
      title: 'Send us a message',
      name: 'Your Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Tell us more about your project or question...',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! We will get back to you soon.',
      error: 'Failed to send message. Please try again later.',
    },
    info: {
      title: 'Other ways to reach us',
      email: {
        label: 'Email',
        value: 'contact@weshall.build',
      },
      github: {
        label: 'GitHub',
        value: 'github.com/vshanbha',
      },
      twitter: {
        label: 'Twitter',
        value: '',
      },
    },
  },

  // Forms
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
  },

  // Blog
  blog: {
    title: 'Blog',
    description: 'Latest articles and updates',
    allPosts: 'All posts',
    featured: 'Featured',
    noPosts: 'No posts found',
    relatedPosts: 'Related Posts',
    backToBlog: 'Back to Blog',
    subscribe: 'Subscribe',
    subscribeDescription: 'Get the latest articles and updates delivered to your inbox.',
    emailPlaceholder: 'Enter your email',
    subscribeButton: 'Subscribe',
  },

  // Components Page
  components: {
    meta: {
      title: 'Components',
      description: "Explore Velocity's comprehensive UI component library. Production-ready, accessible, and beautifully designed.",
    },
    hero: {
      badge: 'Production Components',
      title: 'Component',
      titleHighlight: 'Library',
      description: 'Production-ready UI primitives built with accessibility and performance in mind. Copy, paste, and customize to match your brand.',
      browseComponents: 'Browse Components',
      viewSource: 'View Source',
    },
    categories: {
      buttons: 'Buttons',
      inputs: 'Form Inputs',
      feedback: 'Feedback',
      overlays: 'Overlays',
      data: 'Data Display',
      loading: 'Loading',
    },
    sections: {
      buttons: {
        title: 'Buttons',
        description: 'Interactive elements for actions and navigation. All variants support icons, loading states, and full accessibility.',
        variants: 'Variants',
        variantsHint: '6 styles for different contexts',
        sizes: 'Sizes',
        sizesHint: 'Responsive scaling',
        states: 'States',
        withIcons: 'With Icons',
        primary: 'Primary',
        secondary: 'Secondary',
        outline: 'Outline',
        ghost: 'Ghost',
        link: 'Link',
        destructive: 'Destructive',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        default: 'Default',
        loading: 'Loading',
        disabled: 'Disabled',
        send: 'Send',
        export: 'Export',
        star: 'Star',
      },
      inputs: {
        title: 'Form Inputs',
        description: 'Text fields, selects, checkboxes, and more. Built with native validation and ARIA support.',
        textInput: 'Text Input',
        textInputHint: 'With labels & validation',
        textarea: 'Textarea',
        textareaHint: 'Multi-line text input',
        select: 'Select',
        selectHint: 'Native dropdown',
        checkboxes: 'Checkboxes',
        checkboxesHint: 'Multi-select controls',
        planSelection: 'Plan Selection',
        planSelectionHint: 'Card-style radio options',
        emailLabel: 'Email address',
        emailPlaceholder: 'you@example.com',
        passwordLabel: 'Password',
        passwordPlaceholder: '••••••••',
        passwordHint: 'Must be at least 8 characters',
        disabledLabel: 'Disabled',
        disabledPlaceholder: 'Cannot edit',
        messageLabel: 'Message',
        messagePlaceholder: 'Write your message here...',
        messageHint: 'Supports markdown formatting',
        countryLabel: 'Country',
        selectCountry: 'Select a country...',
        termsLabel: 'I agree to the terms of service',
        updatesLabel: 'Send me product updates',
        notificationsLabel: 'Enable notifications',
        notificationsDesc: 'Receive alerts for important updates',
        planFree: 'Free',
        planFreeDesc: 'Basic features for personal projects',
        planPro: 'Pro',
        planProDesc: 'Advanced tools for professionals',
        planTeam: 'Team',
        planTeamDesc: 'Collaboration features for teams',
      },
      feedback: {
        title: 'Feedback',
        description: 'Badges, alerts, and status indicators to communicate state and guide user actions.',
        badges: 'Badges',
        badgesHint: 'Status indicators',
        alerts: 'Alerts',
        alertsHint: 'Contextual messages',
        default: 'Default',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        info: 'Info',
        tipTitle: 'Tip',
        tipContent: 'Use keyboard shortcuts to navigate faster. Press',
        tipKey: '⌘K',
        tipEnd: 'to open the command palette.',
        deployTitle: 'Deployment successful',
        deployContent: 'Your changes are now live at',
        limitTitle: 'Approaching limit',
        limitContent: "You've used 80% of your monthly API quota. Consider upgrading your plan.",
        buildTitle: 'Build failed',
        buildContent: 'Error in',
        buildError: '— missing required prop "variant"',
      },
      overlays: {
        title: 'Overlays',
        description: 'Dialogs, dropdowns, tooltips, and tabs. Full keyboard navigation and focus management.',
        dialog: 'Dialog',
        dialogHint: 'Modal overlay',
        dropdown: 'Dropdown',
        dropdownHint: 'Action menu',
        tooltips: 'Tooltips',
        tooltipsHint: 'Contextual hints',
        tabs: 'Tabs',
        tabsHint: 'Content organization',
        openDialog: 'Open Dialog',
        deleteTitle: 'Delete project?',
        deleteDesc: 'This action cannot be undone.',
        deleteConfirm: 'Are you sure you want to delete',
        deleteWarning: 'All files, deployments, and analytics data will be permanently removed.',
        cancel: 'Cancel',
        deleteProject: 'Delete Project',
        actions: 'Actions',
        edit: 'Edit',
        duplicate: 'Duplicate',
        share: 'Share',
        archive: 'Archive',
        delete: 'Delete',
        top: 'Top',
        bottom: 'Bottom',
        left: 'Left',
        right: 'Right',
        tooltipTop: 'Tooltip on top',
        tooltipBottom: 'Tooltip on bottom',
        tooltipLeft: 'Tooltip on left',
        tooltipRight: 'Tooltip on right',
        overview: 'Overview',
        analytics: 'Analytics',
        settings: 'Settings',
        overviewContent: 'Project overview with key metrics and recent activity. Tabs support full keyboard navigation.',
        analyticsContent: 'Analytics data with charts and performance insights. Press arrow keys to navigate between tabs.',
        settingsContent: 'Configure your project settings. Use Home/End to jump to first/last tab.',
      },
      data: {
        title: 'Data Display',
        description: 'Cards, avatars, and icons for presenting content and user information.',
        cards: 'Cards',
        cardsHint: 'Content containers',
        avatars: 'Avatars',
        avatarsHint: 'User representations',
        icons: 'Icons',
        iconsHint: 'Lucide icon set — 24 included',
        stacked: 'Stacked',
        performance: 'Performance',
        performanceScore: '100/100 Lighthouse',
        performanceDesc: 'Zero JavaScript by default. Islands architecture with selective hydration for optimal speed.',
        typeSafe: 'Type-Safe',
        typeSafeScore: 'Full TypeScript',
        typeSafeDesc: 'Strict types throughout with IDE autocompletion and compile-time error checking.',
        i18nReady: 'i18n Ready',
        i18nScore: 'Multi-language',
        i18nDesc: 'Built-in translation system with SEO-friendly URLs and automatic locale detection.',
      },
      loading: {
        title: 'Loading',
        description: 'Skeleton loaders for perceived performance while content is being fetched.',
        skeletonTypes: 'Skeleton Types',
        skeletonTypesHint: 'Text, circular, rectangular',
        cardSkeleton: 'Card Skeleton',
        cardSkeletonHint: 'Composite loading state',
      },
    },
    cta: {
      title: 'Ready to build?',
      description: 'These components are just the beginning. Clone Velocity and start shipping faster.',
      cloneRepo: 'Clone Repository',
      readDocs: 'Read Documentation',
    },
  },

  // Consent Banner
  consent: {
    heading: 'Cookie Preferences',
    description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
    acceptAll: 'Accept All',
    declineAll: 'Decline All',
    customize: 'Customize',
    savePreferences: 'Save Preferences',
    settingsHeading: 'Privacy Settings',
    privacyPolicyLabel: 'Privacy Policy',
    alwaysOn: 'Always on',
  },
} as const;

export type TranslationKeys = typeof en;
