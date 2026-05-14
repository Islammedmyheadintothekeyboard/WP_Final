class Cell {
    constructor (number, sprite, prize) {
        this.number = number;
        this.sprite = sprite;
        this.prize = prize;
    }

    getCell () {
        let out;
        if (this.sprite === null) {
            out = `<div class='cell'><span>${this.number}</span>${this.isPrize()}</div>`;
        }
        else {
            out = `<div class='cell'><img class='cellSprite' src='${this.sprite}' alt='${this.sprite}'>${this.isPrize()}</div>`;
        }
        return out;
    }

    isPrize () {
        if (this.prize === 0) {
            return "";
        }
        else {
            return `<span>$${this.prize}</span>`;
        }
    }
}

function randint (min, max, skip=[]) {
    let numb = Math.floor(Math.random() * (max - min + 1) + min);
    if (skip.includes(numb)) {
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

function createRefresh (costNum, costStr) {
    const refreshButton = document.createElement('div');
    refreshButton.onclick = function () {
        if (costNum <= Number(sessionStorage.getItem("money"))) {
            window.location.href = "";
        }
        else {
            refreshButton.innerHTML = '<span>Not Enough Money</span>';
            setTimeout(() => {refreshButton.innerHTML = `<span>Buy New Ticket</span><span>${costStr}</span>`}, 350)
        }
    };
    refreshButton.id = 'refresh';
    refreshButton.innerHTML = `<span>Buy New Ticket</span><span>${costStr}</span>`;
    document.getElementsByTagName('body')[0].appendChild(refreshButton);
}

function increaseMoney (winnings) {
    sessionStorage.setItem("money", Math.floor(Number(sessionStorage.getItem("money"))+winnings));
    document.getElementById('money').innerHTML = `<span>Money:</span><span>$${sessionStorage.getItem("money")}`;
}