import { useLocation } from "react-router-dom"

import styles from './Projetos.module.css'

import Msg from "../layout/Msg"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

function Projetos() {

    const local = useLocation()

    let msg = ''

    if(local.state){
        msg = local.state.mensagem
    }

    return(
        <div className={styles.projeto_container}>
            <div className={styles.titulo_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/novoprojeto" text="Criar projeto"/>
            </div>
            {msg && <Msg msg={msg} tipo="sucesso"/>}

            <Container customClass="start">
                <p>Projetos ...</p>
            </Container>
        </div>
    )
}

export default Projetos