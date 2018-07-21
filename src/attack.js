const dice = require('./dice_roller');

module.exports = function(dice_type, dice_number, dmg_bonus){
  this.dice_type = dice_type;
  this.dice_number = dice_number;
  this.dmg_bonus = dmg_bonus;
  this.damageRoll = function(){
    let sum = 0;
    for(let i = 0; i < this.dice_number; i++){
      sum += dice(this.dice_type, 0);
    }
    return sum + this.dmg_bonus;
  };
};
