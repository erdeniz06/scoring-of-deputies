
const { ALL_MPS } = require('./src/data/mps');
const found = ALL_MPS.find(m => m.id.includes('ersagun') || m.fullName.toLowerCase().includes('ersagun'));
console.log('Found:', found ? { id: found.id, name: found.fullName, party: found.partyId } : null);
