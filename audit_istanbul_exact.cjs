
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

const tbmmIst = tbmm['İSTANBUL'];
console.log('Official Istanbul count in TBMM:', tbmmIst.length); // 96

const allMpsIst = ALL_MPS.filter(m => m.province === 'İstanbul');
console.log('Current Istanbul count in ALL_MPS:', allMpsIst.length); // 122

function norm(s) {
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

const matchedTbmm = new Set();
const extraMpsInApp = [];

allMpsIst.forEach(m => {
  const mNorm = norm(m.fullName);
  const found = tbmmIst.find((t, idx) => {
    if (matchedTbmm.has(idx)) return false;
    const tNorm = norm(t.name);
    return tNorm === mNorm || (tNorm.includes(mNorm) && mNorm.length > 5) || (mNorm.includes(tNorm) && tNorm.length > 5);
  });
  if (found) {
    const idx = tbmmIst.indexOf(found);
    matchedTbmm.add(idx);
  } else {
    extraMpsInApp.push(m);
  }
});

console.log('Matched in Istanbul:', matchedTbmm.size);
console.log('Extra Istanbul MPs in ALL_MPS (' + extraMpsInApp.length + '):');
extraMpsInApp.forEach(m => {
  console.log('  id:', m.id.padEnd(25), 'name:', m.fullName.padEnd(30), 'party:', m.partyId);
});

const missingFromApp = tbmmIst.filter((_, idx) => !matchedTbmm.has(idx));
console.log('Missing from Istanbul in app (' + missingFromApp.length + '):');
missingFromApp.forEach(m => console.log('  ', m.name, '(', m.party, ')'));
