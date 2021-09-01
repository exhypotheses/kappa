var Highcharts;
var seriesOptions = [];
var url = document.getElementById("frequencies").getAttribute("url");


// Generate graphs
jQuery.getJSON(url, function (calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare

    // Split
    for (var i = 0; i < (calculations.length - 1); i += 1) {

        visible = true;

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


    Highcharts.chart("container0005", {

        chart: {
            type: "line",
            zoomType: "xy",
            marginTop: 50,
            marginBottom: 160,
            height: 390,
            width: 330,
        },

        title: {
            text: '',
            x: 0
        },
        subtitle: {
            text: 'The binary classification frequencies',
            x: 19,
            y: 25,
            style: {
                fontStyle: 'italic',
                fontSize: '11px',
                fontWeight: 'normal',
                color: 'grey',
                width: '80px'
            }
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
            },
            verticalAlign: 'bottom',
            margin: 40,
            itemMarginTop: 2,
            itemMarginBottom: 2,
            x: 7.5,
            y: -40,
            floating: true
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
                value: calculations[j].data.optimal,
                label: {
                    rotation: 0,
                    y: 15,  // From the top of the graph and downward
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
                    x: 9
                }
            }
        },

        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size: 13px; color:#aab597">\u25CF {point.x:,.2f}</span>',
            pointFormat: '<br/><p><br/>' +
                '<span style="color:{point.color}">{series.name}</span>: {point.y}<br/></p>' ,
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

        series: seriesOptions

        /* responsive: {
            rules: [{
                condition: {
                    maxWidth: 300                    
                }
            }]
        } */

    });

});


