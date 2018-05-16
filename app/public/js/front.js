//global variable

var locationKey = "";
var city = $('#userInput').val();
var apikey = "ADBLR0VCWoVNPXvAhO9vBXTtlAAU8sfM";

// prompt user to use current gelocation
window.onload = (function () {

    if (window.location.hash === "") {
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
                            if ($('body').is('.reLoad')) {
                                setTimeout(function () {
                                    window.location.href = "/index";
                                }, 1250);

                            }
                        },
                        function error(error_message) {
                            // for when getting location results in an error
                            console.error('An error has occured while retrieving location', error_message);
                            defaultPage();
                            if ($('body').is('.reLoad')) {
                                setTimeout(function () {
                                    window.location.href = "/index";
                                }, 1250);
                            }
                        }
                    );
                } else if (result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(
                        function success(position) {
                            // for when getting location is a success
                            console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
                            getCordsLocation(position.coords.latitude + "," + position.coords.longitude);
                            if ($('body').is('.reLoad')) {
                                setTimeout(function () {
                                    window.location.href = "/index";
                                }, 1250);
                            }
                        },
                        function error(error_message) {
                            // for when getting location results in an error
                            console.error('An error has occured while retrieving location', error_message);
                            defaultPage();
                            if ($('body').is('.reLoad')) {
                                setTimeout(function () {
                                    window.location.href = "/index";
                                }, 1250);
                            }

                        }
                    );
                }

            });

        } else {
            // geolocation is not supported
            // get your location some other way
            console.log('geolocation is not enabled on this browser');
            alert("Please enter your location");
            //load the default data
            if ($('body').is('.reLoad')) {
                setTimeout(function () {
                    window.location.href = "/index";
                }, 1250);
            }
            defaultPage();
        }
    } else {
        // geolocation is not supported
        // get your location some other way
        console.log('geolocation is not enabled on this browser');
        alert("Please enter your location");
        //load the default data
        if ($('body').is('.yellow')) {
            setTimeout(function () {
                window.location.href = "/index";
            }, 1250);
        }
        defaultPage();
    }


    //function that uses current location cords to generate location key api
    function getCordsLocation(currentCords) {
        // var currentLat = position.coords.latitude;
        // var currentLong = position.coords.longitude;
        var apikey = "ADBLR0VCWoVNPXvAhO9vBXTtlAAU8sfM";
        var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikey + "&q=" + currentCords + "&language=en-us&details=true";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            locationKey = response.Key;
            console.log(locationKey);
            //load the next page to display data with the current location cords
            dailyTemp();
        });

    }

    //default results for sacramento upon loading of index page
    function defaultPage() {
        var defaultcity = Sacramento;
        dafaultLocationKey = 347627;
        var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/347627?apikey=" + apikey + "&language=en-us&details=true&metric=true";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jasonp",
            cache: true, //for better response time
        }).then(function (response) {
            console.log(response);

            $("#temperature").html("<p>" + response.DailyForecasts[0].Temperature.Maximum.Value + " " + response.DailyForecasts[0].Temperature.Maximum.Unit + "</p>");
            $("#temperature").append("<p>" + response.DailyForecasts[0].Day.IconPhrase + "</p>");
            var iconName = response.DailyForecasts[0].Day.IconPhrase;
            console.log(response.DailyForecasts[0].Day.IconPhrase);
            if (iconName === "Sunny") {
                ("#icon").append('<img src="/assets/sunny.png">');
            }
            $("#cityName").append(Sacramento);
            // $("#weather").append(response.DailyForecasts[0].AirAndPollen[0].Name + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Value + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Category + response.DailyForecasts[0].Day.Icon);
        });
    }

    //if user blocks use location key to let them add their location
    function getCityLocation() {
        // var city = ('#userInput').value;
        // var locationKey = "";
        // var city = document.getElementById('#userInput').value;
        var city = $('#city').val();
        var queryURL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apikey + "&q=" + city + "&language=en-us&details=true&alias=Always";
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
        var city = $('#city').val();
        var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=" + apikey + "&language=en-us&details=true&metric=false";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log("response: " + response.DailyForecasts[0].Day.Icon);

            $("#temperature").append("<p>" + response.DailyForecasts[0].Temperature.Maximum.Value + " " + response.DailyForecasts[0].Temperature.Maximum.Unit + "</p>");
            $("#temperature").append("<p>" + response.DailyForecasts[0].Day.IconPhrase + "</p>");
            var iconName = response.DailyForecasts[0].Day.IconPhrase;
            console.log(response.DailyForecasts[0].Day.IconPhrase);
            //create conditions to display icons for weather
            if (iconName === "Sunny" || iconName === "Mostly Sunny" || iconName === "Partly Sunny" || iconName === "Hazy Sunshine") {
                $("#icon").append('<img src="/assets/sunny-y.png">');
            } else if (iconName === "Mostly Cloudy" || iconName === "Cloudy" || iconName === "Dreary (Overcast)" || iconName === "Fog") {
                $("#icon").append('<img src="/assets/cloudy-y.png">');
            } else if (iconName === "Partly Sunny w/ T-Storms" || iconName === "Mostly Cloudy w/ Showers" || iconName === "T-Storms") {
                $("#icon").append('<img src="/assets/thunderstorm-y.png">');
            } else if (iconName === "Rain" || iconName === "Showers") {
                $("#icon").append('<img src="/assets/rain-y.png">');
            } else if (iconName === "Hot" || iconName === "Cold") {
                $("#icon").append('<img src="/assets/temperature-y.png">');
            } else if (iconName === "Windy") {
                $("#icon").append('<img src="/assets/windy-y.png">');
            } else if (iconName === "Clear" || iconName === "Mostly Clear") {
                $("#icon").append('<img src="/assets/windy-y.png">');
            }
            //display city name
            $("#cityName").append(city);
            console.log(city);
            $("#pollen").append(response.DailyForecasts[0].AirAndPollen[0].Name + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Value + "<br>" + response.DailyForecasts[0].AirAndPollen[0].Category + response.DailyForecasts[0].Day.Icon);
        });
    }

});