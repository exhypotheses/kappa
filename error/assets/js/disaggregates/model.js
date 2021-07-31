var Highcharts;
var optionSelected;
var seriesOptions = [];
var dropdown = $("#option_selector");

var url = document.getElementById("model").getAttribute("url")
var project = document.getElementById("model").getAttribute("project")


// Draw
$.getJSON(url, function (data) {

    for (var k = 0; k < data.series.length; k += 1) {
        dropdown.append($("<option></option>").attr("value", data.series[k].name).text(data.series[k].desc));
    }

    // Load the first Option by default
    var defaultOption = dropdown.find("option:first-child").val();
    optionSelected = dropdown.find("option:first-child").text();

    // Generate
    generateChart(defaultOption);

});


// Dropdown
dropdown.on("change", function (e) {

    $("#option_selector_title").remove();

    // Save name and value of the selected option
    optionSelected = this.options[e.target.selectedIndex].text;
    var valueSelected = this.options[e.target.selectedIndex].value;

    //Draw the Chart
    generateChart(valueSelected);

});


function generateChart(fileNameKey){

    $.getJSON(url, function(calculations){

        // https://api.highcharts.com/highstock/tooltip.pointFormat
        // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble
        // https://api.highcharts.com/highcharts/tooltip.headerFormat
        // https://www.highcharts.com/demo/stock/compare


        // Categories
        var categories = calculations.categories;

        // Split
        for (var i = 0; i < calculations.series.length; i += 1){

            if (calculations.series[i].name.match(fileNameKey)) {

                for (var j = 0; j < calculations.series[i].data.length; j += 1) {

                    seriesOptions[j] = {
                        name: calculations.series[i].data[j].desc,
                        visible: true,
                        data: calculations.series[i].data[j].data,
                        pointPlacement: 'on'
                    }

                }

            }

        }

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

}
