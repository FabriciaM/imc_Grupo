import { salvarDados , consultarPessoas, excluirPessoa, alterarDados} from "./scriptAPI.js";

const formImc = document.querySelector('.formulario');
const btnCalcular = document.querySelector('#btn-calcular');
const divLista = document.querySelector('#resultado');

let pessoas = [];

btnCalcular.addEventListener('click', async (e) => {
    e.preventDefault();

    const formPessoa = new FormData(formImc);

    const objPessoa = {
        nome: formPessoa.get('nome'),
        sexo: formPessoa.get('sexo'),
        dataNascimento: formPessoa.get('dataNascimento'),
        peso: parseFloat(formPessoa.get('peso')),
        altura: parseFloat(formPessoa.get('altura'))
    }

    if(sessionStorage.getItem('objPessoa') == null){ 
        cadastroPessoa(objPessoa)
    }else{
        alert('alterar em desenvolvimento');
    }

    
        formImc.reset();
        listarPessoas();
    
    
});

const listarPessoas = async () => {
    divLista.innerHTML = '';

    pessoas = await consultarPessoas();

    pessoas.forEach(pessoa => {
        const item = document.createElement('div');
        item.className = 'resultado-item';

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const situacao = calcularSituacao(pessoa.peso, pessoa.altura);

        if (situacao === 'Abaixo do peso') {
            item.classList.add('imc-abaixo');
        } else if (situacao === 'Peso normal') {
            item.classList.add('imc-normal');
        } else if (situacao === 'Sobrepeso') {
            item.classList.add('imc-sobrepeso');
        } else if (situacao === 'Obesidade grau 1') {
            item.classList.add('imc-obesidade1');
        } else if (situacao === 'Obesidade grau 2') {
            item.classList.add('imc-obesidade2');
        } else {
            item.classList.add('imc-obesidade3');
        }

        item.innerHTML = `
            <p><strong>Nome:</strong> ${pessoa.nome}</p>
            <p><strong>Sexo:</strong> ${pessoa.sexo}</p>
            <p><strong>Data de Nascimento:</strong> ${new Date(pessoa.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Peso:</strong> ${pessoa.peso} kg</p>
            <p><strong>Altura:</strong> ${pessoa.altura} m</p>
            <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
            <p><strong>Idade:</strong> ${calcularIdade(pessoa.dataNascimento)} anos</p>
            <p><strong>Situação:</strong> ${situacao}</p>
        `;
        divLista.appendChild(item);
        
        //btn excluir
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', async () => {
            if (!confirm(`Deseja excluir ${pessoa.nome}?`)) {
                return;
            }

            const removido = await excluirPessoa(pessoa.idpessoa);
            if (removido) {
                item.remove();
            } 
        });
        item.appendChild(deleteBtn);

        const alterar = document.createElement('button');
        alterar.type = 'button';
        alterar.className = 'alterar-btn';
        alterar.textContent = 'Alterar';
        alterar.addEventListener('click', () => {
            carregaForm(pessoa);
        });
        item.appendChild(alterar);
    });
}

//calcular o IMC
const calcularIMC = (peso, altura) => {
    return peso / (altura * altura);
}

/* CALCULO DA IDADE */
    const calcularIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        return hoje.getFullYear() - nascimento.getFullYear();
    };

    const calcularSituacao = (peso, altura) => {
        const imc = calcularIMC(peso, altura);
        if (imc < 18.5){
            return "Abaixo do peso";
        } else if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        } else if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        } else if (imc >= 30 && imc < 34.9) {
            return "Obesidade grau 1";
        } else if (imc >= 35 && imc < 39.9) {
            return "Obesidade grau 2";
        } else {
            return "Obesidade grau 3";
        }
    }

    const carregaForm = (objPessoa) => {
        document.querySelector('#nome').value = objPessoa.nome;
        objPessoa.sexo === 'masculino' ? document.querySelector('#masculino').checked = true : document.querySelector('#feminino').checked = true;
        document.querySelector('#dataNascimento').value = objPessoa.dataNascimento;
        document.querySelector('#peso').value = objPessoa.peso;
        document.querySelector('#altura').value = objPessoa.altura;
    }

    const cadastroPessoa = async (objPessoa) => {
        const resultadoSalvar = await salvarDados(objPessoa);
    
        return resultadoSalvar;

    }

        const alterarPessoa = async (objPessoa) => {
        const resultadoAlterar = await alterarDados(objPessoa);
    
        return resultadoAlterar;

    }
    

listarPessoas();