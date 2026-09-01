import React, { useState, useMemo, useEffect } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights, SourceItem } from '../types';
import { PARTIES } from '../data/parties';
import { MpAvatar } from '../components/MpAvatar';
import { TopicStanceCard } from '../components/TopicStanceCard';
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
  Plus
} from 'lucide-react';

interface MpDetailViewProps {
  mp: MP;
  topics: Topic[];
  userWeights: UserWeights;
  userScores: UserScores;
  calculationResult: ScoreCalculationResult;
  onSetTopicScore: (mpId: string, topicId: string, score: number | undefined) => void;
  onQuickChangeImportance: (topicId: string, importance: number) => void;
  onResetMpScores: (mpId: string) => void;
  onBack: () => void;
  onGoToWeights: () => void;
  onOpenContributionModal?: (mp?: MP, topic?: Topic) => void;
  onOpenTopicManager?: () => void;
  onOpenAddStance?: (topicId?: string, mpId?: string) => void;
  onNextMp?: () => void;
  onPrevMp?: () => void;
}

export const MpDetailView: React.FC<MpDetailViewProps> = ({
  mp,
  topics,
  userWeights,
  userScores,
  calculationResult,
  onSetTopicScore,
  onQuickChangeImportance,
  onResetMpScores,
  onBack,
  onGoToWeights,
  onOpenContributionModal,
  onOpenTopicManager,
  onOpenAddStance,
  onNextMp,
  onPrevMp,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'unscored' | 'scored'>('all');
  const [partyScopeFilter, setPartyScopeFilter] = useState<'all_topics' | 'party_relevant_only'>('party_relevant_only');
  const [searchTopicQuery, setSearchTopicQuery] = useState('');
  const [customSourcesMap, setCustomSourcesMap] = useState<UserCustomSources>(() => loadUserCustomSources());

  const handleAddCustomSource = (mpId: string, topicId: string, sourceData: Omit<SourceItem, 'id' | 'mpId' | 'topicId'>) => {
    addUserCustomSource(mpId, topicId, sourceData);
    setCustomSourcesMap(loadUserCustomSources());
  };

  const handleRemoveCustomSource = (mpId: string, topicId: string, sourceId: string) => {
    removeUserCustomSource(mpId, topicId, sourceId);
    setCustomSourcesMap(loadUserCustomSources());
  };

  const mpCustomSources = customSourcesMap[mp.id] || {};

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
            <MpAvatar fullName={mp.fullName} partyId={mp.partyId} size="xl" />
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
            <button
              onClick={onGoToWeights}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Konu Ağırlıklarını Düzenle</span>
            </button>

            {onOpenTopicManager && (
              <button
                onClick={onOpenTopicManager}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
                <span>Konu Havuzu & Arama ({topics.length})</span>
              </button>
            )}

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

            {onOpenContributionModal && (
              <button
                id="suggest-stance-for-mp-btn"
                onClick={() => onOpenContributionModal(mp)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60 text-xs font-semibold transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>Tutum / Tutanak Öner</span>
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
            Önem derecesini şemadan ayarlayın, tutuma göre <strong>0-10</strong> puan verin veya iptal için tekrar tıklayın.
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
            const userImportance = userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance;
            const currentScore = mpScores[topic.id];

            return (
              <TopicStanceCard
                key={topic.id}
                topic={topic}
                stance={stance}
                mpId={mp.id}
                mpName={mp.fullName}
                userImportance={userImportance}
                currentScore={currentScore}
                customSources={mpCustomSources[topic.id] || []}
                onSetScore={(score) => onSetTopicScore(mp.id, topic.id, score)}
                onQuickChangeImportance={(newImp) => onQuickChangeImportance(topic.id, newImp)}
                onAddCustomSource={handleAddCustomSource}
                onRemoveCustomSource={handleRemoveCustomSource}
                onOpenAddStance={(topicId) => {
                  if (onOpenAddStance) {
                    onOpenAddStance(topicId, mp.id);
                  } else if (onOpenContributionModal) {
                    onOpenContributionModal(mp, topic);
                  }
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

