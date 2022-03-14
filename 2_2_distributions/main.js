// VARIABLES

  const width = window.innerWidth * .8,
        height = window.innerHeight *.8,
        margin = {top: 20, bottom: 30, left: 30, right: 10},
        radius = 3

//DATA

  d3.json("../data/chocolateratings.json", d3.autoType)
  .then(data => {
    console.log(data)

// SCALES

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.cocoaPercent)])
    .range([margin.left, width - margin.right])

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Rating)])
    .range([height - margin.bottom, margin.top])

const colorScale = d3.scaleOrdinal()
    .domain(["U.S.A.", "Canada"])
    .range(["red", "blue"])

// ELEMENTS

const mySVG = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

mySVG.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(xAxis)

mySVG.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)

// SELECT-JOIN-DRAW

mySVG.selectAll("circle")
    .data(data)
    .join("circle")
// ATTRIBUTES
    .attr("cx", d => xScale(d.cocoaPercent))
    .attr("cy", d => yScale(d.Rating))
    .attr("r", radius)
    .attr("fill", d => colorScale(d.Location))


  });

    