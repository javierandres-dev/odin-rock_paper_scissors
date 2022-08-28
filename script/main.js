'use strict';
let exit = false;
const options = ['rock', 'paper', 'scissors'];

const getPlayerChoice = () => {
  return prompt('Type your choice: "rock, paper or scissors"');
};

const getComputerChoice = () => {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
};

const playRound = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) {
    return [0, 0, 'Tie.'];
  } else {
    if (playerSelection === 'paper' && computerSelection === 'rock')
      return [1, 0, 'You Win! Paper beats Rock'];
    if (playerSelection === 'rock' && computerSelection === 'paper')
      return [0, 1, 'You Lose! Paper beats Rock'];
    if (playerSelection === 'scissors' && computerSelection === 'paper')
      return [1, 0, 'You Win! Scissors beats Paper'];
    if (playerSelection === 'paper' && computerSelection === 'scissors')
      return [0, 1, 'You Lose! Scissors beats Paper'];
    if (playerSelection === 'rock' && computerSelection === 'scissors')
      return [1, 0, 'You Win! Rock beats Scissors'];
    if (playerSelection === 'scissors' && computerSelection === 'rock')
      return [0, 1, 'You Lose! Rock beats Scissors'];
  }
};

const game = () => {
  let gameOver = false,
    playerScore = 0,
    computerScore = 0,
    limit = 3,
    draws = 0;
  for (let i = 0; i < limit; i++) {
    if (gameOver) break;
    const playerSelection = getPlayerChoice();
    if (
      playerSelection === '' ||
      playerSelection === null ||
      (playerSelection !== 'rock' &&
        playerSelection !== 'paper' &&
        playerSelection !== 'scissors')
    ) {
      alert(`
        You don't type a valid option.
        GAME OVER
      `);
      gameOver = true;
    } else {
      const computerSelection = getComputerChoice();
      const getResultRound = playRound(playerSelection, computerSelection);
      if (getResultRound[0] === getResultRound[1]) draws += 1;
      playerScore += getResultRound[0];
      computerScore += getResultRound[1];
      alert(`
        Round: ${i + 1} of ${limit}
        Your choice: ${playerSelection}
        Computer choice: ${computerSelection}
        In this round: ${getResultRound[2]}
      `);
    }
  }
  if (!gameOver) {
    let you = null;
    if (playerScore > computerScore) you = 'win';
    else if (playerScore < computerScore) you = 'lose';
    else you = 'tie';
    alert(`
      SUMMARY
      --------
      You ${you}!
      --------
      Rounds: ${limit}
      Draws: ${draws}
      Player score: ${playerScore}
      Computer score: ${computerScore}
    `);
  }
};

do {
  game();
  exit = confirm(`
    Do you want exit?
    * Press "OK" to exit
    * Press "Cancel" to play again.
  `);
} while (!exit);
