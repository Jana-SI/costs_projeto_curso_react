import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Projeto.module.css'

import Carregamento from '../layout/Carregamento'
import Container from '../layout/Container'
import Msg from '../layout/Msg'

import ProjetoForm from '../project/ProjetoForm'
import ServicoForm from '../service/ServicoForm'

function Projeto() {

  const { id } = useParams()
  const [projeto, setProjeto] = useState([])
  const [mostraProjetoForm, setMostraProjetoForm] = useState(false)
  const [mostraServicoForm, setMostraServicoForm] = useState(false)
  const [msg, setMsg] = useState()
  const [tipo, setTipo] = useState()

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

  function toggleServicoForm() {
    setMostraServicoForm(!mostraServicoForm)
  }

  function editPost(projeto) {

    setMsg('')

    if (projeto.valorT < projeto.cost) {
      setMsg('O orçamento não pode ser menor que o custo do projeto!')
      setTipo('erro')
      return false
    }

    fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    }).then((resp) => resp.json())
      .then((data) => {
        setProjeto(data)
        setMostraProjetoForm(false)

        setMsg('Projeto atualizado!')
        setTipo('sucesso')
      })
      .catch((err) => console.log(err))
  }

  function criarServico() {

    setMsg('')
    
    const ultimoServico = projeto.servicos[projeto.servicos.length - 1]

    ultimoServico.id = uuidv4()

    const ultimoServicoCost = ultimoServico.cost

    const novoCost = parseFloat(projeto.cost) + parseFloat(ultimoServicoCost)

    if(novoCost > parseFloat(projeto.valorT)){
      setMsg('Orçamento ultrapassado, verifique o valor do serviço')
      setTipo('erro')
      projeto.servicos.pop()
      return 
    }

    // add de serviço 
    projeto.cost = novoCost

    // atualizacao do projeto
    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))

  }

  return (
    <>
      {projeto.nomeP ? (
        <div className={styles.projeto_detalhes}>
          <Container customClass="column">

            {msg && <Msg tipo={tipo} msg={msg} />}

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
                  <ProjetoForm
                    handleSubmit={editPost} btnText="Concluir edição" projetoData={projeto} />
                </div>
              )}
            </div>

            <div className={styles.servico_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServicoForm}>
                {!mostraServicoForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.projeto_info}>
                {mostraServicoForm && (
                  <ServicoForm
                    handleSubmit={criarServico}
                    btnText="Adicionar Serviço"
                    projetoData={projeto}/>
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
                <p>Itens de serviço</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Carregamento />
      )}
    </>
  )
}

export default Projeto