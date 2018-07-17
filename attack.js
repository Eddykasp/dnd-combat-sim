module.exports = function(dice_type, dice_number){
  this.dice_type = dice_type;
  this.dice_number = dice_number;
  this.damageRoll = function(dmg_bonus){
    let sum = 0;
    for(let i = 0; i < this.dice_number; i++){
      sum += dice(this.dice_type, 0);
    }
    return sum + dmg_bonus;
  };
}
