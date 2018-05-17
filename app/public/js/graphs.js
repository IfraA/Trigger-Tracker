var Data = [];
// tell canvas what to do giving context 
var chartId = document.getElementById("myChart").getContext('2d');
var hours = [];
var color = "";
var air = 0;
var allergenValue = 0;
var dataset = [];

//**replace with data from the api**
var graphTriggers = ["temperature", "wind", "humidity"];
var circleTriggers = ["airQuality", "grass", "UVIndex", "ragweed", "mold"];


function hourlyForcast() {
    var queryURL = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/335315?apikey=qiFHdGlcXwcyPvEO6lVxQ5YlYpqfGCs8&language=en-us&details=true";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        getWeatherData(response);
    });
    getTime();
}

//get the next 24 hours for labels
function getTime() {
    var d = new Date();
    var currentHour = d.getHours();
    console.log(currentHour);

    //for loop 24 times
    for (var i = 0; i < 12; i++) {
        //millitary time hour
        var thisHour = currentHour + i;

        //if past midnight, turn it into next day
        if (thisHour > 24) {
            thisHour -= 24;
        }

        //if after noon turn it into us standard and add pm.  If not push it with am.
        if (thisHour > 12) {
            hours.push(thisHour - 12 + " pm");
        } else {
            hours.push(thisHour + " am");
        }
    }
    console.log(hours);
}

function getWeatherData(data) {

    for (var k = 0; k < graphTriggers.length; k++) {
        console.log(graphTriggers[k]);
        switch (graphTriggers[k]) {
            // case ("airPresure"):
            //     dataset[k] = {
            //         label: 'Air Presure',
            //         data: [20, 30, 20, 10],
            //         backgroundColor: "#ffe879",
            //         yAxisID: 'y-axis-1',
            //         xAsisID: 'x1',
            //         type: 'bar'
            //     };
            //     break;

            case ("temperature"):
                dataset[k] = {
                    label: 'Temperature',
                    data: createArray(data, 'Temperature.Value'),
                    yAxisID: 'y-axis-2',
                    // xAsisID: 'x2',
                    borderColor: '#3498db',
                    fill: false,
                    type: 'line'
                };
                break;

            case ("wind"):
                dataset[k] = {
                    label: 'Wind Speed',
                    data: createArray(data, 'Wind.Speed.Value'),
                    yAxisID: "y-axis-2",
                    // xAsisID: 'x2',
                    borderColor: "#3498db",
                    fill: false,
                    type: "line"
                };
                break;

            case ("rain"):
                dataset[k] = {
                    label: 'Rain',
                    data: createArray(data, 'Rain.Value'),
                    backgroundColor: "#ffe879",
                    yAxisID: "y-axis-2",
                    // xAsisID: 'x2',
                    type: 'bar'
                };
                break;

            case ("humidity"):
                dataset[k] = {
                    label: 'Humidity',
                    data: createArray(data, 'RelativeHumidity'),
                    yAxisID: "y-axis-2",
                    // xAsisID: 'x2',
                    borderColor: "#3498db",
                    fill: false,
                    type: "line"
                };
                break;

            case ("uvForcast"):
                dataset[k] = {
                    label: 'UV Index',
                    data: createArray(data, 'UVIndex'),
                    yAxisID: "y-axis-2",
                    // xAsisID: 'x2',
                    borderColor: "#3498db",
                    fill: false,
                    type: "line"
                };

        }
    }
    console.log(dataset);

    var weatherChart = new Chart(chartId, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                    gridLines: {
                        drawOnChartArea: false,
                    },

                }, {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
                xAxes: [{
                    //     id: "x1",
                    //     type: "catagory",
                    //     position: "bottom",
                    //     ticks: {
                    //         min: 0,
                    //         max: 12,
                    //         stepSize: 1
                    //     }
                    // },
                    // {
                    //     id: "x2",
                    //     type: "linear",
                    //     position: "top",
                    //     ticks: {
                    //         min: 0,
                    //         max: 12,
                    //         stepSize: 3
                    //     }
                }]
            }
        }
    });
}

function createArray(info, key) {
    console.log(info);
    console.log(key);
    var array = [];
    for (var h = 0; h < 12; h++) {

        console.log(Object.byString(info[h], key));
        array.push(Object.byString(info[h], key));

    }
    console.log(array);
    return array;
}

//code by alnitak
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};




//pie chart functions

function createCircles() {
    for (var j = 0; j < circleTriggers.length; j++) {
        var container = $("<div>");
        var containerID = '"container' + j + '"';
        var canvas = $("<canvas>");
        var canvasID = '"circle' + j + '"';

        container.addClass("circleContainer");

        canvas.attr("id", canvasID);
        console.log(canvasID);
        canvas.attr("width", "400");
        canvas.attr("height", "400");

        container.append(canvas);

        $("#circles").append(container);
        addCircleData(j, canvasID);
    }
}

function addCircleData(index, chartId) {

    console.log(circleTriggers[index]);
    switch (circleTriggers[index]) {
        case "airQuality":
            allergen = "airQuality";
            allergenValue = 4;
            break;
        case "grass":
            allergen = "grass";
            allergenValue = 1;
            break;
        case "mold":
            allergen = "mold";
            allergenValue = 5;
            break;
        case "tree":
            allergen = "tree";
            allergenValue = 2;
            break;
        case "ragweed":
            allergen = "ragweed";
            allergenValue = 3;
            break;
        case "uvIndex":
            allergen = "uvIndex";
            allergenValue = 5;
            break;

        default:
            break;
    }

    //get value to create circle graph
    air = 6 - allergenValue;

    pieDisplay();

    console.log(allergenValue);
    console.log(air);

    var ctx = document.getElementById(chartId).getContext('2d');

    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Good Air", "Bad Air"],
            datasets: [{
                backgroundColor: [
                    color,
                    "#3498db"
                ],
                data: [allergenValue, air]
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}

function pieDisplay() {
    //change color based on value
    switch (allergenValue) {
        case 1:
            color = "#00a86b";
            break;
        case 2:
            color = "#4fa134";
            break;
        case 3:
            color = "#7d9500";
            break;
        case 4:
            color = "#F7BD00";
            break;
        case 5:
            color = "#d76000";
            break;
        case 6:
            color = "#FF0000";
            break;
    }
    console.log(color);
}

hourlyForcast();
createCircles();