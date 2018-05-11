<<<<<<< HEAD

// gelocation
$(document).ready(function () {
    if ("geolocation" in navigator) {
        $('.js-geolocation').show();
    } else {
        $('.js-geolocation').hide();
    }

    // button handler
    $('.js-geolocation').on('click', function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        });
    });

    // ===call weather api===
    $("#weather").click(function () {
        $("#weatherDiv").empty();
        displayWeather();
    });

    //global variable
    // get current location
    var city = sessionStorage.getItem("userInput");

    // ------functions-------

    function displayWeather() {
        // $(document).ready(function (displayWeather) {
        // function displayWeather() {
        var queryURL = "http://api.wunderground.com/api/89a5b7c57e0c3e47/geolookup/conditions/forecast/q/CA/Sacramento.json";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            console.log(response.current_observation.icon_url);
            $("#icon").append('<img src="' + response.current_observation.icon_url + '">');
            $("#temp").append(response.current_observation.temp_f);
            $("#location").append(response.location.city);

        });

    }
});
=======
< !DOCTYPE html >
    <html lang="en">

        <head>
            <meta charset="UTF-8">
                <title>Trigger Tracker</title>
                <!-- Latest compiled and minified CSS & JS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.0.0/lumen/bootstrap.min.css" />
                <link rel="stylesheet" href="css/styles.css" media="screen" title="no title">
                    <script src="https://code.jquery.com/jquery.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</head>
>>>>>>> bfe07e0564d782600aa826a203fe4e6c643b28f7
