/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.10 - Axes and labels
*/

const margin = { left: 100, right: 10, top: 10, bottom: 150 }

const width = 600 - margin.left - margin.right; 
const height = 400 - margin.top - margin.bottom; 


const g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// X Label
g.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height + 140)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('The World\'s Tallest Buildings')


d3.json('data/buildings.json').then((data) => {
    console.log(data);

    data.forEach((d) => {
        d.height = +d.height;
    });

    const x = d3.scaleBand()
        .domain(data.map((d) => {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
            return d.height; 
        })])
        .range([0, height]);

    const xAxisCall = d3.axisBottom(x);
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(xAxisCall)
            .selectAll('text')
                .attr('y', '10')
                .attr('x', '-5')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-40)')

    const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {
            return d + 'm';
        });
        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxisCall);

    
    const rects = g.selectAll('rect')
        .data(data)
})