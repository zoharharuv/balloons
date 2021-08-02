// GLOBAL VARIABLES

var gHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);

var gBalloons = [
  { id: 1, bottom: 0, speed: 10, isPoped: false },
  { id: 2, bottom: 0, speed: 15, isPoped: false },
  { id: 3, bottom: 0, speed: 20, isPoped: false },
  { id: 4, bottom: 0, speed: 12, isPoped: false },
  { id: 5, bottom: 0, speed: 17, isPoped: false }
];
var gRaceInterval;

var gPop = new Audio('pop.wav');

function init() {
  renderBalloons()
  startRace();
}

function resetRace() {
  for (var i = 0; i < gBalloons.length; i++) {
    var balloon = gBalloons[i];
    balloon.bottom = 0;
    balloon.isPoped = false;
  }
}
function startRace() {
  resetRace();
  console.log('Starting race');
  gRaceInterval = setInterval(moveBalloons, 100);
}

function moveBalloons() {
  var elBalloons = document.querySelectorAll('.balloon')

  for (var i = 0; i < elBalloons.length; i++) {
    var elBalloon = elBalloons[i];
    var balloon = gBalloons[i];
    if (balloon.isPoped) {
      balloon.bottom = 0;
      continue;
    } else {
      elBalloon.style.marginBottom = balloon.bottom + 'px';
      balloon.bottom += balloon.speed;
    }

    if (balloon.bottom > gHeight) {
      console.log(balloon.id + ' Won the race!');
      clearInterval(gRaceInterval);
      confirm('play again?') ? startRace() : console.log('okay goodbye');
    }
  }
}

function popBalloon(elBalloon, balloonIdx) {
  gPop.play();
  elBalloon.classList.add("poped");
  gBalloons[balloonIdx].isPoped = true;
}

function renderBalloons() {
  var strHTML = '';
  for (var i = 0; i < gBalloons.length; i++) {
    strHTML += createElBalloon(i);
  }
  var elSky = document.querySelector('.sky');
  elSky.innerHTML = strHTML
}

function createElBalloon(idx) {
  return '<div class="balloon balloon' + (idx + 1) + '" onclick="popBalloon(this,' + idx + ')"></div>'
}