var questNumber = 0;
var finalScore = 0;
var timeLeft = 75;
var countDown;

const timeEl = document.querySelector(".timer");
const content = document.querySelector(".container");
const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".info");
const startPage = document.getElementById("p0");
const p5 = document.getElementById("p5");
const score = document.getElementById("score");
var result = document.querySelector(".result");
var playerName = document.getElementById("initials");
var nameList = document.getElementById("names");

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", nextPage);

const clearButton = document.getElementById("clearScore");
clearButton.addEventListener("click", clearScore);

const backButton = document.getElementById("goBack");
backButton.addEventListener("click", goBack);

const viewScores = document.getElementById("viewScores");
viewScores.addEventListener("click", displayHighScores);

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

function execute() {
  resetTest();
  countDown = startCountdown();
  startTest();
}

function startCountdown() {
  return setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft < 0 || questNumber == 5) {
      clearInterval(countDown);
      score.textContent = "Your final score is " + timeLeft;
    }
  }, 1000);
}

function startTest() {
  startPage.style.display = "none";
  document.getElementById("p" + questNumber).style.display = "block";
  nextPage();
}

function resetTest() {
  clearInterval(countDown);
  questNumber = 0;
  finalScore = 0;
  timeLeft = 75;
  timeEl.textContent = "Time: " + timeLeft;
  playerName.value = "";
}

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

function goBack() {
  resetTest();
  document.getElementById("p6").style.display = "none";
  document.getElementById("p0").style.display = "block";
}

function nextPage() {
  if (questNumber > 3) {
    names = document.getElementById("names");
    result.style.display = "none";
  }

  if (questNumber == 5) {
    sortingHighscores(countDown);
  }

  document.getElementById("p" + questNumber).style.display = "none";
  questNumber++;
  questNumber = questNumber % 7;
  document.getElementById("p" + questNumber).style.display = "block";
}

function displayHighScores() {
  timeLeft = 75;
  timeEl.textContent = "Time: " + timeLeft;
  clearInterval(countDown);
  document.getElementById("p" + questNumber).style.display = "none";
  document.getElementById("p6").style.display = "block";
  result.style.display = "none";
}

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

function sortingHighscores(countDown) {
  clearInterval(countDown);
  const highScores = localStorage.highScores
    ? JSON.parse(localStorage.highScores)
    : [];

  highScores.push({
    timeLeft: timeLeft,
    playerInitials: playerName.value,
  });
  highScores.sort((a, b) => b.timeLeft - a.timeLeft);
  highScores.splice(5);

  localStorage.removeItem("highScores");
  localStorage.setItem("highScores", JSON.stringify(highScores));

  setHighScores(highScores);
}

function clearScore() {
  names.innerHTML = "";
  localStorage.removeItem("highScores");
}
