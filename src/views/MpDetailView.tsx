import React, { useState, useMemo } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights } from '../types';
import { PARTIES } from '../data/parties';
import { TopicStanceCard } from '../components/TopicStanceCard';
import { FormulaExplainer } from '../components/FormulaExplainer';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Scale, 
  Award,
  ChevronRight,
  GitCompare,
  Sliders
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
  onNextMp,
  onPrevMp,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'unscored' | 'scored'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const isScored = mpScores[t.id] !== undefined && mpScores[t.id] !== null;
      if (filterMode === 'scored' && !isScored) return false;
      if (filterMode === 'unscored' && isScored) return false;
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      return true;
    });
  }, [topics, mpScores, filterMode, selectedCategory]);

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
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Milletvekili Listesine Dön</span>
        </button>

        <div className="flex items-center gap-2">
          {onPrevMp && (
            <button
              onClick={onPrevMp}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium transition-colors"
            >
              ← Önceki MV
            </button>
          )}
          {onNextMp && (
            <button
              onClick={onNextMp}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium transition-colors"
            >
              Sonraki MV →
            </button>
          )}
        </div>
      </div>

      {/* MP Profile & Live Match Summary Hero */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* MP Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-slate-100 border-2 border-white shadow-lg flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-2xl font-serif">
              <img
                src={mp.photoUrl}
                alt={mp.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <span className="select-none">{mp.fullName.split(' ').map(n => n[0]).join('')}</span>
            </div>
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
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {mp.province} • {mp.term}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                {mp.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
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
                  Henüz konu puanlanmadı
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
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {mp.bio}
        </p>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToWeights}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>Konu Ağırlıklarınızı Değiştirin</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isAnyScored && (
              <button
                id="btn-reset-mp-scores"
                onClick={() => onResetMpScores(mp.id)}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bu MV İçin Puanları Sıfırla</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Formula Explainer */}
      <FormulaExplainer 
        calculationResult={calculationResult}
        mpName={mp.fullName}
      />

      {/* Filter and Category Pills */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Konular ({topics.length})
            </button>
            <button
              onClick={() => setFilterMode('scored')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'scored'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Puanlananlar ({calculationResult.scoredTopicsCount})
            </button>
            <button
              onClick={() => setFilterMode('unscored')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'unscored'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kalanlar ({topics.length - calculationResult.scoredTopicsCount})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Her konunun altındaki <strong>0-10</strong> butonlarına tıklayarak puanınızı kaydedin.
          </span>
        </div>
      </div>

      {/* Topic Stance Cards List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const stance = mp.stances[topic.id];
          const userImportance = userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance;
          const currentScore = mpScores[topic.id];

          return (
            <TopicStanceCard
              key={topic.id}
              topic={topic}
              stance={stance}
              userImportance={userImportance}
              currentScore={currentScore}
              onSetScore={(score) => onSetTopicScore(mp.id, topic.id, score)}
              onQuickChangeImportance={(newImp) => onQuickChangeImportance(topic.id, newImp)}
            />
          );
        })}
      </div>
    </div>
  );
};
