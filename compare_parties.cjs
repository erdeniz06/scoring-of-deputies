
const { ALL_MPS } = require('./src/data/mps');
const targetSeatCounts = {
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

const currentCounts = {};
ALL_MPS.forEach(m => {
  currentCounts[m.partyId] = (currentCounts[m.partyId] || 0) + 1;
});

for (const p of Object.keys(targetSeatCounts)) {
  const target = targetSeatCounts[p];
  const current = currentCounts[p] || 0;
  const diff = current - target;
  console.log(p.padEnd(12) + ' Target: ' + target + ' Current: ' + current + ' Diff: ' + diff);
}
