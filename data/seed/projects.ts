import type { L } from '@/lib/i18n';

export type ProjectCategory = 'construction' | 'renovation';
export type ProjectStatus = 'completed' | 'inProgress';

export interface Project {
  slug: string;
  /** optional internal code (shown as a badge when set) */
  code: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** gross area in m² — null until the real figure is known (then it is hidden) */
  area: number | null;
  floors?: number;
  title: L;
  location: L;
  /** optional; empty strings / arrays are simply not shown */
  structure: L;
  summary: L;
  highlights: L<string[]>;
  image: { src: string; width: number; height: number };
  gallery?: { src: string; width: number; height: number }[];
  beforeAfter?: { before: string; after: string };
}

/** Stock photos stand in until the real ones arrive (each project gets one in turn). */
const STOCK = ['proj-res-1', 'proj-com-1', 'proj-res-2', 'proj-villa-1', 'proj-com-2', 'proj-ren-1'].map((n) => ({ src: `/images/${n}.jpg`, width: 800, height: 533 }));

/**
 * SEED DATA — copied into the database when it is empty (or when SEED_VERSION in lib/db/connection.ts changes).
 * Only facts given by the owner are filled in: names and locations.
 * Area, floors, structure, summary, highlights, code and photos are added per project when available.
 * To add a project, copy one block and fill what you know; leave the rest empty.
 */
export const projects: Project[] = [
  {
    slug: 'amirabad-19th-st',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'خیابان نوزدهم امیرآباد', en: 'Amirabad, 19th Street' },
    location: { fa: 'امیرآباد، تهران', en: 'Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[0],
  },
  {
    slug: 'amirabad-26th-st-no-9',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'خیابان بیست و ششم امیرآباد، پلاک ۹', en: 'Amirabad, 26th Street, No. 9' },
    location: { fa: 'امیرآباد، تهران', en: 'Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[1],
  },
  {
    slug: 'amirabad-26th-st-no-47',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'خیابان بیست و ششم امیرآباد، پلاک ۴۷', en: 'Amirabad, 26th Street, No. 47' },
    location: { fa: 'امیرآباد، تهران', en: 'Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[2],
  },
  {
    slug: 'amirabad-26th-st-no-12',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'خیابان بیست و ششم امیرآباد، پلاک ۱۲', en: 'Amirabad, 26th Street, No. 12' },
    location: { fa: 'امیرآباد، تهران', en: 'Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[3],
  },
  {
    slug: 'dodangeh',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'پروژه دودانگه', en: 'Dodangeh Project' },
    location: { fa: 'تهران', en: 'Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[4],
  },
  {
    slug: 'north-amirabad-no-19',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'امیرآباد شمالی، پلاک ۱۹', en: 'North Amirabad, No. 19' },
    location: { fa: 'امیرآباد شمالی، تهران', en: 'North Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[5],
  },
  {
    slug: 'qeytarieh-district-1',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'قیطریه — منطقه یک', en: 'Qeytarieh — District 1' },
    location: { fa: 'قیطریه، منطقه ۱ تهران', en: 'Qeytarieh, District 1, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[0],
  },
  {
    slug: 'qeytarieh-2',
    code: '',
    category: 'construction',
    status: 'inProgress',
    area: null,
    title: { fa: 'قیطریه ۲', en: 'Qeytarieh 2' },
    location: { fa: 'قیطریه، تهران', en: 'Qeytarieh, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[1],
  },
  {
    slug: 'ghazvin-st-shop-renovation',
    code: '',
    category: 'renovation',
    status: 'completed',
    area: null,
    title: { fa: 'بازسازی مغازه خیابان قزوین', en: 'Shop Renovation, Ghazvin Street' },
    location: { fa: 'خیابان قزوین، تهران', en: 'Ghazvin Street, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[2],
  },
  {
    slug: 'ghazvin-st-building',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    floors: 4, // owner unsure: 4 or 5 floors — confirm
    title: { fa: 'ساختمان خیابان قزوین', en: 'Ghazvin Street Building' },
    location: { fa: 'خیابان قزوین، تهران', en: 'Ghazvin Street, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[3],
  },
  {
    slug: 'amirabad-27th-st-renovation',
    code: '',
    category: 'renovation',
    status: 'completed',
    area: null,
    title: { fa: 'بازسازی خیابان بیست و هفتم امیرآباد', en: 'Renovation, Amirabad 27th Street' },
    location: { fa: 'امیرآباد، تهران', en: 'Amirabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[4],
  },
  {
    slug: 'yousefabad-20th-st',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'ساخت خیابان بیستم یوسف‌آباد', en: 'Construction, Yousefabad 20th Street' },
    location: { fa: 'یوسف‌آباد، تهران', en: 'Yousefabad, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[5],
  },
  {
    slug: 'sadeghieh-29th-st',
    code: '',
    category: 'construction',
    status: 'completed',
    area: null,
    title: { fa: 'خیابان بیست و نهم صادقیه', en: 'Sadeghieh, 29th Street' },
    location: { fa: 'صادقیه، تهران', en: 'Sadeghieh, Tehran' },
    structure: { fa: '', en: '' },
    summary: { fa: '', en: '' },
    highlights: { fa: [], en: [] },
    image: STOCK[0],
  },
];
