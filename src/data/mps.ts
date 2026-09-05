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
  'gulcan_kis',                // 32- Mersin: Gülcan Kış
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
  'fatih_sahin',              // 27th term Ankara MP
  'mucahit_arslan',           // 27th term Ankara MP
  'mesut_akgul',              // non-active
  'nazli_ergul_ank',          // non-active
]);

// Overrides to match official party seat distributions
const PARTY_OVERRIDES: Record<string, string> = {
  'abdullah_agrali': 'akp',
  'abdullah_dogru': 'akp',
  'abdullah_guler': 'akp',
  'abdurrahim_firat': 'akp',
  'abdurrahman_baskan': 'mhp',
  'adnan_beker': 'bagimsiz',
  'ahmet_colakoglu': 'akp',
  'ahmet_kilic': 'akp',
  'ahmet_ozyurek': 'mhp',
  'ahmet_sik': 'tip',
  'ahmet_zenbilci': 'bagimsiz',
  'ali_gokcek': 'yeni_parti',
  'ali_yuksel': 'yeni_yol',
  'aliye_cosar': 'yeni_parti',
  'aliye_timisi_ersever': 'yeni_parti',
  'atay_uslu': 'akp',
  'ayhan_barut': 'yeni_parti',
  'ayhan_salman': 'akp',
  'aykut_kaya': 'yeni_parti',
  'aylin_yaman': 'yeni_parti',
  'ayse_sibel_ersoy': 'mhp',
  'ayse_sibel_yanikomeroglu': 'yeni_parti',
  'aysen_gurcan': 'akp',
  'ayyuce_turkes_tas': 'iyi',
  'baris_bektas': 'chp',
  'berran_kose': 'akp',
  'bilal_bilici': 'yeni_parti',
  'burhanettin_bulut': 'yeni_parti',
  'can_atalay': 'tip',
  'cavit_ari': 'yeni_parti',
  'celal_adan': 'mhp',
  'celal_firat': 'dem',
  'cemal_enginyurt': 'yeni_parti',
  'cemalettin_kani_torun': 'bagimsiz',
  'cengiz_candar': 'dem',
  'cengiz_cicek': 'dem',
  'cicek_otlu': 'dem',
  'cigdem_kilicgun_ucar': 'dbp',
  'cuneyt_yuksel': 'akp',
  'deniz_yavuzyilmaz': 'yeni_parti',
  'derya_ayaydin': 'akp',
  'dogan_bekin': 'yrp',
  'dogan_demir': 'yeni_parti',
  'edip_semih_yalcin': 'mhp',
  'efkan_ala': 'akp',
  'elif_esen': 'yeni_yol',
  'emel_gozukara_durmaz': 'akp',
  'emine_yavuz_gozgec': 'akp',
  'engin_altay': 'chp',
  'enis_berberoglu': 'chp',
  'erdogan_toprak': 'chp',
  'erkan_bas': 'tip',
  'erkan_kandemir': 'akp',
  'ersin_beyaz': 'akp',
  'evrim_rizvanoglu': 'yeni_parti',
  'evrim_rizvanoglu_emir': 'yeni_parti',
  'eylem_ertug_ertugrul': 'yeni_parti',
  'faruk_aytek': 'akp',
  'faruk_dinc': 'huda_par',
  'fatih_donmez': 'akp',
  'fatih_erbakan': 'yrp',
  'fatma_oncu': 'akp',
  'fethi_acikel': 'yeni_parti',
  'feti_yildiz': 'mhp',
  'fevzi_zirhlioglu': 'mhp',
  'gamze_akkus_ilgezdi': 'chp',
  'gamze_tascier': 'yeni_parti',
  'gokan_zeybek': 'yeni_parti',
  'gokhan_gunaydin': 'yeni_parti',
  'hakan_aksu': 'akp',
  'hakki_saruhan_oluc': 'dem',
  'hakki_saruhan_oruc': 'dem',
  'halis_dalkilic': 'akp',
  'hasan_basri_sonmez': 'bagimsiz',
  'hasan_ekici': 'akp',
  'hasan_kalyoncu_ist': 'akp',
  'hasan_ozturk': 'yeni_parti',
  'hasan_toktas': 'iyi',
  'haydar_altintas': 'akp',
  'hikmet_yalim_halici': 'yeni_parti',
  'hilmi_durgun': 'mhp',
  'ibrahim_arslan': 'yeni_parti',
  'ibrahim_ethem_tas': 'akp',
  'ibrahim_ufuk_kaynak': 'akp',
  'idris_nebi_hatipoglu': 'akp',
  'isa_mesih_sahin': 'akp',
  'iskender_bayhan': 'emep',
  'ismail_emrah_karayel': 'akp',
  'ismail_erdem': 'akp',
  'ismail_faruk_aksu': 'mhp',
  'ismet_buyukataman': 'mhp',
  'izzet_ulvi_yonter': 'mhp',
  'jale_nur_sullu': 'chp',
  'kadri_enis_berberoglu': 'chp',
  'kamil_aydin': 'mhp',
  'kayihan_pala': 'yeni_parti',
  'kemal_celik': 'akp',
  'keskin_bayindir': 'dbp',
  'keziban_konukcu': 'dem',
  'konur_alp_kocak': 'mhp',
  'koray_aydin': 'bagimsiz',
  'kursad_zorlu': 'akp',
  'latif_selvi': 'akp',
  'lutfiye_selva_cam': 'akp',
  'mahmut_ozer': 'akp',
  'mehmet_atmaca': 'yeni_yol',
  'mehmet_baykan': 'akp',
  'mehmet_emin_oz': 'akp',
  'mehmet_said_yaz': 'akp',
  'mehmet_sait_yaz': 'akp',
  'mehmet_ugur_gokgoz': 'akp',
  'meral_danis_bestas': 'dem',
  'meryem_goka': 'akp',
  'mesut_dogan': 'yeni_yol',
  'mevlut_cavusoglu': 'akp',
  'muammer_avci': 'akp',
  'muhammet_mufit_aydin': 'akp',
  'muharrem_varli': 'mhp',
  'murat_alparslan': 'akp',
  'murat_emir': 'yeni_parti',
  'mustafa_adiguzel': 'chp',
  'mustafa_erdem': 'yeni_parti',
  'mustafa_hakan_ozer': 'akp',
  'mustafa_hamarat': 'akp',
  'mustafa_kalayci': 'mhp',
  'mustafa_kose': 'akp',
  'mustafa_nedim_yamali': 'akp',
  'mustafa_sezgin_tanrikulu': 'yeni_parti',
  'mustafa_varank': 'akp',
  'mustafa_yavuz': 'akp',
  'naci_sanliturk': 'mhp',
  'namik_tan': 'yeni_parti',
  'nurhayat_altaca_kayisoglu': 'yeni_parti',
  'okan_konuralp': 'yeni_parti',
  'onder_aksakal': 'akp',
  'orhan_erdem': 'akp',
  'orhan_saribal': 'chp',
  'osman_cengiz_candar': 'dem',
  'osman_mesten': 'akp',
  'osman_zabun': 'akp',
  'ozgul_saki': 'dem',
  'ozgur_karabat': 'yeni_parti',
  'perihan_koca': 'bagimsiz',
  'refik_ozen': 'akp',
  'rukiye_toy': 'akp',
  'sadullah_kisacik': 'yeni_yol',
  'saffet_bozkurt': 'akp',
  'sahzade_demir': 'huda_par',
  'salih_uzun': 'iyi',
  'salihe_aydeniz': 'dbp',
  'selami_altinok': 'akp',
  'selim_temurci': 'akp',
  'selman_ozboyaci': 'akp',
  'semih_isikver': 'akp',
  'semih_yalcin': 'mhp',
  'sera_kadigil': 'tip',
  'serafettin_kilic': 'yeni_yol',
  'serap_yazici_ozbudun': 'akp',
  'serhat_eren': 'dem',
  'serkan_ramanli': 'huda_par',
  'sevda_karaca': 'emep',
  'sevda_karaca_demir': 'akp',
  'sevilay_celenk': 'dem',
  'sevilay_celenk_ozen': 'dem',
  'seyit_torun': 'yeni_parti',
  'sezgin_tanrikulu': 'yeni_parti',
  'sibel_yanikomeroglu': 'yeni_parti',
  'suat_ozcagdas': 'yeni_parti',
  'suat_pamukcu': 'akp',
  'suna_kepolu_ataman': 'akp',
  'sunay_karamik': 'akp',
  'sururi_corabatir': 'chp',
  'tahir_akyurek': 'akp',
  'tekin_bingol': 'yeni_parti',
  'tuba_vural_cokal': 'akp',
  'tulay_hatimogullari': 'dem',
  'turan_taskin_ozer': 'yeni_parti',
  'turkan_elci': 'yeni_parti',
  'ugur_poyraz': 'iyi',
  'ulas_karasu': 'yeni_parti',
  'umut_akdogan': 'yeni_parti',
  'unal_karaman': 'akp',
  'utku_cakirozer': 'yeni_parti',
  'yucel_arzen': 'akp',
  'yucel_arzen_haciogullari': 'akp',
  'yuksel_arslan': 'iyi',
  'yuksel_mansur_kilinc': 'chp',
  'yuksel_selcuk_turkoglu': 'iyi',
  'yunus_emre': 'yeni_parti',
  'zafer_sirakaya': 'akp',
  'zekeriya_yapicioglu': 'huda_par',
  'zeynel_emre': 'yeni_parti',
  'ziya_altunyaldiz': 'akp',
  'ziya_altunyildiz': 'akp',
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
  'mesut_dogan',
  'elif_esen',
  'mustafa_kaya',
  'bulent_kaya',
  'ali_fazil_kasap',
]);

// Bağımsız milletvekilleri
const BAGIMSIZ_MP_IDS = new Set([
  'adnan_beker',
  'koray_aydin',
  'ahmet_zenbilci',
  'hasan_basri_sonmez',
  'mustafa_demir_kilis',
  'unal_karaman',
  'umit_dikbayir',
  'ismail_akgul',
  'perihan_koca',
  'mehmet_karaman',
  'birol_aydin',
]);

// Map of verified official TBMM profile photos
const VERIFIED_MP_PHOTOS: Record<string, string> = {
  'abdulkadir_emin_onen': '/mps/abdulkadir_emin_onen.jpg',
  'abdullah_agrali': '/mps/abdullah_agrali.jpg',
  'abdullah_dogru': '/mps/abdullah_dogru.jpg',
  'abdullah_guler': '/mps/abdullah_guler.jpg',
  'abdurrahim_dusak': '/mps/abdurrahim_dusak.jpg',
  'abdurrahim_firat': '/mps/abdurrahim_firat.jpg',
  'abdurrahman_baskan': '/mps/abdurrahman_baskan.jpg',
  'adem_yildirim': '/mps/adem_yildirim.jpg',
  'adil_bicer': '/mps/adil_bicer.jpg',
  'adnan_beker': '/mps/adnan_beker.jpg',
  'ahmet_colakoglu': '/mps/ahmet_colakoglu.jpg',
  'ahmet_erbas': '/mps/ahmet_erbas.jpg',
  'ahmet_ersagun_yucel': '/mps/ahmet_ersagun_yucel.jpg',
  'ahmet_esref_fakibaba': '/mps/ahmet_esref_fakibaba.jpg',
  'ahmet_fethan_baykoc': '/mps/ahmet_fethan_baykoc.jpg',
  'ahmet_kilic': '/mps/ahmet_kilic.jpg',
  'ahmet_mucahit_arinc': '/mps/ahmet_mucahit_arinc.jpg',
  'ahmet_ozyurek': '/mps/ahmet_ozyurek.jpg',
  'ahmet_sik': '/mps/ahmet_sik.jpg',
  'ahmet_vehbi_bakirlioglu': '/mps/ahmet_vehbi_bakirlioglu.jpg',
  'ahmet_zenbilci': '/mps/ahmet_zenbilci.jpg',
  'ali_fazil_kasap': '/mps/ali_fazil_kasap.jpg',
  'ali_gokcek': '/mps/ali_gokcek.jpg',
  'ali_mahir_basarir': '/mps/ali_mahir_basarir.jpg',
  'ali_yuksel': '/mps/ali_yuksel.jpg',
  'aliye_cosar': '/mps/aliye_cosar.jpg',
  'aliye_timisi_ersever': '/mps/aliye_timisi_ersever.jpg',
  'asuman_erdogan': '/mps/asuman_erdogan.jpg',
  'atay_uslu': '/mps/atay_uslu.jpg',
  'ayhan_barut': '/mps/ayhan_barut.jpg',
  'ayhan_gider': '/mps/ayhan_gider.jpg',
  'ayhan_salman': '/mps/ayhan_salman.jpg',
  'aykut_kaya': '/mps/aykut_kaya.jpg',
  'aylin_yaman': '/mps/aylin_yaman.jpg',
  'ayse_sibel_ersoy': '/mps/ayse_sibel_ersoy.jpg',
  'ayse_sibel_yanikomeroglu': '/mps/sibel_yanikomeroglu.jpg',
  'aysen_gurcan': '/mps/aysen_gurcan.jpg',
  'ayyuce_turkes_tas': '/mps/ayyuce_turkes_tas.jpg',
  'azmi_ekinci': '/mps/azmi_ekinci.jpg',
  'bahadir_nahit_yenisehirlioglu': '/mps/bahadir_yenisehirlioglu.jpg',
  'bahadir_yenisehirlioglu': '/mps/bahadir_yenisehirlioglu.jpg',
  'baris_bektas': '/mps/baris_bektas.jpg',
  'bayram_senocak': '/mps/bayram_senocak.jpg',
  'behiye_eker': '/mps/behiye_eker.jpg',
  'bekir_basevirgen': '/mps/bekir_basevirgen.jpg',
  'bekir_bozdag': '/mps/bekir_bozdag.jpg',
  'bilal_bilici': '/mps/bilal_bilici.jpg',
  'birol_aydin': '/mps/birol_aydin.jpg',
  'bugra_kavuncu': '/mps/bugra_kavuncu.jpg',
  'bulent_kaya': '/mps/bulent_kaya.jpg',
  'burak_akburak': '/mps/burak_akburak.jpg',
  'burhan_kayaturk': '/mps/burhan_kayaturk.jpg',
  'burhanettin_bulut': '/mps/burhanettin_bulut.jpg',
  'busra_paker': '/mps/busra_paker.jpg',
  'can_atalay': '/mps/can_atalay.jpg',
  'cavit_ari': '/mps/cavit_ari.jpg',
  'celal_adan': '/mps/celal_adan.jpg',
  'celal_firat': '/mps/celal_firat.jpg',
  'cemal_enginyurt': '/mps/cemal_enginyurt.jpg',
  'cemalettin_kani_torun': '/mps/cemalettin_kani_torun.jpg',
  'cengiz_candar': '/mps/osman_cengiz_candar.jpg',
  'cengiz_cicek': '/mps/cengiz_cicek.jpg',
  'cevahir_asuman_yazmaci': '/mps/cevahir_asuman_yazmaci.jpg',
  'cicek_otlu': '/mps/cicek_otlu.jpg',
  'cigdem_kilicgun_ucar': '/mps/cigdem_kilicgun_ucar.jpg',
  'cihan_pacaci': '/mps/cihan_pacaci.jpg',
  'cuneyt_yuksel': '/mps/cuneyt_yuksel.jpg',
  'deniz_demir': '/mps/deniz_demir.jpg',
  'deniz_yavuzyilmaz': '/mps/deniz_yavuzyilmaz.jpg',
  'derya_ayaydin': '/mps/derya_ayaydin.jpg',
  'dilan_kunt_ayan': '/mps/dilan_kunt_ayan.jpg',
  'dogan_bekin': '/mps/dogan_bekin.jpg',
  'dogan_demir': '/mps/dogan_demir.jpg',
  'edip_semih_yalcin': '/mps/semih_yalcin.jpg',
  'efkan_ala': '/mps/efkan_ala.jpg',
  'elif_esen': '/mps/elif_esen.jpg',
  'emel_gozukara_durmaz': '/mps/emel_gozukara_durmaz.jpg',
  'emine_yavuz_gozgec': '/mps/emine_yavuz_gozgec.jpg',
  'engin_altay': '/mps/engin_altay.jpg',
  'enis_berberoglu': '/mps/enis_berberoglu.jpg',
  'erdogan_toprak': '/mps/erdogan_toprak.jpg',
  'erkan_akcay': '/mps/erkan_akcay.jpg',
  'erkan_bas': '/mps/erkan_bas.jpg',
  'erkan_kandemir': '/mps/erkan_kandemir.jpg',
  'ersin_beyaz': '/mps/ersin_beyaz.jpg',
  'evrim_rizvanoglu': '/mps/evrim_rizvanoglu.jpg',
  'evrim_rizvanoglu_emir': '/mps/evrim_rizvanoglu.jpg',
  'eylem_ertug_ertugrul': '/mps/eylem_ertug_ertugrul.jpg',
  'faruk_aytek': '/mps/faruk_aytek.jpg',
  'fatih_donmez': '/mps/fatih_donmez.jpg',
  'fatih_erbakan': '/mps/fatih_erbakan.jpg',
  'fatma_oncu': '/mps/fatma_oncu.jpg',
  'ferit_senyasar': '/mps/ferit_senyasar.jpg',
  'fethi_acikel': '/mps/fethi_acikel.jpg',
  'feti_yildiz': '/mps/feti_yildiz.jpg',
  'fevzi_zirhlioglu': '/mps/fevzi_zirhlioglu.jpg',
  'fuat_oktay': '/mps/fuat_oktay.jpg',
  'gamze_akkus_ilgezdi': '/mps/gamze_akkus_ilgezdi.jpg',
  'gamze_tascier': '/mps/gamze_tascier.jpg',
  'gokan_zeybek': '/mps/gokan_zeybek.jpg',
  'gokhan_gunaydin': '/mps/gokhan_gunaydin.jpg',
  'gulcan_kacmaz_sayyigit': '/mps/gulcan_kacmaz_sayyigit.jpg',
  'gulderen_varli': '/mps/gulderen_varli.jpg',
  'hakan_aksu': '/mps/hakan_aksu.jpg',
  'hakki_saruhan_oluc': '/mps/hakki_saruhan_oruc.jpg',
  'hakki_saruhan_oruc': '/mps/hakki_saruhan_oruc.jpg',
  'halis_dalkilic': '/mps/halis_dalkilic.jpg',
  'halit_yerebakan': '/mps/halit_yerebakan.jpg',
  'hasan_basri_sonmez': '/mps/hasan_basri_sonmez.jpg',
  'hasan_ekici': '/mps/hasan_ekici.jpg',
  'hasan_karal': '/mps/hasan_karal.jpg',
  'hasan_ozturk': '/mps/hasan_ozturk.jpg',
  'hasan_toktas': '/mps/hasan_toktas.jpg',
  'hasan_turan': '/mps/hasan_turan.jpg',
  'hikmet_basak': '/mps/hikmet_basak.jpg',
  'hikmet_yalim_halici': '/mps/hikmet_yalim_halici.jpg',
  'hilmi_durgun': '/mps/hilmi_durgun.jpg',
  'hulki_cevizoglu': '/mps/hulki_cevizoglu.jpg',
  'hulusi_senturk': '/mps/hulusi_senturk.jpg',
  'ibrahim_arslan': '/mps/ibrahim_arslan.jpg',
  'ibrahim_ethem_tas': '/mps/ibrahim_ethem_tas.jpg',
  'ibrahim_eyyupoglu': '/mps/ibrahim_eyyupoglu.jpg',
  'ibrahim_ozyavuz': '/mps/ibrahim_ozyavuz.jpg',
  'ibrahim_ufuk_kaynak': '/mps/ibrahim_ufuk_kaynak.jpg',
  'idris_nebi_hatipoglu': '/mps/idris_nebi_hatipoglu.jpg',
  'idris_sahin': '/mps/idris_sahin.jpg',
  'ilhan_kesici': '/mps/ilhan_kesici.jpg',
  'isa_mesih_sahin': '/mps/isa_mesih_sahin.jpg',
  'iskender_bayhan': '/mps/iskender_bayhan.jpg',
  'ismail_caglar_bayirci': '/mps/ismail_caglar_bayirci.jpg',
  'ismail_emrah_karayel': '/mps/ismail_emrah_karayel.jpg',
  'ismail_erdem': '/mps/ismail_erdem.jpg',
  'ismail_faruk_aksu': '/mps/ismail_faruk_aksu.jpg',
  'ismet_buyukataman': '/mps/ismet_buyukataman.jpg',
  'ismet_guneshan': '/mps/ismet_guneshan.jpg',
  'izzet_ulvi_yonter': '/mps/izzet_ulvi_yonter.jpg',
  'jale_nur_sullu': '/mps/jale_nur_sullu.jpg',
  'julide_sarieroglu': '/mps/julide_sarieroglu.jpg',
  'kadri_enis_berberoglu': '/mps/enis_berberoglu.jpg',
  'kamil_aydin': '/mps/kamil_aydin.jpg',
  'kayhan_turkmenoglu': '/mps/kayhan_turkmenoglu.jpg',
  'kayihan_pala': '/mps/kayihan_pala.jpg',
  'kemal_celik': '/mps/kemal_celik.jpg',
  'keziban_konukcu': '/mps/keziban_konukcu.jpg',
  'keziban_konukcu_kok': '/mps/keziban_konukcu.jpg',
  'konur_alp_kocak': '/mps/konur_alp_kocak.jpg',
  'koray_aydin': '/mps/koray_aydin.jpg',
  'kursad_zorlu': '/mps/kursad_zorlu.jpg',
  'kurtcan_celebi': '/mps/kurtcan_celebi.jpg',
  'latif_selvi': '/mps/latif_selvi.jpg',
  'leyla_sahin_usta': '/mps/leyla_sahin_usta.jpg',
  'lutfiye_selva_cam': '/mps/lutfiye_selva_cam.jpg',
  'm_fatih_erbakan': '/mps/fatih_erbakan.jpg',
  'mahmut_dindar': '/mps/mahmut_dindar.jpg',
  'mahmut_ozer': '/mps/mahmut_ozer.jpg',
  'mahmut_tanal': '/mps/mahmut_tanal.jpg',
  'medeni_yilmaz': '/mps/medeni_yilmaz.jpg',
  'mehmet_ali_cevheri': '/mps/mehmet_ali_cevheri.jpg',
  'mehmet_atmaca': '/mps/mehmet_atmaca.jpg',
  'mehmet_baykan': '/mps/mehmet_baykan.jpg',
  'mehmet_bugra_kavuncu': '/mps/bugra_kavuncu.jpg',
  'mehmet_demir': '/mps/mehmet_demir_kutahya.jpg',
  'mehmet_demir_kutahya': '/mps/mehmet_demir_kutahya.jpg',
  'mehmet_emin_oz': '/mps/mehmet_emin_oz.jpg',
  'mehmet_faruk_pinarbasi': '/mps/mehmet_faruk_pinarbasi.jpg',
  'mehmet_onder_aksakal': '/mps/onder_aksakal.jpg',
  'mehmet_said_yaz': '/mps/mehmet_said_yaz.jpg',
  'mehmet_sait_yaz': '/mps/mehmet_said_yaz.jpg',
  'mehmet_satuk_bugra_kavuncu': '/mps/bugra_kavuncu.jpg',
  'mehmet_selim_ensarioglu': '/mps/mehmet_selim_ensarioglu.jpg',
  'mehmet_ugur_gokgoz': '/mps/mehmet_ugur_gokgoz.jpg',
  'meral_danis_bestas': '/mps/meral_danis_bestas.jpg',
  'meryem_goka': '/mps/meryem_goka.jpg',
  'mesut_dogan': '/mps/mesut_dogan.jpg',
  'mevlut_cavusoglu': '/mps/mevlut_cavusoglu.jpg',
  'mevlut_karakaya': '/mps/mevlut_karakaya.jpg',
  'mithat_sancar': '/mps/mithat_sancar.jpg',
  'muammer_avci': '/mps/muammer_avci.jpg',
  'muhammed_ali_fatih_erbakan': '/mps/fatih_erbakan.jpg',
  'muhammet_mufit_aydin': '/mps/muhammet_mufit_aydin.jpg',
  'muharrem_varli': '/mps/muharrem_varli.jpg',
  'murat_alparslan': '/mps/murat_alparslan.jpg',
  'murat_baybatur': '/mps/murat_baybatur.jpg',
  'murat_emir': '/mps/murat_emir.jpg',
  'muserref_pervin_tuba_durgut': '/mps/pervin_tuba_durgut.jpg',
  'mustafa_adiguzel': '/mps/mustafa_adiguzel.jpg',
  'mustafa_cihan_pacaci': '/mps/cihan_pacaci.jpg',
  'mustafa_demir': '/mps/mustafa_demir.jpg',
  'mustafa_erdem': '/mps/mustafa_erdem.jpg',
  'mustafa_hakan_ozer': '/mps/mustafa_hakan_ozer.jpg',
  'mustafa_hamarat': '/mps/mustafa_hamarat.jpg',
  'mustafa_hulki_cevizoglu': '/mps/hulki_cevizoglu.jpg',
  'mustafa_kalayci': '/mps/mustafa_kalayci.jpg',
  'mustafa_kaya': '/mps/mustafa_kaya.jpg',
  'mustafa_kose': '/mps/mustafa_kose.jpg',
  'mustafa_nedim_yamali': '/mps/mustafa_nedim_yamali.jpg',
  'mustafa_sezgin_tanrikulu': '/mps/mustafa_sezgin_tanrikulu.jpg',
  'mustafa_varank': '/mps/mustafa_varank.jpg',
  'mustafa_yavuz': '/mps/mustafa_yavuz.jpg',
  'mustafa_yeneroglu': '/mps/mustafa_yeneroglu.jpg',
  'naci_sanliturk': '/mps/naci_sanliturk.jpg',
  'namik_tan': '/mps/namik_tan.jpg',
  'nilhan_ayan': '/mps/nilhan_ayan.jpg',
  'nimet_ozdemir': '/mps/nimet_ozdemir.jpg',
  'numan_kurtulmus': '/mps/numan_kurtulmus.jpg',
  'nurettin_alan': '/mps/nurettin_alan.jpg',
  'nurhayat_altaca_kayisoglu': '/mps/nurhayat_altaca_kayisoglu.jpg',
  'oguz_kaan_salici': '/mps/oguz_kaan_salici.jpg',
  'oguz_ucuncu': '/mps/oguz_ucuncu.jpg',
  'okan_konuralp': '/mps/okan_konuralp.jpg',
  'omer_celik': '/mps/omer_celik.jpg',
  'omer_ileri': '/mps/omer_ileri.jpg',
  'omer_ocalan': '/mps/omer_ocalan.jpg',
  'onder_aksakal': '/mps/onder_aksakal.jpg',
  'orhan_erdem': '/mps/orhan_erdem.jpg',
  'orhan_saribal': '/mps/orhan_saribal.jpg',
  'orhan_yegin': '/mps/orhan_yegin.jpg',
  'osman_cengiz_candar': '/mps/osman_cengiz_candar.jpg',
  'osman_gokcek': '/mps/osman_gokcek.jpg',
  'osman_mesten': '/mps/osman_mesten.jpg',
  'osman_zabun': '/mps/osman_zabun.jpg',
  'ozgul_saki': '/mps/ozgul_saki.jpg',
  'ozgur_ceylan': '/mps/ozgur_ceylan.jpg',
  'ozgur_karabat': '/mps/ozgur_karabat.jpg',
  'ozgur_ozel': '/mps/ozgur_ozel.jpg',
  'ozlem_zengin': '/mps/ozlem_zengin.jpg',
  'pervin_buldan': '/mps/pervin_buldan.jpg',
  'pervin_tuba_durgut': '/mps/pervin_tuba_durgut.jpg',
  'rabia_ilhan': '/mps/rabia_ilhan.jpg',
  'refik_ozen': '/mps/refik_ozen.jpg',
  'ridvan_uz': '/mps/ridvan_uz.jpg',
  'rukiye_toy': '/mps/rukiye_toy.jpg',
  'rumeysa_kadak': '/mps/rumeysa_kadak.jpg',
  'sadir_durmaz': '/mps/sadir_durmaz.jpg',
  'sadullah_ergin': '/mps/sadullah_ergin.jpg',
  'sadullah_kisacik': '/mps/sadullah_kisacik.jpg',
  'saffet_bozkurt': '/mps/saffet_bozkurt.jpg',
  'saliha_sera_kadigil': '/mps/sera_kadigil.jpg',
  'samil_ayrim': '/mps/samil_ayrim.jpg',
  'seda_goren': '/mps/seda_goren.jpg',
  'selami_altinok': '/mps/selami_altinok.jpg',
  'selim_temurci': '/mps/selim_temurci.jpg',
  'selma_aliye_kavaf': '/mps/selma_aliye_kavaf.jpg',
  'selman_ozboyaci': '/mps/selman_ozboyaci.jpg',
  'semih_yalcin': '/mps/semih_yalcin.jpg',
  'semra_dincer': '/mps/semra_dincer.jpg',
  'sena_nur_celik': '/mps/sena_nur_celik.jpg',
  'sena_nur_celik_kanat': '/mps/sena_nur_celik.jpg',
  'sengul_karsli': '/mps/sengul_karsli.jpg',
  'senol_sunat': '/mps/senol_sunat.jpg',
  'sera_kadigil': '/mps/sera_kadigil.jpg',
  'serafettin_kilic': '/mps/serafettin_kilic.jpg',
  'serap_yazici_ozbudun': '/mps/serap_yazici_ozbudun.jpg',
  'serhat_eren': '/mps/serhat_eren.jpg',
  'serkan_bayram': '/mps/serkan_bayram.jpg',
  'sevan_sivacioglu': '/mps/sevan_sivacioglu.jpg',
  'sevilay_celenk': '/mps/sevilay_celenk.jpg',
  'sevilay_celenk_ozen': '/mps/sevilay_celenk.jpg',
  'seyit_torun': '/mps/seyit_torun.jpg',
  'seyithan_izsiz': '/mps/seyithan_izsiz.jpg',
  'sezgin_tanrikulu': '/mps/mustafa_sezgin_tanrikulu.jpg',
  'sibel_yanikomeroglu': '/mps/sibel_yanikomeroglu.jpg',
  'sinan_ciftyurek': '/mps/sinan_ciftyurek.jpg',
  'suat_ozcagdas': '/mps/suat_ozcagdas.jpg',
  'suat_pamukcu': '/mps/suat_pamukcu.jpg',
  'suleyman_soylu': '/mps/suleyman_soylu.jpg',
  'suna_kepolu_ataman': '/mps/suna_kepolu_ataman.jpg',
  'sunay_karamik': '/mps/sunay_karamik.jpg',
  'sururi_corabatir': '/mps/sururi_corabatir.jpg',
  'tahir_akyurek': '/mps/tahir_akyurek.jpg',
  'tamer_akkal': '/mps/tamer_akkal.jpg',
  'tekin_bingol': '/mps/tekin_bingol.jpg',
  'tuba_vural_cokal': '/mps/tuba_vural_cokal.jpg',
  'tugba_isik_ercan': '/mps/tugba_isik_ercan.jpg',
  'tugrul_turkes': '/mps/tugrul_turkes.jpg',
  'tulay_hatimogullari': '/mps/tulay_hatimogullari.jpg',
  'turan_taskin_ozer': '/mps/turan_taskin_ozer.jpg',
  'turkan_elci': '/mps/turkan_elci.jpg',
  'ugur_poyraz': '/mps/ugur_poyraz.jpg',
  'ulas_karasu': '/mps/ulas_karasu.jpg',
  'ummugulsen_ozturk': '/mps/ummugulsen_ozturk.jpg',
  'umut_akdogan': '/mps/umut_akdogan.jpg',
  'unal_karaman': '/mps/unal_karaman.jpg',
  'utku_cakirozer': '/mps/utku_cakirozer.jpg',
  'vedat_bilgin': '/mps/vedat_bilgin.jpg',
  'yahya_celik': '/mps/yahya_celik.jpg',
  'yasar_yildirim': '/mps/yasar_yildirim.jpg',
  'yildiz_konal_suslu': '/mps/yildiz_konal_suslu.jpg',
  'yucel_arzen': '/mps/yucel_arzen.jpg',
  'yucel_arzen_haciogullari': '/mps/yucel_arzen.jpg',
  'yuksel_arslan': '/mps/yuksel_arslan.jpg',
  'yuksel_mansur_kilinc': '/mps/yuksel_mansur_kilinc.jpg',
  'yuksel_selcuk_turkoglu': '/mps/yuksel_selcuk_turkoglu.jpg',
  'yunus_emre': '/mps/yunus_emre.jpg',
  'zafer_sirakaya': '/mps/zafer_sirakaya.jpg',
  'zehranur_aydemir': '/mps/zehranur_aydemir.jpg',
  'zekeriya_yapicioglu': '/mps/zekeriya_yapicioglu.jpg',
  'zeynel_emre': '/mps/zeynel_emre.jpg',
  'zeynep_yildiz': '/mps/zeynep_yildiz.jpg',
  'ziya_altunyaldiz': '/mps/ziya_altunyildiz.jpg',
  'ziya_altunyildiz': '/mps/ziya_altunyildiz.jpg',
  'zulkuf_ucar': '/mps/zulkuf_ucar.jpg',
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

