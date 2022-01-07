export default class RespostaModel {
    #valor: string
    #certa: boolean
    #revelada: boolean

    constructor(valor: string, certa = false, revelada = false) {
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }

    static certa(valor: string) {
        return new RespostaModel(valor, true);
    }

    static errada(valor: string) {
        return new RespostaModel(valor, false);
    }

    get valor() {
        return this.#valor
    }

    get certa() {
        return this.#certa
    }

    get revelada() {
        return this.#revelada
    }

    revelar() : RespostaModel {
        return new RespostaModel(this.#valor, this.#certa, true);
    }

    static fromObject(modelo: RespostaModel): RespostaModel {
        return new RespostaModel(modelo.valor, modelo.certa, modelo.revelada);
    }

    toObject() {
        return {
            valor: this.#valor,
            certa: this.#certa,
            revelada: this.#revelada
        }
    }
}