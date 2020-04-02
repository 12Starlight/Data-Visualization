/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.2 - File Separation
*/

// Build Margin
const margin = { left: 80, right: 100, top: 50, bottom: 100 }

// Incorporate Margin
const height = 500 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

// Build SVG, Group SVG
const svg = d3.select('#chart-area').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left +
        ', ' + margin.top + ')');

// Build Transition
let t = () => {
    return d3.transition().duration(1000);
}

// For tooltip
let bisectDate = d3.bisector((d) => {
    return d.date;
}).left;

// Add line to chart for the first time
g.append('path')
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', '3px');

// X-Axis Label
let xLabel = g.append('text')
    .attr('class', 'x axisLabel')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('font-weight', '500')
    .attr('fill', '#5D6971')
    .text('Time');

// Y-Axis Label
let yLabel = g.append('text')
    .attr('class', 'y axisLabel')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -170)
    .attr('font-size', '20px')
    .attr('font-weight', '500')
    .style('text-anchor', 'middle')
    .attr('fill', '#5D6971')
    .text('Price (USD)');

// Scales
const x = d3.scaleTime().range([0, width])
const y = d3.scaleLinear().range([height, 0]);

// X Axis generator
const xAxisCall = d3.axisBottom()
    .ticks(4)

// Y Axis generator
const yAxisCall = d3.axisLeft()


// Axis groups X
const xAxis = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');
// Axis groups y
const yAxis = g.append('g')
    .attr('class', 'y axis')


// Build Update Function    
const update = () => {
    // Filter data based on selections
    let coin = $('#coin-select').val(),
        yValue = $('#var-select').val(),
        sliderValues = $('#date-slider').slider('values');
    let dataTimeFiltered = filteredData[coin].filter((d) => {
        return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]))
    });

    // Update Scales
    x.domain(d3.extent(dataTimeFiltered, (d) => d.date));
    y.domain([d3.min(dataTimeFiltered, (d) => d[yValue]),
    d3.max(dataTimeFiltered, (d) => d[yValue])]);

    // Fix for format values
    let formatSi = d3.format('.2s');

    let formatAbbreviation = (x) => {
        let s = formatSi(x);
        switch (s[s.length - 1]) {
            case 'G': return s.slice(0, -1) + 'B';
            case 'k': return s.slice(0, -1) + 'K';
        }

        return s;
    }

    // Update Axes
    xAxisCall.scale(x);
    xAxis.transition(t()).call(xAxisCall);
    yAxisCall.scale(y);
    yAxis.transition(t()).call(yAxisCall.tickFormat(formatAbbreviation));

    // Clear Old ToolTips
    d3.select('.focus').remove();
    d3.select('.overlay').remove();

    // ToolTip Code
    var focus = g.append('g')
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
        .attr('r', 5);
    focus.append('text')
        .attr('x', 15)
        .attr('dy', '.31em');
    svg.append('rect')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => {
            focus.style('display', null);
        })
        .on('mouseout', () => {
            focus.style('display', 'none');
        })
        .on('mousemove', mousemove);


    // Create Mouse Move
    function mousemove() {
        let x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(dataTimeFiltered, x0, 1),
            d0 = dataTimeFiltered[i - 1],
            d1 = dataTimeFiltered[i],
            d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;
        focus.attr('transform', 'translate(' + x(d.date) + ', ' + y(d[yValue]) + ')');
        focus.select('text').text(() => d3.format('$,')(d[yValue].toFixed(2)));
        focus.select('.x-hover-line').attr('y2', height - y(d[yValue]));
        focus.select('.y-hover-line').attr('x2', -x(d.date));

    }

    // Path Generator
    line = d3.line()
        .x((d) => x(d.date))
        .y((d) => y(d[yValue]));

    // Update Our Line Path
    g.select('.line')
        .transition(t)
        .attr('d', line(dataTimeFiltered));

    // Update y-axis label
    let newText = (yValue === 'price_usd') ? 'Price (USD)' :
        ((yValue === 'market_cap') ? 'Market Capitalization (USD)' : '24 Hour Trading Volume (USD)')
    yLabel.text(newText);
}


















// var margin = { left:80, right:100, top:50, bottom:100 },
//     height = 500 - margin.top - margin.bottom, 
//     width = 800 - margin.left - margin.right;

// var svg = d3.select("#chart-area")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// var g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + 
//             ", " + margin.top + ")");

// var t = function(){ return d3.transition().duration(1000); }

// var bisectDate = d3.bisector(function(d) { return d.date; }).left;

// // Add the line for the first time
// g.append("path")
//     .attr("class", "line")
//     .attr("fill", "none")
//     .attr("stroke", "grey")
//     .attr("stroke-width", "3px");

// // Labels
// var xLabel = g.append("text")
//     .attr("class", "x axisLabel")
//     .attr("y", height + 50)
//     .attr("x", width / 2)
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .text("Time");
// var yLabel = g.append("text")
//     .attr("class", "y axisLabel")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -60)
//     .attr("x", -170)
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .text("Price (USD)")

// // Scales
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// // X-axis
// var xAxisCall = d3.axisBottom()
//     .ticks(4);
// var xAxis = g.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height +")");

// // Y-axis
// var yAxisCall = d3.axisLeft()
// var yAxis = g.append("g")
//     .attr("class", "y axis");

// function update() {
//     // Filter data based on selections
//     var coin = $("#coin-select").val(),
//         yValue = $("#var-select").val(),
//         sliderValues = $("#date-slider").slider("values");
//     var dataTimeFiltered = filteredData[coin].filter(function(d){
//         return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]))
//     });

//     // Update scales
//     x.domain(d3.extent(dataTimeFiltered, function(d){ return d.date; }));
//     y.domain([d3.min(dataTimeFiltered, function(d){ return d[yValue]; }) / 1.005, 
//         d3.max(dataTimeFiltered, function(d){ return d[yValue]; }) * 1.005]);

//     // Fix for format values
//     var formatSi = d3.format(".2s");
//     function formatAbbreviation(x) {
//       var s = formatSi(x);
//       switch (s[s.length - 1]) {
//         case "G": return s.slice(0, -1) + "B";
//         case "k": return s.slice(0, -1) + "K";
//       }
//       return s;
//     }

//     // Update axes
//     xAxisCall.scale(x);
//     xAxis.transition(t()).call(xAxisCall);
//     yAxisCall.scale(y);
//     yAxis.transition(t()).call(yAxisCall.tickFormat(formatAbbreviation));

//     // Clear old tooltips
//     d3.select(".focus").remove();
//     d3.select(".overlay").remove();

//     // Tooltip code
//     var focus = g.append("g")
//         .attr("class", "focus")
//         .style("display", "none");
//     focus.append("line")
//         .attr("class", "x-hover-line hover-line")
//         .attr("y1", 0)
//         .attr("y2", height);
//     focus.append("line")
//         .attr("class", "y-hover-line hover-line")
//         .attr("x1", 0)
//         .attr("x2", width);
//     focus.append("circle")
//         .attr("r", 5);
//     focus.append("text")
//         .attr("x", 15)
//         .attr("dy", ".31em");
//     svg.append("rect")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//         .attr("class", "overlay")
//         .attr("width", width)
//         .attr("height", height)
//         .on("mouseover", function() { focus.style("display", null); })
//         .on("mouseout", function() { focus.style("display", "none"); })
//         .on("mousemove", mousemove);
        
//     function mousemove() {
//         var x0 = x.invert(d3.mouse(this)[0]),
//             i = bisectDate(dataTimeFiltered, x0, 1),
//             d0 = dataTimeFiltered[i - 1],
//             d1 = dataTimeFiltered[i],
//             d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;
//         focus.attr("transform", "translate(" + x(d.date) + "," + y(d[yValue]) + ")");
//         focus.select("text").text(function() { return d3.format("$,")(d[yValue].toFixed(2)); });
//         focus.select(".x-hover-line").attr("y2", height - y(d[yValue]));
//         focus.select(".y-hover-line").attr("x2", -x(d.date));
//     }

//     // Path generator
//     line = d3.line()
//         .x(function(d){ return x(d.date); })
//         .y(function(d){ return y(d[yValue]); });

//     // Update our line path
//     g.select(".line")
//         .transition(t)
//         .attr("d", line(dataTimeFiltered));

//     // Update y-axis label
//     var newText = (yValue == "price_usd") ? "Price (USD)" :
//         ((yValue == "market_cap") ?  "Market Capitalization (USD)" : "24 Hour Trading Volume (USD)")
//     yLabel.text(newText);
// }
