
const { EXPLICIT_CHP_MP_IDS, ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

const chpOfficial = [];
for (const [c, list] of Object.entries(tbmm)) {
  for (const m of list) {
    if (m.party === 'CHP') chpOfficial.push({ city: c, name: m.name });
  }
}

console.log('Official CHP count:', chpOfficial.length);

chpOfficial.forEach(o => {
  // Find in ALL_MPS
  const found = ALL_MPS.find(m => {
    const fn = m.fullName.toLowerCase().replace(/[^a-zçğıöşü]/g, '');
    const on = o.name.toLowerCase().replace(/[^a-zçğıöşü]/g, '');
    return fn.includes(on) || on.includes(fn);
  });
  if (found) {
    const isExplicit = EXPLICIT_CHP_MP_IDS.has(found.id);
    if (!isExplicit) {
      console.log('Found in ALL_MPS but NOT in EXPLICIT_CHP_MP_IDS:', found.id, found.fullName, found.partyId);
    }
  } else {
    console.log('NOT FOUND in ALL_MPS at all:', o.city, o.name);
  }
});
