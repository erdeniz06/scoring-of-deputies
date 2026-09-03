import React, { useState, useMemo, useEffect } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights, MpTopicWeights, SourceItem, ControversyItem } from '../types';
import { PARTIES } from '../data/parties';
import { MpAvatar } from '../components/MpAvatar';
import { TopicStanceCard } from '../components/TopicStanceCard';
import { MpControversiesSection } from '../components/MpControversiesSection';
import { AddControversyModal } from '../components/AddControversyModal';
import { isTopicApplicableToMp } from '../data/topics';
import { loadUserCustomSources, addUserCustomSource, removeUserCustomSource, UserCustomSources } from '../utils/storage';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  RotateCcw, 
  Scale, 
  ExternalLink,
  PlusCircle,
  Filter,
  Building,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  X,
  Plus,
  Sliders,
  ShieldAlert,
  FileText
} from 'lucide-react';

interface MpDetailViewProps {
  mp: MP;
  topics: Topic[];
  userWeights: UserWeights;
  mpWeights?: MpTopicWeights;
  userScores: UserScores;
  calculationResult: ScoreCalculationResult;
  onSetTopicScore: (mpId: string, topicId: string, score: number | undefined) => void;
  onSetMpTopicWeight: (mpId: string, topicId: string, importance: number) => void;
  onResetMpScores: (mpId: string) => void;
  onResetMpWeights?: (mpId: string) => void;
  onBack: () => void;
  onOpenContributionModal?: (mp?: MP, topic?: Topic) => void;
  onOpenTopicManager?: () => void;
  onOpenAddStance?: (topicId?: string, mpId?: string) => void;
  onOpenEditStance?: (topicId: string, mpId?: string, stance?: import('../types').MpTopicStance) => void;
  onDirectUpdateStance?: (mpId: string, topicId: string, data: {
    keyParaphrasedQuote: string;
    sourceUrl?: string;
    sourcePlatform?: string;
    overallSummary?: string;
    stanceTag?: import('../types').StanceTag;
    stanceLabel?: string;
  }) => void;
  onRevertStance?: (mpId: string, topicId: string) => void;
  onNextMp?: () => void;
  onPrevMp?: () => void;
  controversies?: ControversyItem[];
  onAddControversy?: (data: Omit<ControversyItem, 'id'>) => void;
  onUpdateControversy?: (id: string, updated: Partial<ControversyItem>) => void;
  onDeleteControversy?: (id: string) => void;
}

export const MpDetailView: React.FC<MpDetailViewProps> = ({
  mp,
  topics,
  userWeights,
  mpWeights,
  userScores,
  calculationResult,
  onSetTopicScore,
  onSetMpTopicWeight,
  onResetMpScores,
  onResetMpWeights,
  onBack,
  onOpenContributionModal,
  onOpenTopicManager,
  onOpenAddStance,
  onOpenEditStance,
  onDirectUpdateStance,
  onRevertStance,
  onNextMp,
  onPrevMp,
  controversies = [],
  onAddControversy,
  onUpdateControversy,
  onDeleteControversy,
}) => {
  const [activeDetailTab, setActiveDetailTab] = useState<'stances' | 'controversies'>('stances');
  const [isAddControversyModalOpen, setIsAddControversyModalOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'unscored' | 'scored'>('all');
  const [partyScopeFilter, setPartyScopeFilter] = useState<'all_topics' | 'party_relevant_only'>('party_relevant_only');
  const [searchTopicQuery, setSearchTopicQuery] = useState('');
  const [customSourcesMap, setCustomSourcesMap] = useState<UserCustomSources>(() => loadUserCustomSources());

  const mpControversies = useMemo(() => {
    return controversies.filter((c) => c.mpId === mp.id);
  }, [controversies, mp.id]);

  const handleAddCustomSource = (mpId: string, topicId: string, sourceData: Omit<SourceItem, 'id' | 'mpId' | 'topicId'>) => {
    addUserCustomSource(mpId, topicId, sourceData);
    setCustomSourcesMap(loadUserCustomSources());
  };

  const handleRemoveCustomSource = (mpId: string, topicId: string, sourceId: string) => {
    removeUserCustomSource(mpId, topicId, sourceId);
    setCustomSourcesMap(loadUserCustomSources());
  };

  const mpCustomSources = customSourcesMap[mp.id] || {};
  const mpSpecificWeights = mpWeights?.[mp.id] || {};

  const party = PARTIES[mp.partyId] || {
    id: mp.partyId,
    name: 'Parti',
    shortName: mp.partyId.toUpperCase(),
    color: '#64748b',
    textColor: '#ffffff',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };

  const mpScores = userScores[mp.id] || {};

  // Count how many custom weights are set for this specific MP
  const customWeightsCount = Object.keys(mpSpecificWeights).length;

  // Filter topics based on party scope, search query, and score status
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      // Party scope filter: if party_relevant_only is active, check isTopicApplicableToMp(t, mp)
      if (partyScopeFilter === 'party_relevant_only' && !isTopicApplicableToMp(t, mp)) {
        return false;
      }

      // Keyword search
      if (searchTopicQuery.trim()) {
        const q = searchTopicQuery.toLowerCase().trim();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchDesc = t.description.toLowerCase().includes(q);
        const matchNote = t.contextNote && t.contextNote.toLowerCase().includes(q);
        const matchStance = mp.stances[t.id] && (
          mp.stances[t.id].overallSummary?.toLowerCase().includes(q) ||
          mp.stances[t.id].keyParaphrasedQuote?.toLowerCase().includes(q) ||
          mp.stances[t.id].stanceLabel?.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchDesc && !matchNote && !matchStance) {
          return false;
        }
      }

      const isScored = mpScores[t.id] !== undefined && mpScores[t.id] !== null;
      if (filterMode === 'scored' && !isScored) return false;
      if (filterMode === 'unscored' && isScored) return false;
      return true;
    });
  }, [topics, mpScores, filterMode, partyScopeFilter, mp, searchTopicQuery]);

  const percentage = calculationResult.compatibilityPercentage;
  const isAnyScored = calculationResult.scoredTopicsCount > 0;

  // Badge styling
  let scoreCardBg = 'bg-slate-900 text-white';
  let scoreTextColor = 'text-amber-400';
  if (isAnyScored) {
    if (percentage >= 75) {
      scoreTextColor = 'text-emerald-400';
    } else if (percentage >= 50) {
      scoreTextColor = 'text-teal-400';
    } else if (percentage >= 35) {
      scoreTextColor = 'text-amber-400';
    } else {
      scoreTextColor = 'text-rose-400';
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          id="btn-back-to-mps"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Milletvekili Listesine Dön</span>
        </button>

        <div className="flex items-center gap-2">
          {onPrevMp && (
            <button
              onClick={onPrevMp}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
            >
              ← Önceki MV
            </button>
          )}
          {onNextMp && (
            <button
              onClick={onNextMp}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
            >
              Sonraki MV →
            </button>
          )}
        </div>
      </div>

      {/* MP Profile & Live Match Summary Hero */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* MP Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <MpAvatar mpId={mp.id} fullName={mp.fullName} partyId={mp.partyId} photoUrl={mp.photoUrl} size="xl" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-md border tracking-wide inline-flex items-center gap-1.5 shadow-2xs"
                  style={{
                    backgroundColor: party.bgColor,
                    borderColor: party.borderColor,
                    color: party.color,
                  }}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: party.color }} />
                  {party.name} ({party.shortName})
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {mp.province} • {mp.term}
                </span>

                {mp.tbmmProfileUrl && (
                  <a
                    href={mp.tbmmProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-700 dark:text-red-400 hover:text-red-800 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-2.5 py-1 rounded-md font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <Building className="w-3 h-3" />
                    TBMM Resmi Profili
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}

                <button
                  id="header-controversy-count-btn"
                  onClick={() => setActiveDetailTab('controversies')}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    mpControversies.length > 0
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900 hover:bg-rose-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                  title="İddia ve fezleke dosyalarını inceleyin"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>{mpControversies.length > 0 ? `${mpControversies.length} Fezleke / Dosya` : '0 Fezleke / İddia'}</span>
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
                {mp.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {mp.title}
              </p>
            </div>
          </div>

          {/* Live Calculated Match Card */}
          <div className={`${scoreCardBg} p-5 rounded-2xl sm:min-w-[280px] shadow-md border border-slate-800 flex flex-col justify-between space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Kişisel Uyum Yüzdeniz
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                {calculationResult.scoredTopicsCount}/{calculationResult.totalTopicsCount} Konu
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${scoreTextColor}`}>
                {isAnyScored ? `%${percentage}` : '—'}
              </span>
              {!isAnyScored && (
                <span className="text-xs text-slate-400 font-medium">
                  Henüz konu puanlanmadı (Başlangıç: %0)
                </span>
              )}
            </div>

            {/* Contribution Subtext */}
            <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800 flex justify-between">
              <span>Toplam Pay: <strong className="text-slate-200">{calculationResult.totalNominator}</strong></span>
              <span>Toplam Payda: <strong className="text-slate-200">{calculationResult.totalDenominator}</strong></span>
            </div>
          </div>
        </div>

        {/* MP Bio */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          {mp.bio}
        </p>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            {onOpenAddStance && (
              <button
                id="add-speech-for-mp-top-btn"
                onClick={() => onOpenAddStance(undefined, mp.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 cursor-pointer"
                title="Bu milletvekiline yeni bir demeç veya tutanak ekleyin"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ Demeç / Tutanak Ekle</span>
              </button>
            )}

            <button
              id="add-controversy-hero-btn"
              onClick={() => setIsAddControversyModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 cursor-pointer"
              title="Bu milletvekili hakkında yeni bir fezleke veya iddia dosyası ekleyin"
            >
              <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
              <span>+ İddia / Fezleke Ekle</span>
            </button>

            {onOpenTopicManager && (
              <button
                onClick={onOpenTopicManager}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Konu Havuzu ({topics.length})</span>
              </button>
            )}

            {customWeightsCount > 0 && onResetMpWeights && (
              <button
                onClick={() => onResetMpWeights(mp.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                title="Bu vekil için belirlenen özel konu ağırlıklarını sıfırlar"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span>Özel Ağırlıkları Sıfırla ({customWeightsCount})</span>
              </button>
            )}

            {onOpenContributionModal && (
              <button
                id="suggest-stance-for-mp-btn"
                onClick={() => onOpenContributionModal(mp)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>Öneri Gönder</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAnyScored && (
              <button
                id="btn-reset-mp-scores"
                onClick={() => onResetMpScores(mp.id)}
                className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-800 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Puanları Sıfırla</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Section Navigation Tabs (Tutumlar vs İddialar/Skandallar) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          id="tab-btn-stances"
          onClick={() => setActiveDetailTab('stances')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeDetailTab === 'stances'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Meclis Tutumları & Puanlama</span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${
            activeDetailTab === 'stances' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}>
            {topics.length}
          </span>
        </button>

        <button
          id="tab-btn-controversies"
          onClick={() => setActiveDetailTab('controversies')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeDetailTab === 'controversies'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${activeDetailTab === 'controversies' ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`} />
          <span>İddialar, Skandallar & Dosyalar</span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-mono font-bold ${
            activeDetailTab === 'controversies'
              ? 'bg-rose-800 text-white'
              : mpControversies.length > 0
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
          }`}>
            {mpControversies.length}
          </span>
        </button>
      </div>

      {/* Render Active View */}
      {activeDetailTab === 'controversies' ? (
        <MpControversiesSection
          mp={mp}
          controversies={controversies}
          onAddControversy={onAddControversy}
          onUpdateControversy={onUpdateControversy}
          onDeleteControversy={onDeleteControversy}
        />
      ) : (
        <>
          {/* Quick Prompt Banner for Adding İddia / Fezleke */}
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20 border border-rose-200/80 dark:border-rose-900/50 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Milletvekili İddia ve Fezleke Kayıtları</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-mono font-bold">
                    {mpControversies.length} Kayıt
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  TBMM dokunulmazlık fezlekeleri, kamuoyuna yansıyan iddialar veya yargı süreçlerini tarafsız kaynaklarla ekleyebilirsiniz.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {mpControversies.length > 0 && (
                <button
                  onClick={() => setActiveDetailTab('controversies')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Dosyaları Gör ({mpControversies.length})
                </button>
              )}
              <button
                id="add-controversy-banner-btn"
                onClick={() => setIsAddControversyModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ İddia / Fezleke Ekle</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Filter and Category Pills */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
            {/* Inline Topic Keyword Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Bu vekilin tutumlarında konu ara (örn: Kürt sorunu, referandum, deniz gezmiş, infaz, silah, sokak hayvanları)..."
                value={searchTopicQuery}
                onChange={(e) => setSearchTopicQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              {searchTopicQuery && (
                <button
                  onClick={() => setSearchTopicQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
              {/* Status & Scope Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      filterMode === 'all'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Tümü ({topics.length})
                  </button>
                  <button
                    onClick={() => setFilterMode('scored')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      filterMode === 'scored'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Puanlananlar ({calculationResult.scoredTopicsCount})
                  </button>
                  <button
                    onClick={() => setFilterMode('unscored')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      filterMode === 'unscored'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Kalanlar ({topics.length - calculationResult.scoredTopicsCount})
                  </button>
                </div>

                {/* Party Scope Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    id="scope-toggle-relevant"
                    onClick={() => setPartyScopeFilter('party_relevant_only')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      partyScopeFilter === 'party_relevant_only'
                        ? 'bg-red-700 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                    title="Sadece bu partiyle ilgili iç tartışmaları ve genel Türkiye meselelerini gösterir"
                  >
                    {mp.partyId.toUpperCase()} İlgili & Genel Konular
                  </button>
                  <button
                    id="scope-toggle-all"
                    onClick={() => setPartyScopeFilter('all_topics')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      partyScopeFilter === 'all_topics'
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Tüm Konuları Göster
                  </button>
                </div>
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Önem derecesini bu vekil için belirleyin, tutuma göre <strong>0-10</strong> puan verin.
              </span>
            </div>
          </div>

          {/* Topic Stance Cards List */}
          <div className="space-y-4">
            {filteredTopics.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
                <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  "{searchTopicQuery}" ile eşleşen bir konu bulunamadı.
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {onOpenTopicManager && (
                    <button
                      onClick={onOpenTopicManager}
                      className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Tüm Konu Havuzunu Aç / Yeni Konu Ekle
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const stance = mp.stances[topic.id];
                const mpSpecificWeight = mpSpecificWeights[topic.id];
                const userImportance = mpSpecificWeight !== undefined 
                  ? mpSpecificWeight 
                  : (userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance);
                const isMpCustomImportance = mpSpecificWeight !== undefined;
                const currentScore = mpScores[topic.id];

                return (
                  <TopicStanceCard
                    key={topic.id}
                    topic={topic}
                    stance={stance}
                    mpId={mp.id}
                    mpName={mp.fullName}
                    partyShortName={party.shortName}
                    userImportance={userImportance}
                    isMpCustomImportance={isMpCustomImportance}
                    currentScore={currentScore}
                    customSources={mpCustomSources[topic.id] || []}
                    onSetScore={(score) => onSetTopicScore(mp.id, topic.id, score)}
                    onQuickChangeImportance={(newImp) => onSetMpTopicWeight(mp.id, topic.id, newImp)}
                    onAddCustomSource={handleAddCustomSource}
                    onRemoveCustomSource={handleRemoveCustomSource}
                    onOpenAddStance={(topicId) => {
                      if (onOpenAddStance) {
                        onOpenAddStance(topicId, mp.id);
                      } else if (onOpenContributionModal) {
                        onOpenContributionModal(mp, topic);
                      }
                    }}
                    onOpenEditStance={onOpenEditStance}
                    onDirectUpdateStance={onDirectUpdateStance}
                    onRevertStance={onRevertStance}
                  />
                );
              })
            )}
          </div>
        </>
      )}

      {/* Direct Add Controversy / Fezleke Modal */}
      {isAddControversyModalOpen && (
        <AddControversyModal
          isOpen={isAddControversyModalOpen}
          onClose={() => setIsAddControversyModalOpen(false)}
          mp={mp}
          onSave={(data, editId) => {
            if (editId && onUpdateControversy) {
              onUpdateControversy(editId, data);
            } else if (onAddControversy) {
              onAddControversy(data);
            }
            setIsAddControversyModalOpen(false);
            setActiveDetailTab('controversies');
          }}
        />
      )}
    </div>
  );
};

