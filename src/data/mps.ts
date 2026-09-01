import { MP, UserScores } from '../types';
import { ADANA_MPS } from './mps/adanaMps';
import { ISTANBUL_MPS } from './mps/istanbulMps';
import { CHP_MPS } from './mps/chpMps';
import { AKP_MPS } from './mps/akpMps';
import { OTHER_MPS } from './mps/otherMps';
import { REGIONAL_MPS } from './mps/regionalMps';
import { PROVINCES_NEW_MPS } from './mps/provincesNewMps';
import { PROVINCES_NEW_MPS_2 } from './mps/provincesNewMps2';
import { PROVINCES_NEW_MPS_3 } from './mps/provincesNewMps3';
import { PROVINCES_NEW_MPS_4 } from './mps/provincesNewMps4';
import { PROVINCES_NEW_MPS_5 } from './mps/provincesNewMps5';
import { PROVINCES_NEW_MPS_6 } from './mps/provincesNewMps6';
import { PROVINCES_NEW_MPS_7 } from './mps/provincesNewMps7';

// Combine all datasets with deduplication by id
const combinedMps = [
  ...ADANA_MPS,
  ...ISTANBUL_MPS,
  ...CHP_MPS,
  ...AKP_MPS,
  ...OTHER_MPS,
  ...REGIONAL_MPS,
  ...PROVINCES_NEW_MPS,
  ...PROVINCES_NEW_MPS_2,
  ...PROVINCES_NEW_MPS_3,
  ...PROVINCES_NEW_MPS_4,
  ...PROVINCES_NEW_MPS_5,
  ...PROVINCES_NEW_MPS_6,
  ...PROVINCES_NEW_MPS_7,
];

const uniqueMpMap = new Map<string, MP>();
combinedMps.forEach((mp) => {
  if (!uniqueMpMap.has(mp.id)) {
    uniqueMpMap.set(mp.id, mp);
  }
});

export const ALL_MPS: MP[] = Array.from(uniqueMpMap.values());

export function getMpById(id: string): MP | undefined {
  return ALL_MPS.find((mp) => mp.id === id);
}

/**
 * Başlangıç puan haritası: Kullanıcının kendi puanlamalarını yapması için temiz boş nesne.
 */
export const DEFAULT_BENCHMARK_USER_SCORES: UserScores = {};

