function atualiza_grafico() {
    var tempo = $("#tempo").val();
    var visualizacao = $("#visualizacao").val();
    var tipo_grafico = $("#tipo_grafico").val();

    switch (visualizacao){
        case "tipo":
            arquivo = "data/json/prod_by_type";
            break;
        case "polimero":
            arquivo = "data/json/prod_by_polymer";
            break;
        case "aplicacao":
            arquivo = "data/json/prod_by_application";
            break;
        case "local":
            arquivo = "data/json/prod_by_region";
            break;
    };

    if (tempo === "decada"){
        arquivo += "_decade.json"
    } else {
        arquivo += ".json"
    };

    grafico(arquivo, tipo_grafico, 580);
};

function grafico(arquivo, tipo, altura){
    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
            height: altura,
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
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

    $.getJSON(arquivo, function (data) {
        options.series[0].data = data;
        var chart = new Highcharts.Chart(options);
    });
};