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
// setup()
//
// Create the canvas and button
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  camera = createCamera();
  setCamera(camera);

  initiateButton();
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

  let environment = new Cube(0, 0, 200);
  environment.display();
}

//
//
//
function cameraControls() {

  let lateral = 0;
  let lineal = 0;
  // Movement on x and y axis
  if (keyIsDown(LEFT_ARROW)) {
    lateral += 15;
    console.log('left');
  }
  console.log(lateral);
  let X = lateral;
  // Eye in
  camera.lookAt(X, 0, 0);
  camera.setPosition(20, 0, 120);
  // camera(X, 0, 100, 0, 0, 0, 0, 1, 0);


}