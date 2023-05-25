/* globals d3, topojson */

async function start() {
    const us = await fetch(
      "https://static.observableusercontent.com/files/6b1776f5a0a0e76e6428805c0074a8f262e3f34b1b50944da27903e014b409958dc29b03a1c9cc331949d6a2a404c19dfd0d9d36d9c32274e6ffbc07c11350ee"
    ).then(d => d.json());
    
  
    const radius = d3.scaleSqrt(
      [0, d3.quantile([...data.values()].sort(d3.ascending), 0.985)],
      [0, 7]
    );
    const format = d3.format(",.0f");
    const path = d3.geoPath();
  
    const chart = await (async () => {
      const svg = d3.create("svg").attr("viewBox", [0, 0, 975, 610]);
  
      svg
        .append("path")
        .datum(topojson.feature(us, us.objects.nation))
        .attr("fill", "#ccc")
        .attr("d", path);
  
      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
  
      const legend = svg
        .append("g")
        .attr("fill", "#777")
        .attr("transform", "translate(925,608)")
        .attr("text-anchor", "middle")
        .style("font", "10px sans-serif")
        .selectAll("g")
        .data([1e3, 5e3, 1e4])
        .join("g");
  
      legend
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("cy", d => -radius(d))
        .attr("r", radius);
  
      legend
        .append("text")
        .attr("y", d => -2 * radius(d))
        .attr("dy", "1.3em")
        .text(d3.format(".1s"));
  
      svg
        .append("g")
        .attr("fill", "brown")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "#900")
        .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(
          topojson
            .feature(us, us.objects.counties)
            .features.map(d => ((d.value = data.get(d.id)), d))
            .sort((a, b) => b.value - a.value)
        )
        .join("circle")
        .attr("transform", d => `translate(${path.centroid(d)})`)
        .attr("r", d => radius(d.value))
        .append("title")
        .text(
          d => `${d.properties.name}
    ${format(d.value)}`
        );
  
      return svg.node();
    })();

    document.querySelector("#chart").appendChild(chart);
  }
  
  start();