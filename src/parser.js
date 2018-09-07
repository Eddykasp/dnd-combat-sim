const Combatant = require('./combatant');
const Attack = require('./attack');

module.exports = {
  // 0 name,1 alt,2 alignment,3 type,4 size,5 armour_name,6 stated_ac,7 armor_bonus,8 ac,9 stated_hp,10 hp,11 expected_hp,12 hp_fudge,13 level,14 hd,15 Str,16 Dex,17 Con,18 Int,19 Wis,20 Cha,21 attack_parameters,22 CR,23 xp,24 regen,25 healing_spells,26 healing_dice,27 healing_bonus,28 sc_ability,29 log,30 proficiency,31 initiative_bonus,32 AB_Str,33 AB_Dex,34 AB_Con,35 AB_Int,36 AB_Wis,37 AB_Cha
  Combatant: function(csvline){
    let csvarray = parse(csvline);
    let csvattacks = parseAttackParameters(csvarray[21]);
    let attacks = [];
    csvattacks.forEach(function(csvattack){
      let attack = new Attack(csvattack[3], csvattack.length - 3, csvattack[2]);
      attacks.push(attack);
    });
    let c = new Combatant(csvarray[0], parseInt(csvarray[10]), parseInt(csvarray[8]), parseInt(csvarray[31]), csvattacks[0][1], attacks[0].dice_type, attacks[0].dice_number, attacks[0].dmg_bonus);
    attacks.splice(0, 1);
    attacks.forEach(function(attack){
      c.addAttack(attack);
    });
    return c;
  }
};

function parseAttackParameters(csvfield){
  // "[[""tentacle"", 9, 5, 6, 6], [""tentacle"", 9, 5, 6, 6], [""tentacle"", 9, 5, 6, 6]]"
  let array = csvfield.slice(1, csvfield.length - 1);
  array = array.replace(/""/g, '"');

  return eval(array);
}

function parse(str) {
  let result = [], item = '', depth = 0;

  function push() { result.push(item); item = ''; }

  for (let i = 0, c; c = str[i], i < str.length; i++) {
    if (!depth && c === ',') push();
    else {
      item += c;
      if (c === '[') depth++;
      if (c === ']') depth--;
    }
  }

  push();
  return result;
}
