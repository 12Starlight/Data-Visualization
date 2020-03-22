/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

d3.csv('data/ages.csv').then((data) => {
    console.log(data);
});