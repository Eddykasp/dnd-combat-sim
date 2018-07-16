const dice = require('./dice_roller')

/**
 * Constructs a combatant object.
 *
 * @constructor
 *
 * @param {string} id
 *   Identifier for log prints.
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
module.exports = function(id, hp, ac, initiative, atk, dmg, dmg_dice, dmg_bonus){
  this.id = id;
  this.hp = hp;
  this.max_hp = hp;
  this.ac = ac;
  this.initiative = initiative;
  this.atk = atk;
  this.dmg = dmg;
  this.dmg_dice = dmg_dice;
  this.dmg_bonus = dmg_bonus;
  this.rollInitiative = function(){
    return dice(20, this.initiative);
  };
  this.attackRoll = function(){
    return dice(20, atk);
  };
  this.damageRoll = function(){
    let sum = 0;
    for(let i = 0; i < this.dmg_dice; i++){
      sum += dice(this.dmg, 0);
    }
    return sum + this.dmg_bonus;
  };
  this.isHit = function(attackRoll){
    if(attackRoll >= this.ac){
      return true;
    }
  };
  this.takeDamage = function(damageRoll){
    this.hp -= damageRoll;
    if (this.hp < 0){
      this.hp = 0;
    }
  };
  this.isDead = function(){
    if (this.hp <= 0) {
      return true;
    } else {
      return false;
    }
  };
  this.reset = function(){
    this.hp = this.max_hp;
  };
};
