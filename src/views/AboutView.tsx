import React from 'react';
import { Landmark, Scale, ShieldCheck, FileText, Database, Calculator, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5 text-slate-700" />
          <span>Şeffaflık, Metodoloji & Kaynak Güvenliği</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
          Milletvekili Puanlama Platformu Hakkında
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Bu platform, Türk siyasetinde toplumsal ve siyasal gündemi meşgul etmiş tartışmalı 18 ana başlıkta milletvekillerinin doğrulanmış tutanak, kanun teklifi, basın açıklaması ve mülakatlarını nötr şekilde derleyerek vatandaşların kişiselleştirilmiş siyasi uyum yüzdesini hesaplar.
        </p>
      </div>

      {/* 1. Mathematical Calculation Engine */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 font-bold text-sm">
            1
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-serif">
            Puanlama ve Matematiksel Formül Mantığı
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            • <strong>Sabit Önem Derecesi (0-10):</strong> Kullanıcı her konuya 0-10 arasında bir önem derecesi verir. Bu değer doğrudan yüzdeye karşılık gelir: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">10 = %100, 9 = %90, 8 = %80 ... 1 = %10, 0 = %0</code>. Önem derecesi kullanıcı bazında sabittir ve tüm milletvekilleri için aynı ağırlığı taşır.
          </p>
          <p>
            • <strong>Sabit Tutum Puanı (0-10):</strong> Kullanıcı, milletvekilinin o konudaki tutumuna da daima 0-10 skalasında bir puan verir.
          </p>
          
          <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs sm:text-sm space-y-2">
            <span className="text-amber-400 font-bold block">Uyum Yüzdesi Formülü:</span>
            <p className="text-white text-base">Uyum Yüzdesi = [ Σ(Önem% × Puan) / Σ(Önem% × 10) ] × 100</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono text-slate-800">
            <p className="font-bold font-sans text-slate-900 mb-1">Örnek Uygulama Senaryosu:</p>
            <p>• Sokak Köpeği Yasası: Önem = %100 (10), Puan = 3 → Katkı Payı: 100 × 3 = 300, Katkı Paydası: 100 × 10 = 1000</p>
            <p>• HDP / DEM Meselesi: Önem = %80 (8), Puan = 5 → Katkı Payı: 80 × 5 = 400, Katkı Paydası: 80 × 10 = 800</p>
            <p className="font-bold text-indigo-700 pt-1">Toplam Pay: 700 | Toplam Payda: 1800 → Uyum Yüzdesi = (700 / 1800) × 100 = %38.9</p>
          </div>
        </div>
      </div>

      {/* 2. Content / Source Strategy (Neutrality & Legal Compliance) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 font-bold text-sm">
            2
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-serif">
            İçerik, Telif & Hukuki Güvenlik İlkeleri
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">🐦 X (Twitter) Paylaşımları</span>
            <p className="text-slate-600">
              Tam metin kopyalanmaz; sadece kısa nötr özet sunulur ve orijinal tweet bağlantısı eklenir.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">📰 Haber Siteleri & Tutanaklar</span>
            <p className="text-slate-600">
              Haber içeriği kısaca parafraz edilir (birebir kopyalama yapılmaz) ve kaynak haber bağlantısı iliştirilir.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">📺 TV & YouTube Yayınları</span>
            <p className="text-slate-600">
              YouTube bağlantısı + ilgili dakika:saniye zaman damgası (timestamp) + kısa nötr özet verilir.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>Tüm özetler yorum katmayan, tarafsız ve olgusal bir dille yazılmıştır. Resmi TBMM amblem veya arması kullanılmayıp sadece kurumsal TBMM bina motifleri yer almaktadır.</span>
        </div>
      </div>

      {/* 3. Tracked 18 Topics List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200 font-bold text-sm">
            3
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-serif">
            Takip Edilen 18 Kritik Konu Başlığı
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">1. 2023 Kılıçdaroğlu Adaylığına Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">2. 2023 KK vs ÖÖ Kurultay Tutumu</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">3. 2024 İYİ Parti Kurultay Tutumu</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">4. Sokak Köpeği Yasası</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">5. Çerçeve Yasa (Yargı Paketleri)</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">6. Milli Bayramlarda Atatürk'ü Anma</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">7. Tarikat/Cemaatlere Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">8. HDP'ye / DEM Parti'ye Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">9. Bireysel Silahlanmaya Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">10. Genel Af ve İnfaz İndirimi</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">11. Selahattin Demirtaş'a Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">12. Kent Lokantalarına Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">13. İfade Hürriyeti ve Sosyal Medya</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">14. 28 Şubat Davalarına Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">15. Evrim Teorisine Tutum (Müfredat)</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">16. Alevi Şakası Yapan Komedyene Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">17. Deniz Göktaş'a Tutum</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">18. Komedyenlerin İfade Özgürlüğüne Tutum</div>
        </div>
      </div>

      {/* 4. Privacy & Data Storage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2 text-xs sm:text-sm text-slate-600">
        <h3 className="font-bold text-slate-900 font-serif text-base">Veri Gizliliği & Yerel Saklama</h3>
        <p>
          Verdiğiniz tüm önem ağırlıkları ve milletvekili puanları doğrudan tarayıcınızın yerel depolama alanında (localStorage) güvenle saklanır. Hiçbir şahsi siyasi tercihiniz sunucuya veya üçüncü taraflara aktarılmaz.
        </p>
      </div>
    </div>
  );
};
