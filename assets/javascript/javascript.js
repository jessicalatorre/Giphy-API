
$(document).ready(function () {
    console.log('ready');

    var filmMakerArray = ["Guillermo del Toro", "Ava DuVernay", "Pedro Almodovar", "Taika Waititi", "Jean Luc Godard", "Spike Jonze", "Jordan Peele"];
    console.log(filmMakerArray);

    //function to dynamically createg gif buttons
    function displayButtonsFunction() {
        // $('#gif-buttons').empty();
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
    console.log(displayButtonsFunction());

    //display gifs after film maker button clicked
    $('button').on('click', function () {
        //created variable to store the filmMaker attribute of data-name once the button is clicked...
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
                    var gifImg =$('<img>');
                    gifImg.attr('src', response.data[i].images.fixed_height.url);

                    gifDiv.prepend(pRating);
                    gifDiv.append(gifImg);
                    $('#gifBucket').append(gifDiv);
                    //review prevent Default
                    event.preventDefault();
                    // $('#gifBucket').prepend("<img src='" + response.data[i].images.downsized.url + "'>");
                    // $('#gifBucket').prepend("<p>Rating: " + response.data[i].rating + "</p>");
                }
            })
    })
// displayButtonsFunction ();
// $(document).on('click', '.action', display)

});

//     function registerButtonClickHandler() {
//         $('#newGif').on('click', function () {
//             event.preventDefault();
//             console.log("button clicked");
//             var filmMaker = $('#user-input').val().trim();
//             if (filmMaker == "") {
//                 return false
//                 alert("please type a film maker's name");
//             }

//             filmMakerArray.push(filmMaker);

//             displayButtonsFunction();
//             return false;
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


// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });
//var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + filmMaker + "api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";


//