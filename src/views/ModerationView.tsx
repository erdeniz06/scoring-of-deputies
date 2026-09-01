import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  Clock,
  UserCheck,
  Filter,
  PlusCircle,
  AlertTriangle,
  FileText,
  BadgeCheck,
  ChevronRight,
  Edit3,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { ContributionProposal, MP, Topic } from '../types';
import { loadProposals, updateProposalStatus } from '../utils/storage';

interface ModerationViewProps {
  allMps: MP[];
  allTopics: Topic[];
  onOpenContributionModal: () => void;
  onProposalsUpdated: () => void;
}

const TRUSTED_REVIEWERS = [
  { id: 'rev_erdeniz', name: 'Erdeniz Taşlıçukur', role: 'Baş Hakem / Kurucu & Yönetici' },
  { id: 'rev_boran', name: 'Boran', role: 'Hakem / Denetçi' },
  { id: 'rev_ahmet_yusuf', name: 'Ahmet Yusuf', role: 'Hakem / Denetçi' },
];

export const ModerationView: React.FC<ModerationViewProps> = ({
  allMps,
  allTopics,
  onOpenContributionModal,
  onProposalsUpdated,
}) => {
  const [proposals, setProposals] = useState<ContributionProposal[]>(() => loadProposals());
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedReviewer, setSelectedReviewer] = useState(TRUSTED_REVIEWERS[0]);
  const [reviewComment, setReviewComment] = useState('');
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  const refreshList = () => {
    const updated = loadProposals();
    setProposals(updated);
    if (onProposalsUpdated) onProposalsUpdated();
  };

  const handleApprove = (proposalId: string) => {
    const comment = reviewComment.trim() || 'TBMM tutanakları ve güvenilir kaynaklarca doğrulanarak onaylandı.';
    updateProposalStatus(proposalId, 'approved', selectedReviewer.name, comment);
    setActiveReviewId(null);
    setReviewComment('');
    refreshList();
  };

  const handleReject = (proposalId: string) => {
    const comment = reviewComment.trim() || 'Kaynak yetersizliği veya doğrulanmamış iddia nedeniyle reddedildi.';
    updateProposalStatus(proposalId, 'rejected', selectedReviewer.name, comment);
    setActiveReviewId(null);
    setReviewComment('');
    refreshList();
  };

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  const pendingCount = proposals.filter((p) => p.status === 'pending').length;
  const approvedCount = proposals.filter((p) => p.status === 'approved').length;
  const rejectedCount = proposals.filter((p) => p.status === 'rejected').length;

  return (
    <div id="moderation-view-container" className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-xl border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 border border-red-500/40 rounded-full text-xs font-semibold text-red-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Güvenli & Denetimli Topluluk Modeli</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Hakem Heyeti & Denetim Paneli</h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Kullanıcıların ve araştırmacıların gönderdiği milletvekili tutumları, TBMM tutanak linkleri ve yeni vekiller
              burada incelenir. Yalnızca onaylanan veriler uygulamada aktif olarak puanlamaya dahil edilir.
            </p>
          </div>

          {/* Active Reviewer Selector */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 shrink-0 sm:min-w-[280px]">
            <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Aktif Denetçi / Hakem
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Yetkili
              </span>
            </label>
            <select
              id="active-reviewer-select"
              value={selectedReviewer.id}
              onChange={(e) => {
                const found = TRUSTED_REVIEWERS.find((r) => r.id === e.target.value);
                if (found) setSelectedReviewer(found);
              }}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-white focus:outline-hidden focus:border-red-500"
            >
              {TRUSTED_REVIEWERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id === 'rev_erdeniz' ? '⭐ ' : '👤 '}
                  {r.name} — {r.role}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400">
              {selectedReviewer.id === 'rev_erdeniz' ? (
                <span className="text-amber-300 font-medium">⭐ Baş Hakem (Tek yetkili kesin onay & veto)</span>
              ) : (
                <span className="text-slate-300">İnceleme & tutanak denetleme yetkisi tanımlı</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar & Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'pending'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
            <span className="text-xs font-semibold uppercase">Bekleyen Öneriler</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{pendingCount}</div>
          <div className="text-2xs text-slate-500">İnceleme bekliyor</div>
        </div>

        <div 
          onClick={() => setActiveTab('approved')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'approved'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="text-xs font-semibold uppercase">Onaylananlar (Canlı)</span>
            <BadgeCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{approvedCount}</div>
          <div className="text-2xs text-slate-500">Yayında & Puanlamada</div>
        </div>

        <div 
          onClick={() => setActiveTab('rejected')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeTab === 'rejected'
              ? 'bg-red-50 dark:bg-red-950/40 border-red-400 dark:border-red-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-300'
          }`}
        >
          <div className="flex items-center justify-between text-red-600 dark:text-red-400 mb-1">
            <span className="text-xs font-semibold uppercase">Reddedilenler</span>
            <X className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{rejectedCount}</div>
          <div className="text-2xs text-slate-500">Kaynaksız / Uyumsuz</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-500 mb-1 uppercase">Topluluk Eklemesi</div>
          <button
            id="open-proposal-modal-from-mod-btn"
            onClick={onOpenContributionModal}
            className="w-full py-2 px-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Yeni Öneri Gönder
          </button>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Öneri & Katkı Akışı</span>
            <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
              {filteredProposals.length} Kayıt
            </span>
          </h2>

          {/* Filter Pills */}
          <div className="flex gap-1.5">
            {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
              <button
                key={tab}
                id={`filter-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab === 'pending' ? 'Bekleyenler' : tab === 'approved' ? 'Onaylananlar' : tab === 'rejected' ? 'Reddedilenler' : 'Tümü'}
              </button>
            ))}
          </div>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <ShieldCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Bu sekmede gösterilecek öneri bulunmuyor.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Kullanıcılar yeni tutum veya kaynak önerdiğinde denetim heyetinin önüne burada düşecektir.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((prop) => {
              const isPending = prop.status === 'pending';
              const isApproved = prop.status === 'approved';
              const isRejected = prop.status === 'rejected';

              return (
                <div
                  key={prop.id}
                  id={`proposal-card-${prop.id}`}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
                >
                  {/* Top line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isPending
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : isApproved
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                        }`}
                      >
                        {isPending ? 'Denetim Bekliyor' : isApproved ? 'Onaylandı (Canlıda)' : 'Reddedildi'}
                      </span>
                      <span className="text-xs text-slate-500">
                        Gönderen: <strong className="text-slate-700 dark:text-slate-300">{prop.submitterName}</strong> • {prop.submittedAt}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Öneri Türü: <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{prop.type.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Core Proposal Info */}
                  {prop.type === 'new_topic' && prop.newTopicData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            Yeni Kriter Önerisi
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                            Kategori: <strong className="capitalize">{prop.newTopicData.category}</strong>
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                            Ağırlık: <strong>{prop.newTopicData.defaultImportance || 8}/10</strong>
                          </span>
                        </div>

                        <div className="text-base font-bold text-slate-900 dark:text-white">
                          {prop.newTopicData.title}
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                          {prop.newTopicData.description}
                        </p>

                        {prop.newTopicData.contextNote && (
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            <strong>TBMM / Yasama Bağlamı:</strong> {prop.newTopicData.contextNote}
                          </div>
                        )}

                        {prop.submitterNote && (
                          <div className="text-2xs text-slate-500 italic bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200/40">
                            <strong>Kullanıcı Gerekçesi:</strong> {prop.submitterNote}
                          </div>
                        )}
                      </div>

                      {/* Scope & Moderation Side Info */}
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                          Kriter Kapsamı
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <div><strong>Kapsam:</strong> {prop.newTopicData.partyScopeLabel || 'Tüm Milletvekilleri'}</div>
                          <div><strong>Varsayılan Ağırlık:</strong> {prop.newTopicData.defaultImportance || 8} / 10</div>
                        </div>

                        {!isPending && (
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-2xs text-slate-500 space-y-1">
                            <div><strong>İnceleyen:</strong> {prop.reviewedBy}</div>
                            <div><strong>Tarih:</strong> {prop.reviewedAt}</div>
                            <div className="italic text-slate-600 dark:text-slate-400">"{prop.reviewerComment}"</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : prop.type === 'topic_rename' && prop.topicEditData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-200 text-xs font-bold flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            Kriter Düzenleme Önerisi
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-slate-500 line-through">
                            Eski Başlık: {prop.topicEditData.oldTitle}
                          </div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Yeni Başlık: <span className="text-blue-600 dark:text-blue-400">{prop.topicEditData.newTitle}</span>
                          </div>
                        </div>

                        {prop.topicEditData.description && (
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                            {prop.topicEditData.description}
                          </p>
                        )}

                        {prop.submitterNote && (
                          <div className="text-2xs text-slate-500 italic bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200/40">
                            <strong>Düzenleme Gerekçesi:</strong> {prop.submitterNote}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Düzenleme Detayları
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          <div><strong>Kriter ID:</strong> {prop.topicEditData.topicId}</div>
                        </div>

                        {!isPending && (
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-2xs text-slate-500 space-y-1">
                            <div><strong>İnceleyen:</strong> {prop.reviewedBy}</div>
                            <div><strong>Tarih:</strong> {prop.reviewedAt}</div>
                            <div className="italic text-slate-600 dark:text-slate-400">"{prop.reviewerComment}"</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                          <span className="text-red-600 dark:text-red-400">{prop.mpName || 'Yeni Vekil'}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                          <span>{prop.topicTitle || 'Yeni Konu'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md">
                            Önerilen Tutum: {prop.stanceLabel}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {prop.overallSummary}
                        </p>

                        {prop.keyParaphrasedQuote && (
                          <blockquote className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-l-2 border-red-500 text-xs italic text-slate-700 dark:text-slate-300 rounded-r-lg">
                            "{prop.keyParaphrasedQuote}"
                          </blockquote>
                        )}

                        {prop.submitterNote && (
                          <div className="text-2xs text-slate-500 italic bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200/40">
                            <strong>Gönderen Notu:</strong> {prop.submitterNote}
                          </div>
                        )}
                      </div>

                      {/* Source & Verification Column */}
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-red-600" />
                          Kaynak Doğrulaması
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{prop.sourcePlatform || 'Kaynak'}</div>
                          <div className="text-2xs mt-0.5 truncate">{prop.sourceSummary || 'Açıklama belirtilmemiş'}</div>
                        </div>

                        {prop.sourceUrl ? (
                          <a
                            id={`source-link-${prop.id}`}
                            href={prop.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-red-500 text-red-700 dark:text-red-400 rounded-lg text-xs font-semibold transition-colors w-full justify-center"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Kaynağı / Tutanağı Aç
                          </a>
                        ) : (
                          <div className="text-2xs text-red-500 font-medium">Kaynak linki bulunamadı</div>
                        )}

                        {/* Review Status Info */}
                        {!isPending && (
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-2xs text-slate-500 space-y-1">
                            <div><strong>İnceleyen:</strong> {prop.reviewedBy}</div>
                            <div><strong>Tarih:</strong> {prop.reviewedAt}</div>
                            <div className="italic text-slate-600 dark:text-slate-400">"{prop.reviewerComment}"</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Decision Actions for Reviewers */}
                  {isPending && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/30 p-3 rounded-xl">
                      <div className="grow">
                        <input
                          type="text"
                          placeholder="Hakem notu / onay gerekçesi (isteğe bağlı)..."
                          value={activeReviewId === prop.id ? reviewComment : ''}
                          onChange={(e) => {
                            setActiveReviewId(prop.id);
                            setReviewComment(e.target.value);
                          }}
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          id={`reject-btn-${prop.id}`}
                          onClick={() => handleReject(prop.id)}
                          className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/80 text-red-700 dark:text-red-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reddet
                        </button>
                        <button
                          id={`approve-btn-${prop.id}`}
                          onClick={() => handleApprove(prop.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Onayla ve Canlıya Al
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
