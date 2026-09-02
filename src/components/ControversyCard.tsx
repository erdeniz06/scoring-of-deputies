import React from 'react';
import { ControversyItem } from '../types';
import { CONTROVERSY_CATEGORIES, CONTROVERSY_STATUSES } from '../data/controversies';
import { 
  AlertTriangle, 
  ExternalLink, 
  Scale, 
  MessageSquare, 
  Calendar, 
  Edit3, 
  Trash2, 
  ShieldAlert,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

interface ControversyCardProps {
  item: ControversyItem;
  onEdit?: (item: ControversyItem) => void;
  onDelete?: (id: string) => void;
}

export const ControversyCard: React.FC<ControversyCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const categoryInfo = CONTROVERSY_CATEGORIES[item.category] || CONTROVERSY_CATEGORIES.diger;
  const statusInfo = CONTROVERSY_STATUSES[item.status] || CONTROVERSY_STATUSES.kamuoyu_tartismasi;

  const severityBadge = {
    yuksek: { label: 'Yüksek Etki / Fezleke / Ağır Dava', class: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900' },
    orta: { label: 'Orta Düzey / Soruşturma / İhraç', class: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900' },
    dusuk: { label: 'Sözlü Polemik / Basın İddiası', class: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  }[item.severity || 'orta'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-4">
      
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Badge */}
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg border tracking-wide inline-flex items-center gap-1.5 shadow-2xs"
            style={{
              backgroundColor: categoryInfo.bgColor,
              borderColor: categoryInfo.borderColor,
              color: categoryInfo.color,
            }}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {categoryInfo.label}
          </span>

          {/* Status Badge */}
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 ${statusInfo.badgeClass}`}>
            <Scale className="w-3 h-3" />
            {statusInfo.label}
          </span>

          {/* Severity Tag */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${severityBadge.class}`}>
            {severityBadge.label}
          </span>
        </div>

        {/* Date & Actions */}
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>

          {item.isUserAdded && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded">
              Kullanıcı Notu
            </span>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="İddia / Dosyayı Düzenle"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && item.isUserAdded && (
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Kaydı Sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug font-serif">
        {item.title}
      </h4>

      {/* Summary Box */}
      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/70">
        <p className="font-normal">{item.summary}</p>
      </div>

      {/* MP Response / Savunması (If available) */}
      {item.mpResponse && (
        <div className="bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/80 dark:border-emerald-900/40 p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Milletvekilinin Açıklaması / Savunması / Beyanı:
          </div>
          <p className="text-xs text-emerald-950 dark:text-emerald-200 italic leading-relaxed pl-5 border-l-2 border-emerald-400 dark:border-emerald-700">
            "{item.mpResponse}"
          </p>
        </div>
      )}

      {/* Sources & References */}
      {item.sources && item.sources.length > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Haber & Tutanak Kaynakları:
          </span>
          {item.sources.map((src, idx) => (
            <a
              key={idx}
              href={src.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-2.5 py-1 rounded-lg font-medium border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <span>{src.outlet || src.title || 'Kaynak'}</span>
              {src.date && <span className="text-slate-400 text-[10px]">({src.date})</span>}
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
