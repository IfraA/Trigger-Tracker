//global variable

var locationKey = "";

//timeout to index page, then run script
setTimeout(function () {
    return res.redirect('/index');
}, 3000);


// prompt user to use current gelocation
$(document).ready(function () {
    // //get user's current location
    // var cords = document.getElementById("location");

    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.watchPosition(showPosition);
    //     } else {
    //         console.log("Geolocation is not supported by this browser.")
    //     };
    // };

    // function useGeoLocation(position) {
    //     console.log(position)
    //     console.log(position.coords.latitude);
    //     console.log(position.coords.longitude);

    // var cords = loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    // //api call the cords to be used for geo location to get location key and run other functions
    // var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=qiFHdGlcXwcyPvEO6lVxQ5YlYpqfGCs8&q=" + cords;
    // $.ajax({
    //     url: queryURL,
    //     method: "GET",
    // }).then(function (response) {
    //     console.log(response);
    //     // ("#test").append(response);
    //     locationKey = response.Key;
    //     // console.log(locationKey);
    //     dailyTemp();
    // });
    // }


    $("#submit").on("click", function () {
        getCityLocation();

    });

    //if user blocks use location key to let them add their location
    function getCityLocation() {
        // var city = ('#userInput').value;
        // var locationKey = "";
        // var city = document.getElementById('#userInput').value;
        var city = $('#inputZip').val();
        var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=qiFHdGlcXwcyPvEO6lVxQ5YlYpqfGCs8&q=" + city + "&language=en-us&details=true&alias=Always";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            locationKey = response[0].Key;
            console.log(locationKey);
            dailyTemp();
            // currentCondition();
        });

    };



    // function get dailyforecast for temperature
    function dailyTemp() {
        var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=qiFHdGlcXwcyPvEO6lVxQ5YlYpqfGCs8&language=en-us&details=true&metric=false";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jasonp",
            cache: true, //for better response time
        }).then(function (response) {
            console.log(response);

            $("#weather").append(response.DailyForecasts[0].Temperature.Maximum.Value + " " + response.DailyForecasts[0].Temperature.Maximum.Unit);
            $("#weather").append(response.DailyForecasts[0].AirAndPollen[0].Name + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Value + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Category + response.DailyForecasts[0].Day.Icon);
        });
    };

});

// function currentCondition() {
//     var queryURL = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=qiFHdGlcXwcyPvEO6lVxQ5YlYpqfGCs8";
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function (response) {
//         console.log(response);
//         $("#temp").append(response[0].Temperature.Imperial.Value + " " + response[0].Temperature.Imperial.Unit + "<br>" + response[0].WeatherIcon)
//     })
// };