// MEMO 

// cases : 
  //     - id [obstacle, weapon, player, empty, ? nextToPlayer ?]
  //     - havePlayer > [0(pas de joueur), 1, 2 ]
  // Joueur : éloignés séparés par au moins une case
  // Refactoriser la map / distance entre les joueurs / mouvements possibles

/*----------------------------------------------------------------------
-----|| Génération de la grille de la map avec toutes les cases ||------
----------------------------------------------------------------------*/
class Map {

  constructor(canvas, context, listeCases, id, obstacles, caseVide, caseAdjac) {
    this.canvas = canvas;
    this.context = context;
    this.listeCases = listeCases;
    this.caseAleatoire = randomNumber();
    this.obstacles = obstacles;
    this.caseVide = caseVide;
    this.caseAdjac = caseAdjac; // cases autour des joueurs (à moins de 1)
  }

  // Fonction qui crée toutes les cases du plateau
  generateMap() {

    // Création des variables du plateau
    this.canvas = document.getElementById('plateau');
    this.context = this.canvas.getContext('2d');

    // Définition des variables
    let largeurMap = this.canvas.width, // Largeur de la map
        hauteurMap = this.canvas.height, // Hauteur de la map
        tailleCase = 60, // Taille d'une case
        nombreCasesLargeur = largeurMap / tailleCase,
        nombreCasesHauteur = hauteurMap / tailleCase, 
        nombreCases = nombreCasesLargeur * nombreCasesHauteur;

  this.listeCases = [];

  this.context.fillStyle = "#f5ebd0"; // Couleur des cases
  this.context.fillRect(0, 0, largeurMap, hauteurMap); // Totalité du canvas prise pour créer les cases

  let colonne = 0,
      ligne = 0; // Initialisation à 0 x 0 pour la position de la première case

  // Pour chaque case du plateau :
  for (let i=0; i < nombreCases; i++) {
    // contour case et position
    this.context.strokeStyle = 'grey';
    this.context.strokeRect(tailleCase * colonne, tailleCase * ligne, tailleCase, tailleCase);

    // Ajout d'un objet à chaque case avec un id et les positions
    this.listeCases = {};
      this.listeCases['numeroCase'] = i;
      this.listeCases['id'] = 'casevide';
      this.listeCases['positionX'] = tailleCase * colonne;
      this.listeCases['positionY'] = tailleCase * ligne;

    console.log("Coordoonées de la case " + this.listeCases.numeroCase + " = X : " + this.listeCases.positionX + " / Y : " + this.listeCases.positionY);
    
    // Une fois la case crée, passage à la colonne suivante
    colonne++;

    // Si on arrive à 10 cases, on passe à la ligne suivante
    if (colonne === nombreCasesLargeur) {
      colonne = 0;
      ligne++;
    }
  }
} // fin fonction generateMap

/*----------------------------------------------------------------------
--------|| Génération des obstacles aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
generateObstacles() {

let nombreObstacles = 12;
let listeCases = this.listeCases;
let caseAleatoire = this.caseAleatoire;

console.log(this.caseAleatoire);

for (let i = 0; i < nombreObstacles; i++) {
  if (listeCases[caseAleatoire].id !== "casevide") { // vérifie l'id de la case piochée et si elle occupée
    i--; // si oui alors on l'oublie..
  } else { //sinon on applique l'id obstacle sur la case de libre
    listeCases[caseAleatoire].id = "obstacle";
  }
}

// Il y a 100 cases, on vérifie l'id de chacune et si c'est un obstacle, on lui applique le visuel de l'obstacle
for (let i = 0; i < this.nombreCases; i++) {
  (function(i) {
    if (listeCases[i].id === "obstacle") {
      canvas = new Image();
      canvas.src = "media/stone.png";
      canvas.addEventListener('load', function() { // = quand la page se charge
        context.drawImage(canvas, listeCases[i].positionX, listeCases[i].positionY);
      });
    }
  })/*appel*/(i);
} }

/*----------------------------------------------------------------------
--------|| Génération des 2 joueurs aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
generatePlayers() {

let joueur1 = 1,
    joueur2 = 1;

let listeCases = this.listeCases;
let caseAleatoire = this.caseAleatoire;

// ---- CASE JOUEUR 1 ----
for (let i = 0; i < joueur1; i++) {
  if (listeCases[caseAleatoire] && listeCases.id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire] && listeCases.id == "joueur1";
  }
}

// ---- CASE JOUEUR 2 ----
for (let i = 0; i < joueur2; i++) {
  if (listeCases[caseAleatoire] && listeCases.id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire] && listeCases.id == "joueur2";
  }
}

// APPLICATION VISUEL
for (let i = 0; i < this.nombreCases; i++) {
  (function(i) {
    if (listeCases[i].id === "joueur1") {
      canvasJoueur1 = new Image();
      canvasJoueur1.src = "media/joueurs/joueur_1_1.png";
      canvasJoueur1.addEventListener('load', function() {
        context.drawImage(canvasJoueur1, listeCases[i].positionX, listeCases[i].positionY);
      });
    }

    if (listeCases[i].id === "joueur2") {
      canvasJoueur2 = new Image();
      canvasJoueur2.src = "media/joueurs/joueur_2_1.png";
      canvasJoueur2.addEventListener('load', function() {
        context.drawImage(canvasJoueur2, listeCases[i].positionX, listeCases[i].positionY);
      });
    }
  })/*appel*/(i);
} }

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

} // fin de la classe Map