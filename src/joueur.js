class Joueur {
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
        this.armes = new Arme(1); // Confère au joueur l'arme de base au début de la partie
        this.visuel = getVisuelJoueur();
        this.action = false; // Attaque : true / Défense : false
        this.pv = 100;
        this.position = [-1, -1],
        this.ancienne_arme = -1; // Si une autre arme est ramassée, celle équipée tombe sur l'emplacement
    }

};