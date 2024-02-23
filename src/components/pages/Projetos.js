import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from './Projetos.module.css'

import Msg from "../layout/Msg"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import Carregamento from "../layout/Carregamento"

import ProjetoCard from "../project/ProjetoCard"

function Projetos() {

  const [projetos, setProjetos] = useState([])
  const [removeCarregamento, setRemoveCarregamento] = useState(false)
  const [projetoMsg, setProjetoMsg] = useState('')

  const local = useLocation()

  let msg = ''

  if (local.state) {
    msg = local.state.mensagem
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('https://db-costs-57f16-default-rtdb.firebaseio.com/projetos.json').then((resp) => resp.json())
        .then((data) => {

          // Convertendo os objetos em um array com o ID do Firebase
          const projetosArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setProjetos(projetosArray);
          setRemoveCarregamento(true)
        })
        .catch((err) => console.log(err))
    }, 300)
  }, [])

  function removeProjeto(id) {
    console.log(id)
    fetch(`https://db-costs-57f16-default-rtdb.firebaseio.com/projetos/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then((resp) => resp.json())
      .then(() => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id))
        setProjetoMsg('Projeto removido com sucesso!')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.projeto_container}>
      <div className={styles.titulo_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar projeto" />
      </div>

      {msg && <Msg msg={msg} tipo="sucesso" />}
      {projetoMsg && <Msg msg={projetoMsg} tipo="sucesso" />}

      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto, index) => (
            <ProjetoCard
              id={`${projeto.id}-${index}`}  // Use o índice como parte do ID
              nomeP={projeto.nomeP}
              valorT={projeto.valorT}
              categoria={projeto.categorias.name}
              key={`${projeto.id}-${index}`}  // Use o índice como parte da chave
              handleRemove={removeProjeto}
            />
          ))}

        {!removeCarregamento && <Carregamento />}
        {removeCarregamento && projetos.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  )
}

export default Projetos