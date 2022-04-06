// VARIABLES

  const width = window.innerWidth * .8;
  const height = window.innerHeight * .8;

// DATA

d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

//SCALES - SCALE DATA TO THE SCREEN

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .range([0, width]);

const yScale = d3.scaleBand()
  .domain(data.map(d => d.activity))
  .range([0, height])
  .paddingInner(.2)
  .paddingOuter(.3);

// ELEMENTS - APPEND ELEMENTS INTO HTML DIV

const mySvg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// SELECT-DATA JOIN-DRAW - JOIN DATA TO SVG TO GENERATE GRAPHICS

mySvg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("width", d => xScale(d.count))
  .attr("height", yScale.bandwidth())
  .attr("x", 0)
  .attr("y", d=> yScale(d.activity))
  .attr("fill", "#42f587")

});