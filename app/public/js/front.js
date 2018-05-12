//for graphs
var ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById('pieChart').getContext('2d');

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

//graphs 
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [1, 2, 3, 4],
        datasets: [{
            label: 'Temperature',
            data: [1, 2, 3, 2],
            yAxisID: "y-axis-2",
            borderColor: "#3498db",
            fill: false,
            type: "line"
        }, {
            label: 'Air Presure',
            data: [2, 4, 5, 7],
            backgroundColor: "#ffe879",
            yAxisID: "y-axis-1",
            type: 'bar'
        }],
    },
    options: {
        scales: {
            yAxes: [{
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                ticks: {
                    beginAtZero: true
                }

            }, {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                ticks: {
                    beginAtZero: true
                }

            }]
        }
    }
});

var myPieChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        datasets: [{
            backgroundColor: [
                "#2ecc71",
                "#3498db"
            ],
            data: [12, 10]
        }]
    }

});

function getTime() {
    var d = new Date();
    var currentHour = d.getHours();
    console.log(currentHour);

    for (var i = 0; i < 24; i++) {
        var thisHour = currentHour + i;
        if (thisHour > 24) {
            hours.push(thisHour - 24);
        }
        if (thisHour > 12) {
            console.log(thisHour + " is more than 12.");
            console.log(thisHour - 12);
            hours.push(thisHour - 12);
        } else {
            hours.push(thisHour);
        }
    }
    console.log(hours);
}