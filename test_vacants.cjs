
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

// Build list of all valid normalized TBMM names
const tbmmNames = [];
for (const [city, list] of Object.entries(tbmm)) {
  for (const m of list) {
    tbmmNames.push({
      city,
      name: m.name,
      norm: m.name.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, ''),
      party: m.party
    });
  }
}

console.log('Total TBMM official names:', tbmmNames.length);

// For each MP in ALL_MPS, check if they correspond to a real TBMM MP
const matched = [];
const unmatched = [];
const duplicates = [];
const seenTbmm = new Set();

ALL_MPS.forEach(m => {
  const norm = m.fullName.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, '');
  // find candidate
  const cand = tbmmNames.find(t => t.norm === norm || (t.norm.includes(norm) && norm.length > 5) || (norm.includes(t.norm) && t.norm.length > 5));
  if (cand) {
    if (seenTbmm.has(cand.norm)) {
      duplicates.push({ mp: m, cand });
    } else {
      seenTbmm.add(cand.norm);
      matched.push({ mp: m, cand });
    }
  } else {
    unmatched.push(m);
  }
});

console.log('Matched unique:', matched.length);
console.log('Duplicates in ALL_MPS:', duplicates.length);
duplicates.forEach(d => console.log('  DUPLICATE:', d.mp.id, d.mp.fullName, 'already seen for', d.cand.name));
console.log('Unmatched (not in TBMM official 592):', unmatched.length);
unmatched.forEach(u => console.log('  UNMATCHED:', u.id, u.fullName, u.province, u.partyId));
