/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// Build Margin
const margin = { left: 80, right: 20, top: 50, bottom: 100 };

// Incorporate Margin
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create Boolean Flag
let flag = true;

// Build Transition
const t = d3.transition().duration(750);

// Build SVG, Group SVG
const g = d3.select('#chart-area')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' +  margin.left + ', ' + margin.top + ')');

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
	.text('GDP Per Capita');
	
// Y Label
let yLabel = g.append('text')
	.attr('y', -60)
	.attr('x', -(height / 2))
	.attr('font-size', '20px')
	.attr('text-anchor', 'middle')
	.attr('transform', 'rotate(-90)')
	.text('Life Expectancy')

// Retrieve Data
d3.json("data/data.json").then((data) => {
	console.log(data);

	data.forEach((year) => {
		let newData = year.countries.filter((value) => value === null)
		console.log(yea);
		 
	})
})