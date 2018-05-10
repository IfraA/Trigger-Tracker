// ---call pollen function, on click--------



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
        dataType: "jsonp",
        // success: function (parsed_json) {
        //     var location = parsed_json['location']['city'];
        //     var temp_f = parsed_json['current_observation']['temp_f'];
        //     console.log("Current temperature in " + location + " is: " + temp_f);
    }).then(function (response) {
        console.log(response);
        $("#temp").text(response.forecast);
    })

};
// });
