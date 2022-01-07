import Head from "next/head";
import { useState, useEffect } from "react";
import QuestaoModel from "../model/QuestaoModel";
import Questionario from "../components/Questionario";
import { useRouter } from "next/router";

const BASE_URL = 'http://localhost:3000/api';

export default function Home() {

  const router = useRouter();

  const [questao, setQuestao] = useState(null);
  const [idsDasQuestoes, setIdsDasQuestoes] = useState([]);
  const [respostasCertas, setRespostasCertas] = useState(0);
  const [isUltimaPergunta, setIsUltimaPergunta] = useState(false);

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questoes`)
    const idsDasQuestoes = await resp.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(id: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const questao = await resp.json();
    
    setQuestao(QuestaoModel.fromObject(questao));

  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes]);

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida);
    setRespostasCertas(respostasCertas + (questaoRespondida.acertou ? 1 : 0));
  }

  function irPraProximoPasso() {
    const proximoId = idsDasQuestoes[idsDasQuestoes.indexOf(questao.id) + 1];
    if(proximoId) carregarQuestao(proximoId)
    else {
      setIsUltimaPergunta(true)
      finalizar()
    }
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    });
  }

  return questao ? (
    <>

      <Head>
        <title>Quiz</title>
      </Head>

      <Questionario 
        questao={questao}
        ultima={isUltimaPergunta}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
      />

    </>
  ) : false
}
