$( document ).ready(function() {
    atualiza_grafico();
});

function atualiza_grafico() {
    var tempo = $("#tempo").val();
    var visualizacao = $("#visualizacao").val();
    var tipo_grafico = $("#tipo_grafico").val();

    switch (visualizacao){
        case "tipo":
            arquivo = "data/json/prod_by_type";
            titulo = "Produção de Plástico por Tipo - Primário/Secundário";
            break;
        case "polimero":
            arquivo = "data/json/prod_by_polymer";
            titulo = "Produção de Plástico por Polímero";
            break;
        case "aplicacao":
            arquivo = "data/json/prod_by_application";
            titulo = "Consumo de Plástico por Indústria/Aplicação";
            break;
        case "local":
            arquivo = "data/json/prod_by_region";
            titulo = "Consumo de Plástico por Local";
            break;
        default:
            arquivo = "data/json/dados";
            titulo = "Visão Geral";
    };

    if (tempo === "decada"){
        arquivo += "_decade.json"
        titulo += " por Década"
    } else {
        arquivo += ".json"
        titulo += " por Ano"
    };

    grafico(arquivo, tipo_grafico, 900, titulo);
};

function grafico(arquivo, tipo, altura, titulo){
    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
            height: altura,
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: "Valores em milhões de toneladas"
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