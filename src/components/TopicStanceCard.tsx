import React, { useState } from 'react';
import { MpTopicStance, SourceItem, Topic } from '../types';
import { 
  ExternalLink, 
  Tv, 
  FileText, 
  MessageSquare, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Sliders,
  Award,
  RotateCcw,
  Info
} from 'lucide-react';
import { getSemanticScoreDescription } from '../utils/calculator';

interface TopicStanceCardProps {
  topic: Topic;
  stance?: MpTopicStance;
  userImportance: number; // 0-10
  currentScore: number | null | undefined;
  onSetScore: (score: number | undefined) => void;
  onQuickChangeImportance?: (newImportance: number) => void;
}

export const TopicStanceCard: React.FC<TopicStanceCardProps> = ({
  topic,
  stance,
  userImportance,
  currentScore,
  onSetScore,
  onQuickChangeImportance,
}) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const isScored = currentScore !== undefined && currentScore !== null;
  const importancePercent = userImportance * 10;

  // Formula contribution
  const nominatorContribution = isScored ? importancePercent * (currentScore as number) : 0;
  const denominatorContribution = importancePercent * 10;

  // Semantic tag colors
  let tagColor = 'bg-slate-100 text-slate-700 border-slate-200';
  if (stance?.stanceTag === 'destekledi' || stance?.stanceTag === 'savundu') {
    tagColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (stance?.stanceTag === 'karsi_cikti' || stance?.stanceTag === 'elestirdi') {
    tagColor = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (stance?.stanceTag === 'kanun_teklifi') {
    tagColor = 'bg-blue-50 text-blue-800 border-blue-200';
  } else if (stance?.stanceTag === 'serh_koydu' || stance?.stanceTag === 'notr_cekimser') {
    tagColor = 'bg-amber-50 text-amber-800 border-amber-200';
  }

  const scoreInfo = isScored ? getSemanticScoreDescription(currentScore as number) : null;

  // Importance description helper
  const getImportanceLabel = (val: number) => {
    if (val === 0) return { text: '%0 • Önemsiz (Dikkate Alma / Etkisiz)', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    if (val <= 3) return { text: `%${val * 10} • Düşük Öncelikli`, color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (val <= 6) return { text: `%${val * 10} • Orta / Standart Öncelik`, color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val <= 8) return { text: `%${val * 10} • Yüksek Öncelikli`, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { text: `%${val * 10} • Kritik & Belirleyici`, color: 'text-rose-700 bg-rose-50 border-rose-200 font-bold' };
  };

  const importanceBadge = getImportanceLabel(userImportance);

  const handleScoreClick = (scoreVal: number) => {
    // If the clicked score is already selected, unselect it (toggle off)
    if (isScored && currentScore === scoreVal) {
      onSetScore(undefined);
    } else {
      onSetScore(scoreVal);
    }
  };

  return (
    <div 
      id={`topic-stance-${topic.id}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isScored 
          ? 'bg-white border-slate-300 shadow-xs' 
          : 'bg-white/90 border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base text-slate-900 font-serif">
              {topic.title}
            </h3>
            {stance && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${tagColor}`}>
                {stance.stanceLabel || stance.stanceTag}
              </span>
            )}
          </div>

          {/* Quick Importance Indicator in Header */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${importanceBadge.color}`}>
              Öncelik: <strong>%{importancePercent}</strong> ({userImportance}/10)
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* MP Stance Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {stance ? (
          <>
            {/* Neutral Paraphrased Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Tarafsız Tutanak / Beyan Özeti</span>
                {stance.lastUpdated && <span>Son Güncelleme: {stance.lastUpdated}</span>}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                {stance.overallSummary}
              </p>
            </div>

            {/* Paraphrased Quote if available */}
            {stance.keyParaphrasedQuote && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 italic">
                <Quote className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5 rotate-180" />
                <span className="font-serif">"{stance.keyParaphrasedQuote}"</span>
              </div>
            )}

            {/* Verified Sources Accordion */}
            {stance.sources && stance.sources.length > 0 && (
              <div className="border border-slate-200/80 rounded-xl overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setSourcesOpen(!sourcesOpen)}
                  className="w-full px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-slate-700 font-medium transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Doğrulanmış Kaynaklar ({stance.sources.length})
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <span>{sourcesOpen ? 'Gizle' : 'Tweet / Haber / Video Kaynakları'}</span>
                    {sourcesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {sourcesOpen && (
                  <div className="p-3 bg-white space-y-2 divide-y divide-slate-100">
                    {stance.sources.map((source: SourceItem) => (
                      <div key={source.id} className="pt-2 first:pt-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                            {source.sourceType === 'tweet' && <MessageSquare className="w-3.5 h-3.5 text-sky-500" />}
                            {source.sourceType === 'tv' && <Tv className="w-3.5 h-3.5 text-rose-500" />}
                            {source.sourceType === 'news' && <FileText className="w-3.5 h-3.5 text-slate-600" />}
                            <span>{source.outletOrPlatform}</span>
                            {source.timestampInVideo && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-mono font-bold">
                                ⏱️ {source.timestampInVideo}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{source.publishDate}</span>
                        </div>
                        <p className="text-slate-600 text-xs">
                          {source.summary}
                        </p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline pt-0.5"
                        >
                          <span>Kaynağı ve orijinal metni görüntüle</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
            Bu milletvekilinin ilgili konu başlığında henüz arşivlenmiş açık bir tutanak beyanı bulunmuyor. Genel parti çizgisine göre puan verebilirsiniz.
          </div>
        )}

        {/* COMBINED CONTROLS AREA: WEIGHT SCHEMA (TOP) & SCORING BUTTONS (BOTTOM) */}
        <div className="pt-3 border-t border-slate-200/80 space-y-4">
          
          {/* 1. TOP SCHEMA: Sağa-Sola Çekilebilir Ağırlık / Önem Derecesi Şeması */}
          {onQuickChangeImportance && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Konunun Sizin İçin Önemi (Ağırlık Şeması):
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border shadow-2xs ${importanceBadge.color}`}>
                    {importanceBadge.text}
                  </span>
                </div>
              </div>

              {/* Slider (Sol-Sağa Çekme Şeması) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-slate-500 w-12 text-left">%0</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={userImportance}
                    onChange={(e) => onQuickChangeImportance(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-hidden"
                    title={`Önem derecesini ayarlayın: ${userImportance}/10 (%${importancePercent})`}
                  />
                  <span className="text-[11px] font-semibold text-slate-500 w-12 text-right">%100</span>
                </div>

                {/* Discrete Tick Buttons / Scale points for direct tap */}
                <div className="grid grid-cols-11 gap-1 text-center pt-0.5">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                    const isSelected = userImportance === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onQuickChangeImportance(val)}
                        className={`py-0.5 text-[10px] font-mono rounded transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white font-bold shadow-xs ring-1 ring-amber-400'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-amber-100/60'
                        }`}
                        title={`%${val * 10} olarak ayarla`}
                      >
                        {val === 0 ? '0' : val === 10 ? '10' : val}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zero importance special warning */}
              {userImportance === 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-100/70 p-2 rounded-lg border border-amber-300/60">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
                  <span>Bu konunun önemi %0 yapıldı; bu konu genel uyum puanı hesaplamasına dahil edilmeyecektir.</span>
                </div>
              )}
            </div>
          )}

          {/* 2. BOTTOM AREA: 0-10 Milletvekili Tutumu Puanlama Butonları */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Milletvekilinin Bu Tutumuna Puanınız:
                </span>
                {isScored ? (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentScore} / 10
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">
                    (Henüz puan verilmedi)
                  </span>
                )}
              </div>

              {/* Unscore Button / Semantic Feedback */}
              <div className="flex items-center gap-2">
                {scoreInfo && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${scoreInfo.toneColor}`}>
                    {scoreInfo.label}
                  </span>
                )}
                {isScored && (
                  <button
                    type="button"
                    onClick={() => onSetScore(undefined)}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800 font-medium px-2 py-0.5 rounded hover:bg-rose-50 border border-rose-200 transition-colors"
                    title="Puanı kaldır / Seçimi sıfırla"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Puanı Kaldır</span>
                  </button>
                )}
              </div>
            </div>

            {/* 11 Buttons for Discrete 0-10 Scoring (Clicking active score unselects it) */}
            <div className="grid grid-cols-11 gap-1 sm:gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scoreVal) => {
                const isSelected = isScored && currentScore === scoreVal;
                let btnClass = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200';
                if (isSelected) {
                  if (scoreVal >= 8) btnClass = 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-sm ring-2 ring-emerald-300';
                  else if (scoreVal >= 5) btnClass = 'bg-amber-500 text-white font-bold border-amber-600 shadow-sm ring-2 ring-amber-300';
                  else btnClass = 'bg-rose-600 text-white font-bold border-rose-700 shadow-sm ring-2 ring-rose-300';
                }

                return (
                  <button
                    key={scoreVal}
                    type="button"
                    id={`score-btn-${topic.id}-${scoreVal}`}
                    onClick={() => handleScoreClick(scoreVal)}
                    className={`h-9 sm:h-10 rounded-lg text-xs sm:text-sm flex items-center justify-center font-mono border transition-all ${btnClass}`}
                    title={isSelected ? `${scoreVal} Puanı seçili (Tekrar tıklayarak kaldırabilirsiniz)` : `${scoreVal} Puan Ver`}
                  >
                    {scoreVal}
                  </button>
                );
              })}
            </div>

            {/* Qualitative semantic helpers below bar */}
            <div className="flex justify-between text-[10px] text-slate-400 px-1 font-medium">
              <span>0 = Tamamen Zıt</span>
              <span className="text-[10px] text-slate-500 italic">Seçili puana tekrar tıklayarak kaldırabilirsiniz</span>
              <span>10 = Tamamen Uyumlu</span>
            </div>

            {/* Live Mathematical Formula Contribution Chip */}
            {isScored && (
              <div className="mt-2 p-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono flex flex-wrap items-center justify-between gap-2 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-amber-400 font-sans font-medium">Formül Katkısı:</span>
                  <span>Pay: {importancePercent} × {currentScore} = <strong className="text-emerald-400 font-bold">+{nominatorContribution}</strong></span>
                </div>
                <div>
                  <span>Payda: {importancePercent} × 10 = <strong className="text-slate-100 font-bold">{denominatorContribution}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

