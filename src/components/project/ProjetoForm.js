import { useEffect, useState } from 'react'

import BotaoSubmit from '../form/BotaoSubmit'
import Input from '../form/Input'
import Select from '../form/Select'

import styles from './ProjetoForm.module.css'

function ProjetoForm({btnText}) {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/categorias", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategorias(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <form className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nomeP"
                placeholder="Insira o nome do projeto" />

            <Input 
                type="number"
                text="Orçamento do projeto"
                name="valorT"
                placeholder="Insira o orçamento total" />

            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categorias}/>

            <BotaoSubmit text={btnText}/>
        </form>
    )
}

export default ProjetoForm