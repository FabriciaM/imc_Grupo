 const btn = document.getElementById("btn-calcular");

btn.addEventListener ('click', () => {
    const nome = document.getElementById("nome");
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const data = document.getElementById("data");
    const masc = document.getElementById("masculino");
    const fem = document.getElementById("feminino");
    const resul = document.getElementById("resultado");
    
    const imc = peso / (altura * altura);
    resul.innerHTML = (`O imc é: ${imc}`);
});