export type Locale = 'fa' | 'en';

export interface Translations {
  nav: {
    home: string;
    services: string;
    process: string;
    projects: string;
    about: string;
    collaboration: string;
    contact: string;
    consultationCta: string;
  };
  hero: {
    badge: string;
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      projectsDone: { num: string; label: string };
      builtArea: { num: string; label: string };
      experience: { num: string; label: string };
      satisfaction: { num: string; label: string };
    };
    viewModes: {
      blueprint: string;
      structural: string;
      luxuryFacade: string;
    };
  };
  common: {
    viewDetails: string;
    requestConsultation: string;
    all: string;
    residential: string;
    commercial: string;
    renovation: string;
    partnership: string;
    area: string;
    location: string;
    status: string;
    completed: string;
    inProgress: string;
    dwgSpec: string;
    downloadCatalog: string;
    whatsappDirect: string;
    callDirect: string;
    regions: {
      all: string;
      tehran: string;
      shemiranat: string;
      caspian: string;
      kish: string;
      international: string;
    };
  };
  sections: {
    featuredProjectsTitle: string;
    featuredProjectsSub: string;
    viewAllProjects: string;
    servicesTitle: string;
    servicesSub: string;
    processTitle: string;
    processSub: string;
    calculatorTitle: string;
    calculatorSub: string;
    whyUsTitle: string;
    whyUsSub: string;
    consultationTitle: string;
    consultationSub: string;
  };
  calculator: {
    landArea: string;
    landAreaPlaceholder: string;
    floors: string;
    location: string;
    selectZone: string;
    zoneTehran1to3: string;
    zoneTehran4to8: string;
    zoneNorth: string;
    zoneOther: string;
    projectType: string;
    typeLuxury: string;
    typeModern: string;
    typeCommercial: string;
    calculateBtn: string;
    estimatedBuildArea: string;
    estimatedROI: string;
    ownerShare: string;
    builderShare: string;
    recommendedModel: string;
    disclaimer: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    projectType: string;
    areaApprox: string;
    areaApproxPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    successMessage: string;
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    servicesList: string;
    contactInfo: string;
    address: string;
    addressVal: string;
    phoneVal: string;
    emailVal: string;
    rights: string;
    designedWithPrecision: string;
  };
}

export const translations: Record<Locale, Translations> = {
  fa: {
    nav: {
      home: 'صفحه اصلی',
      services: 'خدمات مهندسی',
      process: 'روند ۷ گانه ساخت',
      projects: 'پروژه‌ها و نمونه‌کارها',
      about: 'درباره ما و سوابق',
      collaboration: 'مشارکت و سرمایه‌گذاری',
      contact: 'ارتباط با ما',
      consultationCta: 'درخواست مشاوره تخصصی',
    },
    hero: {
      badge: 'گروه معماری و مهندسی میرکاظمی — تاسیس ۱۳۸۸',
      tagline: 'تلاقی هنر معماری، محاسبات دقیق سازه‌ای و اجرای لوکس',
      titleLine1: 'از طراحی مفهومی',
      titleLine2: 'تا تحویل کلید شاهکار معماری',
      description: 'طراحی، مدلسازی BIM، اجرای اسکلت و نازک‌کاری پروژه‌های فاخر مسکونی، ویلایی و تجاری با بالاترین استانداردهای مهندسی ساختمان و مدیریت پیمان شفاف.',
      ctaPrimary: 'مشاهده پروژه‌های شاخص',
      ctaSecondary: 'محاسبه‌گر مشارکت در ساخت',
      stats: {
        projectsDone: { num: '+۴۵', label: 'پروژه موفق اجراشده' },
        builtArea: { num: '+۱۸۰,۰۰۰', label: 'مترمربع زیربنای ساخته‌شده' },
        experience: { num: '۱۶', label: 'سال تجربه مهندسی مستمر' },
        satisfaction: { num: '۱۰۰٪', label: 'تعهد به زمان‌بندی و قرارداد' },
      },
      viewModes: {
        blueprint: 'حالت نقشه‌کشی (Wireframe)',
        structural: 'اسکلت سازه‌ای (Skeleton)',
        luxuryFacade: 'نمای لوکس نهایی (Facade)',
      },
    },
    common: {
      viewDetails: 'مشاهده جزئیات کامل و نقشه‌ها',
      requestConsultation: 'رزرو جلسه مشاوره حضوری',
      all: 'همه دسته‌ها',
      residential: 'مسکونی فاخر',
      commercial: 'تجاری و اداری',
      renovation: 'بازسازی و نوسازی لوکس',
      partnership: 'مشارکت در ساخت',
      area: 'متراژ زیربنا',
      location: 'موقعیت پروژه',
      status: 'وضعیت اجرا',
      completed: 'تحویل داده شده',
      inProgress: 'در حال احداث و اجرا',
      dwgSpec: 'مشخصات فنی آرشیو نقشه',
      downloadCatalog: 'دانلود کاتالوگ و پروفایل جامع شرکت (PDF)',
      whatsappDirect: 'ارتباط مستقیم در واتساپ',
      callDirect: 'تماس تلفنی با دفتر مرکزی',
      regions: {
        all: 'همه مناطق',
        tehran: 'تهران و شمیرانات (منطقه ۱ تا ۳)',
        shemiranat: 'لواسان و دماوند',
        caspian: 'نوار ساحلی شمال و خزر',
        kish: 'کیش و مناطق آزاد',
        international: 'پروژه‌های برون‌مرزی',
      },
    },
    sections: {
      featuredProjectsTitle: 'شاهکارهای اجرایی میرکاظمی',
      featuredProjectsSub: 'هر پروژه، روایتی از هماهنگی هندسه مهندسی، متریال درجه‌یک جهانی و ظرافت‌های اجرایی است.',
      viewAllProjects: 'مشاهده آرشیو کامل پروژه‌ها',
      servicesTitle: 'خدمات تخصصی مهندسی و ساخت',
      servicesSub: 'پوشش چرخه کامل حیات ساختمان از تحلیل ژئوتکنیک و مدل‌سازی BIM تا اجرای لوکس و تحویل کلید.',
      processTitle: 'روند ۷ گانه اجرای بی‌نقص',
      processSub: 'سیستم گام‌به‌گام و استاندارد مهندسی برای مدیریت زمان، کنترل هزینه و نظارت کیفی دقیق.',
      calculatorTitle: 'محاسبه‌گر آنلاین مشارکت در ساخت',
      calculatorSub: 'تخمین اولیه مساحت قابل احداث، درصد سهم مالک و سازنده، و ارزیابی اقتصادی ملک شما.',
      whyUsTitle: 'چرا گروه ساختمانی میرکاظمی؟',
      whyUsSub: 'ارزش‌های بنیادینی که ضامن کیفیت سازه و آرامش خاطر سرمایه‌گذاران و کارفرمایان است.',
      consultationTitle: 'آماده شروع پروژه رویایی خود هستید؟',
      consultationSub: 'مهندسان مشاور ما آماده ارائه تحلیل اولیه فنی، بازدید از ملک و تهیه برنامه زمان‌بندی و مالی پروژه شما هستند.',
    },
    calculator: {
      landArea: 'مساحت عرصه / زمین (مترمربع)',
      landAreaPlaceholder: 'مثلاً ۴۵۰',
      floors: 'تعداد طبقات مدنظر',
      location: 'منطقه / پهنه شهری',
      selectZone: 'انتخاب موقعیت ملک',
      zoneTehran1to3: 'تهران — منطقه ۱، ۲ و ۳ (شمال و شمیرانات)',
      zoneTehran4to8: 'تهران — سایر مناطق شهری',
      zoneNorth: 'ویلاهای نوار ساحلی شمال (مازندران / گیلان)',
      zoneOther: 'سایر شهرها و مناطق آزاد',
      projectType: 'تیپ ساخت و متریال',
      typeLuxury: 'سوپرلوکس (متریال وارداتی، هوشمندسازی کامل، مشاعات هتلینگ)',
      typeModern: 'مدرن و ممتاز (استاندارد عالی مهندسی، معماری مدرن)',
      typeCommercial: 'تجاری و اداری فاخر',
      calculateBtn: 'محاسبه آنلاین برآورد و سهم مشارکت',
      estimatedBuildArea: 'تخمین کل زیربنای ناخالص:',
      estimatedROI: 'برآورد ارزش افزوده و بازدهی سرمایه‌گذاری:',
      ownerShare: 'سهم مالک زمین:',
      builderShare: 'سهم سازنده (گروه میرکاظمی):',
      recommendedModel: 'مدل قراردادی پیشنهادی:',
      disclaimer: '* این ارقام تخمین اولیه محاسباتی بوده و پس از بررسی دقیق پهنه طرح تفصیلی، اسناد ثبتی و آزمایش خاک نهایی خواهد شد.',
    },
    contactForm: {
      title: 'فرم ثبت درخواست پروژه و مشاوره فنی',
      subtitle: 'اطلاعات اولیه پروژه خود را وارد نمایید تا کارشناسان ارشد مهندسی ظرف کمتر از ۲۴ ساعت کاری با شما تماس بگیرند.',
      fullName: 'نام و نام خانوادگی',
      fullNamePlaceholder: 'مثلاً مهندس رضایی',
      phone: 'شماره تماس مستقیم',
      phonePlaceholder: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'پست الکترونیک (اختیاری)',
      emailPlaceholder: 'name@example.com',
      projectType: 'موضوع پروژه',
      areaApprox: 'متراژ تقریبی یا تعداد طبقات',
      areaApproxPlaceholder: 'مثلاً ۶۰۰ مترمربع در ۵ طبقه',
      message: 'شرح مختصر نیازمندی‌ها، موقعیت ملک یا انتظارات',
      messagePlaceholder: 'توضیحات تکمیلی درباره موقعیت دقیق ملک، پروانه ساخت یا سبک معماری مدنظر...',
      submit: 'ارسال درخواست و تعیین وقت جلسه حضوری',
      successMessage: 'درخواست شما با موفقیت ثبت گردید. کارشناسان ما به زودی با شما تماس خواهند گرفت.',
    },
    footer: {
      brandDesc: 'گروه ساختمانی میرکاظمی، پیشرو در طراحی پایدار، مهندسی سازه، مدیریت پیمان و اجرای پروژه‌های لوکس مسکونی و تجاری با پایبندی به بالاترین استانداردهای کیفیت جهانی.',
      quickLinks: 'دسترسی سریع',
      servicesList: 'دپارتمان‌های مهندسی',
      contactInfo: 'اطلاعات ارتباطی و دفتر',
      address: 'دفتر مرکزی',
      addressVal: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۸۸، برج اداری میرکاظمی',
      phoneVal: '۰۲۱-۲۲۴۰۰۰۰۰ | ۰۹۱۲-۱۱۱۱۱۱۱',
      emailVal: 'info@mirkazemigroup.com',
      rights: 'تمامی حقوق مادی و معنوی متعلق به گروه ساختمانی میرکاظمی است.',
      designedWithPrecision: 'طراحی شده با استانداردهای مهندسی روز و سینماتیک وب',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Engineering Services',
      process: '7-Stage Workflow',
      projects: 'Projects & Portfolio',
      about: 'About & Heritage',
      collaboration: 'Partnership & Investment',
      contact: 'Contact Us',
      consultationCta: 'Request Consultation',
    },
    hero: {
      badge: 'Mirkazemi Architecture & Construction Group — Est. 2009',
      tagline: 'The Convergence of Architectural Art, Rigorous Engineering & Luxury Execution',
      titleLine1: 'From Concept Design',
      titleLine2: 'To Key-in-Hand Masterpieces',
      description: 'Full-cycle architectural design, advanced BIM modeling, structural fabrication, and luxury turnkey construction for landmark residential, private estates, and commercial high-rises.',
      ctaPrimary: 'Explore Landmark Projects',
      ctaSecondary: 'Partnership ROI Estimator',
      stats: {
        projectsDone: { num: '+45', label: 'Masterpiece Projects' },
        builtArea: { num: '+180k m²', label: 'Gross Built Area' },
        experience: { num: '16', label: 'Years of Excellence' },
        satisfaction: { num: '100%', label: 'On-Time Delivery Rate' },
      },
      viewModes: {
        blueprint: 'Blueprint Drafting (Wireframe)',
        structural: 'Structural Skeleton (X-Ray)',
        luxuryFacade: 'Luxury Final Facade (Render)',
      },
    },
    common: {
      viewDetails: 'Explore Full Case Study & Blueprints',
      requestConsultation: 'Book a Private Consultation',
      all: 'All Categories',
      residential: 'Luxury Residential',
      commercial: 'Commercial & High-Rise',
      renovation: 'Luxury Restoration & Fit-Out',
      partnership: 'Construction Joint Venture',
      area: 'Built Area',
      location: 'Project Location',
      status: 'Execution Status',
      completed: 'Completed & Delivered',
      inProgress: 'Under Construction',
      dwgSpec: 'DWG Archive Specifications',
      downloadCatalog: 'Download Corporate Portfolio (PDF)',
      whatsappDirect: 'Direct WhatsApp Chat',
      callDirect: 'Call Headquarters',
      regions: {
        all: 'All Regions',
        tehran: 'Tehran Prime (Districts 1-3)',
        shemiranat: 'Lavasan & Damavand Estates',
        caspian: 'Caspian Coastal Luxury',
        kish: 'Kish Island & Free Zones',
        international: 'International Projects',
      },
    },
    sections: {
      featuredProjectsTitle: 'Landmark Portfolios',
      featuredProjectsSub: 'Each project exemplifies the harmony of engineering precision, world-class materials, and timeless luxury.',
      viewAllProjects: 'View Complete Archive',
      servicesTitle: 'Engineering & Construction Disciplines',
      servicesSub: 'Covering the entire building lifecycle: geotechnical analysis, BIM, structural mastery, and turnkey execution.',
      processTitle: 'The 7-Stage Flawless Workflow',
      processSub: 'A standardized engineering framework ensuring timeline adherence, budget control, and microscopic QA.',
      calculatorTitle: 'Partnership & ROI Feasibility Calculator',
      calculatorSub: 'Preliminary estimation of permissible build area, owner/developer ratios, and economic yield.',
      whyUsTitle: 'Why Choose Mirkazemi Group?',
      whyUsSub: 'Fundamental pillars of trust, technological sophistication, and unyielding material quality.',
      consultationTitle: 'Ready to Realize Your Vision?',
      consultationSub: 'Our senior consulting engineers are ready to evaluate your site, conduct feasibility studies, and structure your project roadmap.',
    },
    calculator: {
      landArea: 'Land / Plot Area (m²)',
      landAreaPlaceholder: 'e.g. 450',
      floors: 'Target Storeys / Floors',
      location: 'Urban Zone / District',
      selectZone: 'Select Location',
      zoneTehran1to3: 'Tehran — Districts 1, 2 & 3 (Prime North)',
      zoneTehran4to8: 'Tehran — Other Urban Districts',
      zoneNorth: 'Caspian Coastal Luxury Estates',
      zoneOther: 'Other Cities & Free Trade Zones',
      projectType: 'Construction & Material Tier',
      typeLuxury: 'Super-Luxury (Imported materials, full smart automation, hotel amenities)',
      typeModern: 'Modern Premium (High-spec engineering & contemporary aesthetics)',
      typeCommercial: 'Grade-A Commercial High-Rise',
      calculateBtn: 'Calculate Feasibility & Ratio',
      estimatedBuildArea: 'Estimated Gross Built Area:',
      estimatedROI: 'Projected Value Addition:',
      ownerShare: 'Landowner Share:',
      builderShare: 'Mirkazemi Group Share:',
      recommendedModel: 'Recommended Contract Model:',
      disclaimer: '* Preliminary analytical estimates subject to detailed zoning verification, deed surveys, and geotechnical soil analysis.',
    },
    contactForm: {
      title: 'Inquire About Your Project',
      subtitle: 'Submit your project parameters and our senior engineering partners will connect with you within 24 hours.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Dr. Alexander Rezaei',
      phone: 'Direct Phone Number',
      phonePlaceholder: '+98 912 345 6789',
      email: 'Email Address (Optional)',
      emailPlaceholder: 'name@example.com',
      projectType: 'Project Scope',
      areaApprox: 'Approx. Area or Storeys',
      areaApproxPlaceholder: 'e.g. 1,200 m² across 6 floors',
      message: 'Brief Project Outline & Location',
      messagePlaceholder: 'Provide details regarding location, planning permissions, or architectural preferences...',
      submit: 'Submit Inquiry & Request Meeting',
      successMessage: 'Your inquiry has been successfully received. Our engineering team will contact you shortly.',
    },
    footer: {
      brandDesc: 'Mirkazemi Construction Group is a distinguished architectural and civil engineering practice dedicated to sustainable design, BIM coordination, construction management, and luxury turnkey delivery.',
      quickLinks: 'Navigation',
      servicesList: 'Engineering Departments',
      contactInfo: 'Headquarters & Inquiries',
      address: 'Headquarters',
      addressVal: '88 Mirkazemi Tower, Moghadas Ardebili St., Zafaraniyeh, Tehran',
      phoneVal: '+98 21 2240 0000 | +98 912 111 1111',
      emailVal: 'info@mirkazemigroup.com',
      rights: 'All rights reserved © 2026 Mirkazemi Construction Group.',
      designedWithPrecision: 'Engineered with 60fps cinematic WebGL & fluid precision',
    },
  },
};
