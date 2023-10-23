var Highcharts;
var seriesOptions = [];
var url = document.getElementById("categorical").getAttribute("url");
var project = document.getElementById("categorical").getAttribute("project");

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

    Highcharts.chart("container0006", {

        chart: {
            type: 'scatter',
            zoomType: 'xy',
            marginTop: 105
        },
        title: {
            text: '\n' + project + '\n'
        },
        subtitle: {
            text: 'Degree of Association<br>between categorical fields & target'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                enabled: true,
                useHTML: false,
                text: "<i>p value</i><br><span style='font-size: 16px'>&#120594;</span>²"
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            type: 'logarithmic',
            plotBands: [{
                color: '#f6f6f6',
                from: 0,
                to: 0.001
            }]
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
            pointFormat: "<b>{point.name}</b></span><br><i>p value</i>: {point.x}<br>Cramer's V: {point.y}"
        },
        plotOptions: {
            scatter: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        textOverflow: 'ellipsis',
                        width: '65px',
                        fontSize: '10px',
                        fontWeight: 'light',
                        color: 'grey'
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