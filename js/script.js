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
    let item = document.createElement('div');
    item.className = 'resultado-item';

    if (situacao === "Abaixo do peso") {
        item.classList.add('imc-abaixo');
    } else if (situacao === "Peso normal") {
        item.classList.add('imc-normal');
    } else if (situacao === "Sobrepeso") {
        item.classList.add('imc-sobrepeso');
    } else if (situacao === "Obesidade grau 1") {
        item.classList.add('imc-obesidade1');
    } else if (situacao === "Obesidade grau 2") {
        item.classList.add('imc-obesidade2');
    } else {
        item.classList.add('imc-obesidade3');
    }

    item.innerHTML = `
        <p><strong>Nome:</strong> ${nome.value}</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Sexo:</strong> ${sexo.value}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Peso:</strong> ${peso.value} kg</p>
        <p><strong>Altura:</strong> ${altura.value} m</p>
        <p><strong>Situação:</strong> ${situacao}</p>
    `;

    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => {
        item.remove();
    });

    item.appendChild(deleteBtn);
    resul.appendChild(item);
    form.reset();
});



