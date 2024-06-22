// script.js
document.getElementById('truthTableForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const proposition = document.getElementById('proposition').value;
    generateTruthTable(proposition);
});

function generateTruthTable(proposition) {
    const variables = getVariables(proposition);
    const combinations = getCombinations(variables.length);
    const table = combinations.map(combination => {
        const row = {};
        variables.forEach((variable, index) => {
            row[variable] = combination[index];
        });
        row['Result'] = evaluateProposition(proposition, row);
        return row;
    });

    displayTable(variables, table);
}

function getVariables(proposition) {
    return Array.from(new Set(proposition.match(/[A-Z]/g))).sort();
}

function getCombinations(variableCount) {
    const combinations = [];
    const totalCombinations = Math.pow(2, variableCount);
    for (let i = 0; i < totalCombinations; i++) {
        const combination = i.toString(2).padStart(variableCount, '0').split('').map(bit => bit === '1');
        combinations.push(combination);
    }
    return combinations;
}

function evaluateProposition(proposition, values) {
    const evalProposition = proposition.replace(/[A-Z]/g, match => values[match]);
    return eval(evalProposition.replace(/&&/g, '&&').replace(/\|\|/g, '||').replace(/!/g, '!'));
}

function displayTable(variables, table) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    const tableElement = document.createElement('table');
    const headerRow = document.createElement('tr');
    variables.forEach(variable => {
        const th = document.createElement('th');
        th.textContent = variable;
        headerRow.appendChild(th);
    });
    const resultTh = document.createElement('th');
    resultTh.textContent = 'Resultado';
    headerRow.appendChild(resultTh);
    tableElement.appendChild(headerRow);

    table.forEach(row => {
        const tr = document.createElement('tr');
        variables.forEach(variable => {
            const td = document.createElement('td');
            td.textContent = row[variable] ? 'V' : 'F';
            tr.appendChild(td);
        });
        const resultTd = document.createElement('td');
        resultTd.textContent = row['Result'] ? 'V' : 'F';
        tr.appendChild(resultTd);
        tableElement.appendChild(tr);
    });

    tableContainer.appendChild(tableElement);
}
