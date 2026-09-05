
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

const tbmmAll = [];
for (const [c, list] of Object.entries(tbmm)) {
  for (const m of list) {
    tbmmAll.push({ ...m, city: c });
  }
}

// Find any MP who is AKP in TBMM but yeni_parti in app
ALL_MPS.forEach(m => {
  const norm = m.fullName.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, '');
  const t = tbmmAll.find(x => {
    const xn = x.name.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, '');
    return xn === norm || (xn.includes(norm) && norm.length > 5) || (norm.includes(xn) && xn.length > 5);
  });
  if (t && t.party === 'AK Parti' && m.partyId !== 'akp') {
    console.log('AKP in TBMM but', m.partyId, 'in app:', m.id, m.fullName, m.province);
  }
});
