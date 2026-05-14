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
            let cell = new Cell(randint(1,19), null, randint(3,50));
            yourInner += cell.getCell();
        }
        numberRow.innerHTML = yourInner;
        numbers.appendChild(numberRow);
        rowList.push(numberRow);
    }
    playboard.appendChild(numbers);
    
    let winningInner = "";
    const winningNumbers = [];
    let winNumb;
    for (let numberOfWin = 0; numberOfWin < 2; numberOfWin++) {
        winNumb = new Cell(randint(1, 19, winningNumbers), null, 0);
        winningInner += winNumb.getCell();
        winningNumbers.push(winNumb.number);
    }

    winningNumbs.innerHTML = winningInner;

    return [rowList, winningNumbers];
}

function createNumberOverlay (data) {
    const rowList = data[0];
    const winningNumbers = data[1];

    for (const row of rowList) {
        for (const cell of row.children) {
            const scratchOver = document.createElement('div');
            scratchOver.classList.add('scratchOver');
            scratchOver.onclick = function () {
                checkWin(Number(cell.children[0].textContent), winningNumbers, Number(cell.children[1].textContent.replace("$", "")));
                scratchOver.remove();
            }
            cell.appendChild(scratchOver);
        }
    }
}

function checkWin (yourNumb, winNumbs, winnings) {
    if (winNumbs.includes(yourNumb)) {
        increaseMoney(winnings);
    }
}

function generateRoyalCard () {
    createNumberOverlay(createNumberLayout());
}

createGoBack();
createMoney();
createRefresh(0, "FREE");
generateRoyalCard();