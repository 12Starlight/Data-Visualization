/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

d3.tsv('data/age.tsv').then((data) => {
    data.forEach((d) => {
        d.age = +d.age; // putting + in front, converts to integer
    })

    const svg = d3.select('#chart-area').append('svg')
        .attr('width', 400)
        .attr('height', 400);

    const circles = svg.selectAll('circle')
        .data(data)

    circles.enter()
        .append('circle')
            .attr('cx', (d, i) => {
                return (i * 50) + 25;
            })
            .attr('cy', 25)
            .attr('r', (d) => {
                console.log(d); 
                return d.age * 2;
            })
            .attr('fill', (d) => {
                if (d.name == 'Tony') {
                    return 'blue'
                } else {
                    return 'red'
                }
            })
}).catch((error) => {
    console.log(error)
});





