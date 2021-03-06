"use strict"

// Cube
//
// That class represents a box element with independent faces.
// IUses plane() instead of box() to apply different textures.

class Cube {

  // constructor
  //
  // Set the initial values for the Leaves properties
  // Either sets default values or use the arguments provided
  constructor(x, y, size, fill, stroke, textures, textSize, strokeFill, animate) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.size = size;
    this.fill = fill;
    this.fakeStroke = stroke;
    this.textures = textures;
    this.textSize = textSize;
    this.strokeFill = strokeFill;
    // Faces array
    this.faces = [];
    // Animation
    this.rotation = animate;
  }

  // createFacesInt()
  //
  //
  createFacesInt() {
    let face0 = {
      rotateX: 0,
      rotateY: 180,
      translate: -this.size / 2,
      color: this.fill
    };
    let face1 = {
      rotateX: 0,
      rotateY: 270,
      translate: -this.size / 2,
      color: this.fill

    };
    let face2 = {
      rotateX: 0,
      rotateY: 0,
      translate: -this.size / 2,
      color: this.fill

    };
    let face3 = {
      rotateX: 0,
      rotateY: 90,
      translate: -this.size / 2,
      color: this.fill
    };
    let face4 = {
      rotateX: 90,
      rotateY: 0,
      translate: this.size / 2,
      color: this.fill
    };
    let face5 = {
      rotateX: 90,
      rotateY: 0,
      translate: -this.size / 2,
      color: this.fill
    };
    // Append to array
    for (let i = 0; i < 6; i++) {
      let face = eval(`face${i}`);
      append(this.faces, face);
    }
  }

  // createFacesExt()
  //
  //
  createFacesExt() {
    let face0 = {
      rotateX: 0,
      rotateY: 0,
      translate: this.size / 2,
      color: this.fill
    };
    let face1 = {
      rotateX: 0,
      rotateY: 90,
      translate: this.size / 2,
      color: this.fill
    };
    let face2 = {
      rotateX: 0,
      rotateY: 180,
      translate: this.size / 2,
      color: this.fill
    };
    let face3 = {
      rotateX: 0,
      rotateY: 270,
      translate: this.size / 2,
      color: this.fill
    };
    let face4 = {
      rotateX: -90,
      rotateY: 0,
      translate: this.size / 2,
      color: this.fill
    };
    let face5 = {
      rotateX: -90,
      rotateY: 0,
      translate: -this.size / 2,
      color: this.fill
    };
    // Append to array
    for (let i = 0; i < 6; i++) {
      let face = eval(`face${i}`);
      append(this.faces, face);
    }
  }

  // display()
  //
  // Faces are placed around a center point
  display() {
    for (let i = 0; i < this.faces.length; i++) {
      push();
      // Set parameters for planes
      angleMode(DEGREES);
      fill(this.faces[i].color);
      noStroke();
      if (this.rotation === true) {
        rotateX(this.faces[i].rotateX + frameCount * .5);
        rotateY(this.faces[i].rotateY + frameCount * .5);
      } else {
        rotateX(this.faces[i].rotateX);
        rotateY(this.faces[i].rotateY);
      }
      translate(0, 0, this.faces[i].translate);
      // Create plane
      this.faces[i] = plane(this.size - this.fakeStroke);
      // Text parameters
      fill(this.strokeFill);
      textAlign(CENTER, CENTER);
      textFont(regularFont);
      textSize(this.textSize);
      // Apply text
      this.faces[i].text(this.textures[i], 0, 0);
      pop();
    }
  }
}