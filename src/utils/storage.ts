import { TOPICS } from '../data/topics';
import { DEFAULT_BENCHMARK_USER_SCORES } from '../data/mps';
import { INITIAL_CONTROVERSIES } from '../data/controversies';
import { UserScores, UserWeights, MpTopicWeights, ContributionProposal, ControversyItem } from '../types';

const STORAGE_KEYS = {
  WEIGHTS: 'mv_puanlama_weights_v2',
  MP_WEIGHTS: 'mv_puanlama_mp_weights_v1',
  SCORES: 'mv_puanlama_scores_v2',
  ACTIVE_TAB: 'mv_puanlama_active_tab_v2',
  PROPOSALS: 'mv_puanlama_proposals_v1',
  REVIEWER_PIN: 'mv_puanlama_reviewer_pin_v1',
  ACTIVE_REVIEWER: 'mv_puanlama_active_reviewer_v1',
  CUSTOM_SOURCES: 'mv_puanlama_custom_sources_v1',
  CUSTOM_TOPICS: 'mv_puanlama_custom_topics_v1',
  SELECTED_TOPIC_IDS: 'mv_puanlama_selected_topic_ids_v1',
  USER_ROLE: 'mv_puanlama_user_role_v1',
  APPROVED_CUSTOM_STANCES: 'mv_puanlama_approved_custom_stances_v1',
  TOPIC_OVERRIDES: 'mv_puanlama_topic_overrides_v1',
  CONTROVERSIES: 'mv_puanlama_controversies_v1',
};

// User Role (Founder vs Normal Contributor)
export type AppUserRole = 'founder' | 'contributor';

export function loadUserRole(): AppUserRole {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    if (raw === 'contributor' || raw === 'founder') {
      return raw;
    }
  } catch (e) {
    console.error('Failed to load user role:', e);
  }
  return 'founder'; // Default to Founder as requested by user
}

export function saveUserRole(role: AppUserRole): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (e) {
    console.error('Failed to save user role:', e);
  }
}

// Live Approved Custom Stances Storage (mpId -> { topicId -> MpTopicStance })
export type ApprovedCustomStances = Record<string, Record<string, import('../types').MpTopicStance>>;

export function loadApprovedCustomStances(): ApprovedCustomStances {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPROVED_CUSTOM_STANCES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load approved custom stances:', e);
  }
  return {};
}

export function saveApprovedCustomStances(stances: ApprovedCustomStances): void {
  try {
    localStorage.setItem(STORAGE_KEYS.APPROVED_CUSTOM_STANCES, JSON.stringify(stances));
  } catch (e) {
    console.error('Failed to save approved custom stances:', e);
  }
}

export function addApprovedCustomStance(
  mpId: string, 
  topicId: string, 
  stance: import('../types').MpTopicStance
): void {
  const current = loadApprovedCustomStances();
  if (!current[mpId]) {
    current[mpId] = {};
  }
  current[mpId][topicId] = stance;
  saveApprovedCustomStances(current);
}

export function updateApprovedCustomStance(
  mpId: string, 
  topicId: string, 
  updatedData: Partial<import('../types').MpTopicStance>
): void {
  const current = loadApprovedCustomStances();
  if (!current[mpId]) {
    current[mpId] = {};
  }
  const existing: import('../types').MpTopicStance = current[mpId][topicId] || {
    id: `stance-usr-${Date.now()}`,
    mpId,
    topicId,
    stanceTag: 'destekledi',
    stanceLabel: 'Destekledi / Kabul Oyu Verdi',
    overallSummary: '',
    keyParaphrasedQuote: '',
    sources: [],
    lastUpdated: 'Şimdi güncellendi',
  };
  current[mpId][topicId] = {
    ...existing,
    mpId,
    topicId,
    ...updatedData,
    lastUpdated: new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) + ' (Düzenlendi)',
  };
  saveApprovedCustomStances(current);
}

export function removeApprovedCustomStance(mpId: string, topicId: string): void {
  const current = loadApprovedCustomStances();
  if (current[mpId] && current[mpId][topicId]) {
    delete current[mpId][topicId];
    saveApprovedCustomStances(current);
  }
}

export function isStanceCustomOrEdited(mpId: string, topicId: string): boolean {
  const current = loadApprovedCustomStances();
  return !!(current[mpId] && current[mpId][topicId]);
}

export function mergeMpWithCustomStances(mp: import('../types').MP, approvedStances?: ApprovedCustomStances): import('../types').MP {
  const allApproved = approvedStances || loadApprovedCustomStances();
  const mpCustomStances = allApproved[mp.id];
  if (!mpCustomStances || Object.keys(mpCustomStances).length === 0) {
    return mp;
  }
  return {
    ...mp,
    stances: {
      ...mp.stances,
      ...mpCustomStances,
    },
  };
}

export function mergeAllMpsWithCustomStances(mps: import('../types').MP[]): import('../types').MP[] {
  const approved = loadApprovedCustomStances();
  if (Object.keys(approved).length === 0) return mps;
  return mps.map((m) => mergeMpWithCustomStances(m, approved));
}

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

// Topic / Criteria Overrides & Renaming Storage
export type TopicOverrides = Record<string, Partial<import('../types').Topic>>;

export function loadTopicOverrides(): TopicOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPIC_OVERRIDES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load topic overrides:', e);
  }
  return {};
}

export function saveTopicOverrides(overrides: TopicOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TOPIC_OVERRIDES, JSON.stringify(overrides));
  } catch (e) {
    console.error('Failed to save topic overrides:', e);
  }
}

export function updateTopicDetails(topicId: string, updatedData: Partial<import('../types').Topic>): void {
  // Check if it's a custom topic
  const customTopics = loadUserCustomTopics();
  const customIdx = customTopics.findIndex(t => t.id === topicId);
  if (customIdx >= 0) {
    customTopics[customIdx] = {
      ...customTopics[customIdx],
      ...updatedData,
    };
    saveUserCustomTopics(customTopics);
    return;
  }
  
  // For built-in or any other topics, save to topic overrides
  const overrides = loadTopicOverrides();
  overrides[topicId] = {
    ...(overrides[topicId] || {}),
    ...updatedData,
  };
  saveTopicOverrides(overrides);
}

export function resetTopicDetails(topicId: string): void {
  const overrides = loadTopicOverrides();
  delete overrides[topicId];
  saveTopicOverrides(overrides);
}

export function mergeTopicsWithOverrides(
  builtInTopics: import('../types').Topic[],
  customTopics: import('../types').Topic[],
  overrides: TopicOverrides
): import('../types').Topic[] {
  const mergedBuiltIns = builtInTopics.map(t => {
    if (overrides[t.id]) {
      return {
        ...t,
        ...overrides[t.id],
      };
    }
    return t;
  });

  const mergedCustom = customTopics.map(t => {
    if (overrides[t.id]) {
      return {
        ...t,
        ...overrides[t.id],
      };
    }
    return t;
  });

  return [...mergedBuiltIns, ...mergedCustom];
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
    id: 'prop-seed-2',
    type: 'new_topic',
    submittedAt: '2024-08-30 11:20',
    submitterName: 'Av. Kemal S.',
    submitterNote: 'Son yargı paketinde geçen hayvan hakları ve sokak hayvanları yasası için vekillerin oylamaları puanlamaya dahil edilmeli.',
    status: 'pending',
    newTopicData: {
      title: 'Sokak Hayvanları Yasası (Ötanazi & Barınak Düzenlemesi)',
      category: 'sosyal',
      defaultImportance: 8,
      partyScope: 'all',
      partyScopeLabel: 'Genel (Tüm Milletvekilleri)',
      description: 'Sahipsiz sokak hayvanlarına yönelik TBMM Genel Kurulu 7527 sayılı kanun teklifi, ötanazi maddesi ve muhalefet partilerinin itirazları.',
      contextNote: 'TBMM Genel Kurulu 28. Dönem 2. Yasama Yılı 105. Birleşim tutanakları.',
    }
  },
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

// MP-Specific Topic Weights (mpId -> { topicId -> weight })
export function loadMpWeights(): MpTopicWeights {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MP_WEIGHTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load MP weights:', e);
  }
  return {};
}

export function saveMpWeights(weights: MpTopicWeights): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MP_WEIGHTS, JSON.stringify(weights));
  } catch (e) {
    console.error('Failed to save MP weights:', e);
  }
}

export function setMpTopicWeightInStorage(mpId: string, topicId: string, weight: number): void {
  const current = loadMpWeights();
  if (!current[mpId]) {
    current[mpId] = {};
  }
  current[mpId][topicId] = weight;
  saveMpWeights(current);
}

export function resetMpWeightsInStorage(mpId: string): void {
  const current = loadMpWeights();
  if (current[mpId]) {
    delete current[mpId];
    saveMpWeights(current);
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

export function addDirectlyApprovedFounderProposal(
  proposalData: Omit<ContributionProposal, 'id' | 'submittedAt' | 'status' | 'reviewedBy' | 'reviewedAt' | 'reviewerComment'>
): ContributionProposal {
  const proposals = loadProposals();
  const newProposal: ContributionProposal = {
    ...proposalData,
    id: `prop-fnd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submittedAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
    status: 'approved',
    reviewedBy: 'Erdeniz Taşlıçukur (Kurucu)',
    reviewedAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
    reviewerComment: '👑 Kurucu doğrudan onay yetkisi ile anında canlıya alındı.',
  };
  proposals.unshift(newProposal);
  saveProposals(proposals);

  // Sync to live approved custom stances if it's a stance update
  if (newProposal.mpId && newProposal.topicId && newProposal.stanceTag) {
    addApprovedCustomStance(newProposal.mpId, newProposal.topicId, {
      id: `st-custom-${newProposal.mpId}-${newProposal.topicId}`,
      mpId: newProposal.mpId,
      topicId: newProposal.topicId,
      stanceTag: newProposal.stanceTag,
      stanceLabel: newProposal.stanceLabel || 'Doğrulanmış Tutanak / Demeç',
      overallSummary: newProposal.overallSummary || '',
      keyParaphrasedQuote: newProposal.keyParaphrasedQuote || '',
      lastUpdated: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
      isCommunityVerified: true,
      sources: newProposal.sourceUrl ? [
        {
          id: `src-prop-${Date.now()}`,
          mpId: newProposal.mpId,
          topicId: newProposal.topicId,
          sourceType: 'news',
          url: newProposal.sourceUrl,
          outletOrPlatform: newProposal.sourcePlatform || 'Doğrulanmış Kaynak',
          summary: newProposal.sourceSummary || 'Kurucu tarafından doğrulanan kaynak.',
          publishDate: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
        }
      ] : [],
    });
  }

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
  let targetProposal: ContributionProposal | undefined;

  const updated = proposals.map((p) => {
    if (p.id === proposalId) {
      targetProposal = {
        ...p,
        ...(modifiedData || {}),
        status,
        reviewedBy: reviewerName,
        reviewedAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
        reviewerComment: reviewerComment || (status === 'approved' ? 'Teyit edildi ve yayına alındı.' : 'Yetersiz kaynak/uyumsuzluk gerekçesiyle reddedildi.'),
      };
      return targetProposal;
    }
    return p;
  });

  saveProposals(updated);

  // If approved, dynamically inject into live MP stances, topics or criteria
  if (status === 'approved' && targetProposal) {
    // 1. Stance Updates
    if (targetProposal.type === 'stance_update' && targetProposal.mpId && targetProposal.topicId && targetProposal.stanceTag) {
      addApprovedCustomStance(targetProposal.mpId, targetProposal.topicId, {
        id: `st-custom-${targetProposal.mpId}-${targetProposal.topicId}`,
        mpId: targetProposal.mpId,
        topicId: targetProposal.topicId,
        stanceTag: targetProposal.stanceTag,
        stanceLabel: targetProposal.stanceLabel || 'Hakem Onaylı Tutanak / Demeç',
        overallSummary: targetProposal.overallSummary || '',
        keyParaphrasedQuote: targetProposal.keyParaphrasedQuote || '',
        lastUpdated: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
        isCommunityVerified: true,
        sources: targetProposal.sourceUrl ? [
          {
            id: `src-prop-${Date.now()}`,
            mpId: targetProposal.mpId,
            topicId: targetProposal.topicId,
            sourceType: 'news',
            url: targetProposal.sourceUrl,
            outletOrPlatform: targetProposal.sourcePlatform || 'Doğrulanmış Kaynak',
            summary: targetProposal.sourceSummary || 'Hakem heyeti tarafından doğrulanmış kaynak.',
            publishDate: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
          }
        ] : [],
      });
    }

    // 2. New Criteria / Topic Proposals
    if (targetProposal.type === 'new_topic' && targetProposal.newTopicData) {
      addUserCustomTopic({
        title: targetProposal.newTopicData.title,
        category: targetProposal.newTopicData.category,
        description: targetProposal.newTopicData.description,
        defaultImportance: targetProposal.newTopicData.defaultImportance || 8,
        partyScope: targetProposal.newTopicData.partyScope || 'all',
        partyScopeLabel: targetProposal.newTopicData.partyScopeLabel || 'Genel (Tüm Milletvekilleri)',
        contextNote: targetProposal.newTopicData.contextNote || 'Hakem heyeti denetiminden geçerek onaylanan meclis kriteri.',
      });
    }

    // 3. Topic Rename / Criteria Edit Proposals
    if (targetProposal.type === 'topic_rename' && targetProposal.topicEditData) {
      updateTopicDetails(targetProposal.topicEditData.topicId, {
        title: targetProposal.topicEditData.newTitle,
        category: targetProposal.topicEditData.category,
        description: targetProposal.topicEditData.description,
        partyScope: targetProposal.topicEditData.partyScope,
        partyScopeLabel: targetProposal.topicEditData.partyScopeLabel,
        contextNote: targetProposal.topicEditData.contextNote,
        defaultImportance: targetProposal.topicEditData.defaultImportance,
      });
    }
  }

  return updated;
}

// ----------------------------------------------------
// CONTROVERSIES, SCANDALS & FEZLEKE DOSYALARI STORAGE
// ----------------------------------------------------

export function loadAllControversies(): ControversyItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTROVERSIES);
    if (raw) {
      const userControversies: ControversyItem[] = JSON.parse(raw);
      // Map user ones by ID
      const userMap = new Map<string, ControversyItem>();
      for (const item of userControversies) {
        userMap.set(item.id, item);
      }
      // Combine with INITIAL_CONTROVERSIES (user override or added items)
      const result: ControversyItem[] = [];
      const seenIds = new Set<string>();

      for (const init of INITIAL_CONTROVERSIES) {
        if (userMap.has(init.id)) {
          const userVer = userMap.get(init.id)!;
          result.push(userVer);
        } else {
          result.push(init);
        }
        seenIds.add(init.id);
      }

      // Add user new items
      for (const userItem of userControversies) {
        if (!seenIds.has(userItem.id)) {
          result.push(userItem);
          seenIds.add(userItem.id);
        }
      }

      return result;
    }
  } catch (e) {
    console.error('Failed to load controversies:', e);
  }
  return [...INITIAL_CONTROVERSIES];
}

export function saveAllControversies(items: ControversyItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTROVERSIES, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save controversies:', e);
  }
}

export function addUserControversy(data: Omit<ControversyItem, 'id'>): ControversyItem {
  const all = loadAllControversies();
  const newItem: ControversyItem = {
    ...data,
    id: `cntr-usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    isUserAdded: true,
  };
  all.unshift(newItem);
  saveAllControversies(all);
  return newItem;
}

export function updateUserControversy(id: string, updated: Partial<ControversyItem>): void {
  const all = loadAllControversies();
  const index = all.findIndex((c) => c.id === id);
  if (index !== -1) {
    all[index] = { ...all[index], ...updated };
    saveAllControversies(all);
  }
}

export function deleteUserControversy(id: string): void {
  const all = loadAllControversies();
  const filtered = all.filter((c) => c.id !== id);
  saveAllControversies(filtered);
}

export function getControversiesForMp(mpId: string): ControversyItem[] {
  const all = loadAllControversies();
  return all.filter((c) => c.mpId === mpId);
}

export function exportUserBackup(): string {
  const payload = {
    weights: loadUserWeights(),
    scores: loadUserScores(),
    proposals: loadProposals(),
    controversies: loadAllControversies(),
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
    if (Array.isArray(parsed.controversies)) {
      saveAllControversies(parsed.controversies);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
