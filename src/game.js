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
--------------|| Déplacements possibles des joueurs ||------------------
----------------------------------------------------------------------*/

setMove() {
    //console.log(this.currentPlayer.weapon.name);   
    //let emptyCase = listeCases.filter(element => element.id === "casevide"); // filtre les cases ayant pour id casevide
    //console.log(emptyCase);

    // Algorithme verbal pour la récupération des cases de déplacement :
        // Il nous faut les 3 cases précédant le joueur sur la même ligne
            // Sauf s'il se trouve à moins de 3 cases de la limite gauche de la map (dans ce cas break);
        // Les 3 cases suivant le joueur sur la même ligne
            // Sauf s'il se trouve à moins de 3 cases de la limite droite de la map (dans ce cas break);
        // Il nous faut les 3 cases au dessus du joueur sur la même colonne
            // Sauf s'il se trouve à moins de 3 cases de la limite haute de la map (dans ce cas break);
        // Les 3 cases en dessous du joueur sur la même colonne
            // Sauf s'il se trouve à moins de 3 cases de la limite basse de la map (dans ce cas break);

        /* Pour cela nous allons récupérer la position actuelle du joueur courrant et créer une boucle pour chaque direction de cases, 
         en selectionnant ces cases grâce aux numéros de case pour les cases horizontales (qui se suivent) 
         et grâce aux positions des cases en Y (colonne) pour les cases verticales */

    let listeCases = this.mapInfo.listeCases; // récupère le tableau des cases
    let positionY = this.mapInfo.positionY;
    let positionX = this.mapInfo.positionX;
    let numeroCase = this.mapInfo.numeroCase;
    let joueur1 = listeCases.find(element => element.id === "joueur1");
    
    // Cases gauche
    for( let i = 1 ; i <= 3 ; i++) {
        let casesGauche = joueur1.numeroCase - i ;
        if (listeCases[casesGauche].id === 'casevide' && listeCases[casesGauche].positionX >= 0 && listeCases[casesGauche].positionX <= 480) {
            console.log(casesGauche);
            listeCases[casesGauche].id = 'casesAcess';
            } else {
            console.log('ça déborde à gauche');
            break;
            }
    }

    // Cases droite
    for( let i = 1 ; i <= 3 ; i++) {
        let casesDroite = joueur1.numeroCase + i ;
        if (listeCases[casesDroite].id === 'casevide' && listeCases[casesDroite].positionX >= 60 && listeCases[casesDroite].positionX <= 540) {
        console.log(casesDroite);
        listeCases[casesDroite].id = 'casesAcess';
        } else {
        console.log('ça déborde à droite');
        break;
        }
    }

    /*

    // Cases Haut
    for( let i = 1 ; i <= 3 ; i++) {
        let casesHaut = joueur1.positionY - (i*60);
        if (listeCases[casesHaut].id === 'casevide' && listeCases[casesHaut].positionY >= 60 && listeCases[casesHaut].positionY <= 540) {
        console.log(casesHaut);
        listeCases[casesHaut].id = 'casesAcess';
        } else {
        console.log('ça déborde en haut');
        break;
        }
    }

    // Cases Bas
    for( let i = 1 ; i <= 3 ; i++) {
        let casesBas = joueur1.positionY + (i*60) ;
        if (listeCases[casesBas].id === 'casevide' && listeCases[casesBas].positionY >= 60 && listeCases[casesBas].positionY <= 540) {
        console.log(casesBas);
        listeCases[casesBas].id = 'casesAcess';
        } else {
        console.log('ça déborde en bas');
        break;
        }
    }

    */

} // Fin fonction setmove

/*----------------------------------------------------------------------
--------------------|| Gestion du tour par tour ||----------------------
----------------------------------------------------------------------*/

} // Fin de la classe Game


/* // Tests
let statJoueur1 = document.querySelector(".statPlayer1");
statJoueur1.addEventListener('click', function () {
    document.querySelector(".test").innerHTML = "Ca marche !";
});


let statJoueur2 = document.querySelector(".statPlayer2");
statJoueur2.addEventListener('click', function () {
    document.querySelector(".test2").innerHTML = "Ca marche !";
});

let statArmes = document.querySelector(".statWeapons");
statArmes.addEventListener('click', function () {
    document.querySelector(".test3").innerHTML = "Ca marche !";
});

*/