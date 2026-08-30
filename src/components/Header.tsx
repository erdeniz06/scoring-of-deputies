import React from 'react';
import { Landmark, Scale, Users, Trophy, GitCompare, Info, RotateCcw } from 'lucide-react';

export type NavTab = 'mps' | 'weights' | 'leaderboard' | 'compare' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  scoredMpCount: number;
  totalMps: number;
  onResetScores: () => void;
  onLoadBenchmark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  scoredMpCount,
  totalMps,
  onResetScores,
  onLoadBenchmark,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Pre-header Announcement / Legislative Theme Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">TBMM 28. Dönem Yasama Takip & Kişisel Uyum Analizi</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>Formül: <span className="text-slate-200 font-mono">Σ(Önem% × Puan) / Σ(Önem% × 10)</span></span>
          <span className="text-slate-600">|</span>
          <span>18 Temel Konu Başlığı</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div 
            id="brand-logo-btn"
            onClick={() => setActiveTab('mps')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* TBMM Building Architectural Icon Design */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-amber-400 shadow-md border border-slate-700/60 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight font-serif">
                  Milletvekili Puanlama
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200/70">
                  28. Dönem
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Kişisel Önem Derecesi & Tutanak Uyum Hesaplama
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <button
              id="nav-mps-btn"
              onClick={() => setActiveTab('mps')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'mps'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-4 h-4 text-slate-500" />
              <span>Milletvekilleri</span>
              <span className="text-xs bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-mono">
                {totalMps}
              </span>
            </button>

            <button
              id="nav-weights-btn"
              onClick={() => setActiveTab('weights')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'weights'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Önem Derecesi (Ağırlıklar)</span>
            </button>

            <button
              id="nav-leaderboard-btn"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span>Uyum Sıralaması</span>
              {scoredMpCount > 0 && (
                <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-full font-semibold">
                  {scoredMpCount}
                </span>
              )}
            </button>

            <button
              id="nav-compare-btn"
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'compare'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GitCompare className="w-4 h-4 text-teal-600" />
              <span>Karşılaştır</span>
            </button>

            <button
              id="nav-about-btn"
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>Metodoloji</span>
            </button>
          </nav>

          {/* Quick Action / Data Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex flex-col items-end text-right mr-2">
              <span className="text-xs font-semibold text-slate-800">
                {scoredMpCount}/{totalMps} Milletvekili
              </span>
              <span className="text-[11px] text-slate-500">
                Puanlandı
              </span>
            </div>

            <button
              id="btn-header-benchmark"
              onClick={onLoadBenchmark}
              title="Örnek analiz puanlarını yeniden yükle"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Örnek Veri</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (scrollable horizontal bar) */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('mps')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'mps'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Milletvekilleri
          </button>
          <button
            onClick={() => setActiveTab('weights')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'weights'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Önem Derecesi
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Sıralama ({scoredMpCount})
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            Karşılaştır
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            Metodoloji
          </button>
        </div>
      </div>
    </header>
  );
};
