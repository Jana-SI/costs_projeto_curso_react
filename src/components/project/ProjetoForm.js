import BotaoSubmit from '../form/BotaoSubmit'
import Input from '../form/Input'
import Select from '../form/Select'

import styles from './ProjetoForm.module.css'

function ProjetoForm({btnText}) {
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
                text="Selecione a categoria"/>

            <BotaoSubmit text={btnText}/>
        </form>
    )
}

export default ProjetoForm