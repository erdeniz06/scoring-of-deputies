import { MP, UserScores } from '../types';
import { CHP_MPS } from './mps/chpMps';
import { AKP_MPS } from './mps/akpMps';
import { OTHER_MPS } from './mps/otherMps';

export const ALL_MPS: MP[] = [
  ...CHP_MPS,
  ...AKP_MPS,
  ...OTHER_MPS,
];

export function getMpById(id: string): MP | undefined {
  return ALL_MPS.find((mp) => mp.id === id);
}

/**
 * Pre-configured realistic sample scores representing an active, engaged citizen's evaluations.
 * Users can keep, modify, or completely reset these scores at any time.
 */
export const DEFAULT_BENCHMARK_USER_SCORES: UserScores = {
  ozgur_ozel: {
    '2023_kk_adaylik': 8,
    '2023_kk_oo_kurultay': 9,
    '2024_iyi_parti_kurultay': 7,
    'sokak_kopegi_yasasi': 9,
    'cerceve_yasa': 7,
    'milli_bayramlar_ataturk': 10,
    'tarikat_cemaatler': 9,
    'hdp_tutum': 8,
    'bireysel_silahlanma': 8,
    'genel_af': 6,
    'selahattin_demirtas': 8,
    'kent_lokantalari': 9,
    'ifade_hurriyeti': 9,
    '28_subat': 8,
    'evrim_teorisi': 9,
    'alevi_sakasi_komedyen': 7,
    'deniz_goktas': 8,
    'komedyenler_ifade_ozgurlugu': 9,
  },
  ali_mahir_basarir: {
    '2023_kk_adaylik': 8,
    '2023_kk_oo_kurultay': 9,
    'sokak_kopegi_yasasi': 9,
    'cerceve_yasa': 8,
    'ifade_hurriyeti': 9,
  },
  mustafa_varank: {
    '2023_kk_adaylik': 3,
    '2023_kk_oo_kurultay': 2,
    'sokak_kopegi_yasasi': 4,
    'cerceve_yasa': 4,
    'tarikat_cemaatler': 2,
    'hdp_tutum': 3,
    'kent_lokantalari': 2,
    'evrim_teorisi': 2,
    'komedyenler_ifade_ozgurlugu': 2,
  },
  ozlem_zengin: {
    'sokak_kopegi_yasasi': 5,
    'bireysel_silahlanma': 7,
    'milli_bayramlar_ataturk': 7,
  },
  turhan_comez: {
    '2024_iyi_parti_kurultay': 7,
    'sokak_kopegi_yasasi': 8,
    'bireysel_silahlanma': 9,
  },
  ahmet_sik: {
    'ifade_hurriyeti': 10,
    'komedyenler_ifade_ozgurlugu': 10,
    'deniz_goktas': 9,
    'tarikat_cemaatler': 9,
    'selahattin_demirtas': 9,
  },
  feti_yildiz: {
    'genel_af': 6,
    'hdp_tutum': 3,
    'milli_bayramlar_ataturk': 8,
  },
  cengiz_candar: {
    'selahattin_demirtas': 9,
    'ifade_hurriyeti': 9,
    '28_subat': 7,
  },
};
