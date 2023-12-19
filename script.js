document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const circle = document.getElementById("circle");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const restartButton = document.getElementById("restart-btn");

    let score = 0;
    let timer = 3;
    let timerInterval;
    let gamePaused = false; 

    const startGameConfirmed = window.confirm("Click 'OK' to start the game! You can pause the game by clicking the timer.");

    if (startGameConfirmed) {
        startGame();
    } else {
        alert("Game canceled. Refresh the page to start again.");
    }

    function startGame() {
        circle.addEventListener("click", function () {
            if (!gamePaused) {
                moveCircle();
                updateScore();
                resetTimer();
            }
        });

        gameContainer.addEventListener("click", function (event) {
            if (!gamePaused && event.target !== circle) {
                endGame();
            }
        });

        timerElement.addEventListener("click", function () {
            toggleGamePause();
        });

        restartButton.addEventListener("click", function () {
            restartGame();
        });

        moveCircle();
        resetTimer();
    }

    function moveCircle() {
        const maxX = gameContainer.clientWidth - circle.clientWidth;
        const maxY = gameContainer.clientHeight - circle.clientHeight;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        circle.style.left = newX + "px";
        circle.style.top = newY + "px";
    }

    function endGame() {
        clearInterval(timerInterval);
        alert("Game Over! Your Score: " + score + ". Click the timer to resume a new game.");
        restartGame();
    }

    function restartGame() {
        score = 0-1;
        updateScore();
        moveCircle();
        resetTimer();
        gamePaused = true;
        circle.classList.add("game-paused");
    }

    function updateScore() {
        score++;
        scoreElement.textContent = score;

        if (score % 5 === 0) {
            decreaseTime();
        }
    }

    function decreaseTime() {
        if (timer > 0.2) {
            timer -= 0.2;
        } else {
            timer = 0.2;
        }
        updateTimerDisplay();
    }

    function resetTimer() {
        timer = 3;
        updateTimerDisplay();

        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            if (!gamePaused) {
                timer--;
                updateTimerDisplay();

                if (timer === 0) {
                    clearInterval(timerInterval);
                    endGame();
                }
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerElement.textContent = timer.toFixed(1);
    }

    function toggleGamePause() {
        gamePaused = !gamePaused;

        circle.style.pointerEvents = gamePaused ? "none" : "auto";

        if (gamePaused) {
            circle.classList.add("game-paused");
        } else {
            circle.classList.remove("game-paused");
        }
        
        if (gamePaused) {
            alert("Game Paused. Resume by clicking the timer.");
        } else {
            alert("Game Resumed. Be ready.");
        }
    }

    timerElement.parentElement.addEventListener("click", function () {
        if (event.target !== timerElement) {
            toggleGamePause();
        }
    });
});
