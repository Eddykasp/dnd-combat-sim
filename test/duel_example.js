const Combat = require('../combat');
const Party = require('../party');
const Combatant = require('../combatant');

let c = new Combat();
let ogre = new Combatant('ogre', 59, 16, 0, 6, 10, 2, 4);
let owlbear = new Combatant('owlbear', 59, 13, 3, 7, 9, 3, 10);

let p1 = new Party();
p1.addMember(ogre);

let p2 = new Party();
p2.addMember(owlbear);

c.addParty(p1, 'ogre');
c.addParty(p2, 'owlbear');

let winners = [];

for (let i = 0; i < 10000; i++){
  winners.push(c.runFight(console.log));
  c.reset();
}

let parties = {};
for (let party_id in c.parties){
  parties[party_id] = 0;
}

let count = 1;
// console.log('\nSurvivors:');
winners.forEach(function(winner_party){
  // console.log('Fight ' + count + ': ' + winner_party[0].party_id);
  count++;
  parties[winner_party[0].party_id] += 1;
});

console.log('\nWin Ratios');
for (let p in parties){
  console.log(p + ': ' + parties[p]/100 + '%');
}
