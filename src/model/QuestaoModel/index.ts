import { embaralhar } from "../../functions/arrays"
import RespostaModel from "../RespostaModel"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#acertou = acertou
        this.#respostas = respostas
    }

    get id() {
        return this.#id;
    }

    get enunciado() {
        return this.#enunciado;
    }

    get acertou() {
        return this.#acertou;
    }

    get respostas() {
        return this.#respostas;
    }

    get naoRespondida() {
        return !this.respondida;
    }

    get respondida() {
        for( let resposta of this.#respostas) {
            if(resposta.revelada) return true;
        }

        return false;
    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa;
        const respostas = this.#respostas.map((resposta, i) => {
            let deveRevelar = indice === i // resposta.certa;
            return deveRevelar ? resposta.revelar() : resposta;
        })

        return new QuestaoModel(this.#id, this.#enunciado, respostas, acertou);
    }

    respostasEmbaralhadas(): QuestaoModel {
        return new QuestaoModel(this.#id, this.#enunciado, embaralhar(this.#respostas), this.#acertou)
    }

    static fromObject(modelo: QuestaoModel): QuestaoModel {
        const respostas = modelo.respostas.map(resposta => RespostaModel.fromObject(resposta));
        return new QuestaoModel(modelo.id, modelo.enunciado, respostas, modelo.acertou);
    }

    toObject() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            acertou: this.#acertou,
            respondida: this.respondida,
            respostas: this.#respostas.map(resposta => resposta.toObject())
        }
    }
}