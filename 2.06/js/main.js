/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

const data = [25, 20, 10, 12, 15];

const svg = d3.select('#chart-area').append('svg')
    .attr('width', 400)
    .attr('height', 400);

const circles = svg.selectAll('circle')
    .data(data)

circles.enter()
    .append('circle')
        .attr('cx', (d, i) => {
            console.log('Item: ' + d, 'Index: ' + i);
        })
        .attr('cy', 25)
        .attr('r', (d) => {
            console.log('Item: ' + d);
        })
        .attr('fill', 'red')