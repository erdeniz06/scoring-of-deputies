import React, { useState, useMemo } from 'react';
import { Topic, TopicCategory, UserWeights } from '../types';
import { TOPIC_CATEGORIES } from '../data/topics';
import { Scale, RotateCcw, Sparkles, Check, Info, Sliders, Search, SlidersHorizontal, X } from 'lucide-react';

interface WeightsViewProps {
  topics: Topic[];
  userWeights: UserWeights;
  onUpdateWeight: (topicId: string, importance: number) => void;
  onBulkUpdateWeights: (newWeights: UserWeights) => void;
  onResetWeights: () => void;
  onFinish: () => void;
  onOpenTopicManager?: () => void;
}

export const WeightsView: React.FC<WeightsViewProps> = ({
  topics,
  userWeights,
  onUpdateWeight,
  onBulkUpdateWeights,
  onResetWeights,
  onFinish,
  onOpenTopicManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchDesc = t.description.toLowerCase().includes(q);
        const matchNote = t.contextNote && t.contextNote.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchNote) {
          return false;
        }
      }
      return true;
    });
  }, [topics, selectedCategory, searchQuery]);

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
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold">
              <Scale className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Evrensel Önem Derecesi (Ağırlıklar)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
              Sizin İçin Hangi Konular Ne Kadar Önemli?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Her konuya <strong>0 ile 10</strong> arasında bir önem derecesi verin. Bu değer doğrudan yüzdeye karşılık gelir (10 = %100, 9 = %90 ... 0 = %0). Belirlediğiniz ağırlıklar <strong>tüm milletvekilleri için sabittir</strong> ve uyum yüzdesini belirler.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-center min-w-[160px] shadow-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Ortalama Önceliğiniz</span>
              <strong className="text-2xl font-mono text-amber-400 font-bold">%{averageWeight}</strong>
            </div>
            <div className="flex items-center gap-2">
              {onOpenTopicManager && (
                <button
                  onClick={onOpenTopicManager}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-semibold hover:underline cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Konu Havuzu / Ekle ({topics.length})</span>
                </button>
              )}
              <span className="text-slate-300">•</span>
              <button
                id="btn-reset-weights"
                onClick={onResetWeights}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Hızlı Öncelik Şablonları (Tek Tıkla Uygula):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              id="preset-balanced"
              onClick={() => applyPreset('balanced')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Dengeli (%80 Sabit)</span>
            </button>
            <button
              id="preset-legal"
              onClick={() => applyPreset('legal_freedom')}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-900 dark:text-indigo-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
            >
              <span>⚖️ Hukuk & İfade Özgürlüğü Odaklı</span>
            </button>
            <button
              id="preset-politics"
              onClick={() => applyPreset('politics_party')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-900 dark:text-amber-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-amber-200 dark:border-amber-800 cursor-pointer"
            >
              <span>🏛️ Siyaset & Kurultaylar Odaklı</span>
            </button>
            <button
              id="preset-social"
              onClick={() => applyPreset('social_rights')}
              className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 text-teal-900 dark:text-teal-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-teal-200 dark:border-teal-800 cursor-pointer"
            >
              <span>🌿 Sosyal Haklar & Hayvan Hakları</span>
            </button>
            <button
              id="preset-all-max"
              onClick={() => applyPreset('all_max')}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800 cursor-pointer"
            >
              <span>💯 Tümünü %100 Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ağırlıklar arasında konu ara (Kürt sorunu, referandum, infaz yasası, sokak köpekleri, laiklik)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{catVal.label}</span>
                <span className="ml-1.5 text-[11px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
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
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif leading-snug">
                    {topic.title}
                  </h3>
                  <div className="px-3 py-1 rounded-xl bg-slate-900 text-amber-400 font-mono font-bold text-xs sm:text-sm flex-shrink-0 shadow-2xs border border-slate-800">
                    %{currentPercent}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {topic.description}
                </p>
                {topic.contextNote && (
                  <p className="text-[11px] text-slate-400 italic">
                    Gündem Arka Planı: {topic.contextNote}
                  </p>
                )}
              </div>

              {/* Discrete 0-10 Selector */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Sliders className="w-3 h-3 text-slate-400" />
                    Önem Derecesi Seçin:
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">{currentImportance} / 10</span>
                </div>

                <div className="grid grid-cols-11 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                    const isSelected = currentImportance === val;
                    let btnStyle = 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                    if (isSelected) {
                      btnStyle = 'bg-slate-900 text-amber-400 font-bold border-slate-950 shadow-xs ring-2 ring-slate-400';
                    }

                    return (
                      <button
                        key={val}
                        id={`btn-weight-${topic.id}-${val}`}
                        type="button"
                        onClick={() => onUpdateWeight(topic.id, val)}
                        className={`h-8 sm:h-9 rounded-lg text-xs font-mono border transition-all cursor-pointer ${btnStyle}`}
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
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all border border-slate-700 cursor-pointer"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Ağırlıkları Kaydet & Milletvekillerine Dön</span>
        </button>
      </div>
    </div>
  );
};

