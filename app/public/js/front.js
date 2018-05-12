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
