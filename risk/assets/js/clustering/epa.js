// Instantiating
var Highcharts;
var seriesOptions = [];


// Variables
var url = document.getElementById("3D").getAttribute("url");
var project = document.getElementById("3D").getAttribute("project");
var group = document.getElementById("3D").getAttribute("group");


// Start
jQuery.getJSON(url, function (calculations){


    // Data
    for (var i = 0; i < calculations.length; i += 1) {
        seriesOptions.push({
            x: calculations[i].x,
            y: calculations[i].y,
            z: calculations[i].z,
            description: calculations[i].description,
            name: (calculations[i].name).toString()
        });
    }


    // Points: 3D aesthetics via radial gradient
    Highcharts.setOptions({
        colors: Highcharts.getOptions().colors.map(function (color) {
            return {
                radialGradient: {
                    cx: 0.4,
                    cy: 0.3,
                    r: 0.5
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.2).get('rgb')]
                ]
            };
        })
    });


    // Set up the chart
    Highcharts.chart("container", {

        chart: {
            margin: 100,
            type: 'scatter3d',
            animation: false,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 250,
                viewDistance: 5,
                fitToPlot: false,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: project
        },
        subtitle: {
            text: '\nClick and drag the plot area to rotate in space\n'
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "printChart", "separator",
                        "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator",
                        "downloadXLS", "downloadCSV"]
                }
            }
        },
        tooltip: {
            // headerFormat: '<span style="font-size: 13px; color:{point.color}">\u25CF</span>',
            pointFormat: ' &nbsp; {point.description}<br/><p>' +
                '({point.x:,.2f}, {point.y:,.2f}, {point.z:,.2f})<br/></p>',
            style: {
                fontSize: "11px"
            }
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            },
            scatter3d: {
                turboThreshold: 11000
            }
        },
        yAxis: {
            title: null
        },
        xAxis: {
            gridLineWidth: 1
        },
        zAxis: {
            showFirstLabel: false
        },
        legend: {
            enabled: true
        },
        series: seriesOptions
    });
    

});

// Add mouse and touch events for rotation
(function (H) {
    function dragStart(eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5,  // lower is more sensitive
            handlers = [];

        function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update({
                chart: {
                    options3d: {
                        alpha: alpha + (e.chartY - posY) / sensitivity,
                        beta: beta + (posX - e.chartX) / sensitivity
                    }
                }
            }, undefined, undefined, false);
        }

        function unbindAll() {
            handlers.forEach(function (unbind) {
                if (unbind) {
                    unbind();
                }
            });
            handlers.length = 0;
        }

        handlers.push(H.addEvent(document, 'mousemove', drag));
        handlers.push(H.addEvent(document, 'touchmove', drag));


        handlers.push(H.addEvent(document, 'mouseup', unbindAll));
        handlers.push(H.addEvent(document, 'touchend', unbindAll));
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
}(Highcharts));