class Entity {
  constructor() {
    this.x = 0;
    this.y = random(windowHeight * 0.9);  // Keeps entities within 90% of the screen
    this.speed = random(0.5,2);
    this.lane = null;
  }

  update() {
    this.speed += 1/pow(this.lane.p.length,4);
    this.y += this.speed;

    // Ensure it doesn't go out of bounds
    if (this.y > windowHeight) {
      this.y = 0;
    }
    this.lane.speed = averageSpeed(this.lane.p)
    // console.log(`Entity in lane ${this.lane ? lanes.indexOf(this.lane) : 'N/A'} at y=${this.y}`);
  }

  show() {
    let c = map(this.x, 0, windowWidth, 0, 360);
    fill(c, 50, 50);
    stroke(255); // Add white stroke for visibility
    ellipse(this.lane.x, this.y, 10, 10);
  }
}
