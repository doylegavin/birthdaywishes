(function() {
    var canvas = document.getElementById('confetti');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var colors = ['#ffccff', '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 5 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 3 + 1;
    }

    Particle.prototype.update = function() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    };

    Particle.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };

    function handleParticles() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
    }

    function init() {
        for (var i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();
})();
