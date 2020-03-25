/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// Build Margin
const margin = { left: 80, right: 20, top: 10, bottom: 50 };

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
  .attr('class', 'x axis-label')
  .attr('x', width / 2)
  .attr('y', height + 50)
  .attr('font-size', '21px')
  .attr('font-weight', '500')
  .attr('text-anchor', 'middle')
  .text('Month');

// Y Label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', - (height / 2))
  .attr('y', -60)
  .attr('font-size', '21px')
  .attr('font-weight', '500')
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Revenue')

// Get External Data
d3.json('data/revenues.json').then((data) => {
  console.log(data)

  data.forEach((d) => {
    d.revenue = +d.revenue;
    d.profit = +d.profit; 
  })

  // Build x axis
  const x = d3.scaleBand()
    .domain(data.map((d) => {
      return d.month;
    }))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // Build y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => {
      return d.revenue;
    })])
    // reversed coordinates
    .range([height, 0])

  // Build xAxisCall (Axis Generator)
  const xAxisCall = d3.axisBottom(x);
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxisCall)

  // Build yAxisCall (Axis Generator)
  const yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat((d) => {
      return '$' + d; 
    });
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall);

  
  // Create Rectangles Using Data
  const rects = g.selectAll('rect')
    .data(data)

  // Format Rectangles
  rects.enter() 
    .append('rect')
    .attr('y', (d) => {
      // the y axis needs to start at the height
      return y(d.revenue);
    })
    .attr('x', (d) => {
      return x(d.month);
    })
    .attr('width', x.bandwidth)
    .attr('height', (d) => {
      // the bar height needs to be the height difference
      return height - y(d.revenue);
    })
    .attr('fill', 'grey');
})