"use strict";
//let idElementsCounter: number = 0; //Counter fuer Klassenelemente
class AngelegteEvents {
    kuenstler;
    preis;
    //private idElements: number;
    constructor(k, p) {
        this.kuenstler = k;
        this.preis = p;
        //this.idElements = idElementsCounter;
        //idElementsCounter++;
    }
}
let eventInput = document.getElementById("inputEvent");
let preisInput = document.getElementById("inputPrice");
let neuesEvent = [];
let addB = document.getElementById("hinzufuegenButton");
let abspeichern = [];
initEvents();
addB.addEventListener("click", addEvent);
function addEvent() {
    if (eventInput.value == "" || preisInput.value == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);
    saveEvent(entry);
    addTableEntry(entry);
}
function addgespeichertesEvent(interpret, price) {
    if (interpret == "" || price == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);
    addTableEntry(entry);
}
function addTableEntry(eventitem) {
    let entry = document.createElement("tr");
    let kuenstler = document.createElement("td");
    let preis = document.createElement("td");
    kuenstler.innerHTML = eventitem.kuenstler;
    preis.innerHTML = eventitem.preis;
    entry.appendChild(kuenstler);
    entry.appendChild(preis);
    document.getElementById("tabelleEvents").appendChild(entry);
}
function saveEvent(e) {
    fetch("http://127.0.0.1:3000/concertEvent", {
        method: "POST",
        body: JSON.stringify(e) // body data type must match "Content-Type" header
    });
}
async function initEvents() {
    let response = await fetch("http://127.0.0.1:3000/concertEvent");
    neuesEvent = await response.json();
    neuesEvent.forEach(e => addTableEntry(e));
}
//# sourceMappingURL=client.js.map