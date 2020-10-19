/*----------------------------------------------------------------------
-------|| Gestion des mécanniques de déplacements et de combat ||-------
----------------------------------------------------------------------*/
class Game {
    constructor() {
        this.mapInfo = newMap;
        this.currentPlayer = this.mapInfo.listeCases.find(element => element.id === "joueur1");
        this.currentEnemy = this.mapInfo.listeCases.find(element => element.id === "joueur2");
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
                listeCases[casesGauche].id = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
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
            let casesDroite = this.currentPlayer.numeroCase + i;
            if (casesDroite <= 99 && !listeCases[casesDroite].id.includes('obstacle') && !listeCases[casesDroite].id.includes('joueur') && listeCases[casesDroite].positionX >= 60 && listeCases[casesDroite].positionX <= 540) {
                listeCases[casesDroite].id = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
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
            let casesHaut = this.currentPlayer.numeroCase - (i * 10);
            if (casesHaut < 0 || listeCases[casesHaut].id.includes('obstacle') || listeCases[casesHaut].id.includes('joueur')) {
                console.log('break en haut');
                break;
            } else {
                listeCases[casesHaut].id = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
                this.mapInfo.context.fillRect(listeCases[casesHaut].positionX, listeCases[casesHaut].positionY, 60, 60);
                this.mapInfo.drawMap();
                this.mapInfo.spawnNext();
                console.log(casesHaut);
            }
        }
        
        // Cases du bas
        for (let i = 1; i <= 3; i++) {
            let casesBas = this.currentPlayer.numeroCase + (i * 10);
            if (casesBas > 99 || listeCases[casesBas].id.includes('obstacle') || listeCases[casesBas].id.includes('joueur')) {
                console.log('break en bas');
                break;
            } else {
                listeCases[casesBas].id = 'casesAccess';
                this.mapInfo.context.fillStyle = "#75706349";
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

// Si au lancement le currentPlayer est le joueur 1 au tour 2 le currentPlayer sera le joueur 2 et le currentEnemy le joueur 1, 
// il faut simplement réafecter les variables à chaque tour avec les objets des joueurs (player1 et player2)

    setRound() {
        if (this.currentPlayer === player1) {
            this.currentPlayer === player2;
            this.currentEnemy === player1;
        } else {
            this.currentPlayer === player1;
            this.currentEnemy === player2;
        }
        // Tant que les joueurs ne sont pas côte à côte (= début d'un combat) on réaffiche les cases de dep dispo pour chaque joueur a tour de rôle
        /*
        while(this.currentPlayer.positionY !== this.currentEnemy.positionY && (Math.abs(this.currentPlayer.numeroCase - this.currentEnemy.numeroCase) != 1) 
        || this.currentPlayer.positionX !== this.currentEnemy.positionX && (Math.abs(this.currentPlayer.positionY - this.currentEnemy.positionY) > 120) ) {
            break;
        } */
    }

    nextRound() {
        let listeCases = this.mapInfo.listeCases;
        let canvas = this.mapInfo.canvas;
        let elemLeft = canvas.offsetLeft;
        let elemTop = canvas.offsetTop;
        let casesAccess = listeCases.filter(element => element.id === "casesAccess");
        
        canvas.addEventListener('click', function(event) {
            let x = event.pageX - elemLeft;
            let y = event.pageY - elemTop;

           console.log(x, y);
            
            for( let i = 0 ; i <= 10 ; i++) { // 10 cases sur chaque lignes
                //première ligne : OK
                if( x <= (60 * i) && y <= 60 ) {
                    console.log('Clic en case ' + (i - 1));
                    break;
                } else if( x <= (60 * i) && y <= 120) {
                    console.log('Clic en case ' + (i + 9));
                    break;
                }
                else if( x <= (60 * i) && y <= 180 ) {
                    console.log('Clic en case ' + (i + 19));
                    break;
                } else if( x <= (60 * i) && y <= 240 ) {
                    console.log('Clic en case ' + (i + 29));
                    break;
                } else if( x <= (60 * i) && y <= 300 ) {
                    console.log('Clic en case ' + (i + 39));
                    break;
                } else if( x <= (60 * i) && y <= 360 ) {
                    console.log('Clic en case ' + (i + 49));
                    break;
                } else if( x <= (60 * i) && y <= 420 ) {
                    console.log('Clic en case ' + (i + 59));
                    break;
                } else if( x <= (60 * i) && y <= 480 ) {
                    console.log('Clic en case ' + (i + 69));
                    break;
                } else if( x <= (60 * i) && y <= 540 ) {
                    console.log('Clic en case ' + (i + 79));
                    break;
                } else if( x <= (60 * i) && y <= 600 ) {
                    console.log('Clic en case ' + (i + 89));
                    break;
                }
            }
        }, false );

    } // Fin fonction nextRound

} // Fin de la classe Game