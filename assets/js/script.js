var timeEl = document.querySelector(".timer");
var timeLeft = 75;
var start = document.querySelector('.startButton')

function startTimer() {
  var countDown = setInterval(function () {
    timeLeft--;
    timeEl.textContent ='Time: '+ timeLeft ;

    if (timeLeft === 0) {
      clearInterval(countDown);
      timeEl.textContent = 'Game Over!!';
    }
  }, 1000);
}
start.addEventListener('click' , startTimer);

