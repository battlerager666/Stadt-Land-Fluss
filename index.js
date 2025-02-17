var alleBuchstaben = Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var reelleRunde = 0;
var rundeZuZeigen = 0;
var ShowTimerMinutes;
var timerSecondsTotal;
var ShowTimerSeconds;
let timerAktiv;





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
    


    var ergebnisAnzeige = [document.getElementById("p_Anzeige_buchstabe1"), document.getElementById("p_Anzeige_buchstabe2"),
        document.getElementById("p_Anzeige_buchstabe3"), document.getElementById("p_Anzeige_buchstabe4"), document.getElementById("p_Anzeige_buchstabe5")]; //alle referenzen


    for (let i = -2; i <= 2; i++) { //buchstaben updaten
        let index = rundeZuZeigen + i;
        if (index < 0 || index >= alleBuchstaben.length) {
            ergebnisAnzeige[(i + 2)].innerText = ""; // Verhindert Fehler, falls Index außerhalb des Arrays
        } else if (index > reelleRunde) {
            ergebnisAnzeige[(i + 2)].innerText = "?"; // Falls noch nicht freigeschaltet
        } else {
            ergebnisAnzeige[(i + 2)].innerText = alleBuchstaben[index]; // Normale Anzeige
        }
    }


    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: " + (reelleRunde + 1); //runde updaten + anzeigen






    console.log(JSON.parse(localStorage.getItem("aktuellesSpiel")));
    console.log(JSON.parse(localStorage.getItem("rundeZuZeigenSpeichern")));
    console.log("real: " + JSON.parse(localStorage.getItem("reelleRundeSpeichern")));
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

function rad(weiter){
    

    var ergebnisAnzeige = [document.getElementById("p_Anzeige_buchstabe1"), document.getElementById("p_Anzeige_buchstabe2"),
            document.getElementById("p_Anzeige_buchstabe3"), document.getElementById("p_Anzeige_buchstabe4"), document.getElementById("p_Anzeige_buchstabe5")]; //alle referenzen


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



    for (let i = -2; i <= 2; i++) { //buchstaben updaten
        let index = rundeZuZeigen + i;
        if (index < 0 || index >= alleBuchstaben.length) {
            ergebnisAnzeige[(i + 2)].innerText = ""; // Verhindert Fehler, falls Index außerhalb des Arrays
        } else if (index > reelleRunde) {
            ergebnisAnzeige[(i + 2)].innerText = "?"; // Falls noch nicht freigeschaltet
        } else {
            ergebnisAnzeige[(i + 2)].innerText = alleBuchstaben[index]; // Normale Anzeige
        }
    }



    console.log("reelleRunde: " + reelleRunde);
    console.log("rundeZuZeigen: " + rundeZuZeigen);

    // console.log("weiter: " + weiter);

    
    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: " + (reelleRunde + 1); //runde updaten + anzeigen
}

function aktuelleRunde(){ //zur aktuellen Runde springen

    var ergebnisAnzeige = [document.getElementById("p_Anzeige_buchstabe1"), document.getElementById("p_Anzeige_buchstabe2"),
        document.getElementById("p_Anzeige_buchstabe3"), document.getElementById("p_Anzeige_buchstabe4"), document.getElementById("p_Anzeige_buchstabe5")]; //alle referenzen


    rundeZuZeigen = reelleRunde;
    

    for (let i = -2; i <= 2; i++) { //buchstaben updaten
        let index = rundeZuZeigen + i;
        if (index < 0 || index >= alleBuchstaben.length) {
            ergebnisAnzeige[(i + 2)].innerText = ""; // Verhindert Fehler, falls Index außerhalb des Arrays
        } else if (index > reelleRunde) {
            ergebnisAnzeige[(i + 2)].innerText = "?"; // Falls noch nicht freigeschaltet
        } else {
            ergebnisAnzeige[(i + 2)].innerText = alleBuchstaben[index]; // Normale Anzeige
        }
    }
}

function neuesSpielStarten(){
    alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

    shuffle(alleBuchstaben);

    console.log(alleBuchstaben);


    var ergebnisAnzeige1 = document.getElementById("p_Anzeige_buchstabe1"); //buchstaben resetten
    var ergebnisAnzeige2 = document.getElementById("p_Anzeige_buchstabe2");
    var ergebnisAnzeige3 = document.getElementById("p_Anzeige_buchstabe3");
    var ergebnisAnzeige4 = document.getElementById("p_Anzeige_buchstabe4");
    var ergebnisAnzeige5 = document.getElementById("p_Anzeige_buchstabe5");

    ergebnisAnzeige1.innerText = "";
    ergebnisAnzeige2.innerText = "";
    ergebnisAnzeige3.innerText = "?";
    ergebnisAnzeige4.innerText = "?";
    ergebnisAnzeige5.innerText = "?";


    
    

    reelleRunde = 0;
    localStorage.setItem("reelleRundeSpeichern", JSON.stringify(reelleRunde)); //reelleRunde speichern
    rundeZuZeigen = 0;
    localStorage.setItem("rundeZuZeigenSpeichern", JSON.stringify(rundeZuZeigen)); //rundeZuZeigen speichern

    document.getElementById("p_Anzeige_buchstabe3").innerText = alleBuchstaben[0];

    document.getElementById("p_Anzeige_reelleRunde").innerText = "Runde: 1"; //runde updaten zurücksetzen



    localStorage.setItem("aktuellesSpiel", JSON.stringify(alleBuchstaben));
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

function testAnimation(){
    const buchstabe = document.getElementById("p_Anzeige_welcherBuchstabe");
    const duration = 1000; // Dauer der Animation in Millisekunden
    const start = 0;
    const end = 100;

    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const newX = start + (end - start) * progress;

        buchstabe.style.left = `${newX}%`;

        console.log(buchstabe.style.left);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
};


zeitAnzeigen();



// alleBuchstaben = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"); //zurücksetzen

//     shuffle(alleBuchstaben);


// document.getElementById("p_Anzeige_buchstabe3").innerText = alleBuchstaben[0]; //ersten buchstaben anzeigen








