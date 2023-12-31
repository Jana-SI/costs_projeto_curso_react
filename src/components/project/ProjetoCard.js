import { Link } from 'react-router-dom'
import styles from './ProjetoCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjetoCard({id, nomeP, valorT, categoria, handleRemove}) {

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.projeto_card}>
            <h4>{nomeP}</h4>
            <p>
                <span>Orçamento:</span> R$ {valorT}
            </p>
            <p className={styles.categoria_text}>
                <span className={`${styles[categoria.toLowerCase()]}`}></span> {categoria}
            </p>
            <div className={styles.projeto_card_acoes}>
                <Link to={`/projeto/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjetoCard