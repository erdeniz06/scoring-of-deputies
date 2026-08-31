import { MP } from '../../types';

export const PROVINCES_NEW_MPS: MP[] = [
  // ==========================================
  // KARS
  // ==========================================
  {
    id: 'adem_calkin',
    fullName: 'Adem Çalkın',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kars',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kars Milletvekili',
    bio: 'İktisatçı, iş insanı. AK Parti Kars eski İl Başkanı. 28. Dönem TBMM Kars Milletvekili.',
    stances: {}
  },
  {
    id: 'inan_akgun_alp',
    fullName: 'İnan Akgün Alp',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kars',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Kars Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat. 28. Dönem TBMM Kars Milletvekili. TBMM Adalet Komisyonu Üyesi.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_iaa_infaz',
        mpId: 'inan_akgun_alp',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Örtülü Af Düzenlemesini Eleştirdi',
        overallSummary: 'İnfaz yasasının adaletsizlik yarattığını, siyasi tutukluların kapsam dışı bırakılırken çetelerin serbest kaldığını savundu.',
        keyParaphrasedQuote: 'Adalet reformu adı altında getirilen düzenlemeler yargı bağımsızlığını ve eşitlik ilkesini zedelemektedir.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      }
    }
  },
  {
    id: 'gulistan_kilic_kocyigit',
    fullName: 'Gülistan Kılıç Koçyiğit',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Kars',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Grup Başkanvekili & Kars Milletvekili',
    bio: 'Sağlık emekçisi, siyasetçi. 27. Dönem Muş, 28. Dönem Kars Milletvekili. DEM Parti TBMM Grup Başkanvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_gkk_kayyum',
        mpId: 'gulistan_kilic_kocyigit',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Halk İradesi Gaspı Olarak Niteledi',
        overallSummary: 'Belediyelere kayyum atanmasının seçme ve seçilme hakkının açık ihlali olduğunu belirtti.',
        keyParaphrasedQuote: 'Kayyum rejimi demokratik siyasete ve Kürt halkının iradesine vurulmuş bir darbedir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_gkk_cerceve',
        mpId: 'gulistan_kilic_kocyigit',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Onurlu Barış ve Demokratik Çözüm',
        overallSummary: 'Kürt meselesinin TBMM zemininde, eşit yurttaşlık ve demokratik anayasa çerçevesinde çözülmesi gerektiğini vurguladı.',
        keyParaphrasedQuote: 'Kalıcı ve onurlu bir barış için muhataplarla şeffaf ve yasal güvenceli bir süreç işletilmelidir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // KASTAMONU
  // ==========================================
  {
    id: 'halil_uluay',
    fullName: 'Halil Uluay',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kastamonu',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kastamonu Milletvekili',
    bio: 'Avukat, Kastamonu Barosu eski Başkanı. 28. Dönem TBMM Kastamonu Milletvekili.',
    stances: {}
  },
  {
    id: 'fatma_serap_ekmekci',
    fullName: 'Fatma Serap Ekmekci',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kastamonu',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kastamonu Milletvekili',
    bio: 'Avukat. 28. Dönem TBMM Kastamonu Milletvekili. TBMM Kadın Erkek Fırsat Eşitliği Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'hasan_baltaci',
    fullName: 'Hasan Baltacı',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kastamonu',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (Milletvekilliğinden İstifa Etti)',
    title: 'Kastamonu Belediye Başkanı (Eski CHP Kastamonu Milletvekili)',
    bio: 'Harita ve Kadastro Mühendisi. 27. ve 28. Dönem Kastamonu Milletvekili. 31 Mart 2024 yerel seçimlerinde Kastamonu Belediye Başkanı seçilerek milletvekilliğinden istifa etmiştir.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_hb_kurultay',
        mpId: 'hasan_baltaci',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel ve Değişim Hareketini Destekledi',
        overallSummary: '38. Olağan Kurultay sürecinde değişim hareketinin öncülerinden biri olarak yer aldı.',
        keyParaphrasedQuote: 'Cumhuriyet Halk Partisi’nin değişimi Türkiye’nin umudu haline gelecektir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // KAYSERİ
  // ==========================================
  {
    id: 'hulusi_akar',
    fullName: 'Hulusi Akar',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Hulusi_Akar_2022.jpg/600px-Hulusi_Akar_2022.jpg',
    term: '28. Dönem',
    title: 'TBMM Milli Savunma Komisyonu Başkanı & Kayseri Milletvekili',
    bio: 'Eski Genelkurmay Başkanı (2015-2018) ve Eski Milli Savunma Bakanı (2018-2023). 28. Dönem TBMM Kayseri Milletvekili ve TBMM Milli Savunma Komisyonu Başkanı.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#kayseri-38',
    stances: {
      'cerceve_yasa': {
        id: 'st_ha_cerceve',
        mpId: 'hulusi_akar',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Terörsüz Türkiye ve Milli Güvenlik',
        overallSummary: 'Terörle mücadelenin sınır içi ve sınır ötesinde tavizsiz sürdürüleceğini ve terörün kaynağında kurutulacağını savundu.',
        keyParaphrasedQuote: 'En son terörist etkisiz hale getirilinceye kadar mücadelemiz kararlılıkla devam edecektir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'tarikat_cemaatler': {
        id: 'st_ha_tarikat',
        mpId: 'hulusi_akar',
        topicId: 'tarikat_cemaatler',
        stanceTag: 'savundu',
        stanceLabel: 'Milli ve Manevi Değerler Eğitimi',
        overallSummary: 'Eğitimde ve gençlik politikalarında milli ve manevi değerlerin önceliklendirilmesi gerektiğini savundu.',
        keyParaphrasedQuote: 'Gençlerimizin milli, ahlaki ve insani değerlerle donatılması geleceğimizin en büyük teminatıdır.',
        lastUpdated: '2024',
        sources: []
      }
    }
  },
  {
    id: 'ayse_bohurler',
    fullName: 'Ayşe Böhürler',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kayseri Milletvekili & Gazeteci-Yazar',
    bio: 'Gazeteci, yazar, televizyon programcısı. AK Parti Kurucu Üyesi ve MKYK Üyesi. 28. Dönem TBMM Kayseri Milletvekili.',
    stances: {}
  },
  {
    id: 'saban_copuroglu',
    fullName: 'Şaban Çopuroğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kayseri Milletvekili',
    bio: 'İş insanı, sanayici. AK Parti Kayseri eski İl Başkanı. 28. Dönem TBMM Kayseri Milletvekili.',
    stances: {}
  },
  {
    id: 'murat_cahid_cingi',
    fullName: 'Murat Cahid Cıngı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kayseri Milletvekili',
    bio: 'Akademisyen, Erciyes A.Ş. eski Yönetim Kurulu Başkanı. 28. Dönem TBMM Kayseri Milletvekili.',
    stances: {}
  },
  {
    id: 'sayin_bayar_ozsoy',
    fullName: 'Sayın Bayar Özsoy',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kayseri Milletvekili',
    bio: 'İnşaat mühendisi, bürokrat. 28. Dönem TBMM Kayseri Milletvekili.',
    stances: {}
  },
  {
    id: 'askin_genc',
    fullName: 'Aşkın Genç',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Kayseri Milletvekili & TBMM Milli Savunma Komisyonu Üyesi',
    bio: 'İş insanı, sanayici. 28. Dönem TBMM Kayseri Milletvekili. TBMM Milli Savunma Komisyonu Üyesi.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_ag_sokak',
        mpId: 'askin_genc',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ötanazi Maddelerine Karşı Çıktı',
        overallSummary: 'Hayvan hakları düzenlemesinde kısırlaştırma ve barınak seferberliği yapılması gerektiğini belirtti.',
        keyParaphrasedQuote: 'Çözüm öldürmek değil, yaşatmak ve bilimsel kısırlaştırma politikalarını hayata geçirmektir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'mahmut_arikan',
    fullName: 'Mahmut Arıkan',
    partyId: 'saadet',
    electedPartyId: 'chp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (CHP Listesinden Seçildi)',
    title: 'Saadet Partisi Genel Başkanı & Kayseri Milletvekili',
    bio: 'İnşaat mühendisi. 28. Dönem TBMM Kayseri Milletvekili. 2024 yılında Saadet Partisi Genel Başkanlığına seçilmiştir.',
    stances: {
      '2023_kk_adaylik': {
        id: 'st_ma_kk_aday',
        mpId: 'mahmut_arikan',
        topicId: '2023_kk_adaylik',
        stanceTag: 'destekledi',
        stanceLabel: 'Millet İttifakı Ortaklığını Destekledi',
        overallSummary: '2023 seçimlerinde Saadet Partisi Genel Başkan Yardımcısı olarak ortak aday ve mutabakat metnini savundu.',
        keyParaphrasedQuote: 'Türkiye’nin kutuplaşmadan kurtulması için farklı geleneklerin adalet zemininde buluşması zorunludur.',
        lastUpdated: 'Mayıs 2023',
        sources: []
      }
    }
  },
  {
    id: 'ismail_ozdemir',
    fullName: 'İsmail Özdemir',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Genel Başkan Yardımcısı & Kayseri Milletvekili',
    bio: 'Makine mühendisi. 27. ve 28. Dönem TBMM Kayseri Milletvekili. MHP Medya, Tanıtım ve Halkla İlişkilerden Sorumlu Genel Başkan Yardımcısı.',
    stances: {
      'cerceve_yasa': {
        id: 'st_io_cerceve',
        mpId: 'ismail_ozdemir',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Lider Bahçeli’nin Çağrısını Savundu',
        overallSummary: 'Devlet Bahçeli’nin Terörsüz Türkiye ve tarihi çağrısını milli birlik ve beka ekseninde savundu.',
        keyParaphrasedQuote: 'Liderimizin çağrısı Türkiye Yüzyılı’nın kapısını aralayan tarihi ve stratejik bir adımdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'mustafa_baki_ersoy',
    fullName: 'Mustafa Baki Ersoy',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Kayseri Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'İktisatçı, iş insanı. 27. ve 28. Dönem TBMM Kayseri Milletvekili. TBMM Plan ve Bütçe Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'dursun_atas',
    fullName: 'Dursun Ataş',
    partyId: 'akp',
    electedPartyId: 'iyi',
    province: 'Kayseri',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (İYİ Parti’den Seçildi, AK Parti’ye Katıldı)',
    title: 'AK Parti Kayseri Milletvekili',
    bio: 'Pınarbaşı eski Belediye Başkanı. 27. ve 28. Dönem Kayseri Milletvekili. İYİ Parti’den istifa ederek AK Parti’ye katılmıştır.',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_da_iyi_kurultay',
        mpId: 'dursun_atas',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'elestirdi',
        stanceLabel: 'İYİ Parti’den Ayrıldı',
        overallSummary: 'Parti içi politikalardaki tıkanıklık ve savrulmayı gerekçe göstererek İYİ Parti’den istifa edip AK Parti’ye geçmiştir.',
        keyParaphrasedQuote: 'Milletimize hizmet yolunda istikrar ve kalkınma vizyonuna destek vermek için AK Parti’ye katıldım.',
        lastUpdated: '2024',
        sources: []
      }
    }
  },

  // ==========================================
  // KIRIKKALE
  // ==========================================
  {
    id: 'mustafa_kaplan',
    fullName: 'Mustafa Kaplan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kırıkkale',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kırıkkale Milletvekili',
    bio: 'İktisatçı, AK Parti Kırıkkale eski İl Başkanı. 28. Dönem TBMM Kırıkkale Milletvekili.',
    stances: {}
  },
  {
    id: 'ahmet_onal',
    fullName: 'Ahmet Önal',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kırıkkale',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (Milletvekilliğinden İstifa Etti)',
    title: 'Kırıkkale Belediye Başkanı (Eski CHP Kırıkkale Milletvekili)',
    bio: 'Avukat. 27. ve 28. Dönem Kırıkkale Milletvekili. 31 Mart 2024 yerel seçimlerinde Kırıkkale Belediye Başkanı seçilerek milletvekilliğinden istifa etmiştir.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_ao_kurultay',
        mpId: 'ahmet_onal',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Değişim Sürecini Destekledi',
        overallSummary: 'Kurultay sürecinde partinin dinamizmini artıracak değişimi destekledi ve yerel seçimde Kırıkkale’de tarihi başarı kazandı.',
        keyParaphrasedQuote: 'Kırıkkale halkının güveniyle başlattığımız yürüyüş halkın belediyeciliğiyle taçlanmıştır.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'halil_ozturk',
    fullName: 'Halil Öztürk',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Kırıkkale',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Kırıkkale Milletvekili & TBMM Adalet Komisyonu Katip Üyesi',
    bio: 'Hukukçu, avukat. MHP Merkez Disiplin Kurulu Başkanı. 27. ve 28. Dönem TBMM Kırıkkale Milletvekili.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ho_infaz',
        mpId: 'halil_ozturk',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'savundu',
        stanceLabel: 'İnfaz Yasasını ve Şartlı Salıverilmeyi Savundu',
        overallSummary: 'Ceza infaz kurumlarındaki düzenlemeler ve şartlı tahliye iyileştirmelerini savundu.',
        keyParaphrasedQuote: 'Hukuk sistemimizde denge ve rehabilitasyonu sağlayan adımlar atılmıştır.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // KIRKLARELİ
  // ==========================================
  {
    id: 'vecdi_gundogdu',
    fullName: 'Vecdi Gündoğdu',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kırklareli',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Kırklareli Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'İş insanı. 25, 26, 27 ve 28. Dönem TBMM Kırklareli Milletvekili. TBMM Çevre Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'fahri_ozkan',
    fullName: 'Fahri Özkan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kırklareli',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Kırklareli Milletvekili',
    bio: 'Ziraat yüksek mühendisi, sanayici. 28. Dönem TBMM Kırklareli Milletvekili.',
    stances: {}
  },
  {
    id: 'ahmet_gokhan_saricam',
    fullName: 'Ahmet Gökhan Sarıçam',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kırklareli',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kırklareli Milletvekili',
    bio: 'Hukukçu, avukat. 22. ve 28. Dönem TBMM Kırklareli Milletvekili.',
    stances: {}
  },

  // ==========================================
  // KIRŞEHİR
  // ==========================================
  {
    id: 'necmettin_erkan',
    fullName: 'Necmettin Erkan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kırşehir',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kırşehir Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'Üst düzey bürokrat, eski Esnaf ve Sanatkârlar Genel Müdürü. 28. Dönem TBMM Kırşehir Milletvekili.',
    stances: {}
  },
  {
    id: 'metin_ilhan',
    fullName: 'Dr. Metin İlhan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Kırşehir',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Kırşehir Milletvekili & TBMM Sağlık Komisyonu Üyesi',
    bio: 'Tıp doktoru, akademisyen (Doçent Doktor). 27. ve 28. Dönem TBMM Kırşehir Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_mi_sokak',
        mpId: 'metin_ilhan',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Halk Sağlığı ve Yaşam Hakkı',
        overallSummary: 'Başıboş hayvan sorununun çözümünün katliam değil, kamusal kısırlaştırma seferberliği olduğunu savundu.',
        keyParaphrasedQuote: 'Bir hekim olarak yaşam hakkını sonuna kadar savunacağız.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // KİLİS
  // ==========================================
  {
    id: 'ahmet_salih_dal',
    fullName: 'Ahmet Salih Dal',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Kilis',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Kilis Milletvekili',
    bio: 'İlahiyatçı, eğitimci. 24, 27 ve 28. Dönem TBMM Kilis Milletvekili.',
    stances: {}
  },
  {
    id: 'mustafa_demir_kilis',
    fullName: 'Mustafa Demir',
    partyId: 'bagimsiz',
    electedPartyId: 'mhp',
    province: 'Kilis',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (MHP’den Seçildi, Bağımsız)',
    title: 'Kilis Milletvekili (Bağımsız)',
    bio: 'İş insanı. 28. Dönem TBMM Kilis Milletvekili. MHP’den seçilmiş olup görevini bağımsız milletvekili olarak sürdürmektedir.',
    stances: {}
  },

  // ==========================================
  // SİNOP
  // ==========================================
  {
    id: 'nazim_mavis',
    fullName: 'Dr. Nazım Maviş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Sinop',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Sinop Milletvekili & TBMM Milli Eğitim Komisyonu Üyesi',
    bio: 'Siyaset bilimci, yazar. 26, 27 ve 28. Dönem TBMM Sinop Milletvekili. AK Parti MKYK Üyesi.',
    stances: {
      'tarikat_cemaatler': {
        id: 'st_nm_tarikat',
        mpId: 'nazim_mavis',
        topicId: 'tarikat_cemaatler',
        stanceTag: 'savundu',
        stanceLabel: 'Sivil Toplum ve Değerler Eğitimi',
        overallSummary: 'Vakıf ve sivil toplum kuruluşlarıyla milli eğitim protokollerini savundu.',
        keyParaphrasedQuote: 'Milletimizin köklü vakıf kültürü ve sivil inisiyatifleri eğitimimizin zenginliğidir.',
        lastUpdated: '2024',
        sources: []
      }
    }
  },
  {
    id: 'baris_karadeniz',
    fullName: 'Barış Karadeniz',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Sinop',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Sinop Milletvekili & TBMM Katip Üyesi',
    bio: 'İktisatçı. 25, 26, 27 ve 28. Dönem TBMM Sinop Milletvekili. TBMM Başkanlık Divanı Katip Üyesi.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_bk_kurultay',
        mpId: 'baris_karadeniz',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'notr_cekimser',
        stanceLabel: 'Parti Bütünlüğü Vurgusu',
        overallSummary: 'Kurultay sürecinde örgütün birlik ve beraberliğini ön planda tutan dengeli bir tutum sergiledi.',
        keyParaphrasedQuote: 'CHP’de kazanan veya kaybeden yoktur, kazanan Cumhuriyet ve demokrasidir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },

  // ==========================================
  // SİVAS
  // ==========================================
  {
    id: 'abdullah_guler',
    fullName: 'Abdullah Güler',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Sivas',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti TBMM Grup Başkanı & Sivas Milletvekili',
    bio: 'Hukukçu, avukat. 27. Dönem İstanbul, 28. Dönem Sivas Milletvekili. AK Parti TBMM Grup Başkanı.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#sivas-58',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_ag_sokak_yasa',
        mpId: 'abdullah_guler',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'savundu',
        stanceLabel: 'Kanun Teklifini Meclise Sundu ve Savundu',
        overallSummary: 'Hayvanları Koruma Kanununda Değişiklik Yapılmasına Dair Kanun Teklifi’ni TBMM’ye sunan ve yasalaşmasını yöneten isim oldu.',
        keyParaphrasedQuote: 'Vatandaşlarımızın sokaklarda güvenle yürümesi ve kuduz riskinin ortadan kalkması için yasal zorunlulukları yerine getirdik.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_ag_cerceve',
        mpId: 'abdullah_guler',
        topicId: 'cerceve_yasa',
        stanceTag: 'destekledi',
        stanceLabel: 'Cumhur İttifakı Mutabakatını Savundu',
        overallSummary: 'Terörsüz Türkiye hedefi doğrultusunda Cumhur İttifakı’nın yasal ve siyasi adımlarını koordine etti.',
        keyParaphrasedQuote: 'Milletimizin huzuru ve devletimizin bekası için atılan her adımın arkasındayız.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'hakan_aksu',
    fullName: 'Hakan Aksu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Sivas',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Sivas Milletvekili',
    bio: 'Eczacı, AK Parti Sivas eski İl Başkanı. 28. Dönem TBMM Sivas Milletvekili.',
    stances: {}
  },
  {
    id: 'rukiye_toy',
    fullName: 'Rukiye Toy',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Sivas',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Sivas Milletvekili',
    bio: 'İlahiyatçı, eğitimci. 28. Dönem TBMM Sivas Milletvekili. TBMM Dilekçe Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'ulas_karasu',
    fullName: 'Ulaş Karasu',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Sivas',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Genel Başkan Yardımcısı & Sivas Milletvekili',
    bio: 'İnşaat mühendisi. 27. ve 28. Dönem TBMM Sivas Milletvekili. CHP Ulaştırma ve Altyapıdan Sorumlu Genel Başkan Yardımcısı.',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_uk_kurultay',
        mpId: 'ulas_karasu',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel Yönetiminde MYK Üyesi',
        overallSummary: '38. Olağan Kurultay sonrası Özgür Özel’in A Takımı olan Merkez Yönetim Kurulu’nda Genel Başkan Yardımcılığına getirildi.',
        keyParaphrasedQuote: 'Cumhuriyet Halk Partisi iktidar yürüyüşünü yenilenen kadrolarıyla kararlılıkla sürdürecektir.',
        lastUpdated: 'Kasım 2023',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_uk_sokak',
        mpId: 'ulas_karasu',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Yasa Tasarısına Sert Karşı Çıktı',
        overallSummary: 'Belediyelerin bütçelerinin kısıldığını, sorumluluğun yerel yönetimlere yıkıldığını belirterek ötanaziye karşı çıktı.',
        keyParaphrasedQuote: 'Kaynak ayırmadan, barınak altyapısı kurmadan hayvanları katletme yetkisi verilemez.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'ahmet_ozyurek',
    fullName: 'Ahmet Özyürek',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Sivas',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Sivas Milletvekili',
    bio: 'İş insanı, müteahhit. 27. ve 28. Dönem TBMM Sivas Milletvekili.',
    stances: {}
  },

  // ==========================================
  // ŞANLIURFA
  // ==========================================
  {
    id: 'bekir_bozdag',
    fullName: 'Bekir Bozdağ',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bekir_Bozdag_2022.jpg/600px-Bekir_Bozdag_2022.jpg',
    term: '28. Dönem',
    title: 'TBMM Başkanvekili & Şanlıurfa Milletvekili',
    bio: 'Hukukçu, ilahiyatçı. Eski Adalet Bakanı ve Başbakan Yardımcısı. 22, 23, 24, 26, 27. Dönem Yozgat, 28. Dönem Şanlıurfa Milletvekili ve TBMM Başkanvekili.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#sanliurfa-63',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_bb_infaz',
        mpId: 'bekir_bozdag',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'savundu',
        stanceLabel: 'İnfaz Yasası Reformlarını Savundu',
        overallSummary: 'Adalet Bakanlığı döneminde hazırlanan reform paketlerini ve infaz düzenlemelerini savundu.',
        keyParaphrasedQuote: 'Yargı reformları ile ceza infaz kurumlarında modern ve insani standartlar tesis edilmiştir.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_bb_cerceve',
        mpId: 'bekir_bozdag',
        topicId: 'cerceve_yasa',
        stanceTag: 'destekledi',
        stanceLabel: 'Milli Birlik ve Hukuk Devleti İlkeleri',
        overallSummary: 'Cumhur İttifakı’nın Terörsüz Türkiye hamlesini anayasal ve yasal sınırlar çerçevesinde destekledi.',
        keyParaphrasedQuote: 'Devletimiz terörle mücadeleyi kararlılıkla sürdürürken kardeşlik bağlarımızı güçlendirecektir.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'abdulkadir_emin_onen',
    fullName: 'Abdulkadir Emin Önen',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili & Eski Pekin Büyükelçisi',
    bio: 'Siyaset bilimci, diplomat. Türkiye’nin Pekin eski Büyükelçisi. 23, 24 ve 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'abdurrahim_dusak',
    fullName: 'Prof. Dr. Abdürrahim Dusak',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Tıp doktoru, radyoloji profesörü. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'mehmet_ali_cevheri',
    fullName: 'Mehmet Ali Cevheri',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Ziraat mühendisi, iktisatçı. 26, 27 ve 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'cevahir_asuman_yazmaci',
    fullName: 'Cevahir Asuman Yazmacı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Girişimci, TOBB Şanlıurfa Kadın Girişimciler Kurulu eski Başkanı. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'ibrahim_eyyupoglu',
    fullName: 'İbrahim Eyyüpoğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Hukukçu, avukat. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'hikmet_basak',
    fullName: 'Hikmet Başak',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Ziraat odası yöneticisi, çiftçi. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'mehmet_faruk_pinarbasi',
    fullName: 'Mehmet Faruk Pınarbaşı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şanlıurfa Milletvekili',
    bio: 'Birecik eski Belediye Başkanı, avukat. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'mithat_sancar',
    fullName: 'Prof. Dr. Mithat Sancar',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mithat_Sancar_2022.jpg/600px-Mithat_Sancar_2022.jpg',
    term: '28. Dönem',
    title: 'DEM Parti Şanlıurfa Milletvekili & Eski Eş Genel Başkan',
    bio: 'Anayasa hukuku profesörü, akademisyen, yazar. HDP/DEM Parti eski Eş Genel Başkanı (2020-2023) ve TBMM eski Başkanvekili. 25, 26. Dönem Mardin, 28. Dönem Şanlıurfa Milletvekili.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#sanliurfa-63',
    stances: {
      'cerceve_yasa': {
        id: 'st_ms_cerceve',
        mpId: 'mithat_sancar',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Anayasal ve Demokratik Çözüm',
        overallSummary: 'Kürt meselesinin kalıcı ve onurlu bir barışla, TBMM zemininde ve yeni demokratik anayasa ilkeleriyle çözülmesini savundu.',
        keyParaphrasedQuote: 'Barış sadece bir temenni değil; eşitlik, adalet ve demokratik siyasetin anayasal güvenceye kavuşturulmasıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'kayyum_uygulamalari': {
        id: 'st_ms_kayyum',
        mpId: 'mithat_sancar',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Anayasa İhlali Olarak Niteledi',
        overallSummary: 'Kayyum atamalarının Anayasa’nın amir hükümlerine ve seçme hakkına aykırı olduğunu savundu.',
        keyParaphrasedQuote: 'Seçilmiş belediye başkanlarının görevden alınıp yerlerine memur atanması seçme hakkının fiilen kaldırılmasıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'omer_ocalan',
    fullName: 'Ömer Öcalan',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Şanlıurfa Milletvekili',
    bio: 'Gazeteci, siyasetçi. 27. ve 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_oo_cerceve',
        mpId: 'omer_ocalan',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Tecridin Kaldırılması ve Diyalog',
        overallSummary: 'İmralı ile görüşmelerin ve tecridin kaldırılmasının barış sürecinin anahtarı olduğunu vurguladı.',
        keyParaphrasedQuote: 'Kürt sorununun demokratik çözümü için muhatapların özgürce iletişim kurabilmesi şarttır.',
        lastUpdated: 'Ekim 2024',
        sources: []
      }
    }
  },
  {
    id: 'dilan_kunt_ayan',
    fullName: 'Dilan Kunt Ayan',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Şanlıurfa Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, insan hakları savunucusu avukat. 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },
  {
    id: 'ferit_senyasar',
    fullName: 'Ferit Şenyaşar',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Şanlıurfa Milletvekili & TBMM İnsan Hakları Komisyonu Üyesi',
    bio: 'Adalet nöbeti mücadelesiyle tanınan siyasetçi. 28. Dönem TBMM Şanlıurfa Milletvekili ve TBMM İnsan Haklarını İnceleme Komisyonu Üyesi.',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_fs_infaz',
        mpId: 'ferit_senyasar',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Adalet Mücadelesi ve Cezasızlık Eleştirisi',
        overallSummary: 'Katliam faillerinin cezasız bırakılmasını ve adalet arayanların baskı görmesini eleştirdi.',
        keyParaphrasedQuote: 'Gerçek adalet sağlanmadan toplumsal barış ve huzur inşa edilemez.',
        lastUpdated: '2023',
        sources: []
      }
    }
  },
  {
    id: 'mahmut_tanal',
    fullName: 'Mahmut Tanal',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Şanlıurfa Milletvekili & TBMM İnsan Hakları Komisyonu Üyesi',
    bio: 'Hukukçu, avukat. 24, 25, 26, 27. Dönem İstanbul, 28. Dönem Şanlıurfa Milletvekili. Sahadaki aktif hak savunuculuğuyla tanınır.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#sanliurfa-63',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_mt_sokak',
        mpId: 'mahmut_tanal',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Komisyonda ve Sahada Sert Muhalefet',
        overallSummary: 'Komisyon görüşmelerinde yasanın anayasaya ve uluslararası sözleşmelere aykırı olduğunu savunarak sabaha kadar direndi.',
        keyParaphrasedQuote: 'Bu kanun teklifi bir katliam yasasıdır. Yaşam hakkı kutsaldır, hayvanların yaşam hakkını savunmaya devam edeceğiz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      'kayyum_uygulamalari': {
        id: 'st_mt_kayyum',
        mpId: 'mahmut_tanal',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Milli İrade Gaspına Karşı Çıktı',
        overallSummary: 'Kayyum atamalarının hukuksuz olduğunu, suç varsa yargının bağımsız karar vermesi ve belediye meclisinin seçim yapması gerektiğini belirtti.',
        keyParaphrasedQuote: 'Sandıktan çıkanı beğenmeyip kayyum atamak demokrasiyi yok saymaktır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'ibrahim_ozyavuz',
    fullName: 'İbrahim Özyavuz',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Şanlıurfa',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Şanlıurfa Milletvekili',
    bio: 'Harran eski Belediye Başkanı. 27. ve 28. Dönem TBMM Şanlıurfa Milletvekili.',
    stances: {}
  },

  // ==========================================
  // ŞIRNAK
  // ==========================================
  {
    id: 'nevroz_uysal_aslan',
    fullName: 'Nevroz Uysal Aslan',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şırnak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Şırnak Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat (Asrın Hukuk Bürosu). 28. Dönem TBMM Şırnak Milletvekili ve TBMM Adalet Komisyonu Üyesi.',
    stances: {
      'cerceve_yasa': {
        id: 'st_nua_cerceve',
        mpId: 'nevroz_uysal_aslan',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Tecridin Sona Ermesi ve Hukuki Statü',
        overallSummary: 'İmralı cezaevindeki tecrit koşullarının uluslararası hukuka aykırı olduğunu ve barış için hukuki güvencelerin sağlanmasını savundu.',
        keyParaphrasedQuote: 'Hukuk devleti ilkesi her vatandaş için ve tüm cezaevlerinde istisnasız uygulanmalıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'mehmet_zeki_irmez',
    fullName: 'Mehmet Zeki İrmez',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şırnak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Şırnak Milletvekili',
    bio: 'Eğitimci, siyasetçi. 28. Dönem TBMM Şırnak Milletvekili.',
    stances: {}
  },
  {
    id: 'aysegul_dogan_dagli',
    fullName: 'Ayşegül Doğan Dağlı',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Şırnak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Parti Sözcüsü & Şırnak Milletvekili',
    bio: 'Gazeteci, program yapımcısı, siyasetçi. DEM Parti Merkez Yürütme Kurulu Üyesi ve Parti Sözcüsü. 28. Dönem TBMM Şırnak Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_add_kayyum',
        mpId: 'aysegul_dogan_dagli',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Siyasi Darbe Olarak Niteledi',
        overallSummary: 'Parti Sözcüsü olarak kayyum kararlarının halk iradesini tasfiye etme girişimi olduğunu açıkladı.',
        keyParaphrasedQuote: 'Kayyumlara karşı demokratik direnme hakkımızı ve sandık meşruiyetini savunacağız.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_add_cerceve',
        mpId: 'aysegul_dogan_dagli',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Demokratik Uzlaşı ve Eşit Yurttaşlık',
        overallSummary: 'Türkiye’nin temel sorunlarının barışçıl ve anayasal güvenceli diyalogla çözülmesi gerektiğini belirtti.',
        keyParaphrasedQuote: 'Tarihi bir fırsat penceresi açılacaksa bunun yolu samimi, şeffaf ve somut adımlardan geçer.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'arslan_tatar',
    fullName: 'Arslan Tatar',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Şırnak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Şırnak Milletvekili',
    bio: 'İş insanı, müteahhit. 28. Dönem TBMM Şırnak Milletvekili.',
    stances: {}
  },

  // ==========================================
  // TEKİRDAĞ
  // ==========================================
  {
    id: 'faik_oztrak',
    fullName: 'Faik Öztrak',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Faik_%C3%96ztrak_%28cropped%29.jpg/600px-Faik_%C3%96ztrak_%28cropped%29.jpg',
    term: '28. Dönem',
    title: 'CHP Tekirdağ Milletvekili & Eski Parti Sözcüsü',
    bio: 'İktisatçı, eski Hazine Müsteşarı. 23, 24, 25, 26, 27 ve 28. Dönem Tekirdağ Milletvekili. CHP eski Genel Başkan Yardımcısı ve Parti Sözcüsü.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#tekirdag-59',
    stances: {
      '2023_kk_adaylik': {
        id: 'st_fo_kk_aday',
        mpId: 'faik_oztrak',
        topicId: '2023_kk_adaylik',
        stanceTag: 'savundu',
        stanceLabel: 'Kemal Kılıçdaroğlu Adaylığını ve Politikalarını Savundu',
        overallSummary: 'Parti Sözcüsü ve Genel Başkan Yardımcısı olarak 2023 seçim sürecinde Kılıçdaroğlu’nun vizyonunu ve ekonomi programını yönetti.',
        keyParaphrasedQuote: 'Hak, hukuk ve adalet mücadelesiyle liyakatli kadroları devlet yönetimine getireceğiz.',
        lastUpdated: 'Mayıs 2023',
        sources: []
      },
      '2023_kk_oo_kurultay': {
        id: 'st_fo_kurultay',
        mpId: 'faik_oztrak',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Kemal Kılıçdaroğlu’nun Yanında Yer Aldı',
        overallSummary: '38. Olağan Kurultay’da Kemal Kılıçdaroğlu’nun listesinde yer alarak genel başkanlığını savundu.',
        keyParaphrasedQuote: 'Partimizin kurumsal kimliğini ve kazanımlarını korumak en temel sorumluluğumuzdur.',
        lastUpdated: 'Kasım 2023',
        sources: []
      }
    }
  },
  {
    id: 'ilhami_ozcan_aygun',
    fullName: 'Dr. İlhami Özcan Aygun',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Tekirdağ Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'Ziraat yüksek mühendisi, tohumculuk uzmanı. 27. ve 28. Dönem TBMM Tekirdağ Milletvekili.',
    stances: {}
  },
  {
    id: 'cem_avsar',
    fullName: 'Cem Avşar',
    partyId: 'deva',
    electedPartyId: 'chp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem (CHP Listesinden Seçildi)',
    title: 'DEVA Partisi Genel Başkan Yardımcısı & Tekirdağ Milletvekili',
    bio: 'İş insanı. 28. Dönem TBMM Tekirdağ Milletvekili. DEVA Partisi Yerel Yönetimler ve Şehircilik Politikaları Başkanı.',
    stances: {
      '2023_kk_adaylik': {
        id: 'st_ca_kk_aday',
        mpId: 'cem_avsar',
        topicId: '2023_kk_adaylik',
        stanceTag: 'destekledi',
        stanceLabel: 'Millet İttifakı Protokolünü Destekledi',
        overallSummary: 'Millet İttifakı listelerinden seçilerek DEVA Partisi’nin ortak mutabakat programını savundu.',
        keyParaphrasedQuote: 'Türkiye’nin ortak akılla ve kuvvetler ayrılığına dayalı parlamenter sistemle yönetilmesi gerekir.',
        lastUpdated: 'Mayıs 2023',
        sources: []
      }
    }
  },
  {
    id: 'nurten_yontar',
    fullName: 'Nurten Yontar',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Tekirdağ Milletvekili & TBMM Milli Eğitim Komisyonu Üyesi',
    bio: 'İktisatçı, sivil toplum yöneticisi. 28. Dönem TBMM Tekirdağ Milletvekili.',
    stances: {}
  },
  {
    id: 'mestan_ozcan',
    fullName: 'Mestan Özcan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Tekirdağ Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'Ziraat mühendisi, sanayici. AK Parti Tekirdağ eski İl Başkanı. 28. Dönem TBMM Tekirdağ Milletvekili.',
    stances: {}
  },
  {
    id: 'gokhan_diktas',
    fullName: 'Gökhan Diktaş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Tekirdağ Milletvekili',
    bio: 'İş insanı, inşaat mühendisi. 28. Dönem TBMM Tekirdağ Milletvekili.',
    stances: {}
  },
  {
    id: 'cigdem_koncagul',
    fullName: 'Çiğdem Koncagül',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Tekirdağ Milletvekili',
    bio: 'Hukukçu, avukat. 27. ve 28. Dönem TBMM Tekirdağ Milletvekili. TBMM Dilekçe Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'selcan_hamsioglu',
    fullName: 'Selcan Hamşıoğlu',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Tekirdağ',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'İYİ Parti Tekirdağ Milletvekili & Gazeteci-Yazar',
    bio: 'Gazeteci, köşe yazarı, sosyolog. 28. Dönem TBMM Tekirdağ Milletvekili. İYİ Parti Genel İdare Kurulu Üyesi.',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_sh_iyi_kurultay',
        mpId: 'selcan_hamsioglu',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'savundu',
        stanceLabel: 'Üçüncü Yol ve Milliyetçi Çizgi',
        overallSummary: 'Partinin müstakil siyaset ve Türk milliyetçiliği ekseninde bağımsız yoluna devam etmesini savundu.',
        keyParaphrasedQuote: 'Türk milletinin kendi öz değerleriyle üçüncü yolu inşa etmekte kararlıyız.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // TOKAT
  // ==========================================
  {
    id: 'yusuf_beyazit',
    fullName: 'Yusuf Beyazıt',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tokat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'TBMM Anayasa Komisyonu Başkanı & Tokat Milletvekili',
    bio: 'Hukukçu, eski Vakıflar Genel Müdürü. 26, 27 ve 28. Dönem TBMM Tokat Milletvekili. TBMM Anayasa Komisyonu Başkanı.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#tokat-60',
    stances: {
      'yeni_anayasa_sureci': {
        id: 'st_yb_anayasa',
        mpId: 'yusuf_beyazit',
        topicId: 'yeni_anayasa_sureci',
        stanceTag: 'savundu',
        stanceLabel: 'Sivil ve Kuşatıcı Anayasa Vizyonu',
        overallSummary: 'TBMM Anayasa Komisyonu Başkanı olarak darbe anayasasından arınmış, sivil ve özgürlükçü yeni anayasa çalışmalarını yönetti.',
        keyParaphrasedQuote: 'Cumhuriyetimizin 100. yılında milletimize sivil, demokratik ve kuşatıcı bir anayasa hediye etmek tarihi borcumuzdur.',
        lastUpdated: '2024',
        sources: []
      }
    }
  },
  {
    id: 'mustafa_arslan_tokat',
    fullName: 'Mustafa Arslan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tokat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Tokat Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat. 27. ve 28. Dönem TBMM Tokat Milletvekili.',
    stances: {}
  },
  {
    id: 'cuneyt_aldemir',
    fullName: 'Cüneyt Aldemir',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Tokat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Tokat Milletvekili',
    bio: 'Diş hekimi, AK Parti Tokat eski İl Başkanı. 28. Dönem TBMM Tokat Milletvekili.',
    stances: {}
  },
  {
    id: 'kadim_durmaz',
    fullName: 'Kadim Durmaz',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Tokat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Tokat Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'Eğitimci, iş insanı. 25, 26, 27 ve 28. Dönem TBMM Tokat Milletvekili.',
    stances: {}
  },
  {
    id: 'yucel_bulut',
    fullName: 'Yücel Bulut',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Tokat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Tokat Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat. MHP Hukuk ve Seçim İşlerinden Sorumlu eski Başkan Yardımcısı. 27. ve 28. Dönem TBMM Tokat Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_yb_cerceve',
        mpId: 'yucel_bulut',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Devletin Beka Stratejisini Savundu',
        overallSummary: 'Terörün tasfiyesi ve bölge huzurunun tesisi için Cumhur İttifakı’nın milli politikalarını savundu.',
        keyParaphrasedQuote: 'Milliyetçi Hareket Partisi devletin ve milletin bölünmez bütünlüğünün tavizsiz teminatıdır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // TRABZON
  // ==========================================
  {
    id: 'adil_karaismailoglu',
    fullName: 'Adil Karaismailoğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Adil_Karaismailo%C4%9Flu_2021.jpg/600px-Adil_Karaismailo%C4%9Flu_2021.jpg',
    term: '28. Dönem',
    title: 'TBMM Bayındırlık ve Ulaştırma Komisyonu Başkanı & Trabzon Milletvekili',
    bio: 'Makine mühendisi. Eski Ulaştırma ve Altyapı Bakanı (2020-2023). 28. Dönem TBMM Trabzon Milletvekili ve TBMM Bayındırlık, İmar, Ulaştırma ve Turizm Komisyonu Başkanı.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#trabzon-61',
    stances: {
      'kanal_istanbul': {
        id: 'st_ak_kanal',
        mpId: 'adil_karaismailoglu',
        topicId: 'kanal_istanbul',
        stanceTag: 'savundu',
        stanceLabel: 'Stratejik Lojistik Vizyon Olarak Savundu',
        overallSummary: 'Bakanlığı döneminde ve Mecliste Kanal İstanbul’un Türkiye’nin küresel ticaret ve Boğaz güvenliği için zorunlu olduğunu savundu.',
        keyParaphrasedQuote: 'Kanal İstanbul bir ulaşım ve lojistik devrimidir, Türkiye’yi dünya ticaretinin merkez üssü yapacaktır.',
        lastUpdated: '2023',
        sources: []
      }
    }
  },
  {
    id: 'mustafa_sen',
    fullName: 'Mustafa Şen',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Genel Başkan Yardımcısı & Trabzon Milletvekili',
    bio: 'Sosyolog, siyaset bilimci, araştırmacı. AK Parti AR-GE ve Eğitimden Sorumlu Genel Başkan Yardımcısı. 28. Dönem TBMM Trabzon Milletvekili.',
    stances: {}
  },
  {
    id: 'yilmaz_buyukaydin',
    fullName: 'Yılmaz Büyükaydın',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Trabzon Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'İş insanı, TFF eski Başkanvekili. 28. Dönem TBMM Trabzon Milletvekili.',
    stances: {}
  },
  {
    id: 'vehbi_koc_trabzon',
    fullName: 'Vehbi Koç',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Trabzon Milletvekili',
    bio: 'Denizci, armatör, Piri Reis Üniversitesi Mütevelli Heyet Üyesi. 28. Dönem TBMM Trabzon Milletvekili.',
    stances: {}
  },
  {
    id: 'sibel_suicmez',
    fullName: 'Av. Sibel Suiçmez',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Trabzon Milletvekili & TBMM Katip Üyesi',
    bio: 'Hukukçu, eski Trabzon Barosu Başkanı ve TBB Başkan Yardımcısı. 28. Dönem TBMM Trabzon Milletvekili ve TBMM Başkanlık Divanı Katip Üyesi.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#trabzon-61',
    stances: {
      'infaz_duzenlemesi_2023': {
        id: 'st_ss_infaz',
        mpId: 'sibel_suicmez',
        topicId: 'infaz_duzenlemesi_2023',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Yargı Bağımsızlığı ve Ceza Hukuku İlkeleri',
        overallSummary: 'Adalet Komisyonunda yasanın çifte standart ve cezasızlık kültürü yarattığını savundu.',
        keyParaphrasedQuote: 'Hukuk devleti intikam veya lütuf aracı değil; eşit ve adil kurallar bütünüdür.',
        lastUpdated: 'Temmuz 2023',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_ss_sokak',
        mpId: 'sibel_suicmez',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ötanazi Maddelerine Sert Muhalefet',
        overallSummary: 'Meclis Genel Kurulu ve komisyonlarda hayvanların yaşam hakkını ve belediyelerin hukuki sorumluluklarını savundu.',
        keyParaphrasedQuote: 'Vicdanları kanatan bu düzenleme hukuken de ahlaken de meşru değildir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'yavuz_aydin',
    fullName: 'Yavuz Aydın',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Trabzon',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'İYİ Parti Trabzon Milletvekili',
    bio: 'İş insanı, sanayici. 28. Dönem TBMM Trabzon Milletvekili.',
    stances: {}
  },

  // ==========================================
  // TUNCELİ
  // ==========================================
  {
    id: 'ayten_kordu',
    fullName: 'Ayten Kordu',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Tunceli',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Tunceli Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'Sosyolog, kadın hakları ve çevre aktivisti. 28. Dönem TBMM Tunceli Milletvekili.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_ak_kayyum',
        mpId: 'ayten_kordu',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Tunceli/Dersim Halk İradesini Savundu',
        overallSummary: 'Dersim Belediyesi’ne atanan kayyuma karşı sahada ve mecliste sert tepki gösterdi.',
        keyParaphrasedQuote: 'Halkın oylarıyla seçilmiş iradeye karşı yapılan bu gasp politikasını asla kabul etmeyeceğiz.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_ak_cerceve',
        mpId: 'ayten_kordu',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Eşit Yurttaşlık ve İnanç Özgürlüğü',
        overallSummary: 'Alevilerin eşit yurttaşlık talepleri ve Kürt sorununun demokratik çözümü için ortak mücadeleyi savundu.',
        keyParaphrasedQuote: 'Kalıcı barış tüm kimliklerin, inançların ve dillerin anayasal güvencesiyle mümkündür.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // UŞAK
  // ==========================================
  {
    id: 'ismail_gunes',
    fullName: 'Dr. İsmail Güneş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Uşak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Uşak Milletvekili & TBMM Plan ve Bütçe Komisyonu Üyesi',
    bio: 'Tıp doktoru, KBB uzmanı. 24, 27 ve 28. Dönem TBMM Uşak Milletvekili. TBMM Plan ve Bütçe Komisyonu Üyesi.',
    stances: {}
  },
  {
    id: 'fahrettin_tugrul',
    fullName: 'Fahrettin Tuğrul',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Uşak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Uşak Milletvekili',
    bio: 'Hukukçu, avukat. AK Parti Uşak eski İl Başkanı. 28. Dönem TBMM Uşak Milletvekili.',
    stances: {}
  },
  {
    id: 'ali_karaoba',
    fullName: 'Dr. Ali Karaoba',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Uşak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Uşak Milletvekili & TBMM Sağlık Komisyonu Üyesi',
    bio: 'Tıp doktoru, çocuk sağlığı ve hastalıkları uzmanı. 28. Dönem TBMM Uşak Milletvekili.',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_alk_sokak',
        mpId: 'ali_karaoba',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Hekim Gözüyle Yaşam Hakkı',
        overallSummary: 'Tıp etiği ve halk sağlığı dengesi gözetilerek kısırlaştırmanın esas alınması gerektiğini savundu.',
        keyParaphrasedQuote: 'Yaşamı savunmak hekimlik mesleğimizin de vicdanımızın da gereğidir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // VAN
  // ==========================================
  {
    id: 'pervin_buldan',
    fullName: 'Pervin Buldan',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pervin_Buldan_2022.jpg/600px-Pervin_Buldan_2022.jpg',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili & Eski Eş Genel Başkan',
    bio: 'Siyasetçi. Eski HDP Eş Genel Başkanı (2018-2023) ve TBMM eski Başkanvekili. 23. Dönem Iğdır, 24, 25, 26. Dönem İstanbul, 27. Dönem Siirt, 28. Dönem Van Milletvekili.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#van-65',
    stances: {
      'cerceve_yasa': {
        id: 'st_pb_cerceve',
        mpId: 'pervin_buldan',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Tarihi Çözüm ve Kalıcı Barış',
        overallSummary: 'Çözüm Süreci (2013-2015) İmralı Heyeti üyesi olarak Kürt sorununun müzakere, demokratik anayasa ve TBMM güvencesiyle çözülmesi gerektiğini savundu.',
        keyParaphrasedQuote: 'Annelerin gözyaşının dinmesi ve onurlu bir barışın tesisi için her türlü demokratik sorumluluğu almaya hazırız.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'kayyum_uygulamalari': {
        id: 'st_pb_kayyum',
        mpId: 'pervin_buldan',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Kayyum Siyasetini Reddediyoruz',
        overallSummary: 'Van ve diğer belediyelere yönelik kayyum girişimlerine karşı halk iradesini savundu.',
        keyParaphrasedQuote: 'Van halkının sandıkta gösterdiği irade gasp edilemez, demokrasiye sahip çıkacağız.',
        lastUpdated: 'Nisan 2024',
        sources: []
      }
    }
  },
  {
    id: 'zulkuf_ucar',
    fullName: 'Zülküf Uçar',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, eski Van Barosu Başkanı. 28. Dönem TBMM Van Milletvekili ve TBMM Adalet Komisyonu Üyesi.',
    stances: {
      'kayyum_uygulamalari': {
        id: 'st_zu_kayyum',
        mpId: 'zulkuf_ucar',
        topicId: 'kayyum_uygulamalari',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Hukuki Meşruiyet ve Mazbata Savunusu',
        overallSummary: 'Van Büyükşehir Belediye Başkanı Abdullah Zeydan’ın mazbata krizinde hukuki süreci başarıyla savunan isimlerden oldu.',
        keyParaphrasedQuote: 'Hukukun üstünlüğü ve seçmen iradesi yargı kumpaslarına teslim edilemez.',
        lastUpdated: 'Nisan 2024',
        sources: []
      }
    }
  },
  {
    id: 'gulcan_kacmaz_sayyigit',
    fullName: 'Gülcan Kaçmaz Sayyiğit',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili & TBMM Milli Eğitim Komisyonu Üyesi',
    bio: 'Eğitimci, sendikacı (Eğitim-Sen). Edremit eski Belediye Eşbaşkanı. 28. Dönem TBMM Van Milletvekili.',
    stances: {}
  },
  {
    id: 'sinan_ciftyurek',
    fullName: 'Sinan Çiftyürek',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili & Kürdistan Komünist Partisi Kurucusu',
    bio: 'Yazar, araştırmacı, siyasetçi. KKP eski Genel Başkanı. 28. Dönem TBMM Van Milletvekili.',
    stances: {
      'cerceve_yasa': {
        id: 'st_sc_cerceve',
        mpId: 'sinan_ciftyurek',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Kürt Ulusal Birliği ve Statü',
        overallSummary: 'Kürt halkının anayasal statüsü, anadilde eğitim hakkı ve demokratik haklarının güvenceye kavuşmasını savundu.',
        keyParaphrasedQuote: 'Kürt meselesinin çözümü anayasal eşitlik ve anadilin tanınmasından geçer.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'gulderen_varli',
    fullName: 'Gülderen Varlı',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili',
    bio: 'Siyasetçi, yerel yönetim aktivisti. 28. Dönem TBMM Van Milletvekili.',
    stances: {}
  },
  {
    id: 'mahmut_dindar',
    fullName: 'Mahmut Dindar',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'DEM Parti Van Milletvekili',
    bio: 'Sendikacı, işçi emeklisi. 28. Dönem TBMM Van Milletvekili.',
    stances: {}
  },
  {
    id: 'burhan_kayaturk',
    fullName: 'Burhan Kayatürk',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Van Milletvekili & TBMM Dışişleri Komisyonu Üyesi',
    bio: 'Elektrik-elektronik mühendisi, uluslararası iş insanı. 23. Dönem Ankara, 24, 26 ve 28. Dönem Van Milletvekili. TBMM APA Türk Grubu Başkanı.',
    stances: {}
  },
  {
    id: 'kayhan_turkmenoglu',
    fullName: 'Kayhan Türkmenoğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Van',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Van Milletvekili & Eski İl Başkanı',
    bio: 'İş insanı, Van TSO eski Başkanı. 23. ve 28. Dönem TBMM Van Milletvekili.',
    stances: {}
  },

  // ==========================================
  // YALOVA
  // ==========================================
  {
    id: 'ahmet_buyukgumus',
    fullName: 'Ahmet Büyükgümüş',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Yalova',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Yalova Milletvekili & Eski Gençlik Kolları Genel Başkanı',
    bio: 'Siyaset bilimci. AK Parti Gençlik Kolları eski Genel Başkanı. 27. ve 28. Dönem TBMM Yalova Milletvekili.',
    stances: {}
  },
  {
    id: 'meliha_akyol',
    fullName: 'Meliha Akyol',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Yalova',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Yalova Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'Kimya mühendisi, sanayici. 27. ve 28. Dönem TBMM Yalova Milletvekili.',
    stances: {}
  },
  {
    id: 'tahsin_becan',
    fullName: 'Tahsin Becan',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Yalova',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Yalova Milletvekili & TBMM Sanayi Komisyonu Katip Üyesi',
    bio: 'İş insanı, Yalova TSO eski Yönetim Kurulu Başkanı. 28. Dönem TBMM Yalova Milletvekili.',
    stances: {}
  },

  // ==========================================
  // YOZGAT
  // ==========================================
  {
    id: 'abdulkadir_akgul',
    fullName: 'Abdulkadir Akgül',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Yozgat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Yozgat Milletvekili & TESKOMB Genel Başkanı',
    bio: 'TESKOMB (Türkiye Esnaf ve Sanatkarlar Kredi ve Kefalet Kooperatifleri Birlikleri Merkez Birliği) Genel Başkanı. 23, 25, 26 ve 28. Dönem TBMM Yozgat Milletvekili.',
    stances: {}
  },
  {
    id: 'suleyman_sahan',
    fullName: 'Süleyman Şahan',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Yozgat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Yozgat Milletvekili',
    bio: 'İş insanı. 28. Dönem TBMM Yozgat Milletvekili.',
    stances: {}
  },
  {
    id: 'ibrahim_ethem_sedef',
    fullName: 'İbrahim Ethem Sedef',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Yozgat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'MHP Yozgat Milletvekili & TBMM Tarım Komisyonu Üyesi',
    bio: 'İş insanı, MHP Yozgat eski İl Başkanı. 27. ve 28. Dönem TBMM Yozgat Milletvekili.',
    stances: {}
  },
  {
    id: 'lutfullah_kayalar',
    fullName: 'Lütfullah Kayalar',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Yozgat',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'İYİ Parti Yozgat Milletvekili & Eski Maliye ve Tarım Bakanı',
    bio: 'Hukukçu, kıdemli devlet adamı. Eski Maliye Bakanı ve Eski Tarım Orman ve Köyişleri Bakanı (17, 18, 19, 20, 21. Dönem Yozgat Milletvekili). 28. Dönem TBMM Yozgat Milletvekili.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#yozgat-66',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_lk_iyi_kurultay',
        mpId: 'lutfullah_kayalar',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'notr_cekimser',
        stanceLabel: 'Merkez Siyaset ve Devlet Deneyimi',
        overallSummary: 'Kurultay sürecinde merkez sağ ve makul siyaset dilinin güçlendirilmesi gerektiğini savundu.',
        keyParaphrasedQuote: 'Devlet tecrübesi ve uzlaşma kültürü milletimizin en çok ihtiyaç duyduğu rehberdir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      }
    }
  },

  // ==========================================
  // ZONGULDAK
  // ==========================================
  {
    id: 'muammer_avci',
    fullName: 'Muammer Avcı',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Zonguldak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Zonguldak Milletvekili & TBMM Dijital Mecralar Komisyonu Üyesi',
    bio: 'İş insanı, AK Parti Zonguldak eski İl Başkanı. 28. Dönem TBMM Zonguldak Milletvekili.',
    stances: {}
  },
  {
    id: 'saffet_bozkurt',
    fullName: 'Saffet Bozkurt',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Zonguldak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Zonguldak Milletvekili & TBMM Adalet Komisyonu Üyesi',
    bio: 'Hukukçu, avukat. AK Parti Kdz. Ereğli eski İlçe Başkanı. 28. Dönem TBMM Zonguldak Milletvekili.',
    stances: {}
  },
  {
    id: 'ahmet_colakoglu',
    fullName: 'Ahmet Çolakoğlu',
    partyId: 'akp',
    electedPartyId: 'akp',
    province: 'Zonguldak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'AK Parti Zonguldak Milletvekili & TBMM Çevre Komisyonu Üyesi',
    bio: 'İş insanı, sanayici. 27. ve 28. Dönem TBMM Zonguldak Milletvekili.',
    stances: {}
  },
  {
    id: 'deniz_yavuzyilmaz',
    fullName: 'Deniz Yavuzyılmaz',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Zonguldak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Deniz_Yavuzy%C4%B1lmaz_2022.jpg/600px-Deniz_Yavuzy%C4%B1lmaz_2022.jpg',
    term: '28. Dönem',
    title: 'CHP Genel Başkan Yardımcısı & Zonguldak Milletvekili',
    bio: 'Elektrik mühendisi. 27. ve 28. Dönem TBMM Zonguldak Milletvekili. CHP Enerji ve Tabii Kaynaklar Bakanlığından Sorumlu Genel Başkan Yardımcısı. Sayıştay raporları ve kamu ihaleleri araştırmalarıyla tanınır.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#zonguldak-67',
    stances: {
      '2023_kk_oo_kurultay': {
        id: 'st_dy_kurultay',
        mpId: 'deniz_yavuzyilmaz',
        topicId: '2023_kk_oo_kurultay',
        stanceTag: 'destekledi',
        stanceLabel: 'Özgür Özel Yönetiminde MYK Üyesi',
        overallSummary: '38. Olağan Kurultay sonrası Özgür Özel’in Genel Başkanlığı döneminde Enerjiden Sorumlu Genel Başkan Yardımcılığı görevine getirildi.',
        keyParaphrasedQuote: 'Kamucu, şeffaf ve halktan yana bir enerji politikasını iktidarımızda hayata geçireceğiz.',
        lastUpdated: 'Kasım 2023',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_dy_sokak',
        mpId: 'deniz_yavuzyilmaz',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ötanazi ve Katliam Düzenlemesine Karşı Çıktı',
        overallSummary: 'Yasanın vicdani ve insani olmadığını, çözümün kısırlaştırma ve barınak bütçesi tahsis etmek olduğunu savundu.',
        keyParaphrasedQuote: 'Can dostlarımızın yaşam hakkını korumak hepimizin ahlaki ve insani sorumluluğudur.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'eylem_ertug_ertugrul',
    fullName: 'Dr. Eylem Ertuğ Ertuğrul',
    partyId: 'chp',
    electedPartyId: 'chp',
    province: 'Zonguldak',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png',
    term: '28. Dönem',
    title: 'CHP Zonguldak Milletvekili & TBMM İçişleri Komisyonu Üyesi',
    bio: 'Tıp doktoru, KBB uzmanı. 28. Dönem TBMM Zonguldak Milletvekili ve TBMM İçişleri Komisyonu Üyesi.',
    stances: {}
  }
];
