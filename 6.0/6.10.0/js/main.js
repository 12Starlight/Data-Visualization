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
let parseTime = d3.timeParse('%Y');

// For tooltip
let bisectDate = d3.bisector((d) => { 
        return parseTime(d.date); 
    }).left;

// Scales
const x = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(data, (d) => {
        return d.date; 
    }))

const y = d3.scaleLinear().range([height, 0]);

// X Axis generator
const xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    // .tickFormat(d3.format('yr'));
g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0 ' + height +')')
    .call(xAxisCall); 

// Y Axis generator
const yAxisCall = d3.axisLeft(y)
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
    // .attr('x', width / 2)
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -120)
    .attr('font-size', '20px')
    .attr('font-weight', '500')
    .style('text-anchor', 'end')
    .attr('fill', '#5D6971')
    .text('Price (USD)');

// Line path generator
let line = d3.line()
    .x((d) => { 
        return x(parseTime(d.date)); 
    })
    .y((d) => { 
        return y(d.price_usd); 
    });

d3.json('data/coins.json').then((data) => {
    console.log(data); 

    // Data cleaning
    const keys = Object.keys(data);
    console.log(keys);

    formattedData = keys.map((key) => {

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
    console.log(formattedData[0].map((d) => {
        return d.price_usd; 
    }));

    // Set scale domains
    x.domain(d3.extent(formattedData[0], (d) => { 
        return parseTime(d.date); 
    }));
    y.domain([d3.min(formattedData[0], (d) => { 
        return d.price_usd; 
    }), 
        d3.max(formattedData[0], (d) => { 
            return d.price_usd; 
        })]);

    // Generate axes once scales have been set
    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

    // Add line to chart
    g.append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'grey')
        .attr('stroke-with', '3px')
        .attr('d', line(formattedData[0]));

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
            i = bisectDate(formattedData, x0, 1),
            d0 = formattedData[i - 1],
            d1 = formattedData[i],
            d = x0 - parseTime(d0.date) > parseTime(d1.date) - x0 ? d1 : d0;
        focus.attr('transform', 'translate(' + x(parseTime(d.date)) + ',' + y(d.price_usd) + ')');
        focus.select('text').text(d.price_usd);
        focus.select('.x-hover-line').attr('y2', height - y(d.price_usd));
        focus.select('.y-hover-line').attr('x2', -x(parseTime(d.date)));
    }


    /******************************** Tooltip Code ********************************/

});

