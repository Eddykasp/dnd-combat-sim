// This guide shows typical use cases and how to simulate DnD combat encounters using this library. We will construct a fight between several groups of combatants.

//const dnd = require('dnd-combat-simulator');
const dnd = require('../index');

// First we create a new combat object.
let combat = new dnd.Combat();

// Our first group of combatants is a pair of ogres.
let ogres = new dnd.Party();
ogres.addMember(new dnd.Combatant('ogre1', 59, 16, 0, 6, 10, 2, 4));
ogres.addMember(new dnd.Combatant('ogre2', 59, 16, 0, 6, 10, 2, 4));
// The combat strategy of the ogres will be to target the strongest enemy on the battlefield.
ogres.combatStrategy = ogres.combatStrategies.highest_hp;
// Finally we need to add the party to the combat and give it a name.
combat.addParty(ogres, 'ogres');

// The second group are three owlbears.
let owlbears = new dnd.Party();
let owlbear1 = new dnd.Combatant('owlbear1', 59, 13, 3, 7, 10, 1, 5);
// Owlbears have multiple attacks each turn. We will add their second attack here.
owlbear1.addAttack(new dnd.Attack(8, 2, 5));
let owlbear2 = new dnd.Combatant('owlbear2', 59, 13, 3, 7, 10, 1, 5);
owlbear2.addAttack(new dnd.Attack(8, 2, 5));
let owlbear3 = new dnd.Combatant('owlbear3', 59, 13, 3, 7, 10, 1, 5);
owlbear3.addAttack(new dnd.Attack(8, 2, 5));
owlbears.addMember(owlbear1);
owlbears.addMember(owlbear2);
owlbears.addMember(owlbear3);
combat.addParty(owlbears, 'owlbears');

// The third group of fighters are three knights.
let knights = new dnd.Party();
let knight1 = new dnd.Combatant('knight1', 52, 18, 0, 5, 6, 2, 3);
// Knights also have a second attack.
knight1.addAttack(new dnd.Attack(6, 2, 3));
// Knights have a parry reaction, which lets them increase their armour class by two once per round.
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
// Knights aim to strategically remove the most dangerous enemies from the fight first.
knights.combatStrategy = knights.combatStrategies.highest_dmg;
combat.addParty(knights, 'knights');

// There is a single wereboar fighting.
let wereboars = new dnd.Party();
let wereboar1 = new dnd.Combatant('wereboar1', 78, 11, 0, 5, 6, 2, 3);
wereboar1.addAttack(new dnd.Attack(6, 2, 3));
wereboars.addMember(wereboar1);
combat.addParty(wereboars, 'wereboars');

// In the next step we simulate the fight 10000 times and save the winners of each group. After each simulation, we need to reset the state of the combat.
let winners = [];
for (let i = 0; i < 10000; i++){
  winners.push(combat.runFight());
  combat.reset();
}

// After finishing the simulations we calculate the win ratios for each party and print those out.
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
  console.log(p + ': ' + parties[p]/100 + '%');
}
