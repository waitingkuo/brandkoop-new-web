Charts = window.Charts || {};

Charts.makeWordcloud = function(id, width, height, allWords) {


  function draw(words) {
    d3.select('#'+id).append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { 
          return d.color;
          //return fill(i); 
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

  let fill = d3.scale.category20();
  let freqs = _.map(allWords, function(w){ return w.freq; });
  min = _.min(freqs);
  max = _.max(freqs);
  fontSize = d3.scale.log().domain([min, max]).range([10, 50]);
  let words = _.map(allWords, function(w) {
    return {
      text: w.term,
      size: fontSize(w.freq),
      color: CriteriaColor[w.criteria],
    }
  });

  let layout = d3.layout.cloud()
      .size([500, 500])
      .words(words)
      //.words([
      //  "Hello", "world", "normally", "you", "want", "more", "words",
      //  "than", "this"].map(function(d) {
      //  return {text: d, size: 10 + Math.random() * 90, test: "haha"};
      //}))
      .padding(5)
      .rotate(function() { return (Math.random()*2-1) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

  layout.start();

}; 
