import { ControversyItem, ControversyCategory, ControversyStatus } from '../types';

export const CONTROVERSY_CATEGORIES: Record<ControversyCategory, { label: string; color: string; bgColor: string; borderColor: string }> = {
  yargi_fezleke: {
    label: 'Yargı & Fezleke Dosyası',
    color: '#b91c1c',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  yolsuzluk_ihale: {
    label: 'Mali Şaibe & İhale İddiası',
    color: '#c2410c',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
  },
  etik_skandal: {
    label: 'Etik & Davranış Tartışması',
    color: '#7e22ce',
    bgColor: '#faf5ff',
    borderColor: '#e9d5ff',
  },
  soz_eylem: {
    label: 'Tartışmalı Söz & Polemik',
    color: '#0369a1',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  parti_kriz: {
    label: 'Parti İçi Kriz & İhraç / İstifa',
    color: '#475569',
    bgColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
  diger: {
    label: 'Diğer Kamuoyu Dosyası',
    color: '#4b5563',
    bgColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
};

export const CONTROVERSY_STATUSES: Record<ControversyStatus, { label: string; badgeClass: string }> = {
  fezleke_mecliste: {
    label: 'Dokunulmazlık Fezlekesi TBMM Karma Komisyonunda',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
  },
  sorusturma_suruyor: {
    label: 'Adli / İdari İnceleme veya Soruşturma Sürüyor',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
  },
  dava_acildi: {
    label: 'Dava Açıldı / Yargılama Süreci',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
  },
  takipsizlik_beraat: {
    label: 'Takipsizlik Kararı / Beraat Etti',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
  },
  ceza_aldi: {
    label: 'Ceza / Mahkumiyet Kararı (AYM/İstinaf İncelemesinde)',
    badgeClass: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
  },
  kamuoyu_tartismasi: {
    label: 'Kamuoyu & Siyasi Polemik Konusu',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  },
  tekzip_edildi: {
    label: 'Yalanlandı / Mahkeme Kararıyla Tekzip Edildi',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
  },
};

export const INITIAL_CONTROVERSIES: ControversyItem[] = [
  // Ahmet Şık (TİP İstanbul)
  {
    id: 'cntr-ahmet-sik-1',
    mpId: 'ahmet_sik',
    title: 'TBMM Genel Kurulunda Can Atalay Oturumunda Yaşanan Yumruklu Arbede',
    category: 'soz_eylem',
    severity: 'yuksek',
    date: 'Ağustos 2024',
    summary: 'TBMM Genel Kurulunda Can Atalay hakkındaki olağanüstü toplantıda kürsüde yaptığı konuşmada iktidar sıralarına yönelik sert ithamları sonrası milletvekilleri arasında fiziki arbede çıktı; Şık kürsüde darp edildi ve oturuma ara verildi.',
    mpResponse: 'Kürsüde halk adına hakikati dile getirdiğini, iktidarın muhalefeti şiddet yoluyla susturmaya çalıştığını ve meclis içi şiddetin demokrasiye darbe olduğunu belirtti.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'TBMM Genel Kurulu Can Atalay oturumunda yumruklu kavga',
        url: 'https://www.bbc.com/turkce/articles/c4g9819894zo',
        outlet: 'BBC Türkçe',
        date: '16.08.2024',
      },
      {
        title: 'Ahmet Şık\'ın TBMM Genel Kurul konuşması tutanakları',
        url: 'https://www.tbmm.gov.tr',
        outlet: 'TBMM Tutanak Dergisi',
        date: '16.08.2024',
      },
    ],
  },
  {
    id: 'cntr-ahmet-sik-2',
    mpId: 'ahmet_sik',
    title: 'Dokunulmazlık Fezlekesi: Sosyal Medya Açıklamaları ve Soruşturma Dosyası',
    category: 'yargi_fezleke',
    severity: 'orta',
    date: '2023 - 2024',
    summary: 'Katıldığı bir canlı yayında yaptığı hükümet ve devlet kurumlarına yönelik sert eleştirileri sebebiyle Ankara Cumhuriyet Başsavcılığı tarafından resen soruşturma başlatılarak dokunulmazlığının kaldırılması talebiyle TBMM\'ye fezleke gönderildi.',
    mpResponse: 'Sözlerinin siyasi eleştiri ve ifade özgürlüğü sınırları içinde olduğunu, yolsuzluk ve hukuksuzlukları ifşa etmeye devam edeceğini savundu.',
    status: 'fezleke_mecliste',
    sources: [
      {
        title: 'Ahmet Şık hakkında fezleke düzenlendi',
        url: 'https://www.dw.com/tr/ahmet-%C5%9F%C4%B1k-hakk%C4%B1nda-fezleke/a-62734123',
        outlet: 'Deutsche Welle Türkçe',
        date: '2023',
      },
    ],
  },

  // Cemal Enginyurt (DP / Bağımsız İstanbul)
  {
    id: 'cntr-cemal-enginyurt-1',
    mpId: 'cemal_enginyurt',
    title: 'TV Programında Gazeteci ile Yaşanan Canlı Yayın Tartışması ve Arbede',
    category: 'etik_skandal',
    severity: 'yuksek',
    date: 'Ağustos 2022',
    summary: 'TV100 stüdyosunda canlı yayınlanan tartışma programında gazeteci Latif Şimşek ile yaşanan şiddetli sözlü polemik kavgaya dönüştü; korumasının gazeteciye fiziki müdahalesi kamuoyunda büyük yankı uyandırdı.',
    mpResponse: 'Kişisel olarak fiziki şiddeti savunmadığını, programda kendisine ve temsil ettiği değerlere ağır hakaretler edildiğini ve olayın tahrik sonucu büyüdüğünü ifade etti.',
    status: 'dava_acildi',
    sources: [
      {
        title: 'Canlı yayındaki kavga sonrası Cemal Enginyurt hakkında fezleke',
        url: 'https://www.cumhuriyet.com.tr',
        outlet: 'Cumhuriyet',
        date: '07.08.2022',
      },
    ],
  },
  {
    id: 'cntr-cemal-enginyurt-2',
    mpId: 'cemal_enginyurt',
    title: 'Fındık Fiyatları Eleştirisi Sonrası MHP\'den Kesin İhraç Süreci',
    category: 'parti_kriz',
    severity: 'orta',
    date: 'Temmuz 2020',
    summary: 'Ordu milletvekili iken Tarım Bakanı ve TMO politikalarını eleştirerek hükümete sert çıkışlar yapmasının ardından MHP Merkez Disiplin Kurulu tarafından partiden ihraç edildi.',
    mpResponse: 'Üreticinin ve Karadeniz çiftçisinin hakkını savunduğu için bedel ödediğini, geri adım atmayacağını belirterek Demokrat Parti\'ye geçti.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'Cemal Enginyurt MHP\'den ihraç edildi',
        url: 'https://www.hurriyet.com.tr',
        outlet: 'Hürriyet',
        date: '30.07.2020',
      },
    ],
  },

  // Enis Berberoğlu (CHP İstanbul)
  {
    id: 'cntr-enis-berberoglu-1',
    mpId: 'enis_berberoglu',
    title: 'MİT Tırları Davası, Vekilliğin Düşürülmesi ve AYM\'nin Hak İhlali Kararı',
    category: 'yargi_fezleke',
    severity: 'yuksek',
    date: '2017 - 2021',
    summary: 'MİT tırları görüntülerinin gazeteye aktarılması iddiasıyla yargılandı, hapis cezası onanınca milletvekilliği TBMM\'de düşürüldü. Ancak Anayasa Mahkemesi (AYM) iki kez hak ihlali kararı vererek yeniden yargılanmasını ve vekilliğe dönüşünü sağladı.',
    mpResponse: 'Soruşturmanın siyasi bir kumpas olduğunu, gazetecilik ve halkın haber alma hakkı dışında hiçbir eylemde bulunmadığını, AYM kararıyla haklılığının tescillendiğini belirtti.',
    status: 'takipsizlik_beraat',
    sources: [
      {
        title: 'AYM\'den Enis Berberoğlu hakkında ikinci hak ihlali kararı',
        url: 'https://www.resmigazete.gov.tr',
        outlet: 'Resmi Gazete / AYM Kararı',
        date: '2021',
      },
      {
        title: 'Enis Berberoğlu TBMM\'ye milletvekili olarak geri döndü',
        url: 'https://www.aa.com.tr/tr/politika/enis-berberoglu-yeniden-milletvekili/2141975',
        outlet: 'Anadolu Ajansı',
        date: '11.02.2021',
      },
    ],
  },

  // Celal Adan (MHP İstanbul)
  {
    id: 'cntr-celal-adan-1',
    mpId: 'celal_adan',
    title: 'TBMM Genel Kurulunu Yönetirken Açık Kalan Mikrofondaki Sözler Tartışması',
    category: 'soz_eylem',
    severity: 'orta',
    date: 'Kasım 2023',
    summary: 'TBMM Meclis Başkanvekili olarak Genel Kurulu yönettiği sırada bir HEDEP (DEM Parti) milletvekilinin konuşması bittikten hemen sonra açık kalan mikrofondan duyulan ifadeler Meclis\'te gerginliğe ve Genel Kurul boykotuna neden oldu.',
    mpResponse: 'Sözlerin şahsa yönelik olmadığını, Genel Kurul yönetiminde her zaman tarafsızlık ve adalet ilkelerine bağlı kaldığını, Meclis adabına uygun davranıldığını açıkladı.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'Celal Adan\'ın mikrofon polemiği TBMM tutanaklarına yansıdı',
        url: 'https://www.gazeteduvar.com.tr',
        outlet: 'Gazete Duvar',
        date: '28.11.2023',
      },
    ],
  },

  // Ali Mahir Başarır (CHP Mersin / Grup Başkanvekili)
  {
    id: 'cntr-ali-mahir-basarir-1',
    mpId: 'ali_mahir_basarir',
    title: 'Tank Palet Fabrikası Konuşması Üzerine Fezleke ve Dokunulmazlık Tartışması',
    category: 'yargi_fezleke',
    severity: 'orta',
    date: 'Kasım 2020 - 2023',
    summary: 'Katıldığı televizyon programında Sakarya Tank Palet Fabrikasının BMC ve Katar ortaklığına devredilmesini eleştirirken kullandığı ifadeler üzerine Türk Ceza Kanunu 301. maddeden hakkında fezleke düzenlendi.',
    mpResponse: 'Kastının şanlı Türk Ordusu değil, ordunun stratejik fabrikasını Katar sermayeli ortaklığa peşkeş çeken hükümet politikası olduğunu ve sözlerinin cımbızlandığını savundu.',
    status: 'fezleke_mecliste',
    sources: [
      {
        title: 'Ali Mahir Başarır hakkında fezleke hazırlandı',
        url: 'https://www.sozcu.com.tr',
        outlet: 'Sözcü',
        date: '30.11.2020',
      },
    ],
  },
  {
    id: 'cntr-ali-mahir-basarir-2',
    mpId: 'ali_mahir_basarir',
    title: 'Yalova Mahkemesi Duruşma Salonunda Yaşanan Heyet Tartışması',
    category: 'etik_skandal',
    severity: 'orta',
    date: 'Ekim 2022',
    summary: 'Yalova Belediyesi davası duruşmasında CHP heyetiyle birlikte mahkeme heyetine yönelik yüksek sesli itiraz ve usul tartışması sebebiyle Adalet Bakanlığı ve HSK inceleme başlattı; fezleke tanzim edildi.',
    mpResponse: 'Mahkemenin açık bilirkişi raporuna rağmen seçilmiş belediye başkanını göreve iade etmemesini ve taraflı tutumunu protesto ettiklerini, yargı bağımsızlığını savunduklarını açıkladı.',
    status: 'fezleke_mecliste',
    sources: [
      {
        title: 'Yalova mahkemesi duruşma salonu gerginliği tutanakları',
        url: 'https://www.haberturk.com',
        outlet: 'Habertürk',
        date: '2022',
      },
    ],
  },

  // Fatih Erbakan (YRP İstanbul)
  {
    id: 'cntr-fatih-erbakan-1',
    mpId: 'fatih_erbakan',
    title: 'Pandemi Dönemi mRNA Aşısı Hakkındaki Genetik Değişim İddiaları',
    category: 'soz_eylem',
    severity: 'orta',
    date: '2021 - 2022',
    summary: 'Basın toplantılarında mRNA aşılarının genetik mutasyonlara yol açabileceğini, kuyruklu ve anormal doğumlara sebep olacağını öne sürerek tıp dünyasında ve kamuoyunda yoğun tepki ve bilimsel eleştirilere konu oldu.',
    mpResponse: 'Uluslararası bilim insanlarının şüphelerini aktardığını, küresel ilaç tekellerine ve zorunlu aşı dayatmalarına karşı halk sağlığını savunduğunu belirtti.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'Fatih Erbakan\'ın aşı açıklamaları ve bilim insanlarının yanıtı',
        url: 'https://www.bbc.com/turkce/haberler-turkiye-58547285',
        outlet: 'BBC Türkçe',
        date: '13.09.2021',
      },
    ],
  },
  {
    id: 'cntr-fatih-erbakan-2',
    mpId: 'fatih_erbakan',
    title: '6284 Sayılı Ailenin Korunması Kanununun Kaldırılması Talebi Tartışması',
    category: 'soz_eylem',
    severity: 'orta',
    date: 'Mart 2023',
    summary: 'Cumhur İttifakı\'na katılım müzakerelerinde 6284 sayılı kanunun revize edilmesi veya kaldırılması talebi kadın hakları örgütleri ve kamuoyunda geniş tepki topladı.',
    mpResponse: 'Kanunun erkeği peşinen suçlu ilan eden maddelerinin aile kurumuna zarar verdiğini, kadına şiddete karşı olduklarını ancak iftiralara karşı koruyucu mekanizma istediklerini savundu.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: '6284 sayılı yasa tartışması ve YRP açıklamaları',
        url: 'https://www.ntv.com.tr',
        outlet: 'NTV',
        date: '2023',
      },
    ],
  },

  // Numan Kurtulmuş (AKP İstanbul / TBMM Başkanı)
  {
    id: 'cntr-numan-kurtulmus-1',
    mpId: 'numan_kurtulmus',
    title: 'HAS Parti Dönemindeki Sert İktidar Eleştirileri ve AK Parti\'ye Katılım Süreci',
    category: 'parti_kriz',
    severity: 'orta',
    date: '2010 - 2012',
    summary: 'HAS Parti Genel Başkanı olduğu dönemde iktidara yönelik "Harun gibi gelip Karun gibi gitmeyeceğiz" şeklindeki yolsuzluk ve sistem eleştirilerinin ardından partisini feshederek AK Parti\'ye katılması muhalefet tarafından sık sık gündeme getirildi.',
    mpResponse: 'Milletin ve Türkiye\'nin geleceği için büyük hedeflerde güç birliği yaptıklarını, geçmişteki sözlerinin ilkesel uyarılar olduğunu ve hizmet için bir araya geldiklerini ifade etti.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'Numan Kurtulmuş ve HAS Parti AK Parti\'ye katıldı',
        url: 'https://www.hurriyet.com.tr',
        outlet: 'Hürriyet',
        date: '2012',
      },
    ],
  },
  {
    id: 'cntr-numan-kurtulmus-2',
    mpId: 'numan_kurtulmus',
    title: 'Anayasa\'nın 3. Maddesi Üzerine Açıklamaları ve Gelen Tepkiler',
    category: 'soz_eylem',
    severity: 'orta',
    date: 'Ekim 2024',
    summary: 'Gazi Üniversitesi açılış dersinde "Devletin ülkesi ve milletiyle bölünmez bütünlüğü tabiri yerine milletin devleti olmalı" ifadeleriyle Anayasa\'nın 3. maddesine dair yaptığı değerlendirme hem iktidar hem muhalefet çevrelerinde tartışma yarattı.',
    mpResponse: 'Anayasa\'nın ilk 4 maddesinin tartışmaya kapalı olduğunu açıkça teyit ettiğini, sözlerinin bağlamından koparılarak speküle edildiğini açıkladı.',
    status: 'tekzip_edildi',
    sources: [
      {
        title: 'TBMM Başkanı Kurtulmuş\'tan Anayasa 3. madde açıklaması',
        url: 'https://www.aa.com.tr',
        outlet: 'Anadolu Ajansı',
        date: '11.10.2024',
      },
    ],
  },

  // Ömer Çelik (AKP Adana)
  {
    id: 'cntr-omer-celik-1',
    mpId: 'omer_celik',
    title: 'Geçmiş Açıklamalar ve Çözüm Süreci Dönemi Politikaları Polemiği',
    category: 'soz_eylem',
    severity: 'dusuk',
    date: '2013 - 2023',
    summary: 'Çözüm süreci dönemindeki açıklamaları ile sonraki güvenlik odaklı politikalar arasındaki değişim muhalefet partileri tarafından zaman zaman TBMM ve basın toplantılarında gündeme getirildi.',
    mpResponse: 'Terörle mücadelenin devlet aklıyla yürütüldüğünü, terör örgütünün silah bırakma vaatlerine uymaması üzerine kararlı operasyonların zorunlu hale geldiğini vurguladı.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'AK Parti Sözcüsü Ömer Çelik basın toplantısı tutanakları',
        url: 'https://www.akparti.org.tr',
        outlet: 'AK Parti Resmi Basın Arşivi',
        date: '2023',
      },
    ],
  },

  // Erkan Baş (TİP İstanbul)
  {
    id: 'cntr-erkan-bas-1',
    mpId: 'erkan_bas',
    title: 'Meclis Kürsüsü Protestoları ve Dokunulmazlık Dosyaları',
    category: 'yargi_fezleke',
    severity: 'orta',
    date: '2022 - 2024',
    summary: 'İşçi eylemleri, Gezi Parkı anmaları ve sokak gösterilerinde yaptığı konuşmalar nedeniyle hazırlanan "Toplantı ve Gösteri Yürüyüşleri Kanununa Muhalefet" fezlekeleri TBMM Başkanlığına iletildi.',
    mpResponse: 'İşçilerin, gençlerin ve emekçilerin anayasal hak arama mücadelesini savunduklarını, fezlekelerin halkın sesini kısmak için kullanıldığını belirtti.',
    status: 'fezleke_mecliste',
    sources: [
      {
        title: 'TİP Genel Başkanı Erkan Baş hakkında hazırlanan fezlekeler',
        url: 'https://www.tbmm.gov.tr',
        outlet: 'TBMM',
        date: '2023',
      },
    ],
  },

  // Mustafa Yeneroğlu (DEVA / CHP İstanbul)
  {
    id: 'cntr-mustafa-yeneroglu-1',
    mpId: 'mustafa_yeneroglu',
    title: 'AK Parti MKYK ve İnsan Hakları Komisyonu Başkanlığından İstifa Süreci',
    category: 'parti_kriz',
    severity: 'orta',
    date: 'Ekim 2019',
    summary: 'AK Parti milletvekili ve MKYK üyesi iken hukuk devleti, insan hakları ve KHK mağduriyetleri konusundaki itirazları nedeniyle parti yönetiminden gelen baskılar sonucu partisinden istifa etti.',
    mpResponse: 'İlkelerinden ve adalet anlayışından taviz veremeyeceğini, Türkiye\'nin güçler ayrılığı ve liyakat sistemine dönmesi gerektiğini belirterek DEVA Partisi kurucuları arasında yer aldı.',
    status: 'kamuoyu_tartismasi',
    sources: [
      {
        title: 'Mustafa Yeneroğlu AK Parti\'den istifa etti',
        url: 'https://www.dw.com/tr/mustafa-yenero%C4%9Flu-ak-partiden-istifa-etti/a-51052601',
        outlet: 'Deutsche Welle Türkçe',
        date: '30.10.2019',
      },
    ],
  },

  // Tülay Hatimoğulları (DEM Adana)
  {
    id: 'cntr-tulay-hatimogullari-1',
    mpId: 'tulay_hatimogullari',
    title: 'Siyasi Konuşmaları ve Miting Açıklamaları Nedeniyle Hazırlanan Fezlekeler',
    category: 'yargi_fezleke',
    severity: 'yuksek',
    date: '2021 - 2024',
    summary: 'Parti mitingleri ve etkinliklerindeki konuşmaları gerekçe gösterilerek terör örgütü propagandası ve kanuna muhalefet iddialarıyla hakkında çok sayıda dokunulmazlık fezlekesi hazırlandı.',
    mpResponse: 'Demokratik siyaset hakkını ve barış talebini savunduklarını, fezlekelerin muhalefeti Meclis dışına itmek amacıyla kullanılan yargısal baskı aracı olduğunu ifade etti.',
    status: 'fezleke_mecliste',
    sources: [
      {
        title: 'DEM Parti Eş Genel Başkanları hakkında TBMM\'ye fezleke gönderildi',
        url: 'https://www.evrensel.net',
        outlet: 'Evrensel',
        date: '2024',
      },
    ],
  },
];
