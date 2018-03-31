//use document.ready, so buttons populate on load
$(document).ready(function () {
    console.log('ready');


//AJAX request (asynchronous javascript plus xml) with API key with a limit of 10 results
//variable with query string
var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";

//AJAX request using jQuery and object with variable and method to send to the server
$.ajax({url:queryURL,method:'GET'})
//promise function to server that asks for response; changed data to response
.done(function(response) { 
//console.log results
console.log("success got data", response); });

//Array of director names below. These names will need to be added to buttons on the browswer, so users can click to pull up gifs
var filmMakerArray=["Guillermo del Toro","Ava DuVernay","Pedro Almodovar","Taika Waititi","Jean Luc Goddard","Spike Jonze","Jordan Peele"];
//function to dynamically createg gif buttons
for (var i = 0; i <filmMakerArray.length; i++ ){
// button created using jQuery value stored in gifButton variable
var gifButton = $('<button>');
//add default bootstrap button
gifButton.addClass('btn btn-default');
//add data name attibute for each indexed director name when the loop iterates, so you each button is being named
gifButton.attr('data-name',filmMakerArray[i]);
//write the text for each indexed director name to button each time loop iterates
gifButton.text(filmMakerArray)
}
console.log('does this work?');

});