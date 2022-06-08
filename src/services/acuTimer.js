
import beatSound from '../Sounds/beatSound.wav';



function AccurateTime(interval) {
    this.beat = new Audio(beatSound);
    this.interval = interval;

    this.start = () => {
        this.expected = Date.now() + this.interval;//gets the interval + the additional time it may take to acheieve task
        this.timeout = setTimeout(this.driftFix, this.interval);
    }
    this.stop = () => {
        clearTimeout(this.timeout);
    }
    this.driftFix = () => {
        let drift = Date.now() - this.expected;
            if(drift > this.interval) {
                console.log("interval error, likely browser's tab focus has changed")
                this.stop()
            }
        this.beat.play();//run inserted callback function
        this.expected += this.interval;
        
        this.timeout = setTimeout(this.driftFix, this.interval - drift);
    }
}

export default AccurateTime;