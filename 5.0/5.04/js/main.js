/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.4 - The D3 update pattern
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
    .padding(0.2);

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


// Build Update
const update = (data) => {
    x.domain(data.map((d) => d.month));
    y.domain([0, d3.max(data, (d) => d.revenue)]);

    // X Axis
    const xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);
 
    // Y Axis
    const yAxisCall = d3.axisLeft(y) 
        .tickFormat((d) => '$' + d)
    yAxisGroup.call(yAxisCall);

    
    // Bars // JOIN new data with old elements
    const rects = g.selectAll('rect')
        .data(data)

    // EXIT old elements not present in new data
    rects.exit().remove(); 

    // UPDATE old elements present in new data 
    rects
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
    
    // ENTER new elements present in new data 
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
            .attr('fill', 'grey');
        
    console.log(rects); 
}