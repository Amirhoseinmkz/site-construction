'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { Compass, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { t, locale } = useLanguage();

  const leadership = [
    {
      name: locale === 'fa' ? 'دکتر علیرضا میرکاظمی' : 'Dr. Alireza Mirkazemi',
      role: locale === 'fa' ? 'مدیرعامل و رئیس هیئت مدیره — دکترای مهندسی سازه' : 'CEO & Managing Director — Ph.D. Structural Engineering',
      desc: locale === 'fa' ? 'عضو ارشد سازمان نظام مهندسی با بیش از ۲۲ سال سابقه طراحی و نظارت سازه‌های بلندمرتبه و برج‌های مسکونی.' : 'Senior Engineering Council Fellow with over 22 years specializing in high-rise seismic engineering.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: locale === 'fa' ? 'مهندس سارا رادمنش' : 'Eng. Sara Radmanesh',
      role: locale === 'fa' ? 'مدیر ارشد آتلیه معماری و طراحی مفهومی' : 'Chief Architectural Officer — M.Arch',
      desc: locale === 'fa' ? 'برنده جوایز بین‌المللی طراحی معماری با تمرکز بر تلفیق هنر ایرانی، نورگیری طبیعی و متریال‌های مدرن.' : 'Award-winning architectural designer blending bioclimatic spatial geometry with luxury materials.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      <BlueprintGrid opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400" />
            {locale === 'fa' ? 'اصالت، تخصص، تعهد' : 'HERITAGE & ENGINEERING MASTERY'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'داستان گروه ساختمانی میرکاظمی' : 'The Legacy of Mirkazemi Construction Group'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'از سال ۱۳۸۸، با هدف ارتقای استانداردهای ساخت‌وساز لوکس و ترکیب محاسبات دقیق علمی با هنر ماندگار معماری پا به عرصه مهندسی ساختمان نهادیم.'
              : 'Established in 2009, Mirkazemi Construction Group has set the benchmark for luxury residential, cantilever villas, and high-rise developments.'}
          </p>
        </div>

        {/* Heritage Story Grid */}
        <div className="p-8 md:p-12 rounded-2xl border border-white/15 bg-[#0a0d11]/90 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 shadow-2xl">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {locale === 'fa' ? 'تعهد به کیفیت بدون مصالحه' : 'Uncompromising Architectural Philosophy'}
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {locale === 'fa'
                ? 'در گروه ساختمانی میرکاظمی، ما باور داریم هر بنا یک اثر هنری جاودانه و سرمایه‌ای گرانبها برای نسل‌های آینده است. ما با تلفیق فناوری‌های نوین نظیر مدلسازی اطلاعات ساختمان (BIM LOD 400)، بتن‌های خودمتراکم نانو و مصالح لوکس وارداتی، کیفیتی فراتر از انتظارات خلق می‌کنیم.'
                : 'At Mirkazemi Group, we view every structure as an enduring architectural work of art. By integrating advanced BIM coordination, high-performance nano-concrete, and imported bespoke finishes, we engineer landmarks that stand the test of time.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
                <span className="font-mono text-2xl font-black text-amber-400">+۱۶ سال</span>
                <span className="text-neutral-400">{locale === 'fa' ? 'سابقه مهندسی درخشان' : 'Years of Excellence'}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
                <span className="font-mono text-2xl font-black text-sky-400">+۴۵</span>
                <span className="text-neutral-400">{locale === 'fa' ? 'پروژه موفق اجراشده' : 'Masterpieces Delivered'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 shadow-xl bg-neutral-950">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Mirkazemi Group Heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-2">
              LEADERSHIP & ENGINEERING BOARD
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {locale === 'fa' ? 'مدیریت ارشد و اعضای هیئت مهندسی' : 'Senior Leadership & Board'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-white/15 bg-[#0d1014]/90 flex flex-col gap-5"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-white/10 bg-neutral-950">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-mono text-amber-400 font-semibold mb-3">
                    {leader.role}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm shadow-xl shadow-amber-500/20"
          >
            <span>{t.common.requestConsultation}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
