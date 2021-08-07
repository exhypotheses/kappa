var Highcharts;
var optionSelected;
var seriesOptions = [];
var dropdown = $("#option_selector");

var url = document.getElementById("frequencies").getAttribute("url")
var variable = document.getElementById("frequencies").getAttribute("variable")


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
        var tp = [], fn = [], tn = [], fp= [];

        // Split
        for (var i = 0; i < (calculations.length - 1); i += 1) {

            if (calculations[i].name.match(fileNameKey)) {

                var description = calculations[i].description;

                for (var j = 0; j < calculations[i].data.length; j += 1) {

                    tp.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].tp
                    });

                    fn.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].fn
                    });

                    tn.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].tn
                    });

                    fp.push({
                        x: calculations[i].data[j].threshold,
                        y: calculations[i].data[j].fp
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
                type: "line",
                zoomType: "xy",
                marginTop: 105
            },

            title: {
                text: 'Binary Classification<br>Frequencies',
                style: { 
                    "color": "#666666", 
                    "fontSize": "18px" 
                }
            },
            subtitle: {
                text: '\nElement <b>' + fileNameKey + ' (' + description + ')</b> of<br>variable <b>' + variable + '</b>\n',
                style: { 
                    "fontSize": "11px",
                    "fontWeight": "light"
                }
            },

            credits: {
                enabled: false
            },

            legend: {
                enabled: true,
                x: 15
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
                        y: 100, // From the top of the graph and downward
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
                }]

            },

            yAxis: {
                title: {
                    text: "Frequencies"
                },
                maxPadding: 0.05,
                endOnTick: false
            },

            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ["viewFullscreen", "printChart", "separator",
                            "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator",
                            "downloadXLS", "downloadCSV"],
                        x: 15
                    }
                }
            },

            tooltip: {
                shared: true,
                headerFormat: '<span style="font-size: 13px; color:{point.color}">\u25CF {point.x:,.2f}</span>',
                pointFormat: '<br/><p><br/>' +
                    '{series.name}: {point.y}<br/></p>' ,
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
                    lineWidth: 0.5,
                    dataLabels: {
                        enabled: false
                    },
                    turboThreshold: 4000
                }
            },

            series: [{
                    type: "spline",
                    name: "True Positive",
                    data: tp
                },{
                    type: "spline",
                    name: "False Negative",
                    data: fn
                },{
                    type: "spline",
                    name: "True Negative",
                    data: tn
                },{
                   type: "spline",
                   name: "False Positive",
                   data: fp
                }
            ]

        });

    }).fail(function () {
        console.log("Missing");
        $("#container0011").empty();
    });

}
