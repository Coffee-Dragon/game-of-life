export class Gui {
    /**
     * @param startBtn {HTMLButtonElement}
     * @param stopBtn {HTMLButtonElement}
     * @param pauseBtn {HTMLButtonElement}
     */
    constructor(startBtn, stopBtn, pauseBtn) {
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
        this.pauseBtn = pauseBtn;
        this.startBtn.addEventListener('click', this.onStart);
        this.stopBtn.addEventListener('click', this.onStop);
        this.pauseBtn.addEventListener('click', this.onPause);
    }

    setGame(game) {
        this.game = game;
        this.game.callback = () => {
            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;
            this.pauseBtn.disabled = true;
        };
    }
    setField(field) {
        this.field = field;
    }

    onStart = () => {
        this.field.seedLife();
        this.game.play();
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.pauseBtn.disabled = false;
    }

    onStop = () => {
        this.game.pause();
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.pauseBtn.disabled = true;
    }

    onPause = () => {
        if (this.game.isIntervalOn) {
            this.game.pause();
            this.pauseBtn.innerHTML = 'unpause';
        } else {
            this.field.nextGen();
            this.game.play();
            this.pauseBtn.innerHTML = 'pause';
        }        
    }
}