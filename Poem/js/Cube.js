// Cube
//
// That class represents a box element with independent faces.
// IUses plane() instead of box() to apply different textures.

class Cube {

  // constructor
  //
  // Set the initial values for the Leaves properties
  // Either sets default values or use the arguments provided
  constructor(x, y, size, fill, textures) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.size = size;
    this.fill = fill;
    this.fakeStroke = 8;
    this.textures = textures;

    // Face variable
    // this.face0 = this.textures[0];
    // this.face1 = this.textures[1];
    // this.face2 = this.textures[2];
    // this.face3 = this.textures[3];
    // this.face4 = this.textures[4];
    // this.face5 = this.textures[5];

    this.face0;
    this.face1;
    this.face2;
    this.face3;
    this.face4;
    this.face5;
  }

  // Faces are placed around a center point
  display() {
    // FACE 0
    push();
    fill(this.fill);
    noStroke();
    translate(0, 0, -this.size / 2);
    this.face0 = plane(this.size - this.fakeStroke);
    pop();
    // FACE 1
    push();
    fill(this.fill);
    noStroke();
    translate(0, 0, this.size / 2);
    this.face1 = plane(this.size - this.fakeStroke);
    pop();
    // FACE 2
    push();
    angleMode(DEGREES);
    fill(this.fill);
    noStroke();
    rotateY(90);
    translate(0, 0, -this.size / 2);
    this.face2 = plane(this.size - this.fakeStroke);
    pop();
    // FACE 3
    push();
    angleMode(DEGREES);
    fill(this.fill);
    noStroke();
    rotateY(90);
    translate(0, 0, this.size / 2);
    this.face3 = plane(this.size - this.fakeStroke);
    pop();
    // FACE 4
    push();
    angleMode(DEGREES);
    fill(this.fill);
    noStroke();
    rotateX(90);
    translate(0, 0, -this.size / 2);
    this.face4 = plane(this.size - this.fakeStroke);
    pop();
    // FACE 5
    push();
    angleMode(DEGREES);
    fill(this.fill);
    noStroke();
    rotateX(90);
    translate(0, 0, this.size / 2);
    this.face5 = plane(this.size - this.fakeStroke);
    pop();
  }

  // Apply texture to each face
  texture() {
    // for (i = 0; i < this.textures.length; i++) {
    //
    // }
    textAlign(CENTER);
    textFont(regularFont);
    textSize(75);
    this.face0.text(this.textures[0], 0, 0);

    // this.face1;
    // this.face2;
    // this.face3;
    // this.face4;
    // this.face5;
  }






}