import type { L } from '@/lib/i18n';

export type ProjectCategory = 'residential' | 'commercial' | 'renovation' | 'villa';
export type ProjectStatus = 'completed' | 'inProgress';

export interface Project {
  slug: string;
  code: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** gross area in m² */
  area: number;
  floors?: number;
  title: L;
  location: L;
  structure: L;
  summary: L;
  highlights: L<string[]>;
  image: { src: string; width: number; height: number };
  gallery?: { src: string; width: number; height: number }[];
  beforeAfter?: { before: string; after: string };
}

/**
 * Content is based on the project list of the previous site.
 * NOTE: summaries/highlights are editorial copy — confirm details with the team before launch.
 */
export const projects: Project[] = [
  {
    slug: 'farmanieh-residence',
    code: 'RES-01',
    category: 'residential',
    status: 'completed',
    area: 240,
    floors: 4,
    title: { fa: 'ساختمان مسکونی فرمانیه', en: 'Farmanieh Residence' },
    location: { fa: 'تهران، منطقه ۱ — فرمانیه', en: 'Farmanieh, District 1, Tehran' },
    structure: { fa: 'اسکلت بتنی', en: 'Reinforced concrete frame' },
    summary: {
      fa: 'ساختمان مسکونی چهار طبقه با اسکلت بتنی و نمای مدرن؛ طراحی شده برای نور طبیعی حداکثری و پلان‌هایی بدون فضای هدررفته.',
      en: 'A four-storey residence with a concrete frame and a modern facade, planned for maximum daylight and zero wasted space.',
    },
    highlights: {
      fa: ['اسکلت بتنی طبق مقررات ملی ساختمان', 'نمای مدرن با متریال ممتاز', 'نظارت مقیم در تمام مراحل', 'تحویل کلید در موعد قرارداد'],
      en: ['Concrete frame to national building code', 'Modern facade in premium materials', 'Resident supervision throughout', 'Turnkey handover on the contract date'],
    },
    image: { src: '/images/proj-res-1.jpg', width: 800, height: 533 },
  },
  {
    slug: 'valiasr-office-building',
    code: 'COM-02',
    category: 'commercial',
    status: 'completed',
    area: 600,
    title: { fa: 'ساختمان تجاری اداری ولیعصر', en: 'Valiasr Office Building' },
    location: { fa: 'تهران، منطقه ۳ — محور ولیعصر', en: 'Valiasr Axis, District 3, Tehran' },
    structure: { fa: 'نمای لوور و کرتین‌وال', en: 'Louvre facade & curtain wall' },
    summary: {
      fa: 'ساختمان تجاری اداری با نمای لوور و کرتین‌وال روی یکی از پرترددترین محورهای شهر؛ ترکیب شفافیت، کنترل نور و هویت معماری.',
      en: 'A commercial office building with a louvred curtain-wall facade on one of the city’s busiest avenues — transparency, solar control and identity.',
    },
    highlights: {
      fa: ['نمای کرتین‌وال با لوورهای کنترل نور', 'پلان‌های اداری باز و انعطاف‌پذیر', 'هماهنگی کامل طراحی و اجرا', 'تأسیسات مرکزی بهینه'],
      en: ['Curtain wall with solar-control louvres', 'Flexible open-plan office floors', 'Fully integrated design and build', 'Optimised central services'],
    },
    image: { src: '/images/proj-com-1.jpg', width: 800, height: 533 },
  },
  {
    slug: 'district-5-luxury-renovation',
    code: 'REN-03',
    category: 'renovation',
    status: 'completed',
    area: 180,
    title: { fa: 'بازسازی کامل واحد لوکس', en: 'Luxury Apartment Renovation' },
    location: { fa: 'تهران، منطقه ۵', en: 'District 5, Tehran' },
    structure: { fa: 'طراحی داخلی مدرن + هوشمندسازی BMS', en: 'Modern interior + BMS smart home' },
    summary: {
      fa: 'نوسازی کامل یک واحد مسکونی؛ از تعویض تأسیسات تا طراحی داخلی مدرن و هوشمندسازی کامل روشنایی، دما و صدا.',
      en: 'A complete apartment refit — from new services to a modern interior and full smart control of lighting, climate and audio.',
    },
    highlights: {
      fa: ['هوشمندسازی کامل BMS', 'تعویض ۱۰۰٪ تأسیسات', 'نازک‌کاری با اسلب و نورپردازی خطی', 'تحویل با گارانتی کتبی'],
      en: ['Full BMS smart-home system', '100% services replacement', 'Slab finishes and linear lighting', 'Handed over with written warranty'],
    },
    image: { src: '/images/proj-ren-1.jpg', width: 800, height: 600 },
  },
  {
    slug: 'saadat-abad-residential-complex',
    code: 'RES-04',
    category: 'residential',
    status: 'inProgress',
    area: 320,
    floors: 6,
    title: { fa: 'مجتمع مسکونی سعادت‌آباد', en: 'Saadat Abad Residences' },
    location: { fa: 'تهران، منطقه ۲ — سعادت‌آباد', en: 'Saadat Abad, District 2, Tehran' },
    structure: { fa: 'مشاعات هتلینگ و روف‌گاردن', en: 'Hotel-grade amenities & roof garden' },
    summary: {
      fa: 'مجتمع مسکونی شش طبقه با مشاعات هتلینگ و روف‌گاردن؛ هم‌اکنون در فاز نازک‌کاری.',
      en: 'A six-storey residential building with hotel-grade common areas and a roof garden — currently in the finishing phase.',
    },
    highlights: {
      fa: ['لابی و مشاعات هتلینگ', 'روف‌گاردن اختصاصی', 'فاز فعلی: نازک‌کاری', 'گزارش پیشرفت هفتگی به مالکین'],
      en: ['Hotel-style lobby and amenities', 'Private roof garden', 'Current phase: finishing works', 'Weekly progress reports to owners'],
    },
    image: { src: '/images/proj-res-2.jpg', width: 800, height: 1067 },
  },
  {
    slug: 'lavasan-modern-villa',
    code: 'VIL-05',
    category: 'villa',
    status: 'completed',
    area: 450,
    title: { fa: 'ویلای مدرن لواسان', en: 'Lavasan Modern Villa' },
    location: { fa: 'شمال تهران — لواسان', en: 'Lavasan, North of Tehran' },
    structure: { fa: 'طراحی فرمال و استخر معلق', en: 'Formal design & suspended pool' },
    summary: {
      fa: 'ویلای مدرن با زبان معماری فرمال و استخر معلق؛ گفت‌وگویی میان حجم خالص، منظر کوهستان و نور.',
      en: 'A modern villa with a formal architectural language and a suspended pool — a dialogue between pure volume, mountain views and light.',
    },
    highlights: {
      fa: ['استخر معلق با سازه ویژه', 'حجم‌های خالص و بازشوهای بزرگ', 'ارتباط بی‌واسطه با منظر', 'تحویل کلید در دست'],
      en: ['Suspended pool on a bespoke structure', 'Pure volumes and large openings', 'Seamless connection to the landscape', 'Delivered turnkey'],
    },
    image: { src: '/images/proj-villa-1.jpg', width: 800, height: 533 },
  },
  {
    slug: 'bahar-shiraz-mixed-use',
    code: 'COM-06',
    category: 'commercial',
    status: 'completed',
    area: 850,
    title: { fa: 'مجتمع تجاری چندمنظوره بهار شیراز', en: 'Bahar Shiraz Mixed-Use Complex' },
    location: { fa: 'تهران، منطقه ۷ — بهار شیراز', en: 'Bahar Shiraz, District 7, Tehran' },
    structure: { fa: 'سازه فلزی سنگین و پارکینگ هوشمند', en: 'Heavy steel structure & smart parking' },
    summary: {
      fa: 'مجتمع تجاری چندمنظوره با سازه فلزی سنگین و پارکینگ هوشمند؛ دهانه‌های بزرگ برای فضاهای تجاری انعطاف‌پذیر.',
      en: 'A mixed-use commercial complex on a heavy steel frame with smart parking — long spans for flexible retail space.',
    },
    highlights: {
      fa: ['سازه فلزی با دهانه‌های بزرگ', 'پارکینگ مکانیزه هوشمند', 'فضاهای تجاری انعطاف‌پذیر', 'مدیریت پیمان با خرید مستقیم مصالح'],
      en: ['Long-span steel structure', 'Automated smart parking', 'Flexible retail floors', 'Managed with direct materials procurement'],
    },
    image: { src: '/images/proj-com-2.jpg', width: 800, height: 534 },
  },
];

export const projectCategories: ProjectCategory[] = ['residential', 'commercial', 'renovation', 'villa'];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
