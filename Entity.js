class Entity {
  constructor() {
    this.x = 0;
    this.y = random(windowHeight * 0.9);  // Keeps entities within 90% of the screen
    this.speed = random(0.5,2);
    this.lane = null;
    this.lastLane = null;
    this.latency = latency + random(100);
    this.changed = false;
    this.width = windowWidth/nLanes/10;
    this.height = this.width * 2;

  }

  initialize(){
    this.x = this.lane.x
    this.y = random(100, windowHeight-200);
    this.c = map(this.lane.x, 0, windowWidth, 0, 360);
  }

  update() {
    if(!this.lane){ throw("No Lane detected") }

    this.speed += 1/pow(this.lane.p.length,2);
    if(this.speed>=1){
      this.speed -= this.lane.p.length/900;
    }
    this.y += this.speed;
    this.x = this.lane.x + (noise( ((frameCount + this.y + this.speed)/200)) - 0.5) * this.width/2;
    // Ensure it doesn't go out of bounds
    if (this.y > windowHeight) {
      this.y = 0;
    }
    this.lane.speed = averageSpeed(this.lane.p);
    // console.log(`Entity in lane ${this.lane ? lanes.indexOf(this.lane) : 'N/A'} at y=${this.y}`);
    if(this.speed>=maxSpeed){
      this.speed = maxSpeed;
    }


    if(this.changed){
      this.latency -= 1;
    }

    if(this.latency<=0){
      this.changed = false;
      this.latency = latency+random(100);
    }

  }

  show() {
    push();
      fill(this.c, 50, 50);
      stroke(0); // Add white stroke for visibility
      rect(this.x, this.y, this.width, this.height, 10);
    pop();
  }
}
