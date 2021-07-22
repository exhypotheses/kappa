var Highcharts;
var seriesOptions = [];
var url = document.getElementById("metrics").getAttribute("url");
var project = document.getElementById("metrics").getAttribute("project");

// var fileNameKey = "https://raw.githubusercontent.com/exhypotheses/risk/develop/warehouse/evaluations/overarching/metrics.json"

// Generate graphs
$.getJSON(url, function (calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Split
    for (var i = 0; i < (calculations.length - 1); i += 1) {

        visible = true;

         seriesOptions[i] = {
            name: calculations[i].name,
            visible: visible,
            data: calculations[i].data
        };

    }


    // Optimal Threshold
   var j = calculations.length - 1;


    // Graphing
    Highcharts.setOptions({
        lang: {
            thousandsSep: ","
        }
    });


    Highcharts.chart("container0009", {

        chart: {
            type: "line",
            zoomType: "xy"
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
            x: 35
        },

        xAxis: {
            title: {
                text: "Threshold"
            },
            maxPadding: 0.05,
            gridLineWidth: 1,
            plotLines: [{
                color: "#5D686D",
                dashStyle: "solid",
                width: 0.5,
                value: calculations[j].data.x,
                label: {
                    rotation: 0,
                    y: 170,  // From the top of the graph and downward
                    x: 2,   // From this line
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
                text: "Estimates"
            },
            maxPadding: 0.05,
            endOnTick: false
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
            headerFormat: '<span style="font-size: 13px; color:{point.color}">\u25CF {point.x:,.2f}</span>',
            pointFormat: '<br/><p><br/>' +
                '{series.name}: {point.y:,.2f}<br/></p>' ,
            style: {
                fontSize: "11px"
            }
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 2
                },
                lineWidth: 1,
                dataLabels: {
                    enabled: false
                },
                turboThreshold: 4000
            }
        },

        series: seriesOptions

    });

});


