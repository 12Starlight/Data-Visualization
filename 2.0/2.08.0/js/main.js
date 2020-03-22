/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json('data/buildings.json').then((data) => {
  data.forEach((d) => {
    d.height = +d.height; 
  })
  
  const svg = d3.select('#chart-area').append('svg')
    .attr('height', 500)
    .attr('width', 500)

  const rects = svg.selectAll('rect')
    .data(data)

  rects.enter() 
    .append('rect')
      .attr('height', (d) => {
        return d.height; 
      })
      .attr('width', 40)
      .attr('x', (d, i) => {
        return (i * 55) + 12;
      })
      .attr('y', 0)
      .attr('fill', 'gray')

}).catch((error) => {
  console.log(error)
})