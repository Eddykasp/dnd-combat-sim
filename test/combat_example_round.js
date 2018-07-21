const Combat = require('../src/combat');
const Party = require('../src/party');
const Combatant = require('../src/combatant');

let c = new Combat();
let f1 = new Combatant('dwarf', 10, 12, 0, 3, 6, 1, 1);
let f2 = new Combatant('elf', 15, 12, 5, 3, 6, 1, 1);

let o1 = new Combatant('goblin1', 11, 12, 2, 3, 6, 1, 1);
let o2 = new Combatant('goblin2', 9, 12, 4, 3, 6, 1, 1);

let p1 = new Party();
p1.addMember(f1);
p1.addMember(f2);

let p2 = new Party();
p2.addMember(o1);
p2.addMember(o2);

c.addParty(p1, 'players');
c.addParty(p2, 'goblins');

c.initiateCombat(console.log);

c.runRound(console.log);
