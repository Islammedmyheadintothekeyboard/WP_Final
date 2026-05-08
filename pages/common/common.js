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
            out = `<div class='cell'><img class='cellSprite' src='${this.sprite}'><span>$${this.prize}</span></div>`;
        }
        return out;
    }
}