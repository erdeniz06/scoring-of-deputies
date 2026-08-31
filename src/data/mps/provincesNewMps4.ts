import { MP } from '../../types';

export const PROVINCES_NEW_MPS_4: MP[] = [
  // ==========================================
  // ARDAHAN
  // ==========================================
  {
    id: 'kaan_koc',
    fullName: 'Kaan Koç',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Ardahan',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Ardahan Milletvekili & TBMM Bayındırlık Komisyonu Üyesi',
    bio: 'İnşaat mühendisi, AK Parti Ardahan eski İl Başkanı. 28. Dönem TBMM Ardahan Milletvekili.',
    stances: {}
  },
  {
    id: 'ozgur_erdem_incesu',
    fullName: 'Özgür Erdem İncesu',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Ardahan',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Ardahan Milletvekili & İktisatçı',
    bio: 'İktisatçı, uluslararası ticaret uzmanı. 28. Dönem TBMM Ardahan Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_oei_kurultay',
        mpId: 'ozgur_erdem_incesu',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Değişim ve Yenilenme Sürecini Destekledi',
        overallSummary: 'Kurultay sürecinde partinin dinamik ve güçlü bir iktidar vizyonuna kavuşmasını savundu.',
        keyParaphrasedQuote: 'CHP halkın umudunu tazeleyerek yerel ve genel iktidara yürüyecektir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // ARTVİN
  // ==========================================
  {
    id: 'faruk_celik',
    fullName: 'Faruk Çelik',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Artvin',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Artvin Milletvekili & Eski Bakan',
    bio: 'Eğitimci, eski Çalışma ve Sosyal Güvenlik Bakanı, eski Gıda Tarım ve Hayvancılık Bakanı. 21, 22, 23, 24, 26 ve 28. Dönem TBMM Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_fc_infaz',
        mpId: 'faruk_celik',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'destekledi',
        stanceLabel: 'Sosyal Denge ve Adalet Düzenlemeleri',
        overallSummary: 'Hükümetin yargı reformları ve kamu düzenini sağlayan yasal düzenlemelerini destekledi.',
        keyParaphrasedQuote: 'Toplumsal huzur ve adalet terazisini koruyacak reformları sürdürüyoruz.',
        lastUpdated: '2023',
        sources: []
      }
    }
  },
  {
    id: 'ugur_bayraktutan',
    fullName: 'Uğur Bayraktutan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Artvin',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Artvin Milletvekili & TBMM Milli Savunma Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, eski Artvin Barosu Başkanı. 24, 25, 26, 27 ve 28. Dönem TBMM Artvin Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_ub_sokak',
        mpId: 'ugur_bayraktutan',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Yaşam Hakkı İhlaline Karşı Çıktı',
        overallSummary: 'Hayvanların itlaf edilmesine karşı çıkarak barınak ve kısırlaştırma bütçelerinin artırılmasını savundu.',
        keyParaphrasedQuote: 'Her canlının yaşama hakkı kutsaldır, meclis katliam yasası çıkaramaz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // AYDIN
  // ==========================================
  {
    id: 'bulent_tezcan',
    fullName: 'Bülent Tezcan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Aydın Milletvekili & Eski TBMM Başkanvekili - Genel Başkan Yardımcısı',
    bio: 'Hukukçu, avukat. 24, 25, 26, 27 ve 28. Dönem TBMM Aydın Milletvekili. Eski CHP Genel Başkan Yardımcısı ve Parti Sözcüsü.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_bt_kurultay',
        mpId: 'bulent_tezcan',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Değişim Hareketinin Öncülerinden Oldu',
        overallSummary: 'Kurultay sürecinde değişim bildirisini ve Özgür Özel’in genel başkanlığını ilk destekleyen isimlerden biri oldu.',
        keyParaphrasedQuote: 'Partimizin köklü bir yenilenmeyle iktidar seçeneği oluşturması kaçınılmazdır.',
        lastUpdated: 'Kasım 2023',
        sources: []
      },
      'kayyum_uygulamalari': {
        id: 'st_bt_kayyum',
        mpId: 'bulent_tezcan',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Anayasal Seçme Hakkı Gaspı',
        overallSummary: 'Kayyum uygulamalarının yerel demokrasiyi ve halkın oy verme hakkını fiilen yok ettiğini savundu.',
        keyParaphrasedQuote: 'Millet iradesine kayyum darbesi vurulamaz.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'huseyin_yildiz',
    fullName: 'Hüseyin Yıldız',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Aydın Milletvekili & TBMM KİT Komisyonu Üyesi',
    bio: 'İş insanı, maliye uzmanı. 25, 26, 27 ve 28. Dönem TBMM Aydın Milletvekili.',
    stances: {}
  },
  {
    id: 'suleyman_bulbul',
    fullName: 'Süleyman Bülbül',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Aydın Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, CHP Yüksek Disiplin Kurulu Üyesi. 27. ve 28. Dönem TBMM Aydın Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_sb_infaz',
        mpId: 'suleyman_bulbul',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Yargı Bağımsızlığı ve Ceza Adaleti Eleştirisi',
        overallSummary: 'İnfaz paketlerindeki adaletsizlikleri ve siyasi suçlar ile adli suçlar arasındaki çifte standardı eleştirdi.',
        keyParaphrasedQuote: 'Hukuk devletinde adalet herkes için eşit ve öngörülebilir olmalıdır.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      }
    }
  },
  {
    id: 'evrim_karakoz',
    fullName: 'Evrim Karakoz',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Aydın Milletvekili & Hukukçu',
    bio: 'Hukukçu, avukat, Aydın Büyükşehir Belediye Meclisi eski Başkanvekili. 28. Dönem TBMM Aydın Milletvekili.',
    stances: {}
  },
  {
    id: 'mustafa_savas',
    fullName: 'Mustafa Savaş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Aydın Milletvekili & TBMM KİT Komisyonu Başkanı',
    bio: 'Bankacı, iktisatçı, eski Halkbank Genel Müdür Yardımcısı. 26, 27 ve 28. Dönem TBMM Aydın Milletvekili.',
    stances: {}
  },
  {
    id: 'seda_saribas',
    fullName: 'Seda Sarıbaş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Aydın Milletvekili & MKYK Üyesi',
    bio: 'İş kadını, sosyolog, AK Parti Genel Merkez Kadın Kolları MKYK Üyesi. 28. Dönem TBMM Aydın Milletvekili.',
    stances: {}
  },
  {
    id: 'omer_ozmen',
    fullName: 'Ömer Özmen',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Aydın Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, AK Parti Aydın eski İl Başkanı. 28. Dönem TBMM Aydın Milletvekili.',
    stances: {}
  },
  {
    id: 'omer_karakas',
    fullName: 'Ömer Karakaş',
    partyId: 'akp',
    electedPartyId: 'iyi',
    province: 'Aydın',
    photoUrl: '',
    term: '28. Dönem (İYİ Parti’den AK Parti’ye Katıldı)',
    title: 'AK Parti Aydın Milletvekili & İş İnsanı',
    bio: 'Kamu yöneticisi, iş insanı. 28. Dönem Aydın Milletvekili (İYİ Parti’den seçilmiş olup bilahare AK Parti’ye katılmıştır).',
    stances: {}
  },

  // ==========================================
  // BALIKESİR
  // ==========================================
  {
    id: 'ismail_ok',
    fullName: 'İsmail Ok',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Balıkesir Milletvekili & Eski Balıkesir Belediye Başkanı',
    bio: 'Kimya öğretmeni, eski Balıkesir Belediye Başkanı. 25, 26, 27 ve 28. Dönem TBMM Milletvekili.',
    stances: {}
  },
  {
    id: 'belgin_uygur',
    fullName: 'Belgin Uygur',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Genel Başkan Yardımcısı & Balıkesir Milletvekili',
    bio: 'Hukukçu, avukat. AK Parti Sivil Toplum ve Halkla İlişkilerden Sorumlu Genel Başkan Yardımcısı. 27. ve 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {}
  },
  {
    id: 'mustafa_canbey',
    fullName: 'Dr. Mustafa Canbey',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Balıkesir Milletvekili & TBMM Dijital Mecralar Komisyonu Üyesi',
    bio: 'İletişim uzmanı (Doktora), gazeteci, yazar. 27. ve 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {}
  },
  {
    id: 'ali_taylan_oztaylan',
    fullName: 'Ali Taylan Öztaylan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Balıkesir Milletvekili & TBMM Dışişleri Komisyonu Üyesi',
    bio: 'Siyaset bilimci, iktisatçı. 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {}
  },
  {
    id: 'ensar_aytekin',
    fullName: 'Ensar Aytekin',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Genel Başkan Yardımcısı & Balıkesir Milletvekili',
    bio: 'Mali müşavir, iktisatçı. CHP Örgüt Yönetiminden Sorumlu Genel Başkan Yardımcısı. 27. ve 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_ea_kurultay',
        mpId: 'ensar_aytekin',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişim Hareketini Destekledi',
        overallSummary: 'Kurultayda değişim ekibinde yer alarak parti örgütünden sorumlu genel başkan yardımcılığı görevine seçildi.',
        keyParaphrasedQuote: 'CHP örgütleri yenilenen kadrolarıyla Türkiye’nin umudu olmaya devam edecektir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'serkan_sari',
    fullName: 'Serkan Sarı',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Balıkesir Milletvekili & Eczacı',
    bio: 'Eczacı, CHP Balıkesir eski İl Başkanı. 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_ssa_sokak',
        mpId: 'serkan_sari',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ötanaziye Karşı Yaşam Hakkı',
        overallSummary: 'Sokak hayvanlarının katledilmesine yol açacak düzenlemelere karşı çıktı.',
        keyParaphrasedQuote: 'Sorunun çözümü can almak değil, etkin kısırlaştırma ve çağdaş bakımevleridir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'burak_dalgin',
    fullName: 'Burak Dalgın',
    partyId: 'iyi',
    electedPartyId: 'chp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem (DEVA Kurucusuydu, İYİ Parti’ye Katıldı)',
    title: 'İYİ Parti Balıkesir Milletvekili & Teknoloji Girişimcisi',
    bio: 'Makine mühendisi, yatırımcı, eski DEVA Partisi Genel Başkan Yardımcısı. 28. Dönem Balıkesir Milletvekili (Bilahare İYİ Parti’ye katılmıştır).',
    stances: {}
  },
  {
    id: 'ekrem_gokay_yuksel',
    fullName: 'Ekrem Gökay Yüksel',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Balıkesir Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, MHP Balıkesir eski İl Başkanı. 28. Dönem TBMM Balıkesir Milletvekili.',
    stances: {}
  },
  {
    id: 'turhan_comez',
    fullName: 'Op. Dr. Turhan Çömez',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Balıkesir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'İYİ Parti TBMM Grup Başkanvekili & Balıkesir Milletvekili',
    bio: 'Genel cerrah, eski Cumhurbaşkanlığı Başdanışmanı (22. Dönem AKP). 28. Dönem Balıkesir Milletvekili ve İYİ Parti TBMM Grup Başkanvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_tc_sokak',
        mpId: 'turhan_comez',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'elestirdi',
        stanceLabel: 'Plansızlık ve Bilim Dışı Uygulamaları Eleştirdi',
        overallSummary: 'İktidarın 20 yıldır kısırlaştırma yapmayıp faturayı canlara kestiğini belirterek kapsamlı veterinerlik seferberliği önerdi.',
        keyParaphrasedQuote: 'Hem sokakları çocuklarımız için güvenli hale getirmek hem de hayvanları yaşatmak mümkündür.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      '2024_iyi_parti_kurultay': {
        id: 'st_tc_kurultay',
        mpId: 'turhan_comez',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Müsavat Dervişoğlu Yönetiminde Grup Başkanvekili',
        overallSummary: 'Kurultay sonrasında partinin meclis grup yönetiminde etkin görev aldı.',
        keyParaphrasedQuote: 'İYİ Parti milletin hakiki sesi ve dertlerinin takipçisi olmaya devam edecektir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // BARTIN
  // ==========================================
  {
    id: 'yusuf_ziya_aldatmaz',
    fullName: 'Yusuf Ziya Aldatmaz',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Bartın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Bartın Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'İktisatçı, iş insanı, AK Parti Bartın eski İl Başkanı. 28. Dönem TBMM Bartın Milletvekili.',
    stances: {}
  },
  {
    id: 'aysu_bankoglu',
    fullName: 'Aysu Bankoğlu',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Bartın',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Bartın Milletvekili & TBMM Anayasa Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, CHP eski Genel Başkan Yardımcısı (Tanıtım ve Halkla İlişkiler). 27. ve 28. Dönem TBMM Bartın Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ab_infaz',
        mpId: 'aysu_bankoglu',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Adalet Sistemindeki Çifte Standardı Eleştirdi',
        overallSummary: 'Düşünce suçlularının cezaevinde tutulup organize suçluların tahliye edilmesine itiraz etti.',
        keyParaphrasedQuote: 'Adalet saraylarında adalet kalmadığının en açık kanıtı bu infaz paketleridir.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      },
      '2023_kk_oo_kurultay': {
        id: 'st_ab_kurultay',
        mpId: 'aysu_bankoglu',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'notr_cekimser',
        stanceLabel: 'MYK ve Kurumsal Görevleri Yürüttü',
        overallSummary: 'Kurultay sürecinde MYK üyesi olarak tarafsız kurumsal görevini sürdürdü.',
        keyParaphrasedQuote: 'Cumhuriyet Halk Partisi’nin her kurultayı demokrasi şölenidir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // BATMAN
  // ==========================================
  {
    id: 'keskin_bayindir',
    fullName: 'Keskin Bayındır',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Batman',
    photoUrl: '',
    term: '28. Dönem',
    title: 'Demokratik Bölgeler Partisi (DBP) Eş Genel Başkanı & Batman Milletvekili',
    bio: 'Eğitimci, sendikacı (Eğitim-Sen). Demokratik Bölgeler Partisi (DBP) Eş Genel Başkanı. 28. Dönem TBMM Batman Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_kb_kayyum',
        mpId: 'keskin_bayindir',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Batman’da Kayyuma Karşı Sokak Direnişi',
        overallSummary: 'Batman Belediyesine atanan kayyuma karşı halkla birlikte meydanlarda direniş çağrısı yaptı.',
        keyParaphrasedQuote: 'Batman halkı iradesine sahip çıkacak, kayyumlar yenilecektir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_kb_cerceve',
        mpId: 'keskin_bayindir',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Demokratik Çözüm ve Muhataplık Vurgusu',
        overallSummary: 'Kürt sorununun çözümü için Abdullah Öcalan üzerindeki tecridin kaldırılması gerektiğini savundu.',
        keyParaphrasedQuote: 'Gerçek bir barış ancak muhataplarıyla diyalog kurularak sağlanabilir.',
        lastUpdated: 'Ekim 2024',
        sources: []
      }
    }
  },
  {
    id: 'zeynep_oduncu',
    fullName: 'Zeynep Oduncu',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Batman',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti Batman Milletvekili & Kadın Hakları Aktivisti',
    bio: 'Siyasetçi, yerel yönetimler uzmanı, eski Gercüş Belediye Eş Başkanı. 28. Dönem TBMM Batman Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_zo_kayyum',
        mpId: 'zeynep_oduncu',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Eş Başkanlık ve Kadın İradesi Savunusu',
        overallSummary: 'Kayyumların ilk hedefinin eş başkanlık ve kadın merkezleri olduğunu vurgulayarak kayyumu reddetti.',
        keyParaphrasedQuote: 'Kadınların ve halkın seçilmiş iradesini teslim alamazsınız.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'mehmet_rustu_tiryaki',
    fullName: 'Mehmet Rüştü Tiryaki',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Batman',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti Batman Milletvekili & YSK Temsilcisi',
    bio: 'Hukukçu, avukat, DEM Parti Yüksek Seçim Kurulu (YSK) Temsilcisi. 27. ve 28. Dönem TBMM Batman Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_mrt_kayyum',
        mpId: 'mehmet_rustu_tiryaki',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Seçim Hukuku ve Meşruiyet Eleştirisi',
        overallSummary: 'YSK tarafından adaylığı onaylanmış başkanların mahkeme kararı olmaksızın idari kararla görevden alınmasını anayasa ihlali ilan etti.',
        keyParaphrasedQuote: 'Seçime girmesine izin verdiğiniz insanı seçildikten sonra görevden almak seçmeni yok saymaktır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'ferhat_nasiroglu',
    fullName: 'Ferhat Nasıroğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Batman',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Batman Milletvekili & TBMM Sanayi Komisyonu Üyesi',
    bio: 'Maden mühendisi, sanayici, iş insanı (Fernas Şirketler Grubu). 28. Dönem TBMM Batman Milletvekili.',
    stances: {}
  },
  {
    id: 'serkan_ramanli',
    fullName: 'Serkan Ramanlı',
    partyId: 'hudapar',
    electedPartyId: 'akp',
    province: 'Batman',
    photoUrl: '',
    term: '28. Dönem (AK Parti Listesinden Seçildi)',
    title: 'HÜDA PAR Genel Başkan Yardımcısı / Sözcüsü & Batman Milletvekili',
    bio: 'Hukukçu, avukat, HÜDA PAR Genel Başkan Yardımcısı ve Parti Sözcüsü. 28. Dönem TBMM Batman Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_sr_cerceve',
        mpId: 'serkan_ramanli',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Kürt Meselesinde Adalet ve Anayasal Tanınma',
        overallSummary: 'Kürt meselesinin temel haklar, anadilde eğitim ve adalet ekseninde çözülmesi gerektiğini savundu.',
        keyParaphrasedQuote: 'Kürt meselesi silah ve şiddetten arındırılmalı, temel insani haklar şartsız tanınmalıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // BAYBURT
  // ==========================================
  {
    id: 'orhan_ates',
    fullName: 'Prof. Dr. Orhan Ateş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Bayburt',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Bayburt Milletvekili & Göz Hastalıkları Uzmanı',
    bio: 'Tıp doktoru, akademisyen (Profesör Doktor - Göz hastalıkları cerrahı). 28. Dönem TBMM Bayburt Milletvekili.',
    stances: {}
  },

  // ==========================================
  // EDİRNE
  // ==========================================
  {
    id: 'ediz_un',
    fullName: 'Ediz Ün',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Edirne',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Edirne Milletvekili & Ziraat Mühendisi',
    bio: 'Ziraat mühendisi, tarım işletmecisi. 28. Dönem TBMM Edirne Milletvekili.',
    stances: {}
  },
  {
    id: 'ahmet_baran_yazgan',
    fullName: 'Ahmet Baran Yazgan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Edirne',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Edirne Milletvekili & TBMM Sanayi Komisyonu Üyesi',
    bio: 'İş insanı, Edirne Ticaret ve Sanayi Odası eski Meclis Üyesi. 28. Dönem TBMM Edirne Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_aby_kurultay',
        mpId: 'ahmet_baran_yazgan',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişim Ekibini Destekledi',
        overallSummary: 'Kurultayda değişimi destekleyerek Trakya’da gençleşen CHP vizyonuna katkı sundu.',
        keyParaphrasedQuote: 'CHP’deki yenilenme rüzgarı tüm Türkiye’yi saracak.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'fatma_aksal',
    fullName: 'Dr. Fatma Aksal',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Edirne',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Edirne Milletvekili & TBMM KEFEK eski Başkanı',
    bio: 'Ekonomist (Doktora), AK Parti MKYK Üyesi, eski TBMM Kadın Erkek Fırsat Eşitliği Komisyonu Başkanı. 27. ve 28. Dönem TBMM Edirne Milletvekili.',
    stances: {}
  },
  {
    id: 'mehmet_akalin',
    fullName: 'Prof. Dr. Mehmet Akalın',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Edirne',
    photoUrl: '',
    term: '28. Dönem',
    title: 'İYİ Parti Edirne Milletvekili & Genel Başkan Yardımcısı',
    bio: 'Tekstil mühendisi, akademisyen (Profesör Doktor). İYİ Parti Türk Dünyası ve Yurtdışı Teşkilatlanmadan Sorumlu Genel Başkan Yardımcısı. 28. Dönem TBMM Edirne Milletvekili.',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_ma_kurultay',
        mpId: 'mehmet_akalin',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Müsavat Dervişoğlu’nu Destekledi',
        overallSummary: 'Kurultayda Müsavat Dervişoğlu ekibinde yer alarak Genel Başkan Yardımcılığına seçildi.',
        keyParaphrasedQuote: 'İYİ Parti Türk milliyetçiliğinin ve vatanseverlerin kalesidir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // ELAZIĞ
  // ==========================================
  {
    id: 'erol_keles',
    fullName: 'Prof. Dr. Erol Keleş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Elazığ',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Elazığ Milletvekili & Tıp Profesörü',
    bio: 'Kulak Burun Boğaz uzmanı, Fırat Üniversitesi Tıp Fakültesi eski Başhekimi. 28. Dönem TBMM Elazığ Milletvekili.',
    stances: {}
  },
  {
    id: 'ejder_acikkapi',
    fullName: 'Ejder Açıkkapı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Elazığ',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Elazığ Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'İktisatçı, AK Parti Elazığ eski İl Başkanı. 26. ve 28. Dönem TBMM Elazığ Milletvekili.',
    stances: {}
  },
  {
    id: 'mahmut_ridvan_nazirli',
    fullName: 'Mahmut Rıdvan Nazırlı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Elazığ',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Elazığ Milletvekili & TBMM Dışişleri Komisyonu Üyesi',
    bio: 'Uluslararası ticaret uzmanı, siyaset bilimci. 28. Dönem TBMM Elazığ Milletvekili.',
    stances: {}
  },
  {
    id: 'gursel_erol',
    fullName: 'Gürsel Erol',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Elazığ',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Elazığ Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'İş insanı, CHP Tunceli ve Elazığ eski İl Başkanlıkları, 26. Dönem Tunceli, 27 ve 28. Dönem Elazığ Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_ge_kurultay',
        mpId: 'gursel_erol',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Parti İçi Birlik ve Taban İradesini Vurguladı',
        overallSummary: 'Kurultay sürecinde partinin Anadolu’daki örgütlü yapısının güçlendirilmesini savundu.',
        keyParaphrasedQuote: 'CHP Anadolu’da yeniden milletin birinci partisi olmak zorundadır.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'semih_isikver',
    fullName: 'Semih Işıkver',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Elazığ',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Elazığ Milletvekili & TBMM Milli Savunma Komisyonu Üyesi',
    bio: 'İnşaat mühendisi, iş insanı, MHP Elazığ eski İl Başkanı. 28. Dönem TBMM Elazığ Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_si_cerceve',
        mpId: 'semih_isikver',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Lider Devlet Bahçeli’nin Tarihi İnisiyatifini Destekledi',
        overallSummary: 'MHP Lideri Bahçeli’nin Terörsüz Türkiye hedefine tam bağlılık bildirdi.',
        keyParaphrasedQuote: 'Liderimizin izinde milletimizin ve devletimizin ali menfaatlerini savunuyoruz.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // ERZİNCAN
  // ==========================================
  {
    id: 'suleyman_karaman',
    fullName: 'Süleyman Karaman',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Erzincan',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Erzincan Milletvekili & Eski TCDD Genel Müdürü',
    bio: 'Makine mühendisi, eski TCDD Genel Müdürü ve Yönetim Kurulu Başkanı (YHT projeleri mimarı). 27. ve 28. Dönem TBMM Erzincan Milletvekili.',
    stances: {}
  },
  {
    id: 'mustafa_sarigul',
    fullName: 'Mustafa Sarıgül',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Erzincan',
    photoUrl: '',
    term: '28. Dönem (TDP Kurucu Genel Başkanı)',
    title: 'CHP Erzincan Milletvekili & Eski Şişli Belediye Başkanı',
    bio: 'Eğitimci, iş insanı, Şişli eski Belediye Başkanı (1999-2014), Türkiye Değişim Partisi (TDP) eski Genel Başkanı. 18. ve 28. Dönem TBMM Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ms_infaz',
        mpId: 'mustafa_sarigul',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'savundu',
        stanceLabel: 'Toplumsal Barış ve Genel Af Çağrısı',
        overallSummary: 'Cezaevlerindeki doluluk ve toplumsal barış için kapsamlı bir "kader mahkumları affı" çağrısında bulundu.',
        keyParaphrasedQuote: 'Devletimiz şefkatli olmalı, analar için çocuklar için genel bir af çıkarmalıdır.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_ms_sokak',
        mpId: 'mustafa_sarigul',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Can Dostlarımızı Öldürtmeyiz',
        overallSummary: 'Sokak hayvanlarının öldürülmesine en sert tepkiyi gösteren isimlerden biri oldu, barınak bütçesi ayrılmasını savundu.',
        keyParaphrasedQuote: 'Can dostlarımızın yaşam hakkı tartışılamaz, merhamet etmeyene merhamet edilmez.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      '2023_kk_oo_kurultay': {
        id: 'st_ms_kurultay',
        mpId: 'mustafa_sarigul',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Kemal Kılıçdaroğlu’na Sadakat ve Destek',
        overallSummary: 'Kurultayda Kılıçdaroğlu’nu açıkça destekledi ancak sonrasında partinin başarısı için kenetlendi.',
        keyParaphrasedQuote: 'Vefa ve ahde vefa siyasetin temelidir; kurultay sonucunda ise partimizin emrindeyiz.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // ERZURUM
  // ==========================================
  {
    id: 'selami_altinok',
    fullName: 'Selami Altınok',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Erzurum Milletvekili & Eski İçişleri Bakanı / Emniyet Genel Müdürü',
    bio: 'Mülki idare amiri, eski İçişleri Bakanı (2015), eski Emniyet Genel Müdürü ve İstanbul eski Emniyet Müdürü. 27. ve 28. Dönem TBMM Erzurum Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_sa_infaz',
        mpId: 'selami_altinok',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'destekledi',
        stanceLabel: 'Kamu Düzeni ve Güvenlik Dengesi',
        overallSummary: 'Yargı ve infaz yasalarının kamu güvenliği ilkelerinden taviz verilmeden uygulanmasını destekledi.',
        keyParaphrasedQuote: 'Devletin ve milletin huzuru her türlü mülahazanın üzerindedir.',
        lastUpdated: '2023',
        sources: []
      }
    }
  },
  {
    id: 'fatma_oncu',
    fullName: 'Fatma Öncü',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Erzurum Milletvekili & Eski Bakan Yardımcısı',
    bio: 'Hukukçu, eski Aile ve Sosyal Hizmetler Bakan Yardımcısı, bedensel engelli hakları savunucusu. 28. Dönem TBMM Erzurum Milletvekili.',
    stances: {}
  },
  {
    id: 'mehmet_emin_oz',
    fullName: 'Mehmet Emin Öz',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Erzurum Milletvekili & TBMM Milli Eğitim Komisyonu Üyesi',
    bio: 'Tarihçi, eğitimci, AK Parti Erzurum eski İl Başkanı. 28. Dönem TBMM Erzurum Milletvekili.',
    stances: {}
  },
  {
    id: 'abdurrahim_firat',
    fullName: 'Abdurrahim Fırat',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Erzurum Milletvekili & MKYK Üyesi',
    bio: 'Hukukçu, avukat, Şeyh Said ailesi mensubu. AK Parti MKYK Üyesi. 28. Dönem TBMM Erzurum Milletvekili.',
    stances: {}
  },
  {
    id: 'kamil_aydin',
    fullName: 'Prof. Dr. Kamil Aydın',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Genel Başkan Yardımcısı & Erzurum Milletvekili',
    bio: 'İngiliz dili ve edebiyatı profesörü, akademisyen. MHP Dış İlişkilerden Sorumlu Genel Başkan Yardımcısı. 25, 26, 27 ve 28. Dönem TBMM Erzurum Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_ka_cerceve',
        mpId: 'kamil_aydin',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Terörsüz Türkiye ve Milli Dış Politika',
        overallSummary: 'Türkiye’nin sınır ötesi güvenliği ve iç cephe birliğini savunan MHP politikalarını kararlılıkla dile getirdi.',
        keyParaphrasedQuote: 'Liderimiz Sayın Devlet Bahçeli’nin tarihi çağrısı büyük Türk milletinin bekası içindir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'meral_danis_bestas',
    fullName: 'Meral Danış Beştaş',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Erzurum',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti Erzurum Milletvekili & Eski TBMM Grup Başkanvekili',
    bio: 'Hukukçu, insan hakları savunucusu, DEM Parti eski TBMM Grup Başkanvekili, 2024 İBB Eş Başkan Adayı. 25, 26, 27 ve 28. Dönem Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_mdb_kayyum',
        mpId: 'meral_danis_bestas',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Hukuk ve Sandık İradesi Gaspı',
        overallSummary: 'Kayyum atamalarını halkın seçme ve seçilme hakkına yönelik doğrudan anayasa suçu olarak niteledi.',
        keyParaphrasedQuote: 'Kayyumlar gidecek, halkın oyuyla gelen seçilmişler belediyeleri yönetecektir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_mdb_cerceve',
        mpId: 'meral_danis_bestas',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Demokratik Çözüm ve Anayasal Yurttaşlık',
        overallSummary: 'TBMM zemininde adil barış, tecridin kaldırılması ve eşit yurttaşlık ilkelerinin tanınmasını savundu.',
        keyParaphrasedQuote: 'Barış ve demokrasi bu ülkenin tek çıkış yoludur; muhatap Öcalan ve TBMM’dir.',
        lastUpdated: 'Ekim 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // ESKİŞEHİR
  // ==========================================
  {
    id: 'utku_cakirozer',
    fullName: 'Utku Çakırözer',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Eskişehir Milletvekili & Gazeteci - TBMM Dışişleri Komisyonu Üyesi',
    bio: 'Gazeteci, eski Cumhuriyet Gazetesi Genel Yayın Yönetmeni. 25, 26, 27 ve 28. Dönem TBMM Eskişehir Milletvekili. Basın özgürlüğü raporları hazırlayıcısı.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_uc_kurultay',
        mpId: 'utku_cakirozer',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişim Hareketini Destekledi',
        overallSummary: 'Kurultayda değişimi destekleyerek dış politika ve basın özgürlüğü alanındaki çalışmaları sürdürdü.',
        keyParaphrasedQuote: 'CHP değişimle güçlenecek, hak ve özgürlüklerin teminatı olacaktır.',
        lastUpdated: 'Kasım 2023',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_uc_sokak',
        mpId: 'utku_cakirozer',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Katliam Yasasına Hayır',
        overallSummary: 'Hayvanların yaşam hakkını savunarak Eskişehir örneğinde olduğu gibi kısırlaştırma ve çağdaş barınak politikasını savundu.',
        keyParaphrasedQuote: 'Can dostlarımızın yaşam hakkını savunmak insani görevimizdir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'jale_nur_sullu',
    fullName: 'Dr. Jale Nur Süllü',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Eskişehir Milletvekili & İletişim Bilimci',
    bio: 'İletişim bilimci (Doktora), Eskişehir Büyükşehir Belediyesi eski Genel Sekreter Yardımcısı. 27. ve 28. Dönem TBMM Eskişehir Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_jns_sokak',
        mpId: 'jale_nur_sullu',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Belediyelere Bütçe ve Kısırlaştırma Seferberliği',
        overallSummary: 'Ötanazi düzenlemesini vicdansızlık olarak niteledi ve merkezi hükümetin belediyelere kısırlaştırma bütçesi aktarmasını istedi.',
        keyParaphrasedQuote: 'Öldürmeyi değil yaşatmayı seçiyoruz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'ibrahim_arslan',
    fullName: 'İbrahim Arslan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Eskişehir Milletvekili & TBMM Sanayi Komisyonu Üyesi',
    bio: 'Mali müşavir, sendikacı, Eskişehir Büyükşehir Belediyesi eski Meclis Üyesi. 28. Dönem TBMM Eskişehir Milletvekili.',
    stances: {}
  },
  {
    id: 'fatih_donmez',
    fullName: 'Fatih Dönmez',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Eskişehir Milletvekili & Eski Enerji ve Tabii Kaynaklar Bakanı',
    bio: 'Elektrik-elektronik mühendisi, eski Enerji ve Tabii Kaynaklar Bakanı (2018-2023 - Karadeniz Doğalgazı ve Akkuyu projeleri dönemi). 28. Dönem TBMM Eskişehir Milletvekili.',
    stances: {}
  },
  {
    id: 'aysen_gurcan',
    fullName: 'Prof. Dr. Ayşen Gürcan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Eskişehir Milletvekili & Eski Aile ve Sosyal Politikalar Bakanı',
    bio: 'Eğitim bilimci (Profesör Doktor), Türkiye’nin ilk başörtülü kadın Bakanı (63. Hükümet Aile ve Sosyal Politikalar Bakanı). 28. Dönem TBMM Eskişehir Milletvekili.',
    stances: {}
  },
  {
    id: 'idris_nebi_hatipoglu',
    fullName: 'İdris Nebi Hatipoğlu',
    partyId: 'akp',
    electedPartyId: 'iyi',
    province: 'Eskişehir',
    photoUrl: '',
    term: '28. Dönem (İYİ Parti’den AK Parti’ye Katıldı)',
    title: 'AK Parti Eskişehir Milletvekili & Sanayici',
    bio: 'Sanayici, iş insanı, eski Eskişehirspor Kulübü Başkanı. 28. Dönem Eskişehir Milletvekili (İYİ Parti’den seçilmiş olup bilahare AK Parti’ye geçmiş ve 2024 Eskişehir BB Adayı olmuştur).',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_inh_gecis',
        mpId: 'idris_nebi_hatipoglu',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'elestirdi',
        stanceLabel: 'İYİ Parti’den İstifa Ederek AK Parti’ye Katıldı',
        overallSummary: 'Muhalefetin vizyonsuzluğunu eleştirerek Cumhur İttifakı saflarına katıldığını ilan etti.',
        keyParaphrasedQuote: 'Eskişehir’e ve ülkeme en verimli hizmeti iktidar gücüyle sunmak için AK Parti’ye katıldım.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // GAZİANTEP
  // ==========================================
  {
    id: 'abdulhamit_gul',
    fullName: 'Abdulhamit Gül',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti TBMM Grup Başkanı & Gaziantep Milletvekili (Eski Adalet Bakanı)',
    bio: 'Hukukçu, avukat, eski Adalet Bakanı (2017-2022). AK Parti TBMM Grup Başkanı. 25, 26, 27 ve 28. Dönem TBMM Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ag_infaz',
        mpId: 'abdulhamit_gul',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'savundu',
        stanceLabel: 'Yargı Reformu ve Ceza Adaleti Vizyonu',
        overallSummary: 'Bakanlığı döneminde başlatılan İnsan Hakları Eylem Planı ve yargı reform stratejilerini TBMM Grubu Başkanı olarak savundu.',
        keyParaphrasedQuote: 'Bırakın adalet yerini bulsun, isterse kıyamet kopsun anlayışıyla adalet reformlarını sürdürüyoruz.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_ag_cerceve',
        mpId: 'abdulhamit_gul',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Terörsüz Türkiye ve Anayasal Birlik',
        overallSummary: 'Cumhur İttifakı’nın ortaya koyduğu Terörsüz Türkiye vizyonunun ülkenin en büyük reformu olduğunu vurguladı.',
        keyParaphrasedQuote: '85 milyonun kardeşliği, birliği ve huzuru için tarihi bir fırsat penceresi açılmıştır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'mehmet_eyup_ozkececi',
    fullName: 'Mehmet Eyup Özkeçeci',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Gaziantep Milletvekili & Sanayici',
    bio: 'Kimya mühendisi, sanayici, AK Parti Gaziantep eski İl Başkanı (uzun yıllar il başkanlığı yaptı). 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {}
  },
  {
    id: 'ali_sahin',
    fullName: 'Ali Şahin',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Gaziantep Milletvekili & TBMM Milli Savunma Komisyonu Üyesi',
    bio: 'Uluslararası ilişkiler uzmanı, eski Avrupa Birliği Bakan Yardımcısı. 24, 27 ve 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {}
  },
  {
    id: 'derya_bakbak',
    fullName: 'Dr. Derya Bakbak',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Gaziantep Milletvekili & Mimar',
    bio: 'Mimar (Doktora), AK Parti Genel Merkez Kadın Kolları eski MKYK Üyesi. 24, 27 ve 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {}
  },
  {
    id: 'mesut_bozatli',
    fullName: 'Mesut Bozatlı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Gaziantep Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, AK Parti Gaziantep İl Gençlik Kolları eski Başkanı. 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {}
  },
  {
    id: 'hasan_ozturkmen',
    fullName: 'Hasan Öztürkmen',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Gaziantep Milletvekili & TBMM Güvenlik Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, eski Gaziantep Barosu Başkanı, eski CHP Gaziantep İl Başkanı. 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ho_infaz',
        mpId: 'hasan_ozturkmen',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ceza İnfaz Hukuku İlkelerinin Çiğnenmesi',
        overallSummary: 'Adaletsiz infaz değişikliklerinin suçluları cesaretlendirdiğini belirtti.',
        keyParaphrasedQuote: 'Hukuk yoksa güvenlik de olmaz; örtülü af düzenlemelerine karşıyız.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      }
    }
  },
  {
    id: 'melih_meric',
    fullName: 'Melih Meriç',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Gaziantep Milletvekili & İnşaat Mühendisi',
    bio: 'İnşaat mühendisi, eski İnşaat Mühendisleri Odası Gaziantep Şube Başkanı. 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_mm_kurultay',
        mpId: 'melih_meric',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Değişim ve Bölgesel Kalkınma Vurgusu',
        overallSummary: 'Kurultayda değişimi destekleyerek CHP’nin güneydoğudaki üretim ve sanayi politikalarını savundu.',
        keyParaphrasedQuote: 'Halkımızın değişim talebine kulak vererek iktidara yürüyoruz.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'ertugrul_kaya',
    fullName: 'Ertuğrul Kaya',
    partyId: 'deva',
    electedPartyId: 'chp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem (CHP Listesinden Seçildi)',
    title: 'DEVA Partisi Genel Başkan Yardımcısı & Gaziantep Milletvekili',
    bio: 'Hukukçu, avukat, DEVA Partisi eski Gaziantep İl Başkanı. 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {}
  },
  {
    id: 'sermet_atay',
    fullName: 'Sermet Atay',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Gaziantep Milletvekili & TBMM İdare Amiri',
    bio: 'Hukukçu, avukat, MHP MYK Üyesi. 27. ve 28. Dönem TBMM Gaziantep Milletvekili. TBMM İdare Amiri.',
    stances: {
      'cerceve_yasa': {
        id: 'st_sa_cerceve_gaziantep',
        mpId: 'sermet_atay',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Lider Bahçeli’nin Politikalarına Tam Destek',
        overallSummary: 'Gaziantep gibi sınır illerinin güvenliği için terörsüz Türkiye iradesini meclis kürsüsünden savundu.',
        keyParaphrasedQuote: 'Terörün kökünü kazıyacak her milli adımın sonuna kadar arkasındayız.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'sevda_karaca_demir',
    fullName: 'Sevda Karaca Demir',
    partyId: 'emep',
    electedPartyId: 'dem',
    province: 'Gaziantep',
    photoUrl: '',
    term: '28. Dönem (DEM/Yeşil Sol Listesinden Seçildi)',
    title: 'EMEP (Emek Partisi) Gaziantep Milletvekili & Gazeteci-Yazar',
    bio: 'Gazeteci, Ekmek ve Gül editörü, kadın ve işçi hakları savunucusu. 28. Dönem TBMM Gaziantep Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_skd_sokak',
        mpId: 'sevda_karaca_demir',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Katliam Yasasına Karşı Meclis ve Sokak Mücadelesi',
        overallSummary: 'Hayvan hakları yasasının bir katliam yasası olduğunu belirterek meclis genel kurulunda ve komisyonda en sert muhalefeti yürüttü.',
        keyParaphrasedQuote: 'Sokakları kana bulamanıza, can dostlarımızı katletmenize izin vermeyeceğiz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      'kayyum_uygulamalari': {
        id: 'st_skd_kayyum',
        mpId: 'sevda_karaca_demir',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'İşçi ve Halk İradesine Darbe',
        overallSummary: 'Kayyumların halkın bütçesini ve emeğini gasbettiğini savundu.',
        keyParaphrasedQuote: 'Kayyum rejimi tüm emekçi halkın kazanılmış haklarına yönelik bir gasptır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // DÜZCE
  // ==========================================
  {
    id: 'ayse_kesir',
    fullName: 'Ayşe Keşir',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Düzce',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Genel Merkez Kadın Kolları Başkanı & Düzce Milletvekili',
    bio: 'İletişim uzmanı, sosyolog. AK Parti Genel Merkez Kadın Kolları Başkanı. 25, 26, 27 ve 28. Dönem TBMM Düzce Milletvekili.',
    stances: {}
  },
  {
    id: 'ercan_ozturk',
    fullName: 'Ercan Öztürk',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Düzce',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Düzce Milletvekili & TBMM Sağlık Komisyonu Üyesi',
    bio: 'Sosyal hizmet uzmanı, eski Düzce Aile ve Sosyal Hizmetler İl Müdürü. 28. Dönem TBMM Düzce Milletvekili.',
    stances: {}
  },
  {
    id: 'talih_ozcan',
    fullName: 'Talih Özcan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Düzce',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Düzce Milletvekili & TBMM Dışişleri Komisyonu Üyesi',
    bio: 'İş insanı, Kafkas dernekleri yöneticisi. 28. Dönem TBMM Düzce Milletvekili (CHP’nin Düzce’de 24 yıl sonra kazandığı ilk milletvekili).',
    stances: {}
  },

  // ==========================================
  // KAHRAMANMARAŞ
  // ==========================================
  {
    id: 'vahit_kirisci',
    fullName: 'Prof. Dr. Vahit Kirişci',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kahramanmaraş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Kahramanmaraş Milletvekili & Eski Tarım ve Orman Bakanı',
    bio: 'Ziraat mühendisi, akademisyen (Profesör Doktor), eski Tarım ve Orman Bakanı (2022-2023). TBMM Tarım, Orman ve Köyişleri Komisyonu Başkanı. 22, 23 ve 28. Dönem Milletvekili.',
    stances: {}
  },
  {
    id: 'omer_oruc_bilal_debgici',
    fullName: 'Ömer Oruç Bilal Debgici',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kahramanmaraş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Kahramanmaraş Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'İnşaat mühendisi, AK Parti Kahramanmaraş eski İl Başkanı. 28. Dönem TBMM Kahramanmaraş Milletvekili.',
    stances: {}
  },
  {
    id: 'ali_oztunc',
    fullName: 'Ali Öztunç',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kahramanmaraş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Kahramanmaraş Milletvekili & Eski Genel Başkan Yardımcısı',
    bio: 'Gazeteci, yazar, eski RTÜK Üyesi, CHP Doğa Hakları ve Çevreden Sorumlu eski Genel Başkan Yardımcısı. 27. ve 28. Dönem TBMM Kahramanmaraş Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_aoz_sokak',
        mpId: 'ali_oztunc',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Doğa ve Canlı Hakları Savunusu',
        overallSummary: 'Hayvanların itlaf edilmesini vicdansızlık olarak nitelendirip merkezi bütçeden barınak desteği talep etti.',
        keyParaphrasedQuote: 'Deprem bölgesinde acıları sarmamışken şimdi de dilsiz canlıların canına kıymaya kalkıyorlar.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      '2023_kk_oo_kurultay': {
        id: 'st_aoz_kurultay',
        mpId: 'ali_oztunc',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişimi Destekledi',
        overallSummary: 'Kurultay sürecinde değişimi destekleyerek deprem bölgesi odaklı saha çalışmalarını yürüttü.',
        keyParaphrasedQuote: 'CHP milletin vicdanı ve sesi olarak iktidara koşacaktır.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'zuhal_karakoc_dora',
    fullName: 'Doç. Dr. Zuhal Karakoç Dora',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Kahramanmaraş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Kahramanmaraş Milletvekili & Akademisyen',
    bio: 'Uluslararası ilişkiler doçenti, kamu yöneticisi. 28. Dönem TBMM Kahramanmaraş Milletvekili.',
    stances: {}
  },

  // ==========================================
  // KARABÜK
  // ==========================================
  {
    id: 'cem_sahin',
    fullName: 'Cem Şahin',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Karabük',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Karabük Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, eski TBMM Başkanı Mehmet Ali Şahin’in oğlu. AK Parti Genel Sekreter Yardımcısı. 28. Dönem TBMM Karabük Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_cs_infaz',
        mpId: 'cem_sahin',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'savundu',
        stanceLabel: 'Yargı Reform Paketlerini Savundu',
        overallSummary: 'Adalet Komisyonu üyesi olarak ceza infaz ve yargı paketlerinin yasalaşmasında görev aldı.',
        keyParaphrasedQuote: 'Hukukun üstünlüğü ve adil infaz prensiplerine uygun düzenlemeler yapılmıştır.',
        lastUpdated: '2023',
        sources: []
      }
    }
  },
  {
    id: 'ali_keskinkilic',
    fullName: 'Ali Keskinkılıç',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Karabük',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Karabük Milletvekili & Sanayi ve Ticaret Uzmanı',
    bio: 'İktisatçı, eski Karabük Ticaret ve Sanayi Odası Genel Sekreteri. 28. Dönem TBMM Karabük Milletvekili.',
    stances: {}
  },
  {
    id: 'cevdet_akay',
    fullName: 'Cevdet Akay',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Karabük',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Karabük Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'Bankacı, maliyeci, iş insanı. 28. Dönem TBMM Karabük Milletvekili (CHP’nin Karabük’te 21 yıl sonra çıkardığı ilk vekil).',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_ca_kurultay_kbk',
        mpId: 'cevdet_akay',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Değişim ve Bütçe Şeffaflığı Vurgusu',
        overallSummary: 'Kurultayda yenilenmeyi destekleyerek TBMM Plan ve Bütçe Komisyonunda ekonomik muhalefeti yürüttü.',
        keyParaphrasedQuote: 'Halkın parasının halk için harcandığı adil bir ekonomik düzen kuracağız.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // KOCAELİ
  // ==========================================
  {
    id: 'sadettin_hulagu',
    fullName: 'Prof. Dr. Sadettin Hülagü',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Kocaeli Milletvekili & Cumhurbaşkanı Başdanışmanı - Tıp Profesörü',
    bio: 'Gastroenteroloji uzmanı (Profesör Doktor), Kocaeli Üniversitesi eski Rektörü, eski Cumhurbaşkanlığı Başdanışmanı. 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {}
  },
  {
    id: 'radiye_sezer_katircioglu',
    fullName: 'Radiye Sezer Katırcıoğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Kocaeli Milletvekili & TBMM KEFEK eski Başkanı',
    bio: 'Siyaset bilimci, kamu yöneticisi. 25, 26, 27 ve 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {}
  },
  {
    id: 'veysal_tipioglu',
    fullName: 'Veysal Tipioğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Kocaeli Milletvekili & TBMM Güvenlik Komisyonu Başkanı',
    bio: '1. Sınıf Emniyet Müdürü, Kocaeli ve Şanlıurfa eski İl Emniyet Müdürü. 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {}
  },
  {
    id: 'muhip_kanko',
    fullName: 'Prof. Dr. Muhip Kanko',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Kocaeli Milletvekili & Kalp ve Damar Cerrahı',
    bio: 'Kalp damar cerrahisi profesörü, akademisyen. 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_mk_sokak',
        mpId: 'muhip_kanko',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Tıp Hekimi Olarak Yaşam Hakkını Savundu',
        overallSummary: 'Ötanazi düzenlemesinin yaşam hakkına ve bilimsel veterinerlik ilkelerine aykırı olduğunu belirtti.',
        keyParaphrasedQuote: 'Bir hekim olarak her canlının yaşam hakkını korumakla mükellefiz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'harun_ozgur_yildizli',
    fullName: 'Harun Özgür Yıldızlı',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Kocaeli Milletvekili & İnşaat Mühendisi',
    bio: 'İnşaat mühendisi, CHP Kocaeli eski İl Başkanı. 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_hoy_kurultay',
        mpId: 'harun_ozgur_yildizli',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişimi Destekledi',
        overallSummary: 'Kurultayda değişim tarafında yer alarak Kocaeli sanayi kenti dinamiklerini partiye taşıdı.',
        keyParaphrasedQuote: 'Değişen ve yenilenen CHP ile sanayi emekçilerinin iktidarını kuracağız.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'nail_ciler',
    fullName: 'Nail Çiler',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Kocaeli Milletvekili & Gebze Ticaret Odası eski Başkanı',
    bio: 'Eğitimci, iş insanı, uzun yıllar Gebze Ticaret Odası Yönetim Kurulu Başkanlığı yaptı. 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {}
  },
  {
    id: 'saffet_sancakli',
    fullName: 'Saffet Sancaklı',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP Kocaeli Milletvekili & Eski Milli Futbolcu - MYK Üyesi',
    bio: 'Eski milli futbolcu (Kocaelispor, Beşiktaş, Galatasaray, Fenerbahçe), MHP MYK Üyesi. 24, 25, 26, 27 ve 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_ssan_cerceve',
        mpId: 'saffet_sancakli',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'MHP Lideri Bahçeli’nin Çağrısına Tam Destek',
        overallSummary: 'Devlet Bahçeli’nin Terörsüz Türkiye çağrısına tam destek vererek birlik ve beraberlik mesajı verdi.',
        keyParaphrasedQuote: 'Liderimiz Sayın Devlet Bahçeli ne söylediyse devletimizin ve milletimizin geleceği içindir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'omer_faruk_gergerlioglu',
    fullName: 'Dr. Ömer Faruk Gergerlioğlu',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Kocaeli',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti Kocaeli Milletvekili & TBMM İnsan Hakları Komisyonu Üyesi',
    bio: 'Tıp doktoru (Göğüs hastalıkları uzmanı), eski Mazlumder Genel Başkanı, insan hakları savunucusu. 27. ve 28. Dönem TBMM Kocaeli Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_ofg_kayyum',
        mpId: 'omer_faruk_gergerlioglu',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ağır İnsan Hakları ve Demokrasi İhlali',
        overallSummary: 'Kayyum uygulamalarının halkın siyasi iradesine vurulmuş anayasal bir darbe olduğunu her platformda savundu.',
        keyParaphrasedQuote: 'Seçilmiş iradeyi gasp eden kayyum düzeni derhal son bulmalıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_ofg_cerceve',
        mpId: 'omer_faruk_gergerlioglu',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Hakiki Barış ve Tecridin Kaldırılması',
        overallSummary: 'Kürt meselesinin barışçıl çözümü, cezaevlerindeki hak ihlallerinin bitmesi ve şeffaf müzakereyi savundu.',
        keyParaphrasedQuote: 'Barış erdemdir, barışın yolu adaletten ve hukukun üstünlüğünden geçer.',
        lastUpdated: 'Ekim 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // MUĞLA
  // ==========================================
  {
    id: 'kadem_mete',
    fullName: 'Kadem Mete',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Muğla Milletvekili & Turizmci',
    bio: 'Turizmci, eski TÜROFED Başkan Yardımcısı, AK Parti Muğla eski İl Başkanı. 28. Dönem TBMM Muğla Milletvekili.',
    stances: {}
  },
  {
    id: 'yakup_otgoz',
    fullName: 'Yakup Otgöz',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Muğla Milletvekili & Eski Seydikemer Belediye Başkanı',
    bio: 'Eğitimci, eski Seydikemer Belediye Başkanı. 28. Dönem TBMM Muğla Milletvekili.',
    stances: {}
  },
  {
    id: 'cumhur_uzun',
    fullName: 'Cumhur Uzun',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Muğla Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, eski Muğla Barosu Başkanı (üç dönem). 28. Dönem TBMM Muğla Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_cu_infaz',
        mpId: 'cumhur_uzun',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Anayasa Mahkemesi Kararlarına Uyulması Talebi',
        overallSummary: 'İnfaz yasasındaki ayrımcı maddeleri ve yargı bağımsızlığını zedeleyen hükümleri eleştirdi.',
        keyParaphrasedQuote: 'Hukuk devleti ilkesini aşındıran torba yasa mantığına son verilmelidir.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      }
    }
  },
  {
    id: 'gizem_ozcan',
    fullName: 'Gizem Özcan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Muğla Milletvekili & TBMM Anayasa Komisyonu Üyesi',
    bio: 'Hukukçu, avukat, CHP Muğla İl Kadın Kolları eski Başkanı. 28. Dönem TBMM Muğla Milletvekili.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_go_kurultay',
        mpId: 'gizem_ozcan',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Gençleşen ve Değişen CHP Vizyonunu Destekledi',
        overallSummary: 'Kurultayda Özgür Özel ve değişim kadrosunu destekleyerek kadın ve genç temsilini savundu.',
        keyParaphrasedQuote: 'Gençlerin ve kadınların öncülüğünde CHP iktidarını kuracağız.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'sureyya_ones_derici',
    fullName: 'Süreyya Öneş Derici',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'CHP Muğla Milletvekili & TBMM Dışişleri Komisyonu Üyesi',
    bio: 'Siyaset bilimci, diplomat, eski Başbakanlık Dış Politika ve Güvenlik Uzmanı. 28. Dönem TBMM Muğla Milletvekili.',
    stances: {}
  },
  {
    id: 'selcuk_ozdag',
    fullName: 'Doç. Dr. Selçuk Özdağ',
    partyId: 'gelecek',
    electedPartyId: 'chp',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem (CHP Listesinden Seçildi)',
    title: 'Gelecek Partisi Genel Başkan Yardımcısı / Grup Başkanı & Muğla Milletvekili',
    bio: 'Akademisyen (Doçent Doktor), eski AK Parti Genel Başkan Yardımcısı (24, 25, 26. Dönem Manisa Milletvekili). Saadet-Gelecek Grubu TBMM Grup Başkanı. 28. Dönem Muğla Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_so_kayyum',
        mpId: 'selcuk_ozdag',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Demokrasi ve Sandık Meşruiyetine Sahip Çıktı',
        overallSummary: 'Kayyum uygulamasının meclisi ve milli iradeyi yok sayan otoriter bir yöntem olduğunu belirtti.',
        keyParaphrasedQuote: 'Seçimle gelenin idari kararla görevden alınması Türkiye demokrasisine vurulan en ağır darbedir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'metin_ergun',
    fullName: 'Prof. Dr. Metin Ergun',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Muğla',
    photoUrl: '',
    term: '28. Dönem',
    title: 'İYİ Parti Muğla Milletvekili & Akademisyen',
    bio: 'Halkbilimci, profesör doktor. 21. Dönem (MHP), 27 ve 28. Dönem Muğla Milletvekili (İYİ Parti kurucularından).',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_me_kurultay',
        mpId: 'metin_ergun',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Kurumsal Duruş ve Türk Milliyetçiliği',
        overallSummary: 'Partinin kuruluş ilkelerine ve meclisteki milli merkez rolüne sadakatle devam etti.',
        keyParaphrasedQuote: 'İYİ Parti Türkiye’nin milli güvenliği ve cumhuriyet değerlerinin sarsılmaz kalesidir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // MUŞ
  // ==========================================
  {
    id: 'sezai_temelli',
    fullName: 'Sezai Temelli',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Muş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti TBMM Grup Başkanvekili & Muş Milletvekili (Eski HDP Eş Genel Başkanı)',
    bio: 'Maliye ve iktisat uzmanı, akademisyen. Eski HDP Eş Genel Başkanı (2018-2020). 25. Dönem İstanbul, 27. Dönem Van, 28. Dönem Muş Milletvekili. DEM Parti TBMM Grup Başkanvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_stem_kayyum',
        mpId: 'sezai_temelli',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'TBMM Genel Kurulunda Kayyum Rejimini Mahkûm Etti',
        overallSummary: 'Kayyumların bütçe gaspı, Kürt halkının varlığını inkar ve anayasal suç olduğunu mecliste kararlılıkla dile getirdi.',
        keyParaphrasedQuote: 'Kayyum darbesi sadece DEM Parti’ye değil, Türkiye’nin tüm demokratik kazanımlarına yapılmıştır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_stem_cerceve',
        mpId: 'sezai_temelli',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Müzakere, Tecrit Sonlandırılması ve TBMM Zemininde Çözüm',
        overallSummary: 'Kürt sorununun demokratik çözümü için Öcalan ile diyaloğun başlatılması ve TBMM’de yasal güvencelerin sağlanmasını savundu.',
        keyParaphrasedQuote: 'Kalıcı barış ve demokratik cumhuriyet için muhataplarıyla masaya oturulmalıdır.',
        lastUpdated: 'Ekim 2024',
        sources: []
      }
    }
  },
  {
    id: 'sumeyye_boz',
    fullName: 'Sümeyye Boz',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Muş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'DEM Parti Muş Milletvekili & Psikolog',
    bio: 'Psikolog, kadın ve gençlik hakları aktivisti. 28. Dönem TBMM Muş Milletvekili.',
    stances: {}
  },
  {
    id: 'mehmet_emin_simsek',
    fullName: 'Mehmet Emin Şimşek',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Muş',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Muş Milletvekili & TBMM Bayındırlık Komisyonu Üyesi',
    bio: 'İnşaat mühendisi, eski Bayındırlık ve İskan İl Müdürü. 25, 26, 27 ve 28. Dönem TBMM Muş Milletvekili.',
    stances: {}
  },

  // ==========================================
  // NEVŞEHİR
  // ==========================================
  {
    id: 'suleyman_ozgun',
    fullName: 'Süleyman Özgün',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Nevşehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Nevşehir Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'Harita mühendisi, iş insanı. 28. Dönem TBMM Nevşehir Milletvekili.',
    stances: {}
  },
  {
    id: 'emre_caliskan',
    fullName: 'Emre Çalışkan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Nevşehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'AK Parti Nevşehir Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'Diş hekimi, AK Parti Genel Merkez Gençlik Kolları eski MKYK Üyesi. 28. Dönem TBMM Nevşehir Milletvekili.',
    stances: {}
  },
  {
    id: 'filiz_kilic',
    fullName: 'Prof. Dr. Filiz Kılıç',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Nevşehir',
    photoUrl: '',
    term: '28. Dönem',
    title: 'MHP TBMM Grup Başkanvekili & Nevşehir Milletvekili',
    bio: 'Türk dili ve edebiyatı profesörü, Nevşehir Hacı Bektaş Veli Üniversitesi kurucu Rektörü (2008-2017). MHP TBMM Grup Başkanvekili ve Genel Başkan Yardımcısı. 28. Dönem TBMM Nevşehir Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_fk_cerceve',
        mpId: 'filiz_kilic',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Devlet Bahçeli’nin Tarihi İnisiyatifini Grup Adına Savundu',
        overallSummary: 'MHP Grup Başkanvekili olarak TBMM Genel Kurulunda Devlet Bahçeli’nin Terörsüz Türkiye çağrısının devlet aklı ve tarihi bir adım olduğunu vurguladı.',
        keyParaphrasedQuote: 'Liderimiz Devlet Bahçeli’nin çağrısı bin yıllık kardeşliğimizin ve Türkiye Cumhuriyeti’nin ebedi bekasının teminatıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  }
];
