const url = 'http://localhost:3000/';

fetch(url + "search/authors", {
    method: 'GET'
}).then((res) => {
    if (res.ok) {
        res.json().then((json) => {
            console.log(json);

            for (let i = 0; i < json.length; i++) {
                const opt = document.createElement('option');

                for (let key in json[i]) {
                    console.log(`json[${i}] = ${key} ${json[i]._id}`);
                }

                opt.text = json[i]._id;
                opt.onclick = async () => {
                    const correctUrl = url + "search/byAuthor?";

                    if (opt.text || opt.text.length !== 0) {
                        await sendRequest({author: opt.text}, correctUrl);
                    }
                };
                document.getElementById('authors').appendChild(opt);
            }
        });
    }
});

async function getAll() {
    const correctUrl = url + "search/all";
    await sendRequest({}, correctUrl);
}

async function onSearchByAuthor() {
    const correctUrl = url + "search/byAuthor?";
    const text = document.getElementById("search").value;

    if (!text || text.length === 0) {
        alert("Search Field id empty!");
        return;
    }

    await sendRequest({author: text}, correctUrl);
}

async function onSearchName() {
    const correctUrl = url + "search/byName?";
    const text = document.getElementById("search").value;

    if (!text || text.length === 0) {
        alert("Search Field id empty!");
        return;
    }

    await sendRequest({name: text}, correctUrl);
}

async function sendRequest(object, correctUrl) {
    const response = await fetch(correctUrl + (
        Object.keys(object).length !== 0 ? new URLSearchParams(object) : ''
    ), {
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