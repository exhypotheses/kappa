var Highcharts;
var seriesOptions = [];
var url = document.getElementById("metrics").getAttribute("url");


// Generate curves
jQuery.getJSON(url, function (calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Split
    for (var i = 0; i < (calculations.length - 1); i += 1) {

        if (['precision', 'sensitivity', 'specificity', 'matthews'].includes(calculations[i].name))
            visible = true;
        else
            visible = false;        

        seriesOptions[i] = {
            name: calculations[i].description,
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


    Highcharts.chart("container0004", {

        chart: {
            type: "line",
            zoomType: "xy",
            marginTop: 85
        },

        title: {
            text: '',
            x: 0
        },
        subtitle: {
            text: 'Binary Classification<br>Metrics',
            x: 25,
            y: 35
        },

        credits: {
            enabled: false
        },

        legend: {
            enabled: true,
            layout: 'horizontal',
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                width: '100px',
                textOverflow: 'ellipsis'
            },
            verticalAlign: 'bottom',
            margin: 20,
            itemMarginTop: 2,
            itemMarginBottom: 2,
            x: 6.3,
            y: 5
        },

        xAxis: {
            title: {
                text: "Threshold"
            },
            maxPadding: 0.1,
            gridLineWidth: 1,
            plotLines: [{
                color: "#5D686D",
                dashStyle: "solid",
                width: 0.5,
                value: calculations[j].data.optimal,
                label: {
                    rotation: 0,
                    y: 110,  // From the top of the graph and downward
                    x: 2,   // From this line
                    style: {
                        color: "#5D686D",
                        fontStyle: "italic",
                        fontSize: "10px",
                        width: "40px"   // Limits the text width
                    },
                    text: 'Optimal Threshold'
                },
                zIndex: 3
            }]

        },

        yAxis: {
            title: {
                text: "Estimates"
            },
            maxPadding: 0.05,
            min: 0,
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
            headerFormat: '<p><span style="font-size: 13px; color:#aab597">\u25CF {point.x:,.2f}</span></p>',
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
                lineWidth: 0.5,
                dataLabels: {
                    enabled: false
                },
                turboThreshold: 4000
            }
        },

        series: seriesOptions,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300                    
                }
            }]
        }

    });

});
