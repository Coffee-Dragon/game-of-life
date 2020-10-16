import {Field} from "./Field.js";

const field = new Field(document.querySelector('.field'));
let isIntervalOn = false;

const startBtn = document.querySelector('.btn-bar__btn--start');

let intervalID;

const nextStep = () => {
    const hasNextStep = field.nextGen();
    if (!hasNextStep) {
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
    field.seedLife();
    start();
});

const stopBtn = document.querySelector('.btn-bar__btn--stop');

stopBtn.addEventListener('click', stop);

const pauseBtn = document.querySelector('.btn-bar__btn--pause');

pauseBtn.addEventListener('click', pauseUnpause);