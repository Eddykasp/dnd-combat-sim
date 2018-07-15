module.exports = function(){
  this.members = [];
  this.addMember = function(combatant){
    this.members.push(combatant);
  };
}
