/*----------------------------------------------------------------------
----------|| Initialisation des valeurs des objets du jeu ||------------
----------------------------------------------------------------------*/

const weapon1 = new Weapon("weapon1", "Lance", 10, 'media/armes/arme_1.png');
const weapon2 = new Weapon("weapon2", "Brise Crâne", 15, 'media/armes/arme_2.png');
const weapon3 = new Weapon("weapon3", "Épée", 20, 'media/armes/arme_3.png');
const weapon4 = new Weapon("weapon4", "Hache", 25, 'media/armes/arme_4.png');

const player1 = new Player("joueur1", "Arthur", 100, weapon1, 'media/joueurs/joueur_1_4.png');
const player2 = new Player("joueur2", "Lancelot", 100, weapon1, 'media/joueurs/joueur_2_4.png');

// MAP
const newMap = new GameMap('plateau', 6, 6, [player1, player2], [weapon1, weapon2, weapon3, weapon4]);
newMap.generateMap();

// console.log(player1.name + " & " + player2.name + " débutent la partie avec " + player1.health + " points de vie. Et l'arme : " + weapon1.name);

//GAME
const newGame = new Game();
newGame.setMove();

// Affichage visuel de la map
newMap.drawMap();


