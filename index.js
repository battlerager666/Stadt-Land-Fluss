var alleBuchstaben = Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var wievielteRunde = 0;
var ShowTimerMinutes;
var timerSecondsTotal;
var ShowTimerSeconds;
let timerAktiv;

function changeBackgroundColor(color){
    document.body.style.background = color;
}

function neuesSpielStarten(){
    alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

    var übrigeBuchstabenZahlBestimmen = document.getElementById("p_Anzeige_übrigeBuchstaben"); //wieviele übrig? zurücksetzen
    übrigeBuchstabenZahlBestimmen.innerText = "Übrige Buchstaben: " + alleBuchstaben.length;

    var ergebnisAnzeige = document.getElementById("p_Anzeige_welcherBuchstabe"); //buchstabenAnzeige zurücksetzen
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

    var ergebnisAnzeige = document.getElementById("p_Anzeige_welcherBuchstabe"); //den buchstaben anzeigen
    ergebnisAnzeige.innerText = zufälligerBuchstabe;

    var übrigeBuchstabenZahlBestimmen = document.getElementById("p_Anzeige_übrigeBuchstaben"); //wieviele übrig? anzeigen
    übrigeBuchstabenZahlBestimmen.innerText = "Übrige Buchstaben: " + alleBuchstaben.length;

    wievielteRunde++;
    var wievielteRundeAnzeige = document.getElementById("p_Anzeige_wievielteRunde"); //runde updaten + anzeigen
    wievielteRundeAnzeige.innerText = "Runde: " + wievielteRunde;
    }
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

zeitAnzeigen();