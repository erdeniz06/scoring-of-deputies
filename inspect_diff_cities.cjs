
const { ALL_MPS } = require('./src/data/mps');
const fs = require('fs');
const tbmm = JSON.parse(fs.readFileSync('all_tbmm_by_city.json', 'utf8'));

['HATAY', 'TOKAT', 'KAHRAMANMARAŞ', 'KOCAELİ'].forEach(city => {
  const tbmmList = tbmm[city] || [];
  const curList = ALL_MPS.filter(m => m.province.toLocaleLowerCase('tr') === city.toLocaleLowerCase('tr'));
  console.log('=== ' + city + ' (TBMM: ' + tbmmList.length + ', ALL_MPS: ' + curList.length + ') ===');
  console.log('TBMM:');
  tbmmList.forEach(m => console.log('  ' + m.name + ' (' + m.party + ')'));
  console.log('ALL_MPS:');
  curList.forEach(m => console.log('  ' + m.id + ' -> ' + m.fullName + ' (' + m.partyId + ')'));
});
