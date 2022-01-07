import RespostaModel from "../../model/RespostaModel";
import styles from './Resposta.module.css';

interface RespostaProps{
    valor: RespostaModel,
    indice: number,
    letra : string,
    corFundoLetra : string,
    respostaFornecida: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {

    const resposta = props.valor;
    const { indice, letra, corFundoLetra } = props;
    const classe = resposta.revelada ? resposta.certa ? `${styles.resposta} ${styles.acertou}` : `${styles.resposta} ${styles.errou}` : `${styles.resposta}`;

    return (
        <div className={classe} onClick={() => props.respostaFornecida(indice)}>
            <div className={styles.card}>
                <span style={{background: corFundoLetra}}>{letra}</span>
                <h3>{resposta.valor}</h3>
            </div>
        </div>
    )
}