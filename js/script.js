 var btn = document.getElementById("btn-calcular");
 var nome = document.getElementById("nome");
 
 const data = document.getElementById("data");
 const masc = document.getElementById("masculino");
 const fem = document.getElementById("feminino");
 let resul = document.getElementById("resultado");

btn.addEventListener('click', (event) => {
    event.preventDefault(); 
    var peso = document.getElementById("peso");
    var altura = document.getElementById("altura");
    let imc = peso.value / (altura.value * altura.value);
    resul.innerHTML = ("imc: " + imc.toFixed(2));
});