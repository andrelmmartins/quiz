import QuestaoModel from "../../model/QuestaoModel";
import Enunciado from "../Enunciado";
import Resposta from "../Resposta";
import Temporizador from "../Temporizador";
import styles from './Questao.module.css';

const letras = [
    { valor: 'A',  cor: '#F2C866' },
    { valor: 'B',  cor: '#F266BA' },
    { valor: 'C',  cor: '#85D4F2' },
    { valor: 'D',  cor: '#BCE596' },
]

interface QuestaoProps {
    valor: QuestaoModel;
    tempoPraResposta?: number,
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {

    const questao = props.valor;

    return(
        <div className={styles.questao}>

            <div className={styles.temporizador}>
                <Temporizador key={questao.id} duracao={props.tempoPraResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
            </div>

            <div className={styles.enunciado}>
                <Enunciado texto={questao.enunciado}/>
            </div>

            <div className={styles.respostas}>
                {questao.respostas.map((resposta, i) => {
                    return <Resposta
                                valor={resposta}
                                indice={i}
                                letra={letras[i].valor}
                                corFundoLetra={letras[i].cor}
                                key={`${questao.id}-${i}`}
                                respostaFornecida={props.respostaFornecida}
                            />
                })}
            </div>
        </div>
    )

}