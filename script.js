
var margin = {top:10, right:10, bottom: 10, left: 10},
width = window.innerWidth - margin.left - margin.right,
height = window.innerHeight - margin.top - margin.bottom;




const canvas = d3.select("#myVis")
        .append("svg") 
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
		let imageNumber = Math.floor(Math.random() * 7) + 1 // random flower svg
        let xPos = Math.floor(Math.random() * maxX) //Random position
        let yPos = Math.floor(Math.random() * maxY) //Random position
        let rot = `rotate(${Math.random() * 360}, ${x(xPos)}, ${y(yPos)})`
        console.log(rot)

		let dot = {
            id : i, // each flower has an id from 0 -> n
			x: xPos,
            y: yPos,
            r: (maxR),
			path: "assets/flower" + 1 + ".png",
            rotation: rot
		};
		dots.push(dot)
	}

	return dots
}





const drawFlowers = (dots, bees, hours) => {
    const tRemove = d3.transition().duration(1000);



    // selects all current flowers
    // Binds new data to existing flowers
    // flowers with same id will be updated
    // new ID´s will be added (increse in flowers
    // missing ID´s will be removed (decrese in flowers)
    const flowers = canvas.selectAll("image")
            .data(dots, (d) => d.id);


    //remove excessive flowers
    const removeFlowers = flowers.exit()
        .transition(tRemove)
        .attr("opacity" ,0)//Fade
        .remove();


    //Remove old text
    canvas.selectAll("text").remove();

    removeFlowers.end().then(() => {
        const t = d3.transition().duration(1000);
        

        // Transitioning "existing" flowers (same id)
        const moveFlowers = flowers

                .transition(t)
                .attr("width", (d) => d.r * 10)
                .attr("height", (d) => d.r * 10)
                .attr("x", (d) => x(d.x) - (d.r * 5) )
                .attr("y", (d) => y(d.y) - (d.r * 5));



        moveFlowers.end().then(() => {
            const t = d3.transition().duration(1000);

            flowers.enter()
                .append("image")
                .attr("href", d => d.path)
                .attr("x", d => x(d.x) - (d.r * 5))
                .attr("y", d => y(d.y) - (d.r * 5))
                .attr("width", 0)
                .attr("height", 0)
                .attr("opacity", 0)
                //.attr("transform",d =>  d.rotation)


                .transition(t)
                .attr("width", d => d.r * 10)
                .attr("height", d => d.r * 10)
                .attr("opacity", 1);

});
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
	

function updateChartForFlowerViz() {
    // Oppdater grafikken for STEP 2, for eksempel animere en endring i data
    d3.select('#myVis')
      .transition()
      .duration(1000)
      .style('background-color', 'lightgreen');
  }





// Update on click
document.getElementById("updateButton").addEventListener("click", updateViz);

// init
updateViz();



	






