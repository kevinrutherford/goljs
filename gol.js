function gol_start(options) {
  var dim = options.cell_pixels;
  var cols = options.columns;

  var current_grid = create_empty_grid(cols);

  function create_empty_grid(columns) {
    var result = [];
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < columns; j++) {
        result.push({i: i, j: j, state: 'dead'});
      }
    }
    return result;
  }

  function neighbours_of(grid, i) {
    return [
      grid[i-cols-1], grid[i-cols], grid[i-cols+1],
      grid[i-1], grid[i+1],
      grid[i+cols-1], grid[i+cols], grid[i+cols+1]
    ].filter(function(cell) { return cell; });
  }

  function should_live(alive_neighbours, currently_alive) {
    if (alive_neighbours == 3)
      return true;
    return (alive_neighbours == 2 && currently_alive)
  }

  function next_state(grid, i) {
    var neighbours = neighbours_of(grid, i);
    var alive_neighbours = neighbours.filter(function(cell) { return (cell.state == 'alive'); }).length;
    var cell = grid[i];
    return should_live(alive_neighbours, cell.state == 'alive') ? 'alive' : 'dead';
  }

  function regenerate(grid) {
    var nextgen = [];
    for (var i = 0; i < cols*cols; i++) {
      var cell = grid[i];
      nextgen.push({i: cell.i, j: cell.j, state: next_state(grid, i)});
    }
    return nextgen;
  }

  function set_alive(d) {
    d.state = 'alive';
  }

  function golUpdate(grid) {
    current_grid = regenerate(grid);
    var svg = d3.select('svg');
    var cells = svg.selectAll("rect")
      .data(current_grid);

    cells.enter()
      .append("rect")
      .attr("width", dim)
      .attr("height", dim)
      .attr("x", function(d) { return d.i * dim; })
      .attr("y", function(d) { return d.j * dim; })
      .on('mouseout', set_alive);

    cells.attr("class", function(d) { return d.state; });
  }

  var svg = d3.select('#gol').append('svg:svg')
    .attr('width', cols * dim)
    .attr('height', cols * dim);

  setInterval(function() { golUpdate(current_grid); }, 500);
};

