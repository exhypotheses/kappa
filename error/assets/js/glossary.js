/* 
    http://bl.ocks.org/ndarville/7075823
*/
function makeGlossaryTable() {
    d3.csv("https://raw.githubusercontent.com/miscellane/hub/develop/data/temporary/glossary.csv")
        .then(function(data){

            var parsedCSV = d3.csvParseRows(data);

                var container = d3.select("body")
                    .append("table")

                    .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });


        })

}
       