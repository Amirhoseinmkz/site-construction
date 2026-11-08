export interface ProcessStep {
  stepNumber: number;
  code: string;
  duration: {
    fa: string;
    en: string;
  };
  title: {
    fa: string;
    en: string;
  };
  subtitle: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  checklist: {
    fa: string[];
    en: string[];
  };
  milestone: {
    fa: string;
    en: string;
  };
}

export const processStepsData: ProcessStep[] = [
  {
    stepNumber: 1,
    code: 'STG-01',
    duration: {
      fa: '۲ الی ۴ هفته',
      en: '2 - 4 Weeks',
    },
    title: {
      fa: 'امکان‌سنجی، مطالعات ژئوتکنیک و ارزیابی سایت',
      en: 'Feasibility, Geotechnical Studies & Site Appraisal',
    },
    subtitle: {
      fa: 'شناخت دقیق خاک، تحلیل پهنه‌بندی شهرداری و تدوین بودجه اولیه',
      en: 'Soil mechanics, municipal zoning analysis, and preliminary budget formulation',
    },
    description: {
      fa: 'بررسی اسناد ثبتی، نقشه‌برداری توپوگرافی با پهپاد و توتال‌استیشن، حفر گمانه‌های ژئوتکنیک و تدوین گزارش توجیهی فنی و اقتصادی پروژه.',
      en: 'Legal deed verification, drone topography survey, geotechnical borehole sampling, and project financial feasibility modeling.',
    },
    checklist: {
      fa: [
        'آزمایش مکانیک خاک و تعیین ظرفیت باربری پی',
        'استعلام ضوابط طرح تفصیلی و تراکم مجاز شهرداری',
        'نقشه‌برداری دقیق ابعاد وضع موجود ملک و همجواری‌ها',
        'ارائه سناریوهای بهینه اقتصادی و مساحت زیربنای قابل احداث',
      ],
      en: [
        'Geotechnical soil borehole testing & bearing capacity calculation',
        'Zoning review & permissible municipal density assessment',
        'High-precision boundary & adjacent structure topographic survey',
        'Optimization scenario modeling for maximum rentable GFA',
      ],
    },
    milestone: {
      fa: 'تصویب منشور پروژه و قرارداد اولیه',
      en: 'Project Charter & Initial Engagement',
    },
  },
  {
    stepNumber: 2,
    code: 'STG-02',
    duration: {
      fa: '۴ الی ۸ هفته',
      en: '4 - 8 Weeks',
    },
    title: {
      fa: 'طراحی مفهومی و فاز ۱ معماری',
      en: 'Conceptual Architecture & Phase 1 Schematic',
    },
    subtitle: {
      fa: 'تبدیل چشم‌انداز کارفرما به اتودهای سه‌بعدی و پلان‌های کاربردی',
      en: 'Translating client vision into 3D schematics and functional floorplans',
    },
    description: {
      fa: 'طراحی فرم، حجم و پلان‌های تفکیکی واحدها، جانمایی دسترسی‌ها و پارکینگ‌ها، طراحی روف‌گاردن و ارائه رندرهای سه‌بعدی واقعی جهت اخذ تاییدیه کارفرما.',
      en: 'Volumetric massing, spatial planning, underground parking geometry, sky gardens, and photorealistic 3D presentation.',
    },
    checklist: {
      fa: [
        'طراحی دیاگرام فضایی و لایه‌بندی پلان‌های معماری',
        'ارائه ۳ آلترناتیو طراحی نما با سبک‌های مدرن یا نئوکلاسیک',
        'بررسی نورگیری طبیعی و تهویه مطبوع بر اساس جهت‌گیری خورشید',
        'جلسات هماهنگی منظم با کارفرما جهت اصلاح و نهایی‌سازی طرح',
      ],
      en: [
        'Spatial zoning diagrams and circulation schematics',
        'Presentation of 3 bespoke facade design options',
        'Solar path and bioclimatic natural illumination analysis',
        'Iterative design review sessions with client approval',
      ],
    },
    milestone: {
      fa: 'تایید نهایی کانسپت معماری توسط کارفرما',
      en: 'Client Sign-off on Architectural Concept',
    },
  },
  {
    stepNumber: 3,
    code: 'STG-03',
    duration: {
      fa: '۴ الی ۶ هفته',
      en: '4 - 6 Weeks',
    },
    title: {
      fa: 'نقشه‌های اجرایی فاز ۲ و مدلسازی BIM',
      en: 'Phase 2 Construction Documents & BIM',
    },
    subtitle: {
      fa: 'محاسبه سازه، تأسیسات مکانیکی، برقی و هماهنگی بدون تداخل',
      en: 'Structural calculations, MEP engineering, and clash-free integration',
    },
    description: {
      fa: 'تکمیل نقشه‌های اجرایی ۴ گرایش (معماری، سازه، مکانیک و برق) در محیط یکپارچه BIM، رفع کلیه تداخلات و تهیه نقشه‌های شاپ‌دراویینگ کارگاهی.',
      en: 'Comprehensive 4-discipline engineering documentation within a collaborative BIM model, eliminating spatial clashes and generating fabrication shop drawings.',
    },
    checklist: {
      fa: [
        'طراحی سازه مقاوم به زلزله بر اساس آیین‌نامه ۲۸۰۰',
        'طراحی سیستم‌های تأسیسات حرارتی، برودتی و هوای تازه',
        'نقشه‌های روشنایی، برق اضطراری، اعلام حریق و BMS',
        'تطبیق کامل نقشه‌های سازه و معماری با دقت میلی‌متری',
      ],
      en: [
        'Earthquake-resistant structural calculation per national seismic code',
        'HVAC central plant, plumbing, and mechanical ventilation schematics',
        'Electrical infrastructure, emergency power, fire alarm & BMS maps',
        'Millimeter-accurate inter-disciplinary clash detection in BIM',
      ],
    },
    milestone: {
      fa: 'دفترچه کامل نقشه‌های مصوب فاز ۲',
      en: 'Approved Phase 2 Engineering Archive',
    },
  },
  {
    stepNumber: 4,
    code: 'STG-04',
    duration: {
      fa: '۴ الی ۸ هفته',
      en: '4 - 8 Weeks',
    },
    title: {
      fa: 'اخذ پروانه ساخت، تدارکات و تجهیز کارگاه',
      en: 'Permitting, Procurement & Site Mobilization',
    },
    subtitle: {
      fa: 'پیشبرد اداری پرونده، قرارداد تامین‌کنندگان و استقرار ایمنی کارگاه',
      en: 'Municipal approvals, manufacturer supply contracts, and HSE mobilization',
    },
    description: {
      fa: 'پیگیری پرونده در شهرداری و نظام مهندسی تا صدور جواز ساخت، خرید دست‌اول آهن‌آلات و سیمان با نرخ کارخانه، و تجهیز کارگاه با رعایت کامل HSE.',
      en: 'Managing bureaucratic workflows to secure municipal construction permits, direct bulk procurement of rebar/cement, and site safety perimeter mobilization.',
    },
    checklist: {
      fa: [
        'اخذ پروانه ساختمان و تاییدیه نقشه‌ها در نظام مهندسی',
        'بیمه کامل کارگاه، پرسنل و مسئولیت مدنی در قبال اشخاص ثالث',
        'نصب حصار کارگاهی، دوربین‌های نظارت لایو و کانکس‌های مهندسی',
        'تامین تجهیزات پایدارسازی گود (انکراژ، نیلینگ یا سازه نگهبان)',
      ],
      en: [
        'Official building permit issuance and regulatory compliance seals',
        'Comprehensive CAR (Contractor All Risk) & third-party insurance',
        'Site hoarding, 24/7 high-definition telemetry cameras & engineer offices',
        'Procurement of excavation shoring equipment (nailing, anchors & soldier piles)',
      ],
    },
    milestone: {
      fa: 'صدور پروانه رسمی و شروع رسمی عملیات خاکی',
      en: 'Official Permit Issued & Groundbreaking',
    },
  },
  {
    stepNumber: 5,
    code: 'STG-05',
    duration: {
      fa: '۶ الی ۱۲ ماه',
      en: '6 - 12 Months',
    },
    title: {
      fa: 'گودبرداری، پایدارسازی و اجرای اسکلت سازه',
      en: 'Excavation, Shoring & Structural Frame Erection',
    },
    subtitle: {
      fa: 'احداث پی، ستون‌ها و سقف‌ها با نظارت آزمایشگاهی مستمر',
      en: 'Foundations, structural columns, and floors under continuous lab inspection',
    },
    description: {
      fa: 'خاکبرداری تا تراز پی، اجرای سازه نگهبان، فونداسیون گسترده، اجرای اسکلت بتنی یا فلزی با کنترل دقیق عیار بتن و آزمایش جوش و بتن‌ریزی منظم طبقات.',
      en: 'Deep excavation, shoring stabilization, mat foundation pour, and multi-tier concrete/steel superstructure erection with strict quality telemetry.',
    },
    checklist: {
      fa: [
        'کنترل پیوسته تغییرشکل دیواره‌های گود با ابزار دقیق مانیتورینگ',
        'آزمایش مقاومت فشاری و اسلامپ بتن در هر نوبت بتن‌ریزی',
        'کنترل تراز و شاقولی ستون‌ها با دوربین‌های دقیق نقشه‌برداری',
        'اجرای وال‌پست‌های نوین مطابق پیوست ششم آیین‌نامه ۲۸۰۰',
      ],
      en: [
        'Continuous inclinometer geotechnical excavation monitoring',
        'Slump and compressive core testing on every concrete truck delivery',
        'Total-station robotic alignment checks on all vertical columns',
        'Engineered wall-post installations per updated seismic regulations',
      ],
    },
    milestone: {
      fa: 'تکمیل ۱۰۰ درصدی اسکلت و جشن پایان سقف آخر',
      en: 'Superstructure Topping-Out Milestone',
    },
  },
  {
    stepNumber: 6,
    code: 'STG-06',
    duration: {
      fa: '۴ الی ۸ ماه',
      en: '4 - 8 Months',
    },
    title: {
      fa: 'تأسیسات زیربنایی، سفت‌کاری و نازک‌کاری لوکس',
      en: 'MEP Rough-Ins, Envelope & Luxury Fit-Out',
    },
    subtitle: {
      fa: 'لوله کشی سوپرپایپ، سنگ‌های اسلب، سقف‌های دکوراتیو و نماسازی',
      en: 'SuperPipe MEP systems, slab marbles, architectural ceilings, and envelope',
    },
    description: {
      fa: 'اجرای تأسیسات مکانیکی و برقی توکار، تست فشار آب و گاز، اجرای عایق‌های رطوبتی و صوتی، اجرای سنگ نمای اصلی و متریال‌های داخلی طبق جزئیات فاز ۲.',
      en: 'Installation of MEP piping, hydrostatic pressure testing, acoustic membranes, dry-hung stone facade systems, and custom interior finishes.',
    },
    checklist: {
      fa: [
        'اجرای تأسیسات با لوله‌های ۵ لایه و تست فشار ۳ برابری',
        'نصب پنجره‌های آلومینیومی ترمال‌بریک و شیشه‌های لمینت دوجداره گاز آرگون',
        'اجرای سنگ‌های اسلب طبیعی با شاسی‌کشی فلزی خشک و چسب‌های اپوکسی',
        'سیم‌کشی هوشمند، نصب کلید و پریزهای لوکس و روشنایی مگنتی',
      ],
      en: [
        '5-layer composite pipe installation with 3x working pressure testing',
        'Thermal-break aluminum joinery with double-glazed argon acoustic glass',
        'Dry-mount installation of natural marble slabs with epoxy anchoring',
        'Smart BMS wiring, luxury architectural switches & magnetic track lights',
      ],
    },
    milestone: {
      fa: 'تکمیل نازک‌کاری و آماده‌سازی برای راه‌اندازی تجهیزات',
      en: 'Finishing Complete & Systems Commissioning',
    },
  },
  {
    stepNumber: 7,
    code: 'STG-07',
    duration: {
      fa: '۲ الی ۴ هفته',
      en: '2 - 4 Weeks',
    },
    title: {
      fa: 'تست، راه‌اندازی (Commissioning)، تحویل کلید و گارانتی',
      en: 'Commissioning, Key Handover & Warranty',
    },
    subtitle: {
      fa: 'تست یکپارچه تأسیسات، تهیه نقشه‌های ازبیلت و خدمات پس از فروش',
      en: 'Integrated systems commissioning, As-Built documentation & warranty',
    },
    description: {
      fa: 'تست کلیه سیستم‌های برودتی، حرارتی، آسانسورها، پمپ‌ها و خانه هوشمند، تحویل دفترچه بهره‌برداری و نقشه‌های چون‌ساخت (As-Built)، تحویل کلید و گارانتی کیفی.',
      en: 'Comprehensive testing and balancing (TAB) of HVAC, elevators, booster pumps, smart home automation, handover of As-Built archives, keys, and 5-year warranty.',
    },
    checklist: {
      fa: [
        'راه‌اندازی چیلرها، بویلرها، فن‌کویل‌ها و دیزل ژنراتور اضطراری',
        'اخذ تاییدیه استاندارد نهایی آسانسور و آتش‌نشانی',
        'ارائه دفترچه راهنمای بهره‌برداری و نگهداری (O&M Manual)',
        'تحویل رسمی واحدها همراه با ضمانت‌نامه کتبی خدمات پس از تحویل',
      ],
      en: [
        'Commissioning of central chillers, boilers, fan coils & backup generator',
        'Final official elevator safety standard and municipal fire brigade seals',
        'Comprehensive Operations & Maintenance (O&M) manual delivery',
        'Formal key handover protocol with written warranty certificate',
      ],
    },
    milestone: {
      fa: 'تحویل کلید و استقرار ساکنین',
      en: 'Key Handover & Occupancy Celebration',
    },
  },
];
