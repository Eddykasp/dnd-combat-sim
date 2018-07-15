module.exports = function(id){
  this.id = id;
  this.members = [];
  this.addMember = function(combatant){
    this.members.push(combatant);
  };
}
