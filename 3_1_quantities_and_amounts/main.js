/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7,
  height = window.innerHeight * .7,
  margin = { top: 20, bottom: 60, left: 60, right: 20},
  formatDate = d3.timeFormat("%Y");

// // since we use our scales in multiple functions, they need global scope
let svg, xScale, yScale, colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedCategory: "up9Units"
};

/* LOAD DATA */
d3.json("../data/CompostingPickups.json", d => {
  // use custom initializer to reformat the data the way we want it
  return {
    Year: new Date(+d.Year),
    Type: d.Type,
    Count: d.Count
  };
}).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.Year))
    // COMMENT: may want to add margins accommdations here too
    .range([margin.left, width - margin.right])
    .paddingInner(.2)

  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.Count)])
    .range([height-margin.bottom, margin.top])
    
  colorScale = d3.scaleOrdinal()
    .domain(["up9Units", "10upUnits", "schools"])
    .range(["red", "orange", "blue"])

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)

  const selectElement = d3.select("#dropdown")
  selectElement
    .selectAll("option")
    .data([
      {key: "up9Units", label: "Buildings with 1-9 Units"},
      {key: "10upUnits", label: "Buildings with 10+ Units"},
      {key: "schools", label: "Schools"}])
    .join("option")
    .attr("value", d => d.key)
    .text(d => d.label)
  
  selectElement.on("change", event => {
    console.log("DROPDOWN CALLBACK: new value is", event.target.value);
    state.selectedCategory = event.target.value;
    console.log("NEW STATE:", state);
    draw();
  });

  mySvg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
  const xAxisGroup = mySvg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height-margin.bottom})`)
    .call(xAxis)

  const yAxisGroup = mySvg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(yAxis)

  mySvg.append("text")
    .attr("class", 'axis-title')
    .attr("x", width/2)
    .attr("y", height - 20)
    .attr("writing-mode", "horizontal-lr")
    .attr("text-anchor", "middle")
    .text("Year")
  
  mySvg.append("text")
    .attr("class", 'axis-title')
    .attr("x", 5)
    .attr("y", (height - margin.bottom)/2)
    .attr("writing-mode", "vertical-rl")
    .attr("text-anchor", "middle")
    .text("Number of Participants")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {


const filteredData = state.data
  .filter(d => state.selectedCategory === d.Type)

const bars = mySvg
  .selectAll("rect")
  .data(filteredData)
    .join("rect")
    .attr("height", d=> height-margin.bottom - yScale(d.Count))
    .attr("width", xScale.bandwidth)
    .attr("x", d=> xScale(d.Year))
    .attr("y", d=> yScale(d.Count))
    .attr("fill", d=> colorScale(d.Type));

    
     /* enter => enter.append("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(state.data, d.Count))
      .attr("fill", d => colorScale(state.data, d.Type))
      .attr("x", 0)
      .attr("y", 0)
      .call(sel => sel.transition()
        .duration(250)
        .attr("x", d=> xScale(state.data, d.Year))
        ),

      update => update
        .call(sel => sel
          .transition()
          .duration(250)
        ),

      exit => exit
          .call(sel => sel
            .attr("opacity", 1)
            .transition()
            .duration(250)
            .attr("opacity", 0)
            .remove()
          )
    ); */



};