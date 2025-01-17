class Lane{
  constructor(){
    this.p = [];
    this.speed = averageSpeed(this.p);
    this.width = undefined;
    this.x = undefined;
  }

  addEntity(entity){
    this.p.push(entity);
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


}
