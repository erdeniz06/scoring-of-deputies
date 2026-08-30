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
}

export interface MP {
  id: string;
  fullName: string;
  partyId: string;
  province: string;
  photoUrl: string;
  term: string;
  title: string;
  bio: string;
  committee?: string;
  stances: Record<string, MpTopicStance>;
}

// User Weights: Topic ID -> Importance (0-10, where 10 = %100, 9 = %90 ... 0 = %0)
export type UserWeights = Record<string, number>;

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
