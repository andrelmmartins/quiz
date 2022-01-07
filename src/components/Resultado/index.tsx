import Botao from '../Botao';
import styles from './Resultado.module.css';

interface ResultadoProps {
    total: number
    certas: number
}

export default function Resultado(props: ResultadoProps) {

    const percentual = Math.round((props.certas / props.total) * 100);

    return (
        <div className={styles.resultado}>
            <h1>O seu resultado foi:</h1>
            <div className={styles.pontuacao}>
                <div>{props.total}<span>Perguntas</span></div>
                <div>{props.certas}<span>Acertos</span></div>
                <div>{`${percentual}%`}<span>Percentual</span></div>
            </div>
            <Botao texto='Reiniciar Quiz' href='../' />
        </div>
    )

}