const _ = require('underscore');

module.exports = function(){

  this.parties = {};
  this.addParty = function(party, id){
    this.parties[id] = party;
  };
  this.turnList = [];
  this.initiateCombat = function(logger){
    let self = this;
    for(let party in self.parties){
      self.parties[party].members.forEach(function(combatant){
        self.turnList.push({
          party_id: party,
          combatant: combatant,
          roll: combatant.rollInitiative()
        });
      });
    }
    self.turnList.sort(function(a, b) {
      return (a.roll < b.roll) ?  1 : ((b.roll < a.roll) ? -1 : 0);
    });
    logger('Turn Order:');
    self.turnList.forEach(function(member){
      logger(member.combatant.id);
    });
    logger('\n');
  };
  this.runRound = function(logger){
    let self = this;
    self.turnList.forEach(function(current_combatant){
      let combatant = current_combatant.combatant;
      let party_id = current_combatant.party_id;
      if (!combatant.isDead()){
        let opponentParties = [];
        for (let p_id in self.parties){
          if (party_id != p_id){
            opponentParties.push(self.parties[p_id]);
          }
        }
        let opponents = [];
        opponentParties.forEach(function(party){
          party.members.forEach(function(member){
            if (!member.isDead()){
              opponents.push(member);
            }
          });
        });
        let target = self.parties[party_id].selectTarget(opponents);
        let atkRoll = combatant.attackRoll();
        if (target.isHit(atkRoll)){
          let damage = combatant.damageRoll();
          target.takeDamage(damage);
          logger(combatant.id + ' hit ' + target.id + ' and dealt ' + damage + '.');
        } else {
          logger(combatant.id + ' missed ' + target.id + '.');
        }
      }
    });
  };
  this.runFight = function(){

  };
}
