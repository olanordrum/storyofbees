var margin = {top:0, right:10, bottom: 30, left: 20},
width = 600 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


const polCanvas = d3.select("#pollinationVis")
    .append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color","white")


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
let filled = 75
let cols = 10
let rows = 10
let size = 25
let gap = 2

let data = makeData(numberOfRecs,filled)
console.log(data)

offset = 120
let xWaffleChart = d3.scaleLinear().domain([0,cols]).range([offset,width])
let yWaffleChart = d3.scaleLinear().domain([0,rows]).range([height,0])


polCanvas.append("text")
    .attr("x", -20)
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
            .attr("fill", (d) => d.filled ? "#f2a600" : "black")












