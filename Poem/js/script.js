"use strict";

/*****************

YOU && I
Home Page

Merely a black box button that
rotates and reacts when hovered.

******************/

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

// setup()
//
// Create the canvas and button
function setup() {
  createCanvas(500, 500, WEBGL);
  initiateButton();
}

// initiateButton()
//
// Create a transparent rectangle
function initiateButton() {
  push();
  noStroke();
  noFill();
  rectMode(CENTER);
  button = rect(buttonPar.x, buttonPar.y, buttonPar.w, buttonPar.h);
  pop();
}

// draw()
//
// Handle the element on button
function draw() {
  background(backgroundColor);
  hover();
}

// hover()
//
// Check the distance between the mouse and button
// Change color if hovered
// If white, redirect to another page
function hover() {
  console.log(fillColor);
  if (fillColor < 255) {
    // Calculate the distance between the rectangle and the user
    let d = dist(250, 250, mouseX, mouseY);
    // Check if hovered
    if (d <= buttonPar.h / 2) {
      // Rotate on the other side (more right (-) counters left (+) rotation)
      angle += -0.02;
      drawBox();
      fillColor += 1.5;
    } else {
      backgroundColor = white;
      drawBox();
      strokeColor = white;
      if (fillColor > 0) {
        fillColor -= 2;
      }
    }
  } else if (fillColor >= 255) {
    redirect();
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

// redirect
//
// Redirect to another page
function redirect() {
  console.log('start');
  window.location.href = "box.html";
}