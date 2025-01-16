let lanes = []
let nLanes = 3;
function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
  fill(255);
  for(let i = 0 ; i <  nLanes; i++){
    let lane;
    lane = new Lane();
    lanes.push(lane);
    lane.speed = random(1);
    lane.width = (windowWidth-200)/nLanes;
    lane.x =  (windowWidth-200)/nLanes * i;
  }
  for(let lane of lanes){
    createEntities(100,lane);
  }
}

function draw(){
  background(0);

  for(let lane of lanes){
    lane.showEntities();
    for(let el of lane.p){
      el.update();
      el.show();
    }
  }
}

function average(list){
  let counter = 0;
  for(el of list){
    counter+=el.speed;
  }
  counter/=list.length
  return counter
}

function createEntities(n, lane){
  let entity;
  for(let i = 0 ; i < n ; i++){
    entity = new Entity()
    entity.lane = lane
    entity.speed = lane.speed
    lane.addEntity(entity);
  }
}
