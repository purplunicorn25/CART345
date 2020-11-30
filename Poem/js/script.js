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
let boxSpeed = 1.15;
// BUTTON
let button;
let buttonPar = {
  x: 0,
  y: 0,
  w: 200,
  h: 200
};
// CONTROL
let start = false;

// ENVIRONMENT
let camera;
let environmentSize = 1000;
// Value that moves from one to the next
let active = 0;
// setPosition(0, 0, 500) positions for clockwise rotation
let perspective = [{
  x: 0,
  y: 0,
  z: -500
}, {
  x: -500,
  y: 0,
  z: 0
}, {
  x: 0,
  y: 0,
  z: 500
}, {
  x: 500,
  y: 0,
  z: 0
}];

// FONTS
let regularFont;
let boldFont;

// DIE
let die;
let faces;

// %TEMP%
let poem;
let wallpaper = ["this is an\nexample of a\nprojection", "", "this is another\nexample of a\nprojection", "", "", "Here's another"];

// preload()
//
//
function preload() {
  // regularFont = loadFont('assets/fonts/Lato-Regular.ttf');
  regularFont = loadFont('assets/fonts/ttf/FiraCode-Regular.ttf');
  boldFont = loadFont('assets/fonts/ttf/FiraCode-Bold.ttf');
  poem = loadJSON('data/poem.json');
}

// setup()
//
// Create the canvas and button
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  initiateCamera();
  initiateButton();
}

//initiate
//
// initiateCamera()
function initiateCamera() {
  // Create a camera and a perspective
  // Create the camera
  camera = createCamera();
  setCamera(camera);
  // Set its position and angle
  updateCamera();
}
// initiateButton()
function initiateButton() {
  // Create a transparent rectangle
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
      fillColor += boxSpeed;
      intro();
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

function intro() {
  // for (let i = 0; i < 20; i++) {
  //   let voice = createDiv("hear me out");
  //   voice.class('voice');
  //   voice.position(0, i * 10, 0);
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
  rotateX(10);
  rotateY(angle);
  // Draw
  box(boxSize);
  // Implement rotation
  angle += 0.010;
  pop();
}

// game()
//
//
function game() {
  orbitControl(1.2, 1.2, 0);
  cameraControls();
  // CREATE
  createLetter();
  createEnvironment();
  createDie();
  // HANDLE
  handleDie();
}

// create()
//
// createLetter()
// !!!!!!!!!!!!!!! TURN INTO 3D with another box, looks too flat !!!!!!!!!!!!!!!!!!!!
function createLetter() {
  // Assemble the poem
  let description = "A  L E T T E R  T O  M Y  C O M P U T E R";
  let title = "YOU && I\n";
  let poemHalf1 = poem.verses[0].text + poem.verses[1].text + poem.verses[2].text;
  let poemHalf2 = poem.verses[3].text + poem.verses[4].text + poem.verses[5].text;
  // Backgroung
  let letter = {
    fill: black,
    size: 1000,
    fontSize: 16
  }
  // Set parameters for planes
  push();
  angleMode(DEGREES);
  noStroke();
  rotateY(180);
  translate(-250, 0, 1500);
  // Create plane
  fill(letter.fill);
  let paper = plane(letter.size);
  // Text parameters
  textAlign(LEFT);
  // Apply the text
  //TITLE
  fill(white);
  textSize(letter.fontSize * 2);
  textFont(regularFont);
  paper.text(title, -letter.size / 2 + 40, -letter.size / 2 + 70);
  //FIRST PART
  textSize(letter.fontSize);
  textLeading(30);
  paper.text(poemHalf1, -letter.size / 2 + 40, -letter.size / 2 + 110);
  //SECOND PART
  fill(black);
  paper.text(poemHalf2, letter.size / 2 + 30, -letter.size / 2 + 230);
  pop();
  //DESCRIPTION
  push();
  fill(20, 200, 150);
  textFont(boldFont);
  textSize(letter.fontSize * 2.48);
  rotateY(180);
  rotateZ(-90);
  translate(-250, 0, 1500);
  text(description, -letter.size / 4, -letter.size / 1.3, letter.w);
  pop();
}
// Create cubes from the obj family
// createEnvironment()
function createEnvironment() {
  // constructor(x, y, size, fill, stroke, textures, textSize,  strokefill)
  let environment = new Cube(0, 0, environmentSize, 0, 8, wallpaper, 75, 255, false);
  environment.createFacesInt();
  environment.display();
}
// createDie()
function createDie() {
  // Create the array for the die faces
  let anaphoras = [];
  for (let i = 0; i < poem.verses.length; i++) {
    append(anaphoras, poem.verses[i].anaphora);
  }
  // Create the die (the stroke), and the faces (the planes)
  // constructor(x, y, size, fill, stroke, textures, textSize, strokeFill)
  die = new Cube(0, 0, 99, white, 0, [], 25, 0, false);
  die.createFacesExt();
  die.display();
  faces = new Cube(0, 0, 100, black, 3, anaphoras, 25, white, false);
  faces.createFacesExt();
  faces.display();
}

// cameraControls() & more
//
// Rotate around the die clockwise, look up and down
function cameraControls() {
  // Constrain the perspective to the four "walls"
  if (active > 3 || active < -3) {
    active = 0;
    updateCamera();
  }
  // If UP_ARROW is down, look up
  if (keyIsDown(38)) {
    camera.lookAt(0, -750, 0);
    // If DOWN_ARROW is down, look down
  } else if (keyIsDown(40)) {
    camera.lookAt(0, 750, 0);
    // Show the exterior by pressing spacebar
  } else if (keyIsDown(32)) {
    camera.setPosition(perspective[abs(active)].x, perspective[abs(active)].y, perspective[abs(active)].z - 2000);
    camera.lookAt(0, 0, 0);
  }
}
// Clockwise rotation
function keyReleased() {
  // 4 perspective around the center
  if (keyCode === 39) {
    incrementPerspective();
    updateCamera();
  }
  // If not down, reset the camera, but only once to get the orbitControl working
  if (keyCode === 38 || keyCode === 40 || keyCode === 32) {
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

//handle()
//
// handleDie()
function handleDie() {}