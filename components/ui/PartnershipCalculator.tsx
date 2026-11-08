'use client';

import React, { useState, useId } from 'react';
import { useLanguage } from './LanguageContext';
import { Calculator, Sparkles, Building, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const PartnershipCalculator: React.FC = () => {
  const { t, locale } = useLanguage();
  const formId = useId();

  const [landArea, setLandArea] = useState<number>(400);
  const [floors, setFloors] = useState<number>(5);
  const [zone, setZone] = useState<'tehranPrime' | 'tehranOther' | 'northCoast' | 'other'>('tehranPrime');
  const [projectTier, setProjectTier] = useState<'superLuxury' | 'modernPremium' | 'commercial'>('superLuxury');

  // Calculation Logic
  // Base coverage: 60% ground coverage + 2 basements + roof
  const groundCoverage = 0.6;
  const basementFloors = floors > 6 ? 3 : 2;
  const totalFloors = floors + basementFloors;
  const grossBuildArea = Math.round(landArea * groundCoverage * floors + landArea * 0.8 * basementFloors);
  const netSellableArea = Math.round(landArea * groundCoverage * floors * 0.85);

  // Partnership Ratio Calculation based on Land Value vs Construction Cost
  let ownerPercentage = 55;
  let builderPercentage = 45;
  let estimatedValueMultiplier = '۳.۵ برابر';
  let recommendedModel = locale === 'fa' ? 'مشارکت در ساخت با پرداخت بلاعوض و تضمین بانکی' : 'Joint Venture with Upfront Escrow & Bank Guarantee';

  if (zone === 'tehranPrime') {
    if (projectTier === 'superLuxury') {
      ownerPercentage = 60;
      builderPercentage = 40;
      estimatedValueMultiplier = locale === 'fa' ? '۴.۲ برابر' : '4.2x Multiplier';
      recommendedModel = locale === 'fa' ? 'مشارکت در ساخت سوپرلوکس ۶۰ به ۴۰ + بلاعوض' : 'Super-Luxury 60/40 Split + Upfront Escrow';
    } else {
      ownerPercentage = 55;
      builderPercentage = 45;
      estimatedValueMultiplier = locale === 'fa' ? '۳.۸ برابر' : '3.8x Multiplier';
    }
  } else if (zone === 'northCoast') {
    ownerPercentage = 50;
    builderPercentage = 50;
    estimatedValueMultiplier = locale === 'fa' ? '۳.۲ برابر' : '3.2x Multiplier';
    recommendedModel = locale === 'fa' ? 'مشارکت ویلایی متوازن ۵۰-۵۰ یا مدیریت پیمان' : 'Balanced 50/50 Joint Venture or EPC Management';
  } else if (zone === 'tehranOther') {
    ownerPercentage = 50;
    builderPercentage = 50;
    estimatedValueMultiplier = locale === 'fa' ? '۳.۰ برابر' : '3.0x Multiplier';
  } else {
    ownerPercentage = 45;
    builderPercentage = 55;
    estimatedValueMultiplier = locale === 'fa' ? '۲.۸ برابر' : '2.8x Multiplier';
    recommendedModel = locale === 'fa' ? 'مدیریت پیمان با درصد حق‌الزحمه ثابت (۱۰ الی ۱۵٪)' : 'EPC Management with 10-15% Fixed Fee';
  }

  return (
    <div id="calculator" className="relative w-full rounded-xl border border-white/15 bg-[#0a0d11]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
      {/* Drafting Top Header */}
      <div className="px-6 py-4 bg-[#12161c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">
              {t.calculator.calculateBtn}
            </h3>
            <span className="font-mono text-[10px] text-amber-400 tracking-wider uppercase">
              ALGORITHM: MKZ-FEASIBILITY-REV4 // DYNAMIC SIMULATOR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-neutral-400">REALTIME MATRIX</span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Land Area Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <label htmlFor={`${formId}-landArea`} className="text-sm font-semibold text-neutral-200">
                {t.calculator.landArea}
              </label>
              <div className="flex items-center gap-1 font-mono text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
                <span>{landArea.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}</span>
                <span className="text-xs text-neutral-400">m²</span>
              </div>
            </div>
            <input
              id={`${formId}-landArea`}
              type="range"
              min={150}
              max={2500}
              step={25}
              value={landArea}
              onChange={(e) => setLandArea(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between font-mono text-[11px] text-neutral-400">
              <span>۱۵۰ m²</span>
              <span>۱,۰۰۰ m²</span>
              <span>۲,۵۰۰ m²</span>
            </div>
          </div>

          {/* Floors Counter */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <label htmlFor={`${formId}-floors`} className="text-sm font-semibold text-neutral-200">
                {t.calculator.floors}
              </label>
              <div className="font-mono text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
                {floors} {locale === 'fa' ? 'طبقه روی همکف' : 'Storeys'}
              </div>
            </div>
            <input
              id={`${formId}-floors`}
              type="range"
              min={2}
              max={15}
              step={1}
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between font-mono text-[11px] text-neutral-400">
              <span>۲ {locale === 'fa' ? 'طبقه' : 'Floors'}</span>
              <span>۸ {locale === 'fa' ? 'طبقه' : 'Floors'}</span>
              <span>۱۵ {locale === 'fa' ? 'طبقه' : 'Floors'}</span>
            </div>
          </div>

          {/* Location / Zone Select */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-zone`} className="text-sm font-semibold text-neutral-200">
              {t.calculator.location}
            </label>
            <select
              id={`${formId}-zone`}
              value={zone}
              onChange={(e) => setZone(e.target.value as any)}
              className="w-full px-4 py-3 rounded bg-white/5 border border-white/15 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="tehranPrime" className="bg-[#12161c] text-white">
                {t.calculator.zoneTehran1to3}
              </option>
              <option value="tehranOther" className="bg-[#12161c] text-white">
                {t.calculator.zoneTehran4to8}
              </option>
              <option value="northCoast" className="bg-[#12161c] text-white">
                {t.calculator.zoneNorth}
              </option>
              <option value="other" className="bg-[#12161c] text-white">
                {t.calculator.zoneOther}
              </option>
            </select>
          </div>

          {/* Project Tier */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-200">
              {t.calculator.projectType}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setProjectTier('superLuxury')}
                className={`px-3 py-3 rounded text-xs font-semibold border transition-all text-center ${
                  projectTier === 'superLuxury'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                {locale === 'fa' ? 'سوپرلوکس هتلینگ' : 'Super-Luxury'}
              </button>
              <button
                type="button"
                onClick={() => setProjectTier('modernPremium')}
                className={`px-3 py-3 rounded text-xs font-semibold border transition-all text-center ${
                  projectTier === 'modernPremium'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                {locale === 'fa' ? 'مدرن ممتاز' : 'Modern Premium'}
              </button>
              <button
                type="button"
                onClick={() => setProjectTier('commercial')}
                className={`px-3 py-3 rounded text-xs font-semibold border transition-all text-center ${
                  projectTier === 'commercial'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                {locale === 'fa' ? 'تجاری و اداری' : 'Commercial'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Panel (5 Cols) */}
        <div className="lg:col-span-5 rounded-lg bg-gradient-to-b from-[#14181f] to-[#0c0f13] border border-amber-500/30 p-6 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              {locale === 'fa' ? 'نتایج تحلیل محاسباتی' : 'Feasibility Summary'}
            </span>

            {/* Split Progress Bar */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-white">
                  {t.calculator.ownerShare} <strong className="text-amber-400 font-mono text-sm">{ownerPercentage}%</strong>
                </span>
                <span className="font-semibold text-neutral-300">
                  {t.calculator.builderShare} <strong className="text-blueprint-light font-mono text-sm">{builderPercentage}%</strong>
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-neutral-800 overflow-hidden flex border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${ownerPercentage}%` }}
                />
                <div
                  className="h-full bg-gradient-to-r from-blueprint to-blueprint-light transition-all duration-500"
                  style={{ width: `${builderPercentage}%` }}
                />
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">{t.calculator.estimatedBuildArea}</span>
                <span className="font-mono font-bold text-white text-base">
                  ~{grossBuildArea.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')} m²
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">{locale === 'fa' ? 'مفید مسکونی قابل فروش:' : 'Net Sellable Area:'}</span>
                <span className="font-mono font-bold text-amber-300">
                  ~{netSellableArea.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')} m²
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">{t.calculator.estimatedROI}</span>
                <span className="font-bold text-emerald-400">{estimatedValueMultiplier}</span>
              </div>
              <div className="py-2">
                <span className="text-[11px] text-neutral-400 block mb-1">{t.calculator.recommendedModel}</span>
                <p className="text-xs font-semibold text-amber-300 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                  {recommendedModel}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full py-3 text-center rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>{t.common.requestConsultation}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <p className="text-[10px] text-neutral-400 leading-relaxed text-center">
              {t.calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
