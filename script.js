
var margin = {top:10, right:10, bottom: 10, left: 10},
width = 1150 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;




const canvas = d3.select("#myVis")
        .append("svg") //append svg to body
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
		    .style("background-color","white")

            .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top + ")");
            


//Scale linear
const scale = 100
const x = d3.scaleLinear().domain([0,scale]).range([margin.left, width])
const y = d3.scaleLinear().domain([0,scale]).range([height,0])



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
var numberOfFlowers = 10
const maxXAx = scale 
const maxYAx = scale
const totalArea = maxXAx * maxYAx
const areaPerDot = totalArea / numberOfFlowers  
const radius = Math.sqrt(areaPerDot / Math.PI)

const dots = generateDots(numberOfFlowers, maxXAx, maxYAx, radius);

const t = d3.transition()
    .duration(5000)
    .ease(d3.easeLinear);

const drawFlowers = (dots) => {
    canvas.selectAll("*").remove();
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
}


let updateViz = () => {
    var flowers = parseInt(document.getElementById("numberOfBees").value);
    var time = parseInt(document.getElementById("time").value);

    console.log(flowers)

    drawFlowers(generateDots(flowers, maxXAx, maxYAx, radius))
}
	
// Update on click
document.getElementById("updateButton").addEventListener("click", updateViz);

// init
updateViz();


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
	






