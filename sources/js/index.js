import { Field } from "./Field.js";
import { Game } from "./Game.js";
import { Gui } from "./Gui.js";

const startBtn = document.querySelector('.btn-bar__btn--start');
const stopBtn = document.querySelector('.btn-bar__btn--stop');
const pauseBtn = document.querySelector('.btn-bar__btn--pause');

const field = new Field(document.querySelector('.field'));
const game = new Game(field);
const gui = new Gui(startBtn, stopBtn, pauseBtn);

gui.setGame(game);
gui.setField(field);