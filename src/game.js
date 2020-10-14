/*----------------------------------------------------------------------
-------|| Gestion des mécanniques de déplacements et de combat ||-------
----------------------------------------------------------------------*/
class Game {
    constructor() {
        this.currentPlayer = player1;
        this.currentEnemy = player2;
        this.mapInfo = newMap;
    }

/*----------------------------------------------------------------------
-----------|| Affichage des mouv des joueurs possibles ||---------------
----------------------------------------------------------------------*/
    setMove() {
        //console.log(this.currentPlayer.weapon.name);   
        //let emptyCase = listeCases.filter(element => element.id === "casevide"); // filtre les cases du tableau ayant pour id casevide
        //console.log(emptyCase);

        let listeCases = this.mapInfo.listeCases; // récupère le tableau des cases
        let positionY = this.mapInfo.positionY;
        let positionX = this.mapInfo.positionX;
        let numeroCase = this.mapInfo.numeroCase;
        let joueur1 = listeCases.find(element => element.id === "joueur1");

        // Cases de gauche
        for (let i = 1; i <= 3; i++) {
            let casesGauche = joueur1.numeroCase - i;
            if (casesGauche >= 0 && !listeCases[casesGauche].id.includes('obstacle') && !listeCases[casesGauche].id.includes('joueur') && listeCases[casesGauche].positionX >= 0 && listeCases[casesGauche].positionX <= 480) {
                listeCases[casesGauche].id = 'casesAcess';
                this.mapInfo.context.fillStyle = "#7570633f";
                this.mapInfo.context.fillRect(listeCases[casesGauche].positionX, listeCases[casesGauche].positionY, 60, 60);
                this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
                console.log(casesGauche);
            } else {
                console.log('break à gauche');
                break;
            }
        }

        // Cases de droite
        for (let i = 1; i <= 3; i++) {
            let casesDroite = joueur1.numeroCase + i;
            if (casesDroite <= 99 && !listeCases[casesDroite].id.includes('obstacle') && !listeCases[casesDroite].id.includes('joueur') && listeCases[casesDroite].positionX >= 60 && listeCases[casesDroite].positionX <= 540) {
                listeCases[casesDroite].id = 'casesAcess';
                this.mapInfo.context.fillStyle = "#7570633f";
                this.mapInfo.context.fillRect(listeCases[casesDroite].positionX, listeCases[casesDroite].positionY, 60, 60);
                this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
                console.log(casesDroite);
            } else {
                console.log('break à droite');
                break;
            }
        }

        // Cases du haut
        for (let i = 1; i <= 3; i++) {
            let casesHaut = joueur1.numeroCase - (i * 10);
            if (casesHaut < 0 || listeCases[casesHaut].id.includes('obstacle') || listeCases[casesHaut].id.includes('joueur')) {
                console.log('break en haut');
                break;
            } else {
                listeCases[casesHaut].id = 'casesAcess';
                this.mapInfo.context.fillStyle = "#7570633f";
                this.mapInfo.context.fillRect(listeCases[casesHaut].positionX, listeCases[casesHaut].positionY, 60, 60);
                this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
                console.log(casesHaut);
            }
        }

        // Cases du bas
        for (let i = 1; i <= 3; i++) {
            let casesBas = joueur1.numeroCase + (i * 10);
            if (casesBas > 99 || listeCases[casesBas].id.includes('obstacle') || listeCases[casesBas].id.includes('joueur')) {
                console.log('break en bas');
                break;
            } else {
                listeCases[casesBas].id = 'casesAcess';
                this.mapInfo.context.fillStyle = "#7570633f";
                this.mapInfo.context.fillRect(listeCases[casesBas].positionX, listeCases[casesBas].positionY, 60, 60);
                this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
                console.log(casesBas);
            }
        }
    } // Fin fonction setMove

    /*----------------------------------------------------------------------
    --------------------|| Gestion du tour par tour ||----------------------
    ----------------------------------------------------------------------*/

} // Fin de la classe Game