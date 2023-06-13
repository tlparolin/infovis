$( document ).ready(function() {
    resumo();
});

function apaga_tudo(){
    $("#fatos").html("");
    $("#topico").html("");
    $("#chart").html("");
    $("#postexto").html("");
    $("#visualizacao").val("");
};

function atualiza_grafico() {
    var visualizacao = $("#visualizacao").val();

    switch (visualizacao){
        case "introducao":
            inicio();
            break;
        case "aumento_producao":
            arquivo = "data/json/global-plastics-production.json";
            titulo = "A produção de plástico aumentou quase 230 vezes desde 1950"
            subtitulo = "Produção Global de Plástico em Milhões de Toneladas por Ano - 1950 a 2019"
            aumento_producao(arquivo, titulo, subtitulo);
            break;
        case "primario_secundario":
            arquivo = "data/json/global-plastics-prod-by-type.json";
            titulo = "A produção secundária está crescendo, mas representa pouco mais de 6% da produção total de plástico";
            subtitulo = "Produção Global de Plástico Primário (virgem) e Secundário (reciclado) em Milhões de Toneladas por Ano - 1990 a 2019";
            tipo = "bar";
            tempo = "decada";
            primario_secundario(arquivo, titulo, subtitulo, tipo, tempo);
            break;
        case "aplicacao":
            arquivo = "data/json/global-plastics-prod-by-application-dec.json";
            titulo = "Qual o setor da indústria que utiliza a maior quantidade";
            subtitulo = "Consumo Global de Plástico em Milhões de Toneladas por Década - 1990 a 2019"
            consumo_industria(arquivo, titulo, subtitulo);
            break;
        case "local":
            arquivo = "data/json/global-plastics-prod-by-region-dec.json";
            titulo = "Comparação de consumo entre as regiões ou países";
            subtitulo = "Porcentagem do Consumo Global de Plástico por Década por Região/País - 1990 a 2019"
            consumo_regiao(arquivo, titulo, subtitulo);
            break;
        case "descarte":
            arquivo = "data/json/global-waste-by-region-and-end-of-life-fate-Total.json";
            titulo = "Maior produção, maior lixo plástico";
            subtitulo = "Quantidade Total de Resíduos por País/Região (sem contabilizar reciclados e coletados)- em Milhões de Toneladas - décadas de 2000 e 2010"
            tempo = "decada"
            descarte_regiao(arquivo, titulo, subtitulo, tempo);
            break;
        case "tipo_descarte":
            arquivo = "data/json/global-waste-by-region-and-end-of-life-fate-All.json";
            titulo = "Globalmente, apenas 9% dos resíduos plásticos são reciclados";
            subtitulo = "Parcela de plásticos tratados por categoria de gerenciamento de resíduos, após descarte de resíduos de reciclagem e lixo coletado, em Milhões de Toneladas - 2000 a 2019"
            tempo = "decada"
            tipo_descarte(arquivo, titulo, subtitulo, tempo);
            break;
        case "oceanos":
            arquivo = "data/json/global-waste-in-oceans-rivers-and-lakes.json";
            titulo = "Somente em 2019, mais de 6 Milhões de Toneladas de lixo plástico foram parar em rios, lagos e oceanos";
            subtitulo = "Rota do lixo plástico dos rios até o oceano - em Milhões de Toneladas - 2019"
            oceanos(arquivo, "dependencywheel", titulo, subtitulo);
        default:
            arquivo = "data/json/dados";
            titulo = "Visão Geral";
    };
};

function resumo(){
    $('#meuModal').modal('show'); 
    apaga_tudo();
    new Highcharts.Chart({
        chart: {
            renderTo: 'modal-chart',
            type: 'sankey',
            height: 600,
            marginBottom: 70,
        },
        dataLabels:{
            padding: 0,
            distance: 0,
        },
        credits: {
            enabled: false
        },
        title: {
            text: "Diagrama de Fluxo de produção, consumo e descarte de plástico em 2019",
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: "Quantidades em Milhões de Toneladas"
        },
        series: [{
            name: 'Produção, Consumo e Descarte de Plástico',
            clip: false,
            minLinkWidth: 5,
            // dataLabels: {
            //     nodeFormatter: function() {
            //         const point = this.point;
            //         return point.name + '<br>' + Math.round(point.sum,2)
            //     }
            // },
            keys: ['from', 'to', 'weight'],
            data: [
                ["Plásticos de <br>combustíveis<br>fósseis","Plástico<br>primário",429],
                ["Bioplásticos","Plástico<br>primário",2.32],
                ["Plástico<br>primário","Vazamento de microplástico",2.7],
                ["Plástico<br>primário","Plástico em uso",430.64],
                ["Plástico em uso","Vazamento de atividades marinhas",0.3],
                ["Vazamento de microplástico","Lixo plástico",2.7],
                ["Vazamento de atividades marinhas","Lixo plástico",0.3],
                ["Plástico em uso","Lixo plástico",346.5],
                ["Plástico secundário","Plástico em uso",29.1],
                ["Lixo plástico","Mal administrado",79.4],
                ["Mal administrado","Vazamento<br>aquático",6.1],
                ["Mal administrado","Vazamento<br>terrestre",13],
                ["Mal administrado","Queima a<br>céu aberto",26],
                ["Mal administrado","Lixões",34],
                ["Lixo plástico","Incinerado",67.3],
                ["Lixo plástico","Aterro",173.8],
                ["Resíduo da reciclagem","Lixo plástico",26],
                ["Vazamento<br>aquático","Lixo da costa<br>para o oceano",0.3],
                ["Lixo plástico","Coletado para<br>reciclagem",55],
                ["Coletado para<br>reciclagem","Subproduto",32.8],
                ["Subproduto","Perdas no<br>processamento",3.9],
                ["Subproduto","Plástico secundário",29.1],
                ["Coletado para<br>reciclagem","Resíduo da reciclagem",22.2],
                ["Perdas no<br>processamento","Resíduo da reciclagem",3.9],
                ["Vazamento<br>aquático","Plásticos no fundo<br>de rios e lagos",3.1],
                ["Plásticos flutuando<br>em rios","Estoque acumulado<br>de plásticos em<br>rios e lagos",1.3],
                ["Plásticos flutuando<br>em rios","Transporte para<br>o oceano",1.4],
                ["Transporte para<br>o oceano","Plásticos flutuando<br>próximo ao litoral",1.5],
                ["Transporte para<br>o oceano","Plásticos no fundo<br>do oceano",0.2],
                ["Transporte para<br>o oceano","Plásticos flutuando<br>em alto mar",0.1],
                ["Lixo da costa<br>para o oceano","Transporte para<br>o oceano",0.3],
                ["Vazamento<br>aquático","Plásticos flutuando<br>em rios",2.7],
                ["Vazamento<br>aquático","Lixo da costa<br>para o oceano",0.3],
                ["Plásticos no fundo<br>de rios e lagos","Estoque acumulado<br>de plásticos em<br>rios e lagos",3.1],
                ["Estoque acumulado<br>de plásticos em<br>rios e lagos",,109],
                ["Plásticos flutuando<br>próximo ao litoral","Estoque acumulado<br>de plásticos<br>no oceano",1.5],
                ["Plásticos no fundo<br>do oceano","Estoque acumulado<br>de plásticos<br>no oceano",0.2],
                ["Plásticos flutuando<br>em alto mar","Estoque acumulado<br>de plásticos<br>no oceano",0.1],
                ["Estoque acumulado<br>de plásticos<br>no oceano",,30]
            ],
            nodes: [
                { 
                    id: "Plásticos de <br>combustíveis<br>fósseis",
                    column: 0 
                },
                { 
                    id: "Bioplásticos",
                    column: 0
                },
                {
                    id: "Plástico<br>primário",
                    column: 1,
                    offsetVertical: -30
                },
                {
                    id: "Plástico secundário",
                    column: 2,
                    offsetVertical: 230,
                    offsetHorizontal: -50
                },
                {
                    id: "Plástico em uso",
                    column: 3,
                    offsetVertical: 20
                },
                {
                    id: "Resíduo da reciclagem",
                    column: 4,
                    offsetVertical: 200,
                },
                {
                    id: "Vazamento de microplástico",
                    column: 3,
                    offsetVertical: -20,
                    offsetHorizontal: 50
                },
                {
                    id: "Vazamento de atividades marinhas",
                    column: 4,
                    offsetVertical: -220,
                    offsetHorizontal: -20
                },
                {
                    id: "Vazamento<br>aquático",
                    offsetVertical: -80
                },
                {
                    id: "Vazamento<br>terrestre",
                    offsetVertical: -30
                },
                {
                    id: "Subproduto",
                    offsetVertical: 100
                },
                {
                    id: "Queima a<br>céu aberto",
                    offsetVertical: -10
                },
                {
                    id: "Perdas no<br>processamento",
                    offsetVertical: 130
                },             
                {
                    id: "Lixo da costa<br>para o oceano",
                    offsetVertical: -120
                },
                {
                    id: "Plásticos flutuando<br>em rios",
                    offsetVertical: -80
                },
                {
                    id: "Transporte para<br>o oceano",
                    offsetVertical: -150,
                    offsetHorizontal: 30
                },
                {
                    id: "Estoque acumulado<br>de plásticos em<br>rios e lagos",
                    offsetVertical: 150,
                    offsetHorizontal: 40
                },
                {
                    id: "Plásticos flutuando<br>próximo ao litoral",
                    offsetVertical: -140
                },
                {
                    id: "Plásticos no fundo<br>do oceano",
                    offsetVertical: -40
                },
                {
                    id: "Plásticos flutuando<br>em alto mar",
                    offsetVertical: 20
                },
                
                
                
                
                
                "Estoque acumulado<br>de plásticos<br>no oceano",
            ],
        }],
    });
};

function inicio(){
    apaga_tudo();
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Introdução</h4>\
                <p>O plástico é um polímero sintético, leve, resistente e durável, e que traz inovações para o desenvolvimento da sociedade.</p>\
                <p>A versatilidade, o baixo custo e a estabilidade do plástico diante dos processos naturais de degradação o tornaram onipresente no mundo, porém esses mesmos atributos o transformam em um grande agente poluidor.</p>\
                <p>Neste projeto é possível visualizar o crescimento da demanda global por plásticos e como esse aumento afeta o homem e o meio ambiente.</p>\
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
            label: {
                enabled: false
            },
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
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>O Aumento da Produção</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Mais e mais plásticos</h4>\
                <ul>\
                    <li>O uso global de plásticos está crescendo fortemente, com quase 460 milhões de toneladas produzidas em 2019.</li>\
                    <li>Mais da metade de todo o plástico foi produzido a partir do ano 2000.</li>\
                    <li>A produção mais do que triplicou nos últimos 30 anos.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            zoomType: 'xy',
            renderTo: 'chart',
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
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
                            radius: 6
                        }
                    }
                }
            }
        },
        xAxis: {
            title: {
                text: "Anos",
            },
            labels: {
                step: 5
            },
            crosshair: true
        },
        yAxis:{
            title: {
                text: "Quantidade",
            }
        },
        series: [{
            label: {
                enabled: false
            }
        }],
    };

    $.getJSON(arquivo, function (data) {
        var ano = data.map(x => x.year);
        var valor = data.map(x => x.value);
        options.xAxis.categories = ano;
        options.series[0].data = valor;
        options.series[0].name = "Todos os países"
        new Highcharts.Chart(options);
    });
};

function primario_secundario(arquivo, titulo, subtitulo, tipo, tempo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>Quanto se produz de plástico reciclado?</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">A produção secundária está crescendo</h4>\
                <ul>\
                    <li>A produção de plásticos secundários mais do que quadruplicou nas últimas duas décadas, de aproximadamente 6,7 Milhões de Toneladas em 2000 para 29,1 Milhões de Toneladas em 2019.</li>\
                    <li>Entretanto, continua pequena em comparação com a produção de plásticos primários representando apenas pouco mais de 6% da produção total.</li>\
                    <li>Em conjunto, o crescimento contínuo da produção primária e o tamanho relativamente pequeno da produção secundária sugerem que não houve uma mudança fundamental no mercado para plásticos secundários.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    // coloca um botão para alterar o arquivo json do grafico
    var titulo = "A produção secundária está crescendo, mas representa pouco mais de 6% da produção total de plástico";
    var subtitulo = "Produção Global de Plástico Primário (virgem) e Secundário (reciclado) em Milhões de Toneladas por Década - a partir de 1990";
    if (tempo === "anos"){
        arquivo = "data/json/global-plastics-prod-by-type-decade.json";
        var tipo = "bar";
        var tempo = "decada";
        var botao = $('<input type="button" class="btn btn-sm btn-primary" value="Visualizar por Ano"/>')
    } else {
        arquivo = "data/json/global-plastics-prod-by-type.json";
        var tipo = "area";
        var tempo = "anos";
        var botao = $('<input type="button" class="btn btn-sm btn-primary" value="Visualizar por Década"/>')
    };
    botao.click( function(){
        primario_secundario(arquivo, titulo, subtitulo, tipo, tempo);
    });
    $("#postexto").append(botao);
    var options = {
        chart: {
            zoomType: 'xy',
            renderTo: 'chart',
            type: tipo
        },
        credits: {
            enabled: false,
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo,
        },
        tooltip: {
            shared: true,
        },
        xAxis: {
            categories: [],
            title: {
                text: "Ano"
            },
            labels: {
                step: 2
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 3,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [],
    };

    $.getJSON(arquivo, function(data) {
        var ano = [... new Set(data.map(x => x.year))];
        var tipos = [... new Set(data.filter(x => x.type_of_plastic != 'Total').map(x => x.type_of_plastic))];
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.type_of_plastic === tipos[i]){
                    novaserie.push(item.value);
                };
            });
            options.series.push({
                name: tipos[i],
                data: novaserie,
            });
        };
        new Highcharts.Chart(options);
    }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
};

function oceanos(arquivo, tipo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>O lixo que vai para os rios e oceanos</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Rios despejam o lixo plástico no oceano</h4>\
                <ul>\
                    <li>Como a maior parte dos plásticos chega ao oceano através dos rios por meio de um processo lento que pode levar anos ou até décadas, estima-se que 109 Milhões de Toneladas de plásticos tenham se acumulado nos rios globalmente até o momento, com 1,8 Milhão de Toneladas fluindo para o oceano em 2019.</li>\
                    <li>A limpeza desses plásticos da natureza está se tornando mais difícil e cara a cada ano, à medida que os plásticos se fragmentam em partículas cada vez menores.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
        },
        dataLabels:{
            distance: 10
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo
        },
        series: [{}],
    };
    $.getJSON(arquivo, function (data) {
        options.series[0].data = data;
        new Highcharts.Chart(options);
    });
};

function consumo_industria(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>Em que usamos todo esse plástico?</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Aplicações e polímeros mais utilizados</h4>\
                <ul>\
                    <li>Juntos, as aplicações de embalagem, construção e transporte respondem por mais de 60% do uso total de plásticos. Portanto, é aqui que podem ser obtidos os maiores ganhos ambientais, se quisermos reduzir nosso consumo de plástico.</li>\
                    <li>Não há variação significativa da porcentagem de consumo dos diferentes ramos da indústria ao longo das últimas décadas.</li>\
                    <li>As outras principais aplicações do uso de plásticos incluem têxteis, produtos de consumo doméstico e produtos não domésticos ou institucionais, eletrônicos, maquinário e pneus.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            type: 'bar',
            renderTo: 'chart'
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: [],
            title: {
                text: 'Décadas'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentagem'
            },
            labels: {
                format: '{value}%',
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                }
            }
        },
        tooltip: {
            valueSuffix: ' %'
        },
        credits: {
            enabled: false
        },
        series: [],
    };
    $.getJSON(arquivo, function (data) {
        var ano = [... new Set(data.map(x => x.year))];
        var tipos = [... new Set(data.map(x => x.plastics_applications))]
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.plastics_applications === tipos[i]){
                    novaserie.push(Math.round(item.percent*100)/100);
                };
            });
            options.series.push({
                name: tipos[i],
                data: novaserie
            });
        };
        console.log(options.series);
        new Highcharts.Chart(options);
    });
};

function consumo_regiao(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>Qual país ou região consome mais</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Um comparativo de consumo entre os países</h4>\
                <ul>\
                    <li>Estados Unidos e países europeus que fazem parte da OCDE, diminuiram suas participações mundiais no consumo global de plástico.</li>\
                    <li>Essa diminuição se dá por conta de políticas de redução de consumo e conscientização.</li>\
                    <li>Índia e China aumentaram suas participações, sendo a China, a maior produtora/consumidora de plástico no continente Asiático.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            type: 'bar',
            renderTo: 'chart'
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: [],
            title: {
                text: 'Décadas'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentagem'
            },
            labels: {
                format: '{value}%',
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                }
            }
        },
        tooltip: {
            valueSuffix: ' %'
        },
        credits: {
            enabled: false
        },
        series: [],
    };
    $.getJSON(arquivo, function (data) {
        var ano = [... new Set(data.map(x => x.year))];
        var tipos = [... new Set(data.map(x => x.country))]
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.country === tipos[i]){
                    novaserie.push(Math.round(item.percent*100)/100);
                };
            });
            options.series.push({
                name: tipos[i],
                data: novaserie
            });
        };
        new Highcharts.Chart(options);
    });
};

function descarte_regiao(arquivo, titulo, subtitulo, tempo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>Quanto produzimos de lixo</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Um comparativo do descarte entre os países/regiões</h4>\
                <ul>\
                    <li>Os maiores vilões do lixo plástico são os chamados "plásticos de uso único".</li>\
                    <li>São os que possuem a menor vida útil e consequentemente os mais descartados e que causam mais danos ao meio ambiente.</li>\
                    <li>Com o aumento do consumo destes e outros tipos de plásticos, o lixo produzido também aumenta substancialmente.</li>\
                    <li>A reciclagem, vista anteriormente como opção salvadora na diminuição do lixo plástico, como já demonstrado no tópico "Quanto se produz de plástico reciclado?"\
                    , ainda está muito longe de ser a solução efetiva do problema.</li>\
                    <li>Portanto, são necessárias políticas públicas de incentivo à economia circular, conscientização e mudança de hábitos da população</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    if (tempo === "anos"){
        arquivo = "data/json/global-waste-by-region-and-end-of-life-fate-Total-dec.json";
        var tempo = "decada";
        var botao = $('<input type="button" class="btn btn-sm btn-primary" value="Visualizar por Ano"/>')
    } else {
        arquivo = "data/json/global-waste-by-region-and-end-of-life-fate-Total.json";
        var tempo = "anos";
        var botao = $('<input type="button" class="btn btn-sm btn-primary" value="Visualizar por Década"/>')
    };
    botao.click( function(){
        descarte_regiao(arquivo, titulo, subtitulo, tempo);
    });
    $("#postexto").append(botao);
    var options = {
        chart: {
            type: 'column',
            zoomType: 'xy',
            renderTo: 'chart',
        },
        legend: {
            enabled: false
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: [],
            title: {
                text: tempo.substr(0,1).toUpperCase() + tempo.substr(1)
            },
        },
        yAxis: {
            title: {
                text: 'Quantidade (milhões de Toneladas)'
            },
            stackLabels: {
                enabled: false
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        legend: {
            layout: 'horizontal'
        },
        credits: {
            enabled: false
        },
        series: [],
    };
    $.getJSON(arquivo, function (data) {
        var ano = [... new Set(data.map(x => x.year))];
        var tipos = [... new Set(data.map(x => x.country))]
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.country === tipos[i]){
                    novaserie.push(item.value);
                };
            });
            options.series.push({
                name: tipos[i],
                data: novaserie
            });
        };
        new Highcharts.Chart(options);
    });
};

function tipo_descarte(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-secondary rounded small"><b>O que é feito do lixo plástico</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-secondary">Comparação dos diferentes destinos do lixo plástico - 2019</h4>\
                <ul>\
                    <li>Globalmente, 22% do lixo plástico é mal administrado.</li>\
                    <li>A grande maioria do lixo vai parar em aterros sanitários, incinerados ou vazando para o meio ambiente, e apenas 9% são reciclados com sucesso.</li>\
                    <li>Apesar da quantidade de lixo plástico incinerado ter aumentado nos últimos anos, essa técnica produz gases que afetam a atmosfera e agravam o efeito estufa.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
    var options = {
        chart: {
            type: 'area',
            renderTo: 'chart'
        },
        title: {
            text: titulo,
            style: {
                fontFamily: 'Arial, Helvetica, sans serif',
                fontWeight: 'bold',
            }
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {},
        yAxis: {
            labels: {
                format: '{value}%'
            },
            title: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f})<br/>',
            split: true
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                marker: {
                    enabled: false
                }
            }
        },
        series: [],
    };
    $.getJSON(arquivo, function (data) {
        var ano = [... new Set(data.map(x => x.year))];
        var tipos = [... new Set(data.map(x => x.waste_type))]
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.waste_type === tipos[i]){
                    novaserie.push(item.value);
                };
            });
            options.series.push({
                name: tipos[i],
                data: novaserie,
                label: tipos[i]
            });
        };
        new Highcharts.Chart(options);
    });
};