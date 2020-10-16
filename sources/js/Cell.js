export class Cell {
    /** @param div {HTMLDivElement} HTML element that represents this cell on the UI */
    constructor(div) {
        this.div = div;
        this.isAlive = false;
    }

    resurrect() {
        this.isAlive = true;
        this.div.classList.add('live');
    }

    die() {
        this.isAlive = false;
        this.div.classList.remove('live');
    }
}