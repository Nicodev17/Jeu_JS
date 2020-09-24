// MEMO 

// cases : 
  //     - id [obstacle, weapon, player, empty, ? nextToPlayer ?]
  //     - weapon > type [1, 2, 3, 4] => identifie l'arme sur la case
  //     - havePlayer > [0(pas de joueur), 1, 2 ]
  // Joueur : éloignés séparés par au moins une case
  // Refactoriser la map / distance entre les joueurs / mouvements possibles

  
/*----------------------------------------------------------------------
-----|| Génération de la grille de la map avec toutes les cases ||------
----------------------------------------------------------------------*/
class Map {
  constructor(joueur1, joueur2, arme1, arme2, arme3, arme4, obstacles, caseVide, caseProche) {
    this.joueurs = [joueur1, joueur2];
    this.armes = [arme1, arme2, arme3, arme4];
    this.obstacles = obstacles;
    this.caseVide = caseVide;
    this.caseProche = caseProche; // Cases tout autour du joueur 
  }
};

// Création des variables pour le canvas
let canvas = document.getElementById('plateau'),
    context = canvas.getContext('2d');

// Définition des variables
let largeurMax = canvas.width, // Largeur de la map
    hauteurMax = canvas.height, // Hauteur de la map
    tailleCase = 60, // Taille d'une case
    nombreCasesLargeur = largeurMax / tailleCase,
    nombreCasesHauteur = hauteurMax / tailleCase, 
    nombreCases = nombreCasesLargeur * nombreCasesHauteur, // Le nombre de cases total
    listeCases = []; // Contient un tableau avec la liste des cases

// Fonction qui crée toutes les cases du plateau
function creerPlateau() {
  context.fillStyle = "#f5ebd0"; // Couleur des cases
  context.fillRect(0, 0, largeurMax, hauteurMax); // Totalité du canvas prise pour créer les cases

  let colonne = 0,
      ligne = 0; // Initialisation à 0 x 0 pour la position de la première case

  // Pour chaque case du plateau :
  for (i = 0; i < nombreCases; i++) {
    // contour case et position
    context.strokeStyle = 'grey';
    context.strokeRect(tailleCase * colonne, tailleCase * ligne, tailleCase, tailleCase);

    // Ajout d'un objet à chaque case avec un id et les positions
    listeCases[i] = {
      numerocase: i,
      id: "casevide",
      positionX: tailleCase * colonne + 1,
      positionY: tailleCase * ligne + 1
    };

    // Une fois la case crée, passage à la colonne suivante
    colonne++;

    // Si on arrive à 10 cases, on passe à la ligne suivante
    if (colonne === nombreCasesLargeur) {
      colonne = 0;
      ligne++;
    }
  }
}
//Appel de la fonction pour générer la map
creerPlateau();

// Fonction qui retourne un nombre aléatoire entre 0 et 100 (nombre cases total)
function randomNumber() {
  return Math.floor(Math.random() * (nombreCases));
} 
//mettre dans un fichier à part

// Récupération d'un index de case au hasard
let caseAleatoire = randomNumber(); 

/*----------------------------------------------------------------------
--------|| Génération des obstacles aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
function placeObstacles() {

let nombreObstacles = 12;

for (i = 0; i < nombreObstacles; i++) {
  caseAleatoire = randomNumber(); // récupère un index de case au hasard
  if (listeCases[caseAleatoire].id !== "casevide") { // vérifie l'id de la case piochée et si elle occupée
    i--; // si oui alors on l'oublie..
  } else { //sinon on applique l'id obstacle sur la case de libre
    listeCases[caseAleatoire].id = "obstacle";
  }
}

// Il y a 100 cases, on vérifie l'id de chacune et si c'est un obstacle, on lui applique le visuel de l'obstacle
for (i = 0; i < nombreCases; i++) {
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
placeObstacles();

/*----------------------------------------------------------------------
--------|| Génération des 2 joueurs aléatoirement sur la map ||---------
----------------------------------------------------------------------*/
function placeJoueurs() {

let joueur1 = 1,
    joueur2 = 1;

// ---- CASE JOUEUR 1 ----
for (i = 0; i < joueur1; i++) {
  caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "joueur1";
  }
}

// ---- CASE JOUEUR 2 ----
for (i = 0; i < joueur2; i++) {
  caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "joueur2";
  }
}

// APPLICATION VISUEL
for (i = 0; i < nombreCases; i++) {
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
placeJoueurs();

/* let nextToPlayer = 0;
for (joueur1.positionX.positionY = joueur2.positionX.positionY + 1) {
  joueur1.positionX.positionY = + 1
}; // si le joueur 1 est à côté du joueur 2 en début de partie alors position joueur 1 case++
*/

/*----------------------------------------------------------------------
---------|| Génération des 3 armes aléatoirement sur la map ||----------
----------------------------------------------------------------------*/
function placeArmes() {

let arme2 = 1,
    arme3 = 1,
    arme4 = 1;

// ---- CASE ARME 1 ----
for (i = 0; i < arme2; i++) {
  caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme2";
  }
}

// ---- CASE ARME 2 ----
for (i = 0; i < arme3; i++) {
  caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme3";
  }
}

// ---- CASE ARME 3 ----
for (i = 0; i < arme4; i++) {
  caseAleatoire = randomNumber();
  if (listeCases[caseAleatoire].id !== "casevide") {
    i--;
  } else { 
    listeCases[caseAleatoire].id = "arme4";
  }
}

// APPLICATION VISUEL
for (i = 0; i < nombreCases; i++) {
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
  })/*appel*/(i);
} }
placeArmes();