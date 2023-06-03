
//console.log("inside globalmap_script.js")
var format = d3.format(",");

// Set tooltips

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
    //console.log("insdie:", d.Pls)
    //console.log("d.properties.name:", d.properties.name)
    //console.log("d.properties.name:", d.population)
    var tmpString = "<strong>Country/Region: </strong><span class='details'>" + d.properties.name + "<br></span>"
        + "<strong>Count: </strong><span class='details'>" + format(d.population)
        + "<br><strong>Top3 popular languages: </strong><span class='details'>";
    for (let tmp_i = 0; tmp_i < d.Pls.length; tmp_i++) {
        const innerArray = d.Pls[tmp_i];
        if (innerArray[0] == null) break;

        //tmpString = tmpString + `<br><a href='#tableId${innerArray[0]}' class='scroll-link2' data-section='tableId${innerArray[0]}'>Rank:${innerArray[2]} Name:${innerArray[1]}</a>`;
        tmpString = tmpString + `<br><a onmouseover="handleMouseOver_global_map(event, ${innerArray[2]})" onmouseout="handleMouseOut_global_map(event)">Rank:${innerArray[2]} Name:${innerArray[1]}</a>`;

    }

    return tmpString


    })





function handleMouseOver_global_map(event,rank) {
    console.log("Mouseover event fired on text: " + event.target.innerText);
    console.log("Rank: " + rank);
    console.log(jsonDetailData[rank]);
    // Find the element where you want to display the content
    var contentDisplay = document.getElementById("content-display_globalmap");
    
    // Prepare the content to be displayed based on the input 'e'
    var content = "<strong class='PlCloudDetailStyleName'>Title: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].title + "<br></span>"
    +"<strong class='PlCloudDetailStyleName'>Country: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].country + "<br></span>" 
    +"<strong class='PlCloudDetailStyleName'>Appeared: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].appeared + "<br></span>"
    +"<strong class='PlCloudDetailStyleName'>Rank: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].rank + "<br></span>"
    +"<strong class='PlCloudDetailStyleName'>Number of Users: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].numberOfUsers + "<br></span>"
    +"<strong class='PlCloudDetailStyleName'>Type: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[rank].type + "<br></span>";
    // Update the content display element with the new content
    contentDisplay.innerHTML = content;
            
    contentDisplay.classList.add('PlCloudDetailStyle');
}

function handleMouseOut_global_map(event) {
    // Find the element where you want to remove the displayed content
    var contentDisplay = document.getElementById("content-display_globalmap");

    // Clear the content of the content-display element
    contentDisplay.innerHTML = "";
    contentDisplay.classList.remove('PlCloudDetailStyle');
}



function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}




document.addEventListener('click', function (e) {
    if (e.target.classList.contains('scroll-link2')) {
    e.preventDefault();

    var targetSectionId = e.target.getAttribute('data-section');
    var targetSection = document.getElementById(targetSectionId);

    if (targetSection) {
        var targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / 2 + targetSection.clientHeight / 2;

        window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
        });

        // Add the flash class to the target section
        targetSection.classList.add('flash');

        // Remove the flash class after the animation is completed
        setTimeout(function () {
        targetSection.classList.remove('flash');
        }, 3000); // The duration of the flash animation in milliseconds
    }
    }
});
var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([2, 5, 10, 20, 50, 100, 500, 1000, 1500, 2000])
    //.domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = d3.select(".graph-center_globalmap")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "graph-center_globalmap") // Add this line to apply the CSS class
    .append('g')
    .attr('class', 'map');



var projection = d3.geoMercator()
    .scale(130)
    .translate([width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

// Add legend
function createLegend(svg, color) {
    // Define the gradient
    var gradientId = "legendGradient";
    var gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

    var stops = color.domain().map(function (d, i) {
    return {
        offset: 100 * i / (color.domain().length - 1) + "%",
        color: color(d)
    };
    });

    gradient.selectAll("stop")
    .data(stops)
    .enter()
    .append("stop")
    .attr("offset", function (d) { return d.offset; })
    .attr("stop-color", function (d) { return d.color; });

    // Add a group for the legend
    var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width *0.92) + "," + (height*0.35) + ")");
    // Create a rectangle with the gradient
    legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 200)
    .style("fill", "url(#" + gradientId + ")");

    // Add labels for the color thresholds
    var legendLabels = color.domain().reverse().map(function (d, i) {
    return {
        x: 30,
        y: i * 200 / (color.domain().length - 1),
        text: d
    };
    });

    legend.selectAll("text")
    .data(legendLabels)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y; })
    .text(function (d) { return d.text; })
    .style("fill", "white");
    
}


createLegend(svg, color);

queue()
    .defer(d3.json, "./data/world_countries.json")
    .defer(d3.json, "./data/world_count.json")
    .await(ready);

function ready(error, data, population) {
    var populationById = {};
    var topPlsById = {};
    var tooltipFixed = false;

    population.forEach(function (d) {
    //console.log("tops:",d.top_pls)
    populationById[d.id] = +d.population;
    topPlsById[d.id] = d.top_pls;
    });
    //console.log("sudanfor",populationById["SSD"])
    data.features.forEach(function (d) {
    //console.log("dname1", d.properties, d.id)
    d.population = populationById[d.id];
    d.Pls = topPlsById[d.id]
    //console.log("dname", d.properties)
    //console.log("dnamepopu", d.population)
    });

    svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function (d) { return color(populationById[d.id]); })
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity", 0.8)
    // tooltips
    .style("stroke", "white")
    .style('stroke-width', 0.3)
    .on('mouseover', function (d) {
        if (!tooltipFixed) {
        tip.show(d);

        d3.select(this)
            .style("opacity", 1)
            .style("stroke", "white")
            .style("stroke-width", 3);
        }

    })
    .on('mouseout', function (d) {
        if (!tooltipFixed) {
        tip.hide(d);

        d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style("stroke-width", 0.3);
        }

    }).on('click', function (d) {
        if (tooltipFixed) {
        tip.hide(d);

        d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style("stroke-width", 0.3);
        } else {
        tip.show(d);
        d3.select(this)
            .style("opacity", 1)
            .style("stroke", "white")
            .style("stroke-width", 3);
        }
        tooltipFixed = !tooltipFixed;
    })
    ;

    svg.append("path")
    .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path);
}
