
const { ALL_MPS, EXPLICIT_CHP_MP_IDS } = require('./src/data/mps');

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

// Target seat counts:
// akp: 280, yeni_parti: 91, dem: 56, mhp: 46, chp: 44, iyi: 26, yeni_yol: 20, bagimsiz: 13, huda_par: 4, yrp: 3, tip: 4, dbp: 2, emep: 2, saadet: 1

// Let us test party overrides
const overrides = {
  'ediz_un': 'chp', // makes chp 44
  'cigdem_kilicgun_ucar': 'dem', // makes dem 56, dbp 2
  'birol_aydin': 'saadet', // makes saadet 1
  'salih_uzun': 'yeni_parti', // user image says YENİ PARTİ
  'yuksel_arslan': 'bagimsiz', // independent
  'haydar_altintas': 'bagimsiz', // DP -> bagimsiz
  'mehmet_asila': 'yrp', // if present
};

// Let us see what the counts are with these overrides
const counts = {};
remaining.forEach(m => {
  let p = m.partyId;
  if (m.id === 'ediz_un') p = 'chp';
  if (overrides[m.id]) p = overrides[m.id];
  counts[p] = (counts[p] || 0) + 1;
});

console.log('Total:', remaining.length);
console.log('Counts:', counts);
