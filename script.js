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

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function startGame() {
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    gameStatus.textContent = "Guess the color!";
    gameStatus.classList.remove("fade-out", "correct");

    let colorOptionsArray = [];
    while (colorOptionsArray.length < 5) {
        const randomColor = getRandomColor();
        if (!colorOptionsArray.includes(randomColor) && randomColor !== targetColor) {
            colorOptionsArray.push(randomColor);
        }
    }

    const randomIndex = Math.floor(Math.random() * 6);
    colorOptionsArray.splice(randomIndex, 0, targetColor);

    colorOptions.forEach((btn, index) => {
        btn.style.backgroundColor = colorOptionsArray[index];
        btn.onclick = () => checkGuess(colorOptionsArray[index]);
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
        setTimeout(startGame, 1000); 
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
    setTimeout(() => confettiGenerator.clear(), 3000); 
}

newGameButton.addEventListener("click", startGame);

startGame();
