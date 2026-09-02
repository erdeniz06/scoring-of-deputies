// Central dictionary of local MP portraits
export const MP_LOCAL_PHOTOS: Record<string, string> = {
  // Adana
  omer_celik: '/mps/omer_celik.jpg',
  burhanettin_bulut: '/mps/burhanettin_bulut.jpg',
  muzeyyen_sevkin: '/mps/muzeyyen_sevkin.jpg',
  muharrem_varli: '/mps/muharrem_varli.jpg',
  ayse_sibel_ersoy: '/mps/ayse_sibel_ersoy.jpg',
  tulay_hatimogullari: '/mps/tulay_hatimogullari.jpg',
  tulay_hatimogullari_oruc: '/mps/tulay_hatimogullari.jpg',
  tulay_hatimo_oruc: '/mps/tulay_hatimogullari.jpg',
  abdullah_dogru: '/mps/abdullah_dogru.jpg',

  // Istanbul & Leaders
  numan_kurtulmus: '/mps/numan_kurtulmus.jpg',
  erkan_bas: '/mps/erkan_bas.jpg',
  ahmet_sik: '/mps/ahmet_sik.jpg',
  fatih_erbakan: '/mps/fatih_erbakan.jpg',
  m_fatih_erbakan: '/mps/fatih_erbakan.jpg',
  engin_altay: '/mps/engin_altay.jpg',
  erdogan_toprak: '/mps/erdogan_toprak.jpg',
  cemal_enginyurt: '/mps/cemal_enginyurt.jpg',
  namik_tan: '/mps/namik_tan.jpg',
  gokhan_gunaydin: '/mps/gokhan_gunaydin.jpg',
  gamze_akkus_ilgezdi: '/mps/gamze_akkus_ilgezdi.png',
  ilhan_kesici: '/mps/ilhan_kesici.png',
  enis_berberoglu: '/mps/enis_berberoglu.jpg',
  kadri_enis_berberoglu: '/mps/enis_berberoglu.jpg',
  cigdem_kilicgun_ucar: '/mps/cigdem_kilicgun_ucar.jpg',
  celal_adan: '/mps/celal_adan.jpg',
  semih_yalcin: '/mps/semih_yalcin.jpg',
  edip_semih_yalcin: '/mps/semih_yalcin.jpg',
  feti_yildiz: '/mps/feti_yildiz.jpg',
  mustafa_yeneroglu: '/mps/mustafa_yeneroglu.jpg',
  onder_aksakal: '/mps/onder_aksakal.jpg',
  mehmet_onder_aksakal: '/mps/onder_aksakal.jpg',
  bugra_kavuncu: '/mps/bugra_kavuncu.jpg',
  mehmet_bugra_kavuncu: '/mps/bugra_kavuncu.jpg',
  hulki_cevizoglu: '/mps/hulki_cevizoglu.jpg',
  mustafa_hulki_cevizoglu: '/mps/hulki_cevizoglu.jpg',
  birol_aydin: '/mps/birol_aydin.jpg',
  bulent_kaya: '/mps/bulent_kaya.jpg',
  elif_esen: '/mps/elif_esen.jpg',
  iskender_bayhan: '/mps/iskender_bayhan.jpg',
  cengiz_cicek: '/mps/cengiz_cicek.jpg',
  cicek_otlu: '/mps/cicek_otlu.jpg',
  evrim_rizvanoglu: '/mps/evrim_rizvanoglu.jpg',
  hasan_karal: '/mps/hasan_karal.jpg',
  hasan_turan: '/mps/hasan_turan.jpg',
  mustafa_kaya: '/mps/mustafa_kaya.jpg',
  cihan_pacaci: '/mps/cihan_pacaci.jpg',
  mustafa_cihan_pacaci: '/mps/cihan_pacaci.jpg',
  ali_gokcek: '/mps/ali_gokcek.jpg',
  sibel_yanikomeroglu: '/mps/sibel_yanikomeroglu.jpg',
  ayse_sibel_yanikomeroglu: '/mps/sibel_yanikomeroglu.jpg',
  nimet_ozdemir: '/mps/nimet_ozdemir.jpg',
  erkan_kandemir: '/mps/erkan_kandemir.jpg',
  halit_yerebakan: '/mps/halit_yerebakan.jpg',
  ersagun_yucel: '/mps/ersagun_yucel.jpg',
  ahmet_ersagun_yucel: '/mps/ersagun_yucel.jpg',
  bayram_senocak: '/mps/bayram_senocak.jpg',
  burak_akburak: '/mps/burak_akburak.jpg',
  cuneyt_yuksel: '/mps/cuneyt_yuksel.jpg',
  dogan_bekin: '/mps/dogan_bekin.jpg',
  fethi_acikel: '/mps/fethi_acikel.jpg',
  isa_mesih_sahin: '/mps/isa_mesih_sahin.jpg',
  ismail_emrah_karayel: '/mps/ismail_emrah_karayel.jpg',
  keziban_konukcu: '/mps/keziban_konukcu.jpg',
  medeni_yilmaz: '/mps/medeni_yilmaz.jpg',
  mehmet_selim_ensarioglu: '/mps/mehmet_selim_ensarioglu.jpg',

  // Mersin & Eskisehir
  ali_mahir_basarir: '/mps/ali_mahir_basarir.jpg',
  aysen_gurcan: '/mps/aysen_gurcan.jpg',
  fatih_donmez: '/mps/fatih_donmez.jpg',
  ibrahim_arslan: '/mps/ibrahim_arslan.jpg',
  idris_nebi_hatipoglu: '/mps/idris_nebi_hatipoglu.jpg',
  jale_nur_sullu: '/mps/jale_nur_sullu.png',
  utku_cakirozer: '/mps/utku_cakirozer.png',
};

export function resolveMpPhoto(mpId: string, customUrl?: string): string | undefined {
  if (mpId && MP_LOCAL_PHOTOS[mpId]) {
    return MP_LOCAL_PHOTOS[mpId];
  }
  if (mpId) {
    const normalized = mpId.toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (MP_LOCAL_PHOTOS[normalized]) {
      return MP_LOCAL_PHOTOS[normalized];
    }
  }
  if (customUrl && customUrl.trim().length > 0 && !customUrl.includes('unsplash.com')) {
    return customUrl;
  }
  return (mpId && MP_LOCAL_PHOTOS[mpId]) || customUrl;
}
