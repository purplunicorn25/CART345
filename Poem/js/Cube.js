// Cube
//
// That class represents a box element with independent faces.
// IUses plane() instead of box() to apply different textures.

class Cube {

  // constructor
  //
  // Set the initial values for the Leaves properties
  // Either sets default values or use the arguments provided
  constructor(x, y, size, fill) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.size = size;
  }

  // Faces are placed around a center point
  display() {
    //pink no rotate
    push();
    fill(75);
    noStroke();
    translate(0, 0, -this.size / 2);
    plane(this.size);
    pop();

    push();
    fill(75);
    noStroke();
    translate(0, 0, this.size / 2);
    plane(this.size);
    pop();

    //purple Y rotate axis
    push();
    angleMode(DEGREES);
    fill(150);
    noStroke();
    rotateY(90);
    translate(0, 0, -this.size / 2);
    plane(this.size);
    pop();

    push();
    angleMode(DEGREES);
    fill(150);
    noStroke();
    rotateY(90);
    translate(0, 0, this.size / 2);
    plane(this.size);
    pop();

    // green rotate x
    push();
    angleMode(DEGREES);
    fill(220);
    noStroke();
    rotateX(90);
    translate(0, 0, -this.size / 2);
    plane(this.size);
    pop();

    push();
    angleMode(DEGREES);
    fill(220);
    noStroke();
    rotateX(90);
    translate(0, 0, this.size / 2);
    plane(this.size);
    pop();
  }







}