import { StanceTag } from '../types';

export interface StanceOption {
  value: StanceTag;
  label: string;
  defaultBadge: string;
  category: 'anma' | 'durus' | 'meclis';
}

export const STANCE_GROUPS: {
  id: 'anma' | 'durus' | 'meclis';
  title: string;
  description: string;
  options: StanceOption[];
}[] = [
  {
    id: 'anma',
    title: '🕊️ Anma, Tören & Manevi Duruş (Atatürk, Bayramlar, Ziyaretler)',
    description: 'Anma mesajları, tören katılımları, anıtkabir ziyaretleri veya katılmama durumları',
    options: [
      {
        value: 'andi_sahiplendi',
        label: '🟢 Saygıyla Andı / Sahiplendi / Kutlama Mesajı Yayımladı',
        defaultBadge: 'Saygıyla Andı & Sahiplendi',
        category: 'anma',
      },
      {
        value: 'katilmadi_mesafeli',
        label: '🔴 Törene/Anmaya Katılmadı / Mesafeli Kaldı',
        defaultBadge: 'Anmaya Katılmadı / Mesafeli',
        category: 'anma',
      },
    ],
  },
  {
    id: 'durus',
    title: '🗣️ Siyasi Duruş, Demeç & Basın Açıklaması (Genel Konular)',
    description: 'TV mülakatları, basın açıklamaları, sosyal medya beyanları ve kürsü konuşmaları',
    options: [
      {
        value: 'destekledi',
        label: '🟢 Destekledi / Olumlu Açıklama Yaptı / Sahiplendi',
        defaultBadge: 'Destekledi & Olumlu Açıklama',
        category: 'durus',
      },
      {
        value: 'savundu',
        label: '🟢 Kürsüde / Kamuoyunda Açıkça Savundu',
        defaultBadge: 'Kürsüde Savundu',
        category: 'durus',
      },
      {
        value: 'elestirdi',
        label: '🔴 Sert Şekilde Eleştirdi / Tepki Gösterdi',
        defaultBadge: 'Sert Şekilde Eleştirdi',
        category: 'durus',
      },
      {
        value: 'karsi_cikti',
        label: '🔴 Karşı Çıktı / İtiraz Etti',
        defaultBadge: 'Karşı Çıktı & İtiraz Etti',
        category: 'durus',
      },
      {
        value: 'serh_koydu',
        label: '🟡 Şerh Koydu / Çekinceli Yaklaştı',
        defaultBadge: 'Şerh Koydu / Çekinceli',
        category: 'durus',
      },
      {
        value: 'notr_cekimser',
        label: '⚪ Nötr / Açıklama Yapmadı / Sessiz Kaldı',
        defaultBadge: 'Nötr / Sessiz Kaldı',
        category: 'durus',
      },
    ],
  },
  {
    id: 'meclis',
    title: '🏛️ Sadece TBMM Oylamaları & Yasa Teklifleri İçin',
    description: 'Genel Kurul resmi oylamaları, kabul/ret oyları ve kanun teklifleri',
    options: [
      {
        value: 'kabul_oyu',
        label: '🟢 Meclis Oylamasında Kabul Oyu Kullandı',
        defaultBadge: 'Mecliste Kabul Oyu Verdi',
        category: 'meclis',
      },
      {
        value: 'ret_oyu',
        label: '🔴 Meclis Oylamasında Ret Oyu Kullandı',
        defaultBadge: 'Mecliste Ret Oyu Verdi',
        category: 'meclis',
      },
      {
        value: 'kanun_teklifi',
        label: '🔵 Kanun Teklifi / Önerge Verdi',
        defaultBadge: 'Kanun Teklifi / Önerge Verdi',
        category: 'meclis',
      },
    ],
  },
];

export const ALL_STANCE_OPTIONS: StanceOption[] = STANCE_GROUPS.flatMap((g) => g.options);

export function isCommemorationTopic(topicTitleOrId?: string): boolean {
  if (!topicTitleOrId) return false;
  const lower = topicTitleOrId.toLowerCase();
  return (
    lower.includes('ataturk') ||
    lower.includes('atatürk') ||
    lower.includes('anma') ||
    lower.includes('bayram') ||
    lower.includes('tören')
  );
}

export function isLegislativeTopic(topicTitleOrId?: string): boolean {
  if (!topicTitleOrId) return false;
  const lower = topicTitleOrId.toLowerCase();
  return (
    lower.includes('yasa') ||
    lower.includes('kanun') ||
    lower.includes('protokol') ||
    lower.includes('af') ||
    lower.includes('teklif') ||
    lower.includes('oylama')
  );
}

export function resolveDefaultStanceLabel(
  tag: StanceTag,
  topicTitleOrId?: string,
  customLabel?: string
): string {
  if (customLabel && customLabel.trim()) {
    return customLabel.trim();
  }

  if (isCommemorationTopic(topicTitleOrId)) {
    switch (tag) {
      case 'andi_sahiplendi':
        return 'Saygıyla Andı & Sahiplendi';
      case 'destekledi':
        return 'Saygıyla Andı & Mesaj Yayımladı';
      case 'savundu':
        return "Cumhuriyet İlkelerini & Atatürk'ü Savundu";
      case 'katilmadi_mesafeli':
        return 'Törene / Anmaya Katılmadı';
      case 'karsi_cikti':
        return 'Anmaya Katılmadı / Mesafeli Kaldı';
      case 'elestirdi':
        return 'Eleştirel / Mesafeli Açıklama Yaptı';
      case 'notr_cekimser':
      case 'sessiz_kaldi':
        return 'Anma Mesajı Yayımlamadı / Sessiz Kaldı';
      default:
        return 'Saygıyla Andı';
    }
  }

  const option = ALL_STANCE_OPTIONS.find((o) => o.value === tag);
  if (option) {
    return option.defaultBadge;
  }

  switch (tag) {
    case 'destekledi':
      return 'Destekledi / Olumlu Açıklama';
    case 'karsi_cikti':
      return 'Karşı Çıktı / İtiraz Etti';
    case 'savundu':
      return 'Kürsüde / Kamuoyunda Savundu';
    case 'elestirdi':
      return 'Sert Şekilde Eleştirdi';
    case 'kanun_teklifi':
      return 'Kanun Teklifi / Önerge Verdi';
    case 'serh_koydu':
      return 'Şerh Koydu / Çekinceli Yaklaştı';
    case 'notr_cekimser':
    case 'sessiz_kaldi':
      return 'Nötr / Sessiz Kaldı';
    default:
      return 'Görüş Belirtti';
  }
}

export interface QuickPresetChip {
  label: string;
  tag: StanceTag;
  badge: string;
}

export function getQuickPresetChips(topicTitleOrId?: string): QuickPresetChip[] {
  if (isCommemorationTopic(topicTitleOrId)) {
    return [
      {
        label: '🕊️ Saygıyla Andı & Anıtkabir Ziyareti',
        tag: 'andi_sahiplendi',
        badge: "Saygıyla Andı & Anıtkabir'i Ziyaret Etti",
      },
      {
        label: '🇹🇷 Atatürk İlkeleri ve Laiklik Vurgusu',
        tag: 'savundu',
        badge: 'Atatürk İlkeleri & Laiklik Vurgusu',
      },
      {
        label: '📢 10 Kasım / 29 Ekim Resmi Mesajı',
        tag: 'destekledi',
        badge: 'Resmi Anma ve Tebrik Mesajı Paylaştı',
      },
      {
        label: '🚫 Törene / Anmaya Katılmadı',
        tag: 'katilmadi_mesafeli',
        badge: 'Törenlere ve Anmaya Katılmadı',
      },
      {
        label: '⚠️ Mesafeli / Eleştirel Yaklaşım',
        tag: 'elestirdi',
        badge: 'Eleştirel / Mesafeli Açıklama',
      },
      {
        label: '⚪ Anma Mesajı Yayımlamadı',
        tag: 'notr_cekimser',
        badge: 'Anma Mesajı Paylaşmadı / Sessiz Kaldı',
      },
    ];
  }

  if (isLegislativeTopic(topicTitleOrId)) {
    return [
      {
        label: '🏛️ Kabul Oyu Kullandı',
        tag: 'kabul_oyu',
        badge: 'Meclis Oylamasında Kabul Oyu Verdi',
      },
      {
        label: '🏛️ Ret Oyu Kullandı',
        tag: 'ret_oyu',
        badge: 'Meclis Oylamasında Ret Oyu Verdi',
      },
      {
        label: '🔵 Kanun Teklifi / Önerge',
        tag: 'kanun_teklifi',
        badge: 'Kanun Teklifi / Önerge Verdi',
      },
      {
        label: '🟡 Komisyonda Şerh Düştü',
        tag: 'serh_koydu',
        badge: 'Komisyonda Şerh Koydu',
      },
      {
        label: '🗣️ Kürsüde Savundu',
        tag: 'savundu',
        badge: 'Meclis Kürsüsünde Savundu',
      },
      {
        label: '🗣️ Sert Şekilde Eleştirdi',
        tag: 'elestirdi',
        badge: 'Genel Kurulda Sert Eleştirdi',
      },
    ];
  }

  // General political topic
  return [
    {
      label: '🟢 Destekledi & Olumlu Açıklama',
      tag: 'destekledi',
      badge: 'Destekledi & Olumlu Açıklama Yaptı',
    },
    {
      label: '🟢 Kürsüde Açıkça Savundu',
      tag: 'savundu',
      badge: 'Kürsüde / Kamuoyunda Savundu',
    },
    {
      label: '🔴 Sert Şekilde Eleştirdi',
      tag: 'elestirdi',
      badge: 'Sert Şekilde Eleştirdi / Tepki Gösterdi',
    },
    {
      label: '🔴 Karşı Çıktı & İtiraz Etti',
      tag: 'karsi_cikti',
      badge: 'Karşı Çıktı / İtiraz Etti',
    },
    {
      label: '🟡 Çekinceli Yaklaştı / Şerh',
      tag: 'serh_koydu',
      badge: 'Şerh Koydu / Çekinceli Yaklaştı',
    },
    {
      label: '⚪ Açıklama Yapmadı / Nötr',
      tag: 'notr_cekimser',
      badge: 'Nötr / Açıklama Yapmadı',
    },
  ];
}

export function getStanceBadgeClasses(tag?: StanceTag): string {
  if (tag === 'destekledi' || tag === 'savundu' || tag === 'andi_sahiplendi' || tag === 'kabul_oyu') {
    return 'bg-emerald-50 text-emerald-800 border-emerald-200';
  }
  if (tag === 'karsi_cikti' || tag === 'elestirdi' || tag === 'ret_oyu' || tag === 'katilmadi_mesafeli') {
    return 'bg-rose-50 text-rose-800 border-rose-200';
  }
  if (tag === 'kanun_teklifi') {
    return 'bg-blue-50 text-blue-800 border-blue-200';
  }
  if (tag === 'serh_koydu' || tag === 'notr_cekimser' || tag === 'sessiz_kaldi') {
    return 'bg-amber-50 text-amber-800 border-amber-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}
