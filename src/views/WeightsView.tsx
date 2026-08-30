import React, { useState } from 'react';
import { Topic, TopicCategory, UserWeights } from '../types';
import { TOPIC_CATEGORIES } from '../data/topics';
import { Scale, RotateCcw, Sparkles, Check, Info, Sliders } from 'lucide-react';

interface WeightsViewProps {
  topics: Topic[];
  userWeights: UserWeights;
  onUpdateWeight: (topicId: string, importance: number) => void;
  onBulkUpdateWeights: (newWeights: UserWeights) => void;
  onResetWeights: () => void;
  onFinish: () => void;
}

export const WeightsView: React.FC<WeightsViewProps> = ({
  topics,
  userWeights,
  onUpdateWeight,
  onBulkUpdateWeights,
  onResetWeights,
  onFinish,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter topics
  const filteredTopics = selectedCategory === 'all' 
    ? topics 
    : topics.filter(t => t.category === selectedCategory);

  // Calculate average importance
  const totalWeight = (Object.values(userWeights) as number[]).reduce((a, b) => a + b, 0);
  const averageWeight = Math.round((totalWeight / (topics.length || 1)) * 10); // in percent

  // Presets
  const applyPreset = (presetType: 'balanced' | 'legal_freedom' | 'politics_party' | 'social_rights' | 'all_max') => {
    const newWeights: UserWeights = {};
    topics.forEach((topic) => {
      if (presetType === 'all_max') {
        newWeights[topic.id] = 10;
      } else if (presetType === 'balanced') {
        newWeights[topic.id] = 8;
      } else if (presetType === 'legal_freedom') {
        if (topic.category === 'hukuk' || topic.category === 'kultur_ifade') {
          newWeights[topic.id] = 10;
        } else if (topic.category === 'egitim_inanc') {
          newWeights[topic.id] = 8;
        } else {
          newWeights[topic.id] = 4;
        }
      } else if (presetType === 'politics_party') {
        if (topic.category === 'siyaset') {
          newWeights[topic.id] = 10;
        } else if (topic.category === 'hukuk') {
          newWeights[topic.id] = 7;
        } else {
          newWeights[topic.id] = 4;
        }
      } else if (presetType === 'social_rights') {
        if (topic.category === 'sosyal' || topic.category === 'kultur_ifade') {
          newWeights[topic.id] = 10;
        } else {
          newWeights[topic.id] = 5;
        }
      }
    });
    onBulkUpdateWeights(newWeights);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>Evrensel Önem Derecesi (Ağırlıklar)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Sizin İçin Hangi Konular Ne Kadar Önemli?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Her konuya <strong>0 ile 10</strong> arasında bir önem derecesi verin. Bu değer doğrudan yüzdeye karşılık gelir (10 = %100, 9 = %90 ... 0 = %0). Belirlediğiniz ağırlıklar <strong>tüm milletvekilleri için sabittir</strong> ve uyum yüzdesini belirler.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-center min-w-[160px] shadow-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Ortalama Önceliğiniz</span>
              <strong className="text-2xl font-mono text-amber-400 font-bold">%{averageWeight}</strong>
            </div>
            <button
              id="btn-reset-weights"
              onClick={onResetWeights}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Hızlı Öncelik Şablonları (Tek Tıkla Uygula):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              id="preset-balanced"
              onClick={() => applyPreset('balanced')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Dengeli (%80 Sabit)</span>
            </button>
            <button
              id="preset-legal"
              onClick={() => applyPreset('legal_freedom')}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-indigo-200"
            >
              <span>⚖️ Hukuk & İfade Özgürlüğü Odaklı</span>
            </button>
            <button
              id="preset-politics"
              onClick={() => applyPreset('politics_party')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-amber-200"
            >
              <span>🏛️ Siyaset & Kurultaylar Odaklı</span>
            </button>
            <button
              id="preset-social"
              onClick={() => applyPreset('social_rights')}
              className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-teal-200"
            >
              <span>🌿 Sosyal Haklar & Sokak Hayvanları</span>
            </button>
            <button
              id="preset-all-max"
              onClick={() => applyPreset('all_max')}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-emerald-200"
            >
              <span>💯 Tümünü %100 Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tüm Konular ({topics.length})
        </button>

        {Object.entries(TOPIC_CATEGORIES).map(([catKey, catVal]) => {
          const count = topics.filter(t => t.category === catKey).length;
          const isSelected = selectedCategory === catKey;

          return (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{catVal.label}</span>
              <span className="ml-1.5 text-[11px] opacity-75 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Topic Weights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const currentImportance = userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance;
          const currentPercent = currentImportance * 10;

          return (
            <div
              key={topic.id}
              id={`weight-card-${topic.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">
                    {topic.title}
                  </h3>
                  <div className="px-3 py-1 rounded-xl bg-slate-900 text-amber-400 font-mono font-bold text-xs sm:text-sm flex-shrink-0 shadow-2xs border border-slate-800">
                    %{currentPercent}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {topic.description}
                </p>
                {topic.contextNote && (
                  <p className="text-[11px] text-slate-400 italic">
                    Gündem Arka Planı: {topic.contextNote}
                  </p>
                )}
              </div>

              {/* Discrete 0-10 Selector */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Sliders className="w-3 h-3 text-slate-400" />
                    Önem Derecesi Seçin:
                  </span>
                  <span className="font-mono text-slate-900">{currentImportance} / 10</span>
                </div>

                <div className="grid grid-cols-11 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                    const isSelected = currentImportance === val;
                    let btnStyle = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200';
                    if (isSelected) {
                      btnStyle = 'bg-slate-900 text-amber-400 font-bold border-slate-950 shadow-xs ring-2 ring-slate-400';
                    }

                    return (
                      <button
                        key={val}
                        id={`btn-weight-${topic.id}-${val}`}
                        type="button"
                        onClick={() => onUpdateWeight(topic.id, val)}
                        className={`h-8 sm:h-9 rounded-lg text-xs font-mono border transition-all ${btnStyle}`}
                        title={`Önem: ${val} (%${val * 10})`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                  <span>0 (%0 - Önemsiz)</span>
                  <span>5 (%50 - Orta)</span>
                  <span>10 (%100 - Kritik)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Done Button */}
      <div className="sticky bottom-6 z-30 flex justify-center">
        <button
          id="btn-save-weights-done"
          onClick={onFinish}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all border border-slate-700"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Ağırlıkları Kaydet & Milletvekillerine Dön</span>
        </button>
      </div>
    </div>
  );
};
