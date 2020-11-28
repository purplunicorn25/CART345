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
let active = 2;
// setPosition(0, 0, 500) positions for clockwise rotation
let perspective = [0, 0, 500, 500, 0, 0, 0, 0, -500, -500, 0, 0];
// CAMERA MOVEMENT
let leftArrow = false;
let rightArrow = false;

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
  camera.setPosition(perspective[0], perspective[1], perspective[2]);
  camera.lookAt(0, 0, 0);
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
    boxEnvironment();
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
function boxEnvironment() {
  cameraControls();


  push();
  fill(255);
  box(10);
  pop();
  //   constructor(x, y, size, fill, textures)
  let environment = new Cube(0, 0, environmentSize, 50, wallpaper);
  environment.display();
  environment.texture();
}

//
//
//
function cameraControls() {
  // console.log(perspective[active + 2], perspective[active + 3], perspective[active + 4]);
  // Switch from one perspective to another
  if (keyIsDown(LEFT_ARROW)) {
    incrementPerspective();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    decrementPerspective();
  }
  console.log(active);
  // Constrain between -3 and 3
  if (active > 3 || active < -3) {
    active = 0;
  }
}

function incrementPerspective() {
  active++;
  return false;
}

function decrementPerspective() {
  active--;
  return false;
}