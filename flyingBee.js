

//Visualization of flying bee on front page


var margin = {top:0, right:10, bottom: 40, left: 20},
width = document.getElementById("frontpage").offsetWidth  - margin.left - margin.right,
height = document.getElementById("frontpage").offsetHeight - margin.top - margin.bottom;



const svg = d3.select("#frontpage").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("position", "absolute") 



const bee = svg.append("image")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", width / 20)
  .attr("height", height / 20)
  .attr("xlink:href", "assets/bee.svg")



function getRotationAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}


function flyBee() {
  const newX = Math.random() * (width * 0.7);
  const newY = Math.random() * (height * 0.7);

  const angle = getRotationAngle(parseFloat(bee.attr("x")), parseFloat(bee.attr("y")), newX, newY);


  bee.transition()
    .duration(2000) 
    .ease(d3.easeLinear)
    .attr("x", newX)
    .attr("y", newY)
    .attr("transform", `rotate(${angle + 90}, ${newX + 15}, ${newY + 15})`) 
    .on("end", flyBee); 
}


flyBee();
