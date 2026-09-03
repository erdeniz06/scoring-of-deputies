import React, { useState, useEffect, useMemo } from 'react';
import { MP, MpTopicStance, StanceTag, Topic } from '../types';
import { 
  STANCE_GROUPS, 
  resolveDefaultStanceLabel, 
  getQuickPresetChips 
} from '../utils/stanceHelpers';
import { 
  AppUserRole, 
  addDirectlyApprovedFounderProposal, 
  addProposal,
  isStanceCustomOrEdited,
  removeApprovedCustomStance
} from '../utils/storage';
import { 
  X, 
  Plus, 
  CheckCircle2, 
  ShieldAlert, 
  Crown, 
  UserCheck, 
  Link as LinkIcon, 
  FileText, 
  Quote, 
  Sparkles,
  Edit3,
  RotateCcw,
  Trash2,
  Search,
  Users,
  BookOpen,
  Check,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface AddStanceProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  allMps: MP[];
  allTopics: Topic[];
  userRole: AppUserRole;
  onToggleUserRole: () => void;
  initialMpId?: string;
  initialTopicId?: string;
  initialStance?: MpTopicStance;
  mode?: 'add' | 'edit';
  onProposalSubmitted: (isDirectlyApproved: boolean, mpId: string, topicId: string) => void;
  onRevertToDefault?: (mpId: string, topicId: string) => void;
}

export const AddStanceProposalModal: React.FC<AddStanceProposalModalProps> = ({
  isOpen,
  onClose,
  allMps,
  allTopics,
  userRole,
  onToggleUserRole,
  initialMpId,
  initialTopicId,
  initialStance,
  mode = 'add',
  onProposalSubmitted,
  onRevertToDefault,
}) => {
  const isEditMode = mode === 'edit' || !!initialStance;
  const [selectedMpId, setSelectedMpId] = useState<string>(initialMpId || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || '');
  const [stanceTag, setStanceTag] = useState<StanceTag>('destekledi');
  const [stanceLabel, setStanceLabel] = useState<string>('');
  const [overallSummary, setOverallSummary] = useState<string>('');
  const [keyParaphrasedQuote, setKeyParaphrasedQuote] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [sourcePlatform, setSourcePlatform] = useState<string>('TBMM Tutanakları');
  const [sourceSummary, setSourceSummary] = useState<string>('');
  const [submitterName, setSubmitterName] = useState<string>(userRole === 'founder' ? 'Erdeniz Taşlıçukur (Kurucu)' : 'Gönüllü Tutanak Denetçisi');
  const [submitterNote, setSubmitterNote] = useState<string>('');
  const [mpSearch, setMpSearch] = useState<string>('');
  const [topicSearch, setTopicSearch] = useState<string>('');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      if (initialMpId) setSelectedMpId(initialMpId);
      else if (!selectedMpId && allMps.length > 0) setSelectedMpId(allMps[0].id);

      if (initialTopicId) setSelectedTopicId(initialTopicId);
      else if (!selectedTopicId && allTopics.length > 0) setSelectedTopicId(allTopics[0].id);

      setSubmitterName(userRole === 'founder' ? 'Erdeniz Taşlıçukur (Kurucu)' : 'Gönüllü Tutanak Denetçisi');

      if (initialStance) {
        setStanceTag(initialStance.stanceTag || 'destekledi');
        setStanceLabel(initialStance.stanceLabel || '');
        setOverallSummary(initialStance.overallSummary || '');
        setKeyParaphrasedQuote(initialStance.keyParaphrasedQuote || '');
        if (initialStance.sources && initialStance.sources.length > 0) {
          setSourceUrl(initialStance.sources[0].url || '');
          setSourcePlatform(initialStance.sources[0].outletOrPlatform || 'TBMM Tutanakları');
          setSourceSummary(initialStance.sources[0].summary || '');
        } else {
          setSourceUrl('');
          setSourcePlatform('TBMM Tutanakları');
          setSourceSummary('');
        }
        setSubmitterNote(isEditMode ? 'Demeç ve tutanak içeriği güncellendi.' : '');
      } else {
        setStanceTag('destekledi');
        setStanceLabel('');
        setOverallSummary('');
        setKeyParaphrasedQuote('');
        setSourceUrl('');
        setSourcePlatform('TBMM Tutanakları');
        setSourceSummary('');
        setSubmitterNote('');
      }
    }
  }, [isOpen, initialMpId, initialTopicId, initialStance, isEditMode, userRole, allMps, allTopics]);

  // Alphabetically sorted full MP list
  const sortedAllMps = useMemo(() => {
    return [...allMps].sort((a, b) => a.fullName.localeCompare(b.fullName, 'tr'));
  }, [allMps]);

  // Filtered MPs based on search and party
  const filteredMps = useMemo(() => {
    let result = sortedAllMps;
    if (partyFilter !== 'all') {
      result = result.filter(m => m.partyId.toLowerCase() === partyFilter.toLowerCase());
    }
    if (mpSearch.trim()) {
      const q = mpSearch.toLowerCase();
      result = result.filter(m => 
        m.fullName.toLowerCase().includes(q) ||
        m.province.toLowerCase().includes(q) ||
        m.partyId.toLowerCase().includes(q)
      );
    }
    return result;
  }, [sortedAllMps, mpSearch, partyFilter]);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    if (!topicSearch.trim()) return allTopics;
    const q = topicSearch.toLowerCase();
    return allTopics.filter(t => 
      t.title.toLowerCase().includes(q) ||
      (t.shortTitle && t.shortTitle.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  }, [allTopics, topicSearch]);

  if (!isOpen) return null;

  const currentMp = allMps.find((m) => m.id === selectedMpId);
  const currentTopic = allTopics.find((t) => t.id === selectedTopicId);
  const isCustomEdited = selectedMpId && selectedTopicId ? isStanceCustomOrEdited(selectedMpId, selectedTopicId) : false;

  // Check if the currently chosen MP has an existing recorded stance on the chosen topic
  const existingStanceInMp = currentMp?.stances?.[selectedTopicId];

  const handleLoadExistingStance = () => {
    if (existingStanceInMp) {
      setStanceTag(existingStanceInMp.stanceTag || 'destekledi');
      setStanceLabel(existingStanceInMp.stanceLabel || '');
      setOverallSummary(existingStanceInMp.overallSummary || '');
      setKeyParaphrasedQuote(existingStanceInMp.keyParaphrasedQuote || '');
      if (existingStanceInMp.sources && existingStanceInMp.sources.length > 0) {
        setSourceUrl(existingStanceInMp.sources[0].url || '');
        setSourcePlatform(existingStanceInMp.sources[0].outletOrPlatform || 'TBMM Tutanakları');
        setSourceSummary(existingStanceInMp.sources[0].summary || '');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMpId || !selectedTopicId) return;

    const mpName = currentMp?.fullName || 'Milletvekili';
    const topicTitle = currentTopic?.title || 'Konu Başlığı';

    const defaultLabel = resolveDefaultStanceLabel(
      stanceTag, 
      currentTopic?.id || selectedTopicId, 
      stanceLabel.trim()
    );

    // Auto-generate summary from quote if omitted
    const finalSummary = overallSummary.trim() || (
      keyParaphrasedQuote.trim()
        ? `"${keyParaphrasedQuote.trim()}"`
        : `${mpName}, ${topicTitle} konusunda beyanda bulunmuştur.`
    );

    let extractedPlatform = sourcePlatform.trim();
    if (!extractedPlatform && sourceUrl.trim()) {
      try {
        const urlObj = new URL(sourceUrl.trim());
        extractedPlatform = urlObj.hostname.replace('www.', '');
      } catch {
        extractedPlatform = 'Web / TBMM Kaynağı';
      }
    }
    if (!extractedPlatform) extractedPlatform = 'TBMM Tutanak Kaydı';

    if (userRole === 'founder') {
      // Direct instant approval for founder
      addDirectlyApprovedFounderProposal({
        type: 'stance_update',
        submitterName: submitterName.trim() || 'Erdeniz Taşlıçukur (Kurucu)',
        submitterNote: submitterNote.trim() || (isEditMode ? 'Kurucu tarafından güncellendi ve düzeltildi.' : 'Kurucu tarafından doğrudan sisteme işlendi.'),
        mpId: selectedMpId,
        mpName,
        topicId: selectedTopicId,
        topicTitle,
        stanceTag,
        stanceLabel: defaultLabel,
        overallSummary: finalSummary,
        keyParaphrasedQuote: keyParaphrasedQuote.trim(),
        sourceUrl: sourceUrl.trim(),
        sourcePlatform: extractedPlatform,
        sourceSummary: sourceSummary.trim() || 'Doğrulanmış tutanak ve kaynak bağlantısı.',
      });

      onProposalSubmitted(true, selectedMpId, selectedTopicId);
    } else {
      // Pending moderation queue for standard users
      addProposal({
        type: 'stance_update',
        submitterName: submitterName.trim() || 'Gönüllü Katılımcı',
        submitterNote: submitterNote.trim() || (isEditMode ? 'Kullanıcı tarafından düzeltme önerisi sunuldu.' : 'Kullanıcı tarafından tutanak incelenerek gönderildi.'),
        mpId: selectedMpId,
        mpName,
        topicId: selectedTopicId,
        topicTitle,
        stanceTag,
        stanceLabel: defaultLabel,
        overallSummary: finalSummary,
        keyParaphrasedQuote: keyParaphrasedQuote.trim(),
        sourceUrl: sourceUrl.trim(),
        sourcePlatform: extractedPlatform,
        sourceSummary: sourceSummary.trim() || 'Kullanıcı tutanak önerisi.',
      });

      onProposalSubmitted(false, selectedMpId, selectedTopicId);
    }

    onClose();
  };

  const handleRevert = () => {
    if (selectedMpId && selectedTopicId) {
      removeApprovedCustomStance(selectedMpId, selectedTopicId);
      if (onRevertToDefault) {
        onRevertToDefault(selectedMpId, selectedTopicId);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        id="add-stance-modal"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isEditMode 
                ? 'bg-indigo-500/20 border border-indigo-400/30 text-indigo-400' 
                : 'bg-amber-500/20 border border-amber-400/30 text-amber-400'
            }`}>
              {isEditMode ? <Edit3 className="w-5 h-5 stroke-[2.2]" /> : <Plus className="w-6 h-6 stroke-[2.2]" />}
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif tracking-tight flex items-center gap-2">
                <span>{isEditMode ? 'Demeç & Tutanağı Düzenle / Düzelt' : 'Yeni Demeç & Tutanak Ekle'}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-sans font-normal border ${
                  isEditMode
                    ? 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30'
                    : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                }`}>
                  {isEditMode ? '✏️ Düzenleme Modu' : '+ Katkı Modülü'}
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                {isEditMode 
                  ? 'Milletvekilinin mevcut beyanını, alıntı cümlesini veya kaynak linkini güncelleyin' 
                  : 'Milletvekilinin meclis konuşması, oylama tutanağı veya basın demecini işleyin'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Notice & Switch Bar */}
        <div className={`px-6 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${
          userRole === 'founder' 
            ? 'bg-emerald-50/90 text-emerald-950 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-800' 
            : 'bg-amber-50/90 text-amber-950 border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-800'
        }`}>
          <div className="flex items-center gap-2">
            {userRole === 'founder' ? (
              <>
                <Crown className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>👑 Kurucu Yetkisi (Erdeniz Taşlıçukur):</strong> Eklediğiniz demeç <strong>doğrudan onaylanır</strong> ve profile anında canlı işlenir.
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                <span>
                  <strong>👤 Katılımcı Kullanıcı Modu:</strong> Eklediğiniz demeç <strong>hakem inceleme havuzuna</strong> düşer; denetim sonrası yayına alınır.
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleUserRole}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
            title="Rolü değiştirerek her iki deneyimi test edin"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Rolü Değiştir ({userRole === 'founder' ? 'Katılımcı Ol' : 'Kurucu Ol'})</span>
          </button>
        </div>

        {/* Quick Requirement Callout */}
        <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Hızlı Giriş: Sadece <strong>Kaynak URL</strong> ve <strong>Alıntı Cümlesi</strong> zorunludur. Diğer alanlar isteğe bağlıdır.</span>
          </div>
          <span className="hidden sm:inline text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 px-2 py-0.5 rounded font-bold">
            2 Zorunlu Alan
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5 max-h-[75vh] overflow-y-auto">
          {/* Target MP & Target Topic selection */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* MP Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span>İlgili Milletvekili</span>
                  </label>
                  <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {filteredMps.length} / {allMps.length} Vekil
                  </span>
                </div>

                {/* MP Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input 
                    type="text"
                    placeholder="Vekil ara: Burak Dalgın, Ömer Çelik, CHP, DEVA, Adana..."
                    value={mpSearch}
                    onChange={(e) => setMpSearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-7 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  {mpSearch && (
                    <button
                      type="button"
                      onClick={() => setMpSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick Party Filter Chips */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] no-scrollbar">
                  {[
                    { id: 'all', label: 'Tümü' },
                    { id: 'akp', label: 'AKP' },
                    { id: 'yeni_parti', label: 'YENİ PARTİ' },
                    { id: 'chp', label: 'CHP' },
                    { id: 'yeni_yol', label: 'YENİ YOL' },
                    { id: 'mhp', label: 'MHP' },
                    { id: 'dem', label: 'DEM' },
                    { id: 'iyi', label: 'İYİ' },
                    { id: 'tip', label: 'TİP' },
                    { id: 'yrp', label: 'YRP' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPartyFilter(p.id)}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-colors flex-shrink-0 cursor-pointer ${
                        partyFilter === p.id
                          ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-2xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* MP Select Dropdown */}
                <select
                  id="add-stance-mp-select"
                  value={selectedMpId}
                  onChange={(e) => {
                    setSelectedMpId(e.target.value);
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {filteredMps.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} ({m.partyId.toUpperCase()} • {m.province})
                    </option>
                  ))}
                  {filteredMps.length === 0 && (
                    <option disabled value="">
                      Aramaya uygun vekil bulunamadı
                    </option>
                  )}
                </select>

                {/* Active MP Summary Tag */}
                {currentMp && (
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {currentMp.fullName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{currentMp.fullName}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1.5">
                          ({currentMp.partyId.toUpperCase()} • {currentMp.province})
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                      Aktif Seçim
                    </span>
                  </div>
                )}
              </div>

              {/* Topic Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>Konu Başlığı</span>
                  </label>
                  <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {filteredTopics.length} / {allTopics.length} Konu
                  </span>
                </div>

                {/* Topic Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input 
                    type="text"
                    placeholder="Konu ara: Anayasa, ekonomi, dış politika..."
                    value={topicSearch}
                    onChange={(e) => setTopicSearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-7 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  {topicSearch && (
                    <button
                      type="button"
                      onClick={() => setTopicSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Topic Select Dropdown */}
                <select
                  id="add-stance-topic-select"
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {filteredTopics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} {t.partyScope ? `(${t.partyScope.toUpperCase()} Özel)` : ''}
                    </option>
                  ))}
                  {filteredTopics.length === 0 && (
                    <option disabled value="">
                      Aramaya uygun konu bulunamadı
                    </option>
                  )}
                </select>

                {/* Active Topic Summary Tag */}
                {currentTopic && (
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between shadow-2xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-2">
                      {currentTopic.title}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md flex-shrink-0">
                      {currentTopic.category || 'Gündem'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Helper: If selected MP already has a stance on the selected topic */}
            {existingStanceInMp && (
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-900 dark:text-amber-200 truncate">
                    <strong>{currentMp?.fullName}</strong> için bu konuda kayıtlı bir meclis beyanı mevcut.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadExistingStance}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] flex-shrink-0 transition-colors cursor-pointer shadow-2xs"
                >
                  Mevcut Demeci Yükle & Düzenle
                </button>
              </div>
            )}
          </div>

          {/* 1. REQUIRED FIELD: Verified Source URL */}
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Kaynak URL Bağlantısı</span>
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">Zorunlu *</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">TBMM Tutanak, Haber, X veya Video</span>
            </div>
            <input
              type="url"
              required
              placeholder="https://www.tbmm.gov.tr/... veya haber/video linki"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          {/* 2. REQUIRED FIELD: Key Paraphrased Direct Quote */}
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Vekilin Ağzından Demeç / Tutanak Alıntı Cümlesi</span>
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">Zorunlu *</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Kürsü sözü veya demeç alıntısı</span>
            </div>
            <input
              type="text"
              required
              placeholder='Örn: "Toplumsal uzlaşı ve çözümün adresi Meclis çatısıdır."'
              value={keyParaphrasedQuote}
              onChange={(e) => setKeyParaphrasedQuote(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-serif italic text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          {/* OPTIONAL FIELDS SECTION */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Ek Detaylar</span>
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-medium">
                Tümü İsteğe Bağlı
              </span>
            </div>

            {/* Stance Tag and Label */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Tutum / Duruş Türü
                  </label>
                  <select
                    value={stanceTag}
                    onChange={(e) => {
                      const newTag = e.target.value as StanceTag;
                      setStanceTag(newTag);
                      if (!stanceLabel || stanceLabel.trim() === '') {
                        setStanceLabel(resolveDefaultStanceLabel(newTag, currentTopic?.id || selectedTopicId));
                      }
                    }}
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                  >
                    {STANCE_GROUPS.map((group) => (
                      <optgroup key={group.id} label={group.title}>
                        {group.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Kısa Başlık / Rozet Metni (Serbestçe Belirleyebilirsiniz)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Saygıyla Andı / Eleştirdi / Açıklama Yaptı"
                    value={stanceLabel}
                    onChange={(e) => setStanceLabel(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Smart Quick Preset Chips based on topic */}
              <div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Hızlı Seçim (Bu konuya özel hazır etiketler - tek tıkla seçebilirsiniz):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {getQuickPresetChips(currentTopic?.id || selectedTopicId).map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setStanceTag(chip.tag);
                        setStanceLabel(chip.badge);
                      }}
                      className={`text-[11px] px-2 py-1 rounded-md border transition-all ${
                        stanceLabel === chip.badge
                          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-amber-400 font-semibold shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Kısa Açıklama / Bağlam (İsteğe Bağlı - boş bırakılırsa alıntıdan üretilir)
              </label>
              <textarea
                rows={2}
                placeholder="Vekilin bu konudaki tutumu, açıklaması veya davranışının özeti..."
                value={overallSummary}
                onChange={(e) => setOverallSummary(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Platform & Submitter Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kuruluş / Platform / Yayın (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Resmi X Hesabı, Basın Toplantısı, TV Mülakatı, TBMM Tutanağı"
                  value={sourcePlatform}
                  onChange={(e) => setSourcePlatform(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Ekleyen / Raportör İsmi (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Vazgeç
              </button>

              {isCustomEdited && (
                <button
                  type="button"
                  onClick={handleRevert}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                  title="Eklenen veya düzenlenen bu demeci silip varsayılana döndürür"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Özel Demeci Sil</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                userRole === 'founder'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/40'
                  : 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/40'
              }`}
            >
              {userRole === 'founder' ? (
                <>
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>{isEditMode ? '👑 Değişiklikleri Kaydet & Canlıya Al' : '👑 Doğrudan Canlıya Al & Yayınla'}</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-200" />
                  <span>{isEditMode ? '🛡️ Düzeltmeyi Hakem İncelemesine Gönder' : '🛡️ Hakem Denetimine Gönder'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
