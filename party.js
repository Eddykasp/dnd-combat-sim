module.exports = function(){
  this.members = [];
  this.combatStrategies = {
    lowest_hp: function(combatantA, combatantB){
      return combatantA.hp - combatantB.hp;
    },
    highest_hp: function(combatantA, combatantB){
      return combatantB.hp - combatantA.hp;
    },
    highest_dmg: function(combatantA, combatantB){
      let dmgA = 0;
      combatantA.attacks.forEach(function(element) {
        let dmg = element.dice_type * element.dice_number + element.dmg_bonus;
        dmgA += dmg;
      });

      let dmgB = 0;
      combatantB.attacks.forEach(function(element) {
        let dmg = element.dice_type * element.dice_number + element.dmg_bonus;
        dmgB += dmg;
      });

      return dmgB - dmgA;
    }
  };
  this.combatStrategy = this.combatStrategies.lowest_hp;
  this.addMember = function(combatant){
    this.members.push(combatant);
  };
  this.selectTarget = function(opponents){
    opponents.sort(this.combatStrategy);
    let target = opponents[0]
    return target;
  };
}
