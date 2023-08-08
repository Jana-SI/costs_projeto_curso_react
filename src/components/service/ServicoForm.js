import { useState } from 'react'
import BotaoSubmit from '../form/BotaoSubmit'
import Input from '../form/Input'

import styles from '../project/ProjetoForm.module.css'

function ServicoForm({handleSubmit, btnText, projetoData}) {

    const [servico, setServico] = useState([])

    function submit(e) {
        e.preventDefault()
        projetoData.servicos.push(servico)
        handleSubmit(projetoData)
    }

    function handleChange(e) {
        setServico({...servico, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="nome"
                placeholder="Insira o nome do Serviço"
                handleOnChange={handleChange} />

            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange} />

            <Input
                type="text"
                text="Descrição do serviço"
                name="descricao"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange} />
            <BotaoSubmit text={btnText}/>
        </form>
    )
}

export default ServicoForm