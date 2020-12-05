async function FetchJSON(url) {
    const response = await fetch(url);
    const json_resp = await response.json();
    if(response.status != 200){
        console.log(response + " " +response.status);
    }
    else{
        console.log(json_resp);
        return json_resp;
    }
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

async function f(){
data = await FetchJSON('http://localhost:8080/denormalisation1/query1');
    // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
width = 800,
height = 600;

// append the svg object to the body of the page
var svg = d3.select("#req1")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data

// List of subgroups = header of the csv files = soil condition here
var subgroups = [];
var ranger = [];
var min = 0;
var max = 0;

async function traitement() {
    for(let i = 0; i < 50; i++){
        subgroups.push(data[i].OCCUPATION)
        ranger.push(data[i].number_transactions)
    }

    min = Math.min(ranger)
    max = Math.max(ranger)  

}
await traitement()

// List of groups = species here = value of the first column called group -> I show them on the X axis
var groups = subgroups.filter(onlyUnique)

// Add X axis
var x = d3.scaleBand()
  .domain(groups)
  .range([0, 800])
  .padding([1])
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).tickSizeOuter(0));

// Add Y axis
var y = d3.scaleLinear()
.domain([min, max])
.range([ height, 0 ]);
svg.append("g")
.call(d3.axisLeft(y));

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
.domain(groups)
.range(['#e41a1c','#377eb8','#4daf4a'])

//stack the data? --> stack per subgroup
var stackedData = d3.stack()
.keys(groups)
(data)

// Show the bars
svg.append("g")
.selectAll("g")
// Enter in the stack data = loop key per key = group per group
.data(stackedData)
.enter().append("g")
  .attr("fill", function(d) { return color(d.key); })
  .selectAll("rect")
  // enter a second time = loop subgroup per subgroup to add all rectangles
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d) { return x(d.data.group); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .attr("width",x.bandwidth())
}

f()





