/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg = d3.select('#chart-area').append('svg')
  .attr('width', 500)
  .attr('height', 400)

const rect = svg.append('rect')
  .attr('x', 10)
  .attr('y', 10)
  .attr('height', 100)
  .attr('width', 200)
  .attr('fill', 'blue');

const elipse = svg.append('elipse')
  .attr('ey', 200)
  .attr('ex', 200)
  .attr('height', 100)
  .attr('width', 100)
  .attr('fill', 'red') 