let lanes = []
let nLanes = 3;
const dt = 1
const sNoise = 10
let k = [];
function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
  fill(255);
  colorMode(HSL);
  frameRate(2);
  console.log("Called Setup")
////Create the transport Matrix
//0 [k(i-1)(i)]
//1 [k(i+1)(i)]
//2 [k(i)(i-1)]
//3 [k(i)(i+1)]
//4 [alpha]
//5 [epsilon]
//6 [sigma]

  for(let i = 0 ; i < nLanes + 2 ; i++){
    if(i===0){
      k.push([0,1,0,1,1,0,0]);
    }else if(i===nLanes+1){
      k.push([1,0,1,0,1,0,0]);
    }else{
      k.push([1,1,1,1,1,0,0]);
    }
  }
//Create Lanes
  for(let i = 0 ; i <  nLanes; i++){
    let lane;
    lane = new Lane();
    lanes.push(lane);
    lane.speed = random(5,10);
    lane.width = (windowWidth-200)/nLanes;
    lane.x =  (windowWidth-200)/nLanes * (i+2/3);
  }
//Create entities
  for(let lane of lanes){
    createEntities(10,lane);
  }
//Initialize entitites' values
  for(let lane of lanes){
    for(let el of lane.p){
      el.y = random(windowHeight);
    }
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

//calculate p for the lanes
  for(let i = 0 ; i <lanes.length ; i++){
    let pPop;
    let nPop;
    let lane = lanes[i];
    let pop = lane.p.length;
    if(i!=0){
      pPop = lanes[i-1].p.length;
    }
    if(i != lanes.length - 1){
      nPop = lanes[i+1].p.length;
    }
    if(i===0){
      console.log("Calculating p for first layer")
      pop += (k[i][1] * nPop)*lane.speed - k[i][4] * pop / lane.speed - k[i][3] * lanes[i+1].speed / nPop + k[i][5] - k[i][6];
      if(pop>0){
        createEntities(Math.floor(pop),lanes[i]);
      }else{
        for(let i = 0 ; i < Math.floor(pop) ; i++){
          lane.removeEntity()
        }
      }
    }else if(i===lanes.length-1){
      console.log("Calculating p for "+i+"th layer")
      pop += (k[i][0] * pPop)*lane.speed - k[i][4] * pop / lane.speed - k[i][2] * lanes[i-1].speed / pPop + k[i][5] - k[i][6];
      if(pop>0){
        createEntities(Math.floor(pop),lanes[i]);
      }else{
        for(let i = 0 ; i < Math.floor(pop) ; i++){
          lane.removeEntity()
        }
      }
    }else{
      console.log("Calculating p for last layer")
      pop += (k[i][0] * pPop + k[i][1] * nPop)*lane.speed - k[i][4] * pop / lane.speed - k[i][2] * lanes[i-1].speed / pPop - k[i][3] * lanes[i+1].speed / nPop + k[i][5] - k[i][6];
      if(pop>0){
        createEntities(Math.floor(pop),lanes[i]);
      }else{
        for(let i = 0 ; i < Math.floor(pop) ; i++){
          lane.removeEntity()
        }
      }
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
