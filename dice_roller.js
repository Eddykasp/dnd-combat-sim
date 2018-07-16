module.exports = function(dice_type, modifier){
  let roll = Math.floor(Math.random() * dice_type + 1);
  return roll + modifier;
};
