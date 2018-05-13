// tell canvas what to do giving context 
var ctx = document.getElementById("myChart").getContext('2d');
var hours = [];
var color = "";
var allergen;
var air = 0;


//get the next 24 hours for labels
function getTime() {
    var amPM = "";
    var d = new Date();
    var currentHour = d.getHours();
    console.log(currentHour);

    for (var i = 0; i < 24; i++) {
        var thisHour = currentHour + i;
        if (thisHour > 24) {
            thisHour -= 24;
        }
        if (thisHour > 12) {
            console.log(thisHour + " is more than 12.");
            console.log(thisHour - 12);
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
    //psudo for vars
    air = 6 - allergen;
    switch (allergen) {
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
            color = "#d76000";
            break;
    }
}


var myChart = new Chart(ctx, {
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

var myPieChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        datasets: [{
            backgroundColor: [
                color,
                "#3498db"
            ],
            data: [allergen, air]
        }]
    }

});

var myPieChart2 = new Chart(ctx3, {
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