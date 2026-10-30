/**
 * Hindi translations
 */
export const hi = {
  site: {
    name: 'वी शॉल बिल्ड', // We Shall Build — transliterated, needs native-speaker review
    tagline: 'Build What Matters', // TODO: translate
    description:
      'संस्थापकों और तकनीकी लीड्स के लिए, उन फैसलों के सामने जिनकी कीमत समय और पैसे में चुकती है — खुद बनाएँ या खरीदें, किसे हायर करें, और जो AI ने बनाया वह टिकेगा या नहीं।',
  },
  nav: {
    home: 'होम',
    about: 'हमारे बारे में',
    blog: 'ब्लॉग',
    services: 'What I do', // TODO: translate
    contact: 'संपर्क',
    features: 'विशेषताएँ',
    docs: 'दस्तावेज़',
    getStarted: 'शुरू करें',
  },
  common: {
    readMore: 'और पढ़ें',
    loading: 'लोड हो रहा है...',
    error: 'एक त्रुटि हुई',
    notFound: 'पृष्ठ नहीं मिला',
    backHome: 'होम पर वापस जाएं',
    copied: 'कॉपी हो गया!',
    copy: 'कॉपी करें',
  },
  // Hero Section
  hero: {
    title: 'Build what matters.', // TODO: translate
    bridge:
      'संस्थापकों और तकनीकी लीड्स के लिए, उन फैसलों के सामने जिनकी कीमत समय और पैसे में चुकती है: खुद बनाएँ या खरीदें, किसे हायर करें, और जो AI ने बनाया वह टिकेगा या नहीं। बीस साल से मैं उत्पादन में यही फैसले ले रहा हूँ।',
    cta: {
      primary: 'चलिए बात करते हैं',
      secondary: 'Read the latest', // TODO: translate
    },
    rightColumn: {
      name: 'विशाल शानभाग',
      lead: 'सर्किट बोर्ड से बोर्डरूम तक।',
      headline: 'हार्डवेयर की नींव। एंटरप्राइज़ सॉफ़्टवेयर। AI एजेंट, डेमो से प्रोडक्शन तक।',
      value: 'बीस साल का इंजीनियरिंग अनुभव, उत्पादन में परखा हुआ।',
      worksAcross: 'काम के क्षेत्र',
      domains: 'फ़िनटेक · SaaS · क्लाइमेट टेक',
      aboutLink: 'About me', // TODO: translate
    },
  },
  techStack: {
    astro: {
      name: 'Astro 6',
      desc: 'सर्वर आइलैंड्स और कंटेंट लेयर',
    },
    tailwind: {
      name: 'Tailwind v4',
      desc: 'ज़ीरो-रनटाइम CSS इंजन',
    },
    typescript: {
      name: 'TypeScript',
      desc: 'सख्त टाइप सुरक्षा डिफ़ॉल्ट',
    },
    motion: {
      name: 'Motion',
      desc: 'डिक्लेरेटिव एनिमेशन',
    },
  },
  features: {
    sectionTitle: 'वह सब कुछ जो आपको चाहिए।',
    sectionTitleHighlight: 'वह कुछ नहीं जो आपको नहीं चाहिए।',
    sectionDescription:
      'हमने फालतू चीज़ों को हटा दिया और केवल उन मूलभूत चीज़ों को रखा जो एजेंसियों और फ्रीलांसरों के काम को वास्तव में गति देती हैं।',
    tabs: {
      design: {
        label: 'डिज़ाइन सिस्टम',
        desc: 'ग्लोबल टोकन और टाइपोग्राफी',
        title: 'CSS-फ़र्स्ट डिज़ाइन टोकन',
        content:
          'Velocity Tailwind v4 की नई CSS-फ़र्स्ट कॉन्फ़िगरेशन का उपयोग करके एक पूर्ण डिज़ाइन सिस्टम लागू करता है। थीम मानों के लिए कोई गंदा JavaScript कॉन्फ़िग फ़ाइल नहीं।',
      },
      seo: {
        label: 'SEO और मेटा',
        desc: 'OpenGraph और साइटमैप',
        title: 'स्वचालित SEO हैंडलिंग',
        content:
          'Astro की कंटेंट कलेक्शंस हर पेज के लिए सख्ती से टाइप किए गए मेटाडेटा इंजेक्शन को संचालित करती हैं। सोशल शेयर इमेज अपने आप जनरेट होती हैं।',
      },
      perf: {
        label: 'परफ़ॉर्मेंस',
        desc: '100/100 कोर वेब वाइटल्स',
        title: 'डिफ़ॉल्ट रूप से ज़ीरो JS',
        content:
          'हम Astro की आइलैंड आर्किटेक्चर का उपयोग करके सुनिश्चित करते हैं कि आपकी मार्केटिंग पेजेज़ क्लाइंट को 0kb JavaScript भेजें, जब तक कि स्पष्ट रूप से इंटरैक्टिव न हो।',
      },
      components: {
        label: 'कंपोनेंट्स',
        desc: 'पुन: प्रयोज्य UI प्रिमिटिव',
        title: 'टाइप-सेफ कंपोनेंट्स',
        content:
          'TypeScript-फ़र्स्ट कंपोनेंट्स के साथ आत्मविश्वास से बनाएं। पूर्ण प्रॉप वैलिडेशन और IDE ऑटोकम्प्लीशन बॉक्स से बाहर।',
      },
      i18n: {
        label: 'अंतर्राष्ट्रीयकरण',
        desc: 'बहु-भाषा समर्थन',
        title: 'अंतर्निहित अंतर्राष्ट्रीयकरण',
        content:
          'टाइप-सेफ अनुवाद, स्वचालित भाषा पहचान और SEO-अनुकूल URL संरचनाओं के साथ बहु-भाषा साइटों के लिए प्रथम श्रेणी का समर्थन।',
      },
    },
  },
  credibility: {
    badge: 'प्रोडक्शन टेस्टेड',
    title: 'We shall build टीम द्वारा बनाया गया। जन्म हुआ',
    titleHighlight: 'डेडलाइन के दबाव से',
    paragraph1:
      'हम एक डिजिटल एजेंसी हैं जो हाई-परफ़ॉर्मेंस मार्केटिंग साइट्स बनाती है। हर प्रोजेक्ट के पहले 3 दिन वही टूलिंग, SEO कॉन्फ़िग और टाइप डेफ़िनिशन सेट करने में बिताते-बिताते हम ऊब गए।',
    paragraph2:
      'Velocity कोई सैद्धांतिक प्रयोग नहीं है। यह वही कोडबेस है जिसका उपयोग हम क्लाइंट प्रोजेक्ट्स को उद्योग मानक 60 दिनों के बजाय 14-21 दिनों में डिलीवर करने के लिए करते हैं।',
    stats: {
      lighthouse: {
        score: 'परफेक्ट',
        label: 'लाइटहाउस स्कोर',
      },
      delivery: {
        days: '14 दिन',
        label: 'औसत डिलीवरी समय',
      },
    },
    standard: {
      title: 'Velocity मानक',
      items: [
        'प्रोडक्शन में कोई अनुपयोगी CSS नहीं',
        'बिल्ड समय पर छवियाँ ऑप्टिमाइज़ की गईं',
        'टाइप-सेफ कंटेंट कलेक्शंस',
        'सुलभ प्रिमिटिव पूर्व-कॉन्फ़िगर',
      ],
    },
    testimonial: {
      quote: '"2024 में देखा गया सबसे साफ बॉयलरप्लेट। यह फालतू को काटता है।"',
      author: '— एलेक्स सी., सीनियर फ्रंटएंड डेव',
    },
  },
  cta: {
    title: 'Build what matters.',
    titleHighlight: '',
    description:
      'अनिश्चित हैं कि आपके पास कोई ऐसी समस्या है जिसे हल करने के लिए भुगतान करना ठीक रहेगा? लोग मुझे लिखने का यही सबसे आम कारण है।',
    button: 'चलिए बात करते हैं',
    docs: '',
    command: '',
  },
  footer: {
    tagline:
      'संस्थापकों और तकनीकी लीड्स के लिए, उन फैसलों के सामने जिनकी कीमत समय और पैसे में चुकती है — खुद बनाएँ या खरीदें, किसे हायर करें, और जो AI ने बनाया वह टिकेगा या नहीं।',
    copyright: '© {year} वी शॉल बिल्ड. सर्वाधिकार सुरक्षित।',
    madeWith: 'बनाया गया',
    maintainedBy: 'द्वारा बनाए रखा गया',
    aiUseInPublishing: 'AI use in publishing', // TODO: translate
    links: {
      documentation: 'दस्तावेज़',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      license: 'लाइसेंस',
    },
  },
  // Home page
  home: {
    blog: {
      title: 'Latest articles', // TODO: translate
    },
    stories: {
      title: 'Engagement stories', // TODO: translate
      items: [
        {
          title: 'टीम को बनाने से मना लिया — और लॉन्च बच गया',
          subtitle: 'Short-term lending, Nigeria', // TODO: translate
          paragraphs: [
            '<em>BlueMoney</em> नाइजीरिया में एक रेगुलेटेड शॉर्ट-टर्म लेंडर है। मैंने तीन-संस्थापक टीम को इन्वेंटरी लेंडिंग से निकालकर नाइजीरिया के रेगुलेटेड शॉर्ट-टर्म लेंडिंग धंधे में मोड़ा और उन्हें ज़ीरो से बनाने के बजाय मौजूदा प्लेटफ़ॉर्म खरीदने के लिए राज़ी किया। जनवरी 2026 में लॉन्च — रेगुलेटरी देरी के बाद। मासिक साउंडिंग बोर्ड कॉल्स जारी हैं।',
          ],
        },
        {
          title: '40% से 95% कंप्लायंस — उस सिस्टम में जिसे बैंक चलाते हैं',
          subtitle: 'Enterprise email processing, global banking', // TODO: translate
          paragraphs: [
            'जहाँ मैं फ़ाउंडिंग इंजीनियर था, <em>Inbotiqa</em> का प्लेटफ़ॉर्म वैश्विक बैंकों के लिए रोज़ 100,000 से ज़्यादा ट्रांज़ैक्शनल ईमेल 99.9% उपलब्धता के साथ संसाधित करता है। टर्नअराउंड-टाइम कंप्लायंस 40% से 95% पर, सेम-डे क्लोज़-आउट 22% से 85% पर।',
          ],
        },
        {
          title: 'मेनस्ट्रीम बनने से बरसों पहले सर्वरलेस इवैल्यूएशन चलाया',
          subtitle: 'Strategic architecture consulting, India', // TODO: translate
          paragraphs: [
            '2015 में, <em>HDFC Life</em> में मैंने सर्वरलेस/MBaaS प्लेटफ़ॉर्म इवैल्यूएशन चलाया — मेनस्ट्रीम बनने से बरसों पहले। एक आंतरिक मोबाइल प्लेटफ़ॉर्म भी बनाया जिससे पॉलिसीधारकों के परिवार बुज़ुर्ग माता-पिता के लिए सत्यापित घरेलू देखभाल की माँग कर सकें। बड़े पैमाने पर build-versus-buy।',
          ],
        },
      ],
    },
    testimonials: {
      title: 'What clients say', // TODO: translate
      oneLiner:
        "He's the one you call when AI has built you something that looks fine in a demo, and you can't tell whether it will hold up in production.", // referral one-liner — verbatim by ruling; do not translate
      oneLinerAttribution: '— जैसे रेफ़र करने वाले मेरा परिचय कराते हैं।',
      items: [
        {
          id: 'bluemoney',
          company: 'BlueMoney',
          author: 'Arrie',
          role: 'Founding Engineer',
          quote:
            'Vishal helped us make the right build vs. buy decision under timeline pressure, set up our lending operations with professional SOPs, and continues to be our sounding board as we navigate the real market.', // TODO: translate
          linkedin: '',
          website: '',
        },
        {
          id: 'ourish',
          company: 'Ourish',
          author: 'Kunal Kakar',
          role: 'Director, Sales and Operations',
          quote:
            'Vishal was fantastic in his engagement. He clearly documented the project work, assisted on the project through and through and went above and beyond in delivering to the requirements in a very complex and ambiguous environment. Thanks Vishal for all the help and insights.', // TODO: translate
          linkedin: 'https://www.linkedin.com/in/kunalkakar/',
          website: '',
        },
        {
          id: 'powermarket',
          company: 'PowerMarket',
          author: 'Abhinav Jain',
          role: 'Founder',
          quote:
            'We had been looking into developing our tech and dev team. However, we needed advice on how to get started, who to hire, what kind of skills to target, and once we had a pipeline of candidates, how to evaluate their tech skills. Vishal was a phenomenal resource who guided us throughout the process, and then went above and beyond. He is one of the most knowledgeable technology resources that we have come across thus far and will definitely go back to him for further help.', // TODO: translate
          linkedin: 'https://www.linkedin.com/in/abhinavjainuk/',
          website: 'https://powermarket.net/',
        },
        {
          id: 'sable',
          company: 'Sable International',
          author: 'Leanne Shrosbree',
          role: 'Customer Service & Operations Director',
          quote:
            'Through a genuinely collaborative partnership with Vishal and the Inbotiqa team, we\u2019ve been able to improve, refine and maximise YuDo\u2019s potential. It\u2019s supported our growth, enabled our teams and helped us deliver for our clients consistently. That longevity and value speak volumes about the people behind it. We\u2019re genuinely grateful for the care, support and partnership you\u2019ve shown us over such a long time.', // TODO: translate
          linkedin: 'https://www.linkedin.com/in/leanne-shrosbree-74261b53/',
          website: '',
        },
        {
          id: 'bauai',
          company: 'BauAI',
          author: 'Tushar Adsul',
          role: 'Managing Director',
          quote:
            "We had an early prototype that looked great in demos but wasn't production-ready. I was looking for someone who could tell me what was actually broken. Vishal came in as an advisor, reviewed our codebase, and helped us identify our flaws: what to keep, what to cut, and how to build up from the solid parts without a full rewrite. When we pivoted based on customer feedback, he showed us how to integrate new features without breaking what was already working. We shipped two fully working agents and were ready for our first pilot customers.", // TODO: translate
          linkedin: 'https://www.linkedin.com/company/bauai/',
          website: 'https://www.bauai.eu/',
        },
      ],
    },
  },
  // Services page
  services: {
    meta: {
      title: 'What I do', // TODO: translate
      description:
        'संस्थापकों और तकनीकी लीड्स के लिए, उन फैसलों के सामने जिनकी कीमत समय और पैसे में चुकती है — खुद बनाएँ या खरीदें, किसे हायर करें, और जो AI ने बनाया वह टिकेगा या नहीं।',
    },
    hero: {
      title: 'कुछ फ़ैसले गलत होने पर भारी पड़ते हैं।',
      description:
        'For founders and technical leads at growth-stage companies who need a second senior operator in the room. Not a lecturer, not a slide deck, not an overconfident hallucinator. An engineer who has seen the patterns and can help you navigate them.', // TODO: translate
    },
    howwork: {
      title: 'How I work', // TODO: translate
      paragraphs: [
        'मैं उन संस्थापकों और तकनीकी लीड्स के साथ काम करता हूँ जो किसी फ़ैसले, किसी हायरिंग, किसी बिना-परखे AI बिल्ड या किसी सैनिटी चेक पर हैं।',
        'रिश्ता एक मुफ़्त पंद्रह-मिनट की बातचीत से शुरू होता है, यह समझने के लिए कि क्या यह लंबी बातचीत के लायक है। न पिच, न कोई प्रतिबद्धता, न कोई सेल्स प्रोसेस।',
        'We figure out together what needs to happen next. Sometimes it is a single conversation. Sometimes it leads to ongoing work. The shape of the engagement follows the shape of the problem.', // TODO: translate
      ],
    },
    cta: {
      title: 'यह बातचीत से शुरू होता है — और उतना आगे जाता है जितनी समस्या माँगती है।',
      description:
        'मिलने के लिए पंद्रह मिनट की कॉल — न पिच, न प्रतिबद्धता। आगे बढ़ने लायक हो तो: एक ईमानदार घंटा, एक छोटा वर्किंग स्प्रिंट, या निरंतर सलाहकारी।',
      button: 'चलिए बात करते हैं',
    },
  },
  // About page
  about: {
    meta: {
      title: 'About', // TODO: translate
      description:
        'Builder, senior architect, and hands-on engineer. 20+ years from Mumbai to Cologne.', // TODO: translate
    },
    origin: {
      title: 'विशाल शानभाग',
      paragraphs: [
        'I come from Mumbai, India. These days I am in Hürth, near Cologne, Germany.', // TODO: translate
        'I graduated as an electronics engineer from Mumbai University in 2002. I stumbled into software because, after the 9/11 attacks of 2001, jobs dried up and a financial crisis loomed. The software industry was the first to hire. I have been building production systems ever since.', // TODO: translate
        'I came to Germany in 2023 because my wife was transferred. I like to travel, and the startup, software, and climate tech scene here? Das gefällt mir. I am staying.', // TODO: translate
        'I speak five languages at varying levels of decline: English — native, Hindi and Marathi native, Konkani conversational, German at B1 and counting.', // TODO: translate
      ],
    },
    whatido: {
      title: 'How I build', // TODO: translate
      paragraphs: [
        'I am, by nature, a builder. Most of my work starts the same way: a whiteboard or a napkin drawing, a founder saying, "I have an idea that needs software to give it life." Within a few months, that idea becomes a working prototype — and prototypes, when they solve something real, attract users, funding, and a team.', // TODO: translate
        'When the system already exists, and the team is hitting the ceiling of what the current architecture can carry, the same instinct applies. I sit in a room with a founder or a CTO and a few senior engineers, and we take it apart together until we can all see what is actually there. Then we put it back together, sequenced, in a way the business can scale and the team can execute.', // TODO: translate
        'I work with companies that have found their footing and need to build the systems that carry them through the next phase — without breaking what is already working.', // TODO: translate
      ],
    },
    beliefs: {
      title: 'What I believe', // TODO: translate
      commandments: [
        {
          title: 'We shall ask WHY before we ask HOW.', // TODO: translate
          tie: 'हर एंगेजमेंट यहीं से शुरू होता है: यह क्यों बनाएँ, अभी क्यों, किसके लिए — इससे पहले कि कोई "कैसे" पूछे।',
        },
        {
          title: 'We shall build for outcomes, not features.', // TODO: translate
          tie: 'हम उस नतीजे से पीछे चलकर काम करते हैं जो आपको चाहिए; फ़ीचर की माँग उसका सिर्फ़ लक्षण है।',
        },
        {
          title: 'We shall prototype before we commit.', // TODO: translate
          tie: 'इस हफ़्ते असफल होने वाला मोटा प्रोटोटाइप एक हफ़्ता खर्च करता है। बाज़ार में असफल होने वाला पूरा बिल्ड एक तिमाही।',
        },
      ],
      fullTen: 'जिस तरह हम बनाते हैं →',
    },
    careerarc: {
      title: 'The career arc, briefly', // TODO: translate
      paragraphs: [
        'My first big job out of university was at <strong>Infosys</strong>, in their Banking & Capital Markets group. That is where I got my first global exposure: on-site in Richmond, Virginia, for a major US bank, harmonising a relational data model across 500+ tables.', // TODO: translate
        '2006 took me to <strong>Lehman Brothers</strong> in Mumbai. I survived the 2008 bankruptcy. Met my future co-founder there.', // TODO: translate
        'At <strong>Nomura</strong> I stayed with the same team, working in the same building. A few years later, in 2011, I co-founded <strong>Inbotiqa</strong> with the colleague I met at Lehman.', // TODO: translate
      ],
      highlights: [
        {
          name: 'Inbotiqa / YUDOmail', // TODO: translate
          description:
            ' is the work I am asked about most. I built the system that processes 100,000+ transactional emails a day for global banking, at 99.9% availability. The numbers I care about are the operational ones: turnaround-time compliance went from 40–60% to over 95%; same-day close-out from 22% to 85%; email volume dropped 43%, and complaints went to zero. Inbotiqa is a Techstars portfolio company and went through their Fintech accelerator in London in 2019.', // TODO: translate
        },
        {
          name: 'BauAI', // TODO: translate
          description:
            ' (Sep 2025 – Feb 2026) is the most recent. A vibe-coding-generated codebase that needed to become a scalable, production-ready product. The work was less "add more AI" and more "decide which AI-generated decisions survive contact with users."', // TODO: translate
        },
      ],
      earlier:
        'Earlier: <strong>HDFC Life Insurance</strong> (early serverless, 2015), <strong>Progress Software</strong> (2011).', // TODO: translate
      linkedin: {
        text: 'Connect with me on LinkedIn', // TODO: translate
        url: 'https://www.linkedin.com/in/vishal-shanbhag-70b679a/', // TODO: translate
        note: '; drop a note when you connect, or I might filter you as spam.', // TODO: translate
      },
    },
    speaking: {
      title: 'Speaking, writing, mentorship', // TODO: translate
      talks: {
        // TODO: translate — English placeholder, German/Hindi/Marathi translations deferred (see issue #21)
        title: 'Speaking', // TODO: translate
        items: [
          {
            event: 'Jcon Gen AI (Ljubljana, 2025)',
            title: "Hitchhiker's Guide to the AI Galaxy – for Java Developers",
            description:
              'A 60-minute session for 100+ developers on entering the GenAI universe: local LLMs, GraalVM polyglot setups, and MCP-powered Java services.', // TODO: translate
          },
        ],
      },
      articles: {
        title: 'Select articles', // TODO: translate
        intro: 'I write for JavaPro and Baeldung — two names every Java professional recognises.', // TODO: translate
        items: [
          {
            title:
              'Bridging Java and Python for AI/ML in Production: The Case for GraalPy on GraalVM',
            url: 'https://javapro.io/2026/03/10/bridging-java-and-python-for-ai-ml-in-production-the-case-for-graalpy-on-graalvm/',
            platform: 'JavaPro',
          }, // TODO: translate
          {
            title:
              'Greener Code: Sustainable Java Deployments with Native Builds and Knative Serverless on Kubernetes',
            url: 'https://javapro.io/2025/06/11/greener-code-sustainable-java-deployments-with-native-builds-and-knative-serverless-on-kubernetes/',
            platform: 'JavaPro',
          }, // TODO: translate
          {
            title: 'How to Secure Ollama Server',
            url: 'https://medium.com/@vvsvish/how-to-secure-ollama-server-64cde5e59971',
            platform: 'Medium',
          }, // TODO: translate
          {
            title: "Flutter ain't going away",
            url: 'https://medium.com/@vvsvish',
            platform: 'Level Up Coding',
          }, // TODO: translate
          {
            title: "Why you shouldn't use Langchain's indexing API?",
            url: 'https://medium.com/@vvsvish',
            platform: 'Level Up Coding',
          }, // TODO: translate
          {
            title: 'Baeldung Author Page',
            url: 'https://www.baeldung.com/author/vishalshanbhag/',
            platform: 'Baeldung',
          }, // TODO: translate
        ],
      },
      mentoring: {
        // TODO: translate — English placeholder
        title: 'Mentoring', // TODO: translate
        items: [
          {
            org: 'Founder Institute',
            detail:
              'Mentor (2024 – present), advising early-stage startups on product and technical strategy.',
          }, // TODO: translate
          {
            org: 'ReDI School',
            detail:
              'Volunteer teacher (2023), mentoring students in HTML/CSS for integration and career development.',
          }, // TODO: translate
        ],
      },
    },
    offtheclock: {
      title: 'Off the clock', // TODO: translate
      paragraphs: [
        'I trek, I travel, I write — in order of increasing frequency. I travel mostly by public transport. I cook rarely, badly, and enthusiastically (all three are related). I live to eat. I am, like every self-respecting Indian, a fan of spicy food, particularly the Malwani style Bombay duck, which is a fish, not a bird, named after my hometown. Yes, it confuses everyone.', // TODO: translate
        "I like stories presented on a bigger screen. I watch Bollywood and Hollywood movies. I grew up listening to music from Kishore Kumar, Asha Bhosle, and R.D. Burman, and am now trying to make sense of German music. The Mahabharata, R.K. Narayan's condensed English version, is the one book that has stayed with me. As a kid, I was fascinated with technology. I always wanted to take things apart and put them back together. I called it reverse engineering. These days, I explore software builds with the same curiosity and write what I learn, sometimes with metaphors and analogies from Hollywood or Bollywood movies.", // TODO: translate
      ],
      closingLead: 'If you have an idea that needs software to give it life, ', // TODO: translate
      closing: 'चलिए बात करते हैं।',
    },
    editorialStandards: {
      title: 'Editorial standards', // TODO: translate
      statement:
        'AI may assist with research, drafting, sense-checking, and review. Every article passes a human review gate. Writing, opinions, and observations remain the author’s own.', // TODO: translate
    },
    cta: {
      title: 'Have a problem worth solving?', // TODO: translate
      button: 'चलिए बात करते हैं',
    },
  },
  contact: {
    meta: {
      title: 'संपर्क करें',
      description:
        'पंद्रह मिनट, कोई प्रतिबद्धता नहीं, कोई पिच नहीं। यह तय करने का सीधा जवाब कि यह लंबी बातचीत के लायक है — भले ही जवाब न हो।',
    },
    hero: {
      title: 'आपको साफ़ ब्रीफ की ज़रूरत नहीं। गड़बड़ी लेकर आइए।',
      description:
        'जो लोग मुझे लिखते हैं, उनमें से ज़्यादातर को यह पक्का नहीं होता कि उनके पास समस्या है, सवाल है, या बस यह एहसास कि कुछ ठीक नहीं है। शुरुआत की यह एक सामान्य जगह है, और इंतज़ार करने की वजह नहीं।',
      oneLiner:
        "He's the one you call when AI has built you something that looks fine in a demo, and you can't tell whether it will hold up in production.", // referral one-liner — verbatim by ruling; do not translate
      oneLinerAttribution: '— जैसे रेफ़र करने वाले मेरा परिचय कराते हैं।',
    },
    free: {
      description: 'मिलने के लिए पंद्रह मिनट — न पिच, न प्रतिबद्धता।',
      button: 'चलिए बात करते हैं',
      url: 'https://calendly.com/vshanbhag',
    },
    paid: {
      title: 'आपको पहले से पता है कि आपको क्या चाहिए?',
      description: 'आपकी समस्या पर एक ईमानदार घंटा, लाइव बाँटा हुआ, सीनियर आर्किटेक्ट के साथ।',
      button: 'ईमानदार घंटा बुक करें',
      url: 'https://www.upwork.com/services/consultation/development-it-vishal-1688119352130330624?ref=project_share',
    },
  },
  form: {
    name: 'नाम',
    email: 'ईमेल',
    message: 'संदेश',
    submit: 'सबमिट करें',
    sending: 'भेजा जा रहा है...',
    success: 'संदेश सफलतापूर्वक भेजा गया!',
    error: 'संदेश भेजने में विफल। कृपया बाद में पुनः प्रयास करें।',
  },
  blog: {
    title: 'ब्लॉग',
    description: 'नवीनतम लेख और अपडेट',
    allPosts: 'सभी पोस्ट',
    featured: 'फ़ीचर्ड',
    noPosts: 'कोई पोस्ट नहीं मिली',
    relatedPosts: 'संबंधित पोस्ट',
    backToBlog: 'ब्लॉग पर वापस जाएं',
    subscribe: 'सब्सक्राइब करें',
    subscribeDescription: 'नवीनतम लेख और अपडेट सीधे अपने इनबॉक्स में प्राप्त करें।',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    subscribeButton: 'सब्सक्राइब करें',
  },
  components: {
    meta: {
      title: 'कंपोनेंट्स',
      description:
        'Velocity की व्यापक UI कंपोनेंट लाइब्रेरी देखें। प्रोडक्शन-रेडी, सुलभ और खूबसूरती से डिज़ाइन की गई।',
    },
    hero: {
      badge: 'प्रोडक्शन कंपोनेंट्स',
      title: 'कंपोनेंट',
      titleHighlight: 'लाइब्रेरी',
      description:
        'एक्सेसिबिलिटी और परफ़ॉर्मेंस को ध्यान में रखकर बनाए गए प्रोडक्शन-रेडी UI प्रिमिटिव। कॉपी करें, पेस्ट करें और अपने ब्रांड के अनुसार कस्टमाइज़ करें।',
      browseComponents: 'कंपोनेंट्स ब्राउज़ करें',
      viewSource: 'सोर्स देखें',
    },
    categories: {
      buttons: 'बटन',
      inputs: 'फ़ॉर्म इनपुट',
      feedback: 'फ़ीडबैक',
      overlays: 'ओवरले',
      data: 'डेटा डिस्प्ले',
      loading: 'लोडिंग',
    },
    sections: {
      buttons: {
        title: 'बटन',
        description:
          'क्रियाओं और नेविगेशन के लिए इंटरैक्टिव तत्व। सभी वेरिएंट आइकन, लोडिंग स्टेट और पूर्ण एक्सेसिबिलिटी का समर्थन करते हैं।',
        variants: 'वेरिएंट',
        variantsHint: 'विभिन्न संदर्भों के लिए 6 शैलियाँ',
        sizes: 'आकार',
        sizesHint: 'रिस्पॉन्सिव स्केलिंग',
        states: 'अवस्थाएँ',
        withIcons: 'आइकन के साथ',
        primary: 'प्राथमिक',
        secondary: 'द्वितीयक',
        outline: 'आउटलाइन',
        ghost: 'घोस्ट',
        link: 'लिंक',
        destructive: 'डिस्ट्रक्टिव',
        small: 'छोटा',
        medium: 'मध्यम',
        large: 'बड़ा',
        default: 'डिफ़ॉल्ट',
        loading: 'लोड हो रहा है',
        disabled: 'निष्क्रिय',
        send: 'भेजें',
        export: 'एक्सपोर्ट',
        star: 'स्टार',
      },
      inputs: {
        title: 'फ़ॉर्म इनपुट',
        description:
          'टेक्स्ट फ़ील्ड, सेलेक्ट, चेकबॉक्स और बहुत कुछ। नेटिव वैलिडेशन और ARIA समर्थन के साथ निर्मित।',
        textInput: 'टेक्स्ट इनपुट',
        textInputHint: 'लेबल और वैलिडेशन के साथ',
        textarea: 'टेक्स्टएरिया',
        textareaHint: 'मल्टी-लाइन टेक्स्ट इनपुट',
        select: 'सेलेक्ट',
        selectHint: 'नेटिव ड्रॉपडाउन',
        checkboxes: 'चेकबॉक्स',
        checkboxesHint: 'मल्टी-सेलेक्ट कंट्रोल',
        planSelection: 'योजना चयन',
        planSelectionHint: 'कार्ड-शैली रेडियो विकल्प',
        emailLabel: 'ईमेल पता',
        emailPlaceholder: 'aap@example.com',
        passwordLabel: 'पासवर्ड',
        passwordPlaceholder: '••••••••',
        passwordHint: 'कम से कम 8 अक्षर का होना चाहिए',
        disabledLabel: 'निष्क्रिय',
        disabledPlaceholder: 'संपादित नहीं कर सकते',
        messageLabel: 'संदेश',
        messagePlaceholder: 'अपना संदेश यहाँ लिखें...',
        messageHint: 'मार्कडाउन फ़ॉर्मेटिंग का समर्थन करता है',
        countryLabel: 'देश',
        selectCountry: 'कोई देश चुनें...',
        termsLabel: 'मैं सेवा की शर्तों से सहमत हूँ',
        updatesLabel: 'मुझे उत्पाद अपडेट भेजें',
        notificationsLabel: 'सूचनाएँ सक्षम करें',
        notificationsDesc: 'महत्वपूर्ण अपडेट के लिए अलर्ट प्राप्त करें',
        planFree: 'फ्री',
        planFreeDesc: 'व्यक्तिगत प्रोजेक्ट के लिए बुनियादी सुविधाएँ',
        planPro: 'प्रो',
        planProDesc: 'पेशेवरों के लिए उन्नत उपकरण',
        planTeam: 'टीम',
        planTeamDesc: 'टीमों के लिए सहयोग सुविधाएँ',
      },
      feedback: {
        title: 'फ़ीडबैक',
        description:
          'स्थिति संकेतक और उपयोगकर्ता क्रियाओं का मार्गदर्शन करने के लिए बैज, अलर्ट और स्थिति संकेतक।',
        badges: 'बैज',
        badgesHint: 'स्थिति संकेतक',
        alerts: 'अलर्ट',
        alertsHint: 'संदर्भ संदेश',
        default: 'डिफ़ॉल्ट',
        success: 'सफलता',
        warning: 'चेतावनी',
        error: 'त्रुटि',
        info: 'जानकारी',
        tipTitle: 'सुझाव',
        tipContent: 'तेज़ी से नेविगेट करने के लिए कीबोर्ड शॉर्टकट का उपयोग करें। दबाएँ',
        tipKey: '⌘K',
        tipEnd: 'कमांड पैलेट खोलने के लिए।',
        deployTitle: 'डिप्लॉयमेंट सफल',
        deployContent: 'आपके बदलाव अब लाइव हैं',
        limitTitle: 'सीमा के करीब',
        limitContent:
          'आपने अपने मासिक API कोटा का 80% उपयोग कर लिया है। अपनी योजना को अपग्रेड करने पर विचार करें।',
        buildTitle: 'बिल्ड विफल',
        buildContent: 'में त्रुटि',
        buildError: '— आवश्यक प्रॉप "variant" गायब है',
      },
      overlays: {
        title: 'ओवरले',
        description: 'डायलॉग, ड्रॉपडाउन, टूलटिप और टैब। पूर्ण कीबोर्ड नेविगेशन और फ़ोकस प्रबंधन।',
        dialog: 'डायलॉग',
        dialogHint: 'मॉडल ओवरले',
        dropdown: 'ड्रॉपडाउन',
        dropdownHint: 'एक्शन मेनू',
        tooltips: 'टूलटिप',
        tooltipsHint: 'प्रासंगिक संकेत',
        tabs: 'टैब',
        tabsHint: 'सामग्री संगठन',
        openDialog: 'डायलॉग खोलें',
        deleteTitle: 'प्रोजेक्ट हटाएं?',
        deleteDesc: 'यह क्रिया पूर्ववत नहीं की जा सकती।',
        deleteConfirm: 'क्या आप वाकई हटाना चाहते हैं',
        deleteWarning: 'सभी फ़ाइलें, डिप्लॉयमेंट और एनालिटिक्स डेटा स्थायी रूप से हटा दिए जाएंगे।',
        cancel: 'रद्द करें',
        deleteProject: 'प्रोजेक्ट हटाएं',
        actions: 'क्रियाएँ',
        edit: 'संपादित करें',
        duplicate: 'डुप्लिकेट करें',
        share: 'शेयर करें',
        archive: 'आर्काइव करें',
        delete: 'हटाएं',
        top: 'ऊपर',
        bottom: 'नीचे',
        left: 'बाएँ',
        right: 'दाएँ',
        tooltipTop: 'टूलटिप ऊपर',
        tooltipBottom: 'टूलटिप नीचे',
        tooltipLeft: 'टूलटिप बाएँ',
        tooltipRight: 'टूलटिप दाएँ',
        overview: 'अवलोकन',
        analytics: 'एनालिटिक्स',
        settings: 'सेटिंग्स',
        overviewContent:
          'मुख्य मीट्रिक और हाल की गतिविधि के साथ प्रोजेक्ट अवलोकन। टैब पूर्ण कीबोर्ड नेविगेशन का समर्थन करते हैं।',
        analyticsContent:
          'चार्ट और प्रदर्शन जानकारी के साथ एनालिटिक्स डेटा। टैब के बीच नेविगेट करने के लिए एरो कीज़ दबाएं।',
        settingsContent:
          'अपनी प्रोजेक्ट सेटिंग कॉन्फ़िगर करें। पहले/अंतिम टैब पर जाने के लिए Home/End का उपयोग करें।',
      },
      data: {
        title: 'डेटा डिस्प्ले',
        description: 'सामग्री और उपयोगकर्ता जानकारी प्रस्तुत करने के लिए कार्ड, अवतार और आइकन।',
        cards: 'कार्ड',
        cardsHint: 'सामग्री कंटेनर',
        avatars: 'अवतार',
        avatarsHint: 'उपयोगकर्ता प्रतिनिधित्व',
        icons: 'आइकन',
        iconsHint: 'Lucide आइकन सेट — 24 शामिल',
        stacked: 'स्टैक्ड',
        performance: 'परफ़ॉर्मेंस',
        performanceScore: '100/100 लाइटहाउस',
        performanceDesc:
          'डिफ़ॉल्ट रूप से ज़ीरो JavaScript। इष्टतम गति के लिए चयनात्मक हाइड्रेशन के साथ आइलैंड आर्किटेक्चर।',
        typeSafe: 'टाइप-सेफ',
        typeSafeScore: 'पूर्ण TypeScript',
        typeSafeDesc: 'IDE ऑटोकम्प्लीशन और कंपाइल-टाइम त्रुटि जाँच के साथ सख्त टाइप।',
        i18nReady: 'i18n तैयार',
        i18nScore: 'बहु-भाषा',
        i18nDesc: 'SEO-अनुकूल URL और स्वचालित भाषा पहचान के साथ अंतर्निहित अनुवाद प्रणाली।',
      },
      loading: {
        title: 'लोडिंग',
        description: 'सामग्री लोड होने के दौरान अनुभूत प्रदर्शन के लिए स्केलेटन लोडर।',
        skeletonTypes: 'स्केलेटन प्रकार',
        skeletonTypesHint: 'टेक्स्ट, वृत्ताकार, आयताकार',
        cardSkeleton: 'कार्ड स्केलेटन',
        cardSkeletonHint: 'समग्र लोडिंग स्थिति',
      },
    },
    cta: {
      title: 'बनाने के लिए तैयार हैं?',
      description:
        'ये कंपोनेंट सिर्फ शुरुआत हैं। Velocity को क्लोन करें और तेज़ी से शिप करना शुरू करें।',
      cloneRepo: 'रिपॉजिटरी क्लोन करें',
      readDocs: 'दस्तावेज़ पढ़ें',
    },
  },
  consent: {
    heading: 'कुकी प्राथमिकताएँ',
    description:
      'हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने, व्यक्तिगत सामग्री प्रदान करने और हमारे ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं।',
    acceptAll: 'सभी स्वीकार करें',
    declineAll: 'सभी अस्वीकार करें',
    customize: 'अनुकूलित करें',
    savePreferences: 'प्राथमिकताएँ सहेजें',
    settingsHeading: 'गोपनीयता सेटिंग्स',
    privacyPolicyLabel: 'गोपनीयता नीति',
    alwaysOn: 'हमेशा चालू',
  },
} as const;

export type TranslationKeys = typeof hi;
