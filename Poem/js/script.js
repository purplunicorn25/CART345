"use strict";

/*****************

YOU && I
Home Page

Merely a black box button that
rotates and reacts when hovered.

******************/
// START
// BOX
let angle = 0;
let boxSize = 175;
// COLOR
let black = 0;
let white = 255;
let fillColor = black;
let strokeColor = white;
let backgroundColor = white;
// BUTTON
let button;
let buttonPar = {
  x: 0,
  y: 0,
  w: 200,
  h: 200
};
// CONTROL
let start = true;

// ENVIRONMENT
let camera;
let environmentSize = 1000;
// Value that moves from one to the next
let active = 0;
// setPosition(0, 0, 500) positions for clockwise rotation
let perspective = [{
  x: 0,
  y: 0,
  z: 500
}, {
  x: 500,
  y: 0,
  z: 0
}, {
  x: 0,
  y: 0,
  z: -500
}, {
  x: -500,
  y: 0,
  z: 0
}];

// FONTS
let regularFont;

// %TEMP%
let wallpaper = ["YOU KNOW", "SHOULD I", "THEY SAY", "WHAT DO/DOES", "I HOPE", "MAYBE"]

// preload()
//
//
function preload() {
  regularFont = loadFont('assets/fonts/Lato-Regular.ttf');
}

// setup()
//
// Create the canvas and button
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  initiateCamera();
  initiateButton();
}

// initiateCamera()
//
// Create a camera and a perspective
function initiateCamera() {
  // Create the camera
  camera = createCamera();
  setCamera(camera);
  // Set its position and angle
  updateCamera();
}

// initiateButton()
//
// Create a transparent rectangle
function initiateButton() {
  // draw the button
  push();
  noStroke();
  noFill();
  rectMode(CENTER);
  button = rect(buttonPar.x, buttonPar.y, buttonPar.w, buttonPar.h);
  pop();
}

// draw()
//
// Handle the button that initiate the experience
function draw() {
  background(backgroundColor);
  // Determine when the user starts the game
  if (start != true) {
    hover();
  } else {
    game();
  }
}

// hover()
//
// Check the distance between the mouse and button
// Change color if hovered
// If white, enter box environment
function hover() {
  if (fillColor < 255) {
    // Calculate the distance between the rectangle and the user
    let d = dist(windowWidth / 2, windowHeight / 2, mouseX, mouseY);
    // Check if hovered
    if (d <= buttonPar.h * .55) {
      // Rotate on the other side (more right (-) counters left (+) rotation)
      angle += -0.02;
      // Draw the box and dilude its color
      drawBox();
      fillColor += 1.5;
    } else {
      // If release go back to original form
      backgroundColor = white;
      drawBox();
      strokeColor = white;
      // The color becomes saturated again
      if (fillColor > 0) {
        fillColor -= 2;
      }
    }
    // If the box turns completely white, enter the box
  } else if (fillColor >= 255) {
    start = true;
  }
}

// drawBox()
//
// Draw a box and rotate it
function drawBox() {
  // Appearance
  push();
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(3);
  // Rotate
  rotateX(-10);
  rotateY(angle);
  // Draw
  box(boxSize);
  // Implement rotation
  angle += 0.010;
  pop();
}

//
//
//
function game() {
  createEnvironment();
  createDie();
  cameraControls();
  console.log(active);

}

//
//
//
function createEnvironment() {
  //   constructor(x, y, size, fill, textures)
  let environment = new Cube(0, 0, environmentSize, 50, 8, wallpaper);
  environment.createFaces();
  environment.display();
  // environment.texture();
}

//
//
//
function createDie() {
  //   constructor(x, y, size, fill, textures)
  let die = new Cube(0, 0, 50, 0, 0, wallpaper);
  let die2 = new Cube(0, 0, 50, 255, 2, []);
  // die.display();
  // die2.display();
  // die.texture()
  // Puts the text at the same place grrrrrrrrrrrrrrrrrrrrr

}

// cameraControls() & more
//
// Rotate around the die clockwise, look up and down
function cameraControls() {
  // If UP_ARROW is down, look up
  if (keyIsDown(38)) {
    console.log('up');
    camera.lookAt(0, -750, 0);
    // If DOWN_ARROW is down, look down
  } else if (keyIsDown(40)) {
    console.log('down');
    camera.lookAt(0, 750, 0);
    // If no is down, look straight
  } else {
    camera.lookAt(0, 0, 0);
  }
  // Constrain the perspective to the four "walls"
  if (active > 3 || active < -3) {
    active = 0;
    updateCamera();
  }
}
// Clockwise rotation
function keyReleased() {
  if (keyCode === 39) {
    incrementPerspective();
    updateCamera();
  }
}
// Increment the active variable to rotate
function incrementPerspective() {
  active++;
  return false;
}
// Update the position and restaure the angle of the camera
function updateCamera() {
  camera.setPosition(perspective[abs(active)].x, perspective[abs(active)].y, perspective[abs(active)].z);
  camera.lookAt(0, 0, 0);
}