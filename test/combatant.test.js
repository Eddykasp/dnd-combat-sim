const test = require('tape');
const Combatant = require('../combatant.js')

test('Test combatant constructor', t => {
  t.plan(7);
  c = new Combatant(10, 2, 2, 3, 6, 1, 1);
  t.equal(c.hp, 10, 'hp');
  t.equal(c.ac, 2, 'ac');
  t.equal(c.initiative, 2, 'initiative');
  t.equal(c.atk, 3, 'atk');
  t.equal(c.dmg, 6, 'dmg');
  t.equal(c.dmg_dice, 1, 'dmg_dice');
  t.equal(c.dmg_bonus, 1, 'dmg_bonus');
});
