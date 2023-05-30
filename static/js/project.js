function atualiza_grafico() {
    var tempo = $("#tempo").val();
    var visualizacao = $("#visualizacao").val();
    var tipo_grafico = $("#tipo_grafico").val();

    switch (visualizacao){
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

    if (tempo === "decada"){
        arquivo += "_decade.json"
    } else {
        arquivo += ".json"
    };

    grafico(arquivo, tipo_grafico, 600);
};

function grafico(arquivo, tipo, altura){
    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
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
        credits: {
            enabled: false
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