import { useNavigate } from 'react-router-dom'

import ProjetoForm from '../project/ProjetoForm'
import styles from './NovoProjeto.module.css'

function NovoProjeto() {

    const navigate = useNavigate()

    function criarPostagem(projeto) {
        // inicializa cost e serviços
        projeto.cost = 0
        projeto.servicos = []

        fetch("http://localhost:5000/projetos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // redirect
            navigate('/projetos', {state:{mensagem: 'Projeto criado com sucesso!'}})
        }).catch((err) => console.log(err))
    }

    return(
        <div className={styles.novoProjeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoForm handleSubmit={criarPostagem} btnText="Criar Projeto" />
        </div>
    )
}

export default NovoProjeto