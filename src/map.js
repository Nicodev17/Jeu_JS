/*----------------------------------------------------------------------
-----|| Génération de la grille de la map avec toutes les cases ||------
----------------------------------------------------------------------*/
class GameMap {
  constructor(canvasId, nbObstacles1, nbObstacles2, players, weapons) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.listeCases = [];
    this.obstacles = [];
    this.nbObstacles1 = nbObstacles1;
    this.nbObstacles2 = nbObstacles2;
    this.players = players;
    this.weapons = weapons;
    this.coordinates = this.getCoordinates();
  }

  // Fonction qui crée toutes les cases du plateau
  generateMap() {
    this.context.fillStyle = "#ede0bb"; // Couleur des cases
    this.context.fillRect(0, 0, this.coordinates.largeurMap, this.coordinates.hauteurMap); // Totalité du canvas prise pour créer les cases

    let colonne = 0,
      ligne = 0; // Initialisation à 0 x 0 pour la position de la première case

    // Pour chaque case du plateau :
    for (let i = 0; i < this.coordinates.nombreCases; i++) {
      // contour case et position
      this.context.strokeStyle = 'grey';
      this.context.strokeRect(this.coordinates.tailleCase * colonne, this.coordinates.tailleCase * ligne, this.coordinates.tailleCase, this.coordinates.tailleCase);

      // Ajout d'un objet à chaque case avec son id de base et ses positions
      let mapCase = {};
      mapCase['numeroCase'] = i;
      mapCase['id'] = 'casevide';
      mapCase['type'] = 'inaccess';
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
  ------------|| Création des 2 types d'obstacles de la map ||------------
  ----------------------------------------------------------------------*/
  generateObstacles() {
    let listeCases = this.listeCases;

    for (let i = 0; i < this.nbObstacles1; i++) {
      let caseAleatoire = randomNumber();
      if (listeCases[caseAleatoire].id !== "casevide") { // vérifie l'id de la case piochée
        i--; // si l'id est autre "casevide" (par ex "joueur1") alors on l'oublie..
      } else { // sinon on applique l'id obstacle sur la case de libre
        listeCases[caseAleatoire].id = "obstacle1";
      }
    }

    for (let i = 0; i < this.nbObstacles2; i++) {
      let caseAleatoire = randomNumber();
      if (listeCases[caseAleatoire].id !== "casevide") {
        i--;
      } else {
        listeCases[caseAleatoire].id = "obstacle2";
      }
    }
  }

  /*----------------------------------------------------------------------
  ----------------------|| Création des 2 joueurs ||----------------------
  ----------------------------------------------------------------------*/
  generatePlayers() {
    let listeCases = this.listeCases;
    let caseAleatoire = randomNumber();

    for (let index = 1; index <= this.players.length; index++) {
      while (listeCases[caseAleatoire] && listeCases[caseAleatoire].id !== "casevide") {
        caseAleatoire = randomNumber();
      }
      listeCases[caseAleatoire].id = "joueur" + index;
    }
  }

  /*----------------------------------------------------------------------
  ----------|| Création des 3 armes dispo sur la map au début ||----------
  ----------------------------------------------------------------------*/
  generateWeapons() {
    let listeCases = this.listeCases;
    let caseAleatoire = randomNumber();

    for (let index = 2; index <= this.weapons.length; index++) {
      while (listeCases[caseAleatoire] && listeCases[caseAleatoire].id !== "casevide") {
        caseAleatoire = randomNumber();
      }
      listeCases[caseAleatoire].id = "arme" + index;
    }
  }

  /*----------------------------------------------------------------------
  ----------|| Fonction regroupant les variables du plateau ||------------
  ----------------------------------------------------------------------*/
  getCoordinates() {
    let largeurMap = this.canvas.width,
      hauteurMap = this.canvas.height,
      tailleCase = 60,
      nombreCasesLargeur = largeurMap / tailleCase,
      nombreCasesHauteur = hauteurMap / tailleCase,
      nombreCases = nombreCasesLargeur * nombreCasesHauteur;

    return { largeurMap, hauteurMap, tailleCase, nombreCasesLargeur, nombreCasesHauteur, nombreCases }
  }

  /*----------------------------------------------------------------------
  ----------------------|| Affichage des visuels ||-----------------------
  ----------------------------------------------------------------------*/
  drawMap() {
    for (let i = 0; i < this.coordinates.nombreCases; i++) {
      ((i) => {
        let image = new Image();
        switch (this.listeCases[i].id) {
          case "obstacle1":
            image.src = "media/stone.png";
            break
          case "obstacle2":
            image.src = "media/tree.png";
            break
          case "joueur1":
            image.src = player1.imgUrl;
            break
          case "joueur2":
            image.src = player2.imgUrl;
            break
          case "arme2":
            image.src = weapon2.imgUrl;
            break
          case "arme3":
            image.src = weapon3.imgUrl;
            break
          case "arme4":
            image.src = weapon4.imgUrl;
            break
          case "arme5":
            image.src = weapon5.imgUrl;
            break
        }
        if (image.src !== undefined) {
          image.addEventListener('load', () => {
            this.context.drawImage(image, this.listeCases[i].positionX, this.listeCases[i].positionY);
          });
        }
      })/*appel*/(i);
    }
  }

  /*----------------------------------------------------------------------
  ------|| Fonction interdisant les spawn des joueurs côte à côte ||------
  ----------------------------------------------------------------------*/
  spawnNext() {
    let listeCases = this.listeCases;
    let joueur1 = listeCases.find(element => element.id === "joueur1");
    let joueur2 = listeCases.find(element => element.id === "joueur2");
    //J1
    let caseUnblockRight = joueur1.numeroCase + 1;
    let caseUnblockLeft = joueur1.numeroCase - 1;
    let caseUnblockTop = joueur1.numeroCase - 10;
    //J2
    let caseUnblockRight2 = joueur2.numeroCase + 1;
    let caseUnblockLeft2 = joueur2.numeroCase - 1;
    let caseUnblockTop2 = joueur2.numeroCase - 10;

    window.addEventListener("load", function (event) {
      if (joueur1.positionY === joueur2.positionY && (Math.abs(joueur1.numeroCase - joueur2.numeroCase) == 1) || joueur1.positionX === joueur2.positionX && (Math.abs(joueur1.positionY - joueur2.positionY) < 180)) {
        // = SI les joueurs 1 et 2 sont sur la même ligne ET que leur case se suivent OU si les joueurs 1 et 2 sont sur la même colonne ET que leur ligne se suit (ligne du dessous ou du dessus) 
        window.location.reload();
      } else if ((listeCases[caseUnblockRight].id.includes('obstacle') && listeCases[caseUnblockLeft].id.includes('obstacle') && listeCases[caseUnblockTop].id.includes('obstacle'))
        || (listeCases[caseUnblockRight2].id.includes('obstacle') && listeCases[caseUnblockLeft2].id.includes('obstacle') && listeCases[caseUnblockTop2].id.includes('obstacle'))
      ) {
        window.location.reload();
      } // Empeche l'encerclement du joueur par des obstacle au début
    });
  }

  /*----------------------------------------------------------------------
  ------|| Fonction assignant aux objets les proprietés des cases ||------
  ----------------------------------------------------------------------*/
  assignObject() {
    let listeCases = this.listeCases;
    // -- Joueurs --
    // Objets
    let objetJ1 = player1;
    let objetJ2 = player2;
    // Cases
    let caseJ1 = listeCases.find(element => element.id === "joueur1");;
    let caseJ2 = listeCases.find(element => element.id === "joueur2");;

    this.players[0] = Object.assign(objetJ1, caseJ1);
    this.players[1] = Object.assign(objetJ2, caseJ2);

    // -- Armes --
    let objetArme2 = weapon2;
    let objetArme3 = weapon3;
    let objetArme4 = weapon4;
    let objetArme5 = weapon5;
    let caseArme2 = listeCases.find(element => element.id === "arme2");
    let caseArme3 = listeCases.find(element => element.id === "arme3");
    let caseArme4 = listeCases.find(element => element.id === "arme4");
    let caseArme5 = listeCases.find(element => element.id === "arme5");

    this.weapons[1] = Object.assign(objetArme2, caseArme2);
    this.weapons[2] = Object.assign(objetArme3, caseArme3);
    this.weapons[3] = Object.assign(objetArme4, caseArme4);
    this.weapons[4] = Object.assign(objetArme5, caseArme5);
  }

  consolePrint() {
    // Liste des cases
    console.log(this.listeCases);
     
    // Joueurs
    console.log(this.players[0]);
    console.log(this.players[1]);

    // Armes
    console.log(this.weapons[1]);
    console.log(this.weapons[2]);
    console.log(this.weapons[3]);
    console.log(this.weapons[4]);
  }
  
} // fin de la classe Map
