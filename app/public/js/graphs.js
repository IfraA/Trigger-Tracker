var Data = [];
// tell canvas what to do giving context 
var chartId = document.getElementById("myChart").getContext('2d');
var hours = [];
var color = "";
var air = 0;
var allergenValue = 0;
var dataset = [];

//**replace with data from the api**
var graphTriggers = ["airPresure", "temperature", "wind"];
var circleTriggers = ["airQuality", "grass", "UVIndex", "ragweed", "mold"];

for (i = 0; i < 24; i++) {
    var number = Math.round(20 * Math.random());
    Data.push(number);
}
console.log(Data);

//main graph functions

//get the next 24 hours for labels
function getTime() {
    var amPM = "";
    var d = new Date();
    var currentHour = d.getHours();
    console.log(currentHour);

    //for loop 24 times
    for (var i = 0; i < 24; i++) {
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
    getWeatherData();
}

function getWeatherData() {

    for (k = 0; k < graphTriggers.length; k++) {
        switch (graphTriggers[k]) {
            case ("airPresure"):
                dataset[k] = {
                    label: 'Air Presure',
                    data: Data,
                    backgroundColor: "#ffe879",
                    yAxisID: 'y-axis-1',
                    type: 'bar'
                };
                break;

            case ("temperature"):
                dataset[k] = {
                    label: 'Temperature',
                    data: Data,
                    yAxisID: 'y-axis-2',
                    borderColor: '#3498db',
                    fill: false,
                    type: 'line'
                };
                break;

            case ("wind"):
                dataset[k] = {
                    label: 'Wind Speed',
                    data: Data,
                    yAxisID: "y-axis-2",
                    borderColor: "#3498db",
                    fill: false,
                    type: "line"
                };
                break;

            case ("rain"):
                dataset[k] = {
                    label: 'Rain',
                    data: Data,
                    backgroundColor: "#ffe879",
                    yAxisID: "y-axis-1",
                    type: 'bar'
                };
                break;

            case ("humidity"):
                dataset[k] = {
                    label: 'Humidity',
                    data: Data,
                    yAxisID: "y-axis-2",
                    borderColor: "#3498db",
                    fill: false,
                    type: "line"
                };
                break;

        }
        console.log(dataset);
    }

    var weatherChart = new Chart(chartId, {
        type: 'bar',
        data: {
            labels: hours,
            datasets:
                // [{
                //     label: 'Temperature',
                //     data: [1, 2, 3, 2],
                //     yAxisID: "y-axis-2",
                //     borderColor: "#3498db",
                //     fill: false,
                //     type: "line"
                // }, {
                //     label: 'Air Presure',
                //     data: [2, 4, 5, 7],
                //     backgroundColor: "#ffe879",
                //     yAxisID: "y-axis-1",
                //     type: 'bar'
                // }]
                dataset,
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
}

//pie chart functions

function createCircles() {
    for (j = 0; j < circleTriggers.length; j++) {
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

getTime();
createCircles();