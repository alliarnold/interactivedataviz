// VARIABLES

  const width = window.innerWidth * .8;
  const height = window.innerHeight * .8;

// DATA

/* myData = [
  {activity: "running",count: 730},
  {activity: "chasing", count: 279},
  {activity:"climbing", count: 658},
  {activity: "eating", count: 760},
  {activity: "foraging", count: 1435}
] */

d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

//SCALES - SCALE DATA TOT HE SCREEN

const myXScale = d3.scaleBand()
  .domain(data.map( d=> d.activity))
  .range([0, width])

const myYScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .range([height, 0])

// ELEMENTS - APPEND ELEMENTS INTO HTML DIV

const mySvg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// SELECT-DATA JOIN-DRAW - JOIN DATA TO SVG TO GENERATE GRAPHICS

mySvg.selectAll("rect")
  .data(data)
  .join("rect")
//ATTRIBUTES
  .attr("width", myXScale.bandwidth())
  .attr("height", d=> height - myYScale(d.count))
  .attr("x", d=> myXScale(d.activity))
  .attr("y", d=> myYScale(d.count ))


})