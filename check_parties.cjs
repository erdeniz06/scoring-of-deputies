
const { ALL_MPS } = require('./src/data/mps');
const { PARTIES, UNIQUE_PARTIES } = require('./src/data/parties');

console.log('Total ALL_MPS:', ALL_MPS.length);

const counts = {};
ALL_MPS.forEach(m => {
  counts[m.partyId] = (counts[m.partyId] || 0) + 1;
});
console.log('Current MP count by party:');
console.log(counts);

let targetTotal = 0;
UNIQUE_PARTIES.forEach(p => {
  console.log(p.id.padEnd(12), 'seatCount:', p.seatCount, 'actual in ALL_MPS:', counts[p.id] || 0);
  targetTotal += p.seatCount;
});
console.log('Sum of seatCounts in UNIQUE_PARTIES:', targetTotal);
