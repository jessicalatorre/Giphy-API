//use document.ready, so buttons populate on load
$(document).ready(function () {
    console.log('ready');
//----Global Variables Listed Below---//
    //Array of director names below. These names will need to be added to buttons on the browswer, so users can click to pull up gifs
    var filmMakerArray = ["Guillermo del Toro", "Ava DuVernay", "Pedro Almodovar", "Taika Waititi", "Jean Luc Goddard", "Spike Jonze", "Jordan Peele"];

    // var filmMaker;
    // var results;
    //function to dynamically createg gif buttons
    function displayButtonsFunction() {
        $('#gif-buttons').empty();
        for (var i = 0; i < filmMakerArray.length; i++) {
            var gifButton = $('<button>');
            //NOTE: Adding film-maker class, so we can use this to add new film maker when user types name into search bar
            gifButton.addClass('filmMaker');
            //add default bootstrap button
            gifButton.addClass('btn btn-default');
            //add data name attibute for each indexed director name when the loop iterates, so you each button is being named
            gifButton.attr('data-name', filmMakerArray[i]);
            //write the text for each indexed director name to the button each time loop iterates
            gifButton.text(filmMakerArray[i]);
            //Add the buttons to the DOM under using jQuery search using div id below
            $('#gif-buttons').append(gifButton);
            
        }
        
    }
    console.log(displayButtonsFunction);

    function newGifButton() {
        $('#newGif').on('click', function () {
            var filmMaker = $('filmMaker-input').val().trim();
            if (filmMaker == "") {
                return false
            alert("please type a film maker's name");
            }
            filmMakerArray.push(filmMaker);
            displayButtonsFunction();
            return false;
        });
    }

    console.log(newGifButton);

    //This function will display gifs. will put AJAX query and promise below:
    function displayGifs () {
        // created a global variable called film maker. Setting the variable = to the data-name attribute using jQuery
        var filmMaker = $(this).attr('data-name');
        //AJAX request (asynchronous javascript plus xml) with API key with a limit of 10 results
        //variable with query string
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + filmMaker + "api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";
        console.log(queryURL);

        //AJAX request using jQuery and object with variable and method to send to the server. Split our paired object to more easily read.
        $.ajax({ 
            url: queryURL, 
            method: 'GET' 
        })

   //promise function to server that asks for response; changed data to response
   .done(function (response) {
    //console.log results
    console.log("success got data", response);
    $('#gif-button-container').empty();
    var results = response.data;
});

}

     


    });