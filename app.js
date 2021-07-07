"use strict";

const modalContent = document.querySelector("#modal-content");
const modalCheckingCopy = document.querySelector("#modal-checking-copy");
const modalPrice = document.querySelector("#modal-price");
const container = document.querySelector("#container");

const clientName = document.querySelector("#clientName");
const licensePlate = document.querySelector("#licensePlate");

const addClient = document.querySelector("#addClient");
const addPrice = document.querySelector("#addPrice");


const firstHour = document.querySelector("#firstHour");
const overHours = document.querySelector("#overHours");

const savePrice = document.querySelector("#savePrice");
const cancelPrice = document.querySelector("#cancelPrice");


const nameChecking = document.querySelector("#nameChecking");
const licensePlateChecking = document.querySelector("#licensePlateChecking");
const dataChecking = document.querySelector("#dataChecking");
const hourChecking = document.querySelector("#hourChecking");

const printCheckingcopy = document.querySelector("#printCheckingcopy");
const cancelCheckingcopy = document.querySelector("#cancelCheckingcopy");

const getDateHourNow = () => {
    const date = new Date();

    const DateHourNow = {
        day: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(),
        hour: date.getHours(),
        min: date.getMinutes()
    }

    return DateHourNow;
}

const cleanClientsInInputs = () => {
    clientName.value = "";
    licensePlate.value = "";
}

const cleanPriceInputs = () => {
    firstHour.value = "";
    overHours.value = "";
}

const cleanCheckingCopyInputs = () => {
    nameChecking.value = "";
    licensePlateChecking.value = "";
    dataChecking.value = "";
    hourChecking.value = "";
}

const openCheckingCopy = () => {
    modalContent.classList.add("active");
    modalCheckingCopy.classList.add("active");
}

const closeCheckingCopy = () => {
    modalContent.classList.remove("active");
    modalCheckingCopy.classList.remove("active");
}

const openPriceModal = () => {
    if (addPrice.textContent === "Cancelar") {
        cleanClientsInInputs();
        cancelEditClientModal();
    } else {
        modalContent.classList.add("active");
        modalPrice.classList.add("active");
    }
}

const closePriceModal = () => {
    modalContent.classList.remove("active");
    modalPrice.classList.remove("active");
}

const defaultCheckingcopy = () => {
    printCheckingcopy.classList.remove("print");
    cancelCheckingcopy.classList.remove("print");
}

const printCheckingcopyClient = () => {
    printCheckingcopy.classList.add("print");
    cancelCheckingcopy.classList.add("print");
    window.print();
    defaultCheckingcopy();
}

const editClientModal = () => {
    modalContent.classList.add("edit");
    container.classList.add("edit");
    addClient.textContent = "Salvar"
    addPrice.textContent = "Cancelar";
}

const cancelEditClientModal = () => {
    modalContent.classList.remove("edit");
    container.classList.remove("edit");
    clientName.dataset.index = "";
    addClient.textContent = "Adicionar"
    addPrice.textContent = "Preços";
}

const readDb = () => JSON.parse(localStorage.getItem("db")) ?? [];

const setDb = (db) => localStorage.setItem("db", JSON.stringify(db));

const readPrice = () => JSON.parse(localStorage.getItem("price")) ?? [];

const setPrice = (price) => localStorage.setItem("price", JSON.stringify(price));

console.log(readPrice());

const isSetPrice = () => {
    if (readPrice() == ""){
        alert ("Adicione o preço para continuar.");
        return false;
    }else{
        return true;
    }
}

const price = () => {
    const price = readPrice();
    const newPrice = {
        firstHour: firstHour.value,
        overHours: overHours.value
    }

    price[0] = newPrice

    setPrice(price);

    closePriceModal();
}

const cleanTable = () => {
    const table = document.querySelector("#table tbody");

    while (table.firstChild) table.removeChild(table.lastChild);
}

const isValidForm = () => document.querySelector(".form").reportValidity();

const clientCheckingcopy = (index) => {
    const db = readDb();
    let dbLastOne = "";

    if (typeof index === "string") {
        dbLastOne = index;
        nameChecking.value = db[dbLastOne].name;
        licensePlateChecking.value = db[dbLastOne].licensePlate;
        dataChecking.value = db[dbLastOne].day;
        hourChecking.value = db[dbLastOne].hour;
    } else if (isValidForm()) {
        dbLastOne = db.length - 1;
        nameChecking.value = db[dbLastOne].name;
        licensePlateChecking.value = db[dbLastOne].licensePlate;
        dataChecking.value = db[dbLastOne].day;
        hourChecking.value = db[dbLastOne].hour;
    }
    
    openCheckingCopy();
}

const createRow = (client, index) => {
    const recordClient = document.querySelector("#table tbody");

    const newTr = document.createElement("tr");

    newTr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.licensePlate}</td>
        <td>${client.day}</td>
        <td>${client.hour}</td>
        <td>
            <button type="button" class="button" data-action="show-${index}">Comprovante</button>
            <button type="button" class="button" data-action="edit-${index}">Editar</button>
            <button type="button" class="button" id="clientOut" data-action="out-${index}">Saída</button>
        </td>
    `;

    recordClient.appendChild(newTr);
}

const createInput = (payPrice, index) => {
    const db = readDb();

    const hour = getDateHourNow();

    const modalCheckingCopy = document.querySelector("#modal-checking-copy");

    modalCheckingCopy.innerHTML = `
        <div class="title-logo">
            <h2>Comprovante</h2>
            <img src="./images/fastParkingLogo.png" alt="logo" class="imageLogo">
        </div>
        <div class="container-input">
            <div class="input-name">
                <h3>Nome</h3>
                <h3>Placa</h3>
                <h3>Data</h3>
                <h3>Hora</h3>
                <h3>Hora de Saída</h3>
                <h3>Preço a Pagar</h3>
            </div>
            <div class="input" id="input">
                <input type="text" value="${db[index].name}" name="name" placeholder="Nome" id="nameChecking" readonly>
                
                <input type="text" value="${db[index].licensePlate}"name="licensePlate" placeholder="Placa" id="licensePlateChecking" readonly>
                
                <input type="text" value="${db[index].day}" name="data" placeholder="Data" id="dataChecking" readonly>
                
                <input type="text" value="${db[index].hour}" name="hour" placeholder="Hora" id="hourChecking" readonly>
                
                <input type="text" value="${hour.hour}:${hour.min}"name="hourOut" placeholder="Hora de Saída" id="hourOut" readonly>
                
                <input type="text" value="R$${payPrice}" name="payPrice" placeholder="Preço a Pagar" id="payPrice" readonly>
            </div>
        </div>
        <div class="container-buttons">
            <button type="button" class="button" id="cancelCheckingcopy">Sair</button>
        </div>
    `;

    openCheckingCopy();
}

const loadClientsTable = () => {
    cleanTable();

    const db = readDb();

    db.forEach(createRow);
}



const updateClientRecord = (client, index) => {
    const db = readDb();
    db[index] = client;
    setDb(db);
    cancelEditClientModal();
}

const newClient = () => {

    const db = readDb();
    const date = getDateHourNow();

    if (isValidForm()) {
        const newClient = {
            name: clientName.value,
            licensePlate: licensePlate.value,
            day: date.day,
            hour: date.hour + ":" + date.min
        };

        const index = clientName.dataset.index;

        if (index == "") {
            db.push(newClient);

            setDb(db);

            clientCheckingcopy(); 
        } else {
            updateClientRecord(newClient, index);
        }

        loadClientsTable();
    }
}

const billPrice = (index) => {
    const db = readDb();
    const price = readPrice();
    const hour = getDateHourNow();

    const howManyHours = parseInt(hour.hour) - parseInt(db[index].hour);
    let result = "";

    if (howManyHours <= 1) {
        result = price[0].firstHour;
    } else {
        result = parseFloat(price[0].firstHour) + ((parseFloat(howManyHours) - 1) * parseFloat(price[0].overHours));
    }

    createInput(result, index);
}

const editClient = (index) => {
    const db = readDb();
    clientName.value = db[index].name;
    clientName.dataset.index = index;
    licensePlate.value = db[index].licensePlate;
    editClientModal();
}

const deleteClient = (index) => {
    const db = readDb();

    db.splice(index, 1);

    setDb(db);

    loadClientsTable();
}

const actions = (event) => {
    const element = event.target;
    if (element.type === "button") {
        const action = element.dataset.action.split("-");
        if (action[0] === "out") {
            billPrice(action[1]);
            deleteClient(action[1]);
        } else if (action[0] === "edit") {
            editClient(action[1]);
        } else {
            clientCheckingcopy(action[1]);
        }
    }
}

const actionsButtonsCheckingPrice = (event) => {
    const element = event.target;
    if (element.type === "button") {
        closeCheckingCopy();
    }
}

addClient.addEventListener("click", () => { if(isSetPrice()){ newClient(); cleanClientsInInputs(); } });
addPrice.addEventListener("click", openPriceModal);

savePrice.addEventListener("click", () => { price(); cleanPriceInputs(); });
cancelPrice.addEventListener("click", () => { closePriceModal(); cleanPriceInputs(); });

printCheckingcopy.addEventListener("click", printCheckingcopyClient);
cancelCheckingcopy.addEventListener("click", closeCheckingCopy);

document.querySelector("#table").addEventListener("click", actions);
modalContent.addEventListener("click", actionsButtonsCheckingPrice);

loadClientsTable();