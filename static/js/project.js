function atualiza_grafico() {
    var detalhe = document.getElementById("detalhe").value;
    var filtro = document.getElementById("filtro").value;
    
    switch (filtro){
        case "tipo":
            arquivo = "https://raw.githubusercontent.com/tlparolin/infovis/master/data/json/prod_by_type";
            break;
        case "polimero":
            arquivo = "https://raw.githubusercontent.com/tlparolin/infovis/master/data/json/prod_by_polymer";
            break;
        case "aplicacao":
            arquivo = "https://raw.githubusercontent.com/tlparolin/infovis/master/data/json/prod_by_application";
            break;
    };

    if (detalhe === "decada"){
        arquivo += "_decade.json"
    } else {
        arquivo += ".json"
    };
    console.log(arquivo);
    grafico(arquivo);
};

function grafico(arquivo) {
    d3.json(arquivo)
    .then(json => {
        const data = json;
    
        const width = 900;
        // const height = width;
        const height = 650;
    
        const innerRadius = Math.min(width, height) * 0.5 - 90;
        const outerRadius = innerRadius + 8;
    
        const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending);
    
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
            var svg = d3.create("svg")
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
                    //.filter( d => d.source !== selected.target)
                    .filter( d => d.index !== selected.target.__data__.index)
                    .style("opacity", 0.2);
                
                svg.selectAll(".chord")
                    //.filter( d => d.source.index !== selected.index)
                    .filter( d => d.source.index !== selected.target.__data__.index)
                    .style("opacity", 0.2);
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
                .attr("class", "chord")
                .style("mix-blend-mode", "multiply")
                .attr("fill", d => color(names[d.target.index]))
                .attr("stroke", d => d3.rgb(color(names[d.target.index])).darker())
                .attr("d", ribbon)
                .append("title")
                .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`)
                .on("mouseover", d => onMouseOver(d.source))
                .on("mouseout", d => onMouseOut(d.source));
                  
            return svg.node();
        };
    
        var grafico = chart(width, height, matriz, color, names, arc, outerRadius, ribbon);
        elemento = document.getElementById("chart");
        elemento.innerHTML = "";
        elemento.append(grafico);
        
    })
    .catch(error => {
        console.error(error);
    });
};