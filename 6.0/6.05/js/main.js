/*
*    main.js
*    Mastering Data Visualization with D3.js
*    6.5 - Event listeners and handlers in D3
*/

// Build Margin
const margin = { left: 80, right: 20, top: 50, bottom: 100 };

// Incorporate Margin
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create Time Variable
let time = 0;

// Create Interval Variable
let interval; 

// Create formattedData Variable
let formattedData;

// Create Boolean Flag
let flag = true;

// Build Transition
// let t = d3.transition().duration(100); // Why does this break as a global?

// Build SVG, Group SVG
const g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Build Tooltip
const tip = d3.tip().attr('class', 'd3-tip') // Initialize the ToolTip
    .html((d) => {
        let text = "<strong>Country: </strong><span style='color:darkorange;line-height:17px'>" + d.country + "</span><br>";
        text += "<strong>Continent: </strong><span style='color:darkorange;text-transform:capitalize;line-height:17px'>" + d.continent + "</span><br>";
        text += "<strong>Life Expectancy: </strong><span style='color:darkorange;line-height:17px'>" + d3.format('.2f')(d.life_exp) + "</span><br>";
        text += "<strong>GDP Per Capita: </strong><span style='color:darkorange;line-height:17px'>" + d3.format('$,.0f')(d.income) + "</span><br>";
        text += "<strong>Population: </strong><span style='color:darkorange;line-height:17px'>" + d3.format(',.0f')(d.population) + "</span><br>";

        return text;
    });

g.call(tip); // Set context for ToolTip // Needs to be after g is defined
// Add two event listeners in ENTER

// X Scale
const x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([150, 150000]);

// Y Scale
const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);

// Area Scale
const area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);

// Color Scale
const continentColor = d3.scaleOrdinal(d3.schemePastel1);

// X Label
let xLabel = g.append('text')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('GDP Per Capita ($)');

// Y Label
let yLabel = g.append('text')  
    .attr('y', -40)
    .attr('x', -170)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Life Expectancy (Years)');

// Time Label
let timeLabel = g.append('text')
    .attr('y', height -10)
    .attr('x', width - 40)
    .attr('font-size', '40px')
    .attr('opacity', '0.4')
    .attr('text-anchor', 'middle')
    .text('1800');

// X Axis
const xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format('$')); 
g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0 ' + height + ')')
    .call(xAxisCall);

// Y Axis
const yAxisCall = d3.axisLeft(y)
    .tickFormat((d) => +d);
g.append('g')
    .attr('class', 'y axis')
    .call(yAxisCall);

// Build Legend
const continents = ['europe', 'asia', 'americas', 'africa'];

const legend = g.append('g')
    .attr('transform', 'translate(' + (width - 10) + ', ' + (height - 125) + ')');

continents.forEach((continent, i) => {
    const legendRow = legend.append('g')
        .attr('transform', 'translate(0, ' + (i * 20) + ')');

    legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', continentColor(continent));

    legendRow.append('text')
        .attr('x', -10)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .style('text-transform', 'capitalize')
        .text(continent);
});


// Retrieve Data
d3.json('data/data.json').then((data) => {
    console.log(data);

    // Clean data
    formattedData = data.map((year) => {
        return year.countries.filter((country) => {
            let dataExists = (country.income && country.life_exp);
            // console.log(dataExists);
            return dataExists;
        }).map((country) => {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            // console.log(country)
            return country; 
        })
    });

    // First run of the visualization, corrects delay
    update(formattedData[0]);
})

// Build Step Function // Interval Function
const step = () => {
    // At the end of our data, loop back
    time = (time < 214) ? time + 1 : 0;
    update(formattedData[time]);
}

// Build Play/Pause Button
$('#play-button')
    .on('click', function() {
        let button = $(this);

        if (button.text() === 'Play') {
            button.text('Pause');
            interval = setInterval(step, 100);
        } else {
            button.text('Play'); 
            clearInterval(interval)
        } 
    })

// Build Reset Button
$('#reset-button')
    .on('click', function() {
        time = 0;
        update(formattedData[0]);
    })

// Update data based on selection 
$('#continent-select')
    .on('change', () => {
        update(formattedData[time]);
    })

// Build Update Function 
const update = (data) => {
    // Build Transition
    let t = d3.transition().duration(100);

    // Build Continent Filter
    let continent = $('#continent-select').val();

    data = data.filter((d) => {
        if (continent === 'all') {
            return true;
        } else {
            return d.continent === continent;
        }
    })

    // JOIN new data with old element
    const circles = g.selectAll('circle').data(data, (d) => {
        return d.country;
    }); 

    // EXIT new elements not present in new data
    circles.exit()
        .attr('class', 'exit')
        .remove(); 

    // ENTER new elements present in new data
    circles.enter()
        .append('circle')
        .attr('class', 'enter')
        .attr('fill', (d) => {
            return continentColor(d.continent);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .merge(circles)
        .transition(t)
            .attr('cy', (d) => {
                return y(d.life_exp);
            })
            .attr('cx', (d) => {
                return x(d.income);
            })
            .attr('r', (d) => {
                return Math.sqrt(area(d.population) / Math.PI);
            })

    // Update the time label
    timeLabel.text(+(time + 1800));         
}
