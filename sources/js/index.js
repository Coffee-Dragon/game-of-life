import {Field} from "./Field.js";
import { Game } from "./Game.js";

const field = new Field(document.querySelector('.field'));
const game = new Game(field, () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
});

const startBtn = document.querySelector('.btn-bar__btn--start');
startBtn.addEventListener('click', () => {
    field.seedLife();
    game.play();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = false;
});

const stopBtn = document.querySelector('.btn-bar__btn--stop');
stopBtn.addEventListener('click', () => {
    game.pause();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
});

const pauseBtn = document.querySelector('.btn-bar__btn--pause');
pauseBtn.addEventListener('click', () => {
    if (game.isIntervalOn) {
        game.pause();
        pauseBtn.innerHTML = 'unpause';
    } else {
        field.nextGen();
        game.play();
        pauseBtn.innerHTML = 'pause';
    }
});