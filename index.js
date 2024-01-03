var alleBuchstaben = Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var wievielteRunde = 0;
var timerMinutes;
var timerSeconds;
let timerAktiv;

function neuesSpielStarten(){
    alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

    var übrigeBuchstabenZahlBestimmen = document.getElementById("p_Anzeige_übrigeBuchstaben"); //wieviele übrig? zurücksetzen
    übrigeBuchstabenZahlBestimmen.innerText = "Übrige Buchstaben: " + alleBuchstaben.length;

    var ergebnisAnzeige = document.getElementById("p_Anzeige_ergebnis"); //buchstabenAnzeige zurücksetzen
    ergebnisAnzeige.innerText = "...";

    wievielteRunde = 0;
    var wievielteRundeAnzeige = document.getElementById("p_Anzeige_wievielteRunde"); //runde updaten zurücksetzen
    wievielteRundeAnzeige.innerText = "Runde: 0";

}

function zufälligerBuchstabeAuslösen(){
    if(alleBuchstaben.length > 0) {
    let zufälligerBuchstabe = alleBuchstaben[Math.floor(Math.random()*alleBuchstaben.length)]; //random Buchstabe

    welcherIndex = alleBuchstaben.indexOf(zufälligerBuchstabe); //verwendeten Buchstaben entfernen
    alleBuchstaben.splice(welcherIndex, 1);

    var ergebnisAnzeige = document.getElementById("p_Anzeige_ergebnis"); //den buchstaben anzeigen
    ergebnisAnzeige.innerText = zufälligerBuchstabe;

    var übrigeBuchstabenZahlBestimmen = document.getElementById("p_Anzeige_übrigeBuchstaben"); //wieviele übrig? anzeigen
    übrigeBuchstabenZahlBestimmen.innerText = "Übrige Buchstaben: " + alleBuchstaben.length;

    wievielteRunde++;
    var wievielteRundeAnzeige = document.getElementById("p_Anzeige_wievielteRunde"); //runde updaten + anzeigen
    wievielteRundeAnzeige.innerText = "Runde: " + wievielteRunde;
    }
}

function StoppuhrAuslösen(){
    if(document.getElementById("input_Stoppuhr_Zeit").value > 0){
    timerMinutes = document.getElementById("input_Stoppuhr_Zeit").value; //timer Minuten
    } else{
    timerMinutes = 2;
    }

    timerSeconds = timerMinutes * 60; //timer Sekunden

    if(timerAktiv === undefined){
    timerAktiv = setInterval(StoppuhrUpdaten, 1000); //timer aktivieren (nur einmal)
    }
}

function StoppuhrUpdaten(){
    document.getElementById("p_Stoppuhr").innerText = timerMinutes + " : " + timerSeconds; //zeit anzeigen + timerSeconds--
    timerSeconds--;
}

function StoppuhrAnhalten(){
    clearInterval(timerAktiv); //mit button timer stoppen

    timerAktiv = undefined; //reset
}

if(timerSeconds <= 0){
    clearInterval(timerAktiv); //TEST
}