import questoes from "../bancoDeQuestoes";
import { embaralhar } from "../../../functions/arrays";

export default function API(request, response) {
    
    if(request.method === "GET") {

        return response.status(200).json(embaralhar(questoes).map(questao => questao.id))

    } else return response.status(405).json({error: "Método não aceito!"})


}