const nodesDataFile = './data/nodes_total.json';
      const edgesDataFile = './data/edges_total.json';
      // Generate a mock dataset for the network graph
      var nodes_data;
      var links_data;
      var types = ['pl', 'queryLanguage', 'textMarkup', 'os', 'dataNotation',
        'stylesheetLanguage', 'assembly', 'protocol', 'library', 'schema',
        'editor', 'application', 'framework',
        'hardwareDescriptionLanguage', 'contractLanguage',
        'characterEncoding', 'cloud', 'template', 'grammarLanguage',
        'xmlFormat', 'wikiMarkup'];

      d3.queue()
        .defer(d3.json, nodesDataFile)
        .defer(d3.json, edgesDataFile)
        .await((error, nodesData, edgesData) => {
          if (error) throw error;
          nodes_data = nodesData;
          links_data = edgesData;
          initNetworkGraph(nodesData, edgesData);
        });

      function initNetworkGraph(nodesData, edgesData) {
        // Set the dimensions and
        // margins of the graph
        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
          width = 960 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

        var zoom = d3.zoom()
          .scaleExtent([0.1, 10]) // 设置缩放的最小和最大比例
          .on("zoom", zoomed); // 当缩放发生时，调用名为 "zoomed" 的函数

        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        function genrateColor(d){
          var baseColor = colorScale(d.type);
          return d3.interpolateRgb(baseColor, "#fff")(0.5);
        }

        var tip = d3.tip()
          .attr("class", "d3-tip")
          .offset([-10, 0])
          .html(function (d) {
            return "<strong>Title:</strong> <span style='color:white'>" + d.title + "</span><br/>" +
              "<strong>Country:</strong> <span style='color:white'>" + d.country + "</span><br/>" +
              "<strong>Appeared:</strong> <span style='color:white'>" + d.appeared + "</span><br/>" + 
              "<strong>Rank:</strong> <span style='color:white'>" + d.rank + "</span><br/>" +
              "<strong>numberOfUsers:</strong> <span style='color:white'>" + d.numberOfUsers + "</span><br/>" +
              "<strong>Type:</strong> <span style='color:" + colorScale(d.type) + "'>" + d.type + "</span>";
          });

        
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

        // Initialize the SVG
        var svg = d3.select(".graph-center_network").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "graph-center_network") // Add this line to apply the CSS class
          .call(zoom)
          .call(tip)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var legend = svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(" + (width - 100) + "," + (height - 550) + ")");
          
        // Initialize the force layout
        var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function (d) { return d.title; }).distance(100))
          .force("charge", d3.forceManyBody().strength(-5))
          .force("center", d3.forceCenter(width / 2, height / 2));

        // Create the links
        var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links_data)
          .enter().append("line")
          .attr("stroke", "#999") // Add this line to set the stroke color
          .attr("stroke-width", function (d) { return Math.sqrt(1); });

        // Create the nodes
        var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes_data)
          .enter().append("circle")
          .attr("r", 10)
          .attr("fill", function (d) { return genrateColor(d); })
          .on('click', function (d) {
            window.open("#tableId" + d.title, '_self'); // Add this line to make the node clickable
          })
          .on('mouseover', function(d){
            //tip.show(d, d3.event.target);
            d3.select(this).attr("fill", colorScale(d.type));
            console.log("click network: ",d);
            var contentDisplay = document.getElementById("content-display_network");
    
            // Prepare the content to be displayed based on the input 'e'
            var content = "<strong class='PlCloudDetailStyleName'>Title: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[d.rank].title + "<br></span>"
            +"<strong class='PlCloudDetailStyleName'>Country: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[d.rank].country + "<br></span>" 
            +"<strong class='PlCloudDetailStyleName'>Appeared: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[d.rank].appeared + "<br></span>"
            +"<strong class='PlCloudDetailStyleName'>Rank: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[d.rank].rank + "<br></span>"
            +"<strong class='PlCloudDetailStyleName'>Number of Users: </strong><span class='PlCloudDetailStyleVal'>" + jsonDetailData[d.rank].numberOfUsers + "<br></span>"
            +"<strong class='PlCloudDetailStyleName'>Type: </strong><span class='PlCloudDetailStyleVal' style='color:"+ colorScale(d.type) + "'>" + jsonDetailData[d.rank].type + "<br></span>";
            // Update the content display element with the new content
            contentDisplay.innerHTML = content;
                    
            contentDisplay.classList.add('PlCloudDetailStyle');
          })
          .on('mouseout', function(d){
            //tip.hide(d, d3.event.target);
            d3.select(this).attr("fill", genrateColor(d));
            var contentDisplay = document.getElementById("content-display_network");

            // Clear the content of the content-display element
            contentDisplay.innerHTML = "";
            contentDisplay.classList.remove('PlCloudDetailStyle');
          })
          .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

        types.forEach(function (type, i) {
          legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", colorScale(type));

          legend.append("text")
            .attr("x", 25)
            .attr("y", i * 25 + 15)
            .text(type)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .style("fill", "white");// change the color of the text here;
        });


        // Set the nodes and links in the simulation
        simulation
          .nodes(nodes_data)
          .on("tick", ticked);

        simulation.force("link")
          .links(links_data);

        // Update the positions of the nodes and links
        function ticked() {
          link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

          node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
        }

        // Define the drag behavior functions
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
        function zoomed() {
          console.log(d3.event.transform)
          svg.attr("transform", d3.event.transform);
        }
      }