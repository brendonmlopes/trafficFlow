
let lanes = []
let nLanes = 3;
const dt = 0.01;
const sNoise = 0.1;
let k = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  fill(255);
  colorMode(HSL);
  frameRate(20);
  console.log("Called Setup");

//// Create the transport matrix
  //0 [k(i-1)(i)]
  //1 [k(i+1)(i)]
  //2 [k(i)(i-1)]
  //3 [k(i)(i+1)]
  //4 [alpha]
  //5 [epsilon]
  //6 [sigma]

  for (let i = 0; i < nLanes + 2; i++) {
    if (i === 0) {
      k.push([0, 1, 0, 1, 1, 0, 0]);
    } else if (i === nLanes + 1) {
      k.push([1, 1, 1, 1, 1, 1, 0]);
    } else {
      k.push([1, 1, 1, 1, 1, 0, 1]);
    }
  }

// Create lanes
for (let i = 0; i < nLanes; i++) {
    let lane = new Lane();
    lanes.push(lane);

    lane.speed = random(5, 10);  // Ensure it's always a number
    if (isNaN(lane.speed) || lane.speed <= 0) {
        lane.speed = 5; // Default fallback speed to avoid NaN
    }

    lane.width = (windowWidth - 200) / nLanes;
    lane.x = (windowWidth - 200) / nLanes * (i + 2 / 3);
}

  // Create entities
  for (let lane of lanes) {
    createEntities(100, lane);
  }

  // Initialize entities' values
  for (let lane of lanes) {
    for (let el of lane.p) {
      el.y = random(windowHeight);
    }
  }
}
function draw() {
  background(0);

  for (let lane of lanes) {
    lane.showEntities();
    for (let el of lane.p) {
      el.update();
      el.show();
    }
  }

  // Apply Runge-Kutta Integration for population change
  for (let i = 0; i < lanes.length; i++) {
    let lane = lanes[i];
    let pop = lane.p.length;

    let pPop = i > 0 ? lanes[i - 1].p.length : 0;
    let nPop = i < lanes.length - 1 ? lanes[i + 1].p.length : 0;

    let k1 = dpdt(pop, pPop, nPop, i);
    let k2 = dpdt(pop + 0.5 * dt * k1, pPop, nPop, i);
    let k3 = dpdt(pop + 0.5 * dt * k2, pPop, nPop, i);
    let k4 = dpdt(pop + dt * k3, pPop, nPop, i);

    let newPop = Math.max(1, pop + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4)); // Ensure minimum 1

    console.log(`Lane ${i} | Current: ${pop}, New: ${newPop}`);
    moveEntitiesBetweenLanes(i, newPop);
  }
}

// Function to compute dp/dt based on the transport model
function dpdt(pop, pPop, nPop, i) {
    let lane = lanes[i];
    if (!lane) return 0; // Prevent errors if lane is undefined

    let speed = lane.speed || 5; // Default speed fallback
    let nextSpeed = (i < lanes.length - 1 && lanes[i + 1].speed) ? lanes[i + 1].speed : 5;
    let prevSpeed = (i > 0 && lanes[i - 1].speed) ? lanes[i - 1].speed : 5;

    let inflow = 0, outflow = 0;

    if (i === 0) {  // First lane (no left lane)
        inflow = k[i][1] * nPop * speed;
        outflow = k[i][4] * pop / (speed || 1) + (nPop > 0 ? k[i][3] * nextSpeed / Math.max(1, nPop) : 0);
    } else if (i === lanes.length - 1) { // Last lane (no right lane)
        inflow = k[i][0] * pPop * speed;
        outflow = k[i][4] * pop / (speed || 1) + (pPop > 0 ? k[i][2] * prevSpeed / Math.max(1, pPop) : 0);
    } else { // Middle lanes
        inflow = k[i][0] * pPop * speed + k[i][1] * nPop * speed;
        outflow = k[i][4] * pop / (speed || 1)
                + (pPop > 0 ? k[i][2] * prevSpeed / Math.max(1, pPop) : 0)
                + (nPop > 0 ? k[i][3] * nextSpeed / Math.max(1, nPop) : 0);
    }

    let dp = inflow - outflow + k[i][5] - k[i][6];

    if (isNaN(dp)) {
        console.error(`NaN detected in dpdt for lane ${i}. Values: pop=${pop}, pPop=${pPop}, nPop=${nPop}, speed=${speed}, prevSpeed=${prevSpeed}, nextSpeed=${nextSpeed}`);
        dp = 0; // Prevent breaking the simulation
    }

    return dp;
}



// Function to move entities between lanes based on RK4 calculations
function moveEntitiesBetweenLanes(i, newPop) {
  let lane = lanes[i];
  let currentPop = lane.p.length;
  let diff = Math.round(newPop - currentPop);

  console.log(`Lane ${i} | Current: ${currentPop}, New: ${newPop}, Diff: ${diff}`);

  let moved = 0;

  if (diff > 0) {
    // Need to pull entities from neighboring lanes
    if (i > 0 && lanes[i - 1].p.length > 0) {
      let numToMove = Math.min(lanes[i - 1].p.length, Math.ceil(k[i][0] * diff));
      moved += transferEntities(lanes[i - 1], lane, numToMove);
    }
    if (i < lanes.length - 1 && lanes[i + 1].p.length > 0) {
      let numToMove = Math.min(lanes[i + 1].p.length, Math.ceil(k[i][1] * diff));
      moved += transferEntities(lanes[i + 1], lane, numToMove);
    }
  } else if (diff < 0) {
    // Need to move entities out
    if (i > 0 && lane.p.length > 0) {
      let numToMove = Math.min(lane.p.length, Math.abs(Math.floor(k[i][2] * diff)));
      moved += transferEntities(lane, lanes[i - 1], numToMove);
    }
    if (i < lanes.length - 1 && lane.p.length > 0) {
      let numToMove = Math.min(lane.p.length, Math.abs(Math.floor(k[i][3] * diff)));
      moved += transferEntities(lane, lanes[i + 1], numToMove);
    }
  }

  console.log(`Lane ${i} moved/pulled ${moved} entities, now has ${lane.p.length}.`);
}



// Function to transfer entities safely and return count
function transferEntities(fromLane, toLane, numEntities) {
  let actualMoved = 0;

  numEntities = Math.min(numEntities, fromLane.p.length); // Ensure we don't remove too many

  for (let i = 0; i < numEntities; i++) {
    if (fromLane.p.length > 0) {
      let entity = fromLane.p.pop();
      entity.lane = toLane;
      toLane.p.push(entity);

      // Fix NaN issue by reassigning y position if it becomes undefined
      if (isNaN(entity.y) || entity.y === undefined) {
        entity.y = random(windowHeight);
        console.warn(`Fixed NaN position for entity in lane ${lanes.indexOf(toLane)}`);
      }

      actualMoved++;
    }
  }

  console.log(`Transferred ${actualMoved} entities from Lane ${lanes.indexOf(fromLane)} to Lane ${lanes.indexOf(toLane)}.`);
  return actualMoved;
}



// Function to update lane population based on RK4 output
function updateLanePopulation(lane, oldPop, newPop) {
  if (newPop > 0) {
    for(let i = 0 ; i < Math.floor(newPop - oldPop) ; i++ ){
      lane.moveEntity()
    }
  } else {
    for (let i = 0; i < Math.floor(lane.p.length - newPop); i++) {
      lane.removeEntity();
    }
  }
}

function createEntities(n, lane) {
  for (let i = 0; i < n; i++) {
    let entity = new Entity();
    entity.lane = lane;
    entity.speed = lane.speed;
    lane.addEntity(entity);
  }
}

function average(list){
  let counter = 0;
  for(let el of list){
    counter+=el;
  }
  counter/= list.length;
  return counter;
}
