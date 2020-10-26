/*----------------------------------------------------------------------
-------|| Gestion des mécanniques de déplacements et de combat ||-------
----------------------------------------------------------------------*/
class Game {
    constructor(players, weapons) {
        this.players = players;
        this.weapons = weapons;
        this.mapInfo = newMap;
        this.currentPlayer = players[0];
        this.currentEnemy = players[1];
        this.casesAccess = [];
        this.caseClick = null;
    }

    /*----------------------------------------------------------------------
    -----------|| Affichage des mouv des joueurs possibles ||---------------
    ----------------------------------------------------------------------*/
    setMove() {
        let listeCases = this.mapInfo.listeCases;

        // Cases de gauche
        for (let i = 1; i <= 3; i++) {
            let casesGauche = this.currentPlayer.numeroCase - i;
            if (casesGauche >= 0 && !listeCases[casesGauche].id.includes('obstacle') && !listeCases[casesGauche].id.includes('joueur') && listeCases[casesGauche].positionX >= 0 && listeCases[casesGauche].positionX <= 480) {
                this.casesAccess.push(casesGauche);
                listeCases[casesGauche].type = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
                this.mapInfo.context.fillRect(listeCases[casesGauche].positionX, listeCases[casesGauche].positionY, 60, 60);
                //this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
            } else {
                break;
            }
        }

        // Cases de droite
        for (let i = 1; i <= 3; i++) {
            let casesDroite = this.currentPlayer.numeroCase + i;
            if (casesDroite <= 99 && !listeCases[casesDroite].id.includes('obstacle') && !listeCases[casesDroite].id.includes('joueur') && listeCases[casesDroite].positionX >= 60 && listeCases[casesDroite].positionX <= 540) {
                this.casesAccess.push(casesDroite);
                listeCases[casesDroite].type = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
                this.mapInfo.context.fillRect(listeCases[casesDroite].positionX, listeCases[casesDroite].positionY, 60, 60);
                //this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
            } else {
                break;
            }
        }

        // Cases du haut
        for (let i = 1; i <= 3; i++) {
            let casesHaut = this.currentPlayer.numeroCase - (i * 10);
            if (casesHaut < 0 || listeCases[casesHaut].id.includes('obstacle') || listeCases[casesHaut].id.includes('joueur')) {
                break;
            } else {
                this.casesAccess.push(casesHaut);
                listeCases[casesHaut].type = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
                this.mapInfo.context.fillRect(listeCases[casesHaut].positionX, listeCases[casesHaut].positionY, 60, 60);
                //this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
            }
        }

        // Cases du bas
        for (let i = 1; i <= 3; i++) {
            let casesBas = this.currentPlayer.numeroCase + (i * 10);
            if (casesBas > 99 || listeCases[casesBas].id.includes('obstacle') || listeCases[casesBas].id.includes('joueur')) {
                break;
            } else {
                this.casesAccess.push(casesBas);
                listeCases[casesBas].type = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
                this.mapInfo.context.fillRect(listeCases[casesBas].positionX, listeCases[casesBas].positionY, 60, 60);
                //this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
            }
        }

    } // Fin fonction setMove

    /*----------------------------------------------------------------------
    --------------------|| Gestion du tour par tour ||----------------------
    ----------------------------------------------------------------------*/
     setRound() {
        let players = this.players;
        
        if (this.currentPlayer == players[0]) {
            this.currentPlayer = players[1];
            this.currentEnemy = players[0];
        } else if (this.currentPlayer == players[1]) {
            this.currentPlayer = players[0];
            this.currentEnemy = players[1];
        }
    }

/*----------------------------------------------------------------------
----------|| Rafraichissement du canvas après déplacement ||------------
----------------------------------------------------------------------*/
    refreshCanvas() {
        this.mapInfo.generateMap();
        this.mapInfo.drawMap();
        this.mapInfo.assignObject();
        if(this.isNext()) {
            console.log('lancer le combat');
        } else {
            this.setMove();
        }
        console.log('[LE CANVAS EST ACTUALISÉ]');
    }

/*----------------------------------------------------------------------
---------------|| Fonction de passage au tour suivant ||----------------
----------------------------------------------------------------------*/

    nextRound() {
        let listeCases = this.mapInfo.listeCases;
        let canvas = this.mapInfo.canvas;
        let elemLeft = canvas.offsetLeft;
        let elemTop = canvas.offsetTop;

        // Evenement au clic
        canvas.addEventListener('click', event => {
            let x = event.pageX - elemLeft;
            let y = event.pageY - elemTop;

            // Association d'un n° à la case cliquée
            for (let i = 0; i <= 10; i++) { // 10 cases sur chaque lignes
                if (x <= (60 * i) && y <= 60) {
                    this.caseClick = i - 1;
                    break;
                } else if (x <= (60 * i) && y <= 120) {
                    this.caseClick = i + 9;
                    break;
                } else if (x <= (60 * i) && y <= 180) {
                    this.caseClick = i + 19;
                    break;
                } else if (x <= (60 * i) && y <= 240) {
                    this.caseClick = i + 29;
                    break;
                } else if (x <= (60 * i) && y <= 300) {
                    this.caseClick = i + 39;
                    break;
                } else if (x <= (60 * i) && y <= 360) {
                    this.caseClick = i + 49;
                    break;
                } else if (x <= (60 * i) && y <= 420) {
                    this.caseClick = i + 59;
                    break;
                } else if (x <= (60 * i) && y <= 480) {
                    this.caseClick = i + 69;
                    break;
                } else if (x <= (60 * i) && y <= 540) {
                    this.caseClick = i + 79;
                    break;
                } else if (x <= (60 * i) && y <= 600) {
                    this.caseClick = i + 89;
                    break;
                }
            }

            // Savoir si la case est accessible ou non
            if (listeCases[this.caseClick].type !== "casesAccess") {
                console.log('La case ' + this.caseClick + ' est inaccessible !');
            } else {
                // On réassigne le type 'inaccess' sur chacune des cases contenant le type 'casesAccess'
                for(let i = 0 ; i < this.casesAccess.length ; i++) {
                    let caseTest = this.casesAccess[i]; //recup de chaque case
                    listeCases[caseTest].type = 'inaccess';
                }
                this.getWeapon();
                // On déplace ensuite l'id du joueur
                listeCases[this.currentPlayer.numeroCase].id = 'casevide';
                listeCases[this.caseClick].id = this.currentPlayer.id;
                // On passe le tour au joueur adverse
                this.setRound();
                // On raffraichi le canvas
                this.refreshCanvas();
                console.log('C\'est à ' + this.currentPlayer.name + ' de jouer');
            }

        }, false); // fin event click

    } // Fin fonction nextRound

    // Stop de l'event listener du clic
    isNext(){
        //let canvas = this.mapInfo.canvas;

        //canvas.removeEventListener('click', event);

        if (this.currentPlayer.positionY == this.currentEnemy.positionY && (Math.abs(this.currentPlayer.numeroCase - this.currentEnemy.numeroCase) == 1 ) 
            || this.currentPlayer.positionX == this.currentEnemy.positionX && (Math.abs(this.currentPlayer.positionY - this.currentEnemy.positionY) < 120) ) {
            // condition fonctionnelle mais instruction non
            //this.removeListener();
            console.log('Les déplacements ne sont plus possibles !');
            return true;    
        } return false;
    }
/*----------------------------------------------------------------------
---------------|| Récupération d'une arme au passage ||-----------------
----------------------------------------------------------------------*/

    getWeapon(){
        let listeCases = this.mapInfo.listeCases;

        if(this.caseClick != null && listeCases[this.caseClick].id.includes('arme')){
            console.log('clic sur une arme');
        }
    }
    
    

} // Fin de la classe Game