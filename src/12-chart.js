import * as d3 from 'd3'

(function () {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 40, right: 50, bottom: 50, left: 40 }
  var width = 400 - margin.left - margin.right
  var height = 200 - margin.top - margin.bottom

  var svg = d3.select('#chart12')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  const xPositionScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width])
  const colorScale = d3.scaleOrdinal()
    .domain(['dog', 'cat', 'cow'])
    .range(['#fc8d59', '#2ca25f', '#91bfdb'])
  const radiusScale = d3.scaleSqrt()
    .domain([0, 10])
    .range([0, 50])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function (err) {
      console.log('Failed with', err)
    })

  function ready (datapoints) {
    // Add and style your marks here
    svg.selectAll('circle')
      .data(datapoints)
      .enter().append('circle')
      .attr('cy', height / 2)
      .attr('cx', d => {
        return xPositionScale(d.hamburgers)
      })
      .attr('fill', d => {
        return colorScale(d.animal)
      })
      .attr('r', d => {
        return radiusScale(d.hotdogs)
      })
      .attr('opacity', 0.5)

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()