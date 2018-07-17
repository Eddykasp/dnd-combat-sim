const test = require('tape');
const Combatant = require('../combatant.js')

test('Combatant constructor', t => {
  t.plan(6);
  let c = new Combatant('test_combatant', 10, 2, 2, 3, 6, 1, 1);
  t.equal(c.id, 'test_combatant', 'id');
  t.equal(c.hp, 10, 'hp');
  t.equal(c.ac, 2, 'ac');
  t.equal(c.initiative, 2, 'initiative');
  t.equal(c.atk, 3, 'atk');
  t.equal(c.dmg_bonus, 1, 'dmg_bonus');
});

test('Combatant initiative roll', t => {
  let c = new Combatant('test_combatant', 10, 2, 2, 3, 6, 1, 1);
  let i = c.rollInitiative();
  if(i <= 2 || i > 22){
    t.fail('Initiative roll out of valid range');
  } else {
    t.pass('Initiative roll within valid range');
  }
  t.end();
});

test('Combatant attack roll', t => {
  let c = new Combatant('test_combatant', 10, 2, 2, 3, 6, 1, 1);
  let a = c.attackRoll();
  if(a <= 3 || a > 23){
    t.fail('Attack roll out of valid range');
  } else {
    t.pass('Attack roll within valid range');
  }
  t.end();
});

test('Combatant is hit', t => {
  t.plan(3);
  let c = new Combatant('test_combatant', 10, 12, 2, 3, 6, 3, 1);
  let hit = c.isHit(10);
  t.false(hit, 'atk=10, AC=12');
  hit = c.isHit(12);
  t.true(hit, 'atk=12, AC=12');
  hit = c.isHit(14);
  t.true(hit, 'atk=14, AC=12');
});

test('Combatant is dealt damage', t => {
  t.plan(2);
  let c = new Combatant('test_combatant', 10, 12, 2, 3, 6, 3, 1);
  c.takeDamage(5);
  t.equal(c.hp, 5, 'hp: 10 -> 5 (5 damage)');
  c.takeDamage(6);
  t.equal(c.hp, 0, 'hp: 5 ->  0 (6 damage)');
});

test('Combatant is dead/unconscious', t => {
  t.plan(2);
  let c = new Combatant('test_combatant', 10, 12, 2, 3, 6, 3, 1);
  t.false(c.isDead(), 'hp: 10 (alive)');
  c.takeDamage(10);
  t.true(c.isDead(), 'hp: 0 (dead)');
});
