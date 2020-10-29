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
        this.oldWeapon;
        this.caseArmeClick;
        this.caseArmeClickId;
    }

/*----------------------------------------------------------------------
------------|| Affichage des mouv possibles du joueur  ||---------------
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
        if (this.isNext()) {
            console.log('lancer le combat');
        } else {
            this.setMove();
        }
        console.log('[Le canvas est actualisé]');
    }

/*----------------------------------------------------------------------
---------------|| Fonction de passage au tour suivant ||----------------
----------------------------------------------------------------------*/

    nextRound() {
        let listeCases = this.mapInfo.listeCases;
        let canvas = this.mapInfo.canvas;
        let elemLeft = canvas.offsetLeft;
        let elemTop = canvas.offsetTop;

        // Event au clic
        canvas.addEventListener('click', event => {
            let x = event.pageX - elemLeft;
            let y = event.pageY - elemTop;

            // Association d'un n° à la case cliquée
            for (let i = 0; i <= 10; i++) {
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
                for (let i = 0; i < this.casesAccess.length; i++) {
                    let caseTest = this.casesAccess[i];
                    listeCases[caseTest].type = 'inaccess';
                }
                // Si clic sur une arme
                this.getWeapon();
                
                // Vidage de la case actuelle du joueur
                listeCases[this.currentPlayer.numeroCase].id = 'casevide';
                // Si le joueur est sur une case d'arme on remplace par l'ancienne arme
                if (this.caseArmeClick != undefined && listeCases[this.currentPlayer.numeroCase].numeroCase === this.caseArmeClick && listeCases[this.caseClick].id.includes('casevide')) {
                    listeCases[this.caseArmeClick].id = this.oldWeapon;
                    console.log('arme de la case précédente changée');
                } else if (!listeCases[this.caseClick].id.includes('casevide')) {
                    // ici la condition est mauvaise puisque le 'test' ne devrait s'afficher que lorsqu'on passe d'une case arme a une autre case arme !
                    // On pourra ensuite appliquer l'ancienne arme a l'ancienne case
                    console.log('test');
                }
                // On écrit l'id du joueur sur la nouvelle case
                listeCases[this.caseClick].id = this.currentPlayer.id;
                // On passe le tour au joueur adverse
                this.setRound();
                // On raffraichit le canvas
                this.refreshCanvas();
                console.log('=> C\'est à ' + this.currentPlayer.name + ' de jouer');

            }

        }, false); // fin fonction event click

    } // Fin fonction nextRound

/*----------------------------------------------------------------------
-------|| Arrêt des déplacements quand les joueurs sont à côté ||-------
----------------------------------------------------------------------*/
    isNext() {
        if (this.currentPlayer.positionY == this.currentEnemy.positionY && (Math.abs(this.currentPlayer.numeroCase - this.currentEnemy.numeroCase) == 1)
            || this.currentPlayer.positionX == this.currentEnemy.positionX && (Math.abs(this.currentPlayer.positionY - this.currentEnemy.positionY) < 120)) {
            console.log('Les déplacements ne sont plus possibles !');
            return true;
        } return false;
    }

/*----------------------------------------------------------------------
---------------|| Récupération d'une arme au passage ||-----------------
----------------------------------------------------------------------*/
    getWeapon() {
        let listeCases = this.mapInfo.listeCases;
        
        if (this.caseClick != null && listeCases[this.caseClick].id.includes('weapon')) {

            // Ancienne arme
            this.oldWeapon = this.currentPlayer.weapon.id;
            // Quand la case cliquée est une arme, on attribue à la variable caseArmeClick le numero de la case cliquée
            this.caseArmeClick = listeCases[this.caseClick].numeroCase;

            switch (listeCases[this.caseClick].id) {
                case "weapon1":
                    this.currentPlayer.weapon = weapon1;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_1.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Lance de Gardien ~');
                    break
                case "weapon2":
                    this.currentPlayer.weapon = weapon2;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_2.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Dague d\'Assassin ~');
                    break
                case "weapon3":
                    this.currentPlayer.weapon = weapon3;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_3.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe le Brise Crâne de Barbare ~');
                    break
                case "weapon4":
                    this.currentPlayer.weapon = weapon4;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_4.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe l\'Épée de Chevalier ~');
                    break
                case "weapon5":
                    this.currentPlayer.weapon = weapon5;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_5.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Hache de Berserk ~');
                    break
            }
        }           
    }
} // Fin de la classe Game