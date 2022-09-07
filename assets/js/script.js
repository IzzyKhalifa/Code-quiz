var questNumber = 0;

var timeLeft = 75;
const timeEl = document.querySelector(".timer");

const content = document.querySelector(".container");
const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".info");
const startPage = document.getElementById("p0");
const p5 = document.getElementById("p5");
const score = document.getElementById("score");
var result = document.querySelector(".result");
var playerName = document.getElementById("initials");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearScore");
const backButton = document.getElementById("goBack");
var nameList = document.getElementById("names");
const viewScores = document.getElementById("viewScores");
const finalScore = 0;

var rButtons = document.querySelectorAll(".right");
for (const button of rButtons) {
  button.addEventListener("click", correctAnswer);
}

var wButtons = document.querySelectorAll(".wrong");
for (const button of wButtons) {
  button.addEventListener("click", wrongAnswer);
}

const start = document.querySelector(".startButton");
start.addEventListener("click", execute);

function goBack() {
  playerName.value = "";
  timeLeft = 75;
  nextPage();
}
backButton.addEventListener("click", goBack);

function clearScore() {
  names.innerHTML = "";
  localStorage.removeItem("highScores");
}
clearButton.addEventListener("click", clearScore);

const maxScores = 5;

function setHighScores(highScores) {
  names.innerHTML = "";
  index = 1;
  highScores.forEach((score) => {
    ol = document.createElement("ol");
    ol.innerHTML = index + ". " + score.playerInitials + " : " + score.timeLeft;
    console.log(index);
    nameList.appendChild(ol);
    index++;
  });
}

function sortingHighscores() {
  const highScores = localStorage.highScores
    ? JSON.parse(localStorage.highScores)
    : [];
  console.log(highScores);
  highScores.push({
    timeLeft: timeLeft,
    playerInitials: playerName.value,
  });
  highScores.sort((a, b) => b.timeLeft - a.timeLeft);
  highScores.splice(5);
  localStorage.removeItem("highScores");
  localStorage.setItem("highScores", JSON.stringify(highScores));
  setHighScores(highScores);
  console.log(highScores);
}

viewScores.addEventListener("click", displayHighScores);

function displayHighScores() {
  document.getElementById("p" + questNumber).style.display = "none";
  console.log(questNumber);
  document.getElementById("p6").style.display = "block";
  result.style.display = "none";
}

function nextPage() {
  if (questNumber > 3) {
    names = document.getElementById("names");
    result.style.display = "none";
  }

  if (questNumber == 5) {
    sortingHighscores();
  }

  document.getElementById("p" + questNumber).style.display = "none";
  questNumber++;
  questNumber = questNumber % 7;
  document.getElementById("p" + questNumber).style.display = "block";
}

submitButton.addEventListener("click", nextPage);

function correctAnswer() {
  result.textContent = "Correct!!";
  result.style.display = "block";
  nextPage();
}
function wrongAnswer() {
  result.textContent = "Wrong!!";
  result.style.display = "block";
  timeLeft -= 10;
  nextPage();
}

function startTest() {
  startPage.style.display = "none";
  document.getElementById("p" + questNumber).style.display = "block";
  nextPage();
}

function startCountdown() {
  const countDown = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft < 0 || questNumber == 5) {
      clearInterval(countDown);
      score.textContent = "Your final score is " + timeLeft;
    }
  }, 1000);
}

function execute() {
  startCountdown();
  startTest();
}
