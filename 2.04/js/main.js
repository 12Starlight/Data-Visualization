const svg = d3.select('#chart-area').append('svg')
  .attr('width', 400)
  .attr('height', 400);

const circle = svg.append('circle')
  .attr('cx', 100)
  .attr('cy', 250)
  .attr('r', 70)
  .attr('fill', 'gray')