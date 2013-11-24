var dim = 5;
var cols = 100;

var cellData = [];
var state = 'dead';
for (var i = 0; i < cols; i++) {
  //state = (state == 'alive') ? 'dead' : 'alive';
  for (var j = 0; j < cols; j++) {
    cellData.push({x: i, y: j, state: state});
  }
}

function gen(cells, i) {
  var neighbours = [
    cells[i-cols-1], cells[i-cols], cells[i-cols+1],
    cells[i-1], cells[i+1],
    cells[i+cols-1], cells[i+cols], cells[i+cols+1]
  ].filter(function(cell) { return (typeof cell != 'undefined'); });
  var numal = neighbours.filter(function(cell) { return (cell.state == 'alive'); }).length;
  var cell = cells[i];
  if (numal == 3)
    return 'alive';
  if (numal == 2 && cell.state == 'alive')
    return 'alive';
  return 'dead';
}

function generation(cells) {
  var nextgen = [];
  for (var i = 0; i < cols*cols; i++) {
    var cell = cells[i];
    var ns = gen(cells, i);
    nextgen.push({x: cell.x, y: cell.y, state: ns});
  }
  return nextgen;
}

function mouseout(d) {
  d.state = 'alive';
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
    .attr('width', cols * dim)
    .attr('height', cols * dim);

  setInterval(function() {
    golUpdate(cellData);
  }, 500);
};

