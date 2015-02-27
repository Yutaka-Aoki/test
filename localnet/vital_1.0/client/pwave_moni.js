var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 640 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;
var x = d3.scale.linear()
        .range([0, width]);
var y = d3.scale.linear()
        .domain([700, 900])
        //.domain([25, 55])
        .range([height, 0]);
var line = d3.svg.line()
              .x(function(d, i) { return i * (width/120); })
              .y(function(d) { return y(d); });
var svg = d3.select("#chart_pwave").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var dataset = [];
var cnt = 1;
//var wsc3 = new WebSocket('ws://54.65.100.97:8502/');
var wsc3 = new WebSocket('ws://10.10.10.2:8502/');

wsc3.onmessage = function(event) {
    var data = JSON.parse(event.data);
    for(i in data) {
        dataset.push(data[i][2]);
	//console.log("data[" + i + "][2]: " + data[i][2] )
        i++;
    }
    // デバッグ用
    // console.log(i);
    console.log("event.data" + event.data);
    // console.log("data = " + data);
    console.log("dataset = " + dataset);
    x.domain(d3.extent(dataset, function(d) { return i * (width/120); }));
    // y.domain(d3.extent(dataset, function(d) { return d; }));
    svg.append("path")
        .datum(dataset)
        .attr({
          class: "line",
          d: line
        });
    // console.log("cnt = " + cnt);
//    if(cnt > 7){      yaoki
    if(cnt > 128){
      d3.selectAll("path.line").remove();
      dataset = [];
      cnt = 1;
    }else{
      cnt++;
    }
}

