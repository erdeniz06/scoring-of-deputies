
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

// Print all provinces in ALL_MPS with their counts
const provCounts = {};
ALL_MPS.forEach(m => {
  provCounts[m.province] = (provCounts[m.province] || 0) + 1;
});

// Compare with tbmm keys
for (const [k, v] of Object.entries(provCounts)) {
  // find matching city in tbmm
  const matchingKey = Object.keys(tbmm).find(tk => tk.toLocaleLowerCase('tr') === k.toLocaleLowerCase('tr'));
  if (matchingKey) {
    const exp = tbmm[matchingKey].length;
    if (v !== exp) {
      console.log(k + ' (matched ' + matchingKey + '): current=' + v + ', expected=' + exp + ' (diff=' + (v - exp) + ')');
    }
  } else {
    console.log('UNMATCHED PROVINCE:', k, v);
  }
}
