import * as d3 from 'd3'

(function () {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 40, right: 40, bottom: 40, left: 60 }
  var width = 300 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom

  var svg = d3.select('#chart13')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  const heightScale = d3.scaleBand()
    .range([height, 0])
  const widthScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width])
  const colorScale = d3.scaleOrdinal().range(['#fecc5c', '#fd8d3c', '#e31a1c'])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function (err) {
      console.log('Failed with', err)
    })

  function ready (datapoints) {
    // Add and style your marks here

    var names = datapoints.map(d => { return d.name })
    heightScale.domain(names)

    svg.selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('y', function(d) {
        return heightScale(d.name)
      })
      .attr('height', heightScale.bandwidth())
      .attr('width', function(d) {
        return widthScale(d.hamburgers)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(heightScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)
  }
})()