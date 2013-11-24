var cellData = [];
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    cellData.push({x: i, y: j, state: 'dead'});
  }
}

function mouseout(d) {
  d.state = 'live';
}

function golUpdate(cellData) {
  var svg = d3.select('svg');
  var cells = svg.selectAll("rect")
    .data(cellData);

  cells.enter()
    .append("rect");

  cells.attr("x", function(d) { return d.x * 3; })
    .attr("y", function(d) { return d.y * 3; })
    .attr("width", 3)
    .attr("height", 3)
    .attr("class", function(d) { return d.state; })
    .on('mouseout', mouseout);
}

function gol_start() {
  var svg = d3.select('#gol').append('svg:svg')
    .attr('width', 500)
    .attr('height', 500);

  setInterval(function() {
    golUpdate(cellData);
  }, 1000);
};

