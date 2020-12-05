

// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my-chart2'
var svg = d3.select("#my-chart2")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
async function FetchJSON(url) {
    const response = await fetch(url);
    const json_resp = await response.json();
    if(response.status != 200){
        console.log(response);
    }
    else{
        //console.log(json_resp);
        return json_resp;
    }
}
async function pie(url) {
    var data_json = await FetchJSON(url);
    //console.log(data);
    var data = {Female:data_json[0].sum,Male:data_json[1].sum};
    console.log(data);
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
   .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
    svg
   .selectAll('mySlices')
   .data(data_ready)
   .enter()
   .append('text')
   .text(function(d){ return "" + d.data.key + " : " + d.data.value})
   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
   .style("text-anchor", "middle")
   .style("font-size", 17)

}

//console.log(data)
// set the color scale


  pie=pie('http://localhost:3000/denormalisation1/query5/');