
const { ALL_MPS } = require('./src/data/mps');

// Current counts
const counts = {};
ALL_MPS.forEach(m => {
  counts[m.partyId] = (counts[m.partyId] || 0) + 1;
});
console.log('Current counts before any filter:', counts);
