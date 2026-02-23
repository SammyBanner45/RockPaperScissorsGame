let playerScore = 0;
let compScore = 0;

const images = {
    rock: "rock.png",
    paper: "paper.png",
    scissors: "scissors.png"
};

function play(playerMove) {
    if (playerScore === 5 || compScore === 5) return;

    const arena = document.getElementById("arena");
    arena.innerHTML = "";

    const compMove = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

    const playerImg = document.createElement("img");
    const compImg = document.createElement("img");

    playerImg.src = images[playerMove];
    compImg.src = images[compMove];

    playerImg.style.width = compImg.style.width = "140px";
    playerImg.style.marginRight = "40px";

    arena.append(playerImg, compImg);

    gsap.fromTo(playerImg,
        { x: -300, rotation: 0 },
        { x: 0, rotation: 360, duration: 0.6 }
    );

    gsap.fromTo(compImg,
       { 
        scaleX: -1,  
        x: 300, 
        rotation: 0 
    },
    { 
        x: 0, 
        rotation: -360, 
        duration: 0.6, 
        onComplete: shake 
    });

    function shake() {
        gsap.to([playerImg, compImg], {
            x: "+=10",
            yoyo: true,
            repeat: 5,
            duration: 0.05
        });
    }

    let result = "Draw 😐";

    if (
        (playerMove === "rock" && compMove === "paper") ||
        (playerMove === "scissors" && compMove === "rock") ||
        (playerMove === "paper" && compMove === "scissors")
    ) {
        result = "YOU LOST 😭";
        compScore++;
    }
    else if (playerMove !== compMove) {
        result = "Chal thik hai tu jeet gya 😎";
        playerScore++;
    }

    if (playerScore === 5) result += "\n🔥 YOU WON THE GAME!";
    if (compScore === 5) result += "\n💀 COMPUTER WON THE GAME!";

    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("comp-score").innerText = compScore;
    document.getElementById("result").innerText = result;
}

function resetGame() {
    playerScore = 0;
    compScore = 0;
    document.getElementById("arena").innerHTML = "";
    document.getElementById("player-score").innerText = "0";
    document.getElementById("comp-score").innerText = "0";
    document.getElementById("result").innerText = "Choose your weapon!";
}
