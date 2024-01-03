var alleBuchstaben = Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var wievielteRunde = 0;

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
