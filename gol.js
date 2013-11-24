function gol_start(div) {
  var svg = d3.select(div).append('svg:svg')
    .attr('width', 500)
    .attr('height', 500);

  var g = svg.append('svg:g');

  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      g.append('<svg:rect')
        .attr('class', "cell")
        .attr('width', "3")
        .attr('height', "3")
        .attr('x', 3 * i)
        .attr('y', 3 * j);
    }
  }
};

