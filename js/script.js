let hero = {
    nom: "haya",
    vie: 1000,
    vieMax: 1000,
    force: 20,
    baseFor: 10,
    baseDef: 10,
    defense: 10,
    vitesse: 8,
    mana: 100,
    magie: 30
};

let ennemi = {
    nom: "Tiamat",
    vie: 800,
    vieMax: 800,
    force: 15,
    maxFor: 40,
    defense: 10,
    baseDef: 10,
    vitesse: 5,
    mana: 100,
    magie: 50
};

//---------------Données Hero-----------------------------

let heroImg=document.getElementById("heroImg");
let nomHero=document.getElementById("hero");
let vieHero=document.getElementById("vie");
let forceHero=document.getElementById("force");
let defenseHero=document.getElementById("defense");
let vitesseHero=document.getElementById("vitesse");
let magieHero=document.getElementById("magie");
let manaHero=document.getElementById("mana");
let stackHeroAttaque=0;
let stackHerodefense=0;

nomHero.innerHTML=hero.nom;
vieHero.innerHTML=hero.vie;
forceHero.innerHTML=hero.force;
defenseHero.innerHTML=hero.defense;
vitesseHero.innerHTML=hero.vitesse;
magieHero.innerHTML=hero.magie;
manaHero.innerHTML=hero.mana;

//---------------Données Ennemi----------------------------

let ennemiImg=document.getElementById("ennemiImg");
let nomEnnemi=document.getElementById("ennemi");
let vieEnnemi=document.getElementById("vieEnnemi");
let forceEnnemi=document.getElementById("forceEnnemi");
let defenseEnnemi=document.getElementById("defenseEnnemi");
let vitesseEnnemi=document.getElementById("vitesseEnnemi");
let magieEnnemi=document.getElementById("magieEnnemi");
let manaEnnemi=document.getElementById("manaEnnemi");
let stackEnnemiAttaque=0;
let stackEnnemiDefense=0;

nomEnnemi.innerHTML=ennemi.nom;
vieEnnemi.innerHTML=ennemi.vie;
forceEnnemi.innerHTML=ennemi.force;
defenseEnnemi.innerHTML=ennemi.defense;
vitesseEnnemi.innerHTML=ennemi.vitesse;
magieEnnemi.innerHTML=ennemi.magie;
manaEnnemi.innerHTML=ennemi.mana;

//-------------------Bouttons-----------------------------

document.getElementById("btn-att").addEventListener("click", ()=>{
    attaque()
})
document.getElementById("btn-def").addEventListener("click", ()=>{
    defense()
})
document.getElementById("btn-heal").addEventListener("click", ()=>{
    heal()
})
document.getElementById("btn-stk").addEventListener("click", ()=>{
    stocker()
})

//----------------------- Stocker ------------------------

function stocker(){

    if(stackHeroAttaque<2){
        hero.defense=hero.baseDef;
        hero.force*=2;
        forceHero.innerHTML=hero.force;
        stackHeroAttaque+=1;
        npcTurn();
    } else {
        alert("l'attaque est déjà au maximum");
    }
}

//----------------------- Attaque ------------------------

function attaque(){     

    if(hero.vitesse>ennemi.vitesse){
        heroImg.classList.add("moveHero")
        ennemi.vie-=hero.force-ennemi.defense;
        setTimeout(() => {
            vieEnnemi.innerHTML=ennemi.vie;
            heroImg.classList.remove("moveHero");
        }, "300");
        setTimeout(() => {
            npcTurn();            
        }, "500");
    }else {
        npcTurn();
        console.log('attaque du joueur');
        ennemi.vie-=hero.force-ennemi.defense;
        vieEnnemi.innerHTML=ennemi.vie;
    }

    
    if(ennemi.vie<500){
        vieEnnemi.classList.add("orange");
    }
    
    if(ennemi.vie<150){
        vieEnnemi.classList.add("red");
    }
    
    if(ennemi.vie>=500){
        vieEnnemi.classList.remove("orange");
    }
    
    if(ennemi.vie>=150){
        vieEnnemi.classList.remove("red");
    }
    
    if (ennemi.vie <= 0) {
        alert(ennemi.nom + " est mort.");
        vieEnnemi.innerHTML=0;    
    }
    }


//----------------------- Defense ------------------------

function defense(){ 

        if(stackHerodefense<2){
            hero.defense*=2;
            defenseHero.innerHTML=hero.defense;
            stackHerodefense+=1;
            npcTurn();
        }else alert("la défense est au max")
}

//----------------------- Heal ------------------------

function heal(){

    
    if(hero.mana>9){

        let heroHeal=hero.vie+=hero.magie*3;

        if(heroHeal>hero.vieMax){
            hero.vie=hero.vieMax;
            hero.mana-=10;
            manaHero.innerHTML=hero.mana;
            vieHero.innerHTML=hero.vie;
            npcTurn();
        }else{ 
            hero.vie+=hero.magie*3;
            vieHero.innerHTML=hero.vie;
            hero.mana-=10;
            manaHero.innerHTML=hero.mana;
            npcTurn();
        }
    }else alert("mana insufisante");

    if(hero.mana<80){
        manaHero.classList.add("orange");
    }

    if(hero.mana<30){
        manaHero.classList.add("red");
    }
}

//----------------- Roulette Action NPC ------------------

function npcTurn(){

    action=Math.floor(Math.random()*4)+1;

    switch (action) {
        case 1:

            ennemi.defense=ennemi.baseDef;
            console.log('1 attaque');

            ennemiImg.classList.add("moveEnnemi");
            setTimeout(() => {
                hero.vie-=ennemi.force-hero.defense;
                vieHero.innerHTML=hero.vie;
                ennemiImg.classList.remove("moveEnnemi")
              }, "300");


            if (hero.vie <= 0) {
                alert(hero.nom + " est mort.");
            }
            break;

        case 2:

            if(stackEnnemiDefense<1){
                console.log("2 defense");
                ennemi.defense*=2;
                defenseEnnemi.innerHTML=ennemi.defense;
                stackEnnemiDefense+=1;
            }
            break;

        case 3:

            console.log("3 heal");
            
            if(ennemi.mana>=20){
                
                let ennemiHeal=ennemi.vie+=ennemi.magie*3;
                console.log("healed")

                if(ennemiHeal>ennemi.vieMax){
                    ennemi.vie=ennemi.vieMax;
                    ennemi.mana-=20;
                    manaEnnemi.innerHTML=ennemi.mana;
                    vieEnnemi.innerHTML=ennemi.vie;
                }else{ 
                    ennemi.vie+=ennemi.magie*3;
                    vieEnnemi.innerHTML=ennemi.vie;
                    ennemi.mana-=20;
                    manaEnnemi.innerHTML=ennemi.mana;
                }
                
                if(ennemi.mana<80){
                    manaEnnemi.classList.add("orange");
                }
            
                if(ennemi.mana<30){
                    manaEnnemi.classList.add("red");
                }

            }else console.log("ennemi no mana");

            break;

        case 4:

            if(stackEnnemiAttaque<3){
            console.log("4 stock");
            ennemi.force*=2;
            forceEnnemi.innerHTML=ennemi.force;
            stackEnnemiAttaque+=1;
            }
            break;

        default:
          console.log("5 pas d'action");
      }
}



/*let modal = document.getElementById("winModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
*/

/*
document.querySelector("button").addEventListener("click", ()=>{
    combat();
});

function combat() {
    
    while (hero.vie > 0 && ennemi.vie > 0) {
        
        tour(hero, ennemi);
        
        console.log(hero.nom + " : " + hero.vie + " points de vie");
        console.log(ennemi.nom + " : " + ennemi.vie + " points de vie");
    }
}

function tour(hero, ennemi) {
    
    const attaqueHero = hero.force - ennemi.defense;
    const attaqueEnnemi = ennemi.force - hero.defense;
    
    ennemi.vie -= attaqueHero;
    hero.vie -= attaqueEnnemi;
    
    console.log(hero.nom + " attaque " + ennemi.nom + " et lui inflige " + attaqueHero + " points de dégâts.");
    console.log(ennemi.nom + " attaque " + hero.nom + " et lui inflige " + attaqueEnnemi + " points de dégâts.");
    
    if (hero.vie <= 0) {
        console.log(hero.nom + " est mort.");
    }
    
    if (ennemi.vie <= 0) {
        console.log(ennemi.nom + " est mort.");
    }
}
*/

