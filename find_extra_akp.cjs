
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

const toExclude = new Set([
  'murat_kurum', 'can_atalay', 'sibel_yanikomeroglu', 'aysegul_dogan',
  'fethi_acikel_ist', 'hasan_sert', 'mustafa_atas', 'harun_karaca',
  'aliseydi_koca', 'seda_goren_boluk', 'coskun_cakir', 'ahmet_hamdi_camli',
  'iskender_ertus', 'berran_kose', 'nilgun_sayar', 'battal_ilgezdi_vek',
  'hasan_kalyoncu_ist', 'ahmet_enes_emiroglu', 'salih_coruh', 'yasin_ozyurt',
  'kehime_yildirim', 'sevgi_kilic', 'sibel_ozdemir'
]);

const remaining = ALL_MPS.filter(m => !toExclude.has(m.id));

const tbmmAllNames = [];
for (const [c, list] of Object.entries(tbmm)) {
  for (const m of list) {
    tbmmAllNames.push(m.name.toLowerCase().replace(/[^a-zçğıöşü]/g, ''));
  }
}

const extraAkp = [];
remaining.filter(m => m.partyId === 'akp').forEach(m => {
  const norm = m.fullName.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, '');
  const found = tbmmAllNames.some(t => t === norm || (t.includes(norm) && norm.length > 5) || (norm.includes(t) && t.length > 5));
  if (!found) {
    extraAkp.push(m);
  }
});

console.log('Extra AKP MPs not in official TBMM list (' + extraAkp.length + '):');
extraAkp.forEach(m => console.log('  ', m.id, m.fullName, m.province));
