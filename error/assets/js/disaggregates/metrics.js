var Highcharts;
var optionSelected;
var dropdown = $("#option_selector");

var url = document.getElementById("metrics").getAttribute("url");
var project = document.getElementById("metrics").getAttribute("project");


// Draw
$.getJSON(url, function (data) {

    for (var k = 0; k < (data.length - 1); k += 1) {
        dropdown.append($("<option></option>").attr("value", data[k].name).text(data[k].description));
    }

    // Load the first Option by default
    var defaultOption = dropdown.find("option:first-child").val();
    optionSelected = dropdown.find("option:first-child").text();

    // Generate
    generateChart(defaultOption);

});

// Dropdown
dropdown.on("change", function (e) {

    $("#option_selector_title").remove();

    // Save name and value of the selected option
    optionSelected = this.options[e.target.selectedIndex].text;
    var valueSelected = this.options[e.target.selectedIndex].value;

    //Draw the Chart
    generateChart(valueSelected);

});

// Generate graphs
function generateChart(fileNameKey) {

    $.getJSON(url, function (calculations){

        // https://api.highcharts.com/highstock/tooltip.pointFormat
        // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
        // https://api.highcharts.com/highcharts/tooltip.headerFormat
        // https://www.highcharts.com/demo/stock/compare

        // Variables
        var precision = [], sensitivity = [], specificity = [], fpr = [], 
            fscore= [], youden = [], matthews = [], balancedAccuracy = [], 
            standardAccuracy = [];

        // Split
        for (var i = 0; i < (calculations.length - 1); i += 1) {

            if (calculations[i].name.match(fileNameKey)) {

                for (var j = 0; j < calculations[i].data.length; j += 1) {

                    precision.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].precision
                    });

                    sensitivity.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].sensitivity
                    });

                    specificity.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].specificity
                    });

                    fpr.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].fpr
                    });

                    fscore.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].fscore
                    });

                    youden.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].youden
                    });

                    matthews.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].matthews
                    });

                    balancedAccuracy.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].balanced_accuracy
                    });

                    standardAccuracy.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].standard_accuracy
                    });

                }

            }

        }


        // Optimal Threshold
       var j = calculations.length - 1;


        // Graphing
        Highcharts.setOptions({
            lang: {
                thousandsSep: ","
            }
        });


        Highcharts.chart("container0011", {

            chart: {
                type: "spline",
                zoomType: "xy",
                marginTop: 85
            },

            title: {
                text: "Binary Classification"
            },
            subtitle: {
                text: "\n" + project + "\n"
            },

            credits: {
                enabled: false
            },

            legend: {
                enabled: true,
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                itemDistance: 25, // Applies to horizontal layout
                itemStyle: {
                    fontSize: '10px',
                    width: '83px',
                    textOverflow: 'ellipsis'
                },
                margin: 11,
                x: 6.9,
                y: 13
            },

            xAxis: {
                title: {
                    text: "Threshold"
                },
                maxPadding: 0.05,
                gridLineWidth: 1,
                plotLines: [{
                    color: "black",
                    dashStyle: "solid",
                    width: 0.5,
                    value: calculations[j].data.x,
                    label: {
                        rotation: 0,
                        y: 110, // From the top of the graph and downward
                        x: 2, // From this line
                        style: {
                            color: "#5D686D",
                            fontStyle: "italic",
                            fontSize: "10px",
                            width: "40px"   // Limits the text width
                        },
                        text: calculations[j].description
                    },
                    zIndex: 3
                }],
                gridLineColor: '#fafafa',
                lineWidth: 0.25
            },

            yAxis: {
                title: {
                    text: "estimates"
                },
                gridLineColor: '#fafafa',
                maxPadding: 0.05,
                endOnTick: false,
                startOTick: false,
                tickInterval: 0.25
            },

            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ["viewFullscreen", "printChart", "separator",
                            "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator",
                            "downloadXLS", "downloadCSV"]
                    }
                }
            },

            tooltip: {
                shared: true,
                headerFormat: '<span style="font-size: 13px; color:#aab597">\u25CF {point.x:,.2f}</span>',
                pointFormat: '<br/><p><br/>' +
                    '<span style="color:{point.color}">{series.name}</span>: {point.y:,.2f}<br/></p>' ,
                style: {
                    fontSize: "11px"
                }
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 1
                    },
                    lineWidth: 0.05,
                    dataLabels: {
                        enabled: false
                    },
                    turboThreshold: 4000
                }
            },

            series: [{
                    name: "Precision",
                    data: precision
                },{
                    name: "Sensitivity",
                    data: sensitivity
                },{
                    name: "Specificity",
                    data: specificity
                },{
                    name: "False Positive Rate",
                    data: fpr,
                    visible: false
                },{
                   name: "F1 Score",
                   data: specificity,
                   visible: false
                },{
                    name: "Youden's J Statistic",
                    data: youden,
                    visible: false
                },{
                    name: "Matthews Correlation Coefficient",
                    data: matthews
                },{
                    name: "Balanced Accuracy",
                    data: balancedAccuracy,
                    visible: false
                },{
                    name: "Standard Accuracy",
                    data: standardAccuracy,
                    visible: false
                }
            ]

        });

    }).fail(function () {
        console.log("Missing");
        $("#container0011").empty();
    });

}
