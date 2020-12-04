var svg = d3
  .select('#my-chart3')           // I'm starting off by selecting the container.
    .append('svg')               // Appending an SVG element to that container.
    .attr('width', chartWidth)   // Setting the width of the SVG.
    .attr('height', chartHeight) // And setting the height of the SVG.

d3.json("query1.json")
  .get(function(data) {
        console.log(data);
  });