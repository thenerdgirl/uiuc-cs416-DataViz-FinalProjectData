function getScatterplot(fruitType) {
    // First, remove the contents of the svg
    d3.select('#scatterplot').selectAll("*").remove();

    // Select the cv file based on the button
    var csvFile = ""
    switch(fruitType) {
        case 'fresh':
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/FreshFruitPrices.csv";
            break;
        case 'frozen': 
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/FrozenFruitPrices.csv";
            break;
        case 'dried':
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/DriedFruitPrices.csv"
            break;
        case 'canned':
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/CannedFruitPrices.csv"
            break;
        case 'juice':
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/JuiceFruitPrices.csv"
            break;
        default:
            csvFile = "https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/FreshFruitPrices.csv"
    }

    // Create the scatterplot
    d3.csv(csvFile).then(function(data) { 
        var x = d3.scaleLinear().domain([0,11]).range([0,400]);
        var y = d3.scaleLinear().domain([0.4,1]).range([400,0]);

        d3.select("#scatterplot")
            .append("g")
                .attr("transform","translate(50,50)")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx",function(d,i) { return x(d.RetailPrice); })
                .attr("cy",function(d) { return y(d.Yield); })
                .attr("r",3);
        
        // Axes
        d3.select("#scatterplot")
            .append("g")
            .attr("transform","translate(50,50)")
            .call(d3.axisLeft(y));
        d3.select("#scatterplot")
            .append("g")
            .attr("transform","translate(50,450)")
            .call(d3.axisBottom(x));

        // Axis labels
        d3.select("#scatterplot")
            .append("text")
                .attr("x", 250)
                .attr("y", 500)
                .style("text-anchor","middle")
                .text("Retail Price per Unit ($)");
        
        d3.select("#scatterplot")
            .append("text")
                .attr("transform","rotate(-90)")
                .attr("y", -5)
                .attr("x", 0 - 250)
                .attr("dy", "1em")
                .style("text-anchor","middle")
                .text("Yield");
    });
}

function renderPieChart() {
    d3.csv("https://raw.githubusercontent.com/thenerdgirl/uiuc-cs416-DataViz-FinalProject/main/FruitLocations.csv").then(function(data) {
        var regionDict = {};
        let i = 0;
        while (i < data.length) {
            if(regionDict[data[i].Region]) {
                regionDict[data[i].Region] += 1;
            } else {
                regionDict[data[i].Region] = 1;
            }
            i++;
        }

        regions = []
        rcounts = []

        console.log(i);
        for (var key in regionDict) {
            regions.push(key);
            rcounts.push(regionDict[key]);
        }

        // Make the chart
        var pie = d3.pie();
        var arc = d3.arc().innerRadius(0).outerRadius(100);
        // West Coast, South, East Cost, Midwest, Hawaii
        var color = ["rgb(221,148,178)", "rgb(244,147,95)", "rgb(255,220,4)", "rgb(130,201,155)", "rgb(193,184,199)"]
        d3.select('#pie-chart')
            .append("g")
                .attr("transform","translate(150,200)")
            .selectAll("path")
            .data(pie(rcounts))
            .enter()
            .append("path")
                .attr("d",arc)
                .attr("fill",function(d,i) { return color[i]; });

        // Axis labels
        d3.select("#pie-chart")
            .append("text")
                .attr("x", 150)
                .attr("y", 75)
                .style("text-anchor","middle")
                .text("Fresh Fruit Regions");
    });
}

getScatterplot('fresh')
renderPieChart()

