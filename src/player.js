class Player{
    constructor(id, name, health, weapon, imgUrl){
        this.id = id;
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.defense = false;
        this.imgUrl = imgUrl;
        this.ancienne_arme = -1; // Si une autre arme est ramassée, celle équipée tombe sur l'emplacement
    }

    // Gestion d'un joueur touché
    isTouched(damage) {
        if (this.defense == true){
            this.health = this.health - (damage/2);
            this.defense = false;
        }
        else {
            this.health = this.health - damage;
        }
    }
    
    // Gestion de la défense des joueurs
    defend() {
        this.defense = true;
        return this.defense;
    }

    // Gestion du combat des joueurs
    fight(victim) {
        victim.isTouched(this.weapon.damage);
        return true;
    }
} 