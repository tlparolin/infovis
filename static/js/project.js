$( document ).ready(function() {
    inicio();
});

function apaga_tudo(){
    $("#fatos").html("");
    $("#topico").html("");
    $("#chart").html("");
    $("#visualizacao").val("");
};

function atualiza_grafico() {
    var visualizacao = $("#visualizacao").val();

    switch (visualizacao){
        case "aumento_producao":
            arquivo = "data/json/global-plastics-production.json";
            titulo = "Produção de Plástico"
            subtitulo = "Produção Global Anual de Plástico em Milhões de Toneladas"
            aumento_producao(arquivo, titulo, subtitulo);
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
};

function grafico(arquivo, tipo, titulo){
    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
            // height: altura,
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'normal',
            }
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

function inicio(){
    apaga_tudo();
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-primary">Introdução</h4>\
                <p>O ser humano se inspira em materiais existentes na natureza e os adapta para uso dando origem a outros materiais.</p>\
                <p>O plástico é um polímero sintético, leve, resistente e durável, e que traz inovações para o desenvolvimento da sociedade.</p>\
                <p>A versatilidade, o baixo custo e a estabilidade do plástico diante dos processos naturais de degradação o tornaram onipresente no mundo, porém esses mesmos atributos o transformam em um grande agente poluidor.</p>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            type: 'timeline',
            renderTo: 'chart',
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Linha do Tempo do Plástico'
        },
        subtitle: {
            text: 'Alguns dos principais acontecimentos relacionados ao plástico'
        },
        tooltip: {
            style: {
            width: 300
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            dataLabels: {
                connectorColor: 'silver',
                connectorWidth: 2
            },
            data: [{
                name: '1839',
                label: 'Borracha Natural',
                description: 'Charles Goodyear cria o processo de vulcanização da borracha'
            }, {
                name: '1862',
                label: 'Parkesina',
                description: 'Inventado por Alexander Parkes, a parkesina era um material orgânico derivado da celulose que, uma vez aquecido, podia ser moldado e retinha sua forma quando resfriado.'
            }, {
                name: '1872',
                label: 'Policloreto de Vinila - PVC',
                description: 'Sintetizado acidentalmente em 1872 pelo químico Eugen Baumann quando ele esqueceu um recipiente de cloreto de vinila exposto ao sol, fazendo surgir nele um pedaço sólido de policloreto de vinila, ou PVC.'
            }, {
                name: '1907',
                label: 'Baquelite',
                description: 'Desenvolvido por Leo Baekeland e patenteado em 1909. Foi muito utilizada para se fabricar telefones, discos musicais de 78 rpm, bolas de bilhar e câmeras fotográficas.'
            }, {
                name: '1926',
                label: 'PVC com aditivos',
                description: 'Waldo Semon inventou métodos para tornar útil o cloreto de polivinila com adição de compostos químicos, deixando o material mais fácil de se trabalhar e popularizando o uso do PVC.'
            }, {
                name: '1933',
                label: 'Polietileno de Baixa Densidade - LDPE',
                description: 'Produzido pela primeira vez em 1933 na Inglaterra pela Imperial Chemical Industries Ltd. (ICI) durante estudos dos efeitos de pressões extremamente altas na polimerização do polietileno. A ICI obteve a patente de seu processo em 1937 e iniciou a produção comercial em 1939.'
            }, {
                name: '~1934',
                label: 'Polimetilmetacrilato - Acrílico',
                description: 'Descoberto no início de 1930 pelos químicos britânicos Rowland Hill e John Crawford, em 1934 passou a ser comercializado pelo químico alemão Otto Rohm. A primeira grande utilização ocorreu durante a Segunda Guerra Mundial, quando ele foi usado em janelas, cúpulas de aeronaves e periscópios de submarinos.'
            }, {
                name: '1941',
                label: 'Polietileno tereftalato - PET',
                description: 'Patenteado em 1941 por dois químicos britânicos, John Rex Whinfield e James Tennant Dickson, é utilizado principalmente na forma de fibras para tecelagem e de embalagens para bebidas.'
            }, {
                name: '1951',
                label: 'Polietileno de Alta Densidade - HDPE e Polipropileno - PP',
                description: 'John Paul Hogan inventou com seu colaborador Robert Banks o polipropileno e o polietileno de alta densidade cristalino. Estes plásticos foram inicialmente denominados Marlex.'
            }, {
                name: '1954',
                label: 'Isopor',
                description: 'Material muito mais denso que o EPS e é mais comumente adequado para tarefas como isolamento térmico.'
            }, {
                name: '1960~1990',
                label: 'Kevlar, PLA, PHA, etc',
                description: 'Muito outros tipos de plásticos surgiram durante esse período.'
            }, {
                name: '1990~atualmente',
                label: 'Preocupação Ambiental',
                description: 'Os danos ambientais do plástico começam a se tornar mais perceptíveis e preocupantes. Há o aumento de pesquisas em reciclagem e bioplásticos.'
            }]
        }]
    };
    new Highcharts.Chart(options);
};

function aumento_producao(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-primary rounded small"><b>O Aumento da Produção</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-primary">Cada vez mais plásticos!</h4>\
                <ul>\
                    <li>A quantidade de plástico produzida todos os anos aumentou rapidamente, partindo de 2 milhões de toneladas produzidas em 1950 para quase 460 milhões de toneladas em 2019.</li>\
                    <li>Mais da metade de todo o plástico foi produzido a partir do ano 2000.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(900);
    var options = {
        chart: {
            renderTo: 'chart',
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'normal',
            }
        },
        subtitle: {
            text: subtitulo
        },
        plotOptions: {
            line: {
                marker: {
                    states: {
                        hover: {
                            fillColor: 'black',
                            radius: 10
                        }
                    }
                }
            }
        },
        xAxis: {},
        series: [{}],
    };

    $.getJSON(arquivo, function (data) {
        var ano = data.map(x => x.year);
        var valor = data.map(x => x.value);
        options.xAxis.categories = ano;
        options.series[0].data = valor;
        options.series[0].name = "Todos os países"
        var chart = new Highcharts.Chart(options);
    });
};