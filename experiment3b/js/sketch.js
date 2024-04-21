// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

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
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];

  // Initialize the grid with empty spaces
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  // Generate rooms
  for (let r = 0; r < 5; r++) { // Generate 5 rooms
    let roomWidth = Math.floor(random(5, 10)); // Random width for the room
    let roomHeight = Math.floor(random(5, 10)); // Random height for the room
    let roomX = Math.floor(random(1, numCols - roomWidth - 1)); // Random X position for the room
    let roomY = Math.floor(random(1, numRows - roomHeight - 1)); // Random Y position for the room
    
    // Paint the room
    for (let i = roomY; i < roomY + roomHeight; i++) {
      for (let j = roomX; j < roomX + roomWidth; j++) {
        grid[i][j] = ".";
      }
    }
  }

  // Generate hallways
  for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
      if (grid[i][j] === '.' && grid[i][j - 1] === '.' && grid[i][j + 1] === '.' && random() > 0.5) {
        grid[i][j] = ".";
      }
      if (grid[i][j] === '.' && grid[i - 1][j] === '.' && grid[i + 1][j] === '.' && random() > 0.5) {
        grid[i][j] = ".";
      }
    }
  }

  // Generate biomes (e.g., rivers or roads)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (noise(i / 10, j / 10) > 0.5) { // Use noise function to select biome
        grid[i][j] = ".";
      }
    }
  }

  return grid;
}

function gridCheck(grid, i, j, target) {
  // Check if the given coordinates (i, j) are within the grid bounds
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length) {
    return grid[i][j] == target;
  }
  return false;
}

function gridCode(grid, i, j, target) {
  // Form a 4-bit code using gridCheck on the north/south/east/west neighbors of i, j for the target code
  let northBit = gridCheck(grid, i - 1, j, target);
  let southBit = gridCheck(grid, i + 1, j, target);
  let eastBit = gridCheck(grid, i, j + 1, target);
  let westBit = gridCheck(grid, i, j - 1, target);
  
  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}

function drawContext(grid, i, j, target, dti, dtj) {
  // Get the code for this location and target
  let code = gridCode(grid, i, j, target);
  
  // Use the code as an array index to get a pair of tile offset numbers
  const [tiOffset, tjOffset] = lookup[code];
  
  // Place the tile at the adjusted position
  placeTile(i, j, dti + tiOffset, dtj + tjOffset);
}

const lookup = [
  // Inner tiles
  [0, 0], // Top left corner (code 0)
  [0, 0], // Top edge (code 1)
  [0, 0], // Top right corner (code 2)
  [0, 0], // Left edge (code 3)
  [0, 0], // Inner tile (code 4)
  [0, 0], // Right edge (code 5)
  [0, 0], // Bottom left corner (code 6)
  [0, 0], // Bottom edge (code 7)
  [0, 0], // Bottom right corner (code 8)

  // Outer edge tiles
  [0, 0], // Outer edge tile (code 9)
  [0, 0], // Outer edge tile (code 10)
  [0, 0], // Outer edge tile (code 11)
  [0, 0], // Outer edge tile (code 12)
  [0, 0], // Outer edge tile (code 13)
  [0, 0], // Outer edge tile (code 14)
  [0, 0], // Outer edge tile (code 15)
  [0, 0], // Outer edge tile (code 16)
  [0, 0], // Outer edge tile (code 17)
  [0, 0], // Outer edge tile (code 18)
];

function drawGrid(grid, tileSize) {
  background(128);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '_') {
        // Render floor tile
        drawContext(grid, i, j, '_', 3, 12);
        if (random() < 0.5) {
          // Add exciting effect 1% of the time
          // For example, draw a randomly colored shape on top of the tile
          fill(random(255), random(255), random(255), 100); // Random semi-transparent color
          noStroke();
          rect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      } else if (grid[i][j] === '.') {
        // Render grass tile
        drawContext(grid, i, j, '.', 20, 12);
        if (noise(i * 0.1, j * 0.1) > 0.5) {
          // Add variation based on noise function
          // For example, adjust brightness based on time
          let brightness = map(sin(millis() * 0.01), -1, 1, 100, 255); // Vary brightness over time
          fill(0, brightness); // Black color with varying transparency
          noStroke();
          rect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      }
    }
  }
}




}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}