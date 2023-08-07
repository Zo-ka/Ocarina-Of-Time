// script.js

// An array of objects representing different songs and their button sequences
const songs = [
  { name: "Epona's Song", sequence: ["up", "left", "right", "up", "left", "right"] },
  { name: "Bolero of Fire", sequence: ["down", "a", "down", "a", "right", "down", "right", "down"] },
  { name: "Requiem of Spirit", sequence: ["a", "down", "a", "right", "down", "a"] },
  { name: "Prelude of Light", sequence: ["up", "right", "up", "right", "left", "up"] },
  { name: "Saria's Song", sequence: ["down", "right", "left", "down", "right", "left"] },
  { name: "Nocturne of Shadow", sequence: ["left", "right", "right", "a", "left", "right", "down"] },
  { name: "Sun's Song", sequence: ["right", "down", "up", "right", "down", "up"] },
  { name: "Song of Storms", sequence: ["a", "down", "up", "a", "down", "up"] },
  { name: "Minuet of Forest", sequence: ["a", "up", "left", "right", "left", "right"] },
  { name: "Serenade of Water", sequence: ["a", "down", "right", "right", "left"] },
  { name: "Song of Time", sequence: ["right", "a", "down", "right", "a", "down"] },
  { name: "Zelda's Lullaby", sequence: ["left", "up", "right", "left", "up", "right"] },
  { name: "Song of Healing", sequence: ["left", "right", "down", "left", "right", "down"] },
  { name: "Sonata of Awakening", sequence: ["up", "left", "up", "left", "a", "right"] },
  { name: "Song of Soaring", sequence: ["down", "left", "up", "down", "left", "up"] },
  { name: "Oath to Order", sequence: ["right", "down", "a", "down", "right", "up"] },
  { name: "Goron Lullaby", sequence: ["a", "right", "left", "a", "right", "left", "right", "a"] },
  { name: "New Wave Bossa Nova", sequence: ["left", "up", "left", "right", "down", "left", "right"] },
  { name: "Elegy of Emptiness", sequence: ["right", "left", "right", "down", "right", "up", "left"] }
];


// Maps button notes to their corresponding sound filenames
const noteSoundMap = {
  up: "OOT_Notes_Ocarina_D2_med.wav",
  left: "OOT_Notes_Ocarina_B_med.wav",
  right: "OOT_Notes_Ocarina_A_med.wav",
  down: "OOT_Notes_Ocarina_F_med.wav",
  a: "OOT_Notes_Ocarina_B_med.wav"
};

// Maps song names to their corresponding audio filenames
const songAudioFiles = {
  "Epona's Song": "ocarina-epona's-song.mp3",
  "Bolero of Fire": "ocarina-bolero-of-fire.mp3",
  "Requiem of Spirit": "ocarina-requiem-of-spirit.mp3",
  "Prelude of Light": "ocarina-prelude-of-light.mp3",
  "Saria's Song": "ocarina-saria's-song.mp3",
  "Nocturne of Shadow": "ocarina-nocturne-of-shadow.mp3",
  "Sun's Song": "ocarina-sun's-song.mp3",
  "Song of Storms": "ocarina-song-of-storms.mp3",
  "Minuet of Forest": "ocarina-minuet-of-forest.mp3",
  "Serenade of Water": "ocarina-serenade-of-water.mp3",
  "Song of Time": "ocarina-song-of-time.mp3",
  "Zelda's Lullaby": "ocarina-zelda's-lullaby.mp3",
  "Song of Healing": "majora's-song-of-healing.mp3",
  "Sonata of Awakening": "majora's-sonata-of-awakening.mp3",
  "Song of Soaring": "majora's-song-of-soaring.mp3",
  "Oath to Order": "majora's-oath-to-order.mp3",
  "Goron Lullaby": "majora's-goron-lullaby.mp3",
  "New Wave Bossa Nova": "majora's-new-wave-bossa-nova.mp3",
  "Elegy of Emptiness": "majora's-elegy-of-emptiness.mp3"
};

// Creates Audio elements for each button note and stores them in audioElements
const audioElements = {};

for (const key in noteSoundMap) {
  const audio = new Audio(`sfx/${noteSoundMap[key]}`);
  audioElements[key] = audio;
}

// Creates an Audio element for the "correct" sound
const correctSound = new Audio("sfx/OOT_Song_Correct.wav");

// Selects all ocarina buttons and sets up event listeners
const buttons = document.querySelectorAll(".ocarina-buttons img");

// Tracks the player's button input sequence
const playerInput = [];

// Gets a reference to the song name paragraph element
const songNameParagraph = document.getElementById("song-name");

// Gets a reference to the container for stave buttons
const staveButtons = document.querySelector(".note-buttons");

// Keeps track of buttons that have appeared on the stave
const appearedButtons = new Set();

// Iterates through each button, adding event listeners
buttons.forEach(button => {
  const note = button.id.replace("Button", "");
  const audio = audioElements[note];

  // Adds a mousedown event listener to each button
  button.addEventListener("mousedown", () => {
    
    if (audio) {
      audio.currentTime = 0; // Reset audio to the beginning
      audio.play();

      playerInput.push(note);
      console.log(playerInput);

      // Clears existing button images on the stave
      staveButtons.innerHTML = '';

      // Adds button images to staveButtons based on playerInput array
      playerInput.forEach((note, index) => {
        const buttonImage = document.createElement("img");
        buttonImage.src = `Graphics/${note.toUpperCase()}.png`;
        buttonImage.alt = note.toUpperCase();

        // Apply a class to make the button images smaller and animate
        buttonImage.classList.add("stave-button");
        
        // Set initial position outside the container
        buttonImage.style.transform = `translateX(100%)`;

        staveButtons.appendChild(buttonImage);

        // Use a small delay before applying the animation
        setTimeout(() => {
          buttonImage.style.transform = `translateX(0)`;
        }, 50 * index); // Delay before animation starts
      });
      

      // Checks if the player's input sequence matches any of the predefined songs
      songs.forEach(song => {
        if (song.sequence.join(",") === playerInput.join(",")) {
          setTimeout(() => {
            correctSound.currentTime = 0;
            correctSound.play(); // plays the success sound effect
            console.log(`Matching song: ${song.name}`); // logs the song name in the console
            songNameParagraph.textContent = song.name; // Update the paragraph text
      
            // Add the blinking class to stave buttons
            staveButtons.querySelectorAll(".stave-button").forEach(button => {
              button.classList.add("blink-animation");
            });
      
            setTimeout(() => {
              // Remove the blinking class from stave buttons
              staveButtons.querySelectorAll(".stave-button").forEach(button => {
                button.classList.remove("blink-animation");
              });
      
              const songAudio = new Audio(`sfx/${songAudioFiles[song.name]}`);
              songAudio.play(); // Play the corresponding song MP3
      
              songAudio.addEventListener('ended', () => {
                songNameParagraph.textContent = 'Play Something'; // Reset the text
              });
      
            }, 1000);
      
            playerInput.length = 0; // Reset the playerInput array
          }, 500);
        }
      });
    }
  });
});