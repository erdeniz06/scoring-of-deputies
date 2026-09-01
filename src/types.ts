export type TopicCategory = 
  | 'siyaset' 
  | 'hukuk' 
  | 'sosyal' 
  | 'kultur_ifade' 
  | 'egitim_inanc';

export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  seatCount: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: TopicCategory;
  defaultImportance: number; // 0-10
  contextNote: string;
  partyScope?: 'all' | 'opposition' | 'chp' | 'iyi' | 'akp' | 'mhp' | 'dem' | 'tip' | string;
  partyScopeLabel?: string;
}

export type SourceType = 'tweet' | 'news' | 'tv';

export interface SourceItem {
  id: string;
  mpId: string;
  topicId: string;
  sourceType: SourceType;
  url: string;
  summary: string;
  outletOrPlatform: string;
  publishDate: string;
  timestampInVideo?: string;
}

export type StanceTag = 
  | 'destekledi' 
  | 'karsi_cikti' 
  | 'serh_koydu' 
  | 'notr_cekimser' 
  | 'kanun_teklifi' 
  | 'sessiz_kaldi'
  | 'elestirdi'
  | 'savundu';

export interface MpTopicStance {
  id: string;
  mpId: string;
  topicId: string;
  stanceTag: StanceTag;
  stanceLabel: string;
  overallSummary: string;
  keyParaphrasedQuote: string;
  lastUpdated: string;
  sources: SourceItem[];
  isCommunityVerified?: boolean;
}

export interface MP {
  id: string;
  fullName: string;
  partyId: string;
  electedPartyId?: string; // e.g. 'chp' if elected from CHP list, but now 'deva' or 'saadet'
  province: string;
  electoralDistrict?: string; // e.g. '1. Bölge', '2. Bölge', '3. Bölge'
  photoUrl: string;
  term: string;
  title: string;
  bio: string;
  committee?: string;
  stances: Record<string, MpTopicStance>;
  tbmmProfileUrl?: string;
}

// Moderation and Contribution System
export type ContributionType = 'stance_update' | 'new_mp' | 'new_topic';
export type ContributionStatus = 'pending' | 'approved' | 'rejected';

export interface ContributionProposal {
  id: string;
  type: ContributionType;
  submittedAt: string;
  submitterName: string;
  submitterNote?: string;
  status: ContributionStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewerComment?: string;
  
  // For stance updates
  mpId?: string;
  mpName?: string;
  topicId?: string;
  topicTitle?: string;
  stanceTag?: StanceTag;
  stanceLabel?: string;
  overallSummary?: string;
  keyParaphrasedQuote?: string;
  sourceUrl?: string;
  sourcePlatform?: string;
  sourceSummary?: string;
  
  // For new MP proposals
  newMpData?: {
    fullName: string;
    partyId: string;
    province: string;
    photoUrl?: string;
    title: string;
    bio: string;
    tbmmProfileUrl?: string;
  };
  
  // For new Topic proposals
  newTopicData?: {
    title: string;
    description: string;
    category: TopicCategory;
    partyScope?: 'all' | 'chp' | 'iyi' | 'akp' | 'mhp' | 'dem' | 'tip';
    partyScopeLabel?: string;
    contextNote: string;
  };
}

// User Weights: Topic ID -> Importance (0-10, where 10 = %100, 9 = %90 ... 0 = %0)
export type UserWeights = Record<string, number>;

// MP-specific Topic Weights: MP ID -> { Topic ID -> Importance (0-10) }
export type MpTopicWeights = Record<string, Record<string, number>>;

// User Scores: MP ID -> { Topic ID -> Score (0-10) }
export type UserScores = Record<string, Record<string, number>>;

export interface TopicCalculationContribution {
  topicId: string;
  topicTitle: string;
  importance: number; // 0-10
  importancePercent: number; // 0-100
  score: number | null; // 0-10
  nominatorContribution: number; // (importance * 10) * score
  denominatorContribution: number; // (importance * 10) * 10
  isScored: boolean;
}

export interface ScoreCalculationResult {
  mpId: string;
  compatibilityPercentage: number; // 0 to 100
  totalNominator: number;
  totalDenominator: number;
  scoredTopicsCount: number;
  totalTopicsCount: number;
  activeWeightedTopicsCount: number;
  topicBreakdowns: TopicCalculationContribution[];
}
