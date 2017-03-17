

var box_width = 250,
    box_height = box_width,
    box_padding = 5;

var width = box_width * 4 + 2,
    height = box_height,
    padding = 25;

var color = d3.scale.category10();

var circle_radius = 1.5;
var max_freq_periodo = {1: 6, 2: 7, 3: 7, 4: 7, 5: 7, 6: 6, 7: 3, 8: 1};
var padding_line = 0.3;
var padding_x0 = 22;
var padding_box = 23;
var top = 5;

var yAxisPadding = 20;

var yScale = d3.scale.linear()
    .domain([0, 7])
    .rangeRound([height - padding, padding]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(8);


// PLOTS ABOVE

var svg1 = d3.select(".above")
    .append("svg")
    .attr("class", "svg1")
    .attr("width", width)
    .attr("height", height);

svg1.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + yAxisPadding + ",0)")
    .call(yAxis);

plot_above(5);
plot_above(6);
plot_above(7);
plot_above(8);


// PLOTS UNDER

var svg2 = d3.select(".below")
    .append("svg")
    .attr("class", "svg2")
    .attr("width", width)
    .attr("height", height);

svg2.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + yAxisPadding + ",0)")
    .call(yAxis);

plot_under(1);
plot_under(2);
plot_under(3);
plot_under(4);

function plot_above(periodo) {

    d3.csv("data.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.mat = +d.mat,
                d.periodo = +d.periodo,
                d.freq = +d.freq
        });

        var mydata = data.filter(function (d) {
            return d.periodo === periodo;
        });

        max_mat = d3.max(data, function (d) {
            return d.mat;
        });
        min_mat = d3.min(data, function (d) {
            return d.mat;
        });

        var quinto_periodo = 5;
        var x0 = (box_width * (periodo - quinto_periodo));

        var box = d3.select("svg.svg1")
            .append("g")
            .attr("width", box_width)
            .attr("height", box_height)
            .attr("transform", "translate(" + x0 + "," + 0 + ")");

        var xScale = d3.scale.linear()
            .domain([min_mat, max_mat])
            .range([padding, box_width - box_padding]);

        box.selectAll("circle")
            .data(mydata)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.mat);
            })
            .attr("cy", function (d) {
                return yScale(d.freq);
            })
            .attr("r", circle_radius)
            .style("fill", function (d) {
                return color(d.periodo);
            });

        box.append("text")
            .attr("class", "label")
            .attr("y", box_height - 6)
            .attr("x", box_width / 2 - 20)
            .attr("font-family","Verdana")
            .attr("font-size","12")
            .text(periodo + " periodo");

        d3.select("svg.svg1")
            .append("rect")
            .attr("class", "frame")
            .attr("x", x0 + padding_box)
            .attr("y", 14.3)
            .attr("width", box_width - padding_box)
            .attr("height", height - 35);

        d3.select("svg.svg1")
            .append("line")
            .attr("id", "top")
            .attr("x1", x0 + padding_x0)
            .attr("x2", x0 + box_width)
            .attr("y1", yScale(max_freq_periodo[periodo] + padding_line))
            .attr("y2", yScale(max_freq_periodo[periodo] + padding_line));

    }); // close read data

}

function plot_under(periodo) {

    d3.csv("data.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.mat = +d.mat,
                d.periodo = +d.periodo,
                d.freq = +d.freq
        });

        var mydata = data.filter(function (d) {
            return d.periodo === periodo;
        });

        max_mat = d3.max(data, function (d) {
            return d.mat;
        });
        min_mat = d3.min(data, function (d) {
            return d.mat;
        });

        var x0 = box_width * (periodo - 1);

        var box = d3.select("svg.svg2")
            .append("g")
            .attr("width", box_width)
            .attr("height", box_height)
            .attr("transform", "translate(" + x0 + "," + 0 + ")");

        var xScale = d3.scale.linear()
            .domain([min_mat, max_mat])
            .range([padding, box_width - box_padding]);

        box.selectAll("circle")
            .data(mydata)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.mat);
            })
            .attr("cy", function (d) {
                return yScale(d.freq);
            })
            .attr("r", circle_radius)
            .style("fill", function (d) {
                return color(d.periodo);
            });

        box.append("text")
            .attr("class", "label")
            .attr("y", box_height - 6)
            .attr("x", box_width / 2 - 20)
            .attr("font-family","Verdana")
            .attr("font-size","12")
            .text(periodo + " periodo");

        d3.select("svg.svg2")
            .append("rect")
            .attr("class", "frame")
            .attr("x", x0 + padding_box)
            .attr("y", 14.3)
            .attr("width", box_width - padding_box)
            .attr("height", height - 35);

        d3.select("svg.svg2")
            .append("line")
            .attr("id", "top")
            .attr("x1", x0 + padding_x0)
            .attr("x2", x0 + box_width)
            .attr("y1", yScale(max_freq_periodo[periodo] + padding_line))
            .attr("y2", yScale(max_freq_periodo[periodo] + padding_line));


    }); // close read data

}
