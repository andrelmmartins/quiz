import Head from "next/head";
import { useRouter } from "next/router";
import Resultado from "../components/Resultado";

export default function Home() {

  const router = useRouter();
  const total = +router.query.total;
  const certas = +router.query.certas;

  return (
    <>

      <Head>
        <title>Resultado</title>
      </Head>

      <Resultado
        total={total}
        certas={certas}
      />
    </>
  )
}
