'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score01 = document.querySelector('#score--0');
const score02 = document.querySelector('#score--1');

const cscore01 = document.querySelector('#current--0');
const cscore02 = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnrollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing = true;
let p1 = true;
let current = 0;
let scorep1 = 0;
let scorep2 = 0;

//Initial Condition
const init = function () {
  score01.textContent = scorep1;
  score02.textContent = scorep2;
  cscore01.textContent = current;
  cscore02.textContent = current;
  diceImg.classList.add('hidden');
};

init();

const togglePlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const switchPlayer = function () {
  if (p1) {
    p1 = false;
    togglePlayer();
  } else {
    p1 = true;
    togglePlayer();
  }
};

const rollDice = function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;
    if (dice != 1) {
      current += dice;
      if (p1) {
        cscore01.textContent = current;
      } else {
        cscore02.textContent = current;
      }
    }
    if (dice == 1) {
      current = 0;
      if (p1) {
        cscore01.textContent = current;
        switchPlayer();
      } else {
        cscore02.textContent = current;
        switchPlayer();
      }
    }
  }
};

const declareWinner = function () {
  scorep1 > scorep2
    ? player0.classList.add('player--winner')
    : player1.classList.add('player--winner');
  playing = false;
  diceImg.classList.add('hidden');
  //   reset();
};

const saveScore = function () {
  if (playing) {
    if (p1) {
      scorep1 += current;
      switchPlayer();
    } else {
      scorep2 += current;
      switchPlayer();
    }
    if (scorep1 >= 100 || scorep2 >= 100) {
      declareWinner();
    }
    current = 0;
    init();
  }
};

const reset = function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  scorep1 = 0;
  scorep2 = scorep1;
  current = scorep1;
  playing = true;
  init();
};

btnrollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', saveScore);
btnNewGame.addEventListener('click', reset);
