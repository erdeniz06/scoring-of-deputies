import React, { useState, useEffect } from 'react';
import { MpTopicStance, SourceItem, StanceTag, Topic } from '../types';
import { 
  STANCE_GROUPS, 
  resolveDefaultStanceLabel, 
  getQuickPresetChips, 
  getStanceBadgeClasses 
} from '../utils/stanceHelpers';
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
  Info,
  Plus,
  Trash2,
  CheckCircle2,
  Link as LinkIcon,
  Edit3,
  PencilLine,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { getSemanticScoreDescription } from '../utils/calculator';
import { isStanceCustomOrEdited } from '../utils/storage';

interface TopicStanceCardProps {
  topic: Topic;
  stance?: MpTopicStance;
  mpId?: string;
  mpName?: string;
  partyShortName?: string;
  userImportance: number; // 0-10
  isMpCustomImportance?: boolean;
  currentScore: number | null | undefined;
  customSources?: SourceItem[];
  onSetScore: (score: number | undefined) => void;
  onQuickChangeImportance?: (newImportance: number) => void;
  onAddCustomSource?: (mpId: string, topicId: string, source: Omit<SourceItem, 'id' | 'mpId' | 'topicId'>) => void;
  onRemoveCustomSource?: (mpId: string, topicId: string, sourceId: string) => void;
  onOpenAddStance?: (topicId: string, mpId?: string) => void;
  onOpenEditStance?: (topicId: string, mpId?: string, stance?: MpTopicStance) => void;
  onDirectUpdateStance?: (mpId: string, topicId: string, data: {
    keyParaphrasedQuote: string;
    sourceUrl?: string;
    sourcePlatform?: string;
    overallSummary?: string;
    stanceTag?: StanceTag;
    stanceLabel?: string;
  }) => void;
  onRevertStance?: (mpId: string, topicId: string) => void;
}

export const TopicStanceCard: React.FC<TopicStanceCardProps> = ({
  topic,
  stance,
  mpId,
  mpName,
  partyShortName,
  userImportance,
  isMpCustomImportance = false,
  currentScore,
  customSources = [],
  onSetScore,
  onQuickChangeImportance,
  onAddCustomSource,
  onRemoveCustomSource,
  onOpenAddStance,
  onOpenEditStance,
  onDirectUpdateStance,
  onRevertStance,
}) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSourcePlatform, setNewSourcePlatform] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceSummary, setNewSourceSummary] = useState('');
  const [newSourceType, setNewSourceType] = useState<'news' | 'tweet' | 'tv'>('news');
  const [newSourceDate, setNewSourceDate] = useState('');

  // Inline Quick Edit state
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [editQuote, setEditQuote] = useState(stance?.keyParaphrasedQuote || '');
  const [editSummary, setEditSummary] = useState(stance?.overallSummary || '');
  const [editUrl, setEditUrl] = useState(stance?.sources?.[0]?.url || '');
  const [editPlatform, setEditPlatform] = useState(stance?.sources?.[0]?.outletOrPlatform || 'TBMM Tutanakları');
  const [editStanceTag, setEditStanceTag] = useState<StanceTag>(stance?.stanceTag || 'destekledi');
  const [editStanceLabel, setEditStanceLabel] = useState(stance?.stanceLabel || '');

  // Keep inline edit states updated when stance prop changes
  useEffect(() => {
    if (stance) {
      setEditQuote(stance.keyParaphrasedQuote || '');
      setEditSummary(stance.overallSummary || '');
      setEditUrl(stance.sources?.[0]?.url || '');
      setEditPlatform(stance.sources?.[0]?.outletOrPlatform || 'TBMM Tutanakları');
      setEditStanceTag(stance.stanceTag || 'destekledi');
      setEditStanceLabel(stance.stanceLabel || '');
    }
  }, [stance]);

  const isScored = currentScore !== undefined && currentScore !== null;
  const importancePercent = userImportance * 10;
  const isCustomEdited = mpId ? isStanceCustomOrEdited(mpId, topic.id) : false;

  // Combine standard stance sources with user added custom sources
  const baseSources = stance?.sources || [];
  const allSources = [...baseSources, ...customSources];

  // Formula contribution
  const nominatorContribution = isScored ? importancePercent * (currentScore as number) : 0;
  const denominatorContribution = importancePercent * 10;

  // Semantic tag colors
  const tagColor = getStanceBadgeClasses(stance?.stanceTag);

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

  const handleSaveCustomSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpId || !newSourceUrl.trim() || !newSourcePlatform.trim() || !onAddCustomSource) return;

    onAddCustomSource(mpId, topic.id, {
      outletOrPlatform: newSourcePlatform.trim(),
      url: newSourceUrl.trim().startsWith('http') ? newSourceUrl.trim() : `https://${newSourceUrl.trim()}`,
      summary: newSourceSummary.trim() || 'Kullanıcı tarafından eklenen güvenilir kaynak.',
      sourceType: newSourceType,
      publishDate: newSourceDate.trim() || new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }),
    });

    setNewSourceUrl('');
    setNewSourcePlatform('');
    setNewSourceSummary('');
    setNewSourceDate('');
    setIsAddingSource(false);
    setSourcesOpen(true);
  };

  const handleSaveInlineEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpId || !onDirectUpdateStance) return;

    onDirectUpdateStance(mpId, topic.id, {
      keyParaphrasedQuote: editQuote.trim(),
      overallSummary: editSummary.trim() || (editQuote.trim() ? `"${editQuote.trim()}"` : `${mpName || 'Vekil'}, bu konuda görüş beyan etti.`),
      sourceUrl: editUrl.trim(),
      sourcePlatform: editPlatform.trim() || 'TBMM / Açıklama Kaynağı',
      stanceTag: editStanceTag,
      stanceLabel: resolveDefaultStanceLabel(editStanceTag, topic.id, editStanceLabel.trim()),
    });

    setIsInlineEditing(false);
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

            {/* Quick Action Buttons (Edit / Add) in Title Area */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {stance ? (
                <>
                  <button
                    type="button"
                    id={`edit-stance-header-btn-${topic.id}`}
                    onClick={() => {
                      if (onOpenEditStance) {
                        onOpenEditStance(topic.id, mpId, stance);
                      } else {
                        setIsInlineEditing(!isInlineEditing);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-2xs transition-all hover:scale-105 cursor-pointer"
                    title="Bu vekilin demecini veya tutanağını düzeltin / güncelleyin"
                  >
                    <Edit3 className="w-3 h-3 text-indigo-600 stroke-[2.2]" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAddStance ? onOpenAddStance(topic.id, mpId) : null}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer"
                    title="Yeni bir demeç önerisi de ekleyin"
                  >
                    <Plus className="w-3 h-3 text-slate-600 stroke-[2.2]" />
                    <span>Yeni Ekle</span>
                  </button>
                </>
              ) : (
                onOpenAddStance && (
                  <button
                    type="button"
                    id={`add-speech-btn-${topic.id}`}
                    onClick={() => onOpenAddStance(topic.id, mpId)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-2xs transition-all hover:scale-105 cursor-pointer"
                    title={`"${topic.title}" konusunda bu vekil için yeni demeç veya tutanak ekle`}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Demeç / Tutanak Ekle</span>
                  </button>
                )
              )}
            </div>

            {stance && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${tagColor}`}>
                {stance.stanceLabel || stance.stanceTag}
              </span>
            )}

            {isCustomEdited && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>Özel Düzenlenmiş</span>
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
            {/* STANCE EDIT ACTION BAR (DÜZENLE ÇUBUĞU) */}
            <div 
              id={`stance-edit-bar-${topic.id}`}
              className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 font-bold text-indigo-950">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Demeç & Tutanak Kaydı</span>
                </span>
                {stance.lastUpdated && (
                  <span className="text-[11px] text-slate-500 font-normal">
                    • {stance.lastUpdated}
                  </span>
                )}
              </div>

              {/* Action Toolbar buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id={`inline-edit-toggle-${topic.id}`}
                  onClick={() => setIsInlineEditing(!isInlineEditing)}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isInlineEditing 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                  }`}
                  title="Sayfadan ayrılmadan doğrudan burada hızlıca düzeltin"
                >
                  <PencilLine className="w-3 h-3" />
                  <span>{isInlineEditing ? 'Hızlı Düzenlemeyi Kapat' : 'Hemen Düzenle'}</span>
                </button>

                {onOpenEditStance && (
                  <button
                    type="button"
                    id={`modal-edit-btn-${topic.id}`}
                    onClick={() => onOpenEditStance(topic.id, mpId, stance)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer"
                    title="Detaylı Düzenleme Penceresini Aç"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Tam Pencerede Aç</span>
                  </button>
                )}

                {isCustomEdited && onRevertStance && (
                  <button
                    type="button"
                    onClick={() => onRevertStance(mpId!, topic.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    title="Bu demeci sıfırlayıp varsayılana döndür"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Sıfırla</span>
                  </button>
                )}
              </div>
            </div>

            {/* INLINE EDIT FORM (When user clicks 'Hemen Düzenle') */}
            {isInlineEditing ? (
              <form 
                id={`inline-edit-form-${topic.id}`}
                onSubmit={handleSaveInlineEdit} 
                className="p-4 rounded-xl bg-indigo-50/90 border-2 border-indigo-300 space-y-3.5 animate-fadeIn shadow-inner"
              >
                <div className="flex items-center justify-between pb-1 border-b border-indigo-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                    <Edit3 className="w-4 h-4 text-indigo-600" />
                    <span>Demeç ve Tutanak Bilgilerini Düzelt</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsInlineEditing(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. Stance Tag Selector */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tutum / Duruş Türü
                      </label>
                      <select
                        value={editStanceTag}
                        onChange={(e) => {
                          const newTag = e.target.value as StanceTag;
                          setEditStanceTag(newTag);
                          if (!editStanceLabel || editStanceLabel.trim() === '') {
                            setEditStanceLabel(resolveDefaultStanceLabel(newTag, topic.id));
                          }
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500"
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
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Kısa Rozet Metni (İsteğe Bağlı)
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: Saygıyla Andı / Eleştirdi / Açıklama Yaptı"
                        value={editStanceLabel}
                        onChange={(e) => setEditStanceLabel(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Smart Quick Preset Chips */}
                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Bu konu için hazır etiketler (tıklayarak seçin):</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {getQuickPresetChips(topic.id).map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setEditStanceTag(chip.tag);
                            setEditStanceLabel(chip.badge);
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                            editStanceLabel === chip.badge
                              ? 'bg-indigo-100 text-indigo-900 border-indigo-400 font-semibold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Direct Quote Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Vekilin Ağzından Birebir Alıntı / Demeç Cümlesi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 'Bu kanun tasarısının derhal geri çekilmesi şarttır.'"
                    value={editQuote}
                    onChange={(e) => setEditQuote(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white font-serif focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* 3. Source URL & Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Kaynak URL Bağlantısı (TBMM / Haber / Video) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://tbmm.gov.tr/... veya https://..."
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Kuruluş / Tutanak Kaynağı
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: TBMM Genel Kurul Tutanağı, X Yayını"
                      value={editPlatform}
                      onChange={(e) => setEditPlatform(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                {/* 4. Overall Summary */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tarafsız Tutanak Özeti (İsteğe Bağlı)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Vekilin tavrının kısa genel açıklaması..."
                    value={editSummary}
                    onChange={(e) => setEditSummary(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white resize-none"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-indigo-200">
                  <button
                    type="button"
                    onClick={() => setIsInlineEditing(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200/70 rounded-lg cursor-pointer"
                  >
                    İptal
                  </button>

                  <div className="flex items-center gap-2">
                    {onOpenEditStance && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsInlineEditing(false);
                          onOpenEditStance(topic.id, mpId, stance);
                        }}
                        className="px-3 py-1.5 text-xs text-indigo-700 hover:bg-indigo-100 rounded-lg border border-indigo-200 font-semibold cursor-pointer"
                      >
                        Tam Pencereye Geç
                      </button>
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Kaydet ve Canlıya Al</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                {/* Neutral Paraphrased Summary */}
                <div className="space-y-1.5">
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
              </>
            )}

            {/* Verified Sources Container */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden text-xs">
              <div className="w-full px-3.5 py-2.5 bg-slate-50 flex items-center justify-between text-slate-700 font-medium transition-colors">
                <button
                  type="button"
                  onClick={() => setSourcesOpen(!sourcesOpen)}
                  className="flex items-center gap-1.5 font-semibold text-slate-800 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Güvenilir Kaynaklar ({allSources.length})</span>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px] ml-1">
                    {sourcesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {mpId && onAddCustomSource && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingSource(!isAddingSource);
                      setSourcesOpen(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 px-2 py-1 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Kaynak Ekle</span>
                  </button>
                )}
              </div>

              {/* Inline Add Source Form */}
              {isAddingSource && (
                <form onSubmit={handleSaveCustomSource} className="p-3 bg-indigo-50/50 border-t border-indigo-100 space-y-2.5">
                  <div className="flex items-center justify-between text-indigo-900 font-bold text-xs">
                    <span className="flex items-center gap-1">
                      <LinkIcon className="w-3.5 h-3.5 text-indigo-600" />
                      Doğrulanabilir Güvenilir Kaynak Ekle
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingSource(false)}
                      className="text-slate-400 hover:text-slate-600 text-[11px] cursor-pointer"
                    >
                      Vazgeç
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Platform / Basın Kuruluşu *</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: TBMM Tutanakları, Resmi X Hesabı, Habertürk TV"
                        value={newSourcePlatform}
                        onChange={(e) => setNewSourcePlatform(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Kaynak URL Bağlantısı *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://tbmm.gov.tr/... veya https://x.com/..."
                        value={newSourceUrl}
                        onChange={(e) => setNewSourceUrl(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Kaynak Türü</label>
                      <select
                        value={newSourceType}
                        onChange={(e) => setNewSourceType(e.target.value as any)}
                        className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="news">Haber / Tutanak Metni</option>
                        <option value="tweet">Resmi Tweet / Sosyal Medya</option>
                        <option value="tv">TV Programı / Konuşma Kaydı</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Tarih / Dönem</label>
                      <input
                        type="text"
                        placeholder="Örn: Ekim 2024 veya 28.10.2024"
                        value={newSourceDate}
                        onChange={(e) => setNewSourceDate(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Kısa Özet / Doğrulama Notu</label>
                    <textarea
                      rows={2}
                      placeholder="Bu kaynaktaki açıklamanın veya beyanın kısa içeriği..."
                      value={newSourceSummary}
                      onChange={(e) => setNewSourceSummary(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingSource(false)}
                      className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-slate-200/60 text-xs cursor-pointer"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Kaydet ve Listeye Ekle</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Source List */}
              {sourcesOpen && (
                <div className="p-3 bg-white space-y-2 divide-y divide-slate-100 border-t border-slate-100">
                  {allSources.length === 0 ? (
                    <div className="text-center py-3 text-slate-400 text-xs">
                      Bu tutum için henüz eklenmiş güvenilir kaynak bağlantısı bulunmuyor. Yukarıdaki "Kaynak Ekle" butonu ile ekleyebilirsiniz.
                    </div>
                  ) : (
                    allSources.map((source: SourceItem) => {
                      const isCustom = source.id.startsWith('src-usr-');
                      return (
                        <div key={source.id} className="pt-2 first:pt-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                              {source.sourceType === 'tweet' && <MessageSquare className="w-3.5 h-3.5 text-sky-500" />}
                              {source.sourceType === 'tv' && <Tv className="w-3.5 h-3.5 text-rose-500" />}
                              {source.sourceType === 'news' && <FileText className="w-3.5 h-3.5 text-slate-600" />}
                              <span>{source.outletOrPlatform}</span>
                              {isCustom && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                                  Kullanıcı Kaynağı
                                </span>
                              )}
                              {source.timestampInVideo && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-mono font-bold">
                                  ⏱️ {source.timestampInVideo}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400">{source.publishDate}</span>
                              {isCustom && mpId && onRemoveCustomSource && (
                                <button
                                  type="button"
                                  onClick={() => onRemoveCustomSource(mpId, topic.id, source.id)}
                                  className="text-rose-500 hover:text-rose-700 p-0.5 rounded hover:bg-rose-50 cursor-pointer"
                                  title="Bu kaynağı sil"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
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
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
              Bu milletvekilinin <strong>"{topic.title}"</strong> başlığında henüz arşivlenmiş açık bir tutanak beyanı bulunmuyor. Genel parti çizgisine göre puan verebilir veya vekilin bilinen bir demecini ekleyebilirsiniz.
            </p>
            {onOpenAddStance && (
              <button
                type="button"
                onClick={() => onOpenAddStance(topic.id, mpId)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ Bu Vekile Demeç / Tutanak Ekle</span>
              </button>
            )}
          </div>
        )}

        {/* COMBINED CONTROLS AREA: PER-MP IMPORTANCE (TOP) & MP STANCE SCORING (BOTTOM) */}
        <div className="pt-3 border-t border-slate-200/80 space-y-3">
          
          {/* 1. TOP: Vekile Özel Konu Ağırlığı & Önem Derecesi Ayarı */}
          {onQuickChangeImportance && (
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-bold text-slate-900">
                    {mpName ? `${mpName} İçin Konu Önemi:` : 'Bu Konunun Önemi:'}
                  </span>
                  {isMpCustomImportance && (
                    <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-semibold border border-amber-300">
                      Vekile Özel
                    </span>
                  )}
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${importanceBadge.color}`}>
                  {importanceBadge.text}
                </span>
              </div>

              {/* Interactive Importance Radio Selector (0 - 10) */}
              <div className="space-y-1 pt-1">
                <div className="grid grid-cols-11 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                    const isSelected = userImportance === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onQuickChangeImportance(val)}
                        className={`h-8 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-xs scale-105 ring-2 ring-amber-400'
                            : 'bg-white hover:bg-amber-100/70 text-slate-700 border border-amber-200/80 hover:border-amber-300'
                        }`}
                        title={`Öncelik: %${val * 10}`}
                      >
                        <span>{val}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium px-0.5">
                  <span>0: Önemsiz / Etkisiz (%0)</span>
                  <span>5: Standart (%50)</span>
                  <span>10: En Kritik (%100)</span>
                </div>
              </div>

              {userImportance === 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-100/70 p-1.5 rounded-lg border border-amber-300/60">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
                  <span>Önem %0: Bu konu genel uyum puanı hesabında dikkate alınmaz.</span>
                </div>
              )}
            </div>
          )}

          {/* 2. BOTTOM: Milletvekili Tutumuna 0-10 Puan Verme */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">
                  {mpName ? `${mpName} Tutumuna Puanınız:` : 'Tutum Puanınız:'}
                </span>
                {isScored ? (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentScore} / 10
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">
                    (Henüz puanlanmadı)
                  </span>
                )}
              </div>

              {/* Unscore Button / Semantic Feedback */}
              <div className="flex items-center gap-1.5">
                {scoreInfo && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${scoreInfo.toneColor}`}>
                    {scoreInfo.label}
                  </span>
                )}
                {isScored && (
                  <button
                    type="button"
                    onClick={() => onSetScore(undefined)}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800 font-medium px-2 py-0.5 rounded hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    title="Puanı kaldır"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Puanı Kaldır</span>
                  </button>
                )}
              </div>
            </div>

            {/* 11 Buttons for Discrete 0-10 Scoring */}
            <div className="grid grid-cols-11 gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scoreVal) => {
                const isSelected = isScored && currentScore === scoreVal;
                let btnClass = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200';
                if (isSelected) {
                  if (scoreVal >= 8) btnClass = 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-xs ring-2 ring-emerald-300';
                  else if (scoreVal >= 5) btnClass = 'bg-amber-500 text-white font-bold border-amber-600 shadow-xs ring-2 ring-amber-300';
                  else btnClass = 'bg-rose-600 text-white font-bold border-rose-700 shadow-xs ring-2 ring-rose-300';
                }

                return (
                  <button
                    key={scoreVal}
                    type="button"
                    id={`score-btn-${topic.id}-${scoreVal}`}
                    onClick={() => handleScoreClick(scoreVal)}
                    className={`h-8 sm:h-9 rounded-lg text-xs sm:text-sm flex items-center justify-center font-mono border transition-all cursor-pointer ${btnClass}`}
                    title={isSelected ? `${scoreVal} Puanı seçili (Tekrar tıklayarak kaldırabilirsiniz)` : `${scoreVal} Puan Ver`}
                  >
                    {scoreVal}
                  </button>
                );
              })}
            </div>

            {/* Qualitative semantic helpers below bar */}
            <div className="flex justify-between text-[10px] text-slate-400 px-0.5 font-medium">
              <span>0 = Tamamen Zıt</span>
              <span className="text-[10px] text-slate-500 italic hidden sm:inline">Seçili puana tekrar tıklayarak kaldırabilirsiniz</span>
              <span>10 = Tamamen Uyumlu</span>
            </div>

            {/* Live Mathematical Formula Contribution Chip */}
            {isScored && (
              <div className="mt-1.5 p-2 rounded-lg bg-slate-900 text-slate-200 text-[11px] font-mono flex flex-wrap items-center justify-between gap-1.5 shadow-inner">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-sans font-medium">Katkı:</span>
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
