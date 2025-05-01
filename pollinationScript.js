var margin = {top:0, right:10, bottom: 30, left: 20},
width = document.getElementById("sticky-thing").offsetWidth  - margin.left - margin.right,
height = document.getElementById("sticky-thing").offsetHeight - margin.top - margin.bottom;


const polCanvas = d3.select(".sticky-thing")
    .append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color","#ffb51d")


    .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");



// ------- Waffle chart -------------

const makeData = (number,percentFilled) => { 
    let recs =d3.range(number).map((d,i) => ({
        id:i,
        filled: i < percentFilled
    }))
    return recs
}






let drawWaffleChart = (recs,filled) => {
    let cols = 10
    let rows = 10
    let size = 25
    let offset = 120


    polCanvas.selectAll("circle").remove();
    polCanvas.selectAll("text").remove();


    let data = makeData(recs,filled)

    let xWaffleChart = d3.scaleLinear().domain([0,cols]).range([offset,width])
    let yWaffleChart = d3.scaleLinear().domain([0,rows]).range([height,0])


    polCanvas.append("text")
        .attr("x", -10)
        .attr("y", height )
        .attr("text-anchor","start")
        .attr("font-size","48px")
        .attr("fill", "black")
        .text(filled + "%")

    polCanvas.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", (d) => xWaffleChart(d.id % cols))
                .attr("cy", (d) => yWaffleChart(Math.floor(d.id / rows)))
                .attr("r", size)
                .attr("fill", (d) => d.filled ? "white" : "black")


}





// --------- Plant Dependency chart ----------


const dependencyData = [
    {
    dependencyPercent: [0,0],
    dependency: "No dependency",
    plants:["Cereals", "Roots and tubers", "Fruit and Veg","Legumes", "Sugar crops"],
    example: ["Wheat","Rice","Barley","Oats"]
    },

    {
    dependencyPercent: [0,0.1],
    dependency: "Little dependency",
    plants:["Groundnuts", "Fruit and Veg","Legumes", "Oilcrops"],
    example: ["Oranges","Poppy seed","Beans","Lemons"]
    },

    {
    dependencyPercent: [0.1,0.4],
    dependency: "Modest dependency",
    plants:["Coconut and ocra", "Fruits","Soybeans", "Oilcrops", "CoffeBeans"],
    example: ["Sunflower seeds","Strawberrys","Eggplant","Coconuts"]
    },
    {
    dependencyPercent: [0.4,0.9],
    dependency: "High dependency",
    plants:["Nuts", "Fruits","Avocados"],
    example: ["Apples","Blueberries","Almonds","Cashew nuts"]
    },

    {
    dependencyPercent: [0.9,1],
    dependency: "Essential",
    plants:["Cocoa Beans", "Fruits","Brazil nuts"],
    example: ["Kiwi","Melons","Pumpkin","Cashew nuts"]
    },
]


let drawDependencyScatter = (dependencyData) => {

    polCanvas.selectAll("*").remove();
    let radius = 70

    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(["Green", "Red"]);


    let xDepenceny = d3.scaleLinear().domain([0,1]).range([radius,width-radius])
    let yDependency = d3.scaleLinear().domain([0,5]).range([height - radius,radius])


    polCanvas.selectAll("circle")
                .data(dependencyData)
                .enter()
                .append("circle")
                    .attr("cx", (d) => xDepenceny(d.dependencyPercent[1]))
                    .attr("cy", (_,i) => yDependency(i))
                    .attr("r", radius)
                    .attr("fill", (d) => colorScale(d.dependencyPercent[1]))

}


const updateChart = (number) => {
    switch(number){
        case 0: 
            drawWaffleChart(100,0);
            break;
        case 1: 
            drawWaffleChart(100,75);
            break;

        case 2: 
            drawWaffleChart(100,35);
            break;

        case 3: 
            drawDependencyScatter(dependencyData);
            break;

        case 4: 
            drawWaffleChart(100,30);
            break;

    }
}

//init
drawWaffleChart(100,70);













