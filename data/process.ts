import type { L } from '@/lib/i18n';

export interface ProcessPhase {
  index: string;
  title: L;
  text: L;
  points: L<string[]>;
}

export const processPhases: ProcessPhase[] = [
  {
    index: '01',
    title: { fa: 'مشاوره و بررسی اولیه', en: 'Consultation & assessment' },
    text: {
      fa: 'زمین یا ملک شما را از نزدیک بازدید می‌کنیم، ابعاد و موقعیت آن را بررسی و انتظارات و بودجه شما را تحلیل می‌کنیم.',
      en: 'We visit your land or property, review its dimensions and context, and analyse your expectations and budget.',
    },
    points: {
      fa: ['بازدید از زمین یا ملک', 'بررسی اسناد و ابعاد', 'نظر اولیه فنی و بودجه تقریبی', 'جلسه اول رایگان'],
      en: ['Site or property visit', 'Review of documents and dimensions', 'Initial technical opinion and budget', 'First meeting free of charge'],
    },
  },
  {
    index: '02',
    title: { fa: 'طراحی و اخذ مجوز', en: 'Design & permits' },
    text: {
      fa: 'طراحی معماری و سازه بر اساس ایده‌های شما و استانداردهای مهندسی انجام شده و پرونده در شهرداری و نظام مهندسی پیگیری می‌شود.',
      en: 'Architecture and structure are designed around your ideas and engineering standards, and the file is taken through the municipality and engineering council.',
    },
    points: {
      fa: ['نقشه‌های معماری و سازه', 'هماهنگی با نظام مهندسی', 'پیگیری پرونده شهرداری', 'تحویل نقشه‌های اجرایی مصوب'],
      en: ['Architectural and structural drawings', 'Engineering-council coordination', 'Municipal permit follow-up', 'Approved construction drawings'],
    },
  },
  {
    index: '03',
    title: { fa: 'اجرا و نظارت', en: 'Construction & supervision' },
    text: {
      fa: 'پس از صدور پروانه، گودبرداری، اسکلت، سفت‌کاری و نازک‌کاری طبق زمان‌بندی دقیق و با نظارت مستمر انجام می‌شود.',
      en: 'Once permitted, excavation, frame, core and finishing works proceed to a precise schedule under continuous supervision.',
    },
    points: {
      fa: ['برنامه زمانی مشخص', 'گزارش پیشرفت هفتگی', 'کنترل کیفیت مستمر مصالح', 'دسترسی مستقیم به مدیر پروژه'],
      en: ['A clear timeline', 'Weekly progress reports', 'Continuous materials QC', 'Direct access to the project manager'],
    },
  },
  {
    index: '04',
    title: { fa: 'تحویل و پشتیبانی', en: 'Handover & aftercare' },
    text: {
      fa: 'پروژه همراه با کارفرما بازرسی، معایب جزئی برطرف و کلید همراه با نقشه‌های چون‌ساخت تحویل می‌شود.',
      en: 'We inspect the project with you, resolve any snags and hand over the keys together with as-built drawings.',
    },
    points: {
      fa: ['بازدید نهایی و رفع ایرادات', 'تسویه‌حساب شفاف', 'تحویل اسناد و نقشه‌های چون‌ساخت', 'پشتیبانی ۶ ماهه پس از تحویل'],
      en: ['Final inspection and snagging', 'Transparent final account', 'Documents and as-built drawings', '6 months of aftercare support'],
    },
  },
];

export const faqs: { q: L; a: L }[] = [
  {
    q: { fa: 'مدت اجرای یک پروژه چقدر است؟', en: 'How long does a project take?' },
    a: {
      fa: 'به متراژ، تعداد طبقات و نوع پروژه بستگی دارد. در جلسه مشاوره اولیه، جدول زمان‌بندی دقیق بر اساس فازبندی پروژه شما ارائه می‌شود.',
      en: 'It depends on area, number of floors and project type. A detailed schedule based on your project’s phasing is provided at the first consultation.',
    },
  },
  {
    q: { fa: 'آیا مشاوره و پیش‌فاکتور اولیه رایگان است؟', en: 'Is the first consultation and quote free?' },
    a: {
      fa: 'بله، جلسه اول مشاوره و ارائه برآورد و پیش‌فاکتور اولیه کاملاً رایگان است.',
      en: 'Yes — the first consultation, estimate and initial quote are completely free.',
    },
  },
  {
    q: { fa: 'اگر هزینه از برآورد بیشتر شد چه می‌شود؟', en: 'What if costs exceed the estimate?' },
    a: {
      fa: 'تمام هزینه‌ها در قرارداد مکتوب درج می‌شود. تغییر هزینه فقط در صورت تغییر مشخصات یا درخواست متریال جدید از سوی کارفرما رخ می‌دهد.',
      en: 'All costs are written into the contract. They change only if the client changes the specification or requests different materials.',
    },
  },
  {
    q: { fa: 'آیا امکان بازدید از روند کار وجود دارد؟', en: 'Can I visit the site during construction?' },
    a: {
      fa: 'بله، کارفرما در تمام مراحل حق بازدید حضوری دارد و گزارش تصویری هفتگی نیز دریافت می‌کند.',
      en: 'Yes — clients can visit at any stage and also receive weekly photo reports.',
    },
  },
  {
    q: { fa: 'پس از تحویل اگر مشکلی پیش آمد چه می‌شود؟', en: 'What happens if issues appear after handover?' },
    a: {
      fa: 'تمام پروژه‌ها شش ماه پشتیبانی رایگان برای رفع ایرادات احتمالی پس از تحویل دارند؛ در پیمان مدیریت و بازسازی، گارانتی کتبی ۲ ساله کیفیت ساخت نیز ارائه می‌شود.',
      en: 'Every project includes six months of free aftercare; management and renovation contracts also carry a written two-year build-quality warranty.',
    },
  },
];
