/*----------------------------------------------------------------------
-----|| Génération de la grille de la map avec toutes les cases ||------
----------------------------------------------------------------------*/
class GameMap {

  constructor(canvasId, nbObstacles, players, weapons) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.listeCases = [];
    this.obstacles = [];
    this.nbObstacles = nbObstacles;
    this.players = players;
    this.weapons = weapons;
    this.coordinates = this.getCoordinates();
    }

  // Fonction qui crée toutes les cases du plateau
  generateMap() {

  this.context.fillStyle = "#f5ebd0"; // Couleur des cases
  this.context.fillRect(0, 0, this.coordinates.largeurMap, this.coordinates.hauteurMap); // Totalité du canvas prise pour créer les cases

  let colonne = 0,
      ligne = 0; // Initialisation à 0 x 0 pour la position de la première case

  // Pour chaque case du plateau :
  for (let i=0; i < this.coordinates.nombreCases; i++) {
    // contour case et position
    this.context.strokeStyle = 'grey';
    this.context.strokeRect(this.coordinates.tailleCase * colonne, this.coordinates.tailleCase * ligne, this.coordinates.tailleCase, this.coordinates.tailleCase);

    // Ajout d'un objet à chaque case avec un id et les positions
    let mapCase = {};
      mapCase['numeroCase'] = i;
      mapCase['id'] = 'casevide';
      mapCase['positionX'] = this.coordinates.tailleCase * colonne;
      mapCase['positionY'] = this.coordinates.tailleCase * ligne;
      this.listeCases.push(mapCase);
    
    // Une fois la case crée, passage à la colonne suivante
    colonne++;

    // Si on arrive à 10 cases, on passe à la ligne suivante
    if (colonne === this.coordinates.nombreCasesLargeur) {
      colonne = 0;
      ligne++;
    }
  }
} // fin fonction generateMap

/*----------------------------------------------------------------------
--------|| Génération des obstacles aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
generateObstacles() {

let listeCases = this.listeCases;

for (let i = 0; i < this.nbObstacles; i++) {
  let caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") { // vérifie l'id de la case piochée et si elle occupée
    i--; // si oui alors on l'oublie..
  } else { //sinon on applique l'id obstacle sur la case de libre
    listeCases[caseAleatoire].id = "obstacle";
  }
}

// Il y a 100 cases, on vérifie l'id de chacune et si c'est un obstacle, on lui applique le visuel de l'obstacle
for (let i = 0; i < this.coordinates.nombreCases; i++) {
  ((i) => {
    if (listeCases[i].id === "obstacle") {
      let imageStones = new Image();
      imageStones.src = "media/stone.png";
      imageStones.addEventListener('load', () => { // = quand la page se charge
      this.context.drawImage(imageStones, listeCases[i].positionX, listeCases[i].positionY);
      });
    }
  })/*appel*/(i);
} }

/*----------------------------------------------------------------------
--------|| Génération des 2 joueurs aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
generatePlayers() {

let listeCases = this.listeCases;
let caseAleatoire = randomNumber();

for(let index = 1; index <= this.players.length ; index++){
  while(listeCases[caseAleatoire] && listeCases[caseAleatoire].id !== "casevide"){
    caseAleatoire = randomNumber();
  }
  listeCases[caseAleatoire].id = "joueur" + index;
}

// APPLICATION VISUEL
for (let i = 0; i < this.coordinates.nombreCases; i++) {
  ((i) => {
    if (listeCases[i].id === "joueur1") {
      let canvasJoueur1 = new Image();
      canvasJoueur1.src = "media/joueurs/joueur_1_1.png";
      canvasJoueur1.addEventListener('load', () => {
        this.context.drawImage(canvasJoueur1, listeCases[i].positionX, listeCases[i].positionY);
      });
    }

    if (listeCases[i].id === "joueur2") {
      let canvasJoueur2 = new Image();
      canvasJoueur2.src = "media/joueurs/joueur_2_1.png";
      canvasJoueur2.addEventListener('load', () => {
        this.context.drawImage(canvasJoueur2, listeCases[i].positionX, listeCases[i].positionY);
      });
    }
  })/*appel*/(i);
} }


// VIDEO MENTORAT : 45min / tout ce qu'il y a au dessus marche, il ne manque plus qu'a refactoriser l'application des visuels en créant le swicth

/*----------------------------------------------------------------------
---------|| Génération des 3 armes aléatoirement sur la map ||----------
----------------------------------------------------------------------*/
/* generateWeapons() {

let arme2 = 1,
    arme3 = 1,
    arme4 = 1;

let caseAleatoire = randomNumber();

// ---- CASE ARME 1 ----
for (let i = 0; i < arme2; i++) {
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme2";
  }
}

// ---- CASE ARME 2 ----
for (let i = 0; i < arme3; i++) {
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme3";
  }
}

// ---- CASE ARME 3 ----
for (let i = 0; i < arme4; i++) {
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme4";
  }
}

// APPLICATION VISUEL
for (let i = 0; i < nombreCases; i++) {
  (function(i) {
    if (listeCases[i].id === "arme2") {
      canvasArme2 = new Image();
      canvasArme2.src = "media/armes/arme_2.png";
      canvasArme2.addEventListener('load', function() {
        context.drawImage(canvasArme2, listeCases[i].positionX, listeCases[i].positionY);
      });
    } if (listeCases[i].id === "arme3") {
      canvasArme3 = new Image();
      canvasArme3.src = "media/armes/arme_3.png";
      canvasArme3.addEventListener('load', function() {
        context.drawImage(canvasArme3, listeCases[i].positionX, listeCases[i].positionY);
      });
    } if (listeCases[i].id === "arme4") {
      canvasArme4 = new Image();
      canvasArme4.src = "media/armes/arme_4.png";
      canvasArme4.addEventListener('load', function() {
        context.drawImage(canvasArme4, listeCases[i].positionX, listeCases[i].positionY);
      });
    }
  })(i);

  }
} */

getCoordinates(){
  let largeurMap = this.canvas.width, // Largeur de la map
      hauteurMap = this.canvas.height, // Hauteur de la map
      tailleCase = 60, // Taille d'une case
      nombreCasesLargeur = largeurMap / tailleCase,
      nombreCasesHauteur = hauteurMap / tailleCase,
      nombreCases = nombreCasesLargeur * nombreCasesHauteur;

      return {
        largeurMap, hauteurMap, tailleCase, nombreCasesLargeur, nombreCasesHauteur, nombreCases
      }
}

} // fin de la classe Map