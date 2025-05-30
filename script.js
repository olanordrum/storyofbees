

// THis file contains the flower field visualization





var margin = {top:0, right:10, bottom: 10, left: 10},
width = document.getElementById("myVis").offsetWidth - margin.left - margin.right,
height = window.innerHeight * 0.9 - margin.top - margin.bottom;



const canvas = d3.select("#myVis")
        .append("svg") 
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
		    .style("background-color","#ffb51d")
            .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top + ")");
            


//Add exclamation mark (info)
d3.select("#input_area")
    .append("svg")
    .attr("width", 30)
    .attr("height", 30)
    .style("position", "absolute")
    .style("top", "-5px")     
    .style("right", "7px")   
    .append("image")
    .attr("xlink:href", "assets/exclamationmark.svg")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30)
    .on("mouseover", function () {
        d3.select("#tooltip")
        .style("display", "block")
        .html(`The data shown is an estimate and may <br>  not reflect exact real-world values.`);
        console.log("")
    })
    .on("mousemove", (event) => {
        tooltip
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px");
    })
    .on('mouseout', function () {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        tooltip.style("display", "none")
    })
;



//Scale linear
const scale = 1000
const x = d3.scaleLinear().domain([0,scale]).range([margin.left, width])
const y = d3.scaleLinear().domain([0,scale]).range([height,0])



//Generate n numbers of dot objects with random x and y
const generateDots = (number, maxX, maxY, maxR) => {
	let dots = []
    
	for (let i = 0; i < number; i++){
		let imageNumber = Math.floor(Math.random() * 7) + 1 // random flower svg
        let xPos = Math.floor(Math.random() * maxX) //Random position
        let yPos = Math.floor(Math.random() * maxY) //Random position
        let rot = `rotate(${Math.random() * 360}, ${x(xPos)}, ${y(yPos)})`


		let dot = {
            id : i, // each flower has an id from 0 -> (number - 1)
			x: xPos,
            y: yPos,
            r: (maxR),
			path: "assets/newFlower" + ".png",
            rotation: rot
		};
		dots.push(dot)
	}

	return dots
}


//Draw flowers with animations
const drawFlowers = (dots) => {
    const tRemove = d3.transition().duration(1000);

    canvas.selectAll("text").remove();


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

                .transition(t)
                .attr("width", d => d.r * 10)
                .attr("height", d => d.r * 10)
                .attr("opacity", 1);

});
});


}

//Text info on left side
const addInfo = (honey,wax, flowers,km) => {
    d3.select(".results")
    .html("")
    .append('p') 
    .text(`Flowers visited: ${flowers}`)
    .append('p') 
    .text(`Honey produced: ${honey}`)
    .append('p') 
    .text(`Beewax produced: ${wax} grams`)
    .append('p') 
    .text(` Kilometres flown: ${km}`);
}

const calculateFlowers = (bees,hours,temp) => {
    const flowersPrBeePrHour = 31 // 750 flowers pr day / 24 hours = avg(31 flowers pr hour)
    const oneHour = flowersPrBeePrHour * bees
    //const efficiency = calculateBeeEfficiency(temp)
    return  oneHour * hours 
}

// Calucating bees efficiency based on average temp (NOT IN USE)
const calculateBeeEfficiency = (tempCelsius) =>  {
    if (tempCelsius < 20) return 0.8;
    if (tempCelsius <= 27) return 1.0;
    if (tempCelsius <= 33) return 0.8;
    if (tempCelsius <= 36) return 0.7;
    return 0.1; // stressnivå
}

const calculateHoneyWax = (flowers) => {
    let flowersForOneKG = 2737500
    let kgOfHoney = flowers/flowersForOneKG
    console.log(kgOfHoney)
    let gramsHoney = kgOfHoney * 1000
    let gramsBeesWax = d3.format(",.0f")(gramsHoney/8)
    let honeyText = calculateHoneyMeasurement(gramsHoney)
    let km = d3.format(",.0f")(150000 * kgOfHoney)
    return [honeyText,gramsBeesWax,km]
}

let calculateHoneyMeasurement = (honey) => {
    let teaspoon = 7 // 7 grams
    let tablespoon = honey / 14 // 14 grams
    let cups = tablespoon / 16 // one cup -> 16 tablespoons
    let kg = honey/1000
    console.log("kg " + kg)
    console.log("honey param " + honey)

    // Formatting string
    if (honey < teaspoon){
        return "Less than 1 teaspoon"
    }
    else if (tablespoon < 16){
        return d3.format(",.0f")(tablespoon) + " tablespoons"
    }
    else if (cups < 3){
        return d3.format(",.0f")(cups) + " cups"
    }
    else {
        return d3.format(",.0f")(kg) + " kilograms"
    }


    
}


let updateViz = () => {
    const bees = parseInt(document.getElementById("numberOfBees").value);
    const hours = parseInt(document.getElementById("time").value);
    const temp = parseInt(document.getElementById("temperature").value);



    const flowers = calculateFlowers(bees,hours,temp)

    const honeyWax = calculateHoneyWax(flowers)
    const honey = honeyWax[0]
    const wax = honeyWax[1]
    const kmFlewn = honeyWax[2]

    // Max rendering 20 000 flowers
    displayFlowers = flowers
    if (displayFlowers > 20000){
        displayFlowers = 20000
    }

    const maxXAx = scale 
    const maxYAx = scale

    const radius = Math.min(20, 600 / Math.pow(displayFlowers, 0.55));




    addInfo(honey ,wax, flowers,kmFlewn)
    canvas.selectAll("text").remove();

    const textElement = canvas.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "24px")
    .attr("fill", "#000");

// 
if(temp < 15 || temp > 40){
    canvas.selectAll("image").remove();
    if (temp < 15) {
        textElement.append("tspan")
            .attr("x",x( width / 2))
            .attr("dy", "0em")
            .text(temp + "°C is too cold for bees to forage.")
            .attr("fill", "#ffe0a1");
        textElement.append("tspan")
            .attr("x", x( width / 2))
            .attr("dy", "1.2em")
            .text("In temperatures below 15°C bees will cluster together to maintain heat")
            .attr("fill", "#ffe0a1");
    } else {
        textElement.append("tspan")
            .attr("x", x( width / 2))
            .attr("dy", "0em")
            .text(temp + "°C is too warm for bees to forag.")
            .attr("fill", "#ffe0a1");
        textElement.append("tspan")
            .attr("x", x( width / 2))
            .attr("dy", "1.2em")
            .text("Above 40°C bees will collect water and start fanning the hive to cool down")
            .attr("fill", "#ffe0a1");
    }
    return;
}



    drawFlowers(generateDots(displayFlowers, maxXAx, maxYAx, radius), bees, hours)


}



	

const updateChartFlowerVis = (number) => {
    switch(number){
        case 1: 
        
            break;

        case 2: 


            break;

        case 3: 

            break;

        case 4: 

            break;

    }
}





// Update on click
document.getElementById("updateButton").addEventListener("click", updateViz);

// init
updateViz();



	






