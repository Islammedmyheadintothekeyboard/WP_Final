function createNumberLayout () {
    const playboard = document.getElementById('playboard');
    const winningNumbs = document.getElementById('winningNumb');
    const numbers = document.createElement('div');
    numbers.id = "numbersUnd";
    const rowList = [];

    for (let j=0; j<3; j++) {
        const numberRow = document.createElement('div');
        numberRow.classList.add('cellCont');
        let yourInner = "";
        for (let i=0; i<3; i++) {
            let cell = new Cell(randint(1,19), null, randint(5,100));
            yourInner += cell.getCell();
        }
        numberRow.innerHTML = yourInner;
        numbers.appendChild(numberRow);
        rowList.push(numberRow);
    }
    playboard.appendChild(numbers);

    const winNumb1 = randint(1, 19);
    const winNumb2 = randint(1, 19, winNumb1);
    winningNumbs.innerHTML = `<div>${winNumb1}</div><div>${winNumb2}</div>`;

    return [rowList, winNumb1, winNumb2];
}

function createNumberOverlay (data) {
    const rowList = data[0];
    const winningNumbs = data.slice(1);

    for (const row of rowList) {
        for (const cell of row.children) {
            const scratchOver = document.createElement('div');
            scratchOver.classList.add('scratchOver');
            scratchOver.onclick = function () {
                checkWin(cell, winningNumbs);
                scratchOver.remove();}
            cell.appendChild(scratchOver);
        }
    }
}

function generateRoyalCard () {
    createNumberOverlay(createNumberLayout());
}

createGoBack();
createMoney();
generateRoyalCard();