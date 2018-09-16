import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 60
  }
  var width = 500 - margin.left - margin.right
  var height = 300 - margin.top - margin.bottom

  var svg = d3
    .select('#chart14')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  const widthScale = d3.scaleBand().rangeRound([0, width])

  const heightScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, height])

  const yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  const colorScale = d3.scaleOrdinal().range(['#fecc5c', '#fd8d3c', '#e31a1c'])

  d3.csv(require('./eating-data.csv')
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    // Add and style your marks here

    var names = datapoints.map(function(d) {
      return d.name
    })
    widthScale.domain(names)

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return widthScale(d.name)
      })
      .attr('width', widthScale.bandwidth())
      .attr('height', function(d) {
        return heightScale(d.hamburgers)
      })
      .attr('y', function(d) {
        return yPositionScale(d.hamburgers)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    // axes here
    var yAxis = d3.axisLeft(heightScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
