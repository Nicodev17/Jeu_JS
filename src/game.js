// Tests
let statJoueur1 = document.querySelector(".statPlayer1");
statJoueur1.addEventListener('click', function() {
    document.querySelector(".test").innerHTML = "Ca marche !";
} );


let statJoueur2 = document.querySelector(".statPlayer2");
statJoueur2.addEventListener('click', function() {
    document.querySelector(".test2").innerHTML = "Ca marche !";
} );

let statArmes = document.querySelector(".statWeapons");
statArmes.addEventListener('click', function() {
    document.querySelector(".test3").innerHTML = "Ca marche !";
} );

/*----------------------------------------------------------------------
--------------------|| Gestion du tour par tour ||----------------------
----------------------------------------------------------------------*/

