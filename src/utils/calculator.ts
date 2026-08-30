import { MP, ScoreCalculationResult, Topic, TopicCalculationContribution, UserScores, UserWeights } from '../types';

/**
 * Calculates the personal compatibility percentage for an MP based on:
 * - Topic Importance % (0-10, where 10 = %100, 9 = %90, ..., 0 = %0)
 * - User Score for MP's stance on that topic (0-10)
 * 
 * Formula:
 * Uyum Yüzdesi = Σ(önem% × puan) / Σ(önem% × 10) × 100
 */
export function calculateMpScore(
  mp: MP,
  topics: Topic[],
  userWeights: UserWeights,
  userScores: UserScores
): ScoreCalculationResult {
  const mpScores = userScores[mp.id] || {};
  let totalNominator = 0;
  let totalDenominator = 0;
  let scoredTopicsCount = 0;
  let activeWeightedTopicsCount = 0;

  const topicBreakdowns: TopicCalculationContribution[] = topics.map((topic) => {
    // Importance 0-10 -> percent (10 = 100%, 8 = 80%, etc.)
    const importance = userWeights[topic.id] !== undefined ? userWeights[topic.id] : topic.defaultImportance;
    const importancePercent = importance * 10;
    
    if (importance > 0) {
      activeWeightedTopicsCount++;
    }

    const rawScore = mpScores[topic.id];
    const isScored = rawScore !== undefined && rawScore !== null;
    const score = isScored ? rawScore : null;

    let nominatorContribution = 0;
    let denominatorContribution = 0;

    if (isScored && importance > 0) {
      scoredTopicsCount++;
      nominatorContribution = importancePercent * (score as number);
      denominatorContribution = importancePercent * 10;

      totalNominator += nominatorContribution;
      totalDenominator += denominatorContribution;
    }

    return {
      topicId: topic.id,
      topicTitle: topic.title,
      importance,
      importancePercent,
      score,
      nominatorContribution,
      denominatorContribution,
      isScored,
    };
  });

  let compatibilityPercentage = 0;
  if (totalDenominator > 0) {
    compatibilityPercentage = Number(((totalNominator / totalDenominator) * 100).toFixed(1));
  }

  return {
    mpId: mp.id,
    compatibilityPercentage,
    totalNominator,
    totalDenominator,
    scoredTopicsCount,
    totalTopicsCount: topics.length,
    activeWeightedTopicsCount,
    topicBreakdowns,
  };
}

/**
 * Generates default benchmark scores for all MPs so first-time users immediately see
 * realistic and functional scores across the 18 topics, while having full freedom to adjust or reset.
 */
export function getSemanticScoreDescription(score: number): { label: string; toneColor: string; description: string } {
  if (score >= 9) {
    return {
      label: 'Tamamen Uyumlu',
      toneColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Milletvekilinin tutumu ve açıklamaları beklentinizle bütünüyle örtüşüyor.',
    };
  }
  if (score >= 7) {
    return {
      label: 'Büyük Ölçüde Uyumlu',
      toneColor: 'text-teal-700 bg-teal-50 border-teal-200',
      description: 'Temel ilkeler ve yaklaşım beklentinize oldukça yakın.',
    };
  }
  if (score >= 5) {
    return {
      label: 'Kısmen Uyumlu / Nötr',
      toneColor: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'Tutumda hem katıldığınız hem itiraz ettiğiniz yönler veya dengeli bir duruş var.',
    };
  }
  if (score >= 3) {
    return {
      label: 'Kısmen Zıt',
      toneColor: 'text-orange-700 bg-orange-50 border-orange-200',
      description: 'Tutum ve oylama tercihi görüşlerinizle belirgin oranda uyuşmuyor.',
    };
  }
  return {
    label: 'Tamamen Zıt',
    toneColor: 'text-rose-700 bg-rose-50 border-rose-200',
    description: 'Milletvekilinin tutumu ve siyasi tercihi anlayışınızla tamamen taban tabana zıt.',
  };
}
