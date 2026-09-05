
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');

console.log('Total in ALL_MPS:', ALL_MPS.length);

// Check if any MP names are identical or have duplicate IDs
const byName = {};
ALL_MPS.forEach(m => {
  const norm = m.fullName.trim().toLowerCase();
  if (!byName[norm]) byName[norm] = [];
  byName[norm].push(m);
});

console.log('--- DUPLICATE NAMES ---');
for (const [name, list] of Object.entries(byName)) {
  if (list.length > 1) {
    console.log(name, list.map(x => ({ id: x.id, prov: x.province, party: x.partyId })));
  }
}
