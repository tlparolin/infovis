d3.json("http://localhost:8000/data/json/dados.json", function(error, dados) {
    console.log(dados);
});

console.log(data);
console.log(dados);

const margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
    },
    width = 960,
    height = width;

const innerRadius = Math.min(width, height) * 0.5 - 90;

const outerRadius = innerRadius + 10;

// names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending);

// console.log(names);