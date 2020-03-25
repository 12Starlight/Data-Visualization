/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

// Build Margin
const margin = { left: 80, right: 20, top: 50, bottom: 100 };


// Incorporated Margin
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom; 

// Build SVG, Group SVG
const g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// X Label
g.append('text')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Month');

// Y Label
g.append('text')
    .attr('y', -60)
    .attr('x', -(height / 2))
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Revenue');

// Retrieve Data
d3.json('data/revenues.json').then((data) => {
    console.log(data);

    // Clean data
    data.forEach((d) => {
        d.revenue = +d.revenue;
    });

    // X Scale
    const x = d3.scaleBand()
        .domain(data.map((d) => {
            return d.month;
        }))
        .range([0, width])
        .padding(0.2);

    // Y Scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
            return d.revenue; 
        })])
        .range([height, 0])

    // X Axis 
    const xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxisCall);

    // Y Axis
    const yAxisCall = d3.axisLeft(y)
        .tickFormat((d) => {
            return '$' + d;
        })
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxisCall);

    // Bars
    const rects = g.selectAll('rect')
        .data(data)

    rects.enter()
        .append('rect')
        .attr('y', (d) => {
            return y(d.revenue);
        })
        .attr('x', (d) => {
            return x(d.month);
        })
        .attr('height', (d) => {
            return height - y(d.revenue);
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')

    d3.interval(() => {
        console.log('Hello World! I Can Learn D3');
    }, 1000);
});