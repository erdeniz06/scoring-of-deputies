import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MPS, DEFAULT_BENCHMARK_USER_SCORES } from './data/mps';
import { TOPICS } from './data/topics';
import { ScoreCalculationResult, UserScores, UserWeights } from './types';
import { calculateMpScore } from './utils/calculator';
import { 
  loadUserScores, 
  loadUserWeights, 
  saveUserScores, 
  saveUserWeights, 
  getDefaultWeights 
} from './utils/storage';
import { Header, NavTab } from './components/Header';
import { HomeView } from './views/HomeView';
import { WeightsView } from './views/WeightsView';
import { MpDetailView } from './views/MpDetailView';
import { LeaderboardView } from './views/LeaderboardView';
import { CompareView } from './views/CompareView';
import { AboutView } from './views/AboutView';
import { Landmark, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('mps');
  const [selectedMpId, setSelectedMpId] = useState<string | null>(null);
  const [userWeights, setUserWeights] = useState<UserWeights>(loadUserWeights);
  const [userScores, setUserScores] = useState<UserScores>(loadUserScores);
  const [comparedMpIds, setComparedMpIds] = useState<string[]>(['ozgur_ozel', 'mustafa_varank']);

  // Sync state to local storage
  useEffect(() => {
    saveUserWeights(userWeights);
  }, [userWeights]);

  useEffect(() => {
    saveUserScores(userScores);
  }, [userScores]);

  // Compute live scores for all MPs
  const mpCalculationResults = useMemo(() => {
    const results: Record<string, ScoreCalculationResult> = {};
    ALL_MPS.forEach((mp) => {
      results[mp.id] = calculateMpScore(mp, TOPICS, userWeights, userScores);
    });
    return results;
  }, [userWeights, userScores]);

  // Count scored MPs
  const scoredMpCount = useMemo(() => {
    return (Object.values(mpCalculationResults) as ScoreCalculationResult[]).filter(r => r.scoredTopicsCount > 0).length;
  }, [mpCalculationResults]);

  // Handler: Set Topic Score for an MP (or toggle off/remove if score is undefined or matches existing)
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

  // Find active MP for detail view
  const activeMp = selectedMpId ? ALL_MPS.find(m => m.id === selectedMpId) : null;
  const activeMpIndex = activeMp ? ALL_MPS.findIndex(m => m.id === activeMp.id) : -1;

  const handleNextMp = () => {
    if (activeMpIndex >= 0 && activeMpIndex < ALL_MPS.length - 1) {
      setSelectedMpId(ALL_MPS[activeMpIndex + 1].id);
    }
  };

  const handlePrevMp = () => {
    if (activeMpIndex > 0) {
      setSelectedMpId(ALL_MPS[activeMpIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedMpId(null);
        }}
        scoredMpCount={scoredMpCount}
        totalMps={ALL_MPS.length}
        onResetScores={handleResetAllScores}
        onLoadBenchmark={handleLoadBenchmark}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {selectedMpId && activeMp ? (
          <MpDetailView
            mp={activeMp}
            topics={TOPICS}
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
            onNextMp={activeMpIndex < ALL_MPS.length - 1 ? handleNextMp : undefined}
            onPrevMp={activeMpIndex > 0 ? handlePrevMp : undefined}
          />
        ) : (
          <>
            {activeTab === 'mps' && (
              <HomeView
                mps={ALL_MPS}
                topics={TOPICS}
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
                topics={TOPICS}
                userWeights={userWeights}
                onUpdateWeight={handleUpdateWeight}
                onBulkUpdateWeights={handleBulkUpdateWeights}
                onResetWeights={handleResetWeights}
                onFinish={() => setActiveTab('mps')}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView
                mps={ALL_MPS}
                topics={TOPICS}
                userWeights={userWeights}
                userScores={userScores}
                mpCalculationResults={mpCalculationResults}
                onSelectMp={(id) => setSelectedMpId(id)}
                onGoToWeights={() => setActiveTab('weights')}
              />
            )}

            {activeTab === 'compare' && (
              <CompareView
                allMps={ALL_MPS}
                topics={TOPICS}
                comparedMpIds={comparedMpIds}
                onToggleCompare={handleToggleCompare}
                userWeights={userWeights}
                userScores={userScores}
                mpCalculationResults={mpCalculationResults}
                onSelectMp={(id) => setSelectedMpId(id)}
              />
            )}

            {activeTab === 'about' && <AboutView />}
          </>
        )}
      </main>

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
              className="hover:text-slate-800 transition-colors"
            >
              Metodoloji & Telif Güvenliği
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                setSelectedMpId(null);
                setActiveTab('weights');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Önem Ağırlıkları
            </button>
            <span>•</span>
            <span>Tüm veriler yerel cihazınızda saklanır.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
