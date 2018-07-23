module.exports = function(dice_type, modifier, options){
  let roll = 0;
  if (!!options.advantage){
    let roll1 = Math.floor(Math.random() * dice_type + 1);
    let roll2 = Math.floor(Math.random() * dice_type + 1);
    if (options.advantage < 0){
      roll = roll1 < roll2 ? roll1 : roll2;
    }
    if (options.advantage > 0){
      roll = roll1 > roll2 ? roll2 : roll1;
    }
  }
  return roll + modifier;
};
