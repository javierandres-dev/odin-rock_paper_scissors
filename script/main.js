'use strict';
const d = document,
  options = ['rock', 'paper', 'scissors'];

let gameOver = false,
  round = 0,
  limit = 3,
  playerScore = 0,
  computerScore = 0,
  draws = 0;

const $notify = d.querySelector('.notify'),
  $btns = d.querySelectorAll('button');

$btns.forEach(($btn) => {
  $btn.addEventListener('click', () => {
    if (!gameOver) playRound($btn.id);
  });
});

const getComputerChoice = () => {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
};

const playRound = (playerSelection) => {
  const computerSelection = getComputerChoice();
  let roundResult = null;
  round++;
  if (playerSelection === computerSelection) {
    draws++;
    roundResult = `⚖️ Tie.`;
  } else {
    if (playerSelection === 'paper' && computerSelection === 'rock') {
      playerScore++;
      roundResult = `You Win! 🤚 Paper beats Rock ✊`;
    }
    if (playerSelection === 'rock' && computerSelection === 'paper') {
      computerScore++;
      roundResult = `You Lose! 🤚 Paper beats Rock ✊`;
    }
    if (playerSelection === 'scissors' && computerSelection === 'paper') {
      playerScore++;
      roundResult = `You Win! ✌️ Scissors beats Paper 🤚`;
    }
    if (playerSelection === 'paper' && computerSelection === 'scissors') {
      computerScore++;
      roundResult = `You Lose! ✌️ Scissors beats Paper 🤚`;
    }
    if (playerSelection === 'rock' && computerSelection === 'scissors') {
      playerScore++;
      roundResult = `You Win! ✊ Rock beats Scissors ✌️`;
    }
    if (playerSelection === 'scissors' && computerSelection === 'rock') {
      computerScore++;
      roundResult = `You Lose! ✊ Rock beats Scissors ✌️`;
    }
  }
  if (playerScore === limit || computerScore === limit) {
    gameOver = true;
    $btns.forEach(($btn) => $btn.setAttribute('disabled', true));
    const you = playerScore > computerScore ? 'Win! 🥳' : 'Lose! 🥴';
    $notify.innerHTML = `
      <h2 class="subtitle">SUMMARY</h2>
      You ${you}
      <ul class="list">
        <li class="list-item">Total rounds: ${round}</li>
        <li class="list-item">Draws: ${draws}</li>
        <li class="list-item">Your score: ${playerScore}</li>
        <li class="list-item">Computer score: ${computerScore}</li>
      </ul>
      <h3 class="title">Game Over</h3>
      <p class="question">😏 Play again, or fear? 😭</p>
      <button type="button" id="reload" class="btn again">💪 Again!</button>
    `;
    const $reload = d.getElementById('reload');
    $reload.addEventListener('click', () => {
      d.location.reload();
    });
  } else {
    $notify.innerHTML = `
      <h2 class="subtitle">In this round ${roundResult}</h2>
      <ul class="list">
        <li class="list-item">Round: ${round} of ${limit}</li>
        <li class="list-item">Your choice: ${playerSelection}</li>
        <li class="list-item">Computer choice: ${computerSelection}</li>
      </ul>
    `;
  }
};
