class CoreUtils {

    constructor() {
        this.MAXSTEPS = 20;

        // ENUMS
        this.PAD = {
            GREEN: '0',
            RED: '1',
            YELLOW: '2',
            BLUE: '3'
        };

        this.GAME = {
            WIN: 'win',
            LOST: 'lost',
            KEEPGOING: 'keepgoing',
            STEPUP: 'stepup'
        };

        this.STATUS = {
            RUNNING: 'running',
            STOP: 'stop'
        };
    }
}

export default new CoreUtils();