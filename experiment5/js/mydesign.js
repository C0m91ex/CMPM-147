/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Maleficent Biding Her Time", 
        assetUrl: "https://cdn.glitch.global/cc7a16ba-734b-4c5e-ab77-78f836eb3951/thumbnails%2FMaleficent.jpg?1715024232017",
        credit: "Grace Tran, Disney Lorcana"
      },
      {
        name: "Winnie the Pooh Hunny Wizard", 
        assetUrl: "https://cdn.glitch.global/cc7a16ba-734b-4c5e-ab77-78f836eb3951/thumbnails%2FHoneyWizard.jpg?1715024241063",
        credit: "John Loren, Disney Lorcana"
      },
      {
        name: "Stitch Carefree Surfer", 
        assetUrl: "https://cdn.glitch.global/cc7a16ba-734b-4c5e-ab77-78f836eb3951/thumbnails%2FSurferStitch.jpg?1715024235337",
        credit: "Milica Celikovic, Disney Lorcana"
      },
      {
        name: "Mickey Mouse Brave Little Tailor", 
        assetUrl: "https://cdn.glitch.global/cc7a16ba-734b-4c5e-ab77-78f836eb3951/thumbnails%2FBraveLittleTailor.jpg?1715024237920",
        credit: "Nicholas Kole, Disney Lorcana"
      },
    ];
  }
  
  function initDesign(inspiration) {
    // set the canvas size based on the container
    let canvasContainer = $('.image-container'); // Select the container using jQuery
    let canvasWidth = canvasContainer.width(); // Get the width of the container
    let aspectRatio = inspiration.image.height / inspiration.image.width;
    let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
    resizeCanvas(canvasWidth, canvasHeight);
    $(".caption").text(inspiration.credit); // Set the caption text
  
    // add the original image to #original
    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);
  
    
    let design = {
      bg: 128,
      fg: []
    }
    
    for(let i = 0; i < 100; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(width/2),
                      h: random(height/2),
                      fill: random(255)})
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
    background(design.bg);
    noStroke();
    
    // Define base fill color for the inspiration image
    let baseColor;
    switch (inspiration.name) {
      case "Maleficent Biding Her Time":
        baseColor = color(198, 78, 222);
        break;
      case "Winnie the Pooh Hunny Wizard":
        baseColor = color(250, 160, 30);
        break;
      case "Stitch Carefree Surfer":
        baseColor = color(118, 190, 232);
        break;
      case "Mickey Mouse Brave Little Tailor":
        baseColor = color(165, 50, 50);
        break;
      default:
        baseColor = color(128); // Default color if the inspiration name doesn't match any case
    }
    
    // Render circles with variation in color
    for(let box of design.fg) {
      // Calculate fill color with random variation
      let variation = random(-50, 50); // Adjust the range of variation as needed
      let fillColor = color(
        red(baseColor) + variation,
        green(baseColor) + variation,
        blue(baseColor) + variation
      );
      
      // Set fill color and render circle
      fill(fillColor);
      circle(box.x, box.y, box.w, box.h);
    }
  }
  
   20,165,210
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 0, rate);
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/3, rate);
      box.h = mut(box.h, 0, height/5, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
      return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  
  