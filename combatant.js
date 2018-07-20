const dice = require('./dice_roller');
const Attack = require('./attack');

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
  this.attacks = [new Attack(dmg, dmg_dice, dmg_bonus)];
  this.buffs = [];
  this.addAttack = function(attack){
    this.attacks.push(attack);
  };
  this.addBuff = function(buff){
    this.buffs.push(buff);
  };
  this.checkBuffs = function(){
    this.buffs = this.buffs.filter(function(buff){
      return !!buff.time;
    });
  };
  this.tickBuffs = function(){
    this.buffs.forEach(function(buff){
      buff.time -= 1;
    });
  };
  this.stats = {
    hp: function(){return this.parent.hp;},
    ac: function(){return sumBuffs(this.parent, 'ac');},
    initiative: function(){return sumBuffs(this.parent, 'initiative');},
    atk: function(){return sumBuffs(this.parent, 'atk');}
  };
  this.rollInitiative = function(){
    return dice(20, this.stats.initiative());
  };
  this.attackRoll = function(){
    return dice(20, this.stats.atk());
  };
  this.isHit = function(attackRoll){
    if(attackRoll >= this.stats.ac()){
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
  this.init = function(){
    this.stats.parent = this;
    delete this.init;
  };
  this.init();
};

function sumBuffs(self, stat){
  let total = self[stat];
  self.buffs.forEach(function(buff){
    if (buff.bonus[stat]){
      total += buff.bonus[stat];
    }
  });
  return total;
}
