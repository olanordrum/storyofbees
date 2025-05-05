var margin = {top:0, right:10, bottom: 40, left: 20},
width = document.getElementById("sticky-thing").offsetWidth  - margin.left - margin.right,
height = document.getElementById("sticky-thing").offsetHeight - margin.top - margin.bottom;


const polCanvas = d3.select(".sticky-thing")
    .append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color","#ffb51d")


    .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");




const tooltip = d3.select("#tooltip");


// ------- Waffle chart -------------

const makeData = (number,percentFilled) => { 
    let recs =d3.range(number).map((d,i) => ({
        id:i,
        filled: i < percentFilled
    }))
    return recs
}



let drawWaffleChart = (recs,filled) => {
    let cols = 100
    let rows = 100
    let offset = 12

    let size = Math.min((width - offset) / cols, height / rows) * 0.53;

    polCanvas.selectAll("circle").remove();
    polCanvas.selectAll("text").remove();
    polCanvas.selectAll("image").remove();



    let data = makeData(recs,filled)

    let xWaffleChart = d3.scaleLinear().domain([0,cols]).range([offset,width])
    let yWaffleChart = d3.scaleLinear().domain([0,rows]).range([height,0])



    polCanvas.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", (d) => xWaffleChart(d.id % cols))
                .attr("cy", (d) => yWaffleChart(Math.floor(d.id / rows)))
                .attr("r", size)
                .attr("fill", (d) =>"white")

    d3.selectAll("circle")
        .transition()
        .delay((d,i) => i/4)
        .duration(1000)
        .attr("fill", (d) => d.filled ?  "black" : "white")

}





// --------- Plant Dependency chart ----------

const dependencyData = [
    {
    dependencyPercent: [0,0],
    dependency: "No dependency",
    plants:["Cereals", "Roots and tubers", "Fruit and Veg","Legumes", "Sugar crops"],
    example: ["Wheat","Rice","Barley","Oats"],
    x:0.2,
    image:"wheat.png",
    },

    {
    dependencyPercent: [0,0.1],
    dependency: "Little dependency",
    plants:["Groundnuts", "Fruit and Veg","Legumes", "Oilcrops"],
    example: ["Oranges","Poppy seed","Beans","Lemons"],
    x:0.6,
    image:"palmoil.png",
    },

    {
    dependencyPercent: [0.1,0.4],
    dependency: "Modest dependency",
    plants:["Coconut and ocra", "Fruits","Soybeans", "Oilcrops", "CoffeBeans"],
    example: ["Sunflower seeds","Strawberrys","Eggplant","Coconuts"],
    x:0.3,
    image:"strawberry.png",
    },
    {
    dependencyPercent: [0.4,0.9],
    dependency: "High dependency",
    plants:["Nuts", "Fruits","Avocados"],
    example: ["Apples","Blueberries","Almonds","Cashew nuts"],
    x:0.1,
    image:"apple.png",
    },

    {
    dependencyPercent: [0.9,1],
    dependency: "Essential",
    plants:["Cocoa Beans", "Fruits","Brazil nuts"],
    example: ["Kiwi","Melons","Pumpkin","Cashew nuts"],
    x:0.6,
    image:"watermelon.png",
    },
]


let drawDependencyScatter = (dependencyData) => {

    polCanvas.selectAll("*").remove();
    polCanvas.selectAll("image").remove();

    let radius = 120

    const colorScale = d3.scaleLinear()
        .domain([0,0.1,0.4,0.9,1])
        .range(["#a8e6a3", "#fff89c", "#ffd27f", "#ff8c5a", "#e84545"]);


    let xDepenceny = d3.scaleLinear().domain([0,1]).range([radius,width-radius])
    let yDependency = d3.scaleLinear().domain([0,5]).range([height - radius,radius])



    polCanvas.selectAll("circle")
                .data(dependencyData)
                .enter()
                .append("circle")
                    .attr("cx", (d) => xDepenceny(d.x))
                    .attr("cy", (_,i) => yDependency(i*1.2))
                    .attr("r", radius)
                    .attr("fill", (d,i) => colorScale(d.dependencyPercent[1]))
                    .on('mouseover', function (event, d) {
                        d3.select(this).transition()
                             .duration('50')
                             .attr('opacity', '.70')
                        d3.select("#tooltip")
                             .style("display", "block")
                             .html(`<strong>${d.dependency} ${d.dependencyPercent[0]* 100}% - ${d.dependencyPercent[1]* 100}%</strong><br/>
                             ${d.plants.join(", ")} <br/><br/>
                             <strong>Examples:<strong><br/> ${d.example.join(", \n")}`);
                    })
                    .on("mousemove", (event) => {
                        tooltip
                            .style("left", (event.pageX - 150) + "px")
                            .style("top", (event.pageY + 20) + "px");
                    })
                    .on('mouseout', function () {
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '1');
                        tooltip.style("display", "none");
});

//Add fruit png´s
    let iconSize = radius * 0.6
    polCanvas.selectAll("image")
            .data(dependencyData)
            .enter()
            .append("image")
            .attr("x", d => xDepenceny(d.x) - iconSize/2)
            .attr("y", (_,i) => yDependency(i*1.2) - iconSize/2)
            .attr("width", iconSize)  // bildets bredde og høyde lik sirkelens diameter
            .attr("height", iconSize)
            .attr("href", (d) =>  "assets/" + d.image + ""); 


    // Label
    polCanvas.append("text")
        .attr("x", xDepenceny(0.6))
        .attr("y", yDependency(-1))
        .text("Hover to see more details")
        .style("font-size", "30px")
        .style("fill", "#D49F00" )
}



let drawCrop = () => {
    polCanvas.selectAll("*").remove();

    let xCrop = d3.scaleLinear().domain([0,12]).range([0,width])
    let yCrop= d3.scaleLinear().domain([0,8]).range([height,0])



    const imgData = [
        {row: 2, col: 2, img: "crop.png"},
        {row: 2, col: 6, img: "crop.png"},
        {row: 6, col: 2, img: "crop.png"},
        {row: 6, col: 6, img: "colorCrop.png"},
    ]

    let imgSize = 200
    let spacing = 20

    polCanvas.selectAll("image")
        .data(imgData)
        .enter()
        .append("image")
            .attr("x", d => xCrop(d.col) )
            .attr("y", d => yCrop(d.row) )
            .attr("width", imgSize)
            .attr("height", imgSize)
            .attr("href", d => "assets/" + d.img)
            .style("opacity", 0)
            .transition()
            .delay((d,i) => i * 500)
            .duration(500)
            .style("opacity", 1)

}

const updateChart = (number) => {
    switch(number){
        case 1: 
            drawCrop();
            break;

        case 2: 
            drawWaffleChart(10000,7500);
            break;

        case 3: 
            drawWaffleChart(10000,3000); 
            break;

        case 4: 
             drawDependencyScatter(dependencyData);
            break;
    }
}

//init













