class Weapon {
        constructor(id, name, damage, imgUrl){
            this.id = id;
            this.name = name;
            this.damage = damage;
            this.imgUrl = imgUrl;
        }

 /* getVisuelArmeJoueur Récupère le chemin vers l'image de l'arme que le joueur vient de 
 récupérer pour ensuite l'utiliser pour afficher l'arme dans l'interface du joueur */

    getVisuelArmeJoueur() {
        return "img/arme" + String(this.id)+ ".png"; // @return {string} cherche le nom du fichier correspondant à l'id de l'arme
    }

};

