const test = require('tape');
const Combatant = require('../src/combatant');
const Buff = require('../src/buff');
const reaction = require('../src/reaction');

test('Combatant constructor', t => {
  t.plan(5);
  let c = new Combatant('test_combatant', 10, 2, 2, 3, 6, 1, 1);
  t.equal(c.id, 'test_combatant', 'id');
  t.equal(c.hp, 10, 'hp');
  t.equal(c.ac, 2, 'ac');
  t.equal(c.initiative, 2, 'initiative');
  t.equal(c.atk, 3, 'atk');
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

test('Combatant buffs', t => {
  t.plan(8);
  let c = new Combatant('test_combatant', 10, 12, 2, 3, 6, 3, 1);
  c.addBuff(new Buff('ac_plus', 1, {ac: 2}));
  c.addBuff(new Buff('initiative_plus', 1, {initiative: 2}));
  c.addBuff(new Buff('atk_plus', 1, {atk: 2}));

  let ac = c.stats.ac();
  t.equal(ac, 14, 'Buffed AC is 14');
  let initiative = c.stats.initiative();
  t.equal(initiative, 4, 'Buffed initiative is 4');
  let atk = c.stats.atk();
  t.equal(atk, 5, 'Buffed attack bonus is 5');

  t.false(c.isHit(13), 'missed hit with active AC buff');
  t.true(c.isHit(14), 'hit with active AC buff');

  c.tickBuffs();
  c.checkBuffs();

  ac = c.stats.ac();
  t.equal(ac, 12, 'Non-Buffed AC is 12');
  initiative = c.stats.initiative();
  t.equal(initiative, 2, 'Non-Buffed initiative is 2');
  atk = c.stats.atk();
  t.equal(atk, 3, 'Non-Buffed attack bonus is 3');

});

test('Combatant reactions', t => {
  t.plan(12);
  let c = new Combatant('test_combatant', 10, 12, 2, 3, 6, 3, 1);
  c.addReaction(new reaction.Reaction(reaction.reactions.parry));

  t.false(c.isHit(12), 'parry triggered (atk 12)');
  t.equal(c.stats.ac(), 14, 'current ac: 12 + 2');
  c.checkBuffs();
  t.true(c.isHit(12), 'parry no longer available');
  t.equal(c.stats.ac(), 12, 'current ac: 12');
  c.checkBuffs();

  c.reacted = false;

  t.false(c.isHit(13), 'parry triggered (atk 13)');
  t.equal(c.stats.ac(), 14, 'current ac: 12 + 2');
  c.checkBuffs();
  t.true(c.isHit(13), 'parry no longer available');
  t.equal(c.stats.ac(), 12, 'current ac: 12');
  c.checkBuffs();

  c.reacted = false;

  t.true(c.isHit(14), 'parry not triggered (14)');
  t.equal(c.stats.ac(), 12, 'current ac: 12');
  c.checkBuffs();
  t.false(c.isHit(13), 'parry triggered (13)');
  t.equal(c.stats.ac(), 14, 'current ac: 12 + 2');
  c.checkBuffs();
});
