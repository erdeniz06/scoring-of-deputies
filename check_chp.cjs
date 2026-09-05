
const { EXPLICIT_CHP_MP_IDS, ALL_MPS } = require('./src/data/mps');
console.log('EXPLICIT_CHP_MP_IDS size:', EXPLICIT_CHP_MP_IDS.size);
const inAllMps = ALL_MPS.filter(m => EXPLICIT_CHP_MP_IDS.has(m.id));
console.log('In ALL_MPS with EXPLICIT_CHP_MP_IDS:', inAllMps.length);
const chpInAllMps = ALL_MPS.filter(m => m.partyId === 'chp');
console.log('Total partyId === chp in ALL_MPS:', chpInAllMps.length);
const missingFromAllMps = Array.from(EXPLICIT_CHP_MP_IDS).filter(id => !ALL_MPS.some(m => m.id === id));
console.log('Missing from ALL_MPS:', missingFromAllMps);
