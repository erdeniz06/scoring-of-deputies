
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

const tbmmIstNames = new Set(tbmm['İSTANBUL'].map(x => x.name.toLowerCase().replace(/[^a-zçğıöşü]/g, '')));

const istMps = ALL_MPS.filter(m => m.province === 'İstanbul');

console.log('Total Istanbul in ALL_MPS:', istMps.length);

const extraIst = [];
istMps.forEach(m => {
  const cleanName = m.fullName.toLowerCase().replace(/dr\.|prof\.|av\.|doç\./g, '').replace(/[^a-zçğıöşü]/g, '');
  // check if cleanName or partial matches any in tbmmIstNames
  let match = false;
  for (const tn of tbmmIstNames) {
    if (tn.includes(cleanName) || cleanName.includes(tn)) {
      match = true;
      break;
    }
  }
  if (!match) {
    extraIst.push(m);
  }
});

console.log('Extra MPs in Istanbul (' + extraIst.length + '):');
extraIst.forEach(m => {
  console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.partyId);
});
