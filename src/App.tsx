import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MPS, DEFAULT_BENCHMARK_USER_SCORES } from './data/mps';
import { TOPICS } from './data/topics';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights } from './types';
import { calculateMpScore } from './utils/calculator';
import { 
  loadUserScores, 
  loadUserWeights, 
  saveUserScores, 
  saveUserWeights, 
  getDefaultWeights,
  loadProposals,
  loadUserCustomTopics,
  addUserCustomTopic,
  removeUserCustomTopic,
  loadUserSelectedTopicIds,
  saveUserSelectedTopicIds,
  loadUserRole,
  saveUserRole,
  AppUserRole,
  mergeAllMpsWithCustomStances
} from './utils/storage';
import { Header, NavTab } from './components/Header';
import { HomeView } from './views/HomeView';
import { WeightsView } from './views/WeightsView';
import { MpDetailView } from './views/MpDetailView';
import { LeaderboardView } from './views/LeaderboardView';
import { CompareView } from './views/CompareView';
import { ModerationView } from './views/ModerationView';
import { AboutView } from './views/AboutView';
import { ContributionModal } from './components/ContributionModal';
import { TopicManagerModal } from './components/TopicManagerModal';
import { AddStanceProposalModal } from './components/AddStanceProposalModal';
import { Landmark, CheckCircle2, ShieldAlert, Crown, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('mps');
  const [selectedMpId, setSelectedMpId] = useState<string | null>(null);
  const [userWeights, setUserWeights] = useState<UserWeights>(loadUserWeights);
  const [userScores, setUserScores] = useState<UserScores>(loadUserScores);
  const [comparedMpIds, setComparedMpIds] = useState<string[]>(['ozgur_ozel', 'mustafa_varank']);
  
  // User Role State: 'founder' (Erdeniz Taşlıçukur) vs 'contributor'
  const [userRole, setUserRole] = useState<AppUserRole>(() => loadUserRole());

  const handleToggleUserRole = () => {
    const nextRole: AppUserRole = userRole === 'founder' ? 'contributor' : 'founder';
    setUserRole(nextRole);
    saveUserRole(nextRole);
  };

  // Custom Stances & Live Merged MPs
  const [customStancesVersion, setCustomStancesVersion] = useState(0);
  const liveMps = useMemo(() => {
    return mergeAllMpsWithCustomStances(ALL_MPS);
  }, [customStancesVersion]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{
    type: 'success' | 'info';
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Custom Topics & Selection State
  const [customTopics, setCustomTopics] = useState<Topic[]>(() => loadUserCustomTopics());
  
  const allCombinedTopics = useMemo(() => {
    return [...TOPICS, ...customTopics];
  }, [customTopics]);

  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(() => {
    const saved = loadUserSelectedTopicIds();
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return TOPICS.map(t => t.id); // By default all core topics selected
  });

  const [isTopicManagerOpen, setIsTopicManagerOpen] = useState(false);

  // Sync selected topic IDs to local storage
  useEffect(() => {
    saveUserSelectedTopicIds(selectedTopicIds);
  }, [selectedTopicIds]);

  // Filtered active topics for evaluation
  const activeTopics = useMemo(() => {
    if (selectedTopicIds.length === 0) return allCombinedTopics;
    return allCombinedTopics.filter(t => selectedTopicIds.includes(t.id));
  }, [allCombinedTopics, selectedTopicIds]);

  // Topic Manager Handlers
  const handleToggleTopic = (topicId: string) => {
    setSelectedTopicIds(prev => {
      if (prev.includes(topicId)) {
        if (prev.length <= 1) return prev;
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleSelectAllTopics = () => {
    setSelectedTopicIds(allCombinedTopics.map(t => t.id));
  };

  const handleDeselectAllTopics = () => {
    if (allCombinedTopics.length > 0) {
      setSelectedTopicIds([allCombinedTopics[0].id]);
    }
  };

  const handleAddNewTopic = (topicData: Omit<Topic, 'id'>) => {
    const newTopic = addUserCustomTopic(topicData);
    setCustomTopics(loadUserCustomTopics());
    setSelectedTopicIds(prev => [...prev, newTopic.id]);
    setUserWeights(prev => ({
      ...prev,
      [newTopic.id]: newTopic.defaultImportance,
    }));
  };

  const handleRemoveCustomTopic = (topicId: string) => {
    removeUserCustomTopic(topicId);
    setCustomTopics(loadUserCustomTopics());
    setSelectedTopicIds(prev => prev.filter(id => id !== topicId));
  };

  // Proposals & Moderation State
  const [proposalsVersion, setProposalsVersion] = useState(0);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [modalInitialMp, setModalInitialMp] = useState<MP | undefined>(undefined);
  const [modalInitialTopic, setModalInitialTopic] = useState<Topic | undefined>(undefined);

  // Dedicated '+' Add Stance Proposal Modal State
  const [isAddStanceModalOpen, setIsAddStanceModalOpen] = useState(false);
  const [addStanceTargetMpId, setAddStanceTargetMpId] = useState<string | undefined>(undefined);
  const [addStanceTargetTopicId, setAddStanceTargetTopicId] = useState<string | undefined>(undefined);

  const handleOpenAddStance = (topicId?: string, mpId?: string) => {
    setAddStanceTargetTopicId(topicId);
    setAddStanceTargetMpId(mpId || selectedMpId || undefined);
    setIsAddStanceModalOpen(true);
  };

  const handleProposalSubmitted = (isDirectlyApproved: boolean, targetMpId: string, targetTopicId: string) => {
    setProposalsVersion(v => v + 1);
    setCustomStancesVersion(v => v + 1);

    const targetMp = liveMps.find(m => m.id === targetMpId);
    const targetTopic = allCombinedTopics.find(t => t.id === targetTopicId);

    if (isDirectlyApproved) {
      setToastMessage({
        type: 'success',
        title: '👑 Kurucu Yetkisiyle Doğrudan Canlıya Alındı!',
        description: `${targetMp?.fullName || 'Vekil'} için "${targetTopic?.title || 'Seçili Konu'}" demeci ve tutanağı onaylanarak anında profile işlendi.`
      });
    } else {
      setToastMessage({
        type: 'info',
        title: '🛡️ Demeç Hakem İnceleme Havuzuna Gönderildi',
        description: `Öneriniz kaydedildi. Bağımsız hakem denetiminden geçtikten sonra canlıya alınacaktır.`
      });
    }
  };

  // Sync state to local storage
  useEffect(() => {
    saveUserWeights(userWeights);
  }, [userWeights]);

  useEffect(() => {
    saveUserScores(userScores);
  }, [userScores]);

  const pendingProposalsCount = useMemo(() => {
    const proposals = loadProposals();
    return proposals.filter((p) => p.status === 'pending').length;
  }, [proposalsVersion]);

  // Compute live scores for all MPs using activeTopics and liveMps
  const mpCalculationResults = useMemo(() => {
    const results: Record<string, ScoreCalculationResult> = {};
    liveMps.forEach((mp) => {
      results[mp.id] = calculateMpScore(mp, activeTopics, userWeights, userScores);
    });
    return results;
  }, [userWeights, userScores, activeTopics, liveMps]);

  // Count scored MPs
  const scoredMpCount = useMemo(() => {
    return (Object.values(mpCalculationResults) as ScoreCalculationResult[]).filter(r => r.scoredTopicsCount > 0).length;
  }, [mpCalculationResults]);

  // Handler: Set Topic Score for an MP
  const handleSetTopicScore = (mpId: string, topicId: string, score: number | undefined) => {
    setUserScores((prev) => {
      const mpScores = { ...(prev[mpId] || {}) };
      if (score === undefined || mpScores[topicId] === score) {
        delete mpScores[topicId];
      } else {
        mpScores[topicId] = score;
      }
      return {
        ...prev,
        [mpId]: mpScores,
      };
    });
  };

  // Handler: Update Topic Importance Weight
  const handleUpdateWeight = (topicId: string, importance: number) => {
    setUserWeights((prev) => ({
      ...prev,
      [topicId]: importance,
    }));
  };

  // Handler: Bulk Update Weights
  const handleBulkUpdateWeights = (newWeights: UserWeights) => {
    setUserWeights(newWeights);
  };

  // Handler: Reset Weights to Default
  const handleResetWeights = () => {
    setUserWeights(getDefaultWeights());
  };

  // Handler: Reset MP Scores for specific MP
  const handleResetMpScores = (mpId: string) => {
    setUserScores((prev) => {
      const next = { ...prev };
      delete next[mpId];
      return next;
    });
  };

  // Handler: Reset All Scores
  const handleResetAllScores = () => {
    setUserScores({});
  };

  // Handler: Reload Sample Benchmark Scores
  const handleLoadBenchmark = () => {
    setUserScores(DEFAULT_BENCHMARK_USER_SCORES);
    setUserWeights(getDefaultWeights());
  };

  // Handler: Toggle MP for comparison
  const handleToggleCompare = (mpId: string) => {
    setComparedMpIds((prev) => {
      if (prev.includes(mpId)) {
        return prev.filter(id => id !== mpId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), mpId];
      }
      return [...prev, mpId];
    });
  };

  // Open Contribution Modal for a specific MP or general
  const handleOpenContribution = (mp?: MP, topic?: Topic) => {
    setModalInitialMp(mp);
    setModalInitialTopic(topic);
    setIsContributionModalOpen(true);
  };

  // Find active MP for detail view from liveMps
  const activeMp = selectedMpId ? liveMps.find(m => m.id === selectedMpId) : null;
  const activeMpIndex = activeMp ? liveMps.findIndex(m => m.id === activeMp.id) : -1;

  const handleNextMp = () => {
    if (activeMpIndex >= 0 && activeMpIndex < liveMps.length - 1) {
      setSelectedMpId(liveMps[activeMpIndex + 1].id);
    }
  };

  const handlePrevMp = () => {
    if (activeMpIndex > 0) {
      setSelectedMpId(liveMps[activeMpIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md animate-slideUp">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 text-xs ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-500 shadow-emerald-950/40'
              : 'bg-slate-900 text-slate-100 border-amber-500 shadow-slate-950/40'
          }`}>
            {toastMessage.type === 'success' ? (
              <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 grow">
              <div className="font-bold text-sm text-white">{toastMessage.title}</div>
              <p className="text-slate-300 leading-relaxed">{toastMessage.description}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedMpId(null);
        }}
        scoredMpCount={scoredMpCount}
        totalMps={liveMps.length}
        pendingProposalsCount={pendingProposalsCount}
        userRole={userRole}
        onToggleUserRole={handleToggleUserRole}
        onResetScores={handleResetAllScores}
        onLoadBenchmark={handleLoadBenchmark}
        onOpenContributionModal={() => handleOpenContribution()}
        onOpenAddStanceModal={() => handleOpenAddStance()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {selectedMpId && activeMp ? (
          <MpDetailView
            mp={activeMp}
            topics={activeTopics}
            userWeights={userWeights}
            userScores={userScores}
            calculationResult={mpCalculationResults[activeMp.id]}
            onSetTopicScore={handleSetTopicScore}
            onQuickChangeImportance={handleUpdateWeight}
            onResetMpScores={handleResetMpScores}
            onBack={() => setSelectedMpId(null)}
            onGoToWeights={() => {
              setSelectedMpId(null);
              setActiveTab('weights');
            }}
            onOpenContributionModal={handleOpenContribution}
            onOpenTopicManager={() => setIsTopicManagerOpen(true)}
            onOpenAddStance={handleOpenAddStance}
            onNextMp={activeMpIndex < liveMps.length - 1 ? handleNextMp : undefined}
            onPrevMp={activeMpIndex > 0 ? handlePrevMp : undefined}
          />
        ) : (
          <>
            {activeTab === 'mps' && (
              <HomeView
                mps={liveMps}
                topics={activeTopics}
                userWeights={userWeights}
                userScores={userScores}
                mpCalculationResults={mpCalculationResults}
                onSelectMp={(id) => setSelectedMpId(id)}
                onGoToWeights={() => setActiveTab('weights')}
                comparedMpIds={comparedMpIds}
                onToggleCompare={handleToggleCompare}
                onOpenCompare={() => setActiveTab('compare')}
              />
            )}

            {activeTab === 'weights' && (
              <WeightsView
                topics={activeTopics}
                userWeights={userWeights}
                onUpdateWeight={handleUpdateWeight}
                onBulkUpdateWeights={handleBulkUpdateWeights}
                onResetWeights={handleResetWeights}
                onFinish={() => setActiveTab('mps')}
                onOpenTopicManager={() => setIsTopicManagerOpen(true)}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView
                mps={liveMps}
                topics={activeTopics}
                userWeights={userWeights}
                userScores={userScores}
                mpCalculationResults={mpCalculationResults}
                onSelectMp={(id) => setSelectedMpId(id)}
                onGoToWeights={() => setActiveTab('weights')}
              />
            )}

            {activeTab === 'compare' && (
              <CompareView
                allMps={liveMps}
                topics={activeTopics}
                comparedMpIds={comparedMpIds}
                onToggleCompare={handleToggleCompare}
                userWeights={userWeights}
                userScores={userScores}
                mpCalculationResults={mpCalculationResults}
                onSelectMp={(id) => setSelectedMpId(id)}
              />
            )}

            {activeTab === 'moderation' && (
              <ModerationView
                allMps={liveMps}
                allTopics={allCombinedTopics}
                onOpenContributionModal={() => handleOpenContribution()}
                onProposalsUpdated={() => {
                  setProposalsVersion((v) => v + 1);
                  setCustomStancesVersion((v) => v + 1);
                }}
              />
            )}

            {activeTab === 'about' && <AboutView />}
          </>
        )}
      </main>

      {/* Dedicated '+' Stance / Speech Addition Modal */}
      <AddStanceProposalModal
        isOpen={isAddStanceModalOpen}
        onClose={() => setIsAddStanceModalOpen(false)}
        allMps={liveMps}
        allTopics={allCombinedTopics}
        userRole={userRole}
        onToggleUserRole={handleToggleUserRole}
        initialMpId={addStanceTargetMpId}
        initialTopicId={addStanceTargetTopicId}
        onProposalSubmitted={handleProposalSubmitted}
      />

      {/* Topic Selection & Search Engine / Manager Modal */}
      <TopicManagerModal
        isOpen={isTopicManagerOpen}
        onClose={() => setIsTopicManagerOpen(false)}
        allTopics={allCombinedTopics}
        selectedTopicIds={selectedTopicIds}
        onToggleTopic={handleToggleTopic}
        onSelectAll={handleSelectAllTopics}
        onDeselectAll={handleDeselectAllTopics}
        onAddNewTopic={handleAddNewTopic}
        onRemoveCustomTopic={handleRemoveCustomTopic}
      />

      {/* Contribution / Proposal Modal */}
      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        initialMp={modalInitialMp}
        initialTopic={modalInitialTopic}
        allMps={liveMps}
        allTopics={allCombinedTopics}
        onSubmitted={() => {
          setProposalsVersion((v) => v + 1);
          setCustomStancesVersion((v) => v + 1);
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-800 font-serif">Milletvekili Puanlama</span>
            <span>• TBMM 28. Dönem Siyasi Uyum Analizi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button 
              onClick={() => {
                setSelectedMpId(null);
                setActiveTab('about');
              }}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Metodoloji & Telif Güvenliği
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                setSelectedMpId(null);
                setActiveTab('moderation');
              }}
              className="hover:text-slate-800 transition-colors cursor-pointer font-medium text-red-700"
            >
              Hakem Heyeti & Denetim
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                setSelectedMpId(null);
                setActiveTab('weights');
              }}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Önem Ağırlıkları
            </button>
            <span>•</span>
            <span>Tüm veriler ve hakem kararları yerel cihazınızda saklanır.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

