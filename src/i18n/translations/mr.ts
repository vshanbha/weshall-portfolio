/**
 * Marathi translations
 */
export const mr = {
  site: {
    name: 'वी शॉल बिल्ड', // We Shall Build — transliterated, needs native-speaker review
    tagline: 'Build What Matters', // TODO: translate
    description:
      'संस्थापकांसाठी आणि तंत्रज्ञान लीडसाठी, ज्यांच्या निर्णयांची किंमत वेळ आणि पैशात फेडल्यात जाते — स्वतः बनवायचे की विकत घ्यायचे, कोणाला हायर करायचे, आणि AI ने जे बनवले ते टिकेल की नाही.',
  },
  nav: {
    home: 'मुख्यपृष्ठ',
    about: 'आमच्याबद्दल',
    blog: 'ब्लॉग',
    services: 'What I do', // TODO: translate
    contact: 'संपर्क',
    features: 'वैशिष्ट्ये',
    docs: 'दस्तऐवज',
    getStarted: 'सुरू करा',
  },
  common: {
    readMore: 'अधिक वाचा',
    loading: 'लोड होत आहे...',
    error: 'एक त्रुटी झाली',
    notFound: 'पृष्ठ सापडले नाही',
    backHome: 'मुख्यपृष्ठावर परत जा',
    copied: 'कॉपी झाले!',
    copy: 'कॉपी करा',
  },

  // Hero Section
  hero: {
    title: 'Build what matters.', // TODO: translate
    bridge:
      'संस्थापकांसाठी आणि तंत्रज्ञान लीडसाठी, ज्यांच्या निर्णयांची किंमत वेळ आणि पैशात फेडल्यात जाते: स्वतः बनवायचे की विकत घ्यायचे, कोणाला हायर करायचे, आणि AI ने जे बनवले ते टिकेल की नाही. मी वीस वर्षांपासून उत्पादनात याच निर्णय घेत आहे.',
    oneLiner:
      "He's the one you call when AI has built you something that looks fine in a demo, and you can't tell whether it will hold up in production.", // referral one-liner — verbatim by ruling; do not translate
    cta: {
      primary: 'चला बोलूया',
      secondary: 'Read the latest', // TODO: translate
    },
    rightColumn: {
      name: 'विशाल शनभग.', // TODO: transliteration to confirm with author
      statement:
        'इनबोटिकाचा सह-संस्थापक; त्याचे प्लॅटफॉर्म आजही जागतिक बँकांसाठी रोज 100,000 पेक्षा जास्त ईमेल 99.9% उपलब्धतासह प्रक्रिया करते.',
      also: 'याबरोबर: SaaS, AI आणि क्लायमेट टेक.',
      aboutLink: 'About me', // TODO: translate
    },
  },
  techStack: {
    astro: {
      name: 'Astro 6',
      desc: 'सर्व्हर आयलंड्स आणि कंटेंट लेयर',
    },
    tailwind: {
      name: 'Tailwind v4',
      desc: 'झिरो-रनटाइम CSS इंजिन',
    },
    typescript: {
      name: 'TypeScript',
      desc: 'कठोर टाइप सुरक्षा डिफॉल्ट',
    },
    motion: {
      name: 'Motion',
      desc: 'डिक्लेरेटिव्ह अॅनिमेशन',
    },
  },
  features: {
    sectionTitle: 'तुम्हाला आवश्यक असलेली प्रत्येक गोष्ट.',
    sectionTitleHighlight: 'तुम्हाला नको असलेले काहीही नाही.',
    sectionDescription:
      'आम्ही अनावश्यक गोष्टी काढून टाकल्या आणि फक्त ती मूलभूत साधने ठेवली जी एजन्सी आणि फ्रीलान्सर्सचे काम खरोखर वेगवान करतात.',
    tabs: {
      design: {
        label: 'डिझाइन सिस्टीम',
        desc: 'ग्लोबल टोकन आणि टायपोग्राफी',
        title: 'CSS-फर्स्ट डिझाइन टोकन',
        content:
          'व्हेलॉसिटी Tailwind v4 च्या नवीन CSS-फर्स्ट कॉन्फिगरेशनचा वापर करून संपूर्ण डिझाइन सिस्टीम लागू करते. थीम व्हॅल्यूसाठी गडबडीच्या JavaScript कॉन्फिग फायली नाहीत.',
      },
      seo: {
        label: 'SEO आणि मेटा',
        desc: 'OpenGraph आणि साइटमॅप',
        title: 'स्वयंचलित SEO हाताळणी',
        content:
          'Astro ची कंटेंट कलेक्शन्स प्रत्येक पृष्ठासाठी कठोरपणे टाइप केलेले मेटाडेटा इंजेक्शन सक्षम करतात. सोशल शेअर प्रतिमा आपोआप व्युत्पन्न होतात.',
      },
      perf: {
        label: 'कार्यक्षमता',
        desc: '100/100 कोर वेब व्हायटल्स',
        title: 'डिफॉल्टनुसार शून्य JS',
        content:
          'आम्ही Astro ची आयलंड आर्किटेक्चर वापरतो जेणेकरून तुमची मार्केटिंग पृष्ठे क्लायंटला 0kb JavaScript पाठवत असल्याची खात्री होईल, जोपर्यंत स्पष्टपणे परस्परसंवादी नसेल.',
      },
      components: {
        label: 'घटक',
        desc: 'पुनर्वापर करण्यायोग्य UI प्रिमिटिव्ह',
        title: 'टाइप-सेफ घटक',
        content:
          'TypeScript-फर्स्ट घटकांसह आत्मविश्वासाने तयार करा. बॉक्सच्या बाहेर संपूर्ण प्रॉप वैलिडेशन आणि IDE ऑटोकम्प्लीशन.',
      },
      i18n: {
        label: 'आंतरराष्ट्रीयीकरण',
        desc: 'बहु-भाषा समर्थन',
        title: 'अंगभूत आंतरराष्ट्रीयीकरण',
        content:
          'टाइप-सेफ भाषांतरे, स्वयंचलित भाषा शोध आणि SEO-अनुकूल URL रचनांसह बहु-भाषा साइट्ससाठी प्रथम श्रेणीचे समर्थन.',
      },
    },
  },
  credibility: {
    badge: 'प्रॉडक्शन चाचणी उत्तीर्ण',
    title: 'We shall build टीमने तयार केले. जन्म झाला',
    titleHighlight: 'डेडलाइनच्या दबावातून',
    paragraph1:
      'आम्ही एक डिजिटल एजन्सी आहोत जी उच्च-कार्यक्षम मार्केटिंग साइट्स तयार करते. प्रत्येक प्रकल्पाचे पहिले 3 दिवस समान टूलिंग, SEO कॉन्फिग आणि टाइप डेफिनिशन्स सेट करण्यात घालवून आम्ही कंटाळलो.',
    paragraph2:
      'व्हेलॉसिटी हा कोणताही सैद्धांतिक प्रयोग नाही. उद्योग मानक 60 दिवसांऐवजी 14-21 दिवसांत क्लायंट प्रकल्प वितरीत करण्यासाठी आम्ही वापरत असलेला हा कोडबेस आहे.',
    stats: {
      lighthouse: {
        score: 'परिपूर्ण',
        label: 'लाइटहाउस स्कोअर',
      },
      delivery: {
        days: '14 दिवस',
        label: 'सरासरी वितरण वेळ',
      },
    },
    standard: {
      title: 'व्हेलॉसिटी मानक',
      items: [
        'प्रॉडक्शनमध्ये कोणतेही अनावश्यक CSS नाही',
        'बिल्ड वेळी प्रतिमा ऑप्टिमाइझ',
        'टाइप-सेफ कंटेंट कलेक्शन्स',
        'सुलभ प्रिमिटिव्ह पूर्व-कॉन्फिगर',
      ],
    },
    testimonial: {
      quote: '"2024 मध्ये पाहिलेले सर्वात स्वच्छ बॉयलरप्लेट. ते अनावश्यक गोष्टी कापून टाकते."',
      author: '— अॅलेक्स सी., वरिष्ठ फ्रंटएंड देव',
    },
  },
  cta: {
    title: 'Build what matters.',
    titleHighlight: '',
    description:
      'तुम्हाला खात्री नाही की तुमच्याकडे अशी समस्या आहे जी सोडवण्यासाठी पैसे देण्याइतकी चालेल? लोक मला लिहण्याचे सर्वात सामान्य कारण हेच असते.',
    button: 'चला बोलूया',
    docs: '',
    command: '',
  },
  footer: {
    tagline:
      'संस्थापकांसाठी आणि तंत्रज्ञान लीडसाठी, ज्यांच्या निर्णयांची किंमत वेळ आणि पैशात फेडल्यात जाते — स्वतः बनवायचे की विकत घ्यायचे, कोणाला हायर करायचे, आणि AI ने जे बनवले ते टिकेल की नाही.',
    copyright: '© {year} वी शॉल बिल्ड. सर्व हक्क राखीव.',
    madeWith: 'बनवले',
    maintainedBy: 'द्वारे देखभाल केली',
    aiUseInPublishing: 'AI use in publishing', // TODO: translate
    links: {
      documentation: 'दस्तऐवज',
      github: 'GitHub',
      twitter: 'Twitter',
      license: 'परवाना',
    },
  },
  // Home page
  // TODO: translate
  home: {
    blog: {
      title: 'Latest articles', // TODO: translate
    },
    stories: {
      title: 'Engagement stories', // TODO: translate
      items: [
        {
          title: 'टीमला बनवण्यापासून थांबवले — आणि लॉन्च वाचला',
          subtitle: 'Short-term lending, Nigeria', // TODO: translate
          paragraphs: [
            '<em>BlueMoney</em> हा नायजीरियामधील नियामक अनुमतिप्राप्त अल्पकालीन कर्जदाता आहे. मी तीन-संस्थापक टीमला इन्व्हेंटरी कर्जापासून काढून नायजीरियामधील नियामक अल्पकालीन कर्ज व्यवसायात आणले आणि शून्यापासून बनवण्याऐवजी पिकवलेले प्लॅटफॉर्म विकत घेण्यासाठी राजी केले. जानेवारी 2026 मध्ये लॉन्च — नियामक विलंबानंतर. मासिक साउंडिंग बोर्ड कॉल चालू आहेत.',
          ],
        },
        {
          title: '40% वरून 95% कम्प्लायन्स — अशा सिस्टममध्ये जे बँका चालवतात',
          subtitle: 'Enterprise email processing, global banking', // TODO: translate
          paragraphs: [
            'जिथे मी प्रथम अभियंता होतो, तिथीली <em>Inbotiqa</em> ची प्लॅटफॉर्म जागतिक बँकांसाठी रोज 100,000 पेक्षा जास्त ट्रान्झॅक्शनल ईमेल 99.9% उपलब्धतासह प्रक्रिया करते. टर्नअराउंड-टाइम कम्प्लायन्स 40% वरून 95%, सेम-डे क्लोझ-आउट 22% वरून 85%.',
          ],
        },
        {
          title: 'मेनस्ट्रीम होण्यापूर्वी वर्षानवर सर्व्हरलेस मूल्यांकन चालवले',
          subtitle: 'Strategic architecture consulting, India', // TODO: translate
          paragraphs: [
            '2015 मध्ये, <em>HDFC Life</em> मध्ये मी सर्व्हरलेस/MBaaS प्लॅटफॉर्म मूल्यांकन चालवले — मेनस्ट्रीम होण्यापूर्वी वर्षानवर. पॉलिसीधारकांच्या कुटुंबांना वृद्ध पालकांसाठी सत्यापित घरगुती काळजीची विनंती करण्यासाठी आंतरिक मोबाइल प्लॅटफॉर्मची रचना केली. मोठ्या प्रमाणावर build-versus-buy.',
          ],
        },
      ],
    },
    testimonials: {
      title: 'What clients say', // TODO: translate
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
  // TODO: translate
  services: {
    meta: {
      title: 'What I do', // TODO: translate
      description:
        'संस्थापकांसाठी आणि तंत्रज्ञान लीडसाठी, ज्यांच्या निर्णयांची किंमत वेळ आणि पैशात फेडल्यात जाते — स्वतः बनवायचे की विकत घ्यायचे, कोणाला हायर करायचे, आणि AI ने जे बनवले ते टिकेल की नाही.',
    },
    hero: {
      title: 'काही निर्णय चुकल्यास महाग पडतात.',
      description:
        'For founders and technical leads at growth-stage companies who need a second senior operator in the room. Not a lecturer, not a slide deck, not an overconfident hallucinator. An engineer who has seen the patterns and can help you navigate them.', // TODO: translate
    },
    howwork: {
      title: 'How I work',
      paragraphs: [
        'मी अशा संस्थापकांसोबत आणि तंत्रज्ञान लीडसोबत काम करतो जे एखाद्या निर्णयावर, भाड्याने घेण्यावर, हार्डनिंग समस्येवर किंवा सॅनिटी चेकवर असतात.',
        'नाते एका मोफत पंधरा-मिनिटांच्या बोलण्यापासून सुरू होते — ते लांब बोलण्याइतके चालेल की नाही हे कळण्यासाठी. न पिच, न कोणतीही बंधनकारकता, न कोणतीही सेल्स प्रक्रिया.',
        'We figure out together what needs to happen next. Sometimes it is a single conversation. Sometimes it leads to ongoing work. The shape of the engagement follows the shape of the problem.', // TODO: translate
      ],
    },
    cta: {
      title: 'तीन आकार, एक बोलणं.',
      description:
        'मोफत इंट्रो कॉल · ईमानदार एक तास · दोन ते चार आठवड्यांचे डायग्नोस्टिक · चालू मासिक सल्लागार.',
      button: 'चला बोलूया',
    },
  },

  // About page
  about: {
    // TODO: translate
    meta: {
      title: 'About',
      description:
        'Builder, senior architect, and hands-on engineer. 20+ years from Mumbai to Cologne.',
    },
    origin: {
      title: 'विशाल शनभग', // TODO: transliteration to confirm with author
      paragraphs: [
        'I come from Mumbai, India. These days I am in Hürth, near Cologne, Germany.',
        'I graduated as an electronics engineer from Mumbai University in 2002. I stumbled into software because, after the 9/11 attacks of 2001, jobs dried up and a financial crisis loomed. The software industry was the first to hire. I have been building production systems ever since.',
        'I came to Germany in 2023 because my wife was transferred. I like to travel, and the startup, software, and climate tech scene here? Das gefällt mir. I am staying.',
        'I speak five languages at varying levels of decline: English — native, Hindi and Marathi native, Konkani conversational, German at B1 and counting.',
      ],
    },
    whatido: {
      title: 'How I build', // TODO: translate
      oneLiner:
        "He's the one you call when AI has built you something that looks fine in a demo, and you can't tell whether it will hold up in production.", // referral one-liner — verbatim by ruling; do not translate
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
          tie: 'प्रत्येक एंगेजमेंट इथेच सुरू होते: हे का बनवायचे, आता का, कोणासाठी — कोणी "कसे" विचारण्यापूर्वी.',
        },
        {
          title: 'We shall build for outcomes, not features.', // TODO: translate
          tie: 'आम्ही तुम्हाला हवे असल्या परिणामाकडे मागे फिरून काम करतो; फीचरची मागणी त्याचे फक्त लक्षण आहे.',
        },
        {
          title: 'We shall prototype before we commit.', // TODO: translate
          tie: 'याच आठवड्यात अपयशी जाणारा मोठा प्रोटोटाइप एक आठवडा खर्च करतो. बाजारात अपयशी जाणारा पूर्ण बिल्ड एक तिमाही.',
        },
      ],
      fullTen: 'संपूर्ण दहा आदेश पहा →',
    },
    careerarc: {
      title: 'The career arc, briefly',
      paragraphs: [
        'My first big job out of university was at <strong>Infosys</strong>, in their Banking & Capital Markets group. That is where I got my first global exposure: on-site in Richmond, Virginia, for a major US bank, harmonising a relational data model across 500+ tables.',
        '2006 took me to <strong>Lehman Brothers</strong> in Mumbai. I survived the 2008 bankruptcy. Met my future co-founder there.',
        'At <strong>Nomura</strong> I stayed with the same team, working in the same building. A few years later, in 2011, I co-founded <strong>Inbotiqa</strong> with the colleague I met at Lehman.',
      ],
      highlights: [
        {
          name: 'Inbotiqa / YUDOmail',
          description:
            ' is the work I am asked about most. I built the system that processes 100,000+ transactional emails a day for global banking, at 99.9% availability. The numbers I care about are the operational ones: turnaround-time compliance went from 40–60% to over 95%; same-day close-out from 22% to 85%; email volume dropped 43%, and complaints went to zero. Inbotiqa is a Techstars portfolio company and went through their Fintech accelerator in London in 2019.',
        },
        {
          name: 'BauAI',
          description:
            ' (Sep 2025 – Feb 2026) is the most recent. A vibe-coding-generated codebase that needed to become a scalable, production-ready product. The work was less "add more AI" and more "decide which AI-generated decisions survive contact with users."',
        },
      ],
      earlier:
        'Earlier: <strong>HDFC Life Insurance</strong> (early serverless, 2015), <strong>Progress Software</strong> (2011).',
      linkedin: {
        text: 'Connect with me on LinkedIn',
        url: 'https://www.linkedin.com/in/vishal-shanbhag-70b679a/',
        note: '; drop a note when you connect, or I might filter you as spam.',
      },
    },
    speaking: {
      title: 'Speaking, writing, mentorship',
      talks: {
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
        title: 'Select articles',
        intro: 'I write for JavaPro and Baeldung — two names every Java professional recognises.', // TODO: translate
        items: [
          {
            title:
              'Bridging Java and Python for AI/ML in Production: The Case for GraalPy on GraalVM',
            url: 'https://javapro.io/2026/03/10/bridging-java-and-python-for-ai-ml-in-production-the-case-for-graalpy-on-graalvm/',
            platform: 'JavaPro',
          },
          {
            title:
              'Greener Code: Sustainable Java Deployments with Native Builds and Knative Serverless on Kubernetes',
            url: 'https://javapro.io/2025/06/11/greener-code-sustainable-java-deployments-with-native-builds-and-knative-serverless-on-kubernetes/',
            platform: 'JavaPro',
          },
          {
            title: 'How to Secure Ollama Server',
            url: 'https://medium.com/@vvsvish/how-to-secure-ollama-server-64cde5e59971',
            platform: 'Medium',
          },
          // TODO: translate
          {
            title: "Flutter ain't going away",
            url: 'https://medium.com/@vvsvish',
            platform: 'Level Up Coding',
          },
          // TODO: translate
          {
            title: "Why you shouldn't use Langchain's indexing API?",
            url: 'https://medium.com/@vvsvish',
            platform: 'Level Up Coding',
          },
          {
            title: 'Baeldung Author Page',
            url: 'https://www.baeldung.com/author/vishalshanbhag/',
            platform: 'Baeldung',
          },
        ],
      },
      mentoring: {
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
      title: 'Off the clock',
      paragraphs: [
        'I trek, I travel, I write — in order of increasing frequency. I travel mostly by public transport. I cook rarely, badly, and enthusiastically (all three are related). I live to eat. I am, like every self-respecting Indian, a fan of spicy food, particularly the Malwani style Bombay duck, which is a fish, not a bird, named after my hometown. Yes, it confuses everyone.', // TODO: translate
        "I like stories presented on a bigger screen. I watch Bollywood and Hollywood movies. I grew up listening to music from Kishore Kumar, Asha Bhosle, and R.D. Burman, and am now trying to make sense of German music. The Mahabharata, R.K. Narayan's condensed English version, is the one book that has stayed with me. As a kid, I was fascinated with technology. I always wanted to take things apart and put them back together. I called it reverse engineering. These days, I explore software builds with the same curiosity and write what I learn, sometimes with metaphors and analogies from Hollywood or Bollywood movies.", // TODO: translate
      ],
      closingLead: 'If you have an idea that needs software to give it life, ', // TODO: translate
      closing: 'चला बोलूया.',
    },
    editorialStandards: {
      title: 'Editorial standards', // TODO: translate
      statement:
        'AI may assist with research, drafting, sense-checking, and review. Every article passes a human review gate. Writing, opinions, and observations remain the author’s own.', // TODO: translate
    },
    cta: {
      title: 'Have a problem worth solving?',
      button: 'चला बोलूया',
    },
  },
  contact: {
    meta: {
      title: 'संपर्क करा',
      description:
        'पंधरा मिनिटं, कोणतीही बंधनकारकता नाही, कोणताही पिच नाही. लांब बोलण्याइतके चालेल की नाही याच्याबद्दल थेट उत्तर — जरी उत्तर "नाही" असले तरी.',
    },
    hero: {
      title: 'तुम्हाला स्वच्छ ब्रीफची गरज नाही. गोंधळ घेऊन या.',
      description:
        'जेव्हा लोक मला लिहितात, त्यांपैकी बहुतेकांना खात्री नसते की त्यांच्याकडे समस्या आहे, प्रश्न आहे, किंवा फक्त ही जाणीव की काहीतरी बरोबर नाही. सुरुवातीची ही एक सामान्य जागा आहे आणि थांबण्याचे कारण नाही.',
      oneLiner:
        "He's the one you call when AI has built you something that looks fine in a demo, and you can't tell whether it will hold up in production.", // referral one-liner — verbatim by ruling; do not translate
    },
    free: {
      description:
        'पंधरा मिनिटं, कोणतीही बंधनकारकता नाही, कोणताही पिच नाही. लांब बोलण्याइतके चालेल की नाही याच्याबद्दल थेट उत्तर — जरी उत्तर "नाही" असले तरी.',
      button: 'चला बोलूया',
      url: 'https://calendly.com/vshanbhag',
    },
    paid: {
      title: 'पूर्ण तास हवा?',
      description:
        'एक पेड साउंडिंग बोर्ड: वरिष्ठ आर्किटेक्टसह तुमच्या समस्येवर 60 मिनिटं, क्वालिफिकेशन कॉलशिवाय.',
      button: 'निर्णयाची चाचणी करा',
      url: 'https://www.upwork.com/services/consultation/development-it-vishal-1688119352130330624?ref=project_share',
    },
    write: {
      title: 'आधी लिहायला आवडते?',
      description: 'जे काही आहे ते पाठवा — एक पॅराग्राफ, रिपोचा लिंक, किंवा अर्धअपुरी काळजी.',
      linkedin: {
        button: 'LinkedIn वर कनेक्ट करा',
        url: 'https://www.linkedin.com/in/vishal-shanbhag-70b679a/',
      },
      upwork: {
        button: 'Upwork यादी पहा',
        url: 'https://www.upwork.com/services/consultation/development-it-vishal-1688119352130330624?ref=project_share',
      },
    },
  },
  form: {
    name: 'नाव',
    email: 'ईमेल',
    message: 'संदेश',
    submit: 'सबमिट करा',
    sending: 'पाठवले जात आहे...',
    success: 'संदेश यशस्वीरित्या पाठवला!',
    error: 'संदेश पाठविण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.',
  },
  blog: {
    title: 'ब्लॉग',
    description: 'नवीनतम लेख आणि अद्यतने',
    allPosts: 'सर्व पोस्ट',
    featured: 'वैशिष्ट्यीकृत',
    noPosts: 'कोणतीही पोस्ट आढळली नाही',
    relatedPosts: 'संबंधित पोस्ट',
    backToBlog: 'ब्लॉगवर परत जा',
    subscribe: 'सबस्क्राईब करा',
    subscribeDescription: 'नवीनतम लेख आणि अद्यतने थेट तुमच्या इनबॉक्समध्ये मिळवा.',
    emailPlaceholder: 'तुमचा ईमेल टाका',
    subscribeButton: 'सबस्क्राईब करा',
  },
  components: {
    meta: {
      title: 'घटक',
      description:
        'व्हेलॉसिटीची सर्वसमावेशक UI घटक लायब्ररी एक्सप्लोर करा. प्रॉडक्शन-रेडी, सुलभ आणि सुंदर डिझाइन केलेली.',
    },
    hero: {
      badge: 'प्रॉडक्शन घटक',
      title: 'घटक',
      titleHighlight: 'लायब्ररी',
      description:
        'सुलभता आणि कार्यक्षमता लक्षात घेऊन तयार केलेले प्रॉडक्शन-रेडी UI प्रिमिटिव्ह. कॉपी करा, पेस्ट करा आणि तुमच्या ब्रँडनुसार सानुकूलित करा.',
      browseComponents: 'घटक ब्राउझ करा',
      viewSource: 'स्रोत पहा',
    },
    categories: {
      buttons: 'बटणे',
      inputs: 'फॉर्म इनपुट',
      feedback: 'फीडबॅक',
      overlays: 'ओव्हरले',
      data: 'डेटा प्रदर्शन',
      loading: 'लोडिंग',
    },
    sections: {
      buttons: {
        title: 'बटणे',
        description:
          'क्रिया आणि नेव्हिगेशनसाठी परस्परसंवादी घटक. सर्व प्रकार आयकॉन, लोडिंग स्थिती आणि पूर्ण सुलभता समर्थन करतात.',
        variants: 'प्रकार',
        variantsHint: 'वेगवेगळ्या संदर्भांसाठी 6 शैली',
        sizes: 'आकार',
        sizesHint: 'प्रतिसादात्मक स्केलिंग',
        states: 'अवस्था',
        withIcons: 'आयकॉनसह',
        primary: 'प्राथमिक',
        secondary: 'दुय्यम',
        outline: 'बाह्यरेखा',
        ghost: 'भूत',
        link: 'दुवा',
        destructive: 'विध्वंसक',
        small: 'लहान',
        medium: 'मध्यम',
        large: 'मोठे',
        default: 'डिफॉल्ट',
        loading: 'लोड होत आहे',
        disabled: 'अक्षम',
        send: 'पाठवा',
        export: 'निर्यात करा',
        star: 'तारा',
      },
      inputs: {
        title: 'फॉर्म इनपुट',
        description:
          'टेक्स्ट फील्ड, निवड, चेकबॉक्स आणि बरेच काही. नेटिव्ह वैलिडेशन आणि ARIA समर्थनासह तयार केलेले.',
        textInput: 'टेक्स्ट इनपुट',
        textInputHint: 'लेबल आणि वैलिडेशनसह',
        textarea: 'टेक्स्टएरिया',
        textareaHint: 'बहु-ओळी टेक्स्ट इनपुट',
        select: 'निवड',
        selectHint: 'नेटिव्ह ड्रॉपडाउन',
        checkboxes: 'चेकबॉक्स',
        checkboxesHint: 'बहु-निवड नियंत्रणे',
        planSelection: 'योजना निवड',
        planSelectionHint: 'कार्ड-शैली रेडिओ पर्याय',
        emailLabel: 'ईमेल पत्ता',
        emailPlaceholder: 'तुम्ही@example.com',
        passwordLabel: 'पासवर्ड',
        passwordPlaceholder: '••••••••',
        passwordHint: 'किमान 8 अक्षरे असणे आवश्यक आहे',
        disabledLabel: 'अक्षम',
        disabledPlaceholder: 'संपादित करू शकत नाही',
        messageLabel: 'संदेश',
        messagePlaceholder: 'तुमचा संदेश इथे लिहा...',
        messageHint: 'मार्कडाउन फॉरमॅटिंग समर्थन करते',
        countryLabel: 'देश',
        selectCountry: 'देश निवडा...',
        termsLabel: 'मी सेवेच्या अटींशी सहमत आहे',
        updatesLabel: 'मला उत्पादन अद्यतने पाठवा',
        notificationsLabel: 'सूचना सक्षम करा',
        notificationsDesc: 'महत्त्वाच्या अद्यतनांसाठी अलर्ट प्राप्त करा',
        planFree: 'विनामूल्य',
        planFreeDesc: 'वैयक्तिक प्रकल्पांसाठी मूलभूत वैशिष्ट्ये',
        planPro: 'प्रो',
        planProDesc: 'व्यावसायिकांसाठी प्रगत साधने',
        planTeam: 'टीम',
        planTeamDesc: 'टीमसाठी सहयोग वैशिष्ट्ये',
      },
      feedback: {
        title: 'फीडबॅक',
        description:
          'स्थिती दर्शविण्यासाठी आणि वापरकर्त्याच्या क्रियांचे मार्गदर्शन करण्यासाठी बॅज, अलर्ट आणि स्थिती संकेतक.',
        badges: 'बॅज',
        badgesHint: 'स्थिती संकेतक',
        alerts: 'अलर्ट',
        alertsHint: 'संदर्भ संदेश',
        default: 'डिफॉल्ट',
        success: 'यश',
        warning: 'चेतावणी',
        error: 'त्रुटी',
        info: 'माहिती',
        tipTitle: 'टीप',
        tipContent: 'वेगाने नेव्हिगेट करण्यासाठी कीबोर्ड शॉर्टकट वापरा. दाबा',
        tipKey: '⌘K',
        tipEnd: 'कमांड पॅलेट उघडण्यासाठी.',
        deployTitle: 'डिप्लॉयमेंट यशस्वी',
        deployContent: 'तुमचे बदल आता लाइव्ह आहेत',
        limitTitle: 'मर्यादेजवळ',
        limitContent:
          'तुम्ही तुमच्या मासिक API कोटाचा 80% वापर केला आहे. तुमची योजना अपग्रेड करण्याचा विचार करा.',
        buildTitle: 'बिल्ड अयशस्वी',
        buildContent: 'मध्ये त्रुटी',
        buildError: '— आवश्यक प्रॉप "variant" गहाळ आहे',
      },
      overlays: {
        title: 'ओव्हरले',
        description:
          'डायलॉग, ड्रॉपडाउन, टूलटिप आणि टॅब. पूर्ण कीबोर्ड नेव्हिगेशन आणि फोकस व्यवस्थापन.',
        dialog: 'डायलॉग',
        dialogHint: 'मॉडल ओव्हरले',
        dropdown: 'ड्रॉपडाउन',
        dropdownHint: 'क्रिया मेनू',
        tooltips: 'टूलटिप',
        tooltipsHint: 'संदर्भित संकेत',
        tabs: 'टॅब',
        tabsHint: 'सामग्री संघटन',
        openDialog: 'डायलॉग उघडा',
        deleteTitle: 'प्रकल्प हटवायचा?',
        deleteDesc: 'ही क्रिया पूर्ववत करता येणार नाही.',
        deleteConfirm: 'तुम्हाला खरोखर हटवायचे आहे का',
        deleteWarning: 'सर्व फायली, डिप्लॉयमेंट आणि अॅनालिटिक्स डेटा कायमचे काढून टाकले जातील.',
        cancel: 'रद्द करा',
        deleteProject: 'प्रकल्प हटवा',
        actions: 'क्रिया',
        edit: 'संपादित करा',
        duplicate: 'डुप्लिकेट करा',
        share: 'शेअर करा',
        archive: 'आर्काइव्ह करा',
        delete: 'हटवा',
        top: 'वर',
        bottom: 'खाली',
        left: 'डावीकडे',
        right: 'उजवीकडे',
        tooltipTop: 'टूलटिप वर',
        tooltipBottom: 'टूलटिप खाली',
        tooltipLeft: 'टूलटिप डावीकडे',
        tooltipRight: 'टूलटिप उजवीकडे',
        overview: 'विहंगावलोकन',
        analytics: 'अॅनालिटिक्स',
        settings: 'सेटिंग्ज',
        overviewContent:
          'मुख्य मेट्रिक्स आणि अलीकडील क्रियाकलापांसह प्रकल्प विहंगावलोकन. टॅब पूर्ण कीबोर्ड नेव्हिगेशन समर्थन करतात.',
        analyticsContent:
          'चार्ट आणि कार्यक्षमता अंतर्दृष्टीसह अॅनालिटिक्स डेटा. टॅब दरम्यान नेव्हिगेट करण्यासाठी एरो की दाबा.',
        settingsContent:
          'तुमच्या प्रकल्प सेटिंग्ज कॉन्फिगर करा. पहिल्या/शेवटच्या टॅबवर जाण्यासाठी Home/End वापरा.',
      },
      data: {
        title: 'डेटा प्रदर्शन',
        description: 'सामग्री आणि वापरकर्ता माहिती सादर करण्यासाठी कार्ड, अवतार आणि आयकॉन.',
        cards: 'कार्ड',
        cardsHint: 'सामग्री कंटेनर',
        avatars: 'अवतार',
        avatarsHint: 'वापरकर्ता प्रतिनिधित्व',
        icons: 'आयकॉन',
        iconsHint: 'Lucide आयकॉन सेट — 24 समाविष्ट',
        stacked: 'स्टॅक केलेले',
        performance: 'कार्यक्षमता',
        performanceScore: '100/100 लाइटहाउस',
        performanceDesc:
          'डिफॉल्टनुसार शून्य JavaScript. इष्टतम गतीसाठी निवडक हायड्रेशनसह आयलंड आर्किटेक्चर.',
        typeSafe: 'टाइप-सेफ',
        typeSafeScore: 'पूर्ण TypeScript',
        typeSafeDesc: 'IDE ऑटोकम्प्लीशन आणि कंपाइल-टाइम त्रुटी तपासणीसह कठोर प्रकार.',
        i18nReady: 'i18n तयार',
        i18nScore: 'बहु-भाषा',
        i18nDesc: 'SEO-अनुकूल URL आणि स्वयंचलित भाषा शोधासह अंगभूत भाषांतर प्रणाली.',
      },
      loading: {
        title: 'लोडिंग',
        description: 'सामग्री लोड होत असताना जाणवणाऱ्या कार्यक्षमतेसाठी स्केलेटन लोडर.',
        skeletonTypes: 'स्केलेटन प्रकार',
        skeletonTypesHint: 'मजकूर, वर्तुळाकार, आयताकार',
        cardSkeleton: 'कार्ड स्केलेटन',
        cardSkeletonHint: 'संमिश्र लोडिंग स्थिती',
      },
    },
    cta: {
      title: 'तयार करण्यास तयार आहात?',
      description: 'हे घटक फक्त सुरुवात आहेत. व्हेलॉसिटी क्लोन करा आणि जलद शिप करणे सुरू करा.',
      cloneRepo: 'रिपॉझिटरी क्लोन करा',
      readDocs: 'दस्तऐवज वाचा',
    },
  },
  consent: {
    heading: 'कुकी प्राधान्ये',
    description:
      'आम्ही तुमचा ब्राउझिंग अनुभव वाढवण्यासाठी, वैयक्तिक सामग्री प्रदान करण्यासाठी आणि आमच्या ट्रॅफिकचे विश्लेषण करण्यासाठी कुकीज वापरतो.',
    acceptAll: 'सर्व स्वीकारा',
    declineAll: 'सर्व नाकारा',
    customize: 'सानुकूलित करा',
    savePreferences: 'प्राधान्ये जतन करा',
    settingsHeading: 'गोपनीयता सेटिंग्ज',
    privacyPolicyLabel: 'गोपनीयता धोरण',
    alwaysOn: 'नेहमी चालू',
  },
} as const;

export type TranslationKeys = typeof mr;
