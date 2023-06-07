$( document ).ready(function() {
    inicio();
});

function apaga_tudo(){
    $("#opcoes").html("");
    $("#fatos").html("");
    $("#topico").html("");
    $("#chart").html("");
    $("#postexto").html("");
    $("#visualizacao").val("");
};

function atualiza_grafico() {
    var visualizacao = $("#visualizacao").val();

    switch (visualizacao){
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
            arquivo = "data/json/global-plastics-prod-by-app-and-polymer-dec.json";
            titulo = "Qual o setor da indústria que utiliza a maior quantidade";
            subtitulo = "Consumo Global de Plástico em Milhões de Toneladas por Década - 1990 a 2019"
            grafico_sankey_chord(arquivo, "sankey", titulo, subtitulo);
            break;
        case "local":
            arquivo = "data/json/global-plastics-prod-by-region-dec.json";
            titulo = "Comparação de consumo entre as regiões ou países";
            subtitulo = "Porcentagem do Consumo Global de Plástico por Década por Região/País - 1990 a 2019"
            consumo_regiao(arquivo, titulo, subtitulo);
            break;
        case "descarte":
            arquivo = "data/json/global-waste-by-region-and-end-of-life-fate-Total.json";
            titulo = "Cada vez mais usados e cada vez mais descartados";
            subtitulo = "Quantidade total de resíduos por país/região por década (sem contabilizar reciclados e coletados)- em Milhões de Toneladas - décadas de 2000 e 2010"
            descarte_regiao(arquivo, titulo, subtitulo);
            break;
        default:
            arquivo = "data/json/dados";
            titulo = "Visão Geral";
    };
};

function inicio(){
    apaga_tudo();
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">Introdução</h4>\
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
    $("#topico").html('<p class="p-2 text-white bg-success rounded small"><b>O Aumento da Produção</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">Mais e mais plásticos</h4>\
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
        xAxis: {
            title: {
                text: "Anos",
            },
        },
        yAxis:{
            title: {
                text: "Quantidade",
            }
        },
        series: [{}],
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
    $("#topico").html('<p class="p-2 text-white bg-success rounded small"><b>Quanto se produz de plástico reciclado?</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">A produção secundária está crescendo</h4>\
                <ul>\
                    <li>A produção de plásticos secundários mais do que quadruplicou nas últimas duas décadas, de aproximadamente 6,7 Milhões de Toneladas em 2000 para 29,1 Milhões de Toneladas em 2019.</li>\
                    <li>Entretanto, continua pequena em comparação com a produção de plásticos primários representando apenas pouco mais de 6% da produção total.</li>\
                    <li>Em conjunto, o crescimento contínuo da produção primária e o tamanho relativamente pequeno da produção secundária sugerem que não houve uma mudança fundamental no mercado para plásticos secundários.</li>\
                    <li>Definir metas de conteúdo reciclado e investir em tecnologias de reciclagem aprimoradas pode ajudar a tornar os mercados secundários mais competitivos e lucrativos.</li>\
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
        var tempo = "area";
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
                fontWeight: 'normal',
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
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 5,
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
        var tipos = [... new Set(data.map(x => x.type_of_plastic))];
        options.xAxis.categories = ano;
        for (var i=0; i<tipos.length; i++){
            var novaserie = [];
            $.each(data, function(j, item){
                if (item.type_of_plastic === tipos[i]){
                    novaserie.push(item.value);
                };
            });
            if (options.chart.type === "bar"){
                etiquetas = {enabled: true};
            } else {
                etiquetas = {enabled: false};
            }
            options.series.push({
                name: tipos[i],
                data: novaserie,
                dataLabels: etiquetas
            });
        };
        new Highcharts.Chart(options);
    }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
};

function grafico_sankey_chord(arquivo, tipo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-success rounded small"><b>Em que usamos todo esse plástico?</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">Aplicações e polímeros mais utilizados</h4>\
                <ul>\
                    <li>Juntos, as aplicações de embalagem, construção e transporte respondem por mais de 60% do uso total de plásticos. Portanto, é aqui que podem ser obtidos os maiores ganhos ambientais, se quisermos reduzir nosso consumo de plástico.</li>\
                    <li>As outras principais aplicações do uso de plásticos incluem têxteis, produtos de consumo doméstico e produtos não domésticos ou institucionais, eletrônicos, maquinário e pneus.</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
   
    const labels = ['Polímeros', 'Décadas', 'Indústria'];

    var options = {
        chart: {
            renderTo: 'chart',
            type: tipo,
            spacingBottom: 50,
            events: {
            render: function() {
                const positions = [30, this.chartWidth / 2, this.chartWidth - 30];

                if (this.customLabels) {
                this.customLabels.forEach((customLabel, i) => {
                    customLabel.attr({
                    x: positions[i],
                    y: this.chartHeight - 20
                    });
                });
                } else {
                this.customLabels = [];
                labels.forEach((label, i) => {
                    this.customLabels.push(
                    this.renderer.text(labels[i])
                    .attr({
                        x: positions[i],
                        y: this.chartHeight - 20,
                        align: 'center'
                    })
                    .css({
                        fontSize: '12px',
                    })
                    .add()
                    );
                });
                }
            }
            }
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
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. De {point.from} para {point.to}: {point.weight}.'
            }
        },
        series: [{}],
    };

    $.getJSON(arquivo, function (data) {
        options.series[0].data = data;
        new Highcharts.Chart(options);
    });
};

function consumo_regiao(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-success rounded small"><b>Qual país ou região consome mais</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">Um comparativo de consumo entre os países</h4>\
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
            text: titulo
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

function descarte_regiao(arquivo, titulo, subtitulo){
    apaga_tudo();
    $("#topico").html('<p class="p-2 text-white bg-success rounded small"><b>Como é o descarte do plástico consumido</b></p>');
    $("#fatos").html(
        '<div class="row">\
            <div class="col">\
                <h4 class="text-success">Um comparativo do descarte entre os países/regiões</h4>\
                <ul>\
                    <li>Os maiores vilões do lixo plástico são os chamados "plásticos de uso único".</li>\
                    <li>São os que possuem a menor vida útil e consequentemente os mais descartados e que causam mais danos ao meio ambiente.</li>\
                    <li>Com o aumento do consumo destes e outros tipos de plásticos, o lixo produzido também aumenta substancialmente.</li>\
                    <li>A reciclagem, vista anteriormente como salvadora na diminuição do lixo plástico, como já demonstrado no tópico "Quanto se produz de plástico reciclado?"\
                    , ainda está muito longe de ser a solução efetiva do problema.</li>\
                    <li>Aqui, cabe políticas públicas de incentivo à economia circular, conscientização e mudança de hábitos da população</li>\
                </ul>\
            </div>\
        </div>'
    ).hide().slideDown(1000);
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
            text: titulo
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: [],
            title: {
                text: 'Décadas'
            },
        },
        yAxis: {
            title: {
                text: 'Quantidade (milhões de Toneladas)'
            },
            stackLabels: {
                enabled: true
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
