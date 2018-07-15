const Combat = require('../combat');
const Party = require('../party');
const Combatant = require('../combatant');

c = new Combat();
f1 = new Combatant('dwarf', 10, 12, 0, 3, 6, 1, 1);
f2 = new Combatant('elf', 15, 12, 5, 3, 6, 1, 1);

o1 = new Combatant('goblin1', 11, 12, 2, 3, 6, 1, 1);
o2 = new Combatant('goblin2', 9, 12, 4, 3, 6, 1, 1);

p1 = new Party();
p1.addMember(f1);
p1.addMember(f2);

p2 = new Party();
p2.addMember(o1);
p2.addMember(o2);

c.addParty(p1, 'players');
c.addParty(p2, 'goblins');

c.initiateCombat();

console.log('Turn order:');
c.turnList.forEach(function(member){
  console.log(member.combatant.id);
});
console.log('');

c.runRound();
