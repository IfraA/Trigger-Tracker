var ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById('pieChart').getContext('2d');
var ctx3 = document.getElementById('pieChart2').getContext('2d');
var hours = [];

//get the next 24 hours for labels
function getTime() {
    var amPM = "";
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
    var allergen = '';
    var air =
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
                "#2ecc71",
                "#3498db"
            ],
            data: [12, 10]
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