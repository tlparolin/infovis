d3.json("https://raw.githubusercontent.com/tlparolin/infovis/master/data/json/dados_por_decadas.json")
.then(json => {
    const data = json;

    const width = 754;
    const height = width;

    // const innerRadius = Math.min(width, height) * 0.5 - 90;
    const innerRadius = (Math.min(width, height) / 2 )- 90;
    const outerRadius = innerRadius + 10;

    const names = Array.from(new Set(data.flatMap(d => [d.source, d.target])));//.sort(d3.ascending);
    console.log(names);

    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length));
    //const color = d3.scaleOrdinal(d3.schemeCategory10)

    const ribbon = d3.ribbonArrow()
        .radius(innerRadius - 1)
        .padAngle(1 / innerRadius);
    
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    
    function matrix(names, data) {
        const index = new Map(names.map((name, i) => [name, i]));
        const matrix = Array.from(index, () => new Array(names.length).fill(0));
        for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
        return matrix;
    };

    function _chord(innerRadius){
        return d3.chordDirected()
            .padAngle(10 / innerRadius)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);
    };

    const matriz = matrix(names, data);
    const chord = _chord(innerRadius);

    function chart(width, height, matrix, color, names, arc, outerRadius, ribbon) {
        const svg = d3.create("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height]);
      
        const chords = chord(matrix);
        
        const group = svg.append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .selectAll("g")
            .data(chords.groups)
            .join("g");
      
        function onMouseOver(selected) {
            group      
                .filter( d => d.index !== selected.index)
                .style("opacity", 0.3);
            
            svg.selectAll(".chord")
                .filter( d => d.source.index !== selected.index)
                .style("opacity", 0.3);
        };
            
        function onMouseOut() {
            group.style("opacity", 1);
            svg.selectAll(".chord")
                .style("opacity", 1);
        };

        group.append("path")
            .attr("fill", d => color(names[d.index]))
            .attr("d", arc)
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut);
      
        group.append("text")
            .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
            .attr("dy", "0.35em")
            .attr("transform", d => `
                rotate(${(d.angle * 180 / Math.PI - 90)})
                translate(${outerRadius + 5})
                ${d.angle > Math.PI ? "rotate(180)" : ""}
            `)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => names[d.index]);
      
        group.append("title")
            .text(d => `${names[d.index]}
                ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
                ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);
      
        svg.append("g")
            .attr("fill-opacity", 0.75)
            .selectAll("path")
            .data(chords)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("fill", d => color(names[d.target.index]))
            .attr("d", ribbon)
            .append("title")
            .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
      
        return svg.node();
    };

    var grafico = chart(width, height, matriz, color, names, arc, outerRadius, ribbon);
    var elemento = document.getElementById("chart");
    elemento.append(grafico);
    
})
.catch(error => {
    console.error(error);
});