import React from 'react';
import { Landmark, Users, Trophy, Info, RotateCcw, ShieldCheck, Crown, Plus, UserCheck } from 'lucide-react';
import { AppUserRole } from '../utils/storage';

export type NavTab = 'mps' | 'leaderboard' | 'moderation' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  scoredMpCount: number;
  totalMps: number;
  pendingProposalsCount: number;
  userRole: AppUserRole;
  onToggleUserRole: () => void;
  onResetScores: () => void;
  onLoadBenchmark: () => void;
  onOpenContributionModal: () => void;
  onOpenAddStanceModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  scoredMpCount,
  totalMps,
  pendingProposalsCount,
  userRole,
  onToggleUserRole,
  onResetScores,
  onLoadBenchmark,
  onOpenContributionModal,
  onOpenAddStanceModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement & Role Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">TBMM 28. Dönem Yasama Takip & Kişisel Uyum Analizi</span>
        </div>

        {/* User Role Badge & Switcher */}
        <div className="flex items-center gap-2">
          {userRole === 'founder' ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>Kurucu (Erdeniz Taşlıçukur) • Doğrudan Onay Yetkisi Aktif</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/40 text-amber-300 text-[11px] font-semibold">
              <UserCheck className="w-3 h-3 text-amber-300" />
              <span>Katılımcı Modu • Hakem Heyeti Denetimi</span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleUserRole}
            className="text-[10px] text-slate-400 hover:text-white underline px-1 cursor-pointer transition-colors"
            title="Rolü değiştirerek deneyimi test edebilirsiniz"
          >
            ({userRole === 'founder' ? 'Katılımcı Olarak İncele' : 'Kurucu Girişi Yap'})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4 min-h-[72px]">
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
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight font-serif">
                  Milletvekili Puanlama
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200/70">
                  28. Dönem
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Milletvekiline Özel Önem Derecesi & Tutanak Uyum Hesaplama
              </p>
            </div>
          </div>

          {/* Navigation Items (Cleaned up as requested) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <button
              id="nav-mps-btn"
              onClick={() => setActiveTab('mps')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'mps'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Milletvekilleri</span>
              <span className="text-2xs bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-mono">
                {totalMps}
              </span>
            </button>

            <button
              id="nav-leaderboard-btn"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              <span>Uyum Sıralaması</span>
              {scoredMpCount > 0 && (
                <span className="text-2xs bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-full font-semibold">
                  {scoredMpCount}
                </span>
              )}
            </button>

            {/* Moderation / Review Tab: Strictly visible only for Founder */}
            {userRole === 'founder' && (
              <button
                id="nav-moderation-btn"
                onClick={() => setActiveTab('moderation')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'moderation'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'moderation' ? 'text-white' : 'text-red-600'}`} />
                <span>Hakem & Denetim</span>
                {pendingProposalsCount > 0 && (
                  <span className="text-2xs bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full font-bold">
                    {pendingProposalsCount}
                  </span>
                )}
              </button>
            )}

            <button
              id="nav-about-btn"
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Metodoloji</span>
            </button>
          </nav>

          {/* Quick Action / Data Controls */}
          <div className="flex items-center gap-2">
            {/* Direct Add Stance '+' Button */}
            <button
              id="btn-header-add-stance"
              onClick={onOpenAddStanceModal}
              title="Bir milletvekiline yeni tutanak veya demeç ekle"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Demeç / Tutanak Ekle</span>
            </button>

            <button
              id="btn-header-benchmark"
              onClick={onLoadBenchmark}
              title="Örnek analiz puanlarını yeniden yükle"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Örnek Veri</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Cleaned & Restricted) */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('mps')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mps'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Milletvekilleri
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Sıralama ({scoredMpCount})
          </button>
          {userRole === 'founder' && (
            <button
              onClick={() => setActiveTab('moderation')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'moderation'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Denetim ({pendingProposalsCount})
            </button>
          )}
          <button
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
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
