var Highcharts;
var url = document.getElementById("ptc").getAttribute("url");

jQuery.getJSON(url, function (calculations){

    // The area under the precision/tpr curve
    var j = calculations.length - 1;
    var auc = (calculations[j].data.ptc).toFixed(2);
    

    // Get TPR & FPR series identifiers
    for (var i = 0; i < (calculations.length - 1); i += 1) {
        if (calculations[i].name.match("precision")) {
            var ordinates = i;
        }
        if (calculations[i].name.match("sensitivity")) {
            var abscissae = i;
        }
    }


    // The graph data
    var ptc = [];
    for (var i = 0; i < calculations[ordinates].data.length; i += 1) {
        ptc.push({
            x: calculations[abscissae].data[i].y,   // sensitivity, i.e., tpr
            y: calculations[ordinates].data[i].y,   // precision
            name: (calculations[ordinates].data[i].x).toFixed(2)   // the threshold value
        });
    }


    // Options
    Highcharts.setOptions({
        lang: {
            thousandsSep: ","
        }
    });


    // Graphing
    Highcharts.chart("container0003", {

        chart: {
            type: "line",
            zoomType: "xy",
            marginTop: 95
        },

        title: {
            text: ''
        },
        subtitle: {
            text: 'Precision/TPR Curve<br>(AUC: ' + auc + ')',
            x: 25,
            y: 35
        },

        credits: {
            enabled: false
        },

        legend: {
            enabled: false,
            x: 50
        },

        xAxis: {
            title: {
                text: calculations[abscissae].name + "<br> true positive rate"
            },
            maxPadding: 0.05,
            gridLineWidth: 1,
            crosshair: true
        },

        yAxis: {
            title: {
                text: calculations[ordinates].name + "<br> positive predictive value"
            },
            maxPadding: 0.05,
            tickInterval: 0.25,
            // min: 0,
            // max: 1,
            endOnTick: false,
            crosshair: true
        },

        annotations: [{
            draggable: 'xy',
            labels: [{
                point: {
                    xAxis: 0,
                    yAxis: 0,
                    x: calculations[j].data.precision,
                    y: calculations[j].data.sensitivity
                },
                x: -72,
                y: 39,
                text: 'Threshold Point ' + (calculations[j].data.optimal).toFixed(3) + 
                    '<br> \&nbsp; \u25CF Precision: ' + (calculations[j].data.precision).toFixed(3) + 
                    '<br> \&nbsp; \u25CF Sensitivity: ' + (calculations[j].data.sensitivity).toFixed(3)
            }]

        }],

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
            headerFormat: '<span style="font-size: 13px; color:{point.color}">\u25CF</span>',
            pointFormat: ' &nbsp; At threshold: {point.name}<br/><p>' +
                'True Positive Rate: {point.x:,.2f}<br>Precision: {point.y:,.2f}<br/></p>',
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
                lineWidth: 1,
                dataLabels: {
                    enabled: false
                },
                turboThreshold: 4000
            }
        },

        series: [{
            type: "spline",
            name: "Precision/TPR Curve",
            data: ptc
        }]

    });

});
