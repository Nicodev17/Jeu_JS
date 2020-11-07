/*----------------------------------------------------------------------
----------|| Initialisation des valeurs des objets du jeu ||------------
----------------------------------------------------------------------*/

const weapon1 = new Weapon("weapon1", "Lance de Gardien", 10, 'media/armes/arme_1.png');
const weapon2 = new Weapon("weapon2", "Dague d'Assassin", 15, 'media/armes/arme_2.png');
const weapon3 = new Weapon("weapon3", "Brise Crâne de Barbare", 15, 'media/armes/arme_3.png');
const weapon4 = new Weapon("weapon4", "Épée de Chevalier", 20, 'media/armes/arme_4.png');
const weapon5 = new Weapon("weapon5", "Hache de Berserk", 25, 'media/armes/arme_5.png');

const player1 = new Player("joueur1", "Arthur", 100, weapon1, 'media/joueurs/joueur1_1.png', weapon1);
const player2 = new Player("joueur2", "Lancelot", 100, weapon1, 'media/joueurs/joueur2_1.png', weapon1);

//canvasUpdate();

// MAP
const newMap = new GameMap('plateau', 6, 6, [player1, player2], [weapon1, weapon2, weapon3, weapon4, weapon5]);

musicButton();

newMap.generateMap();
newMap.generateObstacles();
newMap.generatePlayers();
newMap.generateWeapons();
newMap.spawnNext();
newMap.assignObject();

// fonction temporaire
newMap.consolePrint();

//GAME
const newGame = new Game([player1, player2], [weapon1, weapon2, weapon3, weapon4, weapon5]);

// Lancement du jeu
newGame.startGame();
newGame.setMove();
newGame.nextRound();

// Affichage visuel initial de la map
newMap.drawMap();