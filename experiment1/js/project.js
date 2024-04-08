// project.js - purpose and description here
// Author: Jason Torres
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file


function main() {
  const fillers = {
    adventurer: ["Citizens", "Resistance Fighter", "Mercenary", "Traveller", "Mandolorian", "Bounty Hunter", "Raider", "Wookiee", "Clone", "Jedi"  ],
    planet: ["Coruscant", "Tatooine", "Jakku", "Alderaan", "Hoth", "Kashyyyk"],
    people: ["Rebels", "Resistance", "Galaxy", "Clones", "Jedi"],
    ship: ["cargo ship", "starfighter", "cruiser", "bomber", "freighter", "starship"],
    baddies: ["The Empire", "The First Order", "Sith", "Sith Troopers"],
    message: ["call", "post", "decree", "message", "emergency", "important message","alarm", "commlink", "transmission"],
    
  };
  
  const template = `$adventurer, listen to this $message!
  
  I have just come from $planet with an important message from the rebellion, the $people are in desperate need of your help on Exegol. $baddies are being led by Emperor Palpatine with a reserected fleet of Star Destroyers. You must take action immediately and go to Exogol. Bring your $ship to help fight the $baddies!!! 
  
  This is the last stand to save our Galaxy. We must send help and spread the word immediately. We must not let Emperor Palpatine win. 
  
  May the force be with you . . .
  
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
main();
