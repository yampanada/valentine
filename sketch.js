let x = 0
let y = 0
let room;
let pot;
let can;
let note;
let env;
let noteTotal = 5
let notes = []


let canX;
let canY;
let canR = 0;
let w;
let h;
let touch = 0;
let water = []
let thirst = 600;
let dayLight;
let stars = [];
let clouds = [];
let plantIt = 0
let sentence = "F"
let rules = ["F", "FF+[+F-F-F]-[-F+F+F]"]
let rules2 = ["F", "F[-F]F[+F]F"]
let len;
let box;
let flowerCol;


function preload() {
  for (let i=1; i <= noteTotal; i++) {
    notes.push(i)
  }
  let noteNum = random(notes).toString()
  note = loadImage('Library/Notes/' + noteNum + '.JPG')

  let envNum = random([1, 2, 3]).toString()
  env = loadImage('Library/Envelopes/' + envNum + '.PNG')


  room = loadImage('Library/room.PNG')
  pot = loadImage('Library/pot.PNG')
  can = loadImage('Library/can.PNG')

}

function gen() {
  len *= .5
  if (plantIt < 5) {
    plantIt += 1
    let newSent = "";
    for (let i=0; i<sentence.length; i++) {
      let r = random(100)
      if (sentence[i] == rules[0] && r > 50) {
        newSent += rules[1]
      } else if (sentence[i] == rules[0] && r <= 50) { newSent += rules2[1]
      } else {newSent += sentence[i]}
      if (r < 5) { newSent += "*" 
      } else if (r > 90) { newSent += "8"
    }
  }
  sentence = newSent;
  turtle();
  }
}

function turtle() {
  //background(51);
  push();
  stroke(0, 255, 100, 100);
  resetMatrix();
  translate(width/2 + w/16, height/2 + h/12)
  for (let i=0; i<sentence.length; i++) {
   let current = sentence[i];
   if (current == "F") {
      line(0,0,0, -len)
      translate(0, -len)
} else if (current == "+") {
      rotate(PI/6 + PI/(30-plantIt))
} else if (current == "-") {
      rotate(-PI/6 - PI/(30-plantIt))
} else if (current == "[") {
      push();
} else if (current == "]") {
      pop();
} else if (current == "*") {
      push();
      fill(flowerCol.x, flowerCol.y, flowerCol.z, 150)
      ellipseMode(CORNER)
      stroke(0, 50)
      for (let i=0; i<6; i++) {
      rotate(i*PI/3)
      ellipse(0, 0, 20, 3)
     }
      pop();
} else if (current == "8") {
      push();
      ellipseMode(CORNER)
      fill(0, 255, random(255), 120)
      stroke(0, 50);
      ellipse(0, 0, 10, 3)
      pop();
 }
 } pop();
}


function setup() {
  len = height/2
  
  createCanvas(windowWidth, windowHeight);
  h = windowHeight
  w = h*.7496
  room.resize(w, h)
  pot.resize(w/4, h/6)
  can.resize(w/3, h/4)
  env.resize(w/4, h/6)
  note.resize(.8*w, .8*w)
  canX = width/2 + w/5.5
  canY = height/1.73
  dayLight = sin(hour()/23 * PI)
  flowerCol = createVector(random(255), random(255), random(255))
  turtle();

}

function touchStarted() {
  touch = 1

  if (plantIt == 5) {
    fill(100, 25, 50)
    rect(0, 0, width, height)
    image(note, width/2 - w/2, 0)
  }

}

function touchEnded() {
  touch = 0
}

function draw() {
  background(100)
  image(room, width/2 - w/2, 0)
  image(pot, width/2 - w/15, height/2 + height/30)

  //WINDOW
  push();
  stroke(100, 50, 100)
  
  fill(0, dayLight*150, dayLight*200)
  let windX = width/2 - .4*w
  let windY = h/6
  let windB = 10
  strokeWeight(windB)
  rect(windX, windY, w/4, w/3)
  pop();

  //STARS
  push();
  if (dayLight <= .3 && stars.length == 0) {
    for (let i=0; i<15; i++) {
      let star = createVector(windX + 10 + random(w/4 - 20), windY + 10 + random(w/3 - 20))
      stars.push(star)
    }
  }
  if (stars.length > 0) {
    for (pt of stars) {
      stroke(200, 200, 255, (1-dayLight)*(1-dayLight)*255)
      strokeWeight(3)
      point(pt.x, pt.y)
    }
  }
  
  pop();

  //CLOUDS
  push();
  if (dayLight > .3 && clouds.length == 0) {
    for (let i=0; i<5; i++) {
      let cloud = createVector(windX + 10 + random(w/4 - 20), windY + 10 + random(w/3 - 100))
      clouds.push(cloud)
    }
  }
  if (clouds.length > 0) {
    for (let i=0; i<5; i++) {
      clouds[i].x += (i+1)*.05
      if (clouds[i].x > windX + w/4 - 10) {
        clouds[i].x -= w/4
      }
      noStroke();
      fill(255, dayLight*dayLight*200)
      for (let j=0; j<5; j++) {
        let n = noise(500*i*j)
        let scale = 5
        let wrap = (clouds[i].x -2 + scale*j) > (windX + w/4 - 10 - scale)
        circle(clouds[i].x - 2 + scale*j - (wrap*w/4 - 10 - scale), clouds[i].y + 6*scale*n - 3*scale, 4*scale)
      }
  }
  
  }
  pop();

  //WINDOWFRAME 
  push();
  stroke(100, 50, 100)
  strokeWeight(windB)
  line(windX + w/8, windY, windX + w/8, windY + w/3)
  line(windX, windY + w/6, windX + w/4, windY + w/6)
  noFill();
  rect(windX, windY, w/4, w/3)
  pop();



  //CURSOR
  // push();
  // stroke(255,255, 100)
  // strokeWeight(15)
  // point(width/2 + w/6, height/2 + h/12)
  // pop();

  //CAN POSING
  push();
  translate(canX + w/6, canY + h/8)
  rotate(canR)
  image(can, -w/6, -h/8)
  pop();

  //CAN CONTROL
  if (abs(mouseX - canX - w/8) < w/8 && abs(mouseY - canY - h/8) < h/8 && touch) {
    canX = mouseX - w/6
    canY = mouseY - h/8
    canR = (mouseX - (width/2 + w/3))/110
  }

  if (abs(canR) > PI/6) {
    let wetX = canX + w/6 + w/7*cos(canR - PI*.8) + random(-7, 7)
    let wetY = canY + h/7 + h/9*sin(canR - PI*.8)
    let pos = createVector(wetX, wetY)
    water.push(pos)
    //point(wetX, wetY)
  }

  let potL = width/2 - w/20
  let potR = width/2 + w/6
  let potH = height/2 + h/12

  //POURING
  for (let i=0; i<water.length; i++) {
    push();
    stroke(0, 0, 255)
    strokeWeight(3)
    water[i].y += 3
    //drop.x += sin(frameCount/10)
    point(water[i].x, water[i].y)
    if (water[i].x >= potL && water[i].x <= potR && water[i].y >= potH && water[i].y < .9*h) {
      water.splice(i, 1)
      thirst -= 1
    } else if (water[i].y > .9*h) {
      water.splice(i, 1)
    }

    pop();
  }

  if (thirst < 600 && thirst % 100 == 0 && thirst >= 0) {
    gen();
  }

  turtle();
  if (plantIt == 5) {
    noLoop();
    image(env, potL, potH)
  }
  

}
