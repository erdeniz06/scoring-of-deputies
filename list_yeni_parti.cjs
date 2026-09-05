
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

const overrides = {
  'ediz_un': 'chp',                // chp 44
  'cigdem_kilicgun_ucar': 'dem',   // dem 56, dbp 2
  'birol_aydin': 'saadet',         // saadet 1
  'salih_uzun': 'yeni_parti',      // user image
  'yuksel_arslan': 'bagimsiz',     // independent
  'haydar_altintas': 'bagimsiz',   // DP -> bagimsiz
  'suat_pamukcu': 'yrp',           // YRP 3
  'perihan_koca': 'tip',           // TİP 4
  'unal_karaman': 'bagimsiz',      // independent
  'mustafa_bilici': 'akp',         // in user image Mustafa Bilici is AK PARTİ!
  'seda_kaya_osen': 'yeni_parti',  // in user image Seda Kaya Ösen is YENİ PARTİ!
  'mehmet_karaman': 'yeni_yol',    // in user image Mehmet Karaman is YENİ YOL!
  'mustafa_yeneroglu': 'bagimsiz', // official bagimsiz
  'selim_temurci': 'bagimsiz',     // official bagimsiz
  'seyithan_izsiz': 'akp',         // joined AK Parti
  'irfan_karatutlu': 'yeni_yol',   // DEVA / Yeni Yol
};

const ypList = remaining.filter(m => {
  let p = m.partyId;
  if (m.id === 'ediz_un') p = 'chp';
  if (overrides[m.id]) p = overrides[m.id];
  return p === 'yeni_parti';
});

console.log('Total in yeni_parti (' + ypList.length + '):');
ypList.forEach(m => console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.province));
