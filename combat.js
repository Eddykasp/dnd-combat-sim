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
    let n = 1;
    self.turnList.forEach(function(member){
      logger(n + '. ' + member.combatant.id);
      n += 1;
    });
    logger('\n');
  };
  this.runRound = function(logger){
    logger('Next round:');
    let self = this;
    self.turnList.forEach(function(current_combatant){
      let combatant = current_combatant.combatant;
      let party_id = current_combatant.party_id;
      combatant.tickBuffs();
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
        combatant.attacks.forEach(function(attack){
          let target = self.parties[party_id].selectTarget(opponents);
          if (typeof target == 'undefined'){
            return;
          }
          let atkRoll = combatant.attackRoll();
          if (target.isHit(atkRoll)){
            let damage = attack.damageRoll();
            target.takeDamage(damage);
            logger(combatant.id + ' hit ' + target.id + ' and dealt ' + damage + ' damage.');
          } else {
            logger(combatant.id + ' missed ' + target.id + '.');
          }
        });
      }
      combatant.checkBuffs();
    });
  };
  this.runFight = function(logger){

    this.initiateCombat(logger);
    while(this.isFightOnGoing()){
      this.runRound(logger);
    }
    return this.survivors();

  };
  this.isFightOnGoing = function(){
    let alive = {};
    for ( let c in this.turnList ) {
      if (!this.turnList[c].combatant.isDead()){
        alive[this.turnList[c].party_id] = 1;
        if (Object.keys(alive).length > 1){
          return true;
        }
      }
    }
    return false;
  };
  this.survivors = function(){
    let alive = [];
    for ( let c in this.turnList ) {
      if (!this.turnList[c].combatant.isDead()){
        alive.push(this.turnList[c]);
      }
    }
    return alive;
  };
  this.reset = function(){
    this.turnList = [];
    let self = this;
    for (let party in self.parties){
      self.parties[party].members.forEach(function(combatant){
        combatant.reset();
      });
    }
  };
};
