import { useParams } from 'react-router-dom'
import styles from './Projeto.module.css'
import { useEffect, useState } from 'react'

function Projeto() {

  const { id } = useParams()
  const [projeto, setProjeto] = useState([])

  useEffect(() => {
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
  }, [id])

  return (
    <div>
      {projeto && (
        <p>Projeto {projeto.nomeP}</p>
      )}
    </div>
  )
}

export default Projeto