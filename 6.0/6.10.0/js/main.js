/*
*    main.js
*    Mastering Data Visualization with D3.js
*    CoinStats
*/

// Build Margin
const margin = { left:80, right:100, top:50, bottom:100 }

// Incorporate Margin
const height = 500 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

// Create Time Variable
let time = 0; 

// Create Interval Variable
let formattedData;

// Create Boolean Flag
let flat = true;

// Build SVG, Group SVG
const svg = d3.select('#chart-area').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + 
        ', ' + margin.top + ')');

// Time parser for x-scale
const parseTime = d3.timeParse('%Y');

// For tooltip
const bisectDate = d3.bisector((d) => { 
        return d.year; 
    }).left;

// Scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Axis generators
const xAxisCall = d3.axisBottom()
const yAxisCall = d3.axisLeft()
    .ticks(6)
    .tickFormat((d) => { 
        return parseInt(d / 1000) + 'k'; 
    });

// Axis groups X
const xAxis = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');
// Axis groups y
const yAxis = g.append('g')
    .attr('class', 'y axis')
    
// Y-Axis label
yAxis.append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .attr('fill', '#5D6971')
    .text('Population)');

// Line path generator
let line = d3.line()
    .x((d) => { 
        return x(d.year); 
    })
    .y((d) => { 
        return y(d.value); 
    });

d3.json('data/coins.json').then((data) => {
    console.log(data); 

    // Data cleaning
    const keys = Object.keys(data);
    console.log(keys);

    let formattedData = keys.map((key) => {

        return data[key].filter((crypto) => {
            let dataExists = (crypto['24h_vol'] && crypto.date && crypto.market_cap && crypto.price_usd)
            return dataExists;
        }).map((crypto) => {
            crypto['24h_vol'] = +crypto['24h_vol'];
            crypto.market_cap = +crypto.market_cap;
            crypto.price_usd = +crypto.price_usd; 
            
            return crypto; 
        })
    })

    console.log(formattedData); 

    // Set scale domains
    x.domain(d3.extent(data, (d) => { 
        return d.year; 
    }));
    y.domain([d3.min(data, (d) => { 
        return d.value; 
    }) / 1.005, 
        d3.max(data, (d) => { 
            return d.value; 
        }) * 1.005]);

    // Generate axes once scales have been set
    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

    // Add line to chart
    g.append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'grey')
        .attr('stroke-with', '3px')
        .attr('d', line(data));

    /******************************** Tooltip Code ********************************/

    const focus = g.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    focus.append('line')
        .attr('class', 'x-hover-line hover-line')
        .attr('y1', 0)
        .attr('y2', height);

    focus.append('line')
        .attr('class', 'y-hover-line hover-line')
        .attr('x1', 0)
        .attr('x2', width);

    focus.append('circle')
        .attr('r', 7.5);

    focus.append('text')
        .attr('x', 15)
        .attr('dy', '.31em');

    g.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => focus.style('display', 'none'))
        .on('mousemove', mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr('transform', 'translate(' + x(d.year) + ',' + y(d.value) + ')');
        focus.select('text').text(d.value);
        focus.select('.x-hover-line').attr('y2', height - y(d.value));
        focus.select('.y-hover-line').attr('x2', -x(d.year));
    }


    /******************************** Tooltip Code ********************************/

});

