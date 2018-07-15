module.exports = function(){

  this.parties = [];
  this.addParty = function(party){
    this.parties.push(party);
  };
  this.turnList = [];
  this.initiateCombat = function(){
    let self = this;
    this.parties.forEach(function(party){
      party.members.forEach(function(combatant){
        self.turnList.push({
          party_id: party.id,
          combatant: combatant,
          roll: combatant.rollInitiative()
        });
      });
    });
    self.turnList.sort(function(a, b) {
      return (a.roll < b.roll) ?  1 : ((b.roll < a.roll) ? -1 : 0);
    });
  }
}
