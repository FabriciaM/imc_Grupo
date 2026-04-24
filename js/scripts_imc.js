const formImc = document.querySelector('.formulario');
const btnCalcular = document.querySelector('#btn-calcular');
const divLista = document.querySelector('#resultado');

const pessoas = [];

btnCalcular.addEventListener('click', (e) => {
    e.preventDefault();

    const formPessoa = new FormData(formImc);

    const objPessoa = {
        nome: formPessoa.get('nome'),
        sexo: formPessoa.get('sexo'),
        dataNascimento: formPessoa.get('dataNascimento'),
        peso: parseFloat(formPessoa.get('peso')),
        altura: parseFloat(formPessoa.get('altura'))
    }
});