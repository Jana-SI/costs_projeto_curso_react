import { useLocation } from "react-router-dom"
import Msg from "../layout/Msg"

function Projetos() {

    const local = useLocation()

    let msg = ''

    if(local.state){
        msg = local.state.mensagem
    }

    return(
        <div>
            <h1>Meus Projetos</h1>
            {msg && <Msg msg={msg} tipo="sucesso"/>}
        </div>
    )
}

export default Projetos