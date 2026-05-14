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
        let cell;
        let randNumb;
        for (let i=0; i<3; i++) {
            randNumb = randint(0, imagePaths.length-1);
            cell = new Cell(randNumb, imagePaths[randNumb], 0);
            yourInner += cell.getCell();
        }
        numberRow.innerHTML = yourInner;
        numbers.appendChild(numberRow);
        rowList.push(numberRow);
    }
    playboard.appendChild(numbers);

    let winImg = randint(0, imagePaths.length-1);
    winImg = new Cell(winImg, imagePaths[winImg], determinePrize(randint(1, 100)));
    winningNumbs.innerHTML = winImg.getCell();

    return [rowList, winImg];
}

function createNumberOverlay (data) {
    const rowList = data[0];
    const winImg = data[1];

    for (const row of rowList) {
        for (const cell of row.children) {
            const scratchOver = document.createElement('div');
            scratchOver.classList.add('scratchOver');
            scratchOver.classList.add('goldenCover');
            scratchOver.onclick = function () {
                checkImageWin(imagePaths.indexOf(cell.children[0].alt), winImg.number, winImg.prize);
                scratchOver.remove();
            }
            cell.appendChild(scratchOver);
        }
    }
}

function checkImageWin (yourImg, winImg, winnings) {
    if (yourImg === winImg) {
        matchedImages++;
        if (matchedImages >= 3) {
            increaseMoney(winnings);
        }
    }
}

function generateGoldenCard () {
    createNumberOverlay(createNumberLayout());
}

function determinePrize (randomNumber) {
    let prize;
    if (randomNumber === 100) {
        prize = 1000;
    }
    else if (randomNumber >= 95) {
        prize = 100;
    }
    else if (randomNumber >= 85) {
        prize = 75;
    }
    else if (randomNumber >= 60) {
        prize = 50;
    }
    else if (randomNumber >= 30) {
        prize = 35
    }
    else  {   
        prize = 20;
    }
    return prize;
}

function setup () {
    createGoBack();
    createMoney();
    if (Number(sessionStorage.getItem("money")) >= 10) {
        createRefresh(10, "$10");
        increaseMoney(-10);
        imagePaths = [
                "../../resources/golden/chie.webp",
                "../../resources/golden/ost.jpg",
                "../../resources/golden/heaven.jpg",
                "../../resources/golden/izanagi.webp",
                "../../resources/golden/P4GPoster.webp",
                "../../resources/golden/teddie.jpg"
            ];

        matchedImages = 0;
        generateGoldenCard();
    }
    else {
        document.getElementById('winningNumb').textContent = "Stop trying to cheat the system";
    }
}

setup();