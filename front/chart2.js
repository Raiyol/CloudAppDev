var width = document.getElementById('my-chart2').clientWidth;
var data = [        //This is the data we want to visualize. 
    //In reality it usually comes from a file or database.
{x: 10,    y: 10},
{x: 10,    y: 20},
{x: 10,    y: 30},
{x: 10,    y: 40},
{x: 10,    y: 50},
{x: 10,    y: 80},
{x: 10,    y: 90},
{x: 10,    y: 100},
{x: 10,    y: 110},
{x: 20,    y: 30},
{x: 20,    y: 120},
{x: 30,    y: 10},
{x: 30,    y: 20},
{x: 30,    y: 30},
{x: 30,    y: 40},
{x: 30,    y: 50},
{x: 30,    y: 80},
{x: 30,    y: 90},
{x: 30,    y: 100},
{x: 30,    y: 110},
{x: 40,    y: 120},
{x: 50,    y: 10},
{x: 50,    y: 20},
{x: 50,    y: 30},
{x: 50,    y: 40},
{x: 50,    y: 50},
{x: 50,    y: 80},
{x: 50,    y: 90},
{x: 50,    y: 100},
{x: 50,    y: 110},
{x: 60,    y: 10},
{x: 60,    y: 30},
{x: 60,    y: 50},
{x: 70,    y: 10},
{x: 70,    y: 30},
{x: 70,    y: 50},
{x: 70,    y: 90},
{x: 70,    y: 100},
{x: 70,    y: 110},
{x: 80,    y: 80},
{x: 80,    y: 120},
{x: 90,    y: 10},
{x: 90,    y: 20},
{x: 90,    y: 30},
{x: 90,    y: 40},
{x: 90,    y: 50},
{x: 90,    y: 80},
{x: 90,    y: 120},
{x: 100,    y: 50},
{x: 100,    y: 90},
{x: 100,    y: 100},
{x: 100,    y: 110},
{x: 110,    y: 50},
{x: 120,    y: 80},
{x: 120,    y: 90},
{x: 120,    y: 100},
{x: 120,    y: 110},
{x: 120,    y: 120},
{x: 130,    y: 10},
{x: 130,    y: 20},
{x: 130,    y: 30},
{x: 130,    y: 40},
{x: 130,    y: 50},
{x: 130,    y: 80},
{x: 130,    y: 100},
{x: 140,    y: 50},
{x: 140,    y: 80},
{x: 140,    y: 100},
{x: 140,    y: 110},  
{x: 150,    y: 50},
{x: 150,    y: 90},
{x: 150,    y: 120},
{x: 170,    y: 20},
{x: 170,    y: 30},
{x: 170,    y: 40},
{x: 170,    y: 80},
{x: 170,    y: 90},  
{x: 170,    y: 100},
{x: 170,    y: 110},
{x: 170,    y: 120},
{x: 180,    y: 10},
{x: 180,    y: 50},
{x: 180,    y: 120},
{x: 190,    y: 10},
{x: 190,    y: 50},
{x: 190,    y: 120},
{x: 200,    y: 20},
{x: 200,    y: 30},  
{x: 200,    y: 40},
{x: 210,    y: 80},
{x: 210,    y: 90},
{x: 210,    y: 100},
{x: 210,    y: 110},  
{x: 210,    y: 120},
{x: 220,    y: 80},  
{x: 220,    y: 120},
{x: 230,    y: 80},  
{x: 230,    y: 120},
{x: 240,    y: 90},
{x: 240,    y: 100},  
{x: 240,    y: 110},
{x: 270,    y: 70},
{x: 270,    y: 80},
{x: 270,    y: 90},
{x: 270,    y: 100},  
{x: 270,    y: 120}
];
//this allows us to collect the width of the div where the SVG will go.
var height = width / 3.236;
//I like to use the golden rectangle ratio if they work for my charts.

var svg = d3.select('#my-chart2').append('svg').selectAll()  //'d3' calls the d3 library
//'.select' selects the object (in this case the body of HTML)
//'.append' adds SVG element to the body
//'.selectAll()' selects all SVG elements
.data(data)                              //'.data' gets the data from the variable 'data'
.enter().append("circle")                  //'.enter' enters the data into the SVG 
//the data enter as circles with '.append("circle")'
.attr("r", 3)                            //'.attr' adds/alters atributes of SVG, 
//such as radius ("r"), making it 3 pixels
.attr("cx", function(d) { return d.x; }) //coordinates "cx" (circles' x coordinates)
.attr("cy", function(d) { return d.y; }) //coordinates "cy" (circles' y coordinates)
.style("fill", "darkblue");
//We add our svg to the div area


//We will build a basic function to handle window resizing.
function resize() {
    width = document.getElementById('my-chart').clientWidth;
    height = width / 3.236;
    d3.select('#my-chart2 svg')
      .attr('width', width)
      .attr('height', height);
}

window.onresize = resize;
//Call our resize function if the window size is changed.