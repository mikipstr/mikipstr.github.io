// Function to make the header sticky on scroll
window.onscroll = function() {myFunction()};

function myFunction() {
  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  var headerHeight = header.offsetHeight;

  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.body.style.paddingTop = headerHeight + "px";
  } else {
    header.classList.remove("sticky");
    document.body.style.paddingTop = "0";
  }
}

// Function to get the date of the next Thursday
function getNextThursday() {
  const now = new Date();
  const nextThursday = new Date(now);
  const daysUntilNextThursday = (4 - now.getDay() + 7) % 7;
  nextThursday.setDate(now.getDate() + (daysUntilNextThursday === 0 ? 7 : daysUntilNextThursday)); // Set to next Thursday
  nextThursday.setHours(0, 0, 0, 0); // Set to the start of the day
  return nextThursday;
}

// Function to update the countdown timer
function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  const now = new Date().getTime();
  const nextThursday = getNextThursday().getTime();
  const distance = nextThursday - now;

  const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
  const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor((distance % 1000) / 10)).padStart(2, '0');

  countdownElement.innerHTML = `${days}.${hours}.${minutes}.${seconds}.${milliseconds}`;

  if (distance < 0) {
    countdownElement.innerHTML = "The site will open in the following moments!";
  }
}

// Update the countdown timer every 10 milliseconds
setInterval(updateCountdown, 10);
updateCountdown();

// Function to handle background audio play
function handleAudioPlayback() {
  var audio = document.getElementById('background-audio');
  var playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(function() {
      localStorage.setItem('audioPlaying', 'true');
    }).catch(function(error) {
      console.log('Audio playback failed: ', error);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('background-audio');

  // Function to play audio
  function playAudio() {
    audio.play().then(function() {
      localStorage.setItem('audioPlaying', 'true');
    }).catch(function(error) {
      console.log('Audio playback failed: ', error);
    });
  }

  // Attempt to play audio on DOMContentLoaded
  playAudio();

  // Play audio if previously played
  if (localStorage.getItem('audioPlaying') === 'true') {
    audio.play().catch(function(error) {
      console.log('Audio playback failed: ', error);
    });
  }
});

// Add event listener to play audio on window load if previously played
window.addEventListener('load', function() {
  var audio = document.getElementById('background-audio');
  if (localStorage.getItem('audioPlaying') === 'true') {
    audio.play().catch(function(error) {
      console.log('Audio playback failed: ', error);
    });
  }
});



























