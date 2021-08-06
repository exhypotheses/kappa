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
            type: 'spline',
            marginTop: 45
        },

        title: {
            text: '\n' + project + '\n',
            x: 0

        },
        subtitle: {
            text: 'Binary Classification Metrics<br>at optimal threshold',
            style: {
                // "color": "#cccccc"
            }
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
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}"><b>{point.y:,.2f}</b></span>'
        },

        // https://api.highcharts.com/highcharts/pane
        pane: {
            size: '55%'
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
    $("#container").empty();
});


