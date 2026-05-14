function createNumberLayout () {
    const playboard = document.getElementById('playboard');
    const winningNumbs = document.getElementById('winningNumb');
    const numbers = document.createElement('div');
    numbers.id = "numbersUnd";
    numbers.classList.add('moonBorder');
    const rowList = [];

    for (let j=0; j<5; j++) {
        const numberRow = document.createElement('div');
        numberRow.classList.add('cellCont');
        let yourInner = "";
        for (let i=0; i<5; i++) {
            let cell = new Cell(randint(1,29), null, randint(5, 100));
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
    for (let numberOfWin = 0; numberOfWin < 5; numberOfWin++) {
        winNumb = new Cell(randint(1, 29, winningNumbers), null, 0);
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

function generateMoonCard () {
    createNumberOverlay(createNumberLayout());
}

function setup () {
    createGoBack();
    createMoney();
    if (Number(sessionStorage.getItem("money")) >= 20) {
        createRefresh(20, "$20");
        increaseMoney(-20);
        generateMoonCard();
    }
    else {
        document.getElementById('winningNumb').textContent = "Stop trying to cheat the system";
    }
}

setup();