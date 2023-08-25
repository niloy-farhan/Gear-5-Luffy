const image = new image();
image.src = "./lll.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContex("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

image.addEventListener("load", function () {
  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = this.effect.gap - 1;
      this.originX = Math.floor(x);
      this.originY = Math.floor(y);
      this.vx = 0;
      this.vy = 0;
      this.friction = 0.8;
      this.ease = 0.05;
      this.dx = 0;
      this.dy = 0;
      this.distance = 0;
      this.force = 0;
      this.angle = 0;
    }

    update() {
      this.dx = this.effect.mouse.x - this.x;
      this.dy = this.effect.mouse.y - this.y;
      this.distance = this.dx * this.dx + this.dy * this.dy;
      this.force = -this.effect.mouse.radius / this.distance;

      if (this.distance < this.effect.mouse.radius) {
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x +=
        (this.vs *= this.friction) + (this.originX - this.x) * this.ease;
      this.y +=
        (this.vs *= this.friction) + (this.originy - this.y) * this.ease;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  class Effect {
    constructor(width, height) {
      this.widh = width;
      this.height = height;
      this.image = image;
      this.particlesArray = [];
      this.centerX = this.width * 0.5;
      this.centerY = this.height * 0.5;
      this.x = this.centerX - this.image.width * 0.5;
      this.y = this.centerY - this.image.height * 0.5;
      this.gap = 4;
      this.gap = 4;
      this.mouse = {
        radius: 3000,
        x: 0,
        y: 0,
      };

      window.addEventListener("mousemove", (event) => {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
      });
    }

    update() {
      this.particlesArry.forEach((p) => p.update());
    }
    draw() {
      this.particlesArry.forEach((p) => p.draw());
    }
    init() {
      ctx.drawImage(this.image, this.x, this.y);
      const pixel = ctx.getImageData(0, 0, this.width, this.height).data;
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          const i = (y * this.width + x) * 4;
          const r = pixel[i];
          const g = pixel[i + 1];
          const b = pixel[i + 2];
          const a = pixel[i + 3];
          const c = `rgb(${r}, ${g}, ${b})`;

          if (a > 0) {
            this.particlesArry.push(new Particle(this, x, y, c));
          }
        }
      }
    }
  }

  const effect = new Effect(canvas.width, canvas.height);
  effect.init();

  function animate() {
    effect.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw();
    requestAnimationFrame(animate);
  }
  animate();
});
