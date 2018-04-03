
$(document).ready(function () {
    console.log('ready');

    var filmMakerArray = ["Guillermo del Toro", "Ava DuVernay", "Pedro Almodovar", "Taika Waititi", "Jean Luc Godard", "Spike Jonze", "Jordan Peele"];
    console.log(filmMakerArray);

    //function to dynamically createg gif buttons
    function displayButtonsFunction() {
        $('#gif-buttons').empty(); //empty divs, so you don't create duplicates
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
        
        // $('button.filmMaker').on('click',) {
        //     $('#gifButtons').empty ();
        //     var NewDirector =$(this).attr('data-name');
        // }
        }
    }
    //Pseudo Code: 
    //capture user input after "new-filmer" maker button is clicked. Push to filmMakerArray. 
    //onclick event for new button to display gif (use call backs to achieve this? not sure how to call back queryURL and displayButtons Function)
    
    function registerButtonClickHandler() {
        $('#newGif').on('click', function (event) { //put event in function () so the event is called
            $('#gif-buttons').empty();//empty values stored in div
            event.preventDefault();//prevent entire page from being submitted when submit button clicked
            console.log("button clicked");
            var filmMaker = $('#user-input').val().trim();
            // if (filmMaker == "") {
            //     return false
            //     alert("please type a film maker's name");
            // }

            filmMakerArray.push(filmMaker);

            displayButtonsFunction(); //call back button function
        });
    }
    console.log(displayButtonsFunction());

    //display gifs after film maker button clicked
    $('button.filmMaker').on('click', function (event) {
        //created variable to store the filmMaker attribute of data-name once the button is clicked...
        $('#gif-buttons').empty ();
        event.preventDefault();
        var directorName = $(this).data('name');
        //console log new variable to see the director name each time a button is clicked.
        //Ensures we can search for the correct individual when we set up our AJAX Call
        console.log(directorName);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + directorName + "&" + "api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";
        //console logged results. After clicking Ava DuVernay button, we see the url for her in the console.
        console.log(queryURL);

        //AJAX Request / calls the query function
        $.ajax({ url: queryURL, method: 'GET' })

            .done(function (response) {
                console.log(response);
                $('#gifBucket').empty();
                //print results to page
                for (var i = 0; i < response.data.length; i++) {
                    //create new div & class to store in variable
                    var gifDiv = $('<div>');
                    //new var to store new p tag. Using .text to write "Rating" & rating from AJAX results
                    var pRating = $('<p>').text("Rating: " + response.data[i].rating);

                    var gifImg = $('<img>');
                    //img src attribute
                    gifImg.attr('src', response.data[i].images.fixed_height_small_still.url); 
                    //still img
                    gifImg.attr('data-still', response.data[i].images.fixed_height_small_still.url); 
                    // animate img
                    gifImg.attr('data-animate', response.data[i].images.fixed_height_small.url);
                    //adding img state attribute
                    gifImg.attr('data-state', 'still'); 
                    //add class to gifImage var
                    gifImg.addClass('image');

                    // prepend and append ratings and gifs to gifDiv variable
                    gifDiv.prepend(pRating);
                    gifDiv.append(gifImg);

                    //Use jQuery to append gifDiv under Div ID in DOM
                    $('#gifBucket').append(gifDiv);
                    //review prevent Default
                    event.preventDefault();
                    // $('#gifBucket').prepend("<img src='" + response.data[i].images.downsized.url + "'>");
                    // $('#gifBucket').prepend("<p>Rating: " + response.data[i].rating + "</p>");
                }
            })
    })
    //onclick function
    $("#gifBucket").on("click",'.image', function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

            console.log(state);
        }
    });


});
 
//     function registerButtonClickHandler() {
//         $('#newGif').on('click', function (event) { //put event in function () so the event is called
//             $('#gif-buttons').empty();//empty values stored in div
//             event.preventDefault();//prevent entire page from being submitted when submit button clicked
//             console.log("button clicked");
//             var filmMaker = $('#user-input').val().trim();
//             // if (filmMaker == "") {
//             //     return false
//             //     alert("please type a film maker's name");
//             // }

//             filmMakerArray.push(filmMaker);

//             displayButtonsFunction(); //call back button function
//             // return false; //
//         });
//     }
//     function removeUserAddedButton() {
//         $('#removeGif').on('click', function () {
//             event.preventDefault();
//             filmMakerArray.pop(filmMaker);
//             displayButtonsFunction();
//             return false;
//         });
//     }


// // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// // xhr.done(function(data) { console.log("success got data", data); });
// //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + filmMaker + "api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";


// //