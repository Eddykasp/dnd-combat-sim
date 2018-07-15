module.exports = function(){
  this.members = [];
  this.combatStrategies = {
    lowest_hp: function(combatantA, combatantB){
      return combatantA.hp - combatantB.hp;
    },
    highest_hp: function(combatantA, combatantB){
      return combatantB.hp - combatantA.hp;
    }
  };
  this.combatStrategy = this.combatStrategies.lowest_hp;
  this.addMember = function(combatant){
    this.members.push(combatant);
  };
  this.selectTarget = function(opponents){
    opponents.sort(this.combatStrategy);
    return opponents[0];
  };
}
