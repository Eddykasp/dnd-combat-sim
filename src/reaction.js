const Buff = require('./buff');

module.exports = {
  Reaction: function(triggerFunction){
    this.triggerFunction = triggerFunction;
    this.trigger = function(self, atkRoll){
      return this.triggerFunction(self, atkRoll);
    };
  },
  reactions: {
    parry: function(self, atkRoll){
      if (atkRoll - self.stats.ac() >= 0 && atkRoll - self.stats.ac() < 2){
        self.addBuff(new Buff('parry', 0, {ac:2}));
        return true;
      }
      return false;
    }
  }
};
