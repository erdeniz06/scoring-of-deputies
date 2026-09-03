import { ControversyItem, ControversyCategory, ControversyStatus } from '../types';

export const CONTROVERSY_CATEGORIES: Record<ControversyCategory, { label: string; color: string; bgColor: string; borderColor: string }> = {
  yargi_fezleke: {
    label: 'Yargı & Fezleke Dosyası',
    color: '#b91c1c',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  yolsuzluk_ihale: {
    label: 'Mali Şaibe & İhale İddiası',
    color: '#c2410c',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
  },
  etik_skandal: {
    label: 'Etik & Davranış Tartışması',
    color: '#7e22ce',
    bgColor: '#faf5ff',
    borderColor: '#e9d5ff',
  },
  soz_eylem: {
    label: 'Tartışmalı Söz & Polemik',
    color: '#0369a1',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  parti_kriz: {
    label: 'Parti İçi Kriz & İhraç / İstifa',
    color: '#475569',
    bgColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
  diger: {
    label: 'Diğer Kamuoyu Dosyası',
    color: '#4b5563',
    bgColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
};

export const CONTROVERSY_STATUSES: Record<ControversyStatus, { label: string; badgeClass: string }> = {
  fezleke_mecliste: {
    label: 'Dokunulmazlık Fezlekesi TBMM Karma Komisyonunda',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
  },
  sorusturma_suruyor: {
    label: 'Adli / İdari İnceleme veya Soruşturma Sürüyor',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
  },
  dava_acildi: {
    label: 'Dava Açıldı / Yargılama Süreci',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
  },
  takipsizlik_beraat: {
    label: 'Takipsizlik Kararı / Beraat Etti',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
  },
  ceza_aldi: {
    label: 'Ceza / Mahkumiyet Kararı (AYM/İstinaf İncelemesinde)',
    badgeClass: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
  },
  kamuoyu_tartismasi: {
    label: 'Kamuoyu & Siyasi Polemik Konusu',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  },
  tekzip_edildi: {
    label: 'Yalanlandı / Mahkeme Kararıyla Tekzip Edildi',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
  },
};

// Varsayılan olarak hiçbir önceden yüklenmiş skandal / fezleke bulunmaz.
// Yalnızca kullanıcıların veya moderatörlerin bildirdiği doğrulanmış kayıtlar eklenir.
export const INITIAL_CONTROVERSIES: ControversyItem[] = [];
