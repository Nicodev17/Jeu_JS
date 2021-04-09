// Fonction qui retourne un nombre aléatoire entre 0 et 100 (nombre cases total)
function randomNumber() {
    return Math.floor(Math.random() * 99); // 99 = nb de cases total
  }

// Fonction pour remonter la page à chaque reload
function reloadTop() {
  window.addEventListener("load", function (event) {
    $('html, body').animate({ 
      scrollTop: '0px' 
    }, 
    200);
  });
}

// MUSIQUE DU JEU

function musicButton() {
  const musicAudio = document.querySelector('#audioGame');
  const musicButton = document.querySelector('#musicButton');
  let count = 0;

  musicButton.addEventListener("click", function() {
    if(count == 0) {
      count = 1;
      musicAudio.pause();
      musicButton.innerHTML = "MUSIC ON";
    } else {
      count = 0;
      musicAudio.play();
      musicAudio.volume = 0.5;
      musicButton.innerHTML = "MUSIC OFF";
    }
  });
}

// Redimensionnement responsive du canvas (optionnel)

/* function canvasUpdate() {
  const gameDiv = document.querySelector('.gameDiv');
  const canvasTest = document.querySelector('#plateau');
  const style = getComputedStyle(canvasTest);
  const width = style.width;
  const height = style.height;

  console.log(width);
  console.log(height);

  if ( width == '450px') {
    console.log('--!--- TEST --!---');
    gameDiv.innerHTML = '<canvas id="plateau" width="450" height="450"> LE JEU EST AFFICHE ICI </canvas>';
    console.log(gameDiv);
  }
} */