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
// Function to get the target date
function getTargetDate(dateString) {
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0); // Set to the start of the day
  return targetDate;
}

// Function to update the countdown timer
function updateCountdown(targetDate) {
  const countdownElement = document.getElementById('countdown');
  const now = new Date().getTime();
  const targetTime = targetDate.getTime();
  const distance = targetTime - now;

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

// Set the target date (e.g., September 5, 2024)
const targetDate = getTargetDate('2024-09-20');

// Update the countdown timer every 10 milliseconds
setInterval(() => updateCountdown(targetDate), 10);
updateCountdown(targetDate);
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



























