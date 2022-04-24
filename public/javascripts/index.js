async function onSearchName() {
    const bar = document.getElementById("searchBar").value;

    if (bar.length !== 0) {
        console.log("in input checker");
        const url = `http://localhost:3000/api/find/name`;
        const data = {
            name: bar
        };

        console.log(sendRequest(url, data));
    }
}

async function getAll() {
    const contentDiv = document.getElementById("content"),
        tbl = document.createElement('table');
    tbl.id = 'articles';
    // tbl.style.width = '100px';
    tbl.style.border = '1px solid black';

    for (let i = 0; i < 3; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 2; j++) {
            if (i === 2 && j === 1) {
                break;
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
                td.style.border = '1px solid black';
                if (i === 1 && j === 1) {
                    td.setAttribute('rowSpan', '2');
                }
            }
        }
    }
    contentDiv.appendChild(tbl);
}

async function sendRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

