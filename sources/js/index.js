
import {Cell} from "./Cell.js";

const field = document.querySelector('.field');
const fieldFrag = document.createDocumentFragment();
const cells = [];
const rowLength = 10;
let isIntervalOn = false;

for (let i=0; i<100; i++) {
    const div = document.createElement('div');
    fieldFrag.appendChild(div);
    cells.push(new Cell(div));
}

field.appendChild(fieldFrag);
const startBtn = document.querySelector('.btn-bar__btn--start');
/**
 * Randomly attributes live class to div cells inside the playing field.
 */
function seedLife() {
    for (let i=0; i < cells.length; i++) {
        const cell = cells[i];
        if (Math.random() > 0.5) {
            cell.resurrect();
        } else {
            cell.die();
        }
    }
}

let intervalID;

const nextStep = () => {
    const nextAliveOrDead = [];
    const aliveOrDead = cells.map(element => element.isAlive);
    for (let i = 0; i < cells.length; i++) {
        const isLeftEdge = (i % rowLength) === 0;
        const isTopEdge = i < rowLength;
        const isRightEdge = ((i + 1) % rowLength) === 0;
        const isBottomEdge = i >= (cells.length - rowLength);
        let liveNeighbourCount = 0;
        // checking top-left neighbour cell
        if (!isLeftEdge && !isTopEdge && aliveOrDead[i - rowLength - 1]) {
            liveNeighbourCount++;
        }
        // checking top neighbour cell
        if (!isTopEdge && aliveOrDead[i - rowLength]) {
            liveNeighbourCount++;
        }
        // checking top-right neighbour cell
        if (!isTopEdge && !isRightEdge && aliveOrDead[i - rowLength + 1]) {
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
        if (!isLeftEdge && !isBottomEdge && aliveOrDead[i + rowLength - 1]) {
            liveNeighbourCount++;
        }
        // checking bottom neighbour cell
        if (!isBottomEdge && aliveOrDead[i + rowLength]) {
            liveNeighbourCount++;
        }
        // checking bottom-right neighbour cell
        if (!isBottomEdge && !isRightEdge && aliveOrDead[i + rowLength +1]) {
            liveNeighbourCount++;
        }
        nextAliveOrDead[i] = aliveOrDead[i] 
            ? liveNeighbourCount >= 2 && liveNeighbourCount <= 3
            : liveNeighbourCount === 3;
        if (nextAliveOrDead[i]) {
            cells[i].resurrect();
        } else {
            cells[i].die();
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
    if (shouldStop || !hasLiveCells) {
        stop();
    }

}

const start = () => {
    intervalID = setInterval(nextStep, 1000);
    isIntervalOn = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = false;
}
const stop = () => {
    clearInterval(intervalID);
    isIntervalOn = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
}
const pauseUnpause = () => {
    if (isIntervalOn) {
        clearInterval(intervalID);
        isIntervalOn = false;
        pauseBtn.innerHTML = 'unpause';
    } else {
        nextStep();
        intervalID = setInterval(nextStep, 1000);
        isIntervalOn = true;
        pauseBtn.innerHTML = 'pause';
    }
}

startBtn.addEventListener('click', () => {
    seedLife();
    start();
});

const stopBtn = document.querySelector('.btn-bar__btn--stop');

stopBtn.addEventListener('click', stop);

const pauseBtn = document.querySelector('.btn-bar__btn--pause');

pauseBtn.addEventListener('click', pauseUnpause);