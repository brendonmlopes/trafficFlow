class Entity{

  constructor(){
    this.lane = undefined;
    this.speed = undefined;
    this.x = undefined;
    this.y = undefined;
  }

  update(){
    this.x = this.lane;
    this.y += this.speed;
    this.speed = this.road.speed + random(0.01)-0.01/2;
  }

  show(){
    ellipse(this.x,this.y,10);
  }
}
