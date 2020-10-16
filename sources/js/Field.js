import {Cell} from "./Cell.js";

export class Field {
    cells = [];
    cols = 10;
    rows = 10;
    
    constructor(field) {
        const fieldFrag = document.createDocumentFragment();
        for (let i = 0; i < this.cols * this.rows; i++) {
            const div = document.createElement('div');
            fieldFrag.appendChild(div);
            this.cells.push(new Cell(div));
        }
        
        field.appendChild(fieldFrag);
    }

    /** Randomly attributes live class to div cells inside the playing field. */
    seedLife() {
        for (let cell of this.cells) {
            if (Math.random() > 0.5) {
                cell.resurrect();
            } else {
                cell.die();
            }
        }
    }

    /** @returns {boolean} if false - there are no next steps, if true - there are next steps */
    nextGen() {
        const nextAliveOrDead = [];
        const aliveOrDead = this.cells.map(element => element.isAlive);
        for (let i = 0; i < this.cells.length; i++) {
            const isLeftEdge = (i % this.cols) === 0;
            const isTopEdge = i < this.cols;
            const isRightEdge = ((i + 1) % this.cols) === 0;
            const isBottomEdge = i >= (this.cells.length - this.cols);
            let liveNeighbourCount = 0;
            // checking top-left neighbour cell
            if (!isLeftEdge && !isTopEdge && aliveOrDead[i - this.cols - 1]) {
                liveNeighbourCount++;
            }
            // checking top neighbour cell
            if (!isTopEdge && aliveOrDead[i - this.cols]) {
                liveNeighbourCount++;
            }
            // checking top-right neighbour cell
            if (!isTopEdge && !isRightEdge && aliveOrDead[i - this.cols + 1]) {
                liveNeighbourCount++;
            }
            // checking left neighbour cell
            if (!isLeftEdge && aliveOrDead[i - 1]) {
                liveNeighbourCount++;
            }
            // checking right neighbour cell
            if (!isRightEdge && aliveOrDead[i + 1]) {
                liveNeighbourCount++;
            }
            // checking bottom-left neighbour cell
            if (!isLeftEdge && !isBottomEdge && aliveOrDead[i + this.cols - 1]) {
                liveNeighbourCount++;
            }
            // checking bottom neighbour cell
            if (!isBottomEdge && aliveOrDead[i + this.cols]) {
                liveNeighbourCount++;
            }
            // checking bottom-right neighbour cell
            if (!isBottomEdge && !isRightEdge && aliveOrDead[i + this.cols +1]) {
                liveNeighbourCount++;
            }
            nextAliveOrDead[i] = aliveOrDead[i] 
                ? liveNeighbourCount >= 2 && liveNeighbourCount <= 3
                : liveNeighbourCount === 3;
            if (nextAliveOrDead[i]) {
                this.cells[i].resurrect();
            } else {
                this.cells[i].die();
            }
        }
        let shouldStop = true;
        let hasLiveCells = false;
    
        for (let i = 0; i < nextAliveOrDead.length; i++) {
            if (nextAliveOrDead[i] !== aliveOrDead[i]) {
                shouldStop = false;
                
            }
            if (nextAliveOrDead[i]) {
                hasLiveCells = true;
            }
        }

        return !shouldStop && hasLiveCells;

    }
}
