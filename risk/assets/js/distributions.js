var Highcharts;
var optionSelected;

var categories = [];
var seriesOptions = [];
var description;

var dropdown = $("#option_selector");

var url = document.getElementById("distributions").getAttribute("url");


// Draw
$.getJSON(url, function (data) {

    for (var k = 0; k < data.length; k += 1) {
        dropdown.append($("<option></option>").attr("value", data[k].variable).text(data[k].description));
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


// Generate Graphs
function generateChart(fileNameKey){

    jQuery.getJSON(url, function(calculations){


        // Data
        for (var i = 0; i < calculations.length; i += 1){

            if(calculations[i].variable.match(fileNameKey)){
                categories = calculations[i].categories;
                seriesOptions = calculations[i].series;
                variable = calculations[i].variable;
                variableType = calculations[i].variableType;                
                dataType = calculations[i].dataType;
                unitOfMeasure = calculations[i].unitOfMeasure;
                nullable = calculations[i].nullable;
                description = calculations[i].description;
                elements = JSON.stringify(calculations[i].elements);
            }

        }

        // graph points
        var pointWidth = 25, pointInterval = 1, 
            pointPadding = 0, groupPadding = 0, 
            marginTop = 35, marginBottom = 65;
        
        // hence, height point
        var height = marginTop + marginBottom +  (categories.length * pointWidth) + (1 + categories.length) * (2 * pointInterval);


        // Container
        Highcharts.chart("container0008", {

            chart: {
                type: 'column',
                inverted: true,
                height: height,
                marginTop: marginTop,
                marginBottom: marginBottom
            },
    
            title: {
                text: ' ',
                x: 0
            },
    
            credits: {
                enabled: false
            },

            xAxis: {
                categories: categories,
                title: {
                    text: description
                }
            },

            yAxis: {
                title: {
                    text: 'N'
                }
            },

            legend: {
                enabled: false
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
                pointFormat: '<span style="color:{series.color}"><b>Acceptable: {series.name}, N: {point.y}</b></span><br>'
            },

            plotOptions: {
                column: {
                    
                },
                series: {   
                    stacking: 'normal',                 
                    pointWidth: pointWidth,
                    pointInterval: pointInterval,
                    pointPadding: pointPadding,
                    groupPadding: groupPadding
                }
            },

            series: seriesOptions

        });

        // id, width, height
        const renderer = new Highcharts.Renderer(document.getElementById('notes'), 390, 300);
        renderer.text('<b>VARIABLE</b>', 20, 20).add();
        renderer.text('variable: ' + variable, 35, 40).add();
        renderer.text('variable type: ' + variableType, 35, 60).add();
        renderer.text('data type: ' + dataType, 35, 80).add();
        renderer.text('unit of measure: ' + unitOfMeasure, 35, 100).add();
        renderer.text('nullable: ' + nullable, 35, 120).add();
        renderer.text('description: ' + description, 35, 140).add();
        renderer.text('elements: ' + elements, 35, 160).add();
        
    });

}