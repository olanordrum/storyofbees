
var margin = {top:10, right:10, bottom: 10, left: 10},
width = 1150 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;




const canvas = d3.select("#myVis")
        .append("svg") 
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
		    .style("background-color","lightgreen")

            .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top + ")");
            


//Scale linear
const scale = 100
const x = d3.scaleLinear().domain([0,scale]).range([margin.left, width])
const y = d3.scaleLinear().domain([0,scale]).range([height,0])



const generateDots = (number, maxX, maxY, maxR) => {
	let dots = []

	for (let i = 0; i < number; i++){
		let imageNumber = Math.floor(Math.random() * 5) // random flower svg
		let dot = {
			x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
            r: (maxR),
			path: "assets/flower" + imageNumber + ".svg",
		};
		dots.push(dot)
	}

	return dots
}





const t = d3.transition()
    .duration(5000)
    .ease(d3.easeLinear);

const drawFlowers = (dots, bees, hours) => {
    canvas.selectAll("*").remove();

    canvas.append("g")
        .selectAll("image")
        .data(dots)
        .enter()
        .append("image")
            .attr("href", (d) => d.path)
            .attr("x", (d) => x(d.x) - d.r)
            .attr("y", (d) => y(d.y) - d.r)
            .attr("width", (d) => d.r * 10)
            .attr("height", (d) => d.r * 10)
            .attr("transform", (d) => {
                const angle = Math.random() * 360;
                const cx = x(d.x);
                const cy = y(d.y);
                return `rotate(${angle},${cx},${cy})`;
            });




    canvas.append("text")
            .attr("x", width / 2)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "black")
            .text(bees + " bees visits about " + dots.length + " flowers in " + hours + "hours");
}

const calculateFlowers = (bees,hours) => {
    const flowersPrBeePrHour = 40
    const oneHour = flowersPrBeePrHour * bees
    return  oneHour * hours
}


let updateViz = () => {

    const bees = parseInt(document.getElementById("numberOfBees").value);
    const hours = parseInt(document.getElementById("hours").value);



    const flowers = calculateFlowers(bees,hours)

    const maxXAx = scale 
    const maxYAx = scale
    const totalArea = maxXAx * maxYAx
    const areaPerDot = totalArea / flowers  
    const radius = Math.sqrt(areaPerDot / Math.PI)



    console.log("Bees: " + bees)
    console.log("Hours: " + hours)
    console.log("Flowers: " + flowers)


    drawFlowers(generateDots(flowers, maxXAx, maxYAx, radius), bees, hours)
}
	






// Update on click
document.getElementById("updateButton").addEventListener("click", updateViz);

// init
updateViz();



	






