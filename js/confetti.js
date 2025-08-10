(function() {
    var canvas = document.getElementById('confetti');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var colors = ['#ffccff', '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff'];
    var animationId;
    var isRunning = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

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

    function initParticles() {
        particles = []; // Clear existing particles
        for (var i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isRunning) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        animationId = requestAnimationFrame(animate);
    }

    function startConfetti() {
        if (isRunning) return;
        
        resizeCanvas();
        initParticles();
        isRunning = true;
        animate();
    }

    function stopConfetti() {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Check if confetti should run based on canvas visibility
    function checkConfettiState() {
        var canvasStyle = window.getComputedStyle(canvas);
        if (canvasStyle.display !== 'none' && !isRunning) {
            startConfetti();
        } else if (canvasStyle.display === 'none' && isRunning) {
            stopConfetti();
        }
    }

    // Observer to watch for visibility changes
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                checkConfettiState();
            }
        });
    });

    // Start observing
    observer.observe(canvas, { attributes: true });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (isRunning) {
            resizeCanvas();
        }
    });

    // Initial check
    setTimeout(checkConfettiState, 100);
})(); 