import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './Projeto.module.css'

import Carregamento from '../layout/Carregamento'
import Container from '../layout/Container'
import Msg from '../layout/Msg'

import ProjetoForm from '../project/ProjetoForm'
import ServicoForm from '../service/ServicoForm'
import ServicoCard from '../service/ServicoCard'

function Projeto() {

  const { id } = useParams()
  const [projeto, setProjeto] = useState([])
  const [servicos, setServicos] = useState([])
  const [mostraProjetoForm, setMostraProjetoForm] = useState(false)
  const [mostraServicoForm, setMostraServicoForm] = useState(false)
  const [msg, setMsg] = useState()
  const [tipo, setTipo] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://db-costs-57f16-default-rtdb.firebaseio.com/projetos/${id}.json`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
      },
      }).then((resp) => resp.json())
        .then((data) => {
          setProjeto(data)
          setServicos(data.servicos)
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

    fetch(`https://db-costs-57f16-default-rtdb.firebaseio.com/projetos/${id}`, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*'
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
    fetch(`https://db-costs-57f16-default-rtdb.firebaseio.com/projetos/${projeto.id}`, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*'
    },
      body: JSON.stringify(projeto),
    }).then((resp) => resp.json())
      .then((data) => {
        setMostraServicoForm(false)
      })
      .catch((err) => console.log(err))

  }

  function removeServico(id, cost){

    const servicosAtualizar = projeto.servicos.filter(
      (servico) => servico.id !== id
    )

    const projetoAtualizar = projeto
    
    projetoAtualizar.servicos = servicosAtualizar

    projetoAtualizar.cost = parseFloat(projetoAtualizar.cost) - parseFloat(cost)

     // atualizacao do projeto
     fetch(`https://db-costs-57f16-default-rtdb.firebaseio.com/projetos/${projetoAtualizar.id}`, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*'
    },
      body: JSON.stringify(projetoAtualizar),
    }).then((resp) => resp.json())
      .then((data) => {
        setProjeto(projetoAtualizar)
        setServicos(servicosAtualizar)
        setMsg('Serviço removido com sucesso!')
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
                  <p>
                    <span>Restante do orçamento:</span> R$ {projeto.valorT - projeto.cost}
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
                {servicos.length > 0 && 
                  servicos.map((servico) =>(
                    <ServicoCard 
                      id={servico.id}
                      nome={servico.nome}
                      cost={servico.cost}
                      descricao={servico.descricao}
                      key={servico.id}
                      handleRemove={removeServico} />
                  ))
                }
                {servicos.length === 0 && <p>Não há serviços cadastrados.</p>}
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