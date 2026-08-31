import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Check, 
  CheckSquare, 
  Square, 
  X, 
  SlidersHorizontal, 
  BookOpen, 
  Scale, 
  Vote, 
  Users, 
  Mic, 
  Trash2, 
  Sparkles,
  Info
} from 'lucide-react';
import { Topic, TopicCategory } from '../types';
import { TOPIC_CATEGORIES } from '../data/topics';

interface TopicManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTopics: Topic[];
  selectedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onAddNewTopic: (topicData: Omit<Topic, 'id'>) => void;
  onRemoveCustomTopic?: (topicId: string) => void;
}

export const TopicManagerModal: React.FC<TopicManagerModalProps> = ({
  isOpen,
  onClose,
  allTopics,
  selectedTopicIds,
  onToggleTopic,
  onSelectAll,
  onDeselectAll,
  onAddNewTopic,
  onRemoveCustomTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // New topic form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TopicCategory>('siyaset');
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState<number>(8);
  const [newContextNote, setNewContextNote] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q ||
        topic.title.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q) ||
        (topic.contextNote && topic.contextNote.toLowerCase().includes(q)) ||
        (topic.partyScopeLabel && topic.partyScopeLabel.toLowerCase().includes(q));

      const matchCategory = categoryFilter === 'all' || topic.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [allTopics, searchQuery, categoryFilter]);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNewTopic({
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Kullanıcı tarafından eklenen değerlendirme başlığı.',
      defaultImportance: newImportance,
      contextNote: newContextNote.trim() || 'Kullanıcı özel konusu.',
      partyScope: 'all',
      partyScopeLabel: 'Özel Konu',
    });

    setNewTitle('');
    setNewDescription('');
    setNewContextNote('');
    setCreateSuccess(true);
    setTimeout(() => {
      setCreateSuccess(false);
      setActiveTab('browse');
    }, 800);
  };

  const getCategoryIcon = (cat: TopicCategory) => {
    switch (cat) {
      case 'siyaset': return <Vote className="w-4 h-4 text-rose-500" />;
      case 'hukuk': return <Scale className="w-4 h-4 text-indigo-500" />;
      case 'sosyal': return <Users className="w-4 h-4 text-emerald-500" />;
      case 'kultur_ifade': return <Mic className="w-4 h-4 text-amber-500" />;
      case 'egitim_inanc': return <BookOpen className="w-4 h-4 text-cyan-500" />;
      default: return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div 
        id="topic-manager-modal" 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-red-600 dark:text-red-500" />
              Konu Başlığı Arama & Seçim Havuzu
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              İlgilendiğiniz konuları seçin, anahtar kelimelerle arayın veya yeni bir konu başlığı ekleyin.
            </p>
          </div>
          
          <button
            id="close-topic-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex gap-4">
          <button
            id="tab-browse-topics"
            onClick={() => setActiveTab('browse')}
            className={`pb-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'browse'
                ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Search className="w-4 h-4" />
            Konu Havuzu & Arama ({allTopics.length})
          </button>
          
          <button
            id="tab-create-topic"
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'create'
                ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            Yeni Konu Başlığı Oluştur
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'browse' ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search Bar & Category Filters */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="topic-search-input"
                  type="text"
                  placeholder="Konu başlığı veya anahtar kelime ara (örn: Kürt sorunu, referandum, deniz gezmiş, köpek yasası, af, ideoloji)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Pills & Quick Select All */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-2.5 py-1 text-2xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      categoryFilter === 'all'
                        ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Tümü ({allTopics.length})
                  </button>
                  {Object.entries(TOPIC_CATEGORIES).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setCategoryFilter(key)}
                      className={`px-2.5 py-1 text-2xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        categoryFilter === key
                          ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onSelectAll}
                    className="text-2xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <CheckSquare className="w-3 h-3" />
                    Tümünü Seç
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={onDeselectAll}
                    className="text-2xs font-semibold text-slate-500 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Square className="w-3 h-3" />
                    Tümünü Kaldır
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Topics List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTopics.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    "{searchQuery}" aramasıyla eşleşen konu bulunamadı.
                  </p>
                  <p className="text-2xs text-slate-400 max-w-sm mx-auto">
                    Aradığınız konu havuzda yoksa yukarıdaki <strong>"Yeni Konu Başlığı Oluştur"</strong> sekmesinden saniyeler içinde ekleyebilirsiniz.
                  </p>
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const isSelected = selectedTopicIds.includes(topic.id);
                  const isCustom = topic.id.startsWith('custom_topic_');

                  return (
                    <div
                      key={topic.id}
                      onClick={() => onToggleTopic(topic.id)}
                      className={`pt-2.5 first:pt-0 p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected 
                          ? 'bg-red-50/50 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        type="button"
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {topic.title}
                          </span>
                          
                          <span className="text-2xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                            {getCategoryIcon(topic.category)}
                            {TOPIC_CATEGORIES[topic.category]?.label || topic.category}
                          </span>

                          {topic.partyScopeLabel && (
                            <span className="text-2xs px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal">
                              {topic.partyScopeLabel}
                            </span>
                          )}

                          {isCustom && (
                            <span className="text-2xs px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold">
                              Özel Konu
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>

                        {topic.contextNote && (
                          <div className="text-2xs text-slate-400 mt-1 flex items-center gap-1">
                            <Info className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{topic.contextNote}</span>
                          </div>
                        )}
                      </div>

                      {/* Custom Topic Delete Button */}
                      {isCustom && onRemoveCustomTopic && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveCustomTopic(topic.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded-md"
                          title="Özel konuyu sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* Create New Topic Tab */
          <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {createSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                Konu başlığı başarıyla oluşturuldu ve aktif puanlama listenize eklendi!
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Konu Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Kürt Sorununda Diyalog & Çözüm Süreci, Deniz Gezmiş Anması, 2017 Referandum Tutumu..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as TopicCategory)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {Object.entries(TOPIC_CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Varsayılan Önem Katsayısı (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newImportance}
                  onChange={(e) => setNewImportance(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Açıklama & Kapsam
              </label>
              <textarea
                rows={3}
                placeholder="Bu konuda vekillerin hangi söylem, kanun teklifi veya duruşlarının değerlendirileceğini açıklayın..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bağlam & Not (İsteğe bağlı)
              </label>
              <input
                type="text"
                placeholder="Örn: Meclis oylamaları, TV demeçleri, basın toplantıları..."
                value={newContextNote}
                onChange={(e) => setNewContextNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Konuyu Kaydet ve Listeme Ekle
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <strong>{selectedTopicIds.length}</strong> / {allTopics.length} konu seçili ve puanlamada aktif.
          </div>

          <button
            id="save-and-close-topic-modal-btn"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Tamamla & Uygula
          </button>
        </div>
      </div>
    </div>
  );
};
