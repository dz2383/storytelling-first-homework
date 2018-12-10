import * as d3 from 'd3'
;(function() {
  var height = 200
  var width = 400

  var svg = d3
    .select('#chart5')
    .select('svg')
    .attr('height', height)
    .attr('width', width)

  var datapoints = [
    { hotdogs: 10, hamburgers: 10, animal: 'dog', name: 'Stevie' },
    { hotdogs: 3, hamburgers: 3, animal: 'cat', name: 'Nicholas' },
    { hotdogs: 2, hamburgers: 2, animal: 'cat', name: 'Bubbletree' },
    { hotdogs: 10, hamburgers: 3, animal: 'cow', name: 'Particle' },
    { hotdogs: 7, hamburgers: 5, animal: 'dog', name: 'Jumpup' },
    { hotdogs: 4, hamburgers: 9, animal: 'dog', name: 'Parlay' },
    { hotdogs: 3, hamburgers: 1, animal: 'cat', name: 'Hio' }
  ]

  // Build your scales here

  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var radiusScale = d3
    .scaleSqrt()
    .domain([0, 10])
    .range([0, 30])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['dog', 'cat', 'cow'])
    .range(['#fc8d59', '#2ca25f', '#91bfdb'])
  // Add your circles and style them here
  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', function(d) {
      return radiusScale(d.hotdogs)
    })
    .attr('fill', function(d) {
      return colorScale(d.animal)
    })
    .attr('cx', function(d) {
      return xPositionScale(d.hamburgers)
    })
    .attr('cy', height / 2)
    .attr('opacity', 0.5)
})()
