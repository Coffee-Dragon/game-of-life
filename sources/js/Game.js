export class Game {
    get isIntervalOn() {
        return typeof this.intervalID !== 'undefined';
    }

    /** 
     * @param field {Field} object that holds the main game field
     * @param callback {function} will be executed when there are no next steps of the game
    //  * @param startBtn {HTMLButtonElement} the start button
    //  * @param stopBtn {HTMLButtonElement} the stop button
    //  * @param pauseUnpauseBtn {HTMLButtonElement} the button that pauses and unpauses the game process
     */
    constructor(field, callback) {
        this.field = field;
        this.callback = callback;
    }

    play() {
        this.intervalID = setInterval(() => {
            const hasNextStep = this.field.nextGen();
            if (!hasNextStep) {
                this.pause();
                this.callback();
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.intervalID);
        this.intervalID = undefined;
    }
}
