import { useState, useEffect } from 'react'

import styles from './Msg.module.css'

function Msg({ tipo, msg }) {

    const [visivel, setVisivel] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisivel(false)
            return
        }

        setVisivel(true)

        const timer = setTimeout(() => {
            setVisivel(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
            {visivel && (
                <div className={`${styles.msg} ${styles[tipo]}`}>{msg}</div>
            )}
        </>
    )
}

export default Msg