let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll('.btn');
let started = false;
let level = 0;
let highScore = 0; // Initialize high score outside the game loop

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * btns.length);
    let randColor = btns[randomIndex].getAttribute("id");
    let randbtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function btnPress() {
    if (started) { // Allow button presses only when the game has started
        let btn = this;
        userFlash(btn);
        userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }
}

for (let btn of btns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level; // Update high score if the current level is higher
        }
        h2.innerHTML = `Game Over! Your current score was <b>${level}</b><br>Press any key to restart.<br>Your highest score is ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
