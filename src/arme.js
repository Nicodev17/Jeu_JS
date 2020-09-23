class Arme {
    constructor(id, nom, degats, img) {
        this._id = id;
        this._nom = nom;
        this._degats = degats;
        this._img = img;
        
        /*
        switch(this.id) {
            case 1: // Arme de début (le case relie l'id de l'arme)
                this.degats = 10;
                this.nom = "Lance";
            break;

            case 2:
                this.degats = 15;
                this.nom = "Brise-Crâne";
            break;

            case 3:
                this.degats = 20;
                this.nom = "Épée";
            break;

            case 4:
                this.degats = 25;
                this.nom = "Hache";
            break;
        } 
        */
    }

 /* getVisuelArmeJoueur Récupère le chemin vers l'image de l'arme que le joueur vient de 
 récupérer pour ensuite l'utiliser pour afficher l'arme dans l'interface du joueur */

    getVisuelArmeJoueur() {
        return "img/arme" + String(this.id)+ ".png"; // @return {string} cherche le nom du fichier correspondant à l'id de l'arme
    }

};

