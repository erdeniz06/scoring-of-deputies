
const { ALL_MPS } = require('./src/data/mps');

['dbp', 'dem', 'iyi', 'yrp', 'bagimsiz', 'saadet'].forEach(p => {
  const mps = ALL_MPS.filter(m => m.partyId === p);
  console.log('=== ' + p.toUpperCase() + ' (' + mps.length + ') ===');
  mps.forEach(m => console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.province));
});
