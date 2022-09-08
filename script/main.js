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

$notify.innerHTML = `
  <p>You vs Computer</p>
  <p><small>The winner will be the first to win ${limit} rounds</small>.</p>
  <p>To start press your choise!</p>
`;

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
    roundResult = `🤝 Tie.`;
  } else {
    if (playerSelection === 'paper' && computerSelection === 'rock') {
      playerScore++;
      roundResult = `You Win! <div>🤚 Paper beats Rock ✊</div>`;
    }
    if (playerSelection === 'rock' && computerSelection === 'paper') {
      computerScore++;
      roundResult = `You Lose! <div>🤚 Paper beats Rock ✊</div>`;
    }
    if (playerSelection === 'scissors' && computerSelection === 'paper') {
      playerScore++;
      roundResult = `You Win! <div>✌️ Scissors beats Paper 🤚</div>`;
    }
    if (playerSelection === 'paper' && computerSelection === 'scissors') {
      computerScore++;
      roundResult = `You Lose! <div>✌️ Scissors beats Paper 🤚</div>`;
    }
    if (playerSelection === 'rock' && computerSelection === 'scissors') {
      playerScore++;
      roundResult = `You Win! <div>✊ Rock beats Scissors ✌️</div>`;
    }
    if (playerSelection === 'scissors' && computerSelection === 'rock') {
      computerScore++;
      roundResult = `You Lose! <div>✊ Rock beats Scissors ✌️</div>`;
    }
  }
  if (playerScore === limit || computerScore === limit) {
    gameOver = true;
    $btns.forEach(($btn) => {
      $btn.setAttribute('disabled', true);
      $btn.classList.add('disable');
    });
    const you = playerScore > computerScore ? 'Win! 🥳' : 'Lose! 🥴';
    $notify.innerHTML = `
      <h2 class="subtitle">SUMMARY</h2>
      You ${you}
      <ul class="details">
        <li>Total rounds: ${round}</li>
        <li>Draws: ${draws}</li>
        <li>Your score: ${playerScore}</li>
        <li>Computer score: ${computerScore}</li>
      </ul>
      <h3 class="subtitle">Game Over</h3>
      <p class="question">😏 Play again, or fear? 😭</p>
      <button type="button" id="reload" class="again">💪 Again!</button>
    `;
    const $reload = d.getElementById('reload');
    $reload.addEventListener('click', () => {
      d.location.reload();
    });
  } else {
    $notify.innerHTML = `
      <div class="scores">
        <div>
          <p class="score">Player</p>
          <p class="score">${playerScore}</p>
        </div>
        <div>
          <p class="score">Computer</p>
          <p class="score">${computerScore}</p>
        </div>
      </div>
      <h2 class="subtitle">In this round</h2>
      <p>${roundResult}</p>
      <ul class="details">
        <li>Round: ${round}</li>
        <li>Your choice: <span class="capi">${playerSelection}</span></li>
        <li>Computer's choice: <span class="capi">${computerSelection}</span></li>
      </ul>
    `;
  }
};
