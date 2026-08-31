import { MP } from '../../types';

export const OTHER_MPS: MP[] = [
  {
    id: 'turhan_comez',
    fullName: 'Dr. Turhan Çömez',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'Balıkesir',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Turhan_%C3%87%C3%B6mez_2023.jpg/600px-Turhan_%C3%87%C3%B6mez_2023.jpg',
    term: '28. Dönem (Balıkesir)',
    title: 'İYİ Parti Grup Başkanvekili & Balıkesir Milletvekili',
    bio: 'Tıp doktoru, genel cerrah. 22. ve 28. Dönem Balıkesir Milletvekili. İYİ Parti TBMM Grup Başkanvekili.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#balikesir-10',
    stances: {
      '2023_kk_adaylik': {
        id: 'st_tc_kk_aday',
        mpId: 'turhan_comez',
        topicId: '2023_kk_adaylik',
        stanceTag: 'elestirdi',
        stanceLabel: 'Aday Belirleme Yöntemini Eleştirdi',
        overallSummary: 'İYİ Parti’nin "kazanacak aday" tezini savundu; masa krizinde uyarının dikkate alınmamasını eleştirdi.',
        keyParaphrasedQuote: 'Kazanacak aday ısrarımızda ne kadar haklı olduğumuzu maalesef sandık sonuçları gösterdi.',
        lastUpdated: 'Mayıs 2023',
        sources: []
      },
      '2024_iyi_parti_kurultay': {
        id: 'st_tc_iyi_kurultay',
        mpId: 'turhan_comez',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'savundu',
        stanceLabel: 'Müsavat Dervişoğlu Yönetimini Destekledi',
        overallSummary: 'Müsavat Dervişoğlu’nun genel başkan seçildiği 5. Olağanüstü Kurultay sonrası TBMM Grup Başkanvekilliği görevine seçildi.',
        keyParaphrasedQuote: 'İYİ Parti dimdik ayaktadır ve milletin umudu olmaya devam edecektir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_tc_sokak',
        mpId: 'turhan_comez',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Hekim Gözüyle Eleştirdi',
        overallSummary: 'Bir cerrah ve hekim olarak yasanın altyapısız olduğunu, barınak ve veteriner desteği olmadan ötanazinin kabul edilemeyeceğini belirtti.',
        keyParaphrasedQuote: 'Yaşam hakkını korumak tıp etiğinin de insanlık vicdanının da gereğidir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_tc_cerceve',
        mpId: 'turhan_comez',
        topicId: 'cerceve_yasa',
        stanceTag: 'elestirdi',
        stanceLabel: 'Tavizsiz Milliyetçi Duruş',
        overallSummary: 'Terör örgütü liderinin muhatap alınmasına ve meclise davet edilmesine sert tepki gösterdi.',
        keyParaphrasedQuote: 'Türk milletinin onuru ve şehitlerimizin aziz hatırası hiçbir pazarlığa alet edilemez.',
        lastUpdated: 'Kasım 2024',
        sources: []
      }
    }
  },
  {
    id: 'musavat_dervisoglu',
    fullName: 'Müsavat Dervişoğlu',
    partyId: 'iyi',
    electedPartyId: 'iyi',
    province: 'İzmir',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/M%C3%BCsavat_Dervi%C5%9Fo%C4%9Flu_2023.jpg/600px-M%C3%BCsavat_Dervi%C5%9Fo%C4%9Flu_2023.jpg',
    term: '28. Dönem (İzmir 1. Bölge)',
    title: 'İYİ Parti Genel Başkanı & İzmir Milletvekili',
    bio: 'İş insanı. 27 ve 28. Dönem İzmir Milletvekili. 27 Nisan 2024’te yapılan 5. Olağanüstü Kurultay’da İYİ Parti Genel Başkanı seçildi.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#izmir-35',
    stances: {
      '2024_iyi_parti_kurultay': {
        id: 'st_md_kurultay',
        mpId: 'musavat_dervisoglu',
        topicId: '2024_iyi_parti_kurultay',
        stanceTag: 'savundu',
        stanceLabel: 'Genel Başkan Seçildi & Birleştirici Vizyon',
        overallSummary: 'Kurultayda genel başkanlığa seçilerek partinin kuruluş ilkeleri ve Türk milliyetçiliği ekseninde bağımsız siyaset çizgisini sürdürdü.',
        keyParaphrasedQuote: 'İYİ Parti ne iktidarın payandası ne de başka partilerin alternatifi; milletin bizzat kendisidir.',
        lastUpdated: 'Mayıs 2024',
        sources: []
      },
      'cerceve_yasa': {
        id: 'st_md_cerceve',
        mpId: 'musavat_dervisoglu',
        topicId: 'cerceve_yasa',
        stanceTag: 'elestirdi',
        stanceLabel: 'En Sert Muhalefeti Yaptı & Urgan Fırlattı',
        overallSummary: 'Devlet Bahçeli’nin Öcalan çağrısına grup toplantısında kürsüden urgan atarak en sert tepkiyi gösterdi ve sürecin anayasayı ihlal olduğunu belirtti.',
        keyParaphrasedQuote: 'Bu meclis Gazi Meclis’tir; bebek katillerinin meclise çağrılmasına izin vermeyiz.',
        lastUpdated: 'Ekim 2024',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_md_sokak',
        mpId: 'musavat_dervisoglu',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ret Oyu & Vicdani Çözüm Çağrısı',
        overallSummary: 'Kanun teklifine ret oyu verilmesi yönünde grup kararı aldı.',
        keyParaphrasedQuote: 'Hem sokaklarımız güvenli olmalı hem de masum canların yaşam hakkı korunmalıdır.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'devlet_bahceli',
    fullName: 'Devlet Bahçeli',
    partyId: 'mhp',
    electedPartyId: 'mhp',
    province: 'Osmaniye',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Devlet_Bah%C3%A7eli_2023.jpg/600px-Devlet_Bah%C3%A7eli_2023.jpg',
    term: '28. Dönem (Osmaniye)',
    title: 'MHP Genel Başkanı & Osmaniye Milletvekili',
    bio: 'İktisatçı, akademisyen. 21, 23, 24, 25, 26, 27 ve 28. Dönem Osmaniye Milletvekili. 1997’den bu yana Milliyetçi Hareket Partisi Genel Başkanı.',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#osmaniye-80',
    stances: {
      'cerceve_yasa': {
        id: 'st_db_cerceve',
        mpId: 'devlet_bahceli',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Tarihi Çağrı & Terörsüz Türkiye İnisiyatifi',
        overallSummary: '22 Ekim 2024’te TBMM MHP Grup Toplantısı’nda terör örgütü liderinin tecridinin kaldırılarak DEM Parti grubunda terörün bittiğini ve örgütün lağvedildiğini haykırması yönünde tarihi çağrıda bulundu.',
        keyParaphrasedQuote: 'Terörist başı işin başında yer alsın, silah bıraktığını tek taraflı ilan etsin; Türkiye’nin birliği için her adımı atmaya hazırız.',
        lastUpdated: 'Ekim 2024',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_db_sokak',
        mpId: 'devlet_bahceli',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'destekledi',
        stanceLabel: 'Cumhur İttifakı Teklifine Tam Destek',
        overallSummary: 'Sokak güvenliğinin sağlanması ve yasa teklifinin meclisten geçirilmesi yönünde partisine açık talimat verdi.',
        keyParaphrasedQuote: 'Milletimizin huzuru ve çocuklarımızın can emniyeti her türlü mülahazanın üzerindedir.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'tuncer_bakirhan',
    fullName: 'Tuncer Bakırhan',
    partyId: 'dem',
    electedPartyId: 'dem',
    province: 'Siirt',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tuncer_Bak%C4%B1rhan_2023.jpg/600px-Tuncer_Bak%C4%B1rhan_2023.jpg',
    term: '28. Dönem (Siirt)',
    title: 'DEM Parti Eş Genel Başkanı & Siirt Milletvekili',
    bio: 'İktisatçı, siyasetçi. Siirt eski Belediye Başkanı. 28. Dönem Siirt Milletvekili ve DEM Parti Eş Genel Başkanı.',
    committee: 'TBMM Plan ve Bütçe Komisyonu',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#siirt-56',
    stances: {
      'cerceve_yasa': {
        id: 'st_tb_cerceve',
        mpId: 'tuncer_bakirhan',
        topicId: 'cerceve_yasa',
        stanceTag: 'savundu',
        stanceLabel: 'Demokratik Müzakere & Tecridin Sonu',
        overallSummary: 'Bahçeli’nin açıklamalarına cevaben tecridin derhal kaldırılmasını, hukuki ve demokratik adımların TBMM çatısı altında atılmasını savundu.',
        keyParaphrasedQuote: 'Barış ve çözümün kapısı tecridin kaldırılması ve TBMM zemininde demokratik hukukun işletilmesiyle açılır.',
        lastUpdated: 'Kasım 2024',
        sources: []
      },
      'sokak_kopegi_yasasi': {
        id: 'st_tb_sokak',
        mpId: 'tuncer_bakirhan',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ret Oyu & Yaşam Hakkı Savunusu',
        overallSummary: 'Tüm DEM Parti milletvekilleriyle birlikte yasaya ret oyu verdi.',
        keyParaphrasedQuote: 'Yaşam hakkı tüm canlılar için kutsaldır.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      }
    }
  },
  {
    id: 'erkan_bas',
    fullName: 'Erkan Baş',
    partyId: 'tip',
    electedPartyId: 'tip',
    province: 'İstanbul',
    electoralDistrict: '3. Bölge',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Erkan_Ba%C5%9F_2023.jpg/600px-Erkan_Ba%C5%9F_2023.jpg',
    term: '28. Dönem (İstanbul 3. Bölge)',
    title: 'TİP Genel Başkanı & İstanbul Milletvekili',
    bio: 'Akademisyen, felsefeci. 27 ve 28. Dönem İstanbul Milletvekili. Türkiye İşçi Partisi Genel Başkanı.',
    committee: 'TBMM Plan ve Bütçe Komisyonu',
    tbmmProfileUrl: 'https://www.tbmm.gov.tr/milletvekili/liste#istanbul-34',
    stances: {
      'sokak_kopegi_yasasi': {
        id: 'st_eb_sokak',
        mpId: 'erkan_bas',
        topicId: 'sokak_kopegi_yasasi',
        stanceTag: 'karsi_cikti',
        stanceLabel: 'Ret Oyu & Direniş Çağrısı',
        overallSummary: 'Meclis genel kurulunda ve meydanlarda sokak hayvanları yasasının geri çekilmesi için mücadele etti.',
        keyParaphrasedQuote: 'İktidarın yarattığı krizlerin faturasını masum hayvanlara kesemezsiniz.',
        lastUpdated: 'Temmuz 2024',
        sources: []
      },
      'ifade_hurriyeti': {
        id: 'st_eb_ifade',
        mpId: 'erkan_bas',
        topicId: 'ifade_hurriyeti',
        stanceTag: 'savundu',
        stanceLabel: 'Emek, Adalet ve Özgürlük Savunusu',
        overallSummary: 'İşçi hakları, sendikal özgürlükler ve Can Atalay’ın milletvekilliğinin iadesi için mecliste ve sokakta mücadele etti.',
        keyParaphrasedQuote: 'Milletvekili seçilmiş Can Atalay’ın esir tutulması anayasanın ve halk iradesinin çiğnenmesidir.',
        lastUpdated: 'Ağustos 2024',
        sources: []
      }
    }
  }
];
