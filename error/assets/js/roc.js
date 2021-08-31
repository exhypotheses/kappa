var Highcharts;
var url = document.getElementById("roc").getAttribute("url");


jQuery.getJSON(url, function (calculations){


    // The area under the tpr/fpr curve
    var j = calculations.length - 1;
    var auc = (calculations[j].data.roc).toFixed(2);
    

    // Get TPR & FPR series identifiers
    for (var i = 0; i < (calculations.length - 1); i += 1) {
        if (calculations[i].name.match("sensitivity")) {
            var ordinates = i;
        }
        if (calculations[i].name.match("fpr")) {
            var abscissae = i;
        }
    }


    // The graph data
    var roc = [];
    for (var i = 0; i < calculations[ordinates].data.length; i += 1) {
        roc.push({
            x: calculations[abscissae].data[i].y,   // fpr = (1 - specificity)
            y: calculations[ordinates].data[i].y,   // sensitivity, i.e., tpr
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
    Highcharts.chart("container", {

        chart: {
            type: "line",
            zoomType: "xy",
            marginTop: 95
        },

        title: {
            text: ''
        },
        subtitle: {
            text: 'Receiver Operating Characteristics<br>TPR/FPR Curve (AUC: ' + auc + ')',
            x: 15,
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
                text: "fall-out<br>false positive rate"
            },
            maxPadding: 0.05,
            gridLineWidth: 1,
            crosshair: true
        },

        yAxis: {
            title: {
                text: calculations[ordinates].name + "<br> true positive rate"
            },
            maxPadding: 0.05,
            endOnTick: false,
            crosshair: true
        },

        annotations: [{
            draggable: 'xy',
            labels: [{
                point: {
                    xAxis: 0,
                    yAxis: 0,
                    x: calculations[j].data.fpr,
                    y: calculations[j].data.sensitivity
                },
                x: 39,
                y: 69,
                text: 'Threshold Point ' + (calculations[j].data.optimal).toFixed(3) +
                    '<br>\&nbsp; \u25CF TPR: ' + (calculations[j].data.sensitivity).toFixed(3) + 
                    '<br>\&nbsp; \u25CF FPR: ' + (calculations[j].data.fpr).toFixed(3)
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
                'False Positive Rate: {point.x:,.2f}<br>True Positive Rate: {point.y:,.2f}<br/></p>',
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
            name: "TPR/FPR Curve",
            data: roc
        }]

    });

});
