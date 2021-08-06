var Highcharts;
var url = document.getElementById("roc").getAttribute("url");
var project = document.getElementById("roc").getAttribute("project");

$.getJSON(url, function (calculations){

    var auc = [];

    
    for (var i = 0; i < (calculations.length - 1); i += 1) {

        if (calculations[i].name.match("sensitivity")) {
            var ordinates = i;
        }

        if (calculations[i].name.match("specificity")) {
            var abscissae = i;
        }

    }

    for (var i = 0; i < calculations[ordinates].data.length; i += 1) {

        auc.push({
            x: 1 - calculations[abscissae].data[i].y,   // (1 - specificity) = false positive rate
            y: calculations[ordinates].data[i].y,       // sensitivity
            name: (calculations[ordinates].data[i].x).toFixed(2)   // the threshold value
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
            type: "line",
            zoomType: "xy",
            marginTop: 95
        },

        title: {
            text: '\n' + project + '\n'
        },
        subtitle: {
            text: 'Receiver Operating Characteristics<br>TPR/FPR Curve'
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
            gridLineWidth: 1
        },

        yAxis: {
            title: {
                text: calculations[ordinates].name + "<br> true positive rate"
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
            name: "AUC",
            data: auc
        }]

    });

});
