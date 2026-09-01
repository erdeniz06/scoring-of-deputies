import React, { useState } from 'react';
import { X, Send, ShieldCheck, Link2, User, BookOpen, AlertCircle, CheckCircle2, Quote } from 'lucide-react';
import { MP, Topic, ContributionType } from '../types';
import { addProposal } from '../utils/storage';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
  initialMp?: MP;
  initialTopic?: Topic;
  allMps: MP[];
  allTopics: Topic[];
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
  initialMp,
  initialTopic,
  allMps,
  allTopics,
}) => {
  const [type, setType] = useState<ContributionType>('stance_update');
  const [selectedMpId, setSelectedMpId] = useState<string>(initialMp?.id || allMps[0]?.id || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopic?.id || allTopics[0]?.id || '');
  
  // Custom new MP / Topic fields
  const [customMpName, setCustomMpName] = useState('');
  const [customMpParty, setCustomMpParty] = useState('chp');
  const [customMpProvince, setCustomMpProvince] = useState('');
  const [customTopicTitle, setCustomTopicTitle] = useState('');
  const [customTopicDesc, setCustomTopicDesc] = useState('');

  // Stance Details
  const [stanceTag, setStanceTag] = useState('karsi_cikti');
  const [stanceLabel, setStanceLabel] = useState('Karşı Çıktı');
  const [overallSummary, setOverallSummary] = useState('');
  const [keyParaphrasedQuote, setKeyParaphrasedQuote] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('TBMM Tutanakları');
  const [sourceSummary, setSourceSummary] = useState('');

  // Submitter info
  const [submitterName, setSubmitterName] = useState('');
  const [submitterNote, setSubmitterNote] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentMp = allMps.find((m) => m.id === selectedMpId) || initialMp;
  const currentTopic = allTopics.find((t) => t.id === selectedTopicId) || initialTopic;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const finalSubmitter = submitterName.trim() || 'Gönüllü Katılımcı';

    if (type === 'stance_update' || type === 'source_link') {
      if (!sourceUrl.trim()) {
        setErrorMsg('Lütfen geçerli bir TBMM tutanağı, haber veya video kaynak linki (URL) ekleyin.');
        return;
      }
      if (!keyParaphrasedQuote.trim() && type === 'stance_update') {
        setErrorMsg('Lütfen vekilin söylediği veya tutanakta geçen alıntı cümlesini ekleyin.');
        return;
      }
    }

    const defaultLabel = stanceLabel.trim() || (
      stanceTag === 'destekledi' || stanceTag === 'savundu' ? 'Savundu / Kabul Oyu Verdi' :
      stanceTag === 'karsi_cikti' ? 'Karşı Çıktı / Ret Oyu Verdi' :
      stanceTag === 'elestirdi' ? 'Eleştirdi' :
      stanceTag === 'kanun_teklifi' ? 'Kanun Teklifi / Önerge Verdi' : 'Tutum Bildirdi'
    );

    const finalSummary = overallSummary.trim() || (
      keyParaphrasedQuote.trim()
        ? `"${keyParaphrasedQuote.trim()}"`
        : 'Tutanak ve beyan kaydı.'
    );

    let extractedPlatform = sourcePlatform.trim();
    if (!extractedPlatform && sourceUrl.trim()) {
      try {
        const urlObj = new URL(sourceUrl.trim());
        extractedPlatform = urlObj.hostname.replace('www.', '');
      } catch {
        extractedPlatform = 'Web Kaynağı';
      }
    }
    if (!extractedPlatform) extractedPlatform = 'TBMM Tutanak Kaydı';

    try {
      addProposal({
        type,
        submitterName: finalSubmitter,
        submitterNote: submitterNote.trim() || 'Kullanıcı tutanak katkısı.',
        mpId: type === 'new_mp' ? undefined : (currentMp?.id || selectedMpId),
        mpName: type === 'new_mp' ? customMpName : currentMp?.fullName,
        topicId: type === 'new_topic' ? undefined : (currentTopic?.id || selectedTopicId),
        topicTitle: type === 'new_topic' ? customTopicTitle : currentTopic?.title,
        stanceTag,
        stanceLabel: defaultLabel,
        overallSummary: finalSummary,
        keyParaphrasedQuote: keyParaphrasedQuote.trim(),
        sourceUrl: sourceUrl.trim(),
        sourcePlatform: extractedPlatform,
        sourceSummary: sourceSummary.trim() || 'Doğrulanabilir kaynak bağlantısı.',
      });

      setIsSuccess(true);
      if (onSubmitted) onSubmitted();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2200);
    } catch (err) {
      setErrorMsg('Öneri kaydedilirken bir hata oluştu: ' + (err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="contribution-modal-card"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-700 to-red-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-red-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Topluluk Katkısı & Kaynak Önerisi</h2>
              <p className="text-xs text-red-100">
                Öneriler kurucu hakem heyeti tarafından denetlenip onaylandıktan sonra canlıya alınır.
              </p>
            </div>
          </div>
          <button
            id="close-contribution-modal-btn"
            onClick={onClose}
            className="p-2 text-red-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Öneriniz Hakem Heyetine İletildi!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Katkınız için teşekkürler. Güvenilir hakemlerimiz TBMM tutanağı ve kaynak linkini inceleyip onayladığında sistemde herkese açık olarak yayınlanacaktır.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto grow">
            {errorMsg && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-sm text-red-700 dark:text-red-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Contribution Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Öneri Türü
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="type-btn-stance"
                  onClick={() => setType('stance_update')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    type === 'stance_update'
                      ? 'bg-red-50 border-red-600 text-red-700 dark:bg-red-950/40 dark:border-red-500 dark:text-red-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Mevcut Tutum / Konu Güncellemesi
                </button>
                <button
                  type="button"
                  id="type-btn-source"
                  onClick={() => setType('source_link')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    type === 'source_link'
                      ? 'bg-red-50 border-red-600 text-red-700 dark:bg-red-950/40 dark:border-red-500 dark:text-red-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Yeni Kaynak / Tutanak Linki Ekle
                </button>
                <button
                  type="button"
                  id="type-btn-new-mp"
                  onClick={() => setType('new_mp')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    type === 'new_mp'
                      ? 'bg-red-50 border-red-600 text-red-700 dark:bg-red-950/40 dark:border-red-500 dark:text-red-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  Yeni Milletvekili Öner
                </button>
              </div>
            </div>

            {/* Target MP & Topic Selection */}
            {type !== 'new_mp' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Milletvekili
                  </label>
                  <select
                    id="select-mp-input"
                    value={selectedMpId}
                    onChange={(e) => setSelectedMpId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  >
                    {allMps.map((mp) => (
                      <option key={mp.id} value={mp.id}>
                        {mp.fullName} ({mp.partyId.toUpperCase()} - {mp.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    İlgili Konu / Gündem Maddesi
                  </label>
                  <select
                    id="select-topic-input"
                    value={selectedTopicId}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  >
                    {allTopics.map((top) => (
                      <option key={top.id} value={top.id}>
                        {top.title} {top.partyScope ? `(${top.partyScopeLabel || top.partyScope.toUpperCase()})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Vekil Adı Soyadı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ali Öztunç"
                    value={customMpName}
                    onChange={(e) => setCustomMpName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Parti</label>
                  <select
                    value={customMpParty}
                    onChange={(e) => setCustomMpParty(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  >
                    <option value="chp">CHP</option>
                    <option value="akp">AK Parti</option>
                    <option value="iyi">İYİ Parti</option>
                    <option value="mhp">MHP</option>
                    <option value="dem">DEM Parti</option>
                    <option value="tip">TİP</option>
                    <option value="bagimsiz">Bağımsız</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Seçim Çevresi / İl</label>
                  <input
                    type="text"
                    placeholder="Örn: Kahramanmaraş"
                    value={customMpProvince}
                    onChange={(e) => setCustomMpProvince(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}

            {/* Stance Tag & Label */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Önerilen Tutum Kategorisi
                </label>
                <select
                  id="select-stance-tag"
                  value={stanceTag}
                  onChange={(e) => {
                    setStanceTag(e.target.value);
                    const labels: Record<string, string> = {
                      savundu: 'Aktif Savundu',
                      karsi_cikti: 'Karşı Çıktı / Ret Oyu Verdi',
                      kanun_teklifi: 'Kanun Teklifi / Önerge Verdi',
                      serh_koydu: 'Şerh Koydu / Kısmi İtiraz Etti',
                      elestirdi: 'Eleştirdi',
                      notr_cekimser: 'Nötr / Çekimser Kaldı',
                    };
                    setStanceLabel(labels[e.target.value] || 'Görüş Belirtti');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                >
                  <option value="savundu">Savundu (Kabul / Destek)</option>
                  <option value="karsi_cikti">Karşı Çıktı (Ret Oyu / İtiraz)</option>
                  <option value="kanun_teklifi">Kanun Teklifi / Önerge Verdi</option>
                  <option value="serh_koydu">Şerh Koydu (Kısmi Karşıtlık)</option>
                  <option value="elestirdi">Eleştirdi</option>
                  <option value="notr_cekimser">Nötr / Çekimser</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tutum Kısa Başlığı (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Komisyonda Ret Oyu Verdi"
                  value={stanceLabel}
                  onChange={(e) => setStanceLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* 1. REQUIRED: Source URL */}
            <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Kaynak URL Bağlantısı</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">Zorunlu *</span>
                </label>
                <span className="text-[11px] text-slate-500">TBMM Tutanak, Haber, X veya Video</span>
              </div>
              <input
                type="url"
                required
                placeholder="https://www.tbmm.gov.tr/... veya haber/video linki"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-600 rounded-lg text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>

            {/* 2. REQUIRED: Key Quote */}
            <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Vekilin Demeç / Tutanak Alıntı Cümlesi</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">Zorunlu *</span>
                </label>
                <span className="text-[11px] text-slate-500">Tutanak alıntısı</span>
              </div>
              <input
                type="text"
                required
                placeholder="Örn: 'Bu teklif milletimizin adalet duygusuna aykırıdır.'"
                value={keyParaphrasedQuote}
                onChange={(e) => setKeyParaphrasedQuote(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-600 rounded-lg text-sm text-slate-900 dark:text-white font-serif italic"
              />
            </div>

            {/* Optional Summary & Platform */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ek Açıklamalar (İsteğe Bağlı)</span>
                <span className="text-[10px] text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Opsiyonel</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tutum Açıklaması ve Özeti (Boş bırakılırsa alıntıdan oluşturulur)
                </label>
                <textarea
                  rows={2}
                  placeholder="Milletvekilinin tutumunun özeti (isteğe bağlı)..."
                  value={overallSummary}
                  onChange={(e) => setOverallSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Yayın / Platform Adı (İsteğe Bağlı)
                  </label>
                  <input
                    type="text"
                    placeholder="TBMM Tutanakları / X / Basın"
                    value={sourcePlatform}
                    onChange={(e) => setSourcePlatform(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Adınız / Raportör İsmi (İsteğe Bağlı)
                  </label>
                  <input
                    type="text"
                    placeholder="Gönüllü Katılımcı"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hakem Heyetine Ek Not
                </label>
                <input
                  type="text"
                  placeholder="Tutanak sayfası 14, 2. oturum..."
                  value={submitterNote}
                  onChange={(e) => setSubmitterNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                id="submit-proposal-btn"
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Öneriyi Hakem Heyetine Gönder
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
