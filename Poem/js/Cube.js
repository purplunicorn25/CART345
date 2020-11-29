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
  constructor(x, y, size, fill, stroke, textures) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.size = size;
    this.fill = fill;
    this.fakeStroke = stroke;
    this.textures = textures;

    // Face variable
    this.faces = [];
  }


  //
  //
  //
  createFaces() {
    let face0 = {
      rotateX: 0,
      rotateY: 0,
      translate: -this.size / 2,
      fill: (25, 200, 150)
    };
    let face1 = {
      rotateX: 0,
      rotateY: 0,
      translate: this.size / 2,
      fill: 0
    };
    let face2 = {
      rotateX: 0,
      rotateY: 90,
      translate: -this.size / 2,
      fill: 0
    };
    let face3 = {
      rotateX: 0,
      rotateY: 90,
      translate: this.size / 2,
      fill: 0
    };
    let face4 = {
      rotateX: 90,
      rotateY: 0,
      translate: -this.size / 2,
      fill: 0
    };
    let face5 = {
      rotateX: 90,
      rotateY: 0,
      translate: this.size / 2,
      fill: 0
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
      // console.log(this.faces[i].rotateX)
      push();
      angleMode(DEGREES);
      fill(this.faces[i].fill);
      noStroke();
      rotateX(this.faces[i].rotateX);
      rotateY(this.faces[i].rotateY);
      translate(0, 0, this.faces[i].translate);
      // Create plane
      this.faces[i] = plane(this.size - this.fakeStroke);
      pop();
    }
  }

  // texture()
  //
  // Apply texture to each face
  texture() {

    // for (let i = 0; i < this.faces.length; i++) {
    //   textAlign(CENTER);
    //   textFont(regularFont);
    //   textSize(75);
    //   this.faces[i].text(this.textures[i], 0, 0);
    // }

    textAlign(CENTER);
    textFont(regularFont);
    textSize(75);
    this.face0.text(this.textures[0], 0, 0);


    // this.face1.text(this.textures[1], 0, 0);
  }
}