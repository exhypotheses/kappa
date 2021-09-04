var Highcharts;
var seriesOptions = [];
var url = document.getElementById("numerical").getAttribute("url");

jQuery.getJSON(url, function(calculations){


    // Data
    var associations = [];
    for (var i = 0; i < calculations.length; i += 1) {
        associations.push({
            x: calculations[i].kruskal_pvalue,
            y: calculations[i].iman_pvalue_adj,
            name: calculations[i].field
        });
    }

    var colors = Highcharts.getOptions().colors.map(function (color) {
        return Highcharts.color(color).setOpacity(0.5).get();
    });


    Highcharts.chart("container0007", {

        chart: {
            type: 'scatter',
            zoomType: 'xy',
            marginTop: 65
        },

        colors: colors,

        title: {
            text: ' '
        },

        credits: {
            enabled: false
        },

        xAxis: {
            type: 'logarithmic',
            title: {
                text: '<i>Kruskal Wallis Test</i>'
            },
            crosshair: true,
            startOnTick: true,
            endOnTick: true,
            max: 1.0
        },

        yAxis: {
            type: 'logarithmic',
            plotBands: [{
                color: '#f6f6f6',
                from: 0,
                to: 0.001
            }],
            title: {
                text: '<i>Conover-Iman Test</i>'
            },
            crosshair: true,
            // startOnTick: true,
            endOnTick: true,
            max: 1.0
        },

        legend: {
            enabled: false
        },

        tooltip: {
            headerFormat: '<span style="font-size: 11px; color:{point.color}">\u25CF ',
            pointFormat: "<b>{point.name}</b></span><br><i>Kruskal-Wallis</i>: {point.x:.3f}" +
                         "<br><i>Conover-Iman Test</i>: {point.y:.3f}"
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
                jitter: {
                    x: 0.25,
                    y: 0
                },             
                marker: {
                    enabled:true,
                    radius: 5,
                    symbol: 'circle',
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