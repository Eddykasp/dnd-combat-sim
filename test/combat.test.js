const Combat = require('../combat');
const Party = require('../party');
const Combatant = require('../combatant');
const test = require('tape');
const _ = require('underscore');

const hole = function(string){};

test('Initialise new combat', t => {

  let c = new Combat();
  let f1 = new Combatant('dwarf', 10, 12, 0, 3, 6, 3, 1);
  let f2 = new Combatant('elf', 15, 12, 5, 3, 6, 3, 1);

  let o1 = new Combatant('goblin1', 11, 12, 2, 3, 6, 3, 1);
  let o2 = new Combatant('goblin2', 9, 12, 4, 3, 6, 3, 1);

  let p1 = new Party();
  p1.addMember(f1);
  p1.addMember(f2);

  let p2 = new Party();
  p2.addMember(o1);
  p2.addMember(o2);

  c.addParty(p1, 'players');
  c.addParty(p2, 'goblins');

  c.initiateCombat(hole);
  let resultOrder = c.turnList.map(a => a.roll);
  let sorted = _.every(resultOrder, function(value, index, array){
    return index === 0 || array[index-1] >= value;
  });
  t.true(sorted, 'Initiative turn order descending');
  t.end();
});

test('Run fight', t => {
  let c = new Combat();
  let ogre = new Combatant('ogre', 59, 16, 0, 6, 10, 2, 4);
  let owlbear = new Combatant('owlbear', 59, 13, 3, 7, 9, 3, 10);

  let p1 = new Party();
  p1.addMember(ogre);

  let p2 = new Party();
  p2.addMember(owlbear);

  c.addParty(p1, 'ogre');
  c.addParty(p2, 'owlbear');

  c.runFight(hole);
  t.pass('Fight runs without errors');
  t.end();
});
