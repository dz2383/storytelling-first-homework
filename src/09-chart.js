import * as d3 from 'd3'
;(function() {
  // DO NOT EDIT ANYTHING IN THIS FILE
  d3.csv(require('./fake-data.csv'))
    .then(ready)
    

  var width = 400

  var height = 100

  var svg = d3
    .select('#chart9')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'red')

  // DO NOT EDIT ANYTHING IN THIS FILE
  function ready(datapoints) {
    // DO NOT EDIT ANYTHING IN THIS FILE
    svg.style('background', 'green')
  }
})()
