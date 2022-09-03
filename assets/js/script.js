var questNumber = 1;

var timeLeft = 75;
const timeEl = document.querySelector(".timer");

const content = document.querySelector(".container");
const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".info");
const startPage = document.getElementById("p0");
var result = document.querySelector(".result");

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

function nextPage() {
  if (questNumber < 4) {
    document.getElementById("p" + questNumber).style.display = "none";
    questNumber++;
    document.getElementById("p" + questNumber).style.display = "block";
  } else {
    questNumber = 5;
  }
}

function correctAnswer() {
  console.log("Correct triggered");
  result.textContent = "Correct!!";
  result.style.display = "block";
  nextPage();
}
function wrongAnswer() {
  console.log("Wrong triggered");
  result.textContent = "Wrong!!";
  result.style.display = "block";
  timeLeft -= 10;
  nextPage();
}

function startTest() {
  startPage.style.display = "none";
  document.getElementById("p" + questNumber).style.display = "block";
}

function startCountdown() {
  const countDown = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft < 0) {
      clearInterval(countDown);
      timeEl.textContent = "Game Over !!";
    }
  }, 1000);
}

function execute() {
  startCountdown();
  startTest();
}
