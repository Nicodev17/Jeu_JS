// Fonction qui retourne un nombre aléatoire entre 0 et 100 (nombre cases total)
function randomNumber() {
    return Math.floor(Math.random() * 99); // 99 = nb de cases total
  }

// MUSIQUE DU JEU

function music() {
  const musicAudio = document.querySelector('#audioGame');
  const musicButton = document.querySelector('#musicButton');
  let count = 0;

  musicButton.addEventListener("click", function() {
    if(count == 0) {
      count = 1;
      musicAudio.play();
      musicAudio.volume = 0.5;
      musicButton.innerHTML = "MUSIC OFF";
    } else {
      count = 0;
      musicAudio.pause();
      musicButton.innerHTML = "MUSIC ON";
    }
  });

}

/* Tableau des sources d'images pour les obstacles
let obstacles = ['stone.png', 'tree.png', 'bush.png'];

function obstacleAleatoire(array) {
	return array[Math.floor(Math.random() * array.length)];
} // retourne 1, 2 ou 3

let testObstacle = obstacleAleatoire(obstacles);

console.log(testObstacle); */

// util de game
//console.log(this.currentPlayer.weapon.name);   
//let emptyCase = listeCases.filter(element => element.id === "casevide"); // filtre les cases du tableau ayant pour id casevide
//console.log(emptyCase); */