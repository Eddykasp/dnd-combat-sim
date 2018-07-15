const dice = require('./dice_roller')

/**
 * Constructs a combatant object.
 *
 * @constructor
 *
 * @param {number} hp
 *   Starting hit points for the combatant.
 * @param {number} ac
 *   Armour class of the combatant.
 * @param {number} initiative
 *   Initiative bonus for the combatant.
 * @param {number} atk
 *   Attack bonus for the combatants attack rolls.
 * @param {number} dmg
 *   Type of dice used for damage roll.
 * @param {number} dmg_dice
 *   Number of dice used for damage roll.
 * @param {number} dmg_bonus
 *   Damage bonus from ability modifier.
 */
module.exports = function(hp, ac, initiative, atk, dmg, dmg_dice, dmg_bonus){
  this.hp = hp;
  this.ac = ac;
  this.initiative = initiative;
  this.atk = atk;
  this.dmg = dmg;
  this.dmg_dice = dmg_dice;
  this.dmg_bonus = dmg_bonus;
  this.rollInitiative = function(){
    return dice(20, this.initiative)
  };
};
