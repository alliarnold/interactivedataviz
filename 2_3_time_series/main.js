// VARIABLES
const width = window.innerWidth,
  height = window.innerHeight,
  margin = 30;

// DATA
d3.csv('../data/populationOverTime.csv', d => {
  return {
    /* property */ year: new Date(+d.Year, 0, 1), /*explaining how to interpret a year month numbers in java go 0 - 11, 0, 1 = Jan 1*/
    /* property */ country: d.Entity,
    /* property */ population: +d.Population
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.year))
      .range([margin, width - margin])

    const yScale = d3.scaleLinear
      .domain(d3.extent(data, d =>  d.population))
      .range([height - margin, margin])

  // CREATE SVG ELEMENT

    const aSVG = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)


  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

    const lineGen = d3.

  // DRAW LINE

});