const salvarDados = async (objPessoa)=>{

    console.log(objPessoa)
    const endPoint = 'https://localhost:7039/api/Pessoa'

    try{
        const resposta = await fetch(
            endPoint,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objPessoa)
        });

        if(!resposta.ok){
           const txtErro = await resposta.text()
           throw new Error(txtErro)
        }

        const dados = await resposta.json()
        return dados;
        
    }catch(erro){
        console.log('Erro ao Cadastrar ', erro);
    }
}

const consultarPessoas = async ()=>{
    const endPoint = 'https://localhost:7039/api/Pessoa'

    try {
        return await fetch(endPoint)
        .then(resp => resp.json())
        .catch(erro => {
            return []
        })
        
    }catch (erro) {
        console.log('Erro ao Consultar ', erro);
    }
}

const excluirPessoa = async (idpessoa) => {

    const endPoint = `https://localhost:7039/api/Pessoa/${idpessoa}`;

    try {
        const resposta_status = await fetch(endPoint, {
            method: 'DELETE'
        });

        return resposta_status.ok;
    } catch (erro) {
        console.log('Erro ao excluir pessoa', erro);
        return false;
    }
}

const alterarDados = async (objPessoa)=>{

    console.log(objPessoa)
    const endPoint = `https://localhost:7039/api/Pessoa/${objPessoa.idpessoa}`;

    try{
        const resposta = await fetch(
            endPoint,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objPessoa)
        });

        if(!resposta.ok){
           const txtErro = await resposta.text()
           throw new Error(txtErro)
        }

        const dados = await resposta.json()
        return dados;
        
    }catch(erro){
        console.log('Erro ao Cadastrar ', erro);
    }
}

export {salvarDados, consultarPessoas, excluirPessoa, alterarDados}