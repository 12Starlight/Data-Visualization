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

const line = svg.append('line')
  .attr('x1', 20)
  .attr('y1', 70)
  .attr('x2', 100)
  .attr('y2', 350)
  .attr('stroke', 'brown')
  .attr('stroke-width', 5);

const ellipse = svg.append('ellipse')
  .attr('cx', 300)
  .attr('cy', 300)
  .attr('rx', 50)
  .attr('ry', 70)
  .attr('fill', 'yellow')