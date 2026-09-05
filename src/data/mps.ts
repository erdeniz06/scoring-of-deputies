import { MP, UserScores } from '../types';
import { YENI_PARTI_MPS } from './mps/yeniPartiMps';
import { ADANA_MPS } from './mps/adanaMps';
import { ISTANBUL_MPS } from './mps/istanbulMps';
import { CHP_MPS } from './mps/chpMps';
import { AKP_MPS } from './mps/akpMps';
import { OTHER_MPS } from './mps/otherMps';
import { REGIONAL_MPS } from './mps/regionalMps';
import { PROVINCES_NEW_MPS } from './mps/provincesNewMps';
import { PROVINCES_NEW_MPS_2 } from './mps/provincesNewMps2';
import { PROVINCES_NEW_MPS_3 } from './mps/provincesNewMps3';
import { PROVINCES_NEW_MPS_4 } from './mps/provincesNewMps4';
import { PROVINCES_NEW_MPS_5 } from './mps/provincesNewMps5';
import { PROVINCES_NEW_MPS_6 } from './mps/provincesNewMps6';
import { PROVINCES_NEW_MPS_7 } from './mps/provincesNewMps7';

// Combine all datasets with deduplication by id
const combinedMps = [
  ...YENI_PARTI_MPS,
  ...ADANA_MPS,
  ...ISTANBUL_MPS,
  ...CHP_MPS,
  ...AKP_MPS,
  ...OTHER_MPS,
  ...REGIONAL_MPS,
  ...PROVINCES_NEW_MPS,
  ...PROVINCES_NEW_MPS_2,
  ...PROVINCES_NEW_MPS_3,
  ...PROVINCES_NEW_MPS_4,
  ...PROVINCES_NEW_MPS_5,
  ...PROVINCES_NEW_MPS_6,
  ...PROVINCES_NEW_MPS_7,
];

// Explicit list of 44 MPs belonging to CHP
export const EXPLICIT_CHP_MP_IDS = new Set([
  'muzeyyen_sevkin',           // 1- Adana: Müzeyyen Şevkin
  'deniz_demir',               // 2- Ankara: Deniz Demir
  'semra_dincer',              // 3- Ankara: Semra Dinçer
  'sururi_corabatir',          // 4- Antalya: Sururi Çorabatır
  'huseyin_yildiz',            // 5- Aydın: Hüseyin Yıldız
  'serkan_sari',               // 6- Balıkesir: Serkan Sarı
  'aysu_bankoglu',             // 7- Bartın: Aysu Bankoğlu
  'turker_ates',               // 8- Bolu: Türker Ateş
  'orhan_saribal',             // 9- Bursa: Orhan Sarıbal
  'gulizar_bicer_karaca',      // 10- Denizli: Gülizar Biçer Karaca
  'ahmet_baran_yazgan',        // 11- Edirne: Ahmet Baran Yazgan
  'gursel_erol',               // 12- Elazığ: Gürsel Erol
  'jale_nur_sullu',            // 13- Eskişehir: Jale Nur Süllü
  'hasan_ozturkmen',           // 14- Gaziantep: Hasan Öztürkmen
  'mehmet_guzelmansur',        // 15- Hatay: Mehmet Güzelmansur
  'nermin_yildirim_kara',      // 16- Hatay: Nermin Yıldırım Kara
  'engin_altay',               // 17- İstanbul: Engin Altay
  'erdogan_toprak',            // 18- İstanbul: Erdoğan Toprak
  'gamze_akkus_ilgezdi',       // 19- İstanbul: Gamze Akkuş İlgezdi
  'ilhan_kesici',              // 20- İstanbul: İlhan Kesici
  'oguz_kaan_salici',          // 21- İstanbul: Oğuz Kaan Salıcı
  'enis_berberoglu',           // 22- İstanbul: Enis Berberoğlu
  'rahmi_askin_tureli',        // 23- İzmir: Rahmi Aşkın Türeli
  'rifat_turuntay_nalbantoglu',// 24- İzmir: Rıfat Toruntay Nalbantoğlu
  'sevda_erdan_kilic',         // 25- İzmir: Sevda Erdan Kılıç
  'ali_oztunc',                // 26- Kahramanmaraş: Ali Öztunç
  'inan_akgun_alp',            // 27- Kars: İnan Akgün Alp
  'cevdet_akay',               // 28- Karabük: Cevdet Akay
  'vecdi_gundogdu',            // 29- Kırklareli: Vecdi Gündoğdu
  'baris_bektas',              // 30- Konya: Barış Bektaş
  'selma_aliye_kavaf',         // 31- Manisa: Selma Aliye Kavaf
  'ali_fazil_kasap',           // 32- Kütahya: Ali Fazıl Kasap
  'gulcan_kis',                // 33- Mersin: Gülcan Kış
  'omer_fethi_gurer',          // 34- Niğde: Ömer Fethi Gürer
  'mustafa_adiguzel',          // 35- Ordu: Mustafa Adıgüzel
  'cem_avsar',                 // 36- Tekirdağ: Cem Avşar
  'faik_oztrak',               // 37- Tekirdağ: Faik Öztrak
  'ilhami_ozcan_aygun',        // 38- Tekirdağ: İlhami Özcan Aygun
  'nurten_yontar',             // 39- Tekirdağ: Nurten Yontar
  'kadim_durmaz',              // 40- Tokat: Kadim Durmaz
  'ali_karaoba',               // 41- Uşak: Ali Karaoba
  'tahsin_becan',              // 42- Yalova: Tahsin Becan
  'yuksel_mansur_kilinc',      // 43- İstanbul: Yüksel Mansur Kılınç
  'mahir_polat',               // 44- İzmir: Mahir Polat
]);

// Duplicate records or vacated parliamentary seats (e.g. elected mayors)
const VACANT_OR_DUPLICATE_IDS = new Set([
  'ersagun_yucel',            // duplicate of ahmet_ersagun_yucel
  'abdurrahman_tutdere',      // vacant (elected Adıyaman Mayor)
  'burcu_koksal',             // vacant (elected Afyonkarahisar Mayor)
  'hasan_baltaci',            // vacant (elected Kastamonu Mayor)
  'ahmet_onal',               // vacant (elected Kırıkkale Mayor)
  'idris_sahin_ank',          // duplicate of idris_sahin
  'tulay_hatimogullari_oruc',  // duplicate of tulay_hatimogullari
  'cengiz_candar',            // duplicate of osman_cengiz_candar
  'mehmet_sahin_km',          // duplicate of mehmet_sahin
  'veysal_tipioglu',          // duplicate of veysel_tipioglu
]);

// Overrides to match official party seat distributions
const PARTY_OVERRIDES: Record<string, string> = {
  // HÜDA PAR: 4
  'faruk_dinc': 'huda_par',
  'serkan_ramanli': 'huda_par',
  'sahzade_demir': 'huda_par',
  'zekeriya_yapicioglu': 'huda_par',

  // DBP: 2
  'keskin_bayindir': 'dbp',
  'salihe_aydeniz': 'dbp',

  // TİP: Ahmet Şık, Sera Kadıgil, Erkan Baş, Can Atalay
  'ahmet_sik': 'tip',
  'sera_kadigil': 'tip',
  'erkan_bas': 'tip',
  'can_atalay': 'tip',

  // EMEP: 2
  'sevda_karaca': 'emep',
  'iskender_bayhan': 'emep',

  // SAADET: 1
  'mesut_dogan': 'saadet',

  // YRP: 3
  'fatih_erbakan': 'yrp',
  'dogan_bekin': 'yrp',
  'suat_pamukcu': 'akp',

  // MHP: 46
  'hasan_kalyoncu_ist': 'akp',
  'semih_isikver': 'akp',

  // İYİ: 27
  'adnan_beker': 'bagimsiz',
  'koray_aydin': 'bagimsiz',
  'salih_uzun': 'iyi',

  // DEM: 56
  'perihan_koca': 'bagimsiz',

  // AKP: 280
  'onder_aksakal': 'akp',
  'sevda_karaca_demir': 'akp',
  'haydar_altintas': 'akp',
  'mustafa_nedim_yamali': 'akp',
  'selim_temurci': 'akp',
  'isa_mesih_sahin': 'akp',
  'berran_kose': 'akp',
};

// Exactly 20 MPs for Yeni Yol Partisi
const YENI_YOL_MP_IDS = new Set([
  'hasan_karal',
  'mustafa_yeneroglu',
  'necmettin_caliskan',
  'seda_kaya_osen',
  'mahmut_arikan',
  'hasan_ekici',
  'mehmet_emin_ekmen',
  'serap_yazici_ozbudun',
  'serafettin_kilic',
  'mehmet_atmaca',
  'cemalettin_kani_torun',
  'sema_silkin_un',
  'ertugrul_kaya',
  'selcuk_ozdag',
  'sadullah_ergin',
  'idris_sahin',
  'elif_esen',
  'mustafa_kaya',
  'bulent_kaya',
]);

// Bağımsız milletvekilleri
const BAGIMSIZ_MP_IDS = new Set([
  'adnan_beker',
  'koray_aydin',
  'ahmet_zenbilci',
  'cemal_enginyurt',
  'hasan_basri_sonmez',
  'mustafa_demir_kilis',
  'unal_karaman',
  'umit_dikbayir',
  'yuksel_arslan',
  'ismail_akgul',
  'perihan_koca',
  'mehmet_karaman',
  'birol_aydin',
]);

// Map of verified official TBMM profile photos
const VERIFIED_MP_PHOTOS: Record<string, string> = {
  // Ankara 12 MPs
  'adnan_beker': '/mps/adnan_beker.jpg',
  'ahmet_esref_fakibaba': '/mps/ahmet_esref_fakibaba.jpg',
  'ahmet_fethan_baykoc': '/mps/ahmet_fethan_baykoc.jpg',
  'aliye_timisi_ersever': '/mps/aliye_timisi_ersever.jpg',
  'asuman_erdogan': '/mps/asuman_erdogan.jpg',
  'aylin_yaman': '/mps/aylin_yaman.jpg',
  'deniz_demir': '/mps/deniz_demir.jpg',
  'fuat_oktay': '/mps/fuat_oktay.jpg',
  'gamze_tascier': '/mps/gamze_tascier.jpg',
  'idris_sahin': '/mps/idris_sahin.jpg',
  'julide_sarieroglu': '/mps/julide_sarieroglu.jpg',
  'koray_aydin': '/mps/koray_aydin.jpg',

  'ali_gokcek': '/mps/ali_gokcek.jpg',
  'ali_mahir_basarir': '/mps/ali_mahir_basarir.jpg',
  'ayse_sibel_yanikomeroglu': '/mps/sibel_yanikomeroglu.jpg',
  'sibel_yanikomeroglu': '/mps/sibel_yanikomeroglu.jpg',
  'burhanettin_bulut': '/mps/burhanettin_bulut.jpg',
  'engin_altay': '/mps/engin_altay.jpg',
  'enis_berberoglu': '/mps/enis_berberoglu.jpg',
  'erdogan_toprak': '/mps/erdogan_toprak.jpg',
  'erkan_bas': '/mps/erkan_bas.jpg',
  'erkan_kandemir': '/mps/erkan_kandemir.jpg',
  'evrim_rizvanoglu': '/mps/evrim_rizvanoglu.jpg',
  'fethi_acikel': '/mps/fethi_acikel.jpg',
  'feti_yildiz': '/mps/feti_yildiz.jpg',
  'gamze_akkus_ilgezdi': '/mps/gamze_akkus_ilgezdi.png',
  'gokhan_gunaydin': '/mps/gokhan_gunaydin.jpg',
  'halit_yerebakan': '/mps/halit_yerebakan.jpg',
  'hasan_karal': '/mps/hasan_karal.jpg',
  'hasan_turan': '/mps/hasan_turan.jpg',
  'hulki_cevizoglu': '/mps/hulki_cevizoglu.jpg',
  'jale_nur_sullu': '/mps/jale_nur_sullu.png',
  'namik_tan': '/mps/namik_tan.jpg',
  'numan_kurtulmus': '/mps/numan_kurtulmus.jpg',
  'omer_celik': '/mps/omer_celik.jpg',
  'onder_aksakal': '/mps/onder_aksakal.jpg',
  'semih_yalcin': '/mps/semih_yalcin.jpg',
  'suleyman_soylu': '/mps/suleyman_soylu.jpg',
  'utku_cakirozer': '/mps/utku_cakirozer.png',
  'suat_pamukcu': '/mps/suat_pamukcu.jpg',
  'serkan_bayram': '/mps/serkan_bayram.jpg',
  'selim_temurci': '/mps/selim_temurci.jpg',
  'sera_kadigil': '/mps/sera_kadigil.jpg',
  'can_atalay': '/mps/can_atalay.jpg',
  'ahmet_sik': '/mps/ahmet_sik.jpg',
  'birol_aydin': '/mps/birol_aydin.jpg',
  'bugra_kavuncu': '/mps/bugra_kavuncu.jpg',
  'bulent_kaya': '/mps/bulent_kaya.jpg',
  'celal_adan': '/mps/celal_adan.jpg',
  'cemal_enginyurt': '/mps/cemal_enginyurt.jpg',
  'cengiz_cicek': '/mps/cengiz_cicek.jpg',
  'cicek_otlu': '/mps/cicek_otlu.jpg',
  'cigdem_kilicgun_ucar': '/mps/cigdem_kilicgun_ucar.jpg',
  'cihan_pacaci': '/mps/cihan_pacaci.jpg',
  'cuneyt_yuksel': '/mps/cuneyt_yuksel.jpg',
  'dogan_bekin': '/mps/dogan_bekin.jpg',
  'elif_esen': '/mps/elif_esen.jpg',
  'fatih_erbakan': '/mps/fatih_erbakan.jpg',
  'mustafa_kaya': '/mps/mustafa_kaya.jpg',
  'mustafa_yeneroglu': '/mps/mustafa_yeneroglu.jpg',
  'nimet_ozdemir': '/mps/nimet_ozdemir.jpg',
  'tulay_hatimogullari': '/mps/tulay_hatimogullari.jpg',
  'suat_ozcagdas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Suat_%C3%96z%C3%A7a%C4%9Fda%C5%9F_2023.jpg/600px-Suat_%C3%96z%C3%A7a%C4%9Fda%C5%9F_2023.jpg',

  // 34 Target MPs Verified Photos
  'adem_yildirim': '/mps/adem_yildirim.jpg',
  'ahmet_ersagun_yucel': '/mps/ersagun_yucel.jpg',
  'azmi_ekinci': '/mps/azmi_ekinci.jpg',
  'bayram_senocak': '/mps/bayram_senocak.jpg',
  'behiye_eker': '/mps/behiye_eker.jpg',
  'burak_akburak': '/mps/burak_akburak.jpg',
  'busra_paker': '/mps/busra_paker.jpg',
  'celal_firat': '/mps/celal_firat.jpg',
  'derya_ayaydin': '/mps/derya_ayaydin.jpg',
  'dogan_demir': '/mps/dogan_demir.jpg',
  'edip_semih_yalcin': '/mps/semih_yalcin.jpg',
  'ozgur_ozel': '/mps/ozgur_ozel.jpg',
  'selma_aliye_kavaf': '/mps/selma_aliye_kavaf.jpg',
  'senol_sunat': '/mps/senol_sunat.jpg',
  'tamer_akkal': '/mps/tamer_akkal.jpg',
  'ahmet_mucahit_arinc': '/mps/ahmet_mucahit_arinc.jpg',
  'ahmet_vehbi_bakirlioglu': '/mps/ahmet_vehbi_bakirlioglu.jpg',
  'bahadir_yenisehirlioglu': '/mps/bahadir_yenisehirlioglu.jpg',
  'bahadir_nahit_yenisehirlioglu': '/mps/bahadir_yenisehirlioglu.jpg',
  'bekir_basevirgen': '/mps/bekir_basevirgen.jpg',
  'erkan_akcay': '/mps/erkan_akcay.jpg',
  'murat_baybatur': '/mps/murat_baybatur.jpg',
};

const uniqueMpMap = new Map<string, MP>();
combinedMps.forEach((mp) => {
  // Exclude duplicate entries or vacant seats
  if (VACANT_OR_DUPLICATE_IDS.has(mp.id)) return;

  if (!uniqueMpMap.has(mp.id)) {
    let finalPartyId = mp.partyId;
    const finalElectedPartyId = mp.electedPartyId || mp.partyId;

    // Apply strict priority party mapping
    if (EXPLICIT_CHP_MP_IDS.has(mp.id)) {
      finalPartyId = 'chp';
    } else if (PARTY_OVERRIDES[mp.id]) {
      finalPartyId = PARTY_OVERRIDES[mp.id];
    } else if (BAGIMSIZ_MP_IDS.has(mp.id)) {
      finalPartyId = 'bagimsiz';
    } else if (YENI_YOL_MP_IDS.has(mp.id)) {
      finalPartyId = 'yeni_yol';
    } else if (mp.partyId === 'hudapar') {
      finalPartyId = 'huda_par';
    } else if (mp.partyId === 'dp' || mp.partyId === 'independent_opposition') {
      finalPartyId = 'bagimsiz';
    } else if (mp.partyId === 'deva' || mp.partyId === 'gelecek' || mp.partyId === 'saadet') {
      finalPartyId = 'yeni_parti';
    } else if (mp.partyId === 'chp') {
      finalPartyId = 'yeni_parti';
    }

    // Assign verified photo if available
    const verifiedPhoto = VERIFIED_MP_PHOTOS[mp.id];
    const finalPhoto = verifiedPhoto || mp.photoUrl;

    uniqueMpMap.set(mp.id, {
      ...mp,
      partyId: finalPartyId,
      electedPartyId: finalElectedPartyId,
      photoUrl: finalPhoto,
    });
  }
});

export const ALL_MPS: MP[] = Array.from(uniqueMpMap.values());

export function getMpById(id: string): MP | undefined {
  return ALL_MPS.find((mp) => mp.id === id);
}

/**
 * Başlangıç puan haritası: Kullanıcının kendi puanlamalarını yapması için temiz boş nesne.
 */
export const DEFAULT_BENCHMARK_USER_SCORES: UserScores = {};

