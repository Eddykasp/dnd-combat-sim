const Combat = require('../combat');
const Party = require('../party');
const Combatant = require('../combatant');

let c = new Combat();
let f1 = new Combatant('dwarf', 12, 13, 0, 3, 6, 1, 1);
let f2 = new Combatant('elf', 15, 13, 5, 3, 6, 1, 1);

let o1 = new Combatant('goblin1', 11, 12, 2, 2, 6, 1, 0);
let o2 = new Combatant('goblin2', 9, 12, 2, 2, 6, 1, 0);

let e1 = new Combatant('orc1', 12, 10, 1, 3, 6, 1, 1);
let e2 = new Combatant('orc2', 10, 11, 1, 3, 6, 1, 1);


let p1 = new Party();
p1.addMember(f1);
p1.addMember(f2);

let p2 = new Party();
p2.addMember(o1);
p2.addMember(o2);

let p3 = new Party();
p3.addMember(e1);
p3.addMember(e2);

c.addParty(p1, 'players');
c.addParty(p2, 'goblins');
c.addParty(p3, 'orcs');

let winners = [];

for (let i = 0; i < 100; i++){
  winners.push(c.runFight(console.log));
  c.reset();
}

let parties = {};
for (let party_id in c.parties){
  parties[party_id] = 0;
}

let count = 1;
console.log('\nSurvivors:');
winners.forEach(function(winner_party){
  console.log('Fight ' + count + ': ' + winner_party[0].party_id);
  count++;
  parties[winner_party[0].party_id] += 1;
});

console.log('\nWin Ratios');
for (let p in parties){
  console.log(p + ': ' + parties[p] + '%');
}
