var Highcharts;
var optionSelected;
var seriesOptions = [];
var dropdown = $("#option_selector");

var url = document.getElementById("scores").getAttribute("url")


jQuery.getJSON(url, function(calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Categories
    var categories = calculations.categories;


    // Model Properties: Optimal Threshold
    var optimal = calculations.model.data[0].optimal.toFixed(3);


    // Values    
    seriesOptions = [{
        name: calculations.series.desc,
        visible: true,
        data: calculations.series.data,
        pointPlacement: 'on'
    }]

            
    // Container
    Highcharts.chart("container0001", {

        chart: {
            polar: true,
            type: 'spline',
            height: 310,
            width: 290,
            marginTop: 0
        },

        title: {
            text: '',
            x: 0
        },
        /* subtitle: {
            text: 'Binary Classification Metrics<br>at optimal threshold (' + optimal + ')',
            y: 35
        }, */
        caption: {
            text: 'The binary classification metrics at optimal threshold ' + optimal,
            margin: 5,
            style: {
                fontStyle: 'italic',
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#9fb7cd',
                width: '80px'
            },
            x: 35,
            y: 30,
            floating: true
        },

        credits: {
            enabled: false
        },

        // https://api.highcharts.com/highcharts/xAxis.tickmarkPlacement
        xAxis: {
            categories: categories,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        // https://api.highcharts.com/highcharts/yAxis.gridLineInterpolation
        // https://api.highcharts.com/highcharts/yAxis.min
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 1,
            tickInterval: 0.5
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
            pointFormat: '<span style="color:{series.color}"><b>{point.y:,.3f}</b></span>'
        },

        // https://api.highcharts.com/highcharts/pane
        pane: {
            size: '57.5%'
        },

        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical',
            enabled: false
        },

        series: seriesOptions,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 250
                }
            }]
        }
        
    });

}).fail(function () {
    console.log("Missing");
    $("#container0001").empty();
});


