const parser = require('../src/parser');
const test = require('tape');

test('Load monster with single attack', t => {
  t.plan(8);
  let csvline = 'acolyte,,any ,humanoid (any race),medium,,10,0,10,9,9,10,-1,2,8,10,10,10,10,14,11,"[[""club"", 2, 0, 4]]",0.25,50,0,,,,,,,0,0,0,0,0,2,0';
  let c = parser.Combatant(csvline);
  t.equal(c.id, 'acolyte', 'id');
  t.equal(c.hp, 9, 'hp');
  t.equal(c.ac, 10, 'ac');
  t.equal(c.initiative, 0, 'initiative');
  t.equal(c.atk, 2, 'atk');

  t.equal(c.attacks[0].dice_type, 4, 'dmg dice type');
  t.equal(c.attacks[0].dice_number, 1, 'dmg dice number');
  t.equal(c.attacks[0].dmg_bonus, 0, 'dmg bonus');
});

test('Load monster with multiattack', t => {
  t.plan(14);
  let csvline = 'aboleth,,lawful evil ,aberration,large,natural armor,17,7,17,135,135,108,27,18,10,21,9,15,18,15,18,"[[""tentacle"", 9, 5, 6, 6], [""tentacle"", 9, 5, 6, 6], [""tentacle"", 9, 5, 6, 6]]",10,5900,0,,,,,NO ENSLAVE,,0,5,0,0,4,2,4';
  let c = parser.Combatant(csvline);
  t.equal(c.id, 'aboleth', 'id');
  t.equal(c.hp, 135, 'hp');
  t.equal(c.ac, 17, 'ac');
  t.equal(c.initiative, 0, 'initiative');
  t.equal(c.atk, 9, 'atk');

  t.equal(c.attacks[0].dice_type, 6, 'dmg dice type');
  t.equal(c.attacks[0].dice_number, 2, 'dmg dice number');
  t.equal(c.attacks[0].dmg_bonus, 5, 'dmg bonus');

  t.equal(c.attacks[1].dice_type, 6, 'dmg dice type');
  t.equal(c.attacks[1].dice_number, 2, 'dmg dice number');
  t.equal(c.attacks[1].dmg_bonus, 5, 'dmg bonus');

  t.equal(c.attacks[2].dice_type, 6, 'dmg dice type');
  t.equal(c.attacks[2].dice_number, 2, 'dmg dice number');
  t.equal(c.attacks[2].dmg_bonus, 5, 'dmg bonus');
});
