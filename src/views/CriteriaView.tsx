import React, { useState, useMemo } from 'react';
import { Topic, TopicCategory, MP } from '../types';
import { TOPIC_CATEGORIES } from '../data/topics';
import { AppUserRole, TopicOverrides } from '../utils/storage';
import { 
  SlidersHorizontal, 
  Search, 
  Plus, 
  Edit3, 
  RotateCcw, 
  Trash2, 
  Check, 
  X, 
  Vote, 
  Scale, 
  Users, 
  Mic, 
  BookOpen, 
  Sparkles, 
  Crown, 
  CheckSquare, 
  Square,
  FileText,
  Sliders,
  ShieldCheck
} from 'lucide-react';

interface CriteriaViewProps {
  topics: Topic[];
  allMps: MP[];
  selectedTopicIds: string[];
  topicOverrides: TopicOverrides;
  userRole: AppUserRole;
  onToggleTopic: (topicId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onUpdateTopic: (topicId: string, updatedData: Partial<Topic>) => void;
  onResetTopic: (topicId: string) => void;
  onResetAllTopics: () => void;
  onAddNewTopic: (topicData: Omit<Topic, 'id'>) => void;
  onProposeNewTopic?: (topicData: Omit<Topic, 'id'>, submitterName?: string, submitterNote?: string) => void;
  onProposeUpdateTopic?: (topicId: string, updatedData: Partial<Topic>, submitterName?: string, submitterNote?: string) => void;
  onRemoveCustomTopic?: (topicId: string) => void;
  onOpenAddStance?: (topicId?: string, mpId?: string) => void;
}

export const CriteriaView: React.FC<CriteriaViewProps> = ({
  topics,
  allMps,
  selectedTopicIds,
  topicOverrides,
  userRole,
  onToggleTopic,
  onSelectAll,
  onDeselectAll,
  onUpdateTopic,
  onResetTopic,
  onResetAllTopics,
  onAddNewTopic,
  onProposeNewTopic,
  onProposeUpdateTopic,
  onRemoveCustomTopic,
  onOpenAddStance,
}) => {
  const isFounder = userRole === 'founder';
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [scopeFilter, setScopeFilter] = useState<string>('all');

  // Edit / Rename Modal State
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<TopicCategory>('siyaset');
  const [editDescription, setEditDescription] = useState('');
  const [editImportance, setEditImportance] = useState<number>(8);
  const [editContextNote, setEditContextNote] = useState('');
  const [editPartyScope, setEditPartyScope] = useState<string>('all');
  const [editPartyScopeLabel, setEditPartyScopeLabel] = useState<string>('');
  const [editSubmitterName, setEditSubmitterName] = useState('');
  const [editSubmitterNote, setEditSubmitterNote] = useState('');

  // Quick Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TopicCategory>('siyaset');
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState<number>(8);
  const [newContextNote, setNewContextNote] = useState('');
  const [newPartyScope, setNewPartyScope] = useState<string>('all');
  const [newPartyScopeLabel, setNewPartyScopeLabel] = useState<string>('Genel (Tüm Milletvekilleri)');
  const [newSubmitterName, setNewSubmitterName] = useState('');
  const [newSubmitterNote, setNewSubmitterNote] = useState('');

  // Count how many MPs have a recorded stance for each topic
  const stanceCountPerTopic = useMemo(() => {
    const counts: Record<string, number> = {};
    topics.forEach((t) => {
      let count = 0;
      allMps.forEach((mp) => {
        if (mp.stances && mp.stances[t.id]) {
          count++;
        }
      });
      counts[t.id] = count;
    });
    return counts;
  }, [topics, allMps]);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.contextNote && t.contextNote.toLowerCase().includes(q)) ||
        (t.partyScopeLabel && t.partyScopeLabel.toLowerCase().includes(q));

      const matchCat = categoryFilter === 'all' || t.category === categoryFilter;

      let matchScope = true;
      if (scopeFilter === 'all_general') matchScope = !t.partyScope || t.partyScope === 'all';
      else if (scopeFilter === 'opposition') matchScope = t.partyScope === 'opposition';
      else if (scopeFilter === 'chp') matchScope = t.partyScope === 'chp';
      else if (scopeFilter === 'iyi') matchScope = t.partyScope === 'iyi';
      else if (scopeFilter !== 'all') matchScope = t.partyScope === scopeFilter;

      return matchSearch && matchCat && matchScope;
    });
  }, [topics, searchQuery, categoryFilter, scopeFilter]);

  const handleOpenEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setEditTitle(topic.title);
    setEditCategory(topic.category);
    setEditDescription(topic.description || '');
    setEditImportance(topic.defaultImportance || 8);
    setEditContextNote(topic.contextNote || '');
    setEditPartyScope(topic.partyScope || 'all');
    setEditPartyScopeLabel(topic.partyScopeLabel || '');
    setEditSubmitterName('');
    setEditSubmitterNote('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic || !editTitle.trim()) return;

    const payload = {
      title: editTitle.trim(),
      category: editCategory,
      description: editDescription.trim() || editingTopic.description,
      defaultImportance: editImportance,
      contextNote: editContextNote.trim(),
      partyScope: editPartyScope,
      partyScopeLabel: editPartyScopeLabel.trim() || undefined,
    };

    if (!isFounder && onProposeUpdateTopic) {
      onProposeUpdateTopic(
        editingTopic.id,
        payload,
        editSubmitterName.trim() || 'Gönüllü Katılımcı',
        editSubmitterNote.trim() || 'Kriter düzenleme / yeniden adlandırma önerisi.'
      );
    } else {
      onUpdateTopic(editingTopic.id, payload);
    }

    setEditingTopic(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let defaultScopeLabel = 'Genel (Tüm Milletvekilleri)';
    if (newPartyScope === 'opposition') defaultScopeLabel = 'Tüm Muhalefet Milletvekilleri';
    else if (newPartyScope === 'chp') defaultScopeLabel = 'CHP Milletvekilleri';
    else if (newPartyScope === 'iyi') defaultScopeLabel = 'İYİ Parti Milletvekilleri';
    else if (newPartyScope === 'akp') defaultScopeLabel = 'AKP Milletvekilleri';

    const topicPayload = {
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Kullanıcı tarafından eklenen yeni değerlendirme kriteri.',
      defaultImportance: newImportance,
      contextNote: newContextNote.trim() || 'TBMM komisyon ve genel kurul tutanakları.',
      partyScope: newPartyScope,
      partyScopeLabel: newPartyScopeLabel.trim() || defaultScopeLabel,
    };

    if (!isFounder && onProposeNewTopic) {
      onProposeNewTopic(
        topicPayload,
        newSubmitterName.trim() || 'Gönüllü Katılımcı',
        newSubmitterNote.trim() || 'Kullanıcı yeni meclis kriteri önerisi.'
      );
    } else {
      onAddNewTopic(topicPayload);
    }

    setNewTitle('');
    setNewDescription('');
    setNewContextNote('');
    setNewSubmitterName('');
    setNewSubmitterNote('');
    setIsCreateModalOpen(false);
  };

  const getCategoryBadge = (category: TopicCategory) => {
    const catInfo = TOPIC_CATEGORIES[category] || { label: category, icon: 'Sparkles' };
    let icon = <Sparkles className="w-3.5 h-3.5" />;
    let colorClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

    switch (category) {
      case 'siyaset':
        icon = <Vote className="w-3.5 h-3.5 text-rose-500" />;
        colorClass = 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
        break;
      case 'hukuk':
        icon = <Scale className="w-3.5 h-3.5 text-indigo-500" />;
        colorClass = 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
        break;
      case 'sosyal':
        icon = <Users className="w-3.5 h-3.5 text-emerald-500" />;
        colorClass = 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        break;
      case 'kultur_ifade':
        icon = <Mic className="w-3.5 h-3.5 text-amber-500" />;
        colorClass = 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        break;
      case 'egitim_inanc':
        icon = <BookOpen className="w-3.5 h-3.5 text-cyan-500" />;
        colorClass = 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${colorClass}`}>
        {icon}
        <span>{catInfo.label}</span>
      </span>
    );
  };

  const hasAnyOverrides = Object.keys(topicOverrides).length > 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner / Role Authority Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <SlidersHorizontal className="w-6 h-6" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-serif tracking-tight">
                Yasama & Değerlendirme Kriterleri
              </h1>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">
                {topics.length} Kriter ({selectedTopicIds.length} Aktif)
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Milletvekillerinin meclis oylamaları, kanun teklifleri ve komisyon tutanaklarındaki duruşlarını değerlendirdiğiniz konu başlıklarını yönetin, <strong>adlandırın</strong> ve önem derecelerini belirleyin.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="btn-add-new-criteria"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Yeni Kriter Ekle</span>
            </button>

            {hasAnyOverrides && (
              <button
                onClick={onResetAllTopics}
                title="Tüm değiştirilmiş kriter başlıklarını orijinal haline sıfırla"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Orijinal İsimlere Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        {/* Role Helper Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
          {userRole === 'founder' ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-medium">
              <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Kurucu Yetkisi Aktif:</strong> Kriter başlıklarını doğrudan yeniden adlandırabilir, meclis kapsamlarını düzenleyebilir ve tüm sisteme anında uygulayabilirsiniz.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Kullanıcı Özelleştirme İzni:</strong> Kriterleri kendi siyasi önceliklerinize göre yeniden adlandırabilir, filtreleyebilir ve yeni kriterler tanımlayabilirsiniz.
              </span>
            </div>
          )}

          {/* Quick Selection Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAll}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
            >
              Tümünü Seç ({topics.length})
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={onDeselectAll}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
            >
              Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Kriter adı, açıklama veya bağlam ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scope Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] text-slate-400 font-semibold mr-1 flex-shrink-0">Kapsam:</span>
            {[
              { id: 'all', label: 'Tüm Kapsamlar' },
              { id: 'all_general', label: 'Genel Meclis' },
              { id: 'opposition', label: 'Muhalefet' },
              { id: 'chp', label: 'CHP Özel' },
              { id: 'iyi', label: 'İYİ Parti Özel' },
            ].map((scope) => (
              <button
                key={scope.id}
                onClick={() => setScopeFilter(scope.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  scopeFilter === scope.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              categoryFilter === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Tüm Kategoriler ({topics.length})
          </button>
          {Object.entries(TOPIC_CATEGORIES).map(([catKey, catVal]) => {
            const count = topics.filter((t) => t.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setCategoryFilter(catKey)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                  categoryFilter === catKey
                    ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span>{catVal.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const isSelected = selectedTopicIds.includes(topic.id);
          const isOverridden = !!topicOverrides[topic.id];
          const isCustom = topic.id.startsWith('custom_topic_');
          const stanceCount = stanceCountPerTopic[topic.id] || 0;

          return (
            <div
              key={topic.id}
              className={`rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
              }`}
            >
              <div className="space-y-3">
                {/* Header Row: Category Badge & Actions */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getCategoryBadge(topic.category)}
                    {topic.partyScopeLabel && (
                      <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                        {topic.partyScopeLabel}
                      </span>
                    )}
                    {isOverridden && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Yeniden Adlandırıldı</span>
                      </span>
                    )}
                    {isCustom && (
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded-md border border-purple-300">
                        Özel Eklenen
                      </span>
                    )}
                  </div>

                  {/* Toggle Checkbox */}
                  <button
                    onClick={() => onToggleTopic(topic.id)}
                    title={isSelected ? 'Değerlendirmeden çıkar' : 'Değerlendirmeye dahil et'}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {topic.description}
                  </p>
                </div>

                {/* Context Note (if present) */}
                {topic.contextNote && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                    <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>Meclis Bağlamı & Kaynak Odakları:</span>
                    </div>
                    <p className="line-clamp-2">{topic.contextNote}</p>
                  </div>
                )}
              </div>

              {/* Bottom Footer Info & Actions */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                {/* Left: Stances Count & Default Importance */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                    <span className="font-bold text-slate-900 dark:text-slate-200">{stanceCount}</span>
                    <span className="text-[11px]">Vekil Tutanağı</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <span>Önem:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                      {topic.defaultImportance || 8}/10
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5">
                  {onOpenAddStance && (
                    <button
                      onClick={() => onOpenAddStance(topic.id)}
                      title="Bu kritere yeni bir milletvekili demeci/tutanağı ekle"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 dark:bg-slate-800 dark:hover:bg-amber-950/60 dark:hover:text-amber-300 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    id={`btn-edit-topic-${topic.id}`}
                    onClick={() => handleOpenEdit(topic)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Yeniden Adlandır / Düzenle</span>
                  </button>

                  {isOverridden && (
                    <button
                      onClick={() => onResetTopic(topic.id)}
                      title="Orijinal başlığa ve varsayılanlara geri dön"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isCustom && onRemoveCustomTopic && (
                    <button
                      onClick={() => onRemoveCustomTopic(topic.id)}
                      title="Özel kriteri sil"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">Aramaya uygun kriter bulunamadı</h3>
          <p className="text-xs text-slate-500 mt-1">Arama kriterlerinizi değiştirebilir veya yeni bir konu başlığı tanımlayabilirsiniz.</p>
        </div>
      )}

      {/* ================= EDIT / RENAME MODAL ================= */}
      {editingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Kriteri Yeniden Adlandır & Düzenle
                  </h2>
                  <p className="text-xs text-slate-500">
                    Başlık, açıklama ve önem derecesini güncelleyin
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingTopic(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Role Informative Notice */}
              {!isFounder ? (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Katılımcı / Kullanıcı Modu (Denetim Onaylı):</strong>
                    <p className="mt-0.5 text-amber-800 dark:text-amber-300">
                      Kriter yeniden adlandırma veya içerik düzenleme öneriniz, hakem ve kurucu heyetinin onayından geçtikten sonra tüm uygulamada geçerli olacaktır.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">👑 Kurucu Yetkisi (Erdeniz Taşlıçukur):</strong>
                    <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                      Yaptığınız tüm değişiklikler doğrudan ve anında sisteme kaydedilerek canlıya alınır.
                    </p>
                  </div>
                </div>
              )}

              {/* Title Field */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Kriter / Konu Başlığı <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Örn: 2023 Kılıçdaroğlu Adaylığına Tutum"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submitter details for user mode */}
              {!isFounder && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Adınız Soyadınız / Rumuzunuz
                    </label>
                    <input
                      type="text"
                      value={editSubmitterName}
                      onChange={(e) => setEditSubmitterName(e.target.value)}
                      placeholder="Örn: Av. Selin Y."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Düzenleme Gerekçeniz
                    </label>
                    <input
                      type="text"
                      value={editSubmitterNote}
                      onChange={(e) => setEditSubmitterNote(e.target.value)}
                      placeholder="Örn: Başlık daha kapsayıcı olmalı"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* Category & Scope Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as TopicCategory)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.entries(TOPIC_CATEGORIES).map(([catKey, catVal]) => (
                      <option key={catKey} value={catKey}>
                        {catVal.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Uygulanacak Meclis Grubu
                  </label>
                  <select
                    value={editPartyScope}
                    onChange={(e) => setEditPartyScope(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Genel (Tüm Milletvekilleri)</option>
                    <option value="opposition">Tüm Muhalefet Milletvekilleri</option>
                    <option value="chp">CHP Milletvekilleri</option>
                    <option value="iyi">İYİ Parti Milletvekilleri</option>
                    <option value="akp">AKP Milletvekilleri</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Kriter Açıklaması & Kapsamı
                </label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Bu kriterde neyin değerlendirildiğini açıklayın..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Context Note */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Meclis Tutanak & Kaynak Bağlamı
                </label>
                <input
                  type="text"
                  value={editContextNote}
                  onChange={(e) => setEditContextNote(e.target.value)}
                  placeholder="Örn: 6'lı masa müzakereleri ve genel kurul oylamaları..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Default Importance Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Varsayılan Önem Katsayısı
                  </label>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {editImportance} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={editImportance}
                  onChange={(e) => setEditImportance(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTopic(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                    !isFounder ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {!isFounder ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Düzenleme Önerisini Denetime Gönder
                    </>
                  ) : (
                    'Değişiklikleri Canlıya Al'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CREATE CRITERIA MODAL ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Yeni Değerlendirme Kriteri Tanımla
                  </h2>
                  <p className="text-xs text-slate-500">
                    Milletvekillerini puanlamak için yeni bir yasama başlığı oluşturun
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Role Informative Notice */}
              {!isFounder ? (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Katılımcı / Kullanıcı Modu (Denetim Heyeti Onaylı):</strong>
                    <p className="mt-0.5 text-amber-800 dark:text-amber-300">
                      Önerdiğiniz yeni kriter doğrudan uygulamada görünmez. Kurucu ve denetim hakemlerinin incelemesinden geçip onaylandıktan sonra canlıya alınır.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">👑 Kurucu Yetkisi (Erdeniz Taşlıçukur):</strong>
                    <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                      Tanımladığınız yeni kriter anında veritabanına eklenir ve tüm kullanıcılarda canlıya geçer.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Kriter / Konu Başlığı <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: Vergi ve Harç Artışlarına Tutum, Öğretmenlik Meslek Kanunu..."
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submitter details for user mode */}
              {!isFounder && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Adınız Soyadınız / Rumuzunuz
                    </label>
                    <input
                      type="text"
                      value={newSubmitterName}
                      onChange={(e) => setNewSubmitterName(e.target.value)}
                      placeholder="Örn: Kemal K."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Öneri Gerekçeniz / TBMM Notu
                    </label>
                    <input
                      type="text"
                      value={newSubmitterNote}
                      onChange={(e) => setNewSubmitterNote(e.target.value)}
                      placeholder="Örn: Son torba yasa maddesi"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TopicCategory)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.entries(TOPIC_CATEGORIES).map(([catKey, catVal]) => (
                      <option key={catKey} value={catKey}>
                        {catVal.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Uygulanacak Meclis Grubu
                  </label>
                  <select
                    value={newPartyScope}
                    onChange={(e) => setNewPartyScope(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Genel (Tüm Milletvekilleri)</option>
                    <option value="opposition">Tüm Muhalefet Milletvekilleri</option>
                    <option value="chp">CHP Milletvekilleri</option>
                    <option value="iyi">İYİ Parti Milletvekilleri</option>
                    <option value="akp">AKP Milletvekilleri</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Kriter Açıklaması & Kapsamı
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Bu kriterde milletvekilinin hangi tutumu veya oylaması değerlendirilecek?"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Meclis Tutanak & Kaynak Bağlamı
                </label>
                <input
                  type="text"
                  value={newContextNote}
                  onChange={(e) => setNewContextNote(e.target.value)}
                  placeholder="Örn: TBMM Genel Kurul oylaması veya basın açıklamaları..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Varsayılan Önem Derecesi
                  </label>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {newImportance} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newImportance}
                  onChange={(e) => setNewImportance(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                    !isFounder ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {!isFounder ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Kriter Önerisini Denetim Heyetine Gönder
                    </>
                  ) : (
                    'Kriteri Oluştur & Listeye Ekle'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
