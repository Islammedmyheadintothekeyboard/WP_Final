class Cell {
    constructor (number, sprite, prize) {
        this.number = number;
        this.sprite = sprite;
        this.prize = prize;
    }

    getCell () {
        let out;
        if (this.sprite === null) {
            out = `<div class='cell'><span>${this.number}</span><span>$${this.prize}</span></div>`;
        }
        else {
            out = `<div class='cell'><img class='cellSprite' src='${this.sprite}' alt='sprite goes here'><span>$${this.prize}</span></div>`;
        }
        return out;
    }
}

function randint (min, max, skip=-1) {
    let numb = Math.floor(Math.random() * (max - min + 1) + min);
    if (numb === skip) {
        numb = randint(min, max, skip);
    }
    return numb;
}

function createMoney () {
    const moneyDiv = document.createElement('div');
    moneyDiv.id = 'money';
    moneyDiv.innerHTML = `<span>Money:</span><span>$${sessionStorage.getItem("money")}`;
    document.getElementById('cornerCont').appendChild(moneyDiv);
}

function createGoBack () {
    const backImg = document.createElement('a');
    backImg.textContent = "Back To The Velvet Room";
    backImg.href = "../../index.html";
    backImg.id = 'backLink';
    document.getElementById('cornerCont').appendChild(backImg);
}

function checkWin (cell, winningNumbs) {
    const yourNumb = Number(cell.children[0].textContent);
    const winnings = Number(cell.children[1].textContent.replace("$", ""));
    if (winningNumbs.includes(yourNumb)) {
        sessionStorage.setItem("money", Math.floor(Number(sessionStorage.getItem("money"))+winnings));
        document.getElementById('money').innerHTML = `<span>Money:</span><span>$${sessionStorage.getItem("money")}`;
    }
}