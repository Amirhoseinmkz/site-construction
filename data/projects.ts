export interface ProjectItem {
  id: string;
  slug: string;
  category: 'residential' | 'commercial' | 'renovation' | 'partnership';
  region: 'tehran' | 'shemiranat' | 'caspian' | 'kish' | 'international';
  status: 'completed' | 'inProgress';
  year: string;
  area: string;
  floors: number;
  location: {
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
  features: {
    fa: string[];
    en: string[];
  };
  dwgNo: string;
  structureType: {
    fa: string;
    en: string;
  };
  heroImage: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  blueprintData?: {
    scale: string;
    zone: string;
    architect: string;
    structuralEngineer: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'zafaraniyeh-palatial-residence',
    category: 'residential',
    region: 'tehran',
    status: 'completed',
    year: '2024',
    area: '۳,۴۰۰ مترمربع',
    floors: 8,
    location: {
      fa: 'تهران، زعفرانیه',
      en: 'Zafaraniyeh, Tehran',
    },
    title: {
      fa: 'برج‌باغ لوکس زعفرانیه',
      en: 'Zafaraniyeh Palatial Residence',
    },
    subtitle: {
      fa: 'طراحی نئوکلاسیک با متریال سنگ گرانیت و چوب ترمو فنلاندی',
      en: 'Neoclassical architectural luxury with Finnish thermo-wood and granite facade',
    },
    description: {
      fa: 'پروژه شاخص ۸ طبقه مسکونی مشتمل بر واحدهای دوبلکس ۵۰۰ متری، استخر معلق شیشه‌ای در روف‌گاردن، سیستم هوشمند KNX، سالن اجتماعات و ۴ طبقه پارکینگ زیرسطحی.',
      en: 'A flagship 8-storey residential tower featuring 500m² duplex suites, suspended glass rooftop pool, integrated KNX smart building automation, private ballroom, and 4 underground parking tiers.',
    },
    features: {
      fa: [
        'سازه دال مجوف با دهانه‌های ۱۲ متری بدون ستون مزاحم',
        'روف‌گاردن چهارفصل با دید ۳۶۰ درجه رشته‌کوه البرز',
        'سیستم تأسیسات مرکزی VRF دایکین ژاپن و عایق صوتی کوبیاکس',
        'آسانسورهای پانورامیک پرسرعت با موتور سشلر سوئیس',
      ],
      en: [
        'Hollow core slab structure with 12m clear column spans',
        'Four-season landscaped sky garden with 360° Alborz vistas',
        'Daikin VRF central HVAC with acoustic Cobiax insulation',
        'Schindler Swiss panoramic high-speed elevators',
      ],
    },
    dwgNo: 'DWG-MKZ-2024-01',
    structureType: {
      fa: 'اسکلت بتن آرمه با دال مجوف و بتن خودمتراکم SCC',
      en: 'Reinforced Concrete with Voided Slab & SCC Technology',
    },
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    blueprintData: {
      scale: '1:100',
      zone: 'R122',
      architect: 'دفتر طراحی میرکاظمی',
      structuralEngineer: 'دکتر علیرضا میرکاظمی',
    },
  },
  {
    id: 'proj-2',
    slug: 'lavasan-cantilever-villa',
    category: 'residential',
    region: 'shemiranat',
    status: 'completed',
    year: '2023',
    area: '۱,۲۵۰ مترمربع',
    floors: 3,
    location: {
      fa: 'لواسان، عسلک',
      en: 'Asalak, Lavasan',
    },
    title: {
      fa: 'ویلا کنسول لواسان',
      en: 'Lavasan Cantilever Villa',
    },
    subtitle: {
      fa: 'معماری مدرن آوانگارد با کنسول ۶ متری معلق بر فراز دره',
      en: 'Avant-garde contemporary cantilever architecture poised above the valley',
    },
    description: {
      fa: 'طراحی ویلای صخره‌ای سه طبقه با سازه مرکب فولادی و بتنی، دیوارهای شیشه‌ای قدی کرتین‌وال سه جداره، استخر اینفینیتی لبریز و حیاط مرکزی ژاپنی.',
      en: 'A 3-level cliffside villa featuring structural steel cantilever engineering, triple-glazed floor-to-ceiling curtain walls, horizon infinity pool, and an internal Japanese zen courtyard.',
    },
    features: {
      fa: [
        'کنسول ۶ متری بدون ستون با سازه فضاکار خرپایی فولادی',
        'استخر اینفینیتی ۴ فصل با تصفیه ازن و آبشار دیواری',
        'کنترل مصرف انرژی خورشیدی با پنل‌های فتوولتائیک آلمانی',
        'سیستم امنیتی بیومتریک و دوربین‌های پایش حرارتی',
      ],
      en: [
        '6-meter unsupported structural cantilever steel truss',
        'Four-season ozone-purified infinity pool with cascade feature',
        'Integrated solar photovoltaic renewable micro-grid',
        'Biometric access control and thermal perimeter security',
      ],
    },
    dwgNo: 'DWG-MKZ-2023-04',
    structureType: {
      fa: 'سازه مرکب فولادی سنگین با تیرورق‌های سفارشی',
      en: 'Composite Heavy Steel with Custom Built-Up Plate Girders',
    },
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    blueprintData: {
      scale: '1:50',
      zone: 'V-Lavasan',
      architect: 'آرشیتکت میرکاظمی',
      structuralEngineer: 'مهندسی سازه میرکاظمی',
    },
  },
  {
    id: 'proj-3',
    slug: 'elahiyeh-corporate-tower',
    category: 'commercial',
    region: 'tehran',
    status: 'completed',
    year: '2023',
    area: '۶,۸۰۰ مترمربع',
    floors: 14,
    location: {
      fa: 'تهران، الهیه',
      en: 'Elahiyeh, Tehran',
    },
    title: {
      fa: 'برج اداری تجاری الهیه',
      en: 'Elahiyeh Corporate Tower',
    },
    subtitle: {
      fa: 'برج هوشمند اداری با نمای داینامیک لوور آلومینیومی و روف‌اسکای',
      en: 'Smart grade-A corporate high-rise with motorized kinetic facade and sky lounge',
    },
    description: {
      fa: 'احداث ساختمان تجاری اداری در ۱۴ طبقه با رعایت الزامات سازه‌های بلندمرتبه، سیستم اعلام و اطفای حریق پیشرفته، شبکه فیبر نوری اختصاصی و معماری پایدار با گواهی راندمان مصرف انرژی.',
      en: 'Construction of a 14-storey premier commercial high-rise engineered for seismic resilience, equipped with dry/wet riser fire suppression, dedicated fiber backbone, and LEED-inspired energy metrics.',
    },
    features: {
      fa: [
        'نمای هوشمند متحرک لوور جهت کنترل تابش آفتاب و ذخیره انرژی',
        'هسته مرکزی برشی بتنی ضدزلزله با سیستم مهاربندی کمانش‌تاب',
        'تأسیسات چیلر جذبی سنترال با راندمان فوق‌العاده بالا',
        'لابی دوبل به ارتفاع ۷ متر با لایتینگ داینامیک خطی',
      ],
      en: [
        'Kinetic parametric louvers for solar heat-gain reduction',
        'Buckling-Restrained Braced (BRB) seismic core system',
        'High-efficiency central absorption chiller plant',
        '7-meter double-height atrium lobby with linear dynamic lighting',
      ],
    },
    dwgNo: 'DWG-MKZ-2023-09',
    structureType: {
      fa: 'اسکلت بتن آرمه مجهز به میراگرهای ویسکوز و دیوار برشی',
      en: 'RC Core with Viscous Dampers and BRB Frame',
    },
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    blueprintData: {
      scale: '1:200',
      zone: 'S214',
      architect: 'گروه معماری میرکاظمی',
      structuralEngineer: 'دپارتمان محاسبات سازه میرکاظمی',
    },
  },
  {
    id: 'proj-4',
    slug: 'niavaran-heritage-penthouse-renovation',
    category: 'renovation',
    region: 'tehran',
    status: 'completed',
    year: '2024',
    area: '۶۵۰ مترمربع',
    floors: 2,
    location: {
      fa: 'تهران، نیاوران',
      en: 'Niavaran, Tehran',
    },
    title: {
      fa: 'بازسازی و نوسازی پنت‌هاوس نیاوران',
      en: 'Niavaran Penthouse Transformation',
    },
    subtitle: {
      fa: 'بازآفرینی کامل فضای داخلی، تقویت سازه و دکوراسیون مینیمال لوکس',
      en: 'Complete structural reinforcement, bespoke acoustic envelope, and Italian minimalism',
    },
    description: {
      fa: 'تغییر کلی پلان معماری و حذف دیوارهای باربر با اجرای شمع‌های فولادی مخفی، تعویض ۱۰۰ درصدی تأسیسات مکانیکی و الکتریکی، نصب کف‌پوش سنگ اسلب بوک‌مچ کلاکاتا ایتالیا.',
      en: 'Structural re-engineering removing load-bearing walls using concealed steel lintels, 100% MEP infrastructure renewal, book-matched Italian Calacatta marble flooring, and Boffi custom kitchen.',
    },
    features: {
      fa: [
        'تقویت سازه‌ای تیرها با الیاف کربن ژئوتکستایل FRP',
        'هوشمندسازی جامع نورپردازی، پرده‌های برقی و سیستم صوتی سقف',
        'شومینه اتانولی معلق ۳ متری در فضای نشیمن اصلی',
        'سوئیت مستر رویال با کلوزت‌روم شیشه‌ای ارگونومیک',
      ],
      en: [
        'Carbon-fiber FRP composite beam reinforcement',
        'Comprehensive Lutron lighting, motorized drapery and in-ceiling audio',
        '3-meter suspended linear bio-ethanol fireplace',
        'Royal master sanctuary with Rimadesio glass walk-in wardrobe',
      ],
    },
    dwgNo: 'DWG-MKZ-2024-03',
    structureType: {
      fa: 'مقاوم‌سازی سازه موجود با کامپوزیت FRP و سازه الحاقی',
      en: 'FRP Retrofit & Structural Steel Reinforcement',
    },
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    blueprintData: {
      scale: '1:50',
      zone: 'Interior',
      architect: 'آتلیه طراحی داخلی میرکاظمی',
      structuralEngineer: 'مهندس ارشد بازسازی',
    },
  },
  {
    id: 'proj-5',
    slug: 'caspian-coastal-resort-villa',
    category: 'residential',
    region: 'caspian',
    status: 'inProgress',
    year: '2025',
    area: '۲,۱۰۰ مترمربع',
    floors: 4,
    location: {
      fa: 'مازندران، کلارآباد',
      en: 'Kelarabad, Caspian Coast',
    },
    title: {
      fa: 'عمارت ساحلی خزر',
      en: 'Caspian Coastal Resort Villa',
    },
    subtitle: {
      fa: 'طراحی اقلیمی متناسب با آب‌وهوای مرطوب شمال با دید مستقیم دریا',
      en: 'Climate-responsive luxury coastal villa with private beachfront access',
    },
    description: {
      fa: 'مجتمع ویلایی فاخر در ۴ طبقه با پی‌ریزی شمع‌های عمیق ضدخوردگی آب شور، سقف‌های شیبدار مدرن هیدن، اسکله اختصاصی تفریحی و محوطه‌سازی ارگانیک.',
      en: 'A premier 4-level beachfront sanctuary engineered with marine-grade anti-corrosion deep micropile foundations, hidden standing-seam zinc roof, private jetty, and bioclimatic gardens.',
    },
    features: {
      fa: [
        'بتن ضدسولفات تیپ ۵ با عیار ۴۰۰ و افزودنی‌های نانو نفوذناپذیر',
        'پنجنده‌های آلومینیومی ترمال‌بریک Schuco آلمان ضدطوفان',
        'سیستم زهکشی سطحی و چاه‌های جذبی مهندسی‌شده',
        'باشگاه بدنسازی، اسپا و حمام ترکی اختصاصی',
      ],
      en: [
        'Type V marine-grade sulfate-resistant nano-concrete',
        'Schuco German hurricane-rated thermal-break glazing',
        'Engineered sub-surface storm drainage matrix',
        'Private fitness pavilion, wellness spa, and traditional hammam',
      ],
    },
    dwgNo: 'DWG-MKZ-2025-02',
    structureType: {
      fa: 'سازه بتنی مقاوم در برابر محیط‌های شدید مرطوب و اسکلت فلزی روف',
      en: 'Marine Reinforced Concrete & Steel Sky-Frame',
    },
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    ],
    blueprintData: {
      scale: '1:100',
      zone: 'Coastal-Zone-A',
      architect: 'تیم معماری میرکاظمی',
      structuralEngineer: 'متخصصین سازه‌های ساحلی',
    },
  },
  {
    id: 'proj-6',
    slug: 'saadat-abad-residential-complex',
    category: 'partnership',
    region: 'tehran',
    status: 'inProgress',
    year: '2025',
    area: '۴,۸۰۰ مترمربع',
    floors: 9,
    location: {
      fa: 'تهران، سعادت‌آباد',
      en: 'Saadat Abad, Tehran',
    },
    title: {
      fa: 'مجتمع مسکونی مشارکتی سعادت‌آباد',
      en: 'Saadat Abad Partnership Complex',
    },
    subtitle: {
      fa: 'پروژه شاخص مشارکت در ساخت با مدل قراردادی شفاف و مصالح سوپرلوکس',
      en: 'High-yield joint-venture residential complex with Grade-A finishes',
    },
    description: {
      fa: 'پروژه مشارکت در ساخت زمین ۵۵۰ متری در سعادت‌آباد با مدل تسهیم ۵۵ به ۴۵ درصد، تامین کامل هزینه‌های ساخت توسط گروه میرکاظمی و پرداخت بلاعوض تضمین‌شده به مالکین محترم.',
      en: 'A 550m² land joint venture in Saadat Abad with a 55/45 owner-builder equity split, 100% construction financing by Mirkazemi Group, and guaranteed upfront compensation escrow.',
    },
    features: {
      fa: [
        'قرارداد حقوقی سفت‌وسخت با ضمانت‌نامه بانکی حسن انجام تعهدات',
        'گزارش‌دهی ماهانه آنلاین پیشرفت فیزیکی از طریق دوربین‌های لایو کارگاه',
        'استخر سرپوشیده، سونا، جکوزی و سالن ورزش در طبقه منفی ۱',
        'طراحی پلان‌های بدون پرتی با نورگیری دوطرفه شمال و جنوب',
      ],
      en: [
        'Ironclad escrow contract backed by bank performance guarantees',
        'Monthly live-stream digital construction progress telemetry',
        'Sub-grade wellness club: lap pool, dry sauna, jacuzzi & gym',
        'Optimized zero-waste dual-aspect floorplans with natural light',
      ],
    },
    dwgNo: 'DWG-MKZ-2025-07',
    structureType: {
      fa: 'اسکلت فلزی پیچ و مهره‌ای با سقف عرشه فولادی',
      en: 'Bolted Structural Steel Frame with Composite Deck',
    },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    ],
    blueprintData: {
      scale: '1:100',
      zone: 'R122',
      architect: 'دفتر فنی مهندسی میرکاظمی',
      structuralEngineer: 'دکتر علیرضا میرکاظمی',
    },
  },
];
