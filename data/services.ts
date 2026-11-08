export interface ServiceItem {
  id: string;
  code: string;
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
  deliverables: {
    fa: string[];
    en: string[];
  };
  iconName: string;
  image: string;
  dwgLayer: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'architectural-design',
    code: 'SEC-01',
    title: {
      fa: 'طراحی معماری و مدلسازی فاز ۱ و ۲',
      en: 'Architectural Design & BIM Phase 1 & 2',
    },
    subtitle: {
      fa: 'خلق شاهکارهای بصری با تلفیق فرم‌های مدرن و استانداردهای اقلیمی',
      en: 'Creating visual masterworks blending contemporary forms with bioclimatic harmony',
    },
    description: {
      fa: 'طراحی جامع معماری از ایده‌پردازی اولیه تا نقشه‌های اجرایی فاز ۲، مدلسازی سه‌بعدی پیشرفته در Revit، طراحی نماهای داینامیک و اخذ کلیه تاییدیه‌های شهرداری و نظام مهندسی.',
      en: 'Full-spectrum architectural engineering from conceptual diagrams to Phase 2 detailed construction documents, advanced Autodesk Revit BIM coordination, kinetic facades, and complete municipal permitting.',
    },
    deliverables: {
      fa: [
        'دفترچه نقشه‌های فاز ۲ معماری مطابق آخرین ویرایش مباحث مقررات ملی',
        'مدل اطلاعاتی ساختمان (BIM LOD 400) و رفع کامل تداخلات سازه و تأسیسات',
        'رندرهای فوتورئالیستیک سه‌بعدی و انیمیشن‌های سینماتیک پروژه',
        'طراحی لنداسکیپ، روف‌گاردن و فضای سبز چهارفصل',
      ],
      en: [
        'Detailed Phase 2 architectural drawing sets meeting national building codes',
        'Building Information Modeling (BIM LOD 400) with clash detection',
        'Photorealistic 3D ray-traced renderings and cinematic project walkthroughs',
        'Sustainable landscape, bioclimatic courtyards, and four-season sky gardens',
      ],
    },
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    dwgLayer: 'A-WALL-EXTR',
  },
  {
    id: 'structural-engineering',
    code: 'SEC-02',
    title: {
      fa: 'محاسبات و مهندسی سازه ضدزلزله',
      en: 'Seismic Structural Calculations & Engineering',
    },
    subtitle: {
      fa: 'طراحی بهینه اسکلت بتنی و فولادی با ضرایب اطمینان حداکثری',
      en: 'Optimized concrete and steel structural frameworks with maximum safety factors',
    },
    description: {
      fa: 'محاسبه و طراحی دقیق سازه‌های مقاوم در برابر زلزله، دال‌های پس‌کشیده (Post-Tensioned)، سیستم‌های نوین کوبیاکس و یوبوت، تحلیل خطی و غیرخطی، و ارائه نقشه‌های شاپ‌دراویینگ (Shop Drawings).',
      en: 'Precision seismic structural analysis, post-tensioned slab design, voided biaxial slab systems (Cobiax/U-Boot), non-linear dynamic simulation, and detailed structural fabrication shop drawings.',
    },
    deliverables: {
      fa: [
        'محاسبات در نرم‌افزارهای ETABS و SAFE با بهینه‌سازی مصرف فولاد و بتن',
        'طراحی سازه‌های با دهانه‌های بزرگ بدون ستون مزاحم',
        'نقشه‌های اجرایی شاپ‌دراویینگ اسکلت فلزی و آرماتوربندی دقیق',
        'آزمایشات کنترل کیفی بتن، کشش میلگرد و تست‌های غیرمخرب جوش (NDT)',
      ],
      en: [
        'Parametric optimization in ETABS & SAFE reducing material waste',
        'Long-span column-free architectural structural solutions',
        'Steel fabrication shop drawings & microscopic rebar schedules',
        'Non-destructive weld testing (NDT) & continuous concrete lab telemetry',
      ],
    },
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    dwgLayer: 'S-COLS-BEAM',
  },
  {
    id: 'turnkey-construction',
    code: 'SEC-03',
    title: {
      fa: 'اجرای ساختمان و مدیریت پیمان (Turnkey)',
      en: 'Turnkey Construction & EPC Management',
    },
    subtitle: {
      fa: 'تعهد به زمان‌بندی دقیق، شفافیت مالی و اکیپ‌های اجرایی متخصص',
      en: 'Strict timeline guarantees, financial transparency, and master craftsmen',
    },
    description: {
      fa: 'اجرای صفر تا صد پروژه‌های ساختمانی تحت سیستم مدیریت پیمان شفاف، نظارت مهندسین مقیم، تامین مصالح درجه یک با قیمت کارخانه، و کنترل روزانه روند کار با سیستم WBS و نمودار گانت.',
      en: 'Turnkey construction management (EPC) from ground excavation to interior key handover. Resident project directors, direct-from-manufacturer procurement, and daily Gantt/WBS tracking.',
    },
    deliverables: {
      fa: [
        'گزارش‌دهی مالی و پیشرفت فیزیکی هفتگی و ماهانه به کارفرما',
        'تضمین کیفیت کتبی و گارانتی بهره‌برداری پس از تحویل',
        'مدیریت ایمنی کارگاه (HSE) بر اساس استانداردهای بین‌المللی',
        'نظارت مستمر آزمایشگاه مکانیک خاک و بتن در تمام مراحل بتن‌ریزی',
      ],
      en: [
        'Weekly transparent financial and physical progress analytics',
        'Written quality warranty & post-handover facility support',
        'Strict Health, Safety & Environment (HSE) protocol enforcement',
        'Continuous certified geotechnical & concrete lab inspection during all pours',
      ],
    },
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    dwgLayer: 'C-STRC-TURK',
  },
  {
    id: 'luxury-interior-fitout',
    code: 'SEC-04',
    title: {
      fa: 'دکوراسیون داخلی و نازک‌کاری سوپرلوکس',
      en: 'Luxury Interior Architecture & Fit-Out',
    },
    subtitle: {
      fa: 'اجرای ظریف‌ترین جزئیات، متریال وارداتی و سیستم‌های هوشمند',
      en: 'Meticulous finishing, imported bespoke materials, and smart living systems',
    },
    description: {
      fa: 'طراحی و اجرای فضای داخلی شامل سنگ‌کاری اسلب‌های بوک‌مچ، کابینت‌ها و کمدهای اختصاصی، نورپردازی داینامیک خطی و مغناطیسی، شیرآلات توکار و سیستم‌های هوشمندسازی هتلی.',
      en: 'Bespoke interior architecture including large-format Italian book-matched slabs, custom joinery, magnetic linear architectural illumination, concealed fixtures, and high-end home automation.',
    },
    deliverables: {
      fa: [
        'انتخاب و نصب سنگ‌های اسلب طبیعی کلاکاتا، پرشین سیلک و ماربل',
        'سیستم‌های هوشمند BMS، مدیریت سناریوهای روشنایی و تهویه مطبوع',
        'عایق‌بندی صوتی ۱۰۰ درصدی دیوارها و کف‌های مشترک',
        'نصب آشپزخانه‌های مدرن جزیره‌ای با اپلاینس‌های توکار اروپایی',
      ],
      en: [
        'Sourcing & installation of imported natural Calacatta & marble slabs',
        'BMS home automation with intuitive climate & mood scene programming',
        '100% acoustic isolation between inter-floor and party walls',
        'Modern island kitchens equipped with integrated luxury appliances',
      ],
    },
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    dwgLayer: 'I-FURN-FIT',
  },
];
