class Lane{
  constructor(){
    this.p = [];
    this.speed = average(this.p);
    this.width = undefined;
    this.x = undefined;
  }

  addEntity(entity){
    this.p.push(entity);
    this.speed = average(this.p);
    entity.x = this.x;
    entity.lane = this;
  }

  moveEntity(otherLane){
    let ent = this.p[this.p.length-1];
    otherLane.addEntity(ent);
    this.pop();
  }

  removeEntity(){
    this.p.pop();
    this.speed = average(this.p);
  }

  showEntities(){
    for(let el of this.p){
      el.show()
    }
  }

}
