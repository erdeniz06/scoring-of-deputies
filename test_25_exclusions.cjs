
const { ALL_MPS } = require('./src/data/mps');

const toExclude = new Set([
  'murat_kurum',           // 1. appointed minister
  'can_atalay',            // 2. mandate annulled
  'sibel_yanikomeroglu',   // 3. duplicate of ayse_sibel_yanikomeroglu
  'aysegul_dogan',         // 4. duplicate of aysegul_dogan_dagli
  'fethi_acikel_ist',      // 5. duplicate / erroneous name
  'hasan_sert',            // 6. 27th term
  'mustafa_atas',          // 7. former MP
  'harun_karaca',          // 8. former MP
  'aliseydi_koca',         // 9. not 28th term MP
  'seda_goren_boluk',      // 10. not 28th term MP
  'coskun_cakir',          // 11. former MP
  'ahmet_hamdi_camli',     // 12. 27th term MP
  'iskender_ertus',        // 13. not MP
  'berran_kose',           // 14. not MP
  'nilgun_sayar',          // 15. not MP
  'battal_ilgezdi_vek',    // 16. not MP
  'hasan_kalyoncu_ist',    // 17. 27th term MP
  'ahmet_enes_emiroglu',   // 18. not MP
  'salih_coruh',           // 19. not MP
  'yasin_ozyurt',          // 20. not MP
  'kehime_yildirim',       // 21. non-active
  'sevgi_kilic',           // 22. not 28th term MP
  'sibel_ozdemir',         // 23. 27th term MP
  'tuba_durgut',           // 24. inactive
  'mustafa_arslan_tokat',  // 25. duplicate
]);

console.log('Exclusion count:', toExclude.size);
const remaining = ALL_MPS.filter(m => !toExclude.has(m.id));
console.log('Remaining count:', remaining.length);

const counts = {};
remaining.forEach(m => {
  counts[m.partyId] = (counts[m.partyId] || 0) + 1;
});
console.log('Counts:', counts);
