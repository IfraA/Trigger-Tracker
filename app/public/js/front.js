//global variable

var locationKey = "";

// prompt user to use current gelocation
$(document).ready(function () {

    if ("geolocation" in navigator) {
        navigator.permissions.query({
            name: 'geolocation'
        }).then(function (result) {

            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    function success(position) {
                        // for when getting location is a success
                        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
                        getCordsLocation(position.coords.latitude + "," + position.coords.longitude);
                        setTimeout(function () {
                            window.location.href = "/index";
                        }, 1250);
                    },
                    function error(error_message) {
                        // for when getting location results in an error
                        console.error('An error has occured while retrieving location', error_message);
                        setTimeout(function () {
                            window.location.href = "/index";
                        }, 1250);
                    }
                );
            } else if (result.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(
                    function success(position) {
                        // for when getting location is a success
                        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
                        getCordsLocation(position.coords.latitude + "," + position.coords.longitude);
                        setTimeout(function () {
                            window.location.href = "/index";
                        }, 1250);
                    },
                    function error(error_message) {
                        // for when getting location results in an error
                        console.error('An error has occured while retrieving location', error_message);
                        setTimeout(function () {
                            window.location.href = "/index";
                        }, 1250);
                    }
                );
            }

        });

    } else {
        // geolocation is not supported
        // get your location some other way
        console.log('geolocation is not enabled on this browser');
    }


    //function that uses cords to generate location key api
    function getCordsLocation(currentCords) {
        // var currentLat = position.coords.latitude;
        // var currentLong = position.coords.longitude;
        var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=CJR5xPcfo0AAeqd9dqsWy5XYd2FCKzSD&q=" + currentCords + "&language=en-us&details=true";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            locationKey = response.Key;
            console.log(locationKey);
            //load the next page
            dailyTemp();
            setTimeout(function () {
                window.location.href = "/index";
            }, 1250);
        });

    }

    //if user blocks use location key to let them add their location
    function getCityLocation() {
        // var city = ('#userInput').value;
        // var locationKey = "";
        // var city = document.getElementById('#userInput').value;
        var city = $('#inputZip').val();
        var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=CJR5xPcfo0AAeqd9dqsWy5XYd2FCKzSD&q=" + city + "&language=en-us&details=true&alias=Always";
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

    }

    // function get dailyforecast for temperature
    function dailyTemp() {
        var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=CJR5xPcfo0AAeqd9dqsWy5XYd2FCKzSD&language=en-us&details=true&metric=false";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jasonp",
            cache: true, //for better response time
        }).then(function (response) {
            console.log(response);

            $("#weather").append(response.DailyForecasts[0].Temperature.Maximum.Value + " " + response.DailyForecasts[0].Temperature.Maximum.Unit);
            var iconName = response.DailyForecasts[0].Day[0].IconPhrase;
            if (iconName === "Sunny") {
                ("#weather").append("<img src = assets/sunny.png>");
            }
            $("#weather").append(response.DailyForecasts[0].AirAndPollen[0].Name + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Value + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Category + response.DailyForecasts[0].Day.Icon);
        });
    }

});