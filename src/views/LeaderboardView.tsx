import React, { useState } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights } from '../types';
import { PARTIES, UNIQUE_PARTIES } from '../data/parties';
import { MpAvatar } from '../components/MpAvatar';
import { Trophy, Award, Sparkles, ChevronRight, Share2, Download, Check, MapPin, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeaderboardViewProps {
  mps: MP[];
  topics: Topic[];
  userWeights: UserWeights;
  userScores: UserScores;
  mpCalculationResults: Record<string, ScoreCalculationResult>;
  onSelectMp: (mpId: string) => void;
  onGoToWeights: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  mps,
  topics,
  userWeights,
  userScores,
  mpCalculationResults,
  onSelectMp,
  onGoToWeights,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedParty, setSelectedParty] = useState<string>('all');

  // Sorted MPs by compatibility
  const rankedMps = [...mps]
    .filter(mp => selectedParty === 'all' || mp.partyId === selectedParty || (PARTIES[mp.partyId]?.id === selectedParty))
    .sort((a, b) => {
      const resA = mpCalculationResults[a.id];
      const resB = mpCalculationResults[b.id];
      if (resA.scoredTopicsCount === 0 && resB.scoredTopicsCount > 0) return 1;
      if (resA.scoredTopicsCount > 0 && resB.scoredTopicsCount === 0) return -1;
      return resB.compatibilityPercentage - resA.compatibilityPercentage;
    });

  const topMatch = rankedMps[0];
  const topMatchResult = topMatch ? mpCalculationResults[topMatch.id] : null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleShare = () => {
    const text = `Milletvekili Puanlama Raporum:\nEn Yüksek Uyumum: ${topMatch?.fullName} (%${topMatchResult?.compatibilityPercentage})\nPlatform: TBMM 28. Dönem Kişiselleştirilmiş Uyum Analizi`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerCelebration();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900/80 border border-indigo-700 text-amber-400 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Kişiselleştirilmiş Uyum Sıralaması & Karnesi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Görüşlerinize En Yakın Milletvekilleri
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Belirlediğiniz konu ağırlıkları ve verdiğiniz puanların ağırlıklı ortalamasıyla hesaplanan nihai liderlik tablosu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-share-leaderboard"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Rapor Kopyalandı!' : 'Sonuçları Paylaş'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Podium Card (Highest Compatibility MP) */}
      {topMatch && topMatchResult && topMatchResult.scoredTopicsCount > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl border-2 border-amber-300/80 p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <MpAvatar fullName={topMatch.fullName} partyId={topMatch.partyId} photoUrl={topMatch.photoUrl} size="lg" className="border-2 border-amber-400 bg-white" />
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-xs shadow-md border border-white">
                  👑
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider">
                  En Yüksek Uyum Sağlanan Milletvekili
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
                  {topMatch.fullName}
                </h3>
                <p className="text-xs text-slate-600">
                  {topMatch.province} • {topMatch.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Hesaplanan Uyum</span>
                <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-700">
                  %{topMatchResult.compatibilityPercentage}
                </span>
              </div>
              <button
                onClick={() => onSelectMp(topMatch.id)}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors"
                title="Detaylı Puanlama Karnesini İncele"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Party Filter Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedParty('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedParty === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tüm Partiler ({mps.length})
        </button>
        {UNIQUE_PARTIES.map((party) => {
          const count = mps.filter(m => m.partyId === party.id || PARTIES[m.partyId]?.id === party.id).length;
          if (count === 0) return null;
          return (
            <button
              key={party.id}
              onClick={() => setSelectedParty(party.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedParty === party.id ? 'ring-2 ring-slate-800' : ''
              }`}
              style={{
                backgroundColor: party.bgColor,
                borderColor: party.borderColor,
                color: party.color,
              }}
            >
              {party.shortName} ({count})
            </button>
          );
        })}
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {rankedMps.map((mp, index) => {
            const res = mpCalculationResults[mp.id];
            const party = PARTIES[mp.partyId];
            const isScored = res.scoredTopicsCount > 0;
            const percent = res.compatibilityPercentage;

            let badgeColor = 'bg-slate-100 text-slate-600';
            if (isScored) {
              if (percent >= 75) badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold';
              else if (percent >= 50) badgeColor = 'bg-teal-50 text-teal-700 border border-teal-200 font-bold';
              else if (percent >= 35) badgeColor = 'bg-amber-50 text-amber-700 border border-amber-200 font-bold';
              else badgeColor = 'bg-rose-50 text-rose-700 border border-rose-200 font-bold';
            }

            return (
              <div
                key={mp.id}
                id={`leaderboard-row-${mp.id}`}
                onClick={() => onSelectMp(mp.id)}
                className="p-4 sm:p-5 hover:bg-slate-50 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Rank Number */}
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {index + 1}
                  </span>

                  {/* Avatar */}
                  <MpAvatar fullName={mp.fullName} partyId={mp.partyId} photoUrl={mp.photoUrl} size="md" />

                  {/* Name and Party */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 font-serif group-hover:text-indigo-600 transition-colors">
                        {mp.fullName}
                      </h4>
                      {party && (
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: party.bgColor,
                            borderColor: party.borderColor,
                            color: party.color,
                          }}
                        >
                          {party.shortName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {mp.province} • {mp.title}
                    </p>
                  </div>
                </div>

                {/* Compatibility Stats & Percentage */}
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className={`px-3 py-1 rounded-xl text-sm sm:text-base font-mono font-black ${badgeColor}`}>
                        {isScored ? `%${percent}` : 'Puanlanmadı'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      {res.scoredTopicsCount}/{res.totalTopicsCount} Konu ({res.totalNominator}/{res.totalDenominator})
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
