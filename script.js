document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const circle = document.getElementById("circle");

    circle.addEventListener("click", function () {
        moveCircle();
    });

    gameContainer.addEventListener("click", function (event) {
        if (event.target !== circle) {
            endGame();
        }
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
        alert("Game Over!");
    }

    // Initial placement of the circle
    moveCircle();
});
