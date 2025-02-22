var alleBuchstaben = Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var reelleRunde = 0;
var rundeZuZeigen = 0;
var ShowTimerMinutes;
var timerSecondsTotal;
var ShowTimerSeconds;
let timerAktiv;
import { daten } from "./daten.js";





window.onload = function(){ //gespeicherte werte übernehmen
    if(localStorage.getItem("aktuellesSpiel") != null){
        alleBuchstaben = JSON.parse(localStorage.getItem("aktuellesSpiel"));
    } else {
        alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

        shuffle(alleBuchstaben);
    }

    if(localStorage.getItem("rundeZuZeigenSpeichern") != null){
        rundeZuZeigen = JSON.parse(localStorage.getItem("rundeZuZeigenSpeichern"));
    } else {
        rundeZuZeigen = 0;
    }
    
    if(localStorage.getItem("reelleRundeSpeichern") != null){
        reelleRunde = JSON.parse(localStorage.getItem("reelleRundeSpeichern"));
    } else {
        reelleRunde = 0;
    }
    


    buchstabenUpdaten();

    zeitAnzeigen();

    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: " + (reelleRunde + 1); //runde updaten + anzeigen






    // console.log(JSON.parse(localStorage.getItem("aktuellesSpiel"))); //testen
    // console.log(JSON.parse(localStorage.getItem("rundeZuZeigenSpeichern"))); //testen
    // console.log("real: " + JSON.parse(localStorage.getItem("reelleRundeSpeichern"))); //testen
}






function changeBackgroundColor(color){
    document.body.style.background = color;
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function buchstabenUpdaten(){

    var ergebnisAnzeige = [document.getElementById("p_Anzeige_buchstabe1"), document.getElementById("p_Anzeige_buchstabe2"),
        document.getElementById("p_Anzeige_buchstabe3"), document.getElementById("p_Anzeige_buchstabe4"), document.getElementById("p_Anzeige_buchstabe5")]; //alle referenzen


    for (let i = -2; i <= 2; i++) { //buchstaben updaten
        let index = rundeZuZeigen + i;
        let feld = ergebnisAnzeige[i + 2]; //das jeweilige Feld

        feld.classList.remove("aktuelles_Feld");

        if (index < 0 || index >= alleBuchstaben.length) {
            feld.innerText = ""; // Verhindert Fehler, falls Index außerhalb des Arrays
        } else if (index > reelleRunde) {
            feld.innerText = "?"; // Falls noch nicht freigeschaltet
        } else {
            feld.innerText = alleBuchstaben[index]; // Normale Anzeige

            if(index === reelleRunde){ //klasse adden
                feld.classList.add("aktuelles_Feld");
            }
        }
    }
}

function updateBeispiele(kategorie){
    document.getElementById("div_Beispiele").innerText = daten[alleBuchstaben[rundeZuZeigen].toLowerCase()][kategorie.toLowerCase()];
}



function rad(weiter){


    if(weiter === true && rundeZuZeigen < (alleBuchstaben.length - 1)){ //runden updaten
        if(rundeZuZeigen === reelleRunde){
            reelleRunde++;
            localStorage.setItem("reelleRundeSpeichern", JSON.stringify(reelleRunde)); //reelleRunde speichern
            rundeZuZeigen++;
            localStorage.setItem("rundeZuZeigenSpeichern", JSON.stringify(rundeZuZeigen)); //rundeZuZeigen speichern
        }else{
            rundeZuZeigen++;
            localStorage.setItem("rundeZuZeigenSpeichern", JSON.stringify(rundeZuZeigen)); //rundeZuZeigen speichern
        }
    } else if(weiter === false && rundeZuZeigen > 0){
        rundeZuZeigen--;
        localStorage.setItem("rundeZuZeigenSpeichern", JSON.stringify(rundeZuZeigen)); //rundeZuZeigen speichern
    }



    buchstabenUpdaten();



    // console.log("reelleRunde: " + reelleRunde);
    // console.log("rundeZuZeigen: " + rundeZuZeigen);

    // console.log("weiter: " + weiter);

    
    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: " + (reelleRunde + 1); //runde updaten + anzeigen
}

function aktuelleRunde(){ //zur aktuellen Runde springen
    rundeZuZeigen = reelleRunde;
    

    buchstabenUpdaten();
}

function neuesSpielStarten(){
    alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

    shuffle(alleBuchstaben);

    console.log(alleBuchstaben); //testen

    

    

    reelleRunde = 0;
    localStorage.setItem("reelleRundeSpeichern", JSON.stringify(reelleRunde)); //reelleRunde speichern
    rundeZuZeigen = 0;
    localStorage.setItem("rundeZuZeigenSpeichern", JSON.stringify(rundeZuZeigen)); //rundeZuZeigen speichern

    document.getElementById("p_Anzeige_buchstabe3").innerText = alleBuchstaben[0];

    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: 1"; //runde updaten zurücksetzen



    localStorage.setItem("aktuellesSpiel", JSON.stringify(alleBuchstaben));


    buchstabenUpdaten();
}





function StoppuhrAuslösen(){
    changeBackgroundColor("white");

    if(document.getElementById("input_Stoppuhr_Zeit").value > 0){
    ShowTimerMinutes = document.getElementById("input_Stoppuhr_Zeit").value; //timer Minuten insgesamt
    } else{
    ShowTimerMinutes = 2;
    }

    timerSecondsTotal = ShowTimerMinutes * 60; //timer Sekunden insgesamt

    timerSecondsTotal++ //für die erste sekunde anzeigen
    StoppuhrUpdaten();

    if(timerAktiv === undefined){
    timerAktiv = setInterval(StoppuhrUpdaten, 1000); //timer aktivieren (kann nur einmal ausgeführt werden)
    }
}

function StoppuhrUpdaten(){
    timerSecondsTotal--;
    ShowTimerMinutes = Math.trunc(timerSecondsTotal / 60);
    ShowTimerSeconds = timerSecondsTotal - (ShowTimerMinutes * 60); //showTimerMinutes und showTimerSeconds

    if(ShowTimerMinutes <= 0 && ShowTimerSeconds <= 0){ //wenn beides = 0, reset
        clearInterval(timerAktiv);
        timerAktiv = undefined;
        changeBackgroundColor("orange");
    }

    if(ShowTimerMinutes < 10){
        ShowTimerMinutes = "0" + ShowTimerMinutes; //2:0 -> 02:00
    }
    if(ShowTimerSeconds < 10){
        ShowTimerSeconds = "0" + ShowTimerSeconds;
    }

    document.getElementById("p_Anzeige_Stoppuhr").innerText = ShowTimerMinutes + " : " + ShowTimerSeconds; //zeit anzeigen

    //console.log(ShowTimerMinutes, ShowTimerSeconds, timerSecondsTotal, timerAktiv); //testen
}

function StoppuhrBeenden(){ //alles resetten
    clearInterval(timerAktiv);

    timerAktiv = undefined;

    changeBackgroundColor("white");

    zeitAnzeigen();
}

function zeitAnzeigen(){
    if(document.getElementById("input_Stoppuhr_Zeit").value > 0){
        ShowTimerMinutes = document.getElementById("input_Stoppuhr_Zeit").value; //timer Minuten insgesamt
        } else{
        ShowTimerMinutes = 2;
        }
    
    timerSecondsTotal = ShowTimerMinutes * 60; //timer Sekunden insgesamt

    ShowTimerMinutes = Math.trunc(timerSecondsTotal / 60);
    ShowTimerSeconds = timerSecondsTotal - (ShowTimerMinutes * 60); //showTimerMinutes und showTimerSeconds

    if(ShowTimerMinutes < 10){
        ShowTimerMinutes = "0" + ShowTimerMinutes; //2:0 -> 02:00
    }
    if(ShowTimerSeconds < 10){
        ShowTimerSeconds = "0" + ShowTimerSeconds;
    }
    
    document.getElementById("p_Anzeige_Stoppuhr").innerText = ShowTimerMinutes + " : " + ShowTimerSeconds; //zeit anzeigen
}







// Array der Kategorien
const kategorien = ["Stadt", "Land", "Fluss", "Tier", "Pflanze", "Beruf"];

// Funktion zum Erstellen der Dropdown-Textinhalte
function generateDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");

    // Für jede Kategorie im Array einen neuen Text erstellen
    kategorien.forEach(function(kategorie) {
        const spanTag = document.createElement("span"); // Erstelle ein <span>-Element
        spanTag.textContent = kategorie; // Setze den Text des Elements auf den Namen der Kategorie

        spanTag.addEventListener("click", () => updateBeispiele(kategorie));

        dropdownContent.appendChild(spanTag); // Füge den Text zum Dropdown hinzu

    });
}

// Aufruf der Funktion, um das Dropdown-Menü bei Seitenaufruf zu generieren
generateDropdown();






































document.getElementById("button_neuesSpiel").addEventListener("click", neuesSpielStarten);

document.getElementById("p_Anzeige_buchstabe1").addEventListener("click", () => rad(false));
document.getElementById("p_Anzeige_buchstabe2").addEventListener("click", () => rad(false));
document.getElementById("p_Anzeige_buchstabe4").addEventListener("click", () => rad(true));
document.getElementById("p_Anzeige_buchstabe5").addEventListener("click", () => rad(true));

document.getElementById("p_aktuelleRunde").addEventListener("click", aktuelleRunde);

document.getElementById("input_Stoppuhr_Zeit").addEventListener("input", function() { zeitAnzeigen(), StoppuhrBeenden(), updateBeispiele() });
document.getElementById("button_Stoppuhr_auslösen").addEventListener("click", StoppuhrAuslösen);
document.getElementById("button_manuellStoppuhrBeenden").addEventListener("click", StoppuhrBeenden);

