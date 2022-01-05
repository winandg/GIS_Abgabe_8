//let idElementsCounter: number = 0; //Counter fuer Klassenelemente

class AngelegteEvents {

    kuenstler: string;
    preis: string;
    //private idElements: number;

    constructor(k: string, p: string) {

        this.kuenstler = k;
        this.preis = p;
        //this.idElements = idElementsCounter;

        //idElementsCounter++;

    }

    //asString(): string {
    //    return `${this.kuenstler} kostet ${this.preis} id: ${this.idElements}`;
    //}



    //getIDElements(): string {
    //    return this.idElements.toString();
    //}
}


let eventInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputEvent");
let preisInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputPrice");

let neuesEvent: AngelegteEvents[] = [];
let addB: HTMLElement = document.getElementById("hinzufuegenButton");
let abspeichern: Event[] = [];
initEvents();
addB.addEventListener("click", addEvent);

function addEvent(): void {
    if (eventInput.value == "" || preisInput.value == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry: AngelegteEvents = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);
    saveEvent(entry);
    addTableEntry(entry);
}

function addgespeichertesEvent(interpret: string, price: string): void {
    if (interpret == "" || price == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry: AngelegteEvents = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);

    addTableEntry(entry);
}



function addTableEntry(eventitem: AngelegteEvents): void {

    let entry: HTMLTableRowElement = document.createElement("tr");
    let kuenstler: HTMLTableCellElement = document.createElement("td");
    let preis: HTMLTableCellElement = document.createElement("td");

    kuenstler.innerHTML = eventitem.kuenstler;
    preis.innerHTML = eventitem.preis;



    entry.appendChild(kuenstler);
    entry.appendChild(preis);

    document.getElementById("tabelleEvents")!.appendChild(entry);
}


function saveEvent(e: AngelegteEvents): void {
    fetch("http://127.0.0.1:3000/concertEvent", {
        method: "POST", // *GET, POST, PUT, DELETE, etc
        body: JSON.stringify(e)  // body data type must match "Content-Type" header
    });
}

async function initEvents(): Promise<void> {
    let response: Response = await fetch("http://127.0.0.1:3000/concertEvent");
    neuesEvent = await response.json();
    neuesEvent.forEach(e => addTableEntry(e));
}
