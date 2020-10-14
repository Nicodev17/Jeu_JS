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

    this.generateObstacles();
    this.generatePlayers();
    this.generateWeapons();
    this.spawnNext();
    this.assignObject();
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
    console.log(listeCases);
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
          case "weapon2":
            image.src = weapon2.imgUrl;
            break
          case "weapon3":
            image.src = weapon3.imgUrl;
            break
          case "weapon4":
            image.src = weapon4.imgUrl;
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
      if (joueur1.positionY === joueur2.positionY && (Math.abs(joueur1.numeroCase - joueur2.numeroCase) == 1) || joueur1.positionX === joueur2.positionX && (Math.abs(joueur1.positionY - joueur2.positionY) < 120)) {
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
  ---|| Fonction assignant aux cases les prop de l'objet en question ||---
  ----------------------------------------------------------------------*/
  assignObject() {
    let listeCases = this.listeCases;
    // Joueurs
    //Cases
    let joueur1 = listeCases.find(element => element.id === "joueur1");
    let joueur2 = listeCases.find(element => element.id === "joueur2");
    //Objet (de la classe)
    let sourceJ1 = player1;
    let sourceJ2 = player2;

    const fusion1 = Object.assign(joueur1, sourceJ1);
    const fusion2 = Object.assign(joueur2, sourceJ2);

    // Armes
    let arme2 = listeCases.find(element => element.id === "arme2");
    let arme3 = listeCases.find(element => element.id === "arme3");
    let arme4 = listeCases.find(element => element.id === "arme4");
    let sourceArme2 = weapon2;
    let sourceArme3 = weapon3;
    let sourceArme4 = weapon4;

    const fusion3 = Object.assign(arme2, sourceArme2);
    const fusion4 = Object.assign(arme3, sourceArme3);
    const fusion5 = Object.assign(arme4, sourceArme4);

    console.log(fusion1);
    console.log(fusion2);
    console.log(fusion3);
    console.log(fusion4);
    console.log(fusion5);
  }
} // fin de la classe Map
