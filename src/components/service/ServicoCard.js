import styles from '../project/ProjetoCard.module.css'

import { BsFillTrashFill } from "react-icons/bs";

function ServicoCard({ id, nome, cost, descricao, key, handleRemove }) {

const remove = (e) =>{

}

    return (
        <div className={styles.projeto_card}>
            <h4>{nome}</h4>
            <p>
                <span>Custo total:</span> R$ {cost}
            </p>
            <p>{descricao}</p>
            <div className={styles.projeto_card_acoes}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServicoCard