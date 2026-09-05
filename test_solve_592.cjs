
const { ALL_MPS } = require('./src/data/mps');

// Desired target seat counts
const targets = {
  akp: 280,
  yeni_parti: 91,
  dem: 56,
  mhp: 46,
  chp: 44,
  iyi: 26,
  yeni_yol: 20,
  bagimsiz: 13,
  huda_par: 4,
  yrp: 3,
  tip: 4,
  dbp: 2,
  emep: 2,
  saadet: 1
};

console.log('Target total:', Object.values(targets).reduce((a, b) => a + b, 0));
