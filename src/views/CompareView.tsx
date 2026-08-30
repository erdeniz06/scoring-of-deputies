import React, { useState } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights } from '../types';
import { PARTIES } from '../data/parties';
import { GitCompare, Plus, X, Award, Sliders, ExternalLink, HelpCircle } from 'lucide-react';

interface CompareViewProps {
  allMps: MP[];
  topics: Topic[];
  comparedMpIds: string[];
  onToggleCompare: (mpId: string) => void;
  userWeights: UserWeights;
  userScores: UserScores;
  mpCalculationResults: Record<string, ScoreCalculationResult>;
  onSelectMp: (mpId: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  allMps,
  topics,
  comparedMpIds,
  onToggleCompare,
  userWeights,
  userScores,
  mpCalculationResults,
  onSelectMp,
}) => {
  // If fewer than 2 MPs selected, default to first two
  const activeComparedMps = allMps.filter(m => comparedMpIds.includes(m.id));
  const effectiveMps = activeComparedMps.length >= 2 
    ? activeComparedMps 
    : allMps.slice(0, 2);

  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');

  const filteredTopics = selectedTopicId === 'all' 
    ? topics 
    : topics.filter(t => t.id === selectedTopicId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold">
              <GitCompare className="w-3.5 h-3.5 text-teal-700" />
              <span>Yan Yana Milletvekili Karşılaştırması</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Milletvekillerinin Tutumlarını Kıyaslayın
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Farklı partilerden veya aynı partiden milletvekillerinin 18 kritik konudaki tutanak beyanlarını, kaynaklarını ve kişisel uyum puanlarınızı yan yana inceleyin.
            </p>
          </div>
        </div>

        {/* Selected MPs Selector Bar */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Karşılaştırılan Milletvekilleri (En fazla 3 seçilebilir):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {effectiveMps.map((mp) => {
              const res = mpCalculationResults[mp.id];
              const party = PARTIES[mp.partyId];

              return (
                <div
                  key={mp.id}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-xs border border-slate-800"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] text-slate-300 font-bold">
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
                    <span className="select-none">{mp.fullName[0]}</span>
                  </div>
                  <span>{mp.fullName}</span>
                  <span className="text-amber-400 font-mono">%{res?.compatibilityPercentage || 0}</span>
                  {effectiveMps.length > 2 && (
                    <button
                      onClick={() => onToggleCompare(mp.id)}
                      className="text-slate-400 hover:text-white"
                      title="Kaldır"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Quick add dropdown */}
            {allMps.length > effectiveMps.length && (
              <select
                onChange={(e) => {
                  if (e.target.value) onToggleCompare(e.target.value);
                }}
                value=""
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 cursor-pointer"
              >
                <option value="">+ Başka Milletvekili Ekle...</option>
                {allMps
                  .filter(m => !effectiveMps.some(em => em.id === m.id))
                  .map(m => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} ({m.province} - {PARTIES[m.partyId]?.shortName})
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => {
          const importance = userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance;
          const importancePercent = importance * 10;

          return (
            <div
              key={topic.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs"
            >
              {/* Topic Header Bar */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-serif">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{topic.description}</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 whitespace-nowrap self-start sm:self-auto">
                  Önceliğiniz: <strong className="font-mono">%{importancePercent}</strong> ({importance}/10)
                </div>
              </div>

              {/* Side by Side Columns */}
              <div className={`grid grid-cols-1 md:grid-cols-${effectiveMps.length} divide-y md:divide-y-0 md:divide-x divide-slate-100`}>
                {effectiveMps.map((mp) => {
                  const stance = mp.stances[topic.id];
                  const mpScores = userScores[mp.id] || {};
                  const userScore = mpScores[topic.id];
                  const party = PARTIES[mp.partyId];

                  return (
                    <div key={mp.id} className="p-5 space-y-3.5 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* MP Header */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs text-slate-500 font-bold shadow-2xs">
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
                            <span className="select-none">{mp.fullName[0]}</span>
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-900 block font-serif">
                              {mp.fullName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {party?.shortName} • {mp.province}
                            </span>
                          </div>
                        </div>

                        {/* Stance tag */}
                        {stance ? (
                          <>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                                {stance.stanceLabel || stance.stanceTag}
                              </span>
                            </div>

                            {/* Summary */}
                            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                              {stance.overallSummary}
                            </p>

                            {/* Paraphrased Quote */}
                            {stance.keyParaphrasedQuote && (
                              <p className="text-[11px] text-slate-600 italic font-serif">
                                "{stance.keyParaphrasedQuote}"
                              </p>
                            )}
                          </>
                        ) : (
                          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                            Açık tutanak beyanı bulunamadı.
                          </div>
                        )}
                      </div>

                      {/* User Score Badge */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Bu Konudaki Puanınız:</span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                          userScore !== undefined 
                            ? 'bg-slate-900 text-amber-400' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {userScore !== undefined ? `${userScore} / 10` : 'Puanlanmadı'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
