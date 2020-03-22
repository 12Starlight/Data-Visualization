/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

d3.tsv('data/ages.tsv').then((data) => {
    data.forEach((d) => {
        d.age = +d.age; // putting + in front, converts to integer
    })

    console.log(data);
});





