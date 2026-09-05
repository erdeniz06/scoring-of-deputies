
const { ALL_MPS } = require('./src/data/mps');

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

all_37.forEach(id => {
  const m = ALL_MPS.find(x => x.id === id);
  console.log(id.padEnd(28), m ? m.photoUrl : 'NOT FOUND');
});
