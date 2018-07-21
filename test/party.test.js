const Party = require('../src/party');
const Combatant = require('../src/combatant');
const Attack = require('../src/attack');
const test = require('tape');

test('Test highest hp combat strategy', t => {
  let opponents = [];
  let expected = new Combatant('elf', 15, 12, 5, 3, 6, 1, 1);
  opponents.push(new Combatant('goblin1', 11, 12, 2, 3, 6, 1, 1));
  opponents.push(new Combatant('goblin2', 9, 12, 4, 3, 6, 1, 1));
  opponents.push(new Combatant('dwarf', 10, 12, 0, 3, 6, 1, 1));
  opponents.push(expected);

  let p = new Party();
  p.combatStrategy = p.combatStrategies.highest_hp;
  let target = p.selectTarget(opponents);
  t.plan(1);
  t.equal(target, expected, 'Elf has highest hp (15)');
});

test('Test lowest hp combat strategy', t => {
  let opponents = [];
  let expected = new Combatant('goblin2', 9, 12, 4, 3, 6, 1, 1);
  opponents.push(new Combatant('goblin1', 11, 12, 2, 3, 6, 1, 1));
  opponents.push(expected);
  opponents.push(new Combatant('dwarf', 10, 12, 0, 3, 6, 1, 1));
  opponents.push(new Combatant('elf', 15, 12, 5, 3, 6, 1, 1));

  let p = new Party();
  p.combatStrategy = p.combatStrategies.lowest_hp;
  let target = p.selectTarget(opponents);
  t.plan(1);
  t.equal(target, expected, 'Goblin2 has lowest hp (9)');
});

test('Test highest dmg combat strategy', t => {
  let opponents = [];
  let expected = new Combatant('goblin1', 11, 12, 2, 3, 6, 3, 1);
  opponents.push(expected);
  opponents.push(new Combatant('goblin2', 9, 12, 4, 3, 7, 2, 1));
  opponents.push(new Combatant('dwarf', 10, 12, 0, 3, 8, 1, 5));
  opponents.push(new Combatant('elf', 15, 12, 5, 3, 10, 1, 4));

  let p = new Party();
  p.combatStrategy = p.combatStrategies.highest_dmg;
  let target = p.selectTarget(opponents);
  t.plan(2);
  t.equal(target, expected, 'Goblin1 has highest potential damage output (3d6 + 1)');

  let owlbear = new Combatant('owlbear', 59, 13, 3, 7, 10, 1, 5);
  owlbear.addAttack(new Attack(8, 2, 5));

  opponents.push(owlbear);
  target = p.selectTarget(opponents);
  t.equal(target, owlbear, 'Owlbear has highest potential damage output (1d10 + 5, 2d8 + 5)');
});
