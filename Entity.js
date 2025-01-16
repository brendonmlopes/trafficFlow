class Entity{

  constructor(){
    this.lane = undefined;
    this.speed = undefined;
    this.x = undefined;
    this.y = undefined;
  }

  update(){
    this.x = this.lane.x;
    this.y += this.speed*dt;
    this.speed = this.lane.speed + noise(frameCount + this.y*10)*sNoise-sNoise/2;
    this.outOfBounds();
  }

  outOfBounds(){
    if(this.y>windowHeight){
      this.y = 0;
    }
  }

  show(){
    let mappedColor = map(this.speed, 0 , 20, 0 , 300);
    fill(mappedColor,50,50)
    ellipse(this.x,this.y,15);
  }
}
