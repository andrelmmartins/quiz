import questoes from '../bancoDeQuestoes';

export default function API(request, response) {
    
    if(request.method === "GET") {

        const idSelecionado =  +request.query.id;
        const questao = questoes.filter(questao => questao.id === idSelecionado);

        if(questao.length === 1) return response.status(200).json(questao[0].respostasEmbaralhadas().toObject());
        else return response.status(204).send();

    } else return response.status(405).json({error: "Método não aceito!"})

}