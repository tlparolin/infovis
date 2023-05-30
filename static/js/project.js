function atualiza_grafico() {
    var detalhe = $("#detalhe").val();
    var filtro = $("#filtro").val();
    console.log(detalhe, filtro);
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
    grafico(arquivo, 'sankey', 600);
};

function grafico(arquivo, tipo, altura){
    var options = {
        chart: {
            renderTo: 'chart',
            type: 'dependencywheel',
            height: 800,
            dataLabels: {
                color: '#333',
                style: {
                    textOutline: 'none'
                },
                textPath: {
                    enabled: true
                },
                distance: 10
            },
        },
        title: {
            text: 'Highcharts Dependency Wheel'
        },
    
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
            }
        },
        series: [{}],
    };

    $.getJSON('data/json/prod_by_type.json', function (data) {
        options.series[0].data = data;
        var chart = new Highcharts.Chart(options);
    });
};