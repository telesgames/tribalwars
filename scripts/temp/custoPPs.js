/**
 * Created by rmtel on 07/04/2017.
 */
var reducaoPaladino = 0;
var reducaoBandeira = 0;
var velocidadeMundo = 1;
var diasProduzindo = 4.7;

var unidades = {
    cl: {tempo: 1800, custo: 125 + 100 + 250, fator: 0.56, nome: "cl"}, //estabulo 3 -> 56%
    bb: {tempo: 1316, custo: 60  + 30  + 40, fator: 0.5, nome: "bb"} //quartel 5 -> 50%
}

var tempoProducao = diasProduzindo * (24 * 60 * 60);

function calcular(unidade) {
    var tempoRecrutamentoUnidades = unidade.tempo * unidade.fator / velocidadeMundo / (1 + reducaoBandeira + reducaoPaladino);
    var unidadesRecrutadas = tempoProducao / tempoRecrutamentoUnidades;
    var custoTotal = unidadesRecrutadas * unidade.custo;
    console.log(unidade.nome + " -> unidades: " + unidadesRecrutadas
        + " | custo: " + custoTotal
        + " | pp: " + custoTotal / 64
        + " | tempo recrutamento: " + parseInt(tempoRecrutamentoUnidades / 60) + ":" + parseInt(tempoRecrutamentoUnidades % 60));
}

calcular(unidades.cl);
calcular(unidades.bb);