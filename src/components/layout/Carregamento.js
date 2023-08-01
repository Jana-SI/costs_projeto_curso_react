import styles from './Carregamento.module.css'

import loading from '../../img/loading.svg'

function Carregamento() {
    return(
        <div className={styles.carregamento_container}>
            <img className={styles.carregamento} src={loading} alt="loading" />
        </div>
    )
}

export default Carregamento