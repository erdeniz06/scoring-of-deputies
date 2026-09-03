import React, { useState } from 'react';
import { MP, ControversyItem, ControversyCategory } from '../types';
import { CONTROVERSY_CATEGORIES } from '../data/controversies';
import { ControversyCard } from './ControversyCard';
import { AddControversyModal } from './AddControversyModal';
import { 
  ShieldAlert, 
  Plus, 
  Search, 
  Filter, 
  Scale, 
  FileCheck2, 
  AlertCircle,
  X,
  Info
} from 'lucide-react';

interface MpControversiesSectionProps {
  mp: MP;
  controversies: ControversyItem[];
  onAddControversy: (data: Omit<ControversyItem, 'id'>) => void;
  onUpdateControversy: (id: string, updated: Partial<ControversyItem>) => void;
  onDeleteControversy: (id: string) => void;
}

export const MpControversiesSection: React.FC<MpControversiesSectionProps> = ({
  mp,
  controversies,
  onAddControversy,
  onUpdateControversy,
  onDeleteControversy,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ControversyItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mpControversies = controversies.filter((c) => c.mpId === mp.id);

  // Filtered list
  const filteredList = mpControversies.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchResponse = item.mpResponse && item.mpResponse.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchResponse) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ControversyItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveModal = (data: Omit<ControversyItem, 'id'>, editId?: string) => {
    if (editId) {
      onUpdateControversy(editId, data);
    } else {
      onAddControversy(data);
    }
  };

  const fezlekeCount = mpControversies.filter((c) => c.status === 'fezleke_mecliste' || c.category === 'yargi_fezleke').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Action & Stat Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                İddialar, Skandallar ve Fezleke Dosyaları
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mp.fullName} hakkında basına, yargıya veya TBMM kayıtlarına yansımış tartışmalı olaylar ve iddialar.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-transform hover:scale-105 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Yeni İddia / Skandal Ekle</span>
          </button>
        </div>

        {/* Mini stats counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Kayıtlı İddia / Dosya</span>
            <span className="text-base font-black font-mono text-slate-900 dark:text-white">{mpControversies.length}</span>
          </div>

          <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">Yargı & Fezleke</span>
            <span className="text-base font-black font-mono text-rose-900 dark:text-rose-200">{fezlekeCount}</span>
          </div>

          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">Sözlü / Siyasi Polemik</span>
            <span className="text-base font-black font-mono text-blue-900 dark:text-blue-200">
              {mpControversies.filter((c) => c.category === 'soz_eylem').length}
            </span>
          </div>

          <div className="p-3 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-800 dark:text-purple-300">Etik / Parti İçi Kriz</span>
            <span className="text-base font-black font-mono text-purple-900 dark:text-purple-200">
              {mpControversies.filter((c) => c.category === 'etik_skandal' || c.category === 'parti_kriz').length}
            </span>
          </div>
        </div>
      </div>

      {/* Principle / Legal Disclaimer Banner */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-slate-900 dark:text-white">Kullanıcı Bildirimi ve Tarafsızlık İlkesi:</strong> Sistemde varsayılan/önyüklü herhangi bir skandal veya fezleke kaydı yer almaz. Tüm dosyalar yalnızca kullanıcıların sunduğu resmi kaynaklı (TBMM tutanakları, yargı kararları, doğrulanmış basın haberleri) bildirimler ile oluşturulur.
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İddialar, fezlekeler ve olaylar içinde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Tüm Dosyalar ({mpControversies.length})
          </button>

          {Object.entries(CONTROVERSY_CATEGORIES).map(([catKey, catVal]) => {
            const count = mpControversies.filter((c) => c.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setCategoryFilter(catKey)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === catKey
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {catVal.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Controversies */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <FileCheck2 className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {searchQuery || categoryFilter !== 'all'
                ? 'Filtreye uygun iddia / dosya kaydı bulunamadı.'
                : 'Bu milletvekili hakkında henüz kayıtlı bir skandal veya fezleke bulunmuyor.'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Sistemde önyüklü iddia bulunmamaktadır. Resmi veya belgeli bir haber, TBMM fezlekesi ya da kamuoyuna yansımış bir tartışma biliyorsanız siz veya diğer kullanıcılar "+ Yeni İddia / Skandal Ekle" butonu ile bildirebilir.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              İlk İddia / Dosyayı Ekle
            </button>
          </div>
        ) : (
          filteredList.map((item) => (
            <ControversyCard
              key={item.id}
              item={item}
              onEdit={handleOpenEdit}
              onDelete={onDeleteControversy}
            />
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      <AddControversyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mp={mp}
        editingControversy={editingItem}
        onSave={handleSaveModal}
      />
    </div>
  );
};
