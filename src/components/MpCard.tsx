import React from 'react';
import { MP, ScoreCalculationResult } from '../types';
import { PARTIES } from '../data/parties';
import { MpAvatar } from './MpAvatar';
import { ChevronRight, CheckCircle2, GitCompare, MapPin, Sparkles } from 'lucide-react';

interface MpCardProps {
  mp: MP;
  calculationResult: ScoreCalculationResult;
  onSelect: (mpId: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (mpId: string) => void;
}

export const MpCard: React.FC<MpCardProps> = ({
  mp,
  calculationResult,
  onSelect,
  isCompared = false,
  onToggleCompare,
}) => {
  const party = PARTIES[mp.partyId] || {
    id: mp.partyId,
    name: 'Parti',
    shortName: mp.partyId.toUpperCase(),
    color: '#64748b',
    textColor: '#ffffff',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };

  const isScored = calculationResult.scoredTopicsCount > 0;
  const percentage = calculationResult.compatibilityPercentage;

  // Determine badge styling based on compatibility percentage
  let badgeColor = 'bg-slate-100 text-slate-600 border-slate-200';
  let badgeText = 'Henüz Puanlanmadı';
  let barColor = 'bg-slate-300';

  if (isScored) {
    badgeText = `%${percentage} Uyum`;
    if (percentage >= 75) {
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20';
      barColor = 'bg-emerald-500';
    } else if (percentage >= 50) {
      badgeColor = 'bg-teal-50 text-teal-700 border-teal-200 ring-1 ring-teal-500/20';
      barColor = 'bg-teal-500';
    } else if (percentage >= 35) {
      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20';
      barColor = 'bg-amber-500';
    } else {
      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20';
      barColor = 'bg-rose-500';
    }
  }

  const completionPercent = Math.round(
    (calculationResult.scoredTopicsCount / calculationResult.totalTopicsCount) * 100
  );

  return (
    <div 
      id={`mp-card-${mp.id}`}
      className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group"
    >
      {/* Card Header & MP Profile */}
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3.5 flex-wrap">
          {/* Party Tag */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span 
              className="text-xs font-bold px-2.5 py-1 rounded-md border tracking-wide inline-flex items-center gap-1.5 shadow-2xs"
              style={{
                backgroundColor: party.bgColor,
                borderColor: party.borderColor,
                color: party.color,
              }}
            >
              <span 
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: party.color }}
              />
              {party.shortName}
            </span>

            {mp.electedPartyId && mp.electedPartyId !== mp.partyId && PARTIES[mp.electedPartyId] && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-medium" title={`${PARTIES[mp.electedPartyId].name} listesinden seçildi`}>
                {PARTIES[mp.electedPartyId].shortName}’den Geçti
              </span>
            )}
          </div>

          {/* Compatibility Percentage Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-2xs ${badgeColor}`}>
            {isScored && <Sparkles className="w-3 h-3" />}
            <span className="font-mono">{badgeText}</span>
          </div>
        </div>

        {/* MP Info & Monogram Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <MpAvatar fullName={mp.fullName} partyId={mp.partyId} size="lg" />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 truncate font-serif">
              {mp.fullName}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{mp.province} • {mp.term}</span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-1 mt-1 font-medium">
              {mp.title}
            </p>
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          {mp.bio}
        </p>

        {/* Progress of scored topics */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-slate-400" />
              Puanlanan Konular
            </span>
            <span className="font-mono text-slate-700 font-semibold">
              {calculationResult.scoredTopicsCount} / {calculationResult.totalTopicsCount} (%{completionPercent})
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${barColor}`}
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        {onToggleCompare && (
          <button
            id={`btn-compare-${mp.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(mp.id);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
              isCompared
                ? 'bg-teal-50 text-teal-800 border-teal-300 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Karşılaştırma listesine ekle/çıkar"
          >
            <GitCompare className="w-3.5 h-3.5 text-teal-600" />
            <span>{isCompared ? 'Seçildi' : 'Karşılaştır'}</span>
          </button>
        )}

        <button
          id={`btn-detail-${mp.id}`}
          onClick={() => onSelect(mp.id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:shadow-sm transition-all"
        >
          <span>Tutumları İncele & Puanla</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
