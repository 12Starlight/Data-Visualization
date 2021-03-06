/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.7 - D3 min, max, and extent
*/

const svg = d3.select('#chart-area')
    .append('svg')
    .attr('width', '400')
    .attr('height', '400')

d3.json('data/buildings.json').then((data) => {
    console.log(data);

    data.forEach((d) => {
        d.height = +d.height;
    });

    const x = d3.scaleBand()
        // needs to be spelled correctly, when hard coded
        // .domain([
        //     'Burj Khalifa', 'Shanghai Tower', 'Abraj Al-Bait Clock Tower',
        //     'Ping An Finance Centre', 'Lotte World Tower', 'One World Trade Center',
        //     'Guangzhou CTF Finance Center'
        // ])
        
        // used .map to create an array of values
        .domain(data.map((d) => {
            return d.name; 
        }))
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
            return d.height; 
        })])
        .range([0, 400]);

    const rects = svg.selectAll('rect')
        .data(data)
        .enter()
            .append('rect')
            .attr('y', 20)
            .attr('x', (d) => {
                return x(d.name);
            })
            .attr('width', x.bandwidth)
            .attr('height', (d) => {
                return y(d.height);
            })
            .attr('fill', 'grey');
})