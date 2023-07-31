import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from './Projetos.module.css'

import Msg from "../layout/Msg"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjetoCard from "../project/ProjetoCard"

function Projetos() {

  const [projetos, setProjetos] = useState([])

  const local = useLocation()

  let msg = ''

  if (local.state) {
    msg = local.state.mensagem
  }

  useEffect(() => {
    fetch('http://localhost:5000/projetos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setProjetos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={styles.projeto_container}>
      <div className={styles.titulo_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar projeto" />
      </div>
      {msg && <Msg msg={msg} tipo="sucesso" />}

      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjetoCard 
              id={projeto.id}
              nomeP={projeto.nomeP}
              valorT={projeto.valorT}
              categoria={projeto.categorias.name}
              key={projeto.id}/>
          ))}
      </Container>
    </div>
  )
}

export default Projetos