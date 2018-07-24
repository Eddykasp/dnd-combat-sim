// This guide shows typical use cases and how to simulate DnD combat encounters using this library.

const dnd = require('dnd-combat-simulator');

// First we create a new combat object.
let combat = new dnd.Combat();

let ogres = new dnd.Party();
ogres.addMember(new dnd.Combatant('ogre1', 59, 16, 0, 6, 10, 2, 4));
ogres.addMember(new dnd.Combatant('ogre2', 59, 16, 0, 6, 10, 2, 4));
ogres.combatStrategy = ogres.combatStrategies.highest_hp;
combat.addParty(ogres, 'ogres');

let owlbears = new dnd.Party();
let owlbear1 = new dnd.Combatant('owlbear1', 59, 13, 3, 7, 10, 1, 5);
owlbear1.addAttack(new dnd.Attack(8, 2, 5));
let owlbear2 = new dnd.Combatant('owlbear2', 59, 13, 3, 7, 10, 1, 5);
owlbear2.addAttack(new dnd.Attack(8, 2, 5));
let owlbear3 = new dnd.Combatant('owlbear3', 59, 13, 3, 7, 10, 1, 5);
owlbear3.addAttack(new dnd.Attack(8, 2, 5));
owlbears.addMember(owlbear1);
owlbears.addMember(owlbear2);
owlbears.addMember(owlbear3);
combat.addParty(owlbears, 'owlbears');

let knights = new dnd.Party();
let knight1 = new dnd.Combatant('knight1', 52, 18, 0, 5, 6, 2, 3);
knight1.addAttack(new dnd.Attack(6, 2, 3));
knight1.addReaction(new dnd.reaction.Reaction(dnd.reaction.reactions.parry));
let knight2 = new dnd.Combatant('knight2', 52, 18, 0, 5, 6, 2, 3);
knight2.addAttack(new dnd.Attack(6, 2, 3));
knight2.addReaction(new dnd.reaction.Reaction(dnd.reaction.reactions.parry));
let knight3 = new dnd.Combatant('knight3', 52, 18, 0, 5, 6, 2, 3);
knight3.addAttack(new dnd.Attack(6, 2, 3));
knight3.addReaction(new dnd.reaction.Reaction(dnd.reaction.reactions.parry));
knights.addMember(knight1);
knights.addMember(knight2);
knights.addMember(knight3);
knights.combatStrategy = knights.combatStrategies.highest_dmg;
combat.addParty(knights, 'knights');

let wereboars = new dnd.Party();
let wereboar1 = new dnd.Combatant('wereboar1', 78, 11, 0, 5, 6, 2, 3);
wereboar1.addAttack(new dnd.Attack(6, 2, 3));
wereboars.addMember(wereboar1);
combat.addParty(wereboars, 'wereboars');

let winners = [];
for (let i = 0; i < 100; i++){
  winners.push(combat.runFight(console.log));
  combat.reset();
}

let parties = {};
for (let party_id in combat.parties){
  parties[party_id] = 0;
}

let count = 1;
winners.forEach(function(winner_party){
  count++;
  parties[winner_party[0].party_id] += 1;
});

console.log('\nWin Ratios');
for (let p in parties){
  console.log(p + ': ' + parties[p]/1 + '%');
}
