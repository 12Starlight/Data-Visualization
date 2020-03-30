/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.6 - Making our chart dynamic
*/

// Build Margin
const margin = { left: 80, right: 20, top: 50, bottom: 100 }

// Incorporate Margin
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Build SVG, Group SVG
const g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// X Group
const xAxisGroup = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')');

// Y Group
const yAxisGroup = g.append('g')
    .attr('class', 'y axis');

// X Scale 
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.2)

// Y Scale
const y = d3.scaleLinear()
    .range([height, 0])

// X Label
g.append('text')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Month')

// Y Label
g.append('text')
    .attr('y', -60)
    .attr('x', -(height / 2))
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('Revenue');

// Retrieve Data
d3.json('data/revenues.json').then((data) => {
    console.log(data);

    // Clean Data
    data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    d3.interval(() => {
        update(data)
    }, 1000);

    // Run the vis for the first time, corrects delay
    update(data);
});