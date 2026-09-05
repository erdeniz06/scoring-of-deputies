
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');

const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

// Build canonical map from tbmm
// City -> list of names
const tbmmByCity = {};
for (const [city, list] of Object.entries(tbmm)) {
  tbmmByCity[city.toUpperCase()] = list.map(x => x.name.trim());
}

// Compare city by city between ALL_MPS and tbmm
const mpsByCity = {};
ALL_MPS.forEach(m => {
  const c = m.province.toUpperCase();
  if (!mpsByCity[c]) mpsByCity[c] = [];
  mpsByCity[c].push(m);
});

console.log('CITY SEAT COUNT COMPARISON (ALL_MPS vs Official TBMM 592):');
let totalDiff = 0;
for (const [city, expectedList] of Object.entries(tbmmByCity)) {
  const currentList = mpsByCity[city] || [];
  const expCount = expectedList.length;
  const curCount = currentList.length;
  if (expCount !== curCount) {
    console.log();
    totalDiff += (curCount - expCount);
  }
}
console.log('Total city seat difference:', totalDiff);
