
const { ALL_MPS } = require('./src/data/mps');
const izmir = ALL_MPS.filter(m => m.province === 'İzmir');
const samsun = ALL_MPS.filter(m => m.province === 'Samsun');
console.log('Current İzmir count in ALL_MPS:', izmir.length);
izmir.forEach(m => console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.partyId));
console.log('Current Samsun count in ALL_MPS:', samsun.length);
samsun.forEach(m => console.log('  ', m.id.padEnd(25), m.fullName.padEnd(25), m.partyId));
