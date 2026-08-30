import { TOPICS } from '../data/topics';
import { DEFAULT_BENCHMARK_USER_SCORES } from '../data/mps';
import { UserScores, UserWeights } from '../types';

const STORAGE_KEYS = {
  WEIGHTS: 'mv_puanlama_weights_v2',
  SCORES: 'mv_puanlama_scores_v2',
  ACTIVE_TAB: 'mv_puanlama_active_tab_v2',
};

export function getDefaultWeights(): UserWeights {
  const weights: UserWeights = {};
  TOPICS.forEach((topic) => {
    weights[topic.id] = topic.defaultImportance;
  });
  return weights;
}

export function loadUserWeights(): UserWeights {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all topics are present
      const defaultWeights = getDefaultWeights();
      return { ...defaultWeights, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load user weights:', e);
  }
  return getDefaultWeights();
}

export function saveUserWeights(weights: UserWeights): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
  } catch (e) {
    console.error('Failed to save user weights:', e);
  }
}

export function loadUserScores(): UserScores {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load user scores:', e);
  }
  // Start completely clean with zero scores (empty) so user begins from scratch
  return {};
}

export function saveUserScores(scores: UserScores): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save user scores:', e);
  }
}

export function exportUserBackup(): string {
  const payload = {
    weights: loadUserWeights(),
    scores: loadUserScores(),
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };
  return JSON.stringify(payload, null, 2);
}

export function importUserBackup(jsonString: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.weights && typeof parsed.weights === 'object') {
      saveUserWeights(parsed.weights);
    }
    if (parsed.scores && typeof parsed.scores === 'object') {
      saveUserScores(parsed.scores);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
