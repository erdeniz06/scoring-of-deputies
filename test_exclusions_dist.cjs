
const { ALL_MPS } = require('./src/data/mps');

const toExclude = new Set([
  'murat_kurum',           // appointed minister
  'can_atalay',            // mandate annulled
  'sibel_yanikomeroglu',   // duplicate of ayse_sibel_yanikomeroglu
  'aysegul_dogan',         // duplicate of aysegul_dogan_dagli
  'fethi_acikel_ist',      // duplicate / erroneous name
  'hasan_sert',            // 27th term
  'mustafa_atas',          // former MP
  'harun_karaca',          // former MP
  'aliseydi_koca',         // not 28th term MP
  'seda_goren_boluk',      // not 28th term MP
  'coskun_cakir',          // former MP
  'ahmet_hamdi_camli',     // 27th term MP
  'iskender_ertus',        // not MP
  'berran_kose',           // not MP
  'nilgun_sayar',          // not MP
  'battal_ilgezdi_vek',    // not MP
  'hasan_kalyoncu_ist',    // 27th term MP
  'ahmet_enes_emiroglu',   // not MP
  'salih_coruh',           // not MP
  'yasin_ozyurt',          // not MP
  'kehime_yildirim',       // non-active
  'sevgi_kilic',           // not 28th term MP
  'sibel_ozdemir',         // 27th term MP
]);

const remaining = ALL_MPS.filter(m => !toExclude.has(m.id));

const counts = {};
remaining.forEach(m => {
  counts[m.partyId] = (counts[m.partyId] || 0) + 1;
});

console.log('Remaining count:', remaining.length);
console.log('Counts:', counts);
