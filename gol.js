function gol_start(div) {
  var svg = d3.select(div).append('svg:svg')
    .attr('width', 500)
    .attr('height', 500);

  var cellData = [];
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      cellData.push({x: i, y: j, state: 'dead'});
    }
  }

  var cells = svg.selectAll("rect")
    .data(cellData)
    .enter()
    .append("rect");

  cells.attr("x", function(d) { return d.x * 3; })
    .attr("y", function(d) { return d.y * 3; })
    .attr("width", 3)
    .attr("height", 3)
    .attr("class", 'cell');
};

