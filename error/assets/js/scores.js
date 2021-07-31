var Highcharts;
var optionSelected;
var seriesOptions = [];
var dropdown = $("#option_selector");

var url = document.getElementById("scores").getAttribute("url")
var project = document.getElementById("scores").getAttribute("project")


$.getJSON(url, function(calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Categories
    var categories = calculations.categories;


    // Values    
    seriesOptions = [{
        name: calculations.series.desc,
        visible: true,
        data: calculations.series.data,
        pointPlacement: 'on'
    }]

            
    // Container
    Highcharts.chart("container", {

        chart: {
            polar: true,
            type: 'spline'
        },

        title: {
            text: 'Error Matrix Metrics',
            x: -60

        },

        credits: {
            enabled: false
        },
        
        // https://api.highcharts.com/highcharts/pane
        /* pane: {
            size: '80%'
        }, */

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
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
        },

        /* legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        }, */

        series: seriesOptions,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'right',
                        verticalAlign: 'bottom',
                        layout: 'vertical',
                        width: '100px'
                    },
                    pane: {
                        size: '65%'
                    }
                }
            }]
        }
        
    });

}).fail(function () {
    console.log("Missing");
    $("#container").empty();
});


