class Lane{
  constructor(){
    this.p = [];
    this.speed = averageSpeed(this.p);
    this.width = undefined;
    this.x = undefined;
  }

  addEntity(entity){
    this.p.push(entity);
    entity.changed = true;
    this.speed = averageSpeed(this.p);
    entity.x = this.x;
    entity.lane = this;
  }

  moveEntity(otherLane){
    let ent = this.p[this.p.length-1];
    otherLane.addEntity(ent);
    this.p.pop();
  }

  removeEntity() {
    if(!this.p[0]){
      throw("Entity doesn't exist.");
      return;
    }
    if (this.p.length > 0) {
      this.p.pop();
      this.speed = averageSpeed(this.p);
    }
    // console.log(`Lane ${lanes.indexOf(this)} now has ${this.p.length} entities`);
  }

  showEntities() {
      // console.log(`Rendering ${this.p.length} entities in lane at x=${this.x}`);
      for (let el of this.p) {
          el.show();
      }
  }

  show(){
    let i;
    let pace;

    push();
      rectMode(CENTER);
      fill( 0 , 0 , 20 );
      noStroke();
      rect( this.x, windowHeight/2 , this.width+1, windowHeight);
      strokeWeight(30/nLanes);
      stroke('white');
      i=0;
      pace = windowHeight/10;
      while(i*pace < windowHeight){
        line(this.x - this.width/2 -20, i*windowHeight/10 , this.x - this.width/2 - 20, i*windowHeight/10+windowHeight/20)
        i++;
      }
    pop();
  }
}
