
const { ALL_MPS } = require('./src/data/mps');

// Let us find the exact 25 IDs to put in VACANT_OR_DUPLICATE_IDS:
// 1. murat_kurum (appointed minister)
// 2. can_atalay (annulled)
// 3. sibel_yanikomeroglu (duplicate of ayse_sibel_yanikomeroglu)
// 4. aysegul_dogan (duplicate of aysegul_dogan_dagli)
// 5. fethi_acikel_ist (duplicate)
// 6. hasan_sert (27th term)
// 7. mustafa_atas (former MP)
// 8. harun_karaca (former MP)
// 9. aliseydi_koca (not 28th term MP)
// 10. seda_goren_boluk (not 28th term MP)
// 11. coskun_cakir (former MP)
// 12. ahmet_hamdi_camli (27th term MP)
// 13. iskender_ertus (not MP)
// 14. berran_kose (not MP)
// 15. nilgun_sayar (not MP)
// 16. battal_ilgezdi_vek (not MP)
// 17. hasan_kalyoncu_ist (27th term MP)
// 18. ahmet_enes_emiroglu (not MP)
// 19. salih_coruh (not MP)
// 20. yasin_ozyurt (not MP)
// 21. kehime_yildirim (non-active)
// 22. sevgi_kilic (not 28th term MP)
// 23. sibel_ozdemir (27th term MP)
// 24. tuba_durgut (duplicate/inactive)
// 25. ozlem_zengin (if duplicate with tokat)

console.log('Total original:', ALL_MPS.length);
