import { TOPICS } from '../data/topics';
import { DEFAULT_BENCHMARK_USER_SCORES } from '../data/mps';
import { UserScores, UserWeights, ContributionProposal } from '../types';

const STORAGE_KEYS = {
  WEIGHTS: 'mv_puanlama_weights_v2',
  SCORES: 'mv_puanlama_scores_v2',
  ACTIVE_TAB: 'mv_puanlama_active_tab_v2',
  PROPOSALS: 'mv_puanlama_proposals_v1',
  REVIEWER_PIN: 'mv_puanlama_reviewer_pin_v1',
  ACTIVE_REVIEWER: 'mv_puanlama_active_reviewer_v1',
  CUSTOM_SOURCES: 'mv_puanlama_custom_sources_v1',
  CUSTOM_TOPICS: 'mv_puanlama_custom_topics_v1',
  SELECTED_TOPIC_IDS: 'mv_puanlama_selected_topic_ids_v1',
};

// Custom User Added Topics
export function loadUserCustomTopics(): import('../types').Topic[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_TOPICS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load custom topics:', e);
  }
  return [];
}

export function saveUserCustomTopics(topics: import('../types').Topic[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TOPICS, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save custom topics:', e);
  }
}

export function addUserCustomTopic(topicData: Omit<import('../types').Topic, 'id'>): import('../types').Topic {
  const current = loadUserCustomTopics();
  const newTopic: import('../types').Topic = {
    ...topicData,
    id: `custom_topic_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  };
  const updated = [...current, newTopic];
  saveUserCustomTopics(updated);
  return newTopic;
}

export function removeUserCustomTopic(topicId: string): void {
  const current = loadUserCustomTopics();
  const updated = current.filter(t => t.id !== topicId);
  saveUserCustomTopics(updated);
}

// User Selected Active Topic IDs (for clean, focused evaluation)
export function loadUserSelectedTopicIds(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SELECTED_TOPIC_IDS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load selected topic ids:', e);
  }
  return null; // null means show all by default or first batch
}

export function saveUserSelectedTopicIds(topicIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_TOPIC_IDS, JSON.stringify(topicIds));
  } catch (e) {
    console.error('Failed to save selected topic ids:', e);
  }
}

// Custom User Added Sources Storage: mpId -> { topicId -> SourceItem[] }
export type UserCustomSources = Record<string, Record<string, import('../types').SourceItem[]>>;

export function loadUserCustomSources(): UserCustomSources {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_SOURCES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load custom sources:', e);
  }
  return {};
}

export function saveUserCustomSources(sources: UserCustomSources): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SOURCES, JSON.stringify(sources));
  } catch (e) {
    console.error('Failed to save custom sources:', e);
  }
}

export function addUserCustomSource(
  mpId: string, 
  topicId: string, 
  sourceData: Omit<import('../types').SourceItem, 'id' | 'mpId' | 'topicId'>
): import('../types').SourceItem {
  const current = loadUserCustomSources();
  const mpSources = current[mpId] || {};
  const topicSources = mpSources[topicId] || [];

  const newSource: import('../types').SourceItem = {
    ...sourceData,
    id: `src-usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    mpId,
    topicId,
  };

  mpSources[topicId] = [...topicSources, newSource];
  current[mpId] = mpSources;
  saveUserCustomSources(current);
  return newSource;
}

export function removeUserCustomSource(mpId: string, topicId: string, sourceId: string): void {
  const current = loadUserCustomSources();
  if (current[mpId] && current[mpId][topicId]) {
    current[mpId][topicId] = current[mpId][topicId].filter((s) => s.id !== sourceId);
    saveUserCustomSources(current);
  }
}

// Initial Seed Proposals to showcase the moderation system
export const INITIAL_PROPOSALS: ContributionProposal[] = [
  {
    id: 'prop-seed-1',
    type: 'stance_update',
    submittedAt: '2024-08-28 14:35',
    submitterName: 'Erdeniz Taşlıçukur',
    submitterNote: 'TBMM Genel Kurul tutanakları incelemesi ve grup beyanı.',
    status: 'approved',
    reviewedBy: 'Erdeniz Taşlıçukur (Baş Hakem)',
    reviewedAt: '2024-08-28 15:00',
    reviewerComment: 'TBMM Genel Kurulu resmi tutanak kayıtları ile teyit edildi.',
    mpId: 'ozgur_ozel',
    mpName: 'Özgür Özel',
    topicId: 'cerceve_yasa',
    topicTitle: 'Çerçeve Yasa (Terör & İnfaz Düzenlemesi / Tahliye Tartışması)',
    stanceTag: 'karsi_cikti',
    stanceLabel: 'Kesin Olarak Karşı Çıktı',
    overallSummary: 'Terör örgütü mensuplarının infaz indirimiyle tahliye edilmesini öngören çerçeve yasa maddelerine karşı CHP grubu adına ret oyu ve kürsü konuşması yaptı.',
    keyParaphrasedQuote: 'Terör örgütü faillerine ve mafya uzantılarına örtülü af getiren hiçbir düzenlemenin altına imza atmayız.',
    sourceUrl: 'https://tbmm.gov.tr',
    sourcePlatform: 'TBMM Tutanakları',
    sourceSummary: 'TBMM Genel Kurulu 28. Dönem tutanak metni.',
  }
];

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
  return {};
}

export function saveUserScores(scores: UserScores): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save user scores:', e);
  }
}

// Moderation Proposals Storage
export function loadProposals(): ContributionProposal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load proposals:', e);
  }
  saveProposals(INITIAL_PROPOSALS);
  return INITIAL_PROPOSALS;
}

export function saveProposals(proposals: ContributionProposal[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  } catch (e) {
    console.error('Failed to save proposals:', e);
  }
}

export function addProposal(proposalData: Omit<ContributionProposal, 'id' | 'submittedAt' | 'status'>): ContributionProposal {
  const proposals = loadProposals();
  const newProposal: ContributionProposal = {
    ...proposalData,
    id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submittedAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
    status: 'pending',
  };
  proposals.unshift(newProposal);
  saveProposals(proposals);
  return newProposal;
}

export function updateProposalStatus(
  proposalId: string,
  status: 'approved' | 'rejected',
  reviewerName: string,
  reviewerComment?: string,
  modifiedData?: Partial<ContributionProposal>
): ContributionProposal[] {
  const proposals = loadProposals();
  const updated = proposals.map((p) => {
    if (p.id === proposalId) {
      return {
        ...p,
        ...(modifiedData || {}),
        status,
        reviewedBy: reviewerName,
        reviewedAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
        reviewerComment: reviewerComment || (status === 'approved' ? 'Teyit edildi ve yayına alındı.' : 'Yetersiz kaynak/uyumsuzluk gerekçesiyle reddedildi.'),
      };
    }
    return p;
  });
  saveProposals(updated);
  return updated;
}

export function exportUserBackup(): string {
  const payload = {
    weights: loadUserWeights(),
    scores: loadUserScores(),
    proposals: loadProposals(),
    exportedAt: new Date().toISOString(),
    version: '2.0',
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
    if (Array.isArray(parsed.proposals)) {
      saveProposals(parsed.proposals);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
