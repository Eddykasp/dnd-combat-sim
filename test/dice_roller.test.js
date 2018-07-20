const test = require('tape');
const dice = require('../dice_roller');

test('d4 is in range', t => {
  let roll = dice(4, 0);
  if (roll <= 0 || roll > 4) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d6 is in range', t => {
  let roll = dice(6, 0);
  if (roll <= 0 || roll > 6) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d8 is in range', t => {
  let roll = dice(8, 0);
  if (roll <= 0 || roll > 8) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d10 is in range', t => {
  let roll = dice(10, 0);
  if (roll <= 0 || roll > 10) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d12 is in range', t => {
  let roll = dice(12, 0);
  if (roll <= 0 || roll > 12) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d20 is in range', t => {
  let roll = dice(20, 0);
  if (roll <= 0 || roll > 20) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d4+2 is in range', t => {
  let roll = dice(4, 0+2);
  if (roll <= 0+2 || roll > 4+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d6+2 is in range', t => {
  let roll = dice(6, 0+2);
  if (roll <= 0+2 || roll > 6+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d8+2 is in range', t => {
  let roll = dice(8, 0+2);
  if (roll <= 0+2 || roll > 8+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d10+2 is in range', t => {
  let roll = dice(10, 0+2);
  if (roll <= 0+2 || roll > 10+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d12+2 is in range', t => {
  let roll = dice(12, 0+2);
  if (roll <= 0+2 || roll > 12+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});

test('d20+2 is in range', t => {
  let roll = dice(20, 0+2);
  if (roll <= 0+2 || roll > 20+2) {
    t.fail('Dice roll out of expected range');
  } else {
    t.pass('Dice roll within range');
  }
  t.end();
});
