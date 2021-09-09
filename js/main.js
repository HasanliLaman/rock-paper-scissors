"use strict";
//Arrange icons according to device width
var mediaQuery = window.matchMedia("(min-width: 768px)");
const playIcons = document.querySelectorAll(".fas");
for (let i = 0; i < playIcons.length; i++) {
  if (mediaQuery.matches) playIcons[i].classList.add("fa-2x");
}

//Game//

//Elements
const btnRPS = document.querySelectorAll(".btn--small");
const meChoice = document.querySelector(".me-choice");
const pcChoice = document.querySelector(".pc-choice");
const meScoreDisplay = document.querySelector(".me-score");
const pcScoreDisplay = document.querySelector(".pc-score");
const meWinner = document.querySelector(".me-winner");
const pcWinner = document.querySelector(".pc-winner");
const btnReset = document.querySelector(".btn--reset");
const btnInfo = document.querySelector(".btn--info");
const btnCloseInfo = document.querySelector(".btn--info-close");
const blockInfo = document.querySelector(".block--info");
const overlay = document.querySelector(".overlay");

const pcChoicesArray = [
  "rock",
  "paper",
  "scissors",
  "scissors",
  "rock",
  "paper",
  "scissors",
  "paper",
  "rock",
  "rock",
  "paper",
  "scissors",
  "scissors",
  "rock",
  "paper",
  "scissors",
  "paper",
  "rock",
];

let meScore = 0;
let pcScore = 0;
let mePlayed = "";
let pcPlayed = "";

//Function that decides who wins the current round
const whoWins = function (str1, str2) {
  if (str1 === str2) {
    return;
  }
  if (str1 === "rock") {
    str2 === "paper" ? pcScore++ : meScore++;
  }
  if (str1 === "paper") {
    str2 === "scissors" ? pcScore++ : meScore++;
  }
  if (str1 === "scissors") {
    str2 === "rock" ? pcScore++ : meScore++;
  }
};

//When one of RPS is clicked
for (const btn of btnRPS) {
  btn.addEventListener("click", function () {
    //Change image after ME choose one of RPS
    if (btn.classList.contains("rock")) {
      meChoice.src = "images/rock.940dfa40.svg";
      mePlayed = "rock";
    }
    if (btn.classList.contains("paper")) {
      meChoice.src = "images/paper.2b65e653.svg";
      mePlayed = "paper";
    }
    if (btn.classList.contains("scissors")) {
      meChoice.src = "images/scissors.5a939b7d.svg";
      mePlayed = "scissors";
    }

    //PC make choice randomly and image changes according to it
    const pcChoiceIndex = Math.floor(Math.random() * 18);
    pcChoice.src = `images/${pcChoicesArray[pcChoiceIndex]}.svg`;
    pcPlayed = pcChoicesArray[pcChoiceIndex];

    //Change scores according to RSP pairs
    whoWins(mePlayed, pcPlayed);
    meScoreDisplay.textContent = meScore;
    pcScoreDisplay.textContent = pcScore;

    //First one to score 3 is winner, and gets winner badge
    if (meScore === 3 || pcScore === 3) {
      btnRPS.forEach((val) => (val.disabled = true));
    }
    if (meScore === 3) meWinner.style.opacity = 100;
    if (pcScore === 3) pcWinner.style.opacity = 100;
  });
}

//When reset button is clicked everything should return to its original state
btnReset.addEventListener("click", function () {
  meScore = 0;
  pcScore = 0;
  mePlayed = "";
  pcPlayed = "";
  meWinner.style.opacity = 0;
  pcWinner.style.opacity = 0;
  meChoice.src = "images/question.svg";
  pcChoice.src = "images/question.svg";
  meScoreDisplay.textContent = "0";
  pcScoreDisplay.textContent = "0";
  btnRPS.forEach((val) => (val.disabled = false));
});

//When info button is clicked it will open modal that contains game info
const openInfo = function () {
  blockInfo.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeInfo = function () {
  blockInfo.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnInfo.addEventListener("click", openInfo);
btnCloseInfo.addEventListener("click", closeInfo);
overlay.addEventListener("click", closeInfo);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !blockInfo.classList.contains("hidden")) {
    closeInfo();
  }
});
