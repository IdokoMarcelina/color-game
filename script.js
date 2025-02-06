
import ConfettiGenerator from './confetti.js';

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let targetColor;

const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let confettiGenerator;

function startGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    gameStatus.textContent = "Guess the color!";
    gameStatus.classList.remove("fade-out", "correct");
    colorOptions.forEach((btn, index) => {
        btn.style.backgroundColor = colors[index];
        btn.onclick = () => checkGuess(colors[index]);
    });
}

function checkGuess(color) {
    if (color === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        gameStatus.classList.add("correct");
        score++;
        updateScore();
        startConfetti();
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        setTimeout(() => gameStatus.classList.add("fade-out"), 500);
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function startConfetti() {
    confettiGenerator = new ConfettiGenerator({ target: 'confettiCanvas' });
    confettiGenerator.render();
    setTimeout(() => confettiGenerator.clear(), 3000); // Stop confetti after 3 seconds
}

newGameButton.addEventListener("click", startGame);

startGame();
