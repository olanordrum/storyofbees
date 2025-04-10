

var w = 1150;
var h = 690;

var canvas = d3.select("#myVis")
		.append("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background-color","white")

var g = canvas.append("g")
	.attr("transform",
		  "translate("+ 50+"," + 50+ ")")


//Scale linear
const x = d3.scaleLinear().domain([0,100]).range([10,w - 10])
const y = d3.scaleLinear().domain([0,100]).range([(h - 10),10])



const generateDots = (number, maxX, maxY, maxR) => {
	let dots = []

	for (let i = 0; i < number; i++){
		let imageNumber = Math.floor(Math.random() * 5)
		let dot = {
			x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
            r: (maxR),
			path: "assets/flower" + imageNumber + ".svg"
		};
		dots.push(dot)
	}

	return dots
}
const numberOfDots = 200
const maxXAx = 100 
const maxYAx = 100
const totalArea = maxXAx * maxYAx
const areaPerDot = totalArea / numberOfDots  
const radius = Math.sqrt(areaPerDot / Math.PI)

const dots = generateDots(numberOfDots, maxXAx, maxYAx, radius);

const t = d3.transition()
    .duration(5000)
    .ease(d3.easeLinear);


canvas.append("g")
	.selectAll("image")
	.data(dots)
	.enter()
	.append("image")
		.attr("href", (d) => d.path) // relativ URL
		.attr("x", (d) => x(d.x) - d.r)
		.attr("y", (d) => y(d.y) - d.r)
		.attr("width", (d) => d.r * 10)
		.attr("height", (d) => d.r * 10)

	
	
	


/*
	canvas.append("g")
	.selectAll("dot")
	.data(dots)
	.enter()
	.append("circle")
		.attr("cx", (morn) => x(morn.x))
		.attr("cy", (d) => y(d.y))
		.attr("r", (d) => d.r)
		.style("fill", "orange");


canvas.append("g")
	.selectAll("image")
	.data(dots)
	.enter()
	.append("image")
		.attr("href", "assets/orangeflower.svg")
		.attr("cx", (morn) => x(morn.x))
		.attr("cy", (d) => y(d.y))
		.attr("width", (d) => d.r * 10)
    	.attr("height", (d) => d.r * 10);
*/
	






