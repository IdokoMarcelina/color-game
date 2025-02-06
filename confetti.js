class ConfettiGenerator {
    constructor(settings) {
        this.target = document.getElementById(settings.target);
        this.canvas = this.target;
        this.ctx = this.canvas.getContext("2d");
        this.confetti = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.init();
    }

    init() {
        for (let i = 0; i < 150; i++) {
            this.confetti.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                tilt: Math.random() * 10 - 5,
                tiltAngleIncrement: Math.random() * 0.1 + 0.04,
                tiltAngle: Math.random() * Math.PI,
            });
        }
    }

    render() {
        this.interval = setInterval(() => {
            this.update();
            this.draw();
        }, 30);
    }

    clear() {
        clearInterval(this.interval);
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    update() {
        for (let i = 0; i < this.confetti.length; i++) {
            let c = this.confetti[i];
            c.y += c.d;
            c.tiltAngle += c.tiltAngleIncrement;
            c.tilt = Math.sin(c.tiltAngle) * 10;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.confetti.length; i++) {
            let c = this.confetti[i];
            this.ctx.beginPath();
            this.ctx.arc(c.x + c.tilt, c.y, c.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = c.color;
            this.ctx.fill();
        }
    }
}

export default ConfettiGenerator;
