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
        this.victory;
    }
/*----------------------------------------------------------------------
------------------------|| Lancement du jeu  ||-------------------------
----------------------------------------------------------------------*/

startGame(){
    const buttonStart = document.querySelector('#buttonStart');
    const startScreen = document.querySelector('#startScreen');
    const musicAudio = document.querySelector('#audioGame');

    buttonStart.addEventListener("click", event => {
        startScreen.setAttribute('style', 'display:none');
        musicAudio.play();
        musicAudio.volume = 0.5;        
    });
}

/*----------------------------------------------------------------------
------------|| Affichage des mouv possibles du joueur  ||---------------
----------------------------------------------------------------------*/
    setMove() {
        let listeCases = this.mapInfo.listeCases;
        let players = this.players;
        let colorCaseDep;

        if(this.currentPlayer === players[0]){
            colorCaseDep = "#75706349";
        } else if (this.currentPlayer === players[1]){
            colorCaseDep = "#68522944";
        }

        // Cases de gauche
        for (let i = 1; i <= 3; i++) {
            let casesGauche = this.currentPlayer.numeroCase - i;
            if (casesGauche >= 0 && !listeCases[casesGauche].id.includes('obstacle') && !listeCases[casesGauche].id.includes('joueur') 
            && listeCases[casesGauche].positionX >= 0 && listeCases[casesGauche].positionX <= 480) {
                this.casesAccess.push(casesGauche);
                listeCases[casesGauche].type = 'casesAccess';
                this.mapInfo.context.fillStyle = colorCaseDep;
                this.mapInfo.context.fillRect(listeCases[casesGauche].positionX, listeCases[casesGauche].positionY, 60, 60);
            } else {
                break;
            }
        }

        // Cases de droite
        for (let i = 1; i <= 3; i++) {
            let casesDroite = this.currentPlayer.numeroCase + i;
            if (casesDroite <= 99 && !listeCases[casesDroite].id.includes('obstacle') && !listeCases[casesDroite].id.includes('joueur') 
            && listeCases[casesDroite].positionX >= 60 && listeCases[casesDroite].positionX <= 540) {
                this.casesAccess.push(casesDroite);
                listeCases[casesDroite].type = 'casesAccess';
                this.mapInfo.context.fillStyle = colorCaseDep;
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
                this.mapInfo.context.fillStyle = colorCaseDep;
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
                this.mapInfo.context.fillStyle = colorCaseDep;
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
            $("#imgJ1").css("border-bottom","5px solid rgba(94, 93, 90, 0)");
            $("#imgJ2").css("border-bottom","6px solid rgb(94, 93, 90)").css("border-bottom-style", "dotted");
        } else if (this.currentPlayer == players[1]) {
            this.currentPlayer = players[0];
            this.currentEnemy = players[1];
            $("#imgJ2").css("border-bottom","5px solid rgba(94, 93, 90, 0)");
            $("#imgJ1").css("border-bottom","6px solid rgb(94, 93, 90)").css("border-bottom-style", "dotted");
        }
    }

/*----------------------------------------------------------------------
----------|| Rafraichissement du canvas après déplacement ||------------
----------------------------------------------------------------------*/
    refreshCanvas() {
        let largeurMap = this.mapInfo.largeurMap;
        let hauteurMap = this.mapInfo.hauteurMap;

        this.mapInfo.context.clearRect(0, 0, largeurMap, hauteurMap);
        this.mapInfo.generateMap();
        this.mapInfo.drawMap();
        this.mapInfo.assignObject();
        if (this.isNext()) {
            console.log('Le combat débute');
            this.fightStart();
            this.fightPart();
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
        const elemLeft = canvas.offsetLeft;
        const elemTop = canvas.offsetTop;

        // Event au clic
        canvas.addEventListener('click', event => {
            const x = event.pageX - elemLeft;
            const y = event.pageY - elemTop;
            const bipAudio = document.querySelector('#bipAudio');

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
                bipAudio.play();
                bipAudio.volume = 0.2;
            } else {
                // On réassigne le type 'inaccess' sur chacune des cases contenant le type 'casesAccess'
                for (let i = 0; i < this.casesAccess.length; i++) {
                    let caseTest = this.casesAccess[i];
                    listeCases[caseTest].type = 'inaccess';
                }
                // Si clic sur une arme
                // Vidage de la case actuelle du joueur
                listeCases[this.currentPlayer.numeroCase].id = 'casevide';
                listeCases[this.currentPlayer.numeroCase].player = null;

                // Si le joueur est sur une case d'arme on remplace par l'ancienne arme
                if (listeCases[this.currentPlayer.numeroCase].weapon != null && listeCases[this.currentPlayer.numeroCase].weapon.includes('weapon')) {
                    listeCases[this.currentPlayer.numeroCase].weapon = this.currentPlayer.oldWeapon.id;
                    listeCases[this.currentPlayer.numeroCase].id = "weapon";
                    console.log('L\'arme de la case précédente a été changée');
                }

                this.getWeapon();
                
                // On écrit l'id du joueur sur la nouvelle case
                listeCases[this.caseClick].id = "joueur";
                listeCases[this.caseClick].player = this.currentPlayer.id;
                
                // On passe le tour au joueur adverse
                this.setRound();
                this.refreshCanvas();
                // On raffraichit le canvas
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
        let changeArme = '.arme_' + String(this.currentPlayer.id);
        let changeDegats = '#degats_' + String(this.currentPlayer.id);
        
        if (this.caseClick != null && listeCases[this.caseClick].id.includes('weapon')) {

            
            this.currentPlayer.oldWeapon = this.currentPlayer.weapon;
            
            console.log(this.currentPlayer.oldWeapon);

            switch (listeCases[this.caseClick].weapon) {
                case "weapon1":
                    this.currentPlayer.weapon = weapon1;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_1.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Lance de Gardien ~');
                    document.querySelector(changeArme).innerHTML = '<img src="media/armes/arme_1.png" alt="Arme 1"> </img>';
                    document.querySelector(changeDegats).innerHTML = weapon1.damage;  
                    break
                case "weapon2":
                    this.currentPlayer.weapon = weapon2;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_2.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Dague d\'Assassin ~');
                    document.querySelector(changeArme).innerHTML = '<img src="media/armes/arme_2.png" alt="Arme 2"> </img>';
                    document.querySelector(changeDegats).innerHTML = weapon2.damage;  
                    break
                case "weapon3":
                    this.currentPlayer.weapon = weapon3;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_3.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe le Brise Crâne de Barbare ~');
                    document.querySelector(changeArme).innerHTML = '<img src="media/armes/arme_3.png" alt="Arme 3"> </img>';
                    document.querySelector(changeDegats).innerHTML = weapon3.damage;  
                    break
                case "weapon4":
                    this.currentPlayer.weapon = weapon4;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_4.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe l\'Épée de Chevalier ~');
                    document.querySelector(changeArme).innerHTML = '<img src="media/armes/arme_4.png" alt="Arme 4"> </img>';
                    document.querySelector(changeDegats).innerHTML = weapon4.damage;  
                    break
                case "weapon5":
                    this.currentPlayer.weapon = weapon5;
                    this.currentPlayer.imgUrl = 'media/joueurs/' + String(this.currentPlayer.id) + '_5.png';
                    console.log('~ ' + this.currentPlayer.name + ' équipe la Hache de Berserk ~');
                    document.querySelector(changeArme).innerHTML = '<img src="media/armes/arme_5.png" alt="Arme 5"> </img>';
                    document.querySelector(changeDegats).innerHTML = weapon5.damage;  
                    break
            }
        }           
    }
/*----------------------------------------------------------------------
------------------------------|| COMBAT ||------------------------------
----------------------------------------------------------------------*/

    fightStart() {
        const zoneInfo = document.querySelector(".overlay");
        const infoStartFight = document.querySelector(".gameInfo");

        zoneInfo.setAttribute('style', 'visibility:visible');
        infoStartFight.setAttribute('style', 'display:block');
        $(".gameInfo").delay(1500).fadeOut("slow")
    }

    fightPart() {
        const zoneInfo = document.querySelector(".overlay");
        const chooseFight = document.querySelector(".combatInfo");
        const buttonAttack = document.querySelector("#buttonAttack");
        const buttonDefend = document.querySelector("#buttonDefend");
        const textFight = document.querySelector("#textCombat");
        const startAndEndFight = document.querySelector(".gameInfo");
        const buttonReplay = document.querySelector("#buttonReplay");
        
        textFight.innerHTML = this.currentPlayer.name + " souhaites-tu attaquer ou te défendre ?";
        
        chooseFight.setAttribute('style', 'visibility:visible');
        $(".combatInfo").delay(2000).fadeIn("slow")
        
        buttonAttack.addEventListener("click", event => {
            console.log('Le joueur ' + this.currentPlayer.name + ' a choisi d\'attaquer !');
            this.chooseAttack()
            this.setRound();

            textFight.innerHTML = this.currentPlayer.name + " souhaites-tu attaquer ou te défendre ?";

            // Détection de la victoire
            if(this.victory == 1){
                chooseFight.setAttribute('style', 'display:none');
                startAndEndFight.setAttribute('style', 'display:block');
                startAndEndFight.innerHTML = '<p> Bien joué ! ' + this.currentEnemy.name + ' a vaincu ' + this.currentPlayer.name + ' et remporte le combat.</p>';
                // Bouton rejouer une partie
                buttonReplay.setAttribute('style', 'display:block');
                buttonReplay.addEventListener("click", event => {
                    window.location.reload();
                });
            }
        });
        
        buttonDefend.addEventListener("click", event => {
            console.log('Le joueur ' + this.currentPlayer.name + ' a choisi de se défendre !');
            this.chooseDefend();
            this.setRound();
            textFight.innerHTML = this.currentPlayer.name + " souhaites-tu attaquer ou te défendre ?";
        });
    }

    chooseAttack(){
        let weaponWearDamage = this.currentPlayer.weapon.damage;
        const changeVita = '#ptsVie_' + String(this.currentEnemy.id);
        const updateBarre = '#barre_' + String(this.currentEnemy.id);
        const changeImgDeath = '.image_' + String(this.currentEnemy.id);
        const changeImgVictory = '.image_' + String(this.currentPlayer.id);
        
        if (this.currentEnemy.defense == true){
            this.currentEnemy.health = this.currentEnemy.health - (weaponWearDamage/2);
            this.currentEnemy.defense = false;
        } else {
            this.currentEnemy.health = this.currentEnemy.health - weaponWearDamage;
        }
        console.log('L\'attaque de ' + this.currentPlayer.name + ' réduit la vie de ' + this.currentEnemy.name + ' à ' + this.currentEnemy.health);

        // Pour empecher des PV negatifs
        if(this.currentPlayer.health < 0 || this.currentEnemy.health < 0){
            this.currentPlayer.health = 0;
            this.currentEnemy.health = 0;
        }

        document.querySelector(changeVita).innerHTML = this.currentEnemy.health;
        
        $(updateBarre).animate({
            "value": this.currentEnemy.health
        }, 800, "swing");
        
        // Victoire
        if(this.currentPlayer.health <= 0 || this.currentEnemy.health <= 0){
            document.querySelector(changeImgDeath).innerHTML = '<img src="media/affichage/face_' + String(this.currentEnemy.id) + '_defaite.png" > </img>';
            document.querySelector(changeImgVictory).innerHTML = '<img src="media/affichage/face_' + String(this.currentPlayer.id) + '_victoire.png" > </img>';
            console.log('Le combat est terminé ! ' + this.currentPlayer.name + ' a gagné l\'affrontement !');
            this.victory = 1;
        }
    }

    chooseDefend(){
        let weaponEnemy = this.currentEnemy.weapon.damage;
        let damageDivised = weaponEnemy /2;
        
        this.currentPlayer.defense = true;
        console.log('L\'arme de ' + this.currentEnemy.name + ' va causer ' + damageDivised + ' de dégats à ' + this.currentPlayer.name + ' au tour suivant');
        return this.currentPlayer.defense;
    }

} // Fin de la classe Game