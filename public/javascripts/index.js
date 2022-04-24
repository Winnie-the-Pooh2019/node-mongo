const url = 'http://localhost:3000/';

async function getAll() {
    const correctUrl = url + "search/all";
    const response = await fetch(correctUrl, {
        method: 'GET'
    });

    if (response.ok) {
        const json = await response.json();
        console.log(json);

        fillTable(json);
    } else {
        alert("Incorrect request");
    }
}

async function onSearchByAuthor() {
    const correctUrl = url + "search/byAuthor?";
    const text = document.getElementById("searchAuthor").value;
    const response = await fetch(correctUrl + new URLSearchParams({
        author: text
    }));

    if (response.ok) {
        const json = response.json();
        console.log(json);

        fillTable(json);
    } else {
        alert("Incorrect request");
    }
}

async function onSearchName() {
    const correctUrl = url + "search/byName?";
    const text = document.getElementById("searchAuthor").value;
    const response = await fetch(correctUrl + new URLSearchParams({
        author: text
    }));

    if (response.ok) {
        const json = response.json();
        console.log(json);

        fillTable(json);
    } else {
        alert("Incorrect request");
    }
}

function fillTable(json) {
    let table = document.getElementById('articles');

    if (!!table)
        table.remove();

    const contentDiv = document.getElementById("content");
    table = document.createElement('table');
    table.id = 'articles';
    table.style.border = '1px solid black';

    for (let i = 0; i < json.length; i++) {
        const tr = table.insertRow();

        for (let value of Object.values(json[i])) {
            const td = tr.insertCell();
            if (value !== null && value !== undefined)
            td.appendChild(document.createTextNode(`${value}`));
            td.style.border = '1px solid black';
        }
    }
    contentDiv.appendChild(table);
}