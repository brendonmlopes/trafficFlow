class Entity {
  constructor() {
    this.x = 0;
    this.y = random(windowHeight);
    this.speed = 1;
    this.lane = null;
  }

  update() {
    this.y += this.speed;

    // Ensure it doesn't go out of bounds
    if (this.y > windowHeight) {
      this.y = 0;
    }

    // console.log(`Entity in lane ${this.lane ? lanes.indexOf(this.lane) : 'N/A'} at y=${this.y}`);
  }

  show() {
    let c = map(this.x, 0 , windowWidth, 0 , 360)
    fill(c,50,50)
    ellipse(this.x, this.y, 10, 10);
  }
}
