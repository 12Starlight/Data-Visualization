/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.9 - Margins and groups
*/

const margin = { left: 100, right: 10, top: 10, bottom: 100 };

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


const svg = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

d3.json('data/buildings.json').then((data) => {
    console.log(data);

    data.forEach((d) => {
        return d.height = +d.height; 
    })

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

    var rects = g.selectAll('rect')
        .data(data)
    
    rects.enter()
        .append('rect')
        .attr('y', 0)
        .attr('x', (d) => {
            return x(d.name);
        })
        .attr('width', x.bandwidth)
        .attr('height', (d) => {
            return y(d.height);
        })
        .attr('fill', 'grey')
})