var chartID = document.getElementById("myChart").getContext('2d');
// var ctx2 = document.getElementById('pieChart').getContext('2d');
// var ctx3 = document.getElementById('pieChart2').getContext('2d');
var hours = [];
var color = "";
var air = 0;
//replace with data from the api
graphTriggers = [];
circleTriggers = ["airQuality", "grass"];
var allergenValue;
var tempArray = [89, 58, 67, 90, 83, 69, 62, 56, 52, 73, 81, 84, 75, 50, 77, 86, 78, 74, 57, 54, 51, 70, 79, 85];
var presureArray = [41, 24, 12, 15, 29, 46, 19, 43, 10, 9, 21, 50, 33, 13, 7, 8, 32, 34, 26, 28, 11, 37, 22, 48];


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
}

getTime();

//data for pie chart using catagory value system
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
        }
    });
}


var weatherChart = new Chart(chartID, {
    type: 'bar',
    data: {
        labels: hours,
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

createCircles();

// var myPieChart = new Chart(ctx2, {
//     type: 'doughnut',
//     data: {
//         datasets: [{
//             backgroundColor: [
//                 color,
//                 "#3498db"
//             ],
//             data: [allergen, air]
//         }]
//     }

// });

// var myPieChart2 = new Chart(ctx3, {
//     type: 'doughnut',
//     data: {
//         datasets: [{
//             backgroundColor: [
//                 "color",
//                 "#3498db"
//             ],
//             data: [12, 10]
//         }]
//     }

// });