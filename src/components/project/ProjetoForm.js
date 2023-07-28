import { useEffect, useState } from 'react'

import BotaoSubmit from '../form/BotaoSubmit'
import Input from '../form/Input'
import Select from '../form/Select'

import styles from './ProjetoForm.module.css'

function ProjetoForm({ handleSubmit, btnText, projetoData}) {

    const [categorias, setCategorias] = useState([])

    const [projeto, setProjeto] = useState(projetoData || {})

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

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(projeto)
    }

    function handleChange(e) {
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleCategoria(e) {
        setProjeto({
            ...projeto, 
            categorias: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nomeP"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange} 
                value={projeto.nomeP ? projeto.nomeP:''}/>

            <Input 
                type="number"
                text="Orçamento do projeto"
                name="valorT"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange} 
                value={projeto.valorT ? projeto.valorT:''}/>

            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categorias}
                handleOnChange={handleCategoria}
                value={projeto.categorias ? projeto.categorias.id:''}/>

            <BotaoSubmit text={btnText}/>
        </form>
    )
}

export default ProjetoForm