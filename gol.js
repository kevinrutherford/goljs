var dim = 5;

var cellData = [];
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    cellData.push({x: i, y: j, state: 'dead'});
  }
}

function gen(cells, i) {
  var cell = cells[i];
  var ns = (cell.state == 'dead') ? 'alive' : 'dead';
  return ns;
}

function generation(cells) {
  var nextgen = [];
  for (var i = 0; i < 100*100; i++) {
    var cell = cells[i];
    var ns = gen(cells, i);
    nextgen.push({x: cell.x, y: cell.y, state: ns});
  }
  return nextgen;
}

function mouseout(d) {
  d.state = 'live';
}

function golUpdate(cells) {
  cellData = generation(cells);
  var svg = d3.select('svg');
  var cells = svg.selectAll("rect")
    .data(cellData);

  cells.enter()
    .append("rect");

  cells.attr("x", function(d) { return d.x * dim; })
    .attr("y", function(d) { return d.y * dim; })
    .attr("width", dim)
    .attr("height", dim)
    .attr("class", function(d) { return d.state; })
    .on('mouseout', mouseout);
}

function gol_start() {
  var svg = d3.select('#gol').append('svg:svg')
    .attr('width', 100 * dim)
    .attr('height', 100 * dim);

  setInterval(function() {
    golUpdate(cellData);
  }, 1000);
};

