const field = document.querySelector('.field');
const fieldFrag = document.createDocumentFragment();
const cells = [];

for (let i=0; i<100; i++) {
    const cell = document.createElement('div');
    fieldFrag.appendChild(cell);
    cells.push(cell);
}

field.appendChild(fieldFrag);

const startBtn = document.querySelector('.btn-bar__btn--start');

function seedLife() {
    for (let cell of cells) {
        if (Math.random() > 0.5) {
            cell.classList.add('live');
        } else {
            cell.classList.remove('live');
        }
    }
}

startBtn.addEventListener('click', seedLife);

