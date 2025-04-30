var margin = {top:0, right:10, bottom: 30, left: 20},
width = document.getElementById("sticky-thing").offsetWidth  - margin.left - margin.right,
height = document.getElementById("sticky-thing").offsetHeight - margin.top - margin.bottom;


const polCanvas = d3.select(".sticky-thing")
    .append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color","ffb51d")


    .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");



let recs = {}

const makeData = (number,percentFilled) => { 
    let recs =d3.range(number).map((d,i) => ({
        id:i,
        filled: i < percentFilled
    }))
    return recs
}


let numberOfRecs = 100

let cols = 10
let rows = 10
let size = 25
let gap = 2


let offset = 120

let drawWaffleChart = (recs,filled) => {


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


const updateChart = (number) => {
    switch(number){
        case 1: 
            drawWaffleChart(100,70);
            break;

        case 2: 
            drawWaffleChart(100,35);
            break;

        case 3: 
            drawWaffleChart(100,30);
            break;

        case 4: 
            drawWaffleChart(100,40);
            break;

    }
}

//init
drawWaffleChart(100,70);













