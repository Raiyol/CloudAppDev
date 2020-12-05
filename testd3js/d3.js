// Histogramme
data = [5.1, 4.9, 8.6, 6.2, 5.1, 7.1, 6.7, 6.1, 5, 5, 5.2, 7.9, 11.1, 5.9, 5.5, 5.6, 6.5, 7.7, 5.7, 6.7];

// console.log(d3.min(data));

bins = d3.histogram().thresholds(5)(data);

height = 200;
width = 500;

const svg = d3.select("#svg1").append("svg").attr("viewBox", [0, 0, width, height]);

margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
}

x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([margin.left, width - margin.right])
      
y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top])

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80 ).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x))

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

// chart
svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("y", d => y(d.length))
      .attr("height", d => y(0) - y(d.length));

svg.append("g")
      .call(xAxis);
  
svg.append("g")
      .call(yAxis);

// Scatter plot

chart = async () =>{
    await fetch
}

let str = "2007-5-17 12:00:00";
let temp = str.split(' ')[0].split("-");

data = [
    {date : new Date(2007, 05, 10), value : 2},
    {date : new Date(2007, 05, 20), value : 5},
    {date : new Date(2007, 06, 1), value : 1},
]

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

y = d3.scaleLinear()
    .domain([new Date(2000, 0, 1,  5), d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

x = d3.scaleUtc()
    .domain([d3.extent(data, d => d.date)])
    .range([margin.left, width - margin.right])

line = d3.line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value))

const svg2 = d3.select("#svg2").append("svg")
.attr("viewBox", [0, 0, width, height]);

svg2.append("g")
.call(xAxis);

svg2.append("g")
.call(yAxis);

svg2.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-width", 1.5)
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.attr("d", line);
