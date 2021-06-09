"use strict";

const openPriceModal = () => {
    document.querySelector("#modal-content").classList.add("active");
    document.querySelector("#modal-price").classList.add("active");
}

const closePriceModal = () => {
    document.querySelector("#modal-content").classList.remove("active");
    document.querySelector("#modal-price").classList.remove("active");
}

const readDb = () => JSON.parse(localStorage.getItem("db")) ?? [];

const setDb = (db) => localStorage.setItem("db", JSON.stringify(db));

const cleanTable = () =>{
    const table = document.querySelector("#table tbody");

    while (table.firstChild) {
        table.removeChild(table.lastChild);
    }
}

const createRow = (client) => {
    const recordClient = document.querySelector("#table tbody");

    const newTr = document.createElement("tr");

    newTr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.licensePlate}</td>
        <td>${client.day}</td>
        <td>${client.hour}</td>
        <td>
            <button class="button">Comprovante</button>
            <button class="button">Editar</button>
            <button class="button" id="blue">Saída</button>
        </td>
    `;

    recordClient.appendChild(newTr);
}

const loadClientsTable = () => {
    cleanTable();

    const db = readDb();

    db.forEach(createRow);
}

const newClient = () => {

    const db = readDb();

    const date = new Date();
    const day = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();

    const newClient = {
        name: document.querySelector("#clientName").value,
        licensePlate: document.querySelector("#licensePlate").value,
        day: day,
        hour: hour + ":" + min
    }
   
    db.push(newClient);

    setDb(db);
    loadClientsTable();
}

document.querySelector("#add")
    .addEventListener("click", newClient);

document.querySelector("#price")
    .addEventListener("click", openPriceModal);

document.querySelector("#modal-price-cancel")
    .addEventListener("click", closePriceModal);

loadClientsTable();




