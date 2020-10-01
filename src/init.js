/*----------------------------------------------------------------------
---------|| Initialisation des valeurs des objets du jeu ||----------
----------------------------------------------------------------------*/

const weapon1 = new Weapon("weapon1", "Lance", 10, '<img src="./media/armes/arme_1.png" alt="Image de la Lance"> </img>');
const weapon2 = new Weapon("weapon2", "Brise Crâne", 15, '<img src="./media/armes/arme_2.png" alt="Image du Brise Crâne"> </img>');
const weapon3 = new Weapon("weapon3", "Épée", 20, '<img src="./media/armes/arme_3.png" alt="Image de l\'Épée> </img>');
const weapon4 = new Weapon("weapon4", "Hache", 25, '<img src="./media/armes/arme_4.png" alt="Image de la Hache"> </img>');

const player1 = new Player("Arthur", "player1", 100, weapon1, '<img src="./media/joueurs/joueur_1_1.png" alt="Image du joueur 1"> </img>');
const player2 = new Player("Lancelot", "player2", 100, weapon1, '<img src="./media/joueurs/joueur_2_1.png" alt="Image du joueur 2"> </img>');

const newMap = new GameMap('plateau', 12, [player1, player2], [weapon1, weapon2, weapon3, weapon4]);

newMap.generateMap();
newMap.generateObstacles();
newMap.generatePlayers();
//newMap.generateWeapons();