import React, { useState } from 'react';
import { HelpCircle, Calculator, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { ScoreCalculationResult } from '../types';

interface FormulaExplainerProps {
  calculationResult?: ScoreCalculationResult;
  mpName?: string;
}

export const FormulaExplainer: React.FC<FormulaExplainerProps> = ({
  calculationResult,
  mpName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div 
        id="formula-explainer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-slate-50/70 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2 text-slate-800">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold">Puanlama ve Uyum Yüzdesi Nasıl Hesaplanır?</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono border border-indigo-100">
            Formül
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span>{isOpen ? 'Gizle' : 'Formülü & Örneği İncele'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-5 text-sm text-slate-700 border-t border-slate-200/70 space-y-4 bg-white">
          {/* Main Formula Card */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl font-mono text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div>
              <span className="text-xs text-slate-400 block font-sans font-medium mb-1">
                Kişiselleştirilmiş Uyum Formülü:
              </span>
              <span className="text-amber-400 text-sm sm:text-base font-bold">
                Uyum Yüzdesi = [ Σ(Önem% × Puan) / Σ(Önem% × 10) ] × 100
              </span>
            </div>
            <div className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-sans">
              Sabit Skala: <strong className="text-white">0 - 10</strong>
            </div>
          </div>

          {/* Prompt's Exact Example Breakdown */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Resmi Örnek Hesaplama Senaryosu:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950 font-mono">
              <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/60">
                <p className="font-bold text-slate-800 font-sans">1. Sokak Köpeği Yasası:</p>
                <p className="text-slate-600">Önem: %100 (10) | Verilen Puan: 3</p>
                <p className="text-indigo-700 font-semibold mt-1">Katkı Payı: 100 × 3 = 300</p>
                <p className="text-slate-500">Katkı Paydası: 100 × 10 = 1000</p>
              </div>
              <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/60">
                <p className="font-bold text-slate-800 font-sans">2. HDP / DEM Tutumu:</p>
                <p className="text-slate-600">Önem: %80 (8) | Verilen Puan: 5</p>
                <p className="text-indigo-700 font-semibold mt-1">Katkı Payı: 80 × 5 = 400</p>
                <p className="text-slate-500">Katkı Paydası: 80 × 10 = 800</p>
              </div>
            </div>
            <div className="text-xs text-amber-900 bg-amber-100/70 p-2 rounded-lg font-mono flex flex-wrap items-center justify-between">
              <span>Toplam Pay: <strong>300 + 400 = 700</strong> | Toplam Payda: <strong>1000 + 800 = 1800</strong></span>
              <span className="font-bold text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                Uyum = (700 / 1800) × 100 = %38.9
              </span>
            </div>
          </div>

          {/* Active Live Result Breakdown if provided */}
          {calculationResult && (
            <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  {mpName ? `${mpName} İçin Canlı Matematiksel Durum:` : 'Canlı Skor Durumu:'}
                </span>
                <span className="text-xs font-bold font-mono text-indigo-900 bg-white px-2.5 py-1 rounded-md border border-indigo-200">
                  Uyum: %{calculationResult.compatibilityPercentage}
                </span>
              </div>
              <div className="text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div className="bg-white p-2 rounded-lg border border-indigo-100 text-center">
                  <span className="block text-[10px] text-slate-500 font-sans">Puanlanan Konu</span>
                  <strong className="text-slate-900 text-sm">{calculationResult.scoredTopicsCount} / {calculationResult.totalTopicsCount}</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100 text-center">
                  <span className="block text-[10px] text-slate-500 font-sans">Toplam Pay (Σ)</span>
                  <strong className="text-indigo-700 text-sm">{calculationResult.totalNominator}</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100 text-center">
                  <span className="block text-[10px] text-slate-500 font-sans">Toplam Payda (Σ)</span>
                  <strong className="text-slate-700 text-sm">{calculationResult.totalDenominator}</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100 text-center">
                  <span className="block text-[10px] text-slate-500 font-sans">Net Oran</span>
                  <strong className="text-emerald-700 text-sm">
                    {calculationResult.totalDenominator > 0 
                      ? `%${calculationResult.compatibilityPercentage}` 
                      : '0%'}
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-500 space-y-1">
            <p>• <strong>Önem Derecesi:</strong> Sizin o konuya verdiğiniz genel önceliktir (0 = %0, 10 = %100). Bir kere belirlenir ve tüm milletvekilleri için sabittir.</p>
            <p>• <strong>Puan:</strong> İlgili milletvekilinin o konudaki tutumuna verdiğiniz şahsi beğeni/onay puanınızdır (0-10 sabit skala).</p>
          </div>
        </div>
      )}
    </div>
  );
};
