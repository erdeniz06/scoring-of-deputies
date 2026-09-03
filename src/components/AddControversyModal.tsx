import React, { useState, useEffect } from 'react';
import { MP, ControversyItem, ControversyCategory, ControversyStatus, ControversySource } from '../types';
import { CONTROVERSY_CATEGORIES, CONTROVERSY_STATUSES } from '../data/controversies';
import { X, Plus, Trash2, AlertTriangle, Scale, ShieldAlert, Link as LinkIcon, FileText } from 'lucide-react';

interface AddControversyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mp: MP;
  editingControversy?: ControversyItem | null;
  onSave: (data: Omit<ControversyItem, 'id'>, editId?: string) => void;
}

export const AddControversyModal: React.FC<AddControversyModalProps> = ({
  isOpen,
  onClose,
  mp,
  editingControversy,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ControversyCategory>('yargi_fezleke');
  const [severity, setSeverity] = useState<'dusuk' | 'orta' | 'yuksek'>('orta');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const [mpResponse, setMpResponse] = useState('');
  const [status, setStatus] = useState<ControversyStatus>('kamuoyu_tartismasi');
  
  // Sources
  const [sources, setSources] = useState<ControversySource[]>([
    { title: '', url: '', outlet: '', date: '' },
  ]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingControversy) {
      setTitle(editingControversy.title);
      setCategory(editingControversy.category);
      setSeverity(editingControversy.severity);
      setDate(editingControversy.date);
      setSummary(editingControversy.summary);
      setMpResponse(editingControversy.mpResponse || '');
      setStatus(editingControversy.status);
      setSources(
        editingControversy.sources && editingControversy.sources.length > 0
          ? editingControversy.sources
          : [{ title: '', url: '', outlet: '', date: '' }]
      );
    } else {
      setTitle('');
      setCategory('yargi_fezleke');
      setSeverity('orta');
      setDate(new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }));
      setSummary('');
      setMpResponse('');
      setStatus('kamuoyu_tartismasi');
      setSources([{ title: '', url: '', outlet: '', date: '' }]);
    }
    setError(null);
  }, [editingControversy, isOpen]);

  if (!isOpen) return null;

  const handleAddSourceRow = () => {
    setSources([...sources, { title: '', url: '', outlet: '', date: '' }]);
  };

  const handleRemoveSourceRow = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSourceChange = (index: number, field: keyof ControversySource, value: string) => {
    const updated = [...sources];
    updated[index] = { ...updated[index], [field]: value };
    setSources(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Lütfen iddia / olay başlığı girin.');
      return;
    }
    if (!summary.trim()) {
      setError('Lütfen olayın veya iddianın tarafsız bir özetini yazın.');
      return;
    }

    // Filter valid sources
    const validSources = sources.filter((s) => s.url.trim().length > 0 || s.title.trim().length > 0);

    onSave(
      {
        mpId: mp.id,
        title: title.trim(),
        category,
        severity,
        date: date.trim() || new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
        summary: summary.trim(),
        mpResponse: mpResponse.trim() || undefined,
        status,
        sources: validSources,
      },
      editingControversy ? editingControversy.id : undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900 shadow-2xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                {editingControversy ? 'İddia / Fezleke Kaydını Düzenle' : 'Yeni İddia / Fezleke / Dosya Ekle'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Milletvekili: <strong className="text-slate-700 dark:text-slate-200">{mp.fullName}</strong> ({mp.province})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Principle Info Box */}
          <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Objektiflik ve Masumiyet Karinesi:</strong> İddiaların doğrulanabilir haber kaynaklarına veya resmi TBMM / yargı fezlekelerine dayanması esastır. Milletvekilinin açıklaması, savunması veya tekzibi varsa mutlaka eklenmelidir.
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              İddia / Fezleke / Dosya Başlığı <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: TBMM Genel Kurulu Dokunulmazlık Fezlekesi, İhale İddiası veya Yargı Süreci..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium"
              required
            />
          </div>

          {/* Category & Severity & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ControversyCategory)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-red-500"
              >
                {Object.entries(CONTROVERSY_CATEGORIES).map(([catKey, catVal]) => (
                  <option key={catKey} value={catKey}>
                    {catVal.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Etki / Önem Derecesi
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as 'dusuk' | 'orta' | 'yuksek')}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-red-500"
              >
                <option value="yuksek">Yüksek (Ağır İddia / Hapis / Fezleke)</option>
                <option value="orta">Orta (Tartışma / Soruşturma / İhraç)</option>
                <option value="dusuk">Düşük (Sözlü Polemik / Basın İddiası)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Tarih / Dönem
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Örn: Ekim 2023"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              Mevcut Durum / Hukuki Süreç
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ControversyStatus)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-red-500"
            >
              {Object.entries(CONTROVERSY_STATUSES).map(([stKey, stVal]) => (
                <option key={stKey} value={stKey}>
                  {stVal.label}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              Olay / İddia Özeti (Tarafsız Açıklama) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Olayın ne zaman, nerede, nasıl gerçekleştiği veya iddianın içeriği..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 leading-relaxed"
              required
            />
          </div>

          {/* MP Response / Defense */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              Milletvekilinin Açıklaması / Savunması / Tekzibi
            </label>
            <textarea
              rows={2}
              value={mpResponse}
              onChange={(e) => setMpResponse(e.target.value)}
              placeholder="Vekilin iddiaya verdiği resmi yanıt, basın açıklaması veya savunması..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 leading-relaxed"
            />
          </div>

          {/* Sources List */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                Haber & Belge Kaynakları
              </label>
              <button
                type="button"
                onClick={handleAddSourceRow}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 dark:text-red-400"
              >
                <Plus className="w-3 h-3" />
                + Kaynak Ekle
              </button>
            </div>

            {sources.map((src, index) => (
              <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={src.title}
                    onChange={(e) => handleSourceChange(index, 'title', e.target.value)}
                    placeholder="Haber / Tutanak Başlığı (örn: BBC Türkçe İnceleme)"
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                  <input
                    type="text"
                    value={src.outlet}
                    onChange={(e) => handleSourceChange(index, 'outlet', e.target.value)}
                    placeholder="Yayın / Kurum (örn: TBMM / Sözcü)"
                    className="w-36 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                  {sources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSourceRow(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Kaynağı kaldır"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  value={src.url}
                  onChange={(e) => handleSourceChange(index, 'url', e.target.value)}
                  placeholder="https://www.ornek.com/haber-linki"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>{editingControversy ? 'Değişiklikleri Kaydet' : 'İddia / Fezlekeyi Kaydet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
