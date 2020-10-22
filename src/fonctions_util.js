// Fonction qui retourne un nombre aléatoire entre 0 et 100 (nombre cases total)
function randomNumber() {
    return Math.floor(Math.random() * 99); // 99 = nb de cases total
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
//console.log(emptyCase);


/* TEST de else if pour le clic sur les cases

else if( x <= 540 && y <= (60 + (i*60)) ) { // 120*i au premier tour = 120  OK / au 2eme on veut 180 donc => 60 + (i*60) (i valant 2 au 2e tour)
  console.log('Clic en case ' + ((9*i) + i) );  //9*i au tour 2 = 18+1 = 19 mais au tour 3 9*i = 27+1=28 => (9*i) + i
  break;
}


*/