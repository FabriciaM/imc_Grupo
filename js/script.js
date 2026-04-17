
var btn = document.getElementById("btn-calcular");
var nome = document.getElementById("nome");
let form = document.querySelector(".formulario");
const data = document.getElementById("data");
let resul = document.getElementById("resultado");

btn.addEventListener('click', (event) => {
    event.preventDefault();
    
    /* seleção dos campos */
    var peso = document.getElementById("peso");
    var altura = document.getElementById("altura");

    // Obter o valor do sexo selecionado
    let sexo = document.querySelector('input[name="sexo"]:checked');

    // Validar se todos os campos foram preenchidos
    if (nome.value === "" || peso.value === "" || altura.value === "" || data.value === "" || !sexo) {
        alert("Preencha todos os campos.");
        return;
    }

    /* CALCULO DO IMC */
    let imc = peso.value / (altura.value * altura.value);

    /* CALCULO DA IDADE */
    var hoje = new Date();
    var nascimento = new Date(data.value);
    var idade = hoje.getFullYear() - nascimento.getFullYear();

    // Determinar situação baseada no IMC
    let situacao;
    if (imc < 18.5){
        situacao = "Abaixo do peso"; 
    } else if (imc >= 18.5 && imc < 24.9) {
        situacao = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        situacao = "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
        situacao = "Obesidade grau 1";
    }
    else if (imc >= 35 && imc < 39.9) {
        situacao = "Obesidade grau 2";
    }
    else {
        situacao = "Obesidade grau 3";
    }
    
    /* EXIBIÇÃO DOS RESULTADOS */
    resul.innerHTML += `<br>Nome: ${nome.value} -- IMC: ${imc.toFixed(2)} -- Sexo: ${sexo.value} -- Idade: ${idade} anos -- Peso: ${peso.value} kg -- Altura: ${altura.value} m -- Situação: ${situacao}`;
    form.reset();
});


