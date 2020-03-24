/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.6 - Band scales
*/

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json('data/buildings.json').then((data) => {
    console.log(data);

    data.forEach(d => {
        d.height = +d.height 
    });

    const x = d3.scaleBand() 
        .domain(
            ['Burj Khalifa', 
            'Shanghai Tower', 
            'Abraj Al-Bait Clock Tower', 
            'Ping An Finance Center',
            'Lotte World Tower'])
        .range([0, 400])
        .paddingInner(0.2)
        .paddingOuter(0.2); 

    console.log(x('Burj Khalifa'))

    const y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    const rects = svg.selectAll('rect')
        .data(data)
        .enter()
            .append('rect')
            .attr('y', 20)
            .attr('x', (d, i) => {
                return i * 60;
            })
            .attr('width', 40)
            .attr('height', (d) => {
                return y(d.height);
            })
            .attr('fill', (d) => {
                return 'grey';
            });
})