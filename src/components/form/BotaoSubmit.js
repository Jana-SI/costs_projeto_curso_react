import styles from './BotaoSubmit.module.css'

function BotaoSubmit({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default BotaoSubmit