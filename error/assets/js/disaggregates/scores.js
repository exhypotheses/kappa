var Highcharts;
var seriesOptions = [];

var url = document.getElementById("scores").getAttribute("url")
var project = document.getElementById("scores").getAttribute("project")

$.getJSON(url, function(calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Categories
    var categories = calculations.categories;


    // Curves
    for (var i = 0; i < calculations.series.data.length; i+=1) {

        seriesOptions[i] = {
            name: calculations.series.data[i].desc,
            visible: true,
            data: calculations.series.data[i].data,
            pointPlacement: 'on'
        }

    }


    // Container
    Highcharts.chart("container", {

        chart: {
            polar: true,
            type: 'spline'
            // marginTop: 25
            // marginBottom: 35
        },

        title: {
            text: 'Error Matrix Metrics',
            x: 0
        },
        subtitle: {
            text: "\n" + project + "\n"
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

        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical',
            width: '57.5%',
            margin: 25,
            itemMarginTop: 2,
            itemMarginBottom: 2,
            y: 25,
            x: 25
        },

        // https://api.highcharts.com/highcharts/pane
        pane: {
            size: '75%' // diagram only
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
        },

        plotOptions: {
            spline: {
                lineWidth: 1,
                marker: {
                    radius: 3
                }
            }
        },

        series: seriesOptions,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                }
            }]
        }
        
    });

}).fail(function () {
    console.log("Missing");
    $("#container").empty();
});