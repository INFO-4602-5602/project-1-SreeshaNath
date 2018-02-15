// Put your part one code here ***********************
        d3.csv("data/anscombe_I.csv", function(data){
            //console.log(data);
            checkDataset(data);
            return data;
        });
        
        d3.csv("data/anscombe_II.csv", function(data){
            //console.log(data);
            checkDataset(data);
            return data;
        });
        d3.csv("data/anscombe_III.csv", function(data){
            //console.log(data);
            checkDataset(data);
            return data;
        });
        d3.csv("data/anscombe_IV.csv", function(data){
            //console.log(data);
            checkDataset(data);
            return data;
        });
        // Leave this to test your data uploading. All data uploading should be above this line
        function checkDataset(dataset) {
            if (dataset.length == 11)
                $("#partOne").append("data loaded correctly<br/>");
            else
                $("#partOne").append("<p>data loaded incorrectly. Try using the debugger to help you find the bug!</p>");
        }
        
        function testing(data)
        {
            $("#partFive").append("<p>"+ data +"</p>");
        }
        
        // Put your part two code here ***********************
        
        var vals = ['x', 'y']; // List of data attributes
        var xVal = vals[0]; // Value to plot on x-axis
        var yVal = vals[1]; // Value to plot on y-axis


        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left:50};
        var width = 450 - margin.left - margin.right;
        var height = 350 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleLinear().range([0,width]);
        var y = d3.scaleLinear().range([height,0]);

        var xline = d3.scaleLinear().range([0,width]);
        var yline = d3.scaleLinear().range([height,0]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#barchart").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        var Tooltip = d3.select("#barchart").append("Tooltip")	
                    .attr("class", "tooltip")				
                    .style("opacity", 0);
        // Get the data
        d3.csv("data/anscombe_I.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})]);

            // Add the scatterplot points
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","green")
                .attr("stroke","#FFF")
                .on("mouseover", function(d){
                        Tooltip		
                        .html("x: " + d.x + "<br/>y: "  + d.y)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px")
                        .transition()		
                        .duration(0)		
                        .style("opacity", 1.0);
                })
                .on("mouseout", function(d) {		
                        Tooltip.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });

            // Add the X Axis
            svg.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });

        
        // Put your part three code here ***********************
        
        var svg1 = d3.select("#linegraph").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_I.csv" , function(error,data)
        {
            if(error) throw error;
            data.forEach(function(d) {
                  d.x = +d.x;
                  d.y = +d.y;
              });
            
            data.sort(function(a,b) {return b.x-a.x;});
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return d.x;})]);  
            y.domain([3, d3.max(data, function(d){return d.y;})]);
            
            var line = d3.line()
                            .x(function(d) { return x(d.x); })
                            .y(function(d) { return y(d.y); });

            // Add the line graph
            svg1.append("path")
                .data([data])
                .attr("class","line")
                .attr("d", line);

            // Add the X Axis
            svg1.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            
            // Add the Y Axis
            svg1.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg1.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg1.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });
        
        // Put your part four code here ***********************

        var svg3 = d3.select("#scatterplot").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_II.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})]);

            // Add the scatterplot points
            svg3.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","blue")
                .attr("stroke","#FFF")
                .on("mouseover",function(d){
                                d3.select(this).attr("fill", "red");
                                })
                .on("mouseout",function(d){
                                d3.select(this).attr("fill","blue");
                                })
                .on("click", function(d){
                                d3.select("#scatterLabel").remove();
                                d3.select("#partFour")
                                    .append("p")
                                    .attr("id", "scatterLabel")
                                    .append("text")
                                    .text("point: x - "+d.x + " \t\ty - " + d.y);
	});

            // Add the X Axis
            svg3.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                            .attr("class", "axisWhite");
            // Add the Y Axis
            svg3.append("g")
                .call(d3.axisLeft(y))
                            .attr("class", "axisWhite");

            var xLabel = svg3.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg3.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });

        
        // Put your part five code here ***********************
        
        var svg_a1 = d3.select("#anscombe1").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_I.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([0, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([0, d3.max(data, function(d){return parseFloat(d[yVal]);})]);
            
            meanX = d3.mean(data,function(d) { return parseFloat(d.x);});
            meanY = d3.mean(data,function(d) { return parseFloat(d.y);});
            
            var slope_num = 0;
            var slope_denom = 0;
            
            data.forEach(function(d){ 
                slope_num += (parseFloat(d.x) - meanX)*(parseFloat(d.y) - meanY);
                slope_denom += (parseFloat(d.x) - meanX)*(parseFloat(d.x) - meanX);
            });
            
            var slope = (slope_num)/(slope_denom);
            
            var intercept = meanY - slope*meanX;
            
            var x1 = 0;
            var y1 = x1*slope + intercept;
            var x2 = 11;
            var y2 = x2*slope + intercept;

            var dataset = [{x:x1,y:y1},{x:x2,y:y2}];
            
            dataset.sort(function(a,b) {return b.x-a.x;});
            
            xline.domain([0, d3.max(dataset, function(d){return parseFloat(d[xVal]);})]);  
            yline.domain([0, d3.max(dataset, function(d){return parseFloat(d[yVal]);})]);
            
            var line = d3.line()
                            .x(function(d) { return xline(d.x); })
                            .y(function(d) { return yline(d.y); });

            // Add the line graph
            svg_a1.append("path")
                .data([dataset])
                .attr("class","line")
                .attr("d", line);

            // Add the scatterplot points
            svg_a1.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","orange")
                .attr("stroke","#FFF");

            // Add the X Axis
            svg_a1.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            // Add the Y Axis
            svg_a1.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg_a1.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg_a1.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });
        
        var svg_a2 = d3.select("#anscombe2").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_II.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})]);
            
            meanX = d3.mean(data,function(d) { return parseFloat(d.x);});
            meanY = d3.mean(data,function(d) { return parseFloat(d.y);});
            
            var slope_num = 0;
            var slope_denom = 0;
            
            data.forEach(function(d){ 
                slope_num += (parseFloat(d.x) - meanX)*(parseFloat(d.y) - meanY);
                slope_denom += (parseFloat(d.x) - meanX)*(parseFloat(d.x) - meanX);
            });
            
            var slope = (slope_num)/(slope_denom);
            
            var intercept = meanY - slope*meanX;
            
            var x1 = 0;
            var y1 = x1*slope + intercept;
            var x2 = 11;
            var y2 = x2*slope + intercept;

            var dataset = [{x:x1,y:y1},{x:x2,y:y2}];
            
            dataset.sort(function(a,b) {return b.x-a.x;});
            
            xline.domain([0, d3.max(dataset, function(d){return parseFloat(d[xVal]);})]);  
            yline.domain([0, d3.max(dataset, function(d){return parseFloat(d[yVal]);})]);
            
            var line = d3.line()
                            .x(function(d) { return xline(d.x); })
                            .y(function(d) { return yline(d.y); });

            // Add the line graph
            svg_a2.append("path")
                .data([dataset])
                .attr("class","line")
                .attr("d", line);
            
            // Add the scatterplot points
            svg_a2.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","orange")
                .attr("stroke","#FFF");

            // Add the X Axis
            svg_a2.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            // Add the Y Axis
            svg_a2.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg_a2.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg_a2.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });
        
        var svg_a3 = d3.select("#anscombe3").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_III.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})]);
            
            meanX = d3.mean(data,function(d) { return parseFloat(d.x);});
            meanY = d3.mean(data,function(d) { return parseFloat(d.y);});
            
            var slope_num = 0;
            var slope_denom = 0;
            
            data.forEach(function(d){ 
                slope_num += (parseFloat(d.x) - meanX)*(parseFloat(d.y) - meanY);
                slope_denom += (parseFloat(d.x) - meanX)*(parseFloat(d.x) - meanX);
            });
            
            var slope = (slope_num)/(slope_denom);
            
            var intercept = meanY - slope*meanX;
            
            var x1 = 0;
            var y1 = x1*slope + intercept;
            var x2 = 11;
            var y2 = x2*slope + intercept;

            var dataset = [{x:x1,y:y1},{x:x2,y:y2}];
            
            dataset.sort(function(a,b) {return b.x-a.x;});
            
            xline.domain([0, d3.max(dataset, function(d){return parseFloat(d[xVal]);})]);  
            yline.domain([0, d3.max(dataset, function(d){return parseFloat(d[yVal]);})]);
            
            var line = d3.line()
                            .x(function(d) { return xline(d.x); })
                            .y(function(d) { return yline(d.y); });

            // Add the line graph
            svg_a3.append("path")
                .data([dataset])
                .attr("class","line")
                .attr("d", line);
            
            // Add the scatterplot points
            svg_a3.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","orange")
                .attr("stroke","#FFF");

            // Add the X Axis
            svg_a3.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            // Add the Y Axis
            svg_a3.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg_a3.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg_a3.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });
        
        var svg_a4 = d3.select("#anscombe4").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // Get the data
        d3.csv("data/anscombe_IV.csv" , function(error,data)
        {
            if(error) throw error;
            // Scale the range of the data
            x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
            y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})]);
            
            meanX = d3.mean(data,function(d) { return parseFloat(d.x);});
            meanY = d3.mean(data,function(d) { return parseFloat(d.y);});
            
            var slope_num = 0;
            var slope_denom = 0;
            
            data.forEach(function(d){ 
                slope_num += (parseFloat(d.x) - meanX)*(parseFloat(d.y) - meanY);
                slope_denom += (parseFloat(d.x) - meanX)*(parseFloat(d.x) - meanX);
            });
            
            var slope = (slope_num)/(slope_denom);
            
            var intercept = meanY - slope*meanX;
            
            var x1 = 0;
            var y1 = x1*slope + intercept;
            var x2 = 11;
            var y2 = x2*slope + intercept;

            var dataset = [{x:x1,y:y1},{x:x2,y:y2}];
            
            dataset.sort(function(a,b) {return b.x-a.x;});
            
            xline.domain([0, d3.max(dataset, function(d){return parseFloat(d[xVal]);})]);  
            yline.domain([0, d3.max(dataset, function(d){return parseFloat(d[yVal]);})]);
            
            var line = d3.line()
                            .x(function(d) { return xline(d.x); })
                            .y(function(d) { return yline(d.y); });

            // Add the line graph
            svg_a4.append("path")
                .data([dataset])
                .attr("class","line")
                .attr("d", line);
            // Add the scatterplot points
            svg_a4.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",5)
                .attr("cx", function(d){ return x(d[xVal]);})
                .attr("cy", function(d){ return y(d[yVal]);})
                .attr("fill","orange")
                .attr("stroke","#FFF");

            // Add the X Axis
            svg_a4.append("g")
                .attr("transform","translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "axisWhite");
            // Add the Y Axis
            svg_a4.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "axisWhite");

            var xLabel = svg_a4.append("text")
                            .attr("class","label")
                            .text(xVal)
                            .attr("x",width - 20)
                            .attr("y",height - 10 )
                            .attr("class", "axisWhite");

            var yLabel = svg_a4.append("text")
                            .attr("class","label")
                            .text(yVal)
                            .attr("y", - 20 )
                            .attr("transform","rotate(90)")
                            .style("text-anchor","start")
                            .attr("class", "axisWhite");

        });
    
    var svgbc = d3.select("#barchartvertBell").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var svghbc = d3.select("#barcharthorBell").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    d3.csv("data/anscombe_I.csv" , function(error,data)
    {
        if(error) throw error;
        // Scale the range of the data
        x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal])+2;})]);  
        y.domain([0, d3.max(data, function(d){return parseFloat(d[yVal]);})]);

        // Add the scatterplot points
        svgbc.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", "bar1")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .attr("class", function(d,i) { return "pt" + i; })
            .attr("width", "8")
            .attr("height", function(d) { return height - y(d.y); })
            .attr("fill","#0FF")
            .on("mouseover", function(d, i) {
                d3.selectAll("rect.pt" + i)
                .attr("fill", "#FF0");
            })
            .on("mouseout", function(d, i) {
                d3.selectAll("rect.pt" + i)
                .attr("fill", "#0FF");
            });;

        // Add the X Axis
        svgbc.append("g")
            .attr("transform","translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("class", "axisWhite");
        
        // Add the Y Axis
        svgbc.append("g")
            .call(d3.axisLeft(y))
            .attr("class", "axisWhite");

        var xLabel = svgbc.append("text")
                        .attr("class","label")
                        .text(xVal)
                        .attr("x",width - 20)
                        .attr("y",height - 10 )
                        .attr("class", "axisWhite");

        var yLabel = svgbc.append("text")
                        .attr("class","label")
                        .text(yVal)
                        .attr("y", - 20 )
                        .attr("transform","rotate(90)")
                        .style("text-anchor","start")
                        .attr("class", "axisWhite");
        
        x.domain([3, d3.max(data, function(d){return parseFloat(d[xVal]);})]);  
        y.domain([3, d3.max(data, function(d){return parseFloat(d[yVal]);})+1]);
        
        svghbc.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("id","bar2")
                .attr("x", 0)
                .attr("y", function(d) { return y(d.y);})
                .attr("width", function(d) { return x(d.x);})
                .attr("class", function(d,i) { return "pt" + i; })
                .attr("height", "8")
                .attr("fill","#0FF")
                .on("mouseover", function(d, i) {
                    d3.selectAll("rect.pt" + i)
                    .attr("fill", "#FF0");
                })
                .on("mouseout", function(d, i) {
                    d3.selectAll("rect.pt" + i)
                    .attr("fill", "#0FF");
                });

        // Add the X Axis
        svghbc.append("g")
            .attr("transform","translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("class", "axisWhite");
        
        // Add the Y Axis
        svghbc.append("g")
            .call(d3.axisLeft(y))
            .attr("class", "axisWhite");

        var xLabel = svghbc.append("text")
                        .attr("class","label")
                        .text(xVal)
                        .attr("x",width - 20)
                        .attr("y",height - 10 )
                        .attr("class", "axisWhite");

        var yLabel = svghbc.append("text")
                        .attr("class","label")
                        .text(yVal)
                        .attr("y",  -20 )
                        .attr("transform","rotate(90)")
                        .style("text-anchor","start")
                        .attr("class", "axisWhite");


    });
    
   