/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// Build Margin
const margin = { left: 50, right: 20, top: 10, bottom: 30 };

// Incorporate Margin
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG, Group SVG
const g = d3.select('#chart-area').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  // group to translate or move svg according to margins
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')  

// X Label
g.append('text')

// Y Label
g.append('text')

// Get External Data
d3.json('data/revenues.json').then((data) => {
  console.log(data)

  data.forEach((d) => {
    d.revenue = +d.revenue;
    d.profit = +d.profit; 
  })


})