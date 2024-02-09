//mélange de Fischer-Yates
function shuffleChildren(parent){
    let children = parent.children;
    let i = children.length, k, temp;
    while(--i > 0){
        k = Math.floor(Math.random() * (i + 1));
        temp = children[k];
        children[k] = children[i];
        parent.appendChild(temp);
        }
}

//fonction d'ajout de classe avec timer (pour victoire, défaite, input invalide)
function showReaction(type, clickedBox){
    clickedBox.classList.add(type);
    setTimeout(function(){
        clickedBox.classList.remove(type,);
    }, 800)
}

// le chrono des ténèbres que j'ai complètement inventé de a à z
function chronoStart(){
    setInterval(function (){
        mili++;
            if (mili > 9) {
                mili = 0;
            }
    }, 1);
    
    centi++;
    centi*10;

    if (centi > 9) {
        centi = 0;
        sec++;
    }  

    if (sec < 10) {
        sec_ = "0" + sec;
    }
    else {
        sec_ = sec;
    }

    afficher = sec_ + ":" + centi + mili + " s";
    document.getElementById("timer").innerText = afficher;
    
    reglage = window.setTimeout("chronoStart();",100);
}

function chronoStop(){
    window.clearTimeout(reglage);
}

//---------------------------------------------------------------------------------------------------------------------------------------------

//création des éléments de la page (boite initiale et chronomètre)
const box = document.createElement("div");
box.classList.add("box");

const timer = document.createElement("time");
timer.id = "timer";

const board = document.querySelector("#board");
const time = document.querySelector("#time");

time.appendChild(timer);



//numéro de la boite à cliquer, initialisé à la même valeur que le compteur de la boucle for
let nb = 1;

//prompt demandant à l'utilisateur le nombre de boites à afficher
let nbBoites = prompt("Entrez le nombre de boites désiré :");

//initialisation du chrono à 0
let mili = 0;
let centi = 0;
let sec = 0;
timer.innerText = "0" + sec + ":" + "0" + mili +" s";

//de 1 à 10 inclu, on génère des clones de box, qui prennent en text l'iteration du compteur.
for(let i = 1; i <= nbBoites; i++){
    const newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);
    
    newbox.addEventListener("click", function(){
        //on vérifie que la case à le bon nombre avant de la rendre clickable
        if(i == nb){
            newbox.classList.add("box-valid");
            //cas de victoire
            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box);
                })
                nb = 1;
                board.querySelectorAll(".box-valid").forEach(function(validBox){
                    validBox.classList.remove("box-valid");
                })
                //afficher temps du tour dans la console
                console.log(`time : ${afficher}`);
                shuffleChildren(board);
            } else {
                //input valide, on incrémente nb pour match i
                nb++;
                //on re-shuffle pour rendre l'experience plus difficile
                shuffleChildren(board);
            }
        }
        //sinon cas d'erreur
        else if(i > nb){
            showReaction("error", newbox);
            nb = 1;
            board.querySelectorAll(".box-valid").forEach(function(validBox){
                validBox.classList.remove("box-valid");
            })
            //on re-shuffle pour rendre l'experience plus difficile
            shuffleChildren(board);
        }
        //sinon cas de re-clickage
        else{
            showReaction("notice", newbox);
        }
    })

    //gestion du chrono sur click
    newbox.addEventListener("click", function(){
        //si i = 1 (donc début partie) && nb = i + 1 (tour valide), démarrer chrono
        if(i == 1 && nb == i+1){
            chronoStart();
        }
        //sinon i = nbBoites (fin de la partie), stop chrono & reset chrono
        else if(i == nbBoites){
            chronoStop();
            mili = 0;
            centi = 0;
            sec = 0;
            timer.innerText = "0" + sec + ":" + "0" + mili +" s";
        }
    })
}

//shuffle de début de partie, s'éffectue à chaque refresh de page.
shuffleChildren(board);