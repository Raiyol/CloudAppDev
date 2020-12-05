async function FetchJSON(url) {
    const response = await fetch(url);
    const json_resp = await response.json();
    if(response.status != 200){
        console.log(response);
    }
    else{
        return json_resp;
    }
}

async function D1Q4(url){
    data = await FetchJSON(url);
    console.log(data);
    data.map(x => {
        if(x.average_age == null) x.average_age = 0;
        if(x.average_income == null) x.average_income = 0;
        return x;
    })
    data.sort((a,b) => a._id - b._id);


    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 4000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#d1q4")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d._id; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 4000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d._id); })
    .attr("y", function(d) { return y(d.average_income); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.average_income); })
    .attr("fill", "#69b3a2")  
}


D1Q4('http://localhost:3000/denormalisation1/query4');
