[![npm version](https://badge.fury.io/js/dnd-combat-simulator.svg)](https://badge.fury.io/js/dnd-combat-simulator)

# dnd-combat-simulator
This package provides an API to simulate simple DnD combat encounters and determine win ratios for the participating parties.

## API
The API provides the following interfaces:
```
const dnd = require('dnd-combat-simulator');

let roll = dnd.Dice(dice_type, modifier);
let combatant = new dnd.Combatant(id, hp, ac, initiative, attack bonus, damage, dmg_dice, dmg_bonus);
let party = new dnd.Party();
let combat = new dnd.Combat();
```

### Dice
This is a dice rolling utility function, which takes two parameters:
- dice_type (number): The number of sides on the dice
- modifier (number): The modifier is added to the result of the throw

In order to simulate a rolling a d8+2 we call the function as follows:
```
let roll = dnd.Dice(8, 2);
```

### Combatant
This is a constructor for creating combatant objects. It takes eight parameters:
- id (string): a string identifier for the combatant, used for logging, does not need to be unique
- hp (number): starting hit points
- ac (number): armour class
- initiative (number): bonus to the initiative roll
- attack bonus (number): bonus to the attack roll
- damage (number): type of dice to roll for damage
- dmg_dice (number): the number of dice to roll for damage
- dmg_bonus (number): the bonus to add to the damage roll

#### Methods
##### rollInitiative() : number
Rolls for initiative and returns the result.
##### attackRoll() : number
Rolls an attack roll and returns the result.
##### damageRoll() : number
Rolls for damage and returns the amount of damage dealt.
##### isHit(attackRoll) : boolean
Checks whether the passed in attack roll hits or not.
##### takeDamage(damageRoll) : undefined
Deals the damage passed in to the combatant.
##### isDead() : boolean
Checks whether the combatant is dead or not.
##### reset() : undefined
Resets the combatant to the pre-combat state.


### Party
The party object serves to group multiple combatants together, they will fight together and follow a common party strategy. The members of a party can be accessed through ```party.members```.

#### Methods
##### addMember(combatant) : undefined
Adds a new combatant to the party, combatants are not required to be unique.
##### selectTarget(opponents) : combatant
According to ```party.combatStrategy``` a target is selected from the list of combatants. Any function that is a valid compare method taking two combatant objects can be used as a combat strategy. The party object has several pre-built available in ```party.combatStrategies```.


### Combat
The combat object is the core of the fight simulation.

#### Methods
##### addParty(party, id) : undefined
Adds a party with a string identifier to the combat. All parties are accessible in ```combat.parties```.
##### initiateCombat(logger) : undefined
Rolls initiative for all combatants and sorts them into list accessible in ```combat.turnList```. The logger parameter must be a function that takes a string, a typical candidate would be ```console.log```.
##### runRound(logger) : undefined
Goes through all alive combatants and lets them make attacks. The logger parameter must be a function that takes a string, a typical candidate would be ```console.log```.
##### runFight(logger) : list
Runs a whole fight and returns a list of the surviving combatants. The logger parameter must be a function that takes a string, a typical candidate would be ```console.log```.
##### isFightOnGoing() : boolean
Checks whether the fight is still ongoing by checking whether there are still valid opponents left.
##### survivors() : list
Returns all survivors after a fight. The same as the output of ```combat.runFight(logger)```. Could also be used in between rounds.
##### reset() : undefined
Resets to the pre-combat state and allows the fight to be simulated from the beginning.

## Example Usage
- [Simulating a single round of combat](https://github.com/Eddykasp/dnd-combat-sim/blob/master/test/combat_example_round.js)
- [Simulating an entire fight](https://github.com/Eddykasp/dnd-combat-sim/blob/master/test/combat_example_fight.js)
- [Simulating a fight between three parties 100 times to calculate win ratios](https://github.com/Eddykasp/dnd-combat-sim/blob/master/test/multi_combat_simulation_example.js)
- [Simulating a duel 10000 times to calculate win ratios](https://github.com/Eddykasp/dnd-combat-sim/blob/master/test/duel_example.js)
