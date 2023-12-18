document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const circle = document.getElementById("circle");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restart-btn");

    let score = 0;

    circle.addEventListener("click", function () {
        moveCircle();
        updateScore();
    });

    gameContainer.addEventListener("click", function (event) {
        if (event.target !== circle) {
            endGame();
        }
    });

    restartButton.addEventListener("click", function () {
        restartGame();
    });

    function moveCircle() {
        const maxX = gameContainer.clientWidth - circle.clientWidth;
        const maxY = gameContainer.clientHeight - circle.clientHeight;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        circle.style.left = newX + "px";
        circle.style.top = newY + "px";
    }

    function endGame() {
        alert("Game Over! Your Score: " + score);
        restartGame();
    }

    function restartGame() {
        score = 0-1;
        updateScore();
        moveCircle();
    }

    function updateScore() {
        score++;
        scoreElement.textContent = score;
    }

    // Initial placement of the circle
    moveCircle();
});
