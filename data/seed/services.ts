import type { L } from '@/lib/i18n';

export type ServiceSlug = 'architecture' | 'management' | 'partnership' | 'renovation';

export interface ServiceStage {
  short: L;
  title: L;
  summary: L;
  actions: L<string[]>;
  deliverable: { title: L; text: L };
}

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: L;
  tagline: L;
  description: L;
  cta: L;
  image: string;
  stages: ServiceStage[];
}

/** SEED DATA — copied into the database (services, stages + translations) when it is empty. */
export const services: Service[] = [
  {
    slug: 'architecture',
    index: '01',
    title: { fa: 'طراحی معماری و مهندسی مفهومی', en: 'Architecture & Concept Engineering' },
    tagline: { fa: 'کانسپت، نقشه‌های فاز ۱ و ۲، اخذ پروانه', en: 'Concept, design development, permits' },
    description: {
      fa: 'تلفیق زیبایی‌شناسی معاصر با ضوابط شهرداری و تحلیل دقیق اقتصادی؛ از نقشه‌برداری زمین تا اخذ پروانه ساختمانی و نقشه‌های اجرایی فاز ۲ بدون پرتی فضایی.',
      en: 'Contemporary aesthetics married to municipal regulations and rigorous financial analysis — from land survey to building permit and construction drawings with zero wasted space.',
    },
    cta: { fa: 'درخواست مشاوره طراحی', en: 'Request a design consultation' },
    image: '/images/svc-consulting.jpg',
    stages: [
      {
        short: { fa: 'آنالیز بستر و اقلیم', en: 'Site & climate analysis' },
        title: { fa: 'آنالیز ملک، پتانسیل‌یابی و امکان‌سنجی ضوابط', en: 'Site analysis, potential & zoning feasibility' },
        summary: {
          fa: 'برداشت دقیق ابعاد، بررسی طرح تفصیلی و تعیین حداکثر تراکم مجاز ساخت.',
          en: 'Accurate survey, detailed-plan review and the maximum permitted density.',
        },
        actions: {
          fa: [
            'نقشه‌برداری عوارض و شیب زمین با دوربین توتال استیشن و ثبت کدهای ارتفاعی گذر',
            'استعلام پهنه‌بندی طرح تفصیلی و محاسبه بیشترین سطح اشغال و طبقات مجاز',
            'تحلیل تابش آفتاب، اقلیم و بادهای غالب برای بهینه‌سازی نور طبیعی',
            'امکان‌سنجی اقتصادی برای حداکثرسازی متراژ مفید و کاهش مشاعات غیرضروری',
          ],
          en: [
            'Total-station topographic survey with precise street-level elevations',
            'Zoning enquiry and calculation of maximum footprint and permitted floors',
            'Sun-path, climate and prevailing-wind analysis to maximise daylight',
            'Financial feasibility to maximise net area and minimise common space',
          ],
        },
        deliverable: {
          title: { fa: 'شناسنامه امکان‌سنجی زمین', en: 'Land feasibility report' },
          text: {
            fa: 'برآورد دقیق تراکم، پارکینگ‌های قابل تأمین و افق مالی پروژه.',
            en: 'Density, achievable parking and the financial horizon of the project.',
          },
        },
      },
      {
        short: { fa: 'کانسپت و طراحی اولیه', en: 'Concept design' },
        title: { fa: 'کانسپت، آلترناتیوهای پلان و مدل‌سازی سه‌بعدی', en: 'Concept, plan alternatives & 3D modelling' },
        summary: {
          fa: 'ارائه ۳ آلترناتیو معماری، جلسات هم‌اندیشی و نهایی‌سازی فرم و حجم بنا.',
          en: 'Three architectural alternatives, co-design sessions and a finalised massing.',
        },
        actions: {
          fa: [
            'اتود ایده‌ها و دیاگرام روابط فضایی بدون راهروهای هدررفته',
            'سه پکیج آلترناتیو از جانمایی واحدها، پلان طبقات و چیدمان مبلمان',
            'جلسات حضوری با کارفرما برای اعمال سلیقه و نیاز خانواده',
            'مدل‌سازی حجم و رندرهای روز و شب از زوایای مختلف شهری',
          ],
          en: [
            'Sketch studies and adjacency diagrams with no wasted corridors',
            'Three alternative packages for unit layout, floor plans and furniture',
            'In-person sessions to reflect the client’s taste and family needs',
            'Massing model and day/night renders from multiple street views',
          ],
        },
        deliverable: {
          title: { fa: 'آلبوم رندر و پلان تثبیت‌شده', en: 'Render album & fixed plans' },
          text: {
            fa: 'تصاویر فتورئال نما، لابی و چیدمان دقیق واحدها.',
            en: 'Photoreal facade, lobby and detailed unit layouts.',
          },
        },
      },
      {
        short: { fa: 'BIM و سازه', en: 'BIM & structure' },
        title: { fa: 'مهندسی سازه، تأسیسات و نقشه‌های فاز ۲', en: 'Structure, MEP & construction drawings' },
        summary: {
          fa: 'محاسبات لرزه‌ای، تأسیسات مکانیک و برق و تداخل‌یابی کامل در BIM.',
          en: 'Seismic design, mechanical and electrical systems, full BIM clash detection.',
        },
        actions: {
          fa: [
            'طراحی سازه بهینه فولادی یا بتنی با ETABS و SAFE برای کاهش هزینه',
            'طراحی سرمایش، گرمایش، تهویه، لوله‌کشی و موتورخانه مرکزی',
            'طراحی برق، هوشمندسازی، روشنایی نما و صاعقه‌گیر',
            'تداخل‌یابی سه‌بعدی (Clash Detection) بین لوله، کانال و سازه',
          ],
          en: [
            'Optimised steel or concrete structure in ETABS & SAFE to cut cost',
            'HVAC, plumbing and central plant-room design',
            'Electrical, smart-home, facade lighting and lightning protection',
            '3D clash detection between pipes, ducts and structural members',
          ],
        },
        deliverable: {
          title: { fa: 'پکیج کامل نقشه‌های فاز ۲ چهار رشته', en: 'Full four-discipline drawing set' },
          text: {
            fa: 'نقشه‌های اجرایی معماری، سازه، مکانیک و برق با مهر نظام مهندسی.',
            en: 'Architecture, structure, mechanical and electrical, stamped and approved.',
          },
        },
      },
      {
        short: { fa: 'پروانه ساختمانی', en: 'Building permit' },
        title: { fa: 'دفاع از طرح، تأییدیه نما و اخذ پروانه', en: 'Approvals, facade committee & permit' },
        summary: {
          fa: 'پیگیری اداری، تأییدیه آتش‌نشانی و صدور پروانه رسمی شهرداری.',
          en: 'Administrative follow-up, fire-safety approval and the official permit.',
        },
        actions: {
          fa: [
            'دفاع از مدارک در کمیته نما و اخذ تأییدیه کمیسیون معماری',
            'اخذ تأییدیه سیستم‌های اعلام و اطفای حریق از آتش‌نشانی',
            'پیگیری فرآیندهای مالی، عوارض و صدور پیش‌نویس پروانه',
            'تحویل نقشه‌های مصوب و پروانه برای آغاز تجهیز کارگاه',
          ],
          en: [
            'Presenting the design to the facade and architecture committees',
            'Fire-department approval of detection and suppression systems',
            'Managing fees, municipal charges and the draft permit',
            'Handing over approved drawings and permit to mobilise the site',
          ],
        },
        deliverable: {
          title: { fa: 'پروانه ساختمانی معتبر', en: 'Valid building permit' },
          text: {
            fa: 'مجوز قانونی شروع عملیات بدون ریسک حقوقی یا توقف کارگاه.',
            en: 'Legal clearance to build, with no legal risk or site stoppage.',
          },
        },
      },
    ],
  },
  {
    slug: 'management',
    index: '02',
    title: { fa: 'پیمان مدیریت و اجرای نظارت‌محور', en: 'Construction Management' },
    tagline: { fa: 'تأمین مصالح، زمان‌بندی و نظارت مستقیم کارگاهی', en: 'Procurement, scheduling, resident supervision' },
    description: {
      fa: 'مدیریت کامل اجرایی، مهندسی ارزش و تأمین مستقیم مصالح بدون واسطه؛ با مهندس ناظر مقیم، فاکتورهای واقعی دست‌اول و پایبندی به گانت‌چارت قرارداد.',
      en: 'End-to-end execution, value engineering and direct procurement with no middlemen — a resident engineer, first-hand invoices and strict adherence to the contractual schedule.',
    },
    cta: { fa: 'برآورد هزینه پیمان مدیریت', en: 'Estimate management fees' },
    image: '/images/svc-turnkey.jpg',
    stages: [
      {
        short: { fa: 'متره، برآورد و WBS', en: 'Takeoff, estimate & WBS' },
        title: { fa: 'مهندسی ارزش، متره و گانت‌چارت', en: 'Value engineering, takeoff & schedule' },
        summary: {
          fa: 'محاسبه ریزمقادیر، اصلاح خطاهای هزینه‌بر نقشه و برنامه هفتگی کارگاه.',
          en: 'Quantity takeoff, fixing costly design errors and a weekly site programme.',
        },
        actions: {
          fa: [
            'بازبینی نقشه‌ها و حذف روش‌های سنتی و پرهزینه به نفع متدهای روز',
            'متره و برآورد کامل بتن، میلگرد، اسکلت، نازک‌کاری و تأسیسات',
            'گانت‌چارت تفصیلی در Primavera/MSP با مسیر بحرانی (CPM)',
            'جدول جریان نقدینگی ماهانه برای برنامه‌ریزی مالی کارفرما',
          ],
          en: [
            'Reviewing drawings and replacing costly traditional methods',
            'Full takeoff of concrete, rebar, frame, finishes and MEP',
            'Detailed Primavera/MSP schedule with critical-path analysis',
            'Monthly cash-flow plan for the client’s financing',
          ],
        },
        deliverable: {
          title: { fa: 'دفترچه بودجه و گانت‌چارت رسمی', en: 'Budget book & official schedule' },
          text: {
            fa: 'تاریخ تحویل هر فاز، پیش‌بینی خریدها و زمان‌بندی مالی.',
            en: 'Phase handover dates, purchasing forecast and payment timeline.',
          },
        },
      },
      {
        short: { fa: 'تدارکات مستقیم', en: 'Direct procurement' },
        title: { fa: 'تأمین دست‌اول مصالح و کنترل کیفیت', en: 'First-hand procurement & quality testing' },
        summary: {
          fa: 'خرید به نرخ کارخانه، حذف واسطه‌ها و آزمایش مصالح ورودی.',
          en: 'Factory-rate purchasing, no middlemen and laboratory testing of materials.',
        },
        actions: {
          fa: [
            'خرید مستقیم مقاطع فولادی از کارخانجات معتبر به قیمت بورس کالا',
            'ارائه حداقل ۳ پیش‌فاکتور رقابتی پیش از هر خرید',
            'آزمایش عیار و مقاومت فشاری ۷ و ۲۸ روزه بتن',
            'انبارداری استاندارد برای جلوگیری از افت و پرت مصالح',
          ],
          en: [
            'Steel sections bought directly from mills at commodity-exchange prices',
            'At least three competitive quotes before every purchase',
            '7- and 28-day concrete strength testing',
            'Controlled storage to prevent loss and waste',
          ],
        },
        deliverable: {
          title: { fa: 'فاکتورهای دست‌اول و برگه آزمایش', en: 'Original invoices & lab reports' },
          text: {
            fa: 'فاکتورهای واقعی کارخانه بدون سود پنهان.',
            en: 'Genuine factory invoices with no hidden margin.',
          },
        },
      },
      {
        short: { fa: 'نظارت مقیم و QC', en: 'Resident QC' },
        title: { fa: 'کادر فنی مقیم و اجرای میلی‌متری', en: 'Resident team & millimetre execution' },
        summary: {
          fa: 'نظارت مستمر بر اتصالات، آرماتوربندی و گزارش روزانه تصویری.',
          en: 'Continuous inspection of connections and rebar with daily photo logs.',
        },
        actions: {
          fa: [
            'قرارداد و بیمه مسئولیت مدنی با پیمانکاران و اکیپ‌های حرفه‌ای',
            'تحویل‌گیری روزانه مهندس مقیم پیش از هر بتن‌ریزی',
            'اجرای چک‌لیست‌های کنترل کیفیت (QC) و ایمنی (HSE)',
            'گزارش روزانه عکس و ویدیو و گزارش پیشرفت هفتگی',
          ],
          en: [
            'Contracts and liability insurance for every subcontractor',
            'Resident-engineer sign-off before every concrete pour',
            'Strict QC checklists and HSE standards',
            'Daily photo/video log and weekly progress report',
          ],
        },
        deliverable: {
          title: { fa: 'دفترچه روزانه کارگاه و چک‌لیست‌های QC', en: 'Site diary & QC checklists' },
          text: {
            fa: 'مستندسازی کامل شیفت‌ها، اتصالات و تست‌های جوش.',
            en: 'Complete record of shifts, connections and weld tests.',
          },
        },
      },
      {
        short: { fa: 'تحویل کلید', en: 'Handover' },
        title: { fa: 'صورت‌وضعیت، تست تأسیسات و تحویل قطعی', en: 'Statements, commissioning & handover' },
        summary: {
          fa: 'تسویه دقیق بر پایه فاکتور واقعی و تحویل با ضمانت کتبی.',
          en: 'Settlement on actual invoices and handover with a written guarantee.',
        },
        actions: {
          fa: [
            'صورت‌وضعیت دوره‌ای شفاف همراه با اصل اسناد خرید',
            'تست هیدرواستاتیک لوله‌کشی و عایق‌های رطوبتی',
            'تست نهایی آسانسور، بویلر، پمپ و چیلر با نماینده شرکت‌ها',
            'تحویل در تاریخ قرارداد با چک‌لیست تحویل و گارانتی',
          ],
          en: [
            'Transparent periodic statements with original receipts',
            'Hydrostatic plumbing and waterproofing tests',
            'Final testing of lifts, boilers, pumps and chillers',
            'Handover on the contract date with checklist and warranty',
          ],
        },
        deliverable: {
          title: { fa: 'صورت‌حساب قطعی و گارانتی ۲ ساله', en: 'Final account & 2-year warranty' },
          text: {
            fa: 'تسویه شفاف تا آخرین ریال و گارانتی کتبی کیفیت ساخت.',
            en: 'Transparent final account and a written build-quality warranty.',
          },
        },
      },
    ],
  },
  {
    slug: 'partnership',
    index: '03',
    title: { fa: 'مشارکت در ساخت', en: 'Joint-Venture Development' },
    tagline: { fa: 'سهم عادلانه، بلاعوض و قرارداد محضری', en: 'Fair share, relocation allowance, notarised contract' },
    description: {
      fa: 'تبدیل ملک کلنگی یا زمین شما به اثری شاخص؛ با محاسبه عادلانه قدرالسهم، قرارداد محضری و تضامین معتبر مالی و ملکی.',
      en: 'Turning your plot or old building into a landmark — with a fair share formula, a notarised contract and solid financial guarantees.',
    },
    cta: { fa: 'کارشناسی رایگان ملک', en: 'Free property appraisal' },
    image: '/images/proj-res-2.jpg',
    stages: [
      {
        short: { fa: 'کارشناسی و تراکم', en: 'Appraisal & density' },
        title: { fa: 'کارشناسی ملک و محاسبه قدرالسهم', en: 'Appraisal & share calculation' },
        summary: {
          fa: 'استعلام ثبتی، کارشناسی قیمت و تعیین سهم منصفانه مالک و سازنده.',
          en: 'Title checks, market valuation and a fair owner/developer split.',
        },
        actions: {
          fa: [
            'استعلام وضعیت ثبتی سند، پهنه‌بندی و عقب‌نشینی‌ها',
            'ارزیابی قیمت روز عرصه بر اساس معاملات واقعی منطقه',
            'فرمول‌بندی شفاف درصد شراکت متناسب با آورده طرفین',
            'تعیین مبلغ بلاعوض متناسب با نیاز مالکین در دوران ساخت',
          ],
          en: [
            'Title-deed, zoning and setback enquiries',
            'Land valuation based on actual local transactions',
            'A transparent share formula reflecting each party’s contribution',
            'Relocation allowance tailored to the owners’ needs',
          ],
        },
        deliverable: {
          title: { fa: 'گزارش کارشناسی و جدول مالی شراکت', en: 'Appraisal & partnership financials' },
          text: {
            fa: 'برآورد سود پروژه، سهم هر مالک و جدول پرداخت بلاعوض.',
            en: 'Projected value, each owner’s share and the allowance schedule.',
          },
        },
      },
      {
        short: { fa: 'قرارداد و تضامین', en: 'Contract & guarantees' },
        title: { fa: 'قرارداد حقوقی، تضامین و برند لیست', en: 'Legal contract, guarantees & spec list' },
        summary: {
          fa: 'قرارداد وکلای ملکی، ضمانت‌نامه بانکی و فهرست برند متریال‌ها.',
          en: 'Lawyer-drafted contract, bank guarantees and a branded materials list.',
        },
        actions: {
          fa: [
            'قرارداد غیرقابل ابطال با مواعد ساخت و وجه‌التزام تأخیر',
            'برند لیست جامع متریال با ذکر برند و کد محصول',
            'ضمانت‌نامه بانکی و چک صیادی تضمین تعهدات',
            'ثبت قرارداد در دفترخانه با حضور وکلای طرفین',
          ],
          en: [
            'Irrevocable contract with deadlines and daily delay penalties',
            'Full materials list with brands and product codes',
            'Bank guarantees and cheques securing every obligation',
            'Notarised registration with both parties’ lawyers present',
          ],
        },
        deliverable: {
          title: { fa: 'قرارداد محضری با تضامین بانکی', en: 'Notarised contract with bank guarantees' },
          text: {
            fa: 'امنیت کامل سرمایه ملک با تضامین حقوقی و بانکی.',
            en: 'Full protection of the owner’s asset through legal and bank guarantees.',
          },
        },
      },
      {
        short: { fa: 'تخریب و اجرا', en: 'Demolition & build' },
        title: { fa: 'اسکان مالکان، پایدارسازی گود و اجرای لوکس', en: 'Relocation, shoring & premium build' },
        summary: {
          fa: 'پرداخت بلاعوض، نیلینگ مهندسی و اجرای بنا با کیفیتی برتر از منطقه.',
          en: 'Allowance paid, engineered shoring and a build above local standards.',
        },
        actions: {
          fa: [
            'واریز بلاعوض پیش از تخلیه و پشتیبانی در دوران جابجایی',
            'تخریب ایمن و پایدارسازی گود با نیلینگ، انکراژ یا سازه نگهبان',
            'اجرای اسکلت و سفت‌کاری با بتن و فولاد استاندارد',
            'بازدیدهای دوره‌ای مالکین همراه با سرپرست کارگاه',
          ],
          en: [
            'Allowance paid before vacating, with support during the move',
            'Safe demolition and shoring by nailing, anchors or retaining walls',
            'Frame and core works with certified concrete and steel',
            'Regular owner site visits with the site manager',
          ],
        },
        deliverable: {
          title: { fa: 'تأییدیه‌های گام‌به‌گام استحکام بنا', en: 'Stage-by-stage structural sign-offs' },
          text: {
            fa: 'گزارش ناظران، آزمایش بتن و تراز پیشرفت فیزیکی.',
            en: 'Supervisor reports, concrete tests and progress balance.',
          },
        },
      },
      {
        short: { fa: 'سند تک‌برگ', en: 'Title deeds' },
        title: { fa: 'پایان‌کار، صورتمجلس تفکیکی و سند تک‌برگ', en: 'Completion certificate, subdivision & deeds' },
        summary: {
          fa: 'تحویل آپارتمان‌ها و اخذ سند شش‌دانگ به نام هر مالک.',
          en: 'Units handed over with an individual title deed for every owner.',
        },
        actions: {
          fa: [
            'پیگیری پرونده شهرداری تا گواهی پایان‌کار و استاندارد آسانسور',
            'اخذ صورتمجلس تفکیکی با ابعاد دقیق واحد، انباری و پارکینگ',
            'صدور سند تک‌برگ شش‌دانگ برای هر واحد طبق تقسیم‌نامه',
            'تحویل تمیز واحدها همراه با ضمانت‌نامه خدمات ساختمانی',
          ],
          en: [
            'Municipal follow-up to completion certificate and lift approval',
            'Subdivision record with exact unit, storage and parking areas',
            'Individual title deed for every unit per the division agreement',
            'Clean handover with a building-services guarantee',
          ],
        },
        deliverable: {
          title: { fa: 'اسناد تک‌برگ و تحویل قطعی', en: 'Title deeds & final handover' },
          text: {
            fa: 'واحدهای لوکس آماده سکونت با اسناد مالکیت مجزا.',
            en: 'Move-in-ready units with separate ownership deeds.',
          },
        },
      },
    ],
  },
  {
    slug: 'renovation',
    index: '04',
    title: { fa: 'بازسازی و نوسازی لوکس', en: 'Luxury Renovation' },
    tagline: { fa: 'نوسازی کامل، ارتقای تأسیسات، نازک‌کاری لوکس', en: 'Full refit, MEP upgrade, premium finishes' },
    description: {
      fa: 'تغییر بنیادین پلان آپارتمان‌ها، ویلاها و فضاهای اداری؛ جایگزینی تأسیسات فرسوده با متریال روز و نازک‌کاری با بالاترین استانداردهای معماری داخلی.',
      en: 'Fundamental re-planning of apartments, villas and offices — replacing worn-out services with modern systems and finishing to the highest interior standards.',
    },
    cta: { fa: 'درخواست بازدید و برآورد', en: 'Request a site visit' },
    image: '/images/svc-renovation.jpg',
    stages: [
      {
        short: { fa: 'اسکن لیزری', en: 'Laser survey' },
        title: { fa: 'اسکن کالبدی و عارضه‌یابی تأسیسات', en: 'Building scan & services diagnosis' },
        summary: {
          fa: 'بررسی لوله‌ها، سیم‌کشی، دیوارهای باربر و فرسودگی‌های پنهان.',
          en: 'Inspection of pipes, wiring, load-bearing walls and hidden decay.',
        },
        actions: {
          fa: [
            'نقشه‌برداری لیزری و ترسیم پلان وضع موجود (As-Built)',
            'ردیابی نشتی، فرسودگی سیم‌کشی و افت راندمان موتورخانه',
            'کارشناسی دیوارهای باربر برای امکان باز کردن فضاها',
            'مصاحبه با کارفرما درباره سبک زندگی و بودجه',
          ],
          en: [
            'Laser survey and accurate as-built drawings',
            'Leak tracing, wiring condition and plant-room efficiency',
            'Assessing load-bearing walls before opening up spaces',
            'Briefing on lifestyle needs and budget',
          ],
        },
        deliverable: {
          title: { fa: 'دفترچه عارضه‌یابی و نقشه وضع موجود', en: 'Condition report & as-built plan' },
          text: {
            fa: 'نقاط بحرانی بنا و پتانسیل‌های تغییر پلان.',
            en: 'Critical issues and opportunities to re-plan.',
          },
        },
      },
      {
        short: { fa: 'طراحی داخلی', en: 'Interior design' },
        title: { fa: 'طراحی داخلی، مودبرد و رندر ۳۶۰ درجه', en: 'Interior design, mood board & 360° renders' },
        summary: {
          fa: 'بازطراحی پلان، انتخاب متریال لوکس و شبیه‌سازی پیش از تخریب.',
          en: 'Re-planning, premium material selection and visualisation before demolition.',
        },
        actions: {
          fa: [
            'تجمیع فضاهای مرده به نفع نشیمن، لاندری و کلوزت',
            'پالت رنگ و مودبرد متریال: اسلب، چوب ترمو، نورپردازی خطی',
            'رندرهای فوتورئال ۳۶۰ درجه از تمام فضاها',
            'نقشه‌های اجرایی نجاری، کناف و نورپردازی',
          ],
          en: [
            'Merging dead space into living, laundry and walk-in closets',
            'Colour palette and materials: slabs, thermo-wood, linear lighting',
            'Photoreal 360° renders of every room',
            'Joinery, drywall and lighting construction drawings',
          ],
        },
        deliverable: {
          title: { fa: 'آلبوم رندر و شیت متریال', en: 'Render album & materials sheet' },
          text: {
            fa: 'دیدن نتیجه نهایی پیش از شروع عملیات.',
            en: 'See the finished space before work begins.',
          },
        },
      },
      {
        short: { fa: 'نوسازی تأسیسات', en: 'MEP renewal' },
        title: { fa: 'تخریب کنترل‌شده، تأسیسات نو و هوشمندسازی', en: 'Controlled strip-out, new MEP & smart home' },
        summary: {
          fa: 'لوله‌کشی پنج‌لایه، سیم‌کشی نوین، عایق رطوبتی و صوتی.',
          en: 'Multilayer piping, new wiring, waterproofing and acoustic insulation.',
        },
        actions: {
          fa: [
            'تخریب ایمن بدون لرزش یا مزاحمت برای همسایگان',
            'تعویض کامل لوله‌های آب و فاضلاب با اتصالات پنج‌لایه و سایلنت',
            'زیرساخت خانه هوشمند برای روشنایی، دما و صدا',
            'عایق رطوبتی با ضمانت آب‌بندی و عایق صوتی دیوارهای مشترک',
          ],
          en: [
            'Safe strip-out with no vibration or disturbance to neighbours',
            'Complete replacement of supply and silent drainage pipes',
            'Smart-home infrastructure for lighting, climate and audio',
            'Guaranteed waterproofing and acoustic insulation of party walls',
          ],
        },
        deliverable: {
          title: { fa: 'تأییدیه تست هیدرواستاتیک', en: 'Hydrostatic test certificate' },
          text: {
            fa: 'تست فشار لوله‌کشی و برق پیش از پوشش نازک‌کاری.',
            en: 'Pressure and electrical tests before finishes are applied.',
          },
        },
      },
      {
        short: { fa: 'نازک‌کاری لوکس', en: 'Premium finishes' },
        title: { fa: 'نازک‌کاری لوکس، کابینت و تحویل هتلینگ', en: 'Premium finishes, joinery & hotel-grade handover' },
        summary: {
          fa: 'نصب اسلب، یراق‌آلات درجه یک، روشنایی و نظافت صنعتی.',
          en: 'Slabs, top-grade hardware, lighting and deep cleaning.',
        },
        actions: {
          fa: [
            'نصب اسلب‌های پرسلانی با فارسی‌بُری دقیق و شیرآلات توکار',
            'تولید و نصب کابینت، کلوزت و پانل دیواری اختصاصی',
            'سقف کناف، ریل مگنتی و چراغ خطی توکار بدون خیرگی',
            'نظافت صنعتی، تست سناریوها و تحویل با گارانتی کتبی',
          ],
          en: [
            'Large porcelain slabs with mitred edges and concealed fittings',
            'Bespoke cabinetry, closets and wall panelling',
            'Drywall ceilings, magnetic tracks and glare-free linear lights',
            'Deep clean, scenario testing and handover with written warranty',
          ],
        },
        deliverable: {
          title: { fa: 'تحویل کلید با گارانتی ۲ ساله', en: 'Keys with a 2-year warranty' },
          text: {
            fa: 'فضای لوکس آماده سکونت همراه با دفترچه ضمانت.',
            en: 'A move-in-ready space with a full warranty booklet.',
          },
        },
      },
    ],
  },
];
