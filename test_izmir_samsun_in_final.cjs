
const { ALL_MPS } = require('./src/data/mps');

const toExclude = new Set([
  'murat_kurum', 'can_atalay', 'sibel_yanikomeroglu', 'aysegul_dogan',
  'fethi_acikel_ist', 'hasan_sert', 'mustafa_atas', 'harun_karaca',
  'aliseydi_koca', 'seda_goren_boluk', 'coskun_cakir', 'ahmet_hamdi_camli',
  'iskender_ertus', 'berran_kose', 'nilgun_sayar', 'battal_ilgezdi_vek',
  'hasan_kalyoncu_ist', 'ahmet_enes_emiroglu', 'salih_coruh', 'yasin_ozyurt',
  'kehime_yildirim', 'sevgi_kilic', 'sibel_ozdemir', 'tuba_durgut',
  'mustafa_arslan_tokat'
]);

const remaining = ALL_MPS.filter(m => !toExclude.has(m.id));

const izmir = remaining.filter(m => m.province === 'İzmir');
const samsun = remaining.filter(m => m.province === 'Samsun');

console.log('İzmir count in remaining:', izmir.length, '(expected: 28)');
console.log('Samsun count in remaining:', samsun.length, '(expected: 9)');

const all_37 = [
    'musavat_dervisoglu', 'yuksel_taskin', 'tuncay_ozkan', 'sevda_erdan_kilic',
    'murat_bakan', 'ednan_arslan', 'seda_kaya_osen', 'haydar_altintas',
    'mehmet_kasapoglu', 'mahmut_atilla_kaya', 'sebnem_bursali', 'mehmet_ali_celebi',
    'umit_ozlale', 'burcugul_cubuk', 'gokce_gokcen', 'rifat_turuntay_nalbantoglu',
    'rahmi_askin_tureli', 'mahir_polat', 'salih_uzun', 'deniz_yucel',
    'mustafa_bilici', 'eyyup_kadir_inan', 'alpay_ozalan', 'ceyda_bolunmez_cankiri',
    'yasar_kirkpinar', 'tamer_osmanagaoglu', 'husmen_kirkpinar', 'ibrahim_akin',
    'cigdem_karaaslan', 'erhan_usta', 'ersan_aksu', 'ilyas_topsakal',
    'mehmet_karaman', 'mehmet_mus', 'murat_can', 'orhan_kircali', 'yusuf_ziya_yilmaz'
];

const remIds = new Set(remaining.map(m => m.id));
const missing = all_37.filter(id => !remIds.has(id));
console.log('Any of the 37 missing?', missing);
