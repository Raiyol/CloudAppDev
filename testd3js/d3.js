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

async function D1Q4(url, html_id){
    data = await FetchJSON(url);
    console.log(data);

    data.map(x => {
        if(x.average_age == null) x.average_age = 0;
        if(x.average_income == null) x.average_income = 0;
        x.average_income /= 100;
        return x;
    })
    data.sort((a,b) => a._id - b._id);
        
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 4000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(`#${html_id}`)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ["average_age", "average_income"]

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d._id)}).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 90])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a'])

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d._id) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); });

}

D1Q4('http://localhost:3000/denormalisation1/query4', 'd1q4');


async function D1Q8(url, html_id){
    data = await FetchJSON(url);
    console.log(data);

    data.map(x => {
        if(x.average_age == null) x.average_age = 0;
        if(x.average_income == null) x.average_income = 0;
        x.average_income /= 100;
        return x;
    })
    data.sort((a,b) => a._id - b._id);
        
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 4000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(`#${html_id}`)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ["average_sales_amount", "average_income"]

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d._id)}).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 200])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a'])

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d._id) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); });

}

D1Q8('http://localhost:3000/denormalisation1/query8', 'd1q8');
