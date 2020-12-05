

// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40


// append the svg object to the div called 'my-chart2'
var svg = d3.select("#my-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

     d3.json('http://localhost:3000/denormalisation1/query1', function (error,data) {

        function tabulate(data, columns) {
              var table = d3.select('body').append('table')
              var thead = table.append('thead')
              var tbody = table.append('tbody');
              console.log(data);
      
              // append the header row
              thead.append('tr')
                .selectAll('th')
                .data(columns).enter()
                .append('th')
                  .text(function (column) { return column; });
      
              // create a row for each object in the data
              var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');
      
              // create a cell in each row for each column
              var cells = rows.selectAll('td')
                .data(function (row) {
                  return columns.map(function (column) {
                    return {column: column, value: row[column]};
                  });
                })
                .enter()
                .append('td')
                  .text(function (d) { return d.value; });
            console.log(table);
      
            return table;
          }
      
          // render the table(s)
          tabulate(data, ['id', 'OCCUPATION','Number_fo_transaction']); // 3 column table
      
      });