import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './Projeto.module.css'

import Carregamento from '../../components/layout/Carregamento'
import Container from '../../components/layout/Container'

function Projeto() {

  const { id } = useParams()
  const [projeto, setProjeto] = useState([])
  const [mostraProjetoForm, setMostraProjetoForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((data) => {
        setProjeto(data)
      })
      .catch((err) => console.log(err))
    }, 300)
  }, [id])

  function toggleProjetoForm() {
    setMostraProjetoForm(!mostraProjetoForm)
  }

  return (
    <>
      {projeto.nomeP ? (
        <div className={styles.projeto_detalhes}>
          <Container customClass="column"></Container>
          <div className={styles.detalhes_container}>
            <h1>Projeto: {projeto.nomeP}</h1>

            <button className={styles.btn} onClick={toggleProjetoForm}>
              {!mostraProjetoForm ? 'Editar Projeto' : 'Fechar'}
            </button>

            {!mostraProjetoForm ? (
              <div className={styles.projeto_info}>
                <p>
                  <span>Categoria:</span> {projeto.categorias.name}
                </p>
                <p>
                  <span>Total de Orçamento:</span> {projeto.valorT}
                </p>
                <p>
                  <span>Total Utilizado:</span> R$ {projeto.cost}
                </p>
              </div>
              ) : (
                <div className={styles.projeto_info}>
                  <p>from</p>
                </div>
              )}
          </div>
        </div>
      ) : (
        <Carregamento />
      )}
    </>
  )
}

export default Projeto