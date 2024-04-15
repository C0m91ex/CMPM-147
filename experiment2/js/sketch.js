// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let seed = 239;

const sandColor = '#8e5d54';
const duneColor = '#a86a5c';
const skyColor = '#ebcfc2';
const sun1Color = '#fbffe2';
const sun2Color = '#e8aa82';
const hutColor = '#604432';


class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  createCanvas(400, 200);
  createButton("reimagine").mousePressed(() => seed++);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  
  randomSeed(seed);
  
  background(100);
  
  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);
  
  fill(sun1Color); // Yellow color
  ellipse(width * .9, height * 0.25, 20, 20); // Adjust position as needed

  // Draw second sun
  fill(sun2Color); // Orange color
  ellipse(width * 0.8, height * 0.15, 30, 30); // Adjust position as needed


  fill(sandColor);
  rect(0, height / 2, width, height / 2);

  fill(duneColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 4 - height / 20;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  fill(hutColor); // Brownish color

  // Draw top half of hut (half circle)
  let hutTopX = width * 0.2; // X-coordinate of the center of the hut top
  let hutTopY = height * 1; // Y-coordinate of the center of the hut top
  let hutTopRadius = 90; // Radius of the hut top
  arc(hutTopX, hutTopY, hutTopRadius * 2, hutTopRadius * 2, PI, TWO_PI, OPEN); // Increase the Y-radius to make it more round

  // Draw rectangular bit coming out of hut side
  let rectWidth = 30; // Width of the rectangular bit
  let rectHeight = 90; // Height of the rectangular bit
  rect(hutTopX + hutTopRadius - rectWidth / 2, hutTopY - rectHeight / 2, rectWidth, rectHeight); // Adjust position to make it come out of the side
  
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}