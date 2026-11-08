import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/components/ui/LanguageContext';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { FloatingContactHUD } from '@/components/ui/FloatingContactHUD';

export const metadata: Metadata = {
  title: 'گروه ساختمانی میرکاظمی | Mirkazemi Construction & Architecture Group',
  description: 'طراحی معماری، مدلسازی BIM، محاسبات سازه ضدزلزله، مدیریت پیمان و اجرای ساختمان‌های لوکس مسکونی و تجاری — از طراحی تا تحویل کلید',
  keywords: [
    'گروه ساختمانی میرکاظمی',
    'مشارکت در ساخت',
    'طراحی ویلا لوکس',
    'ساختمان سازی تهران',
    'مدیریت پیمان',
    'مهندسی سازه و معماری',
    'Mirkazemi Construction Group',
  ],
  authors: [{ name: 'Mirkazemi Group' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07080a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="bg-[#07080a] text-neutral-100 antialiased selection:bg-amber-400 selection:text-black min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <FloatingContactHUD />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
