"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
// When the document is loaded call setup
$(document).ready(setup);

let characters = [];

// setup
//
// Load the data from the JSON
function setup() {
  // Get the data from the JSON file
  $.getJSON("assets/data/dictionary.json")
    .fail(dataError)
    .done(dataLoaded);
}

// dataError
//
// If the JSON file did not load correctly show an error
function dataError(request, textStatus, error) {
  // Display the error in the console
  console.error(error);
}

// dataLoaded
//
// Store the data in arrays, display the element that require the data,
// And start the game
function dataLoaded(data) {
  // Store the spells and the wizards in an array
  characters = data.characters;
  console.log(characters);
}