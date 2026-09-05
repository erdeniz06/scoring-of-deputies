
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');

const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

// Flatten all tbmm MPs
const tbmmAll = [];
for (const [city, list] of Object.entries(tbmm)) {
  for (const m of list) {
    tbmmAll.push({ ...m, city });
  }
}
console.log('TBMM total:', tbmmAll.length);
console.log('ALL_MPS total:', ALL_MPS.length);

function normalizeName(s) {
  return s.toLowerCase()
    .replace(/dr\.|prof\.|av\.|doç\./g, '')
    .replace(/[iİıI]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .replace(/[çÇ]/g, 'c')
    .replace(/[şŞ]/g, 's')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[^a-z]/g, '');
}

const tbmmNormMap = new Map();
tbmmAll.forEach(m => {
  tbmmNormMap.set(normalizeName(m.name), m);
});

const notInTbmm = [];
ALL_MPS.forEach(m => {
  const norm = normalizeName(m.fullName);
  if (!tbmmNormMap.has(norm)) {
    notInTbmm.push(m);
  }
});

console.log('In ALL_MPS but NOT in TBMM (592 active list):', notInTbmm.length);
notInTbmm.forEach(m => {
  console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.province.padEnd(15), m.partyId);
});
