const image = new image();
image.src = "./luffy.png";
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
      this.size = 3;
    }

    updateI() {}
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect();
    }
  }
});
