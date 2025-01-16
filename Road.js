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
