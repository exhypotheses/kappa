var Highcharts;
var seriesOptions = [];
var url = document.getElementById("associations").getAttribute("url");
var project = document.getElementById("associations").getAttribute("project");

$.getJSON(url, function(calculations){

    // https://api.highcharts.com/highstock/tooltip.pointFormat
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
    // https://api.highcharts.com/highcharts/tooltip.headerFormat
    // https://www.highcharts.com/demo/stock/compare


    // Data
    var associations = [];
    for (var i = 0; i < calculations.length; i += 1) {
        associations.push({
            x: calculations[i].pvalue,
            y: calculations[i].cramerv,
            name: calculations[i].field
        });
    }


    // Graphing
    Highcharts.setOptions({
        lang: {
            thousandsSep: ","
        }
    });

    Highcharts.chart("container", {

        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Associations'
        },
        subtitle: {
            text: '\n' + project + '\n'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                enabled: true,
                text: '<i>p value</i>'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            type: 'logarithmic'
        },
        yAxis: {
            title: {
                text: "Cramer's V"
            }
        },
        legend: {
            enabled: false,
            x: 35
        },
        tooltip: {
            headerFormat: '<span style="font-size: 13px; color:{point.color}">\u25CF ',
            pointFormat: "<b>{point.name}</b></span><br>p value: {point.x}<br>Cramer's V: {point.y}"
        },
        plotOptions: {
            scatter: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        textOverflow: 'clip',
                        fontSize: 8
                    }
                },
                marker: {
                    enabled:true,
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                }                
            }
        },
        series:[{
            name: 'Associations',
            data: associations
        }]

    });

});