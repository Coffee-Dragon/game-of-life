const field = document.querySelector('.field');
const fieldFrag = document.createDocumentFragment();
const cells = [];
let liveOrDead = [];
const rowLength = 10;

for (let i=0; i<100; i++) {
    const cell = document.createElement('div');
    fieldFrag.appendChild(cell);
    cells.push(cell);
}

field.appendChild(fieldFrag);

const startBtn = document.querySelector('.btn-bar__btn--start');

function seedLife() {
    for (let i=0; i < cells.length; i++) {
        const cell = cells[i];
        if (Math.random() > 0.5) {
            cell.classList.add('live');
            liveOrDead[i] = true;
        } else {
            cell.classList.remove('live');
            liveOrDead[i] = false;
        }
    }
}

let intervalID;

const nextStep = () => {
    const nextAliveOrDead = [];
    for (let i = 0; i < cells.length; i++) {
        const isLeftEdge = (i % rowLength) === 0;
        const isTopEdge = i < rowLength;
        const isRightEdge = ((i + 1) % rowLength) === 0;
        const isBottomEdge = i >= (cells.length - rowLength);
        let liveNeighbourCount = 0;
        // checking top-left neighbour cell
        if (!isLeftEdge && !isTopEdge && liveOrDead[i - rowLength - 1]) {
            liveNeighbourCount++;
        }
        // checking top neighbour cell
        if (!isTopEdge && liveOrDead[i - rowLength]) {
            liveNeighbourCount++;
        }
        // checking top-right neighbour cell
        if (!isTopEdge && !isRightEdge && liveOrDead[i - rowLength + 1]) {
            liveNeighbourCount++;
        }
        // checking left neighbour cell
        if (!isLeftEdge && liveOrDead[i - 1]) {
            liveNeighbourCount++;
        }
        // checking right neighbour cell
        if (!isRightEdge && liveOrDead[i + 1]) {
            liveNeighbourCount++;
        }
        // checking bottom-left neighbour cell
        if (!isLeftEdge && !isBottomEdge && liveOrDead[i + rowLength - 1]) {
            liveNeighbourCount++;
        }
        // checking bottom neighbour cell
        if (!isBottomEdge && liveOrDead[i + rowLength]) {
            liveNeighbourCount++;
        }
        // checking bottom-right neighbour cell
        if (!isBottomEdge && !isRightEdge && liveOrDead[i + rowLength +1]) {
            liveNeighbourCount++;
        }
        nextAliveOrDead[i] = liveOrDead[i] 
            ? liveNeighbourCount >= 2 && liveNeighbourCount <= 3
            : liveNeighbourCount === 3;
        if (nextAliveOrDead[i]) {
            cells[i].classList.add('live');
        } else {
            cells[i].classList.remove('live');
        }
    }
    liveOrDead = nextAliveOrDead;
}

startBtn.addEventListener('click', () => {
    seedLife();
    intervalID = setInterval(nextStep, 1000);
});

const stopBtn = document.querySelector('.btn-bar__btn--stop');

stopBtn.addEventListener('click', () => {
    clearInterval(intervalID);
});