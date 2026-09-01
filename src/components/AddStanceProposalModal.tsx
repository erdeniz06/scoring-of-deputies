import React, { useState, useEffect } from 'react';
import { MP, StanceTag, Topic } from '../types';
import { AppUserRole, addDirectlyApprovedFounderProposal, addProposal } from '../utils/storage';
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
  Info
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
  onProposalSubmitted: (isDirectlyApproved: boolean, mpId: string, topicId: string) => void;
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
  onProposalSubmitted,
}) => {
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

  useEffect(() => {
    if (isOpen) {
      if (initialMpId) setSelectedMpId(initialMpId);
      else if (!selectedMpId && allMps.length > 0) setSelectedMpId(allMps[0].id);

      if (initialTopicId) setSelectedTopicId(initialTopicId);
      else if (!selectedTopicId && allTopics.length > 0) setSelectedTopicId(allTopics[0].id);

      setSubmitterName(userRole === 'founder' ? 'Erdeniz Taşlıçukur (Kurucu)' : 'Gönüllü Tutanak Denetçisi');
    }
  }, [isOpen, initialMpId, initialTopicId, userRole, allMps, allTopics]);

  if (!isOpen) return null;

  const currentMp = allMps.find((m) => m.id === selectedMpId);
  const currentTopic = allTopics.find((t) => t.id === selectedTopicId);

  // Filtered MPs for select dropdown
  const filteredMps = mpSearch.trim() === ''
    ? allMps.slice(0, 50)
    : allMps.filter((m) => 
        m.fullName.toLowerCase().includes(mpSearch.toLowerCase()) ||
        m.province.toLowerCase().includes(mpSearch.toLowerCase()) ||
        m.partyId.toLowerCase().includes(mpSearch.toLowerCase())
      ).slice(0, 50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMpId || !selectedTopicId) return;

    const mpName = currentMp?.fullName || 'Milletvekili';
    const topicTitle = currentTopic?.title || 'Konu Başlığı';

    const defaultLabel = stanceLabel.trim() || (
      stanceTag === 'destekledi' ? 'Destekledi / Kabul Oyu Verdi' :
      stanceTag === 'karsi_cikti' ? 'Karşı Çıktı / Ret Oyu Verdi' :
      stanceTag === 'elestirdi' ? 'Sert Şekilde Eleştirdi' :
      stanceTag === 'savundu' ? 'Kürsüde Savundu' :
      stanceTag === 'kanun_teklifi' ? 'Kanun Teklifi Verdi' : 'Çekimser / Nötr Kaldı'
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
        submitterNote: submitterNote.trim() || 'Kurucu tarafından doğrudan sisteme işlendi.',
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
        submitterNote: submitterNote.trim() || 'Kullanıcı tarafından tutanak incelenerek gönderildi.',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        id="add-stance-modal"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Plus className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif tracking-tight flex items-center gap-2">
                <span>Yeni Demeç & Tutanak Ekle</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-sans font-normal">
                  + Katkı Modülü
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Milletvekilinin meclis konuşması, oylama tutanağı veya basın demecini işleyin
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MP Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                İlgili Milletvekili
              </label>
              {initialMpId ? (
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>{currentMp?.fullName} ({currentMp?.partyId.toUpperCase()} • {currentMp?.province})</span>
                  <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border">Seçili</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <input 
                    type="text"
                    placeholder="İsim, il veya parti ara..."
                    value={mpSearch}
                    onChange={(e) => setMpSearch(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                  <select
                    value={selectedMpId}
                    onChange={(e) => setSelectedMpId(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                  >
                    {filteredMps.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.fullName} ({m.partyId.toUpperCase()} - {m.province})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Konu Başlığı
              </label>
              {initialTopicId ? (
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span className="truncate pr-2">{currentTopic?.title}</span>
                  <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border flex-shrink-0">Seçili</span>
                </div>
              ) : (
                <select
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                >
                  {allTopics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tutum Kategorisi (İsteğe Bağlı)
                </label>
                <select
                  value={stanceTag}
                  onChange={(e) => setStanceTag(e.target.value as StanceTag)}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="destekledi">🟢 Destekledi / Kabul Oyu Verdi</option>
                  <option value="savundu">🟢 Meclis Kürsüsünde Savundu</option>
                  <option value="karsi_cikti">🔴 Karşı Çıktı / Ret Oyu Verdi</option>
                  <option value="elestirdi">🔴 Sert Şekilde Eleştirdi</option>
                  <option value="kanun_teklifi">🔵 Kanun Teklifi / Önerge Verdi</option>
                  <option value="serh_koydu">🟡 Şerh Koydu / Çekimser Kaldı</option>
                  <option value="notr_cekimser">⚪ Nötr / Sessiz Kaldı</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kısa Başlık / Etiket (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Meclis Kürsüsünde Çözüm Vurgusu Yaptı"
                  value={stanceLabel}
                  onChange={(e) => setStanceLabel(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Optional Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tutanak Özeti / Açıklama (İsteğe Bağlı - boş bırakılırsa alıntıdan üretilir)
              </label>
              <textarea
                rows={2}
                placeholder="Vekilin Genel Kurul'daki tavrının kısa özeti (isteğe bağlı)..."
                value={overallSummary}
                onChange={(e) => setOverallSummary(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Platform & Submitter Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kuruluş / Platform Adı (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  placeholder="Örn: TBMM Tutanak Dergisi, TV Yayını, X Hesabı"
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
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                userRole === 'founder'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/40'
                  : 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/40'
              }`}
            >
              {userRole === 'founder' ? (
                <>
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>👑 Doğrudan Canlıya Al & Yayınla</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-200" />
                  <span>🛡️ Hakem Denetimine Gönder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
