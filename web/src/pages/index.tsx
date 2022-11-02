import { GetServerSideProps } from "next";
import Image from "next/image";

import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import avatarsImg from "../assets/avatars.png";
import iconCheckImg from "../assets/icon-check.svg";
import FooterComponent from "../components/footer";
import HeadComponent from "../components/head";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState<string>("");

  async function createPool(event: FormEvent) {
    event.preventDefault();
    console.log("Create Pool");

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso! O código foi copiado para a área de transferência!"
      );
      setPoolTitle("");
    } catch (err) {
      console.error(err);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <>
      <div className="max-w-[1124px] mx-auto flex justify-between items-center h-screen gap-28">
        <HeadComponent />
        <main>
          <Image src={logoImg} alt="NLW Copa" />

          <h1 className="mt-14 text-white text-4xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={avatarsImg} alt="" />

            <strong className="text-gray-100 text-l">
              <span className="text-ignite-500">+{userCount}</span> pessoas já
              estão usando o NLW Copa
            </strong>
          </div>

          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
              type="text"
              required
              placeholder="Qual nome do seu bolão"
              onChange={(event) => setPoolTitle(event.target.value)}
              value={poolTitle}
            />
            <button
              className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold uppercase text-sm hover:bg-yellow-700"
              type="submit"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="mt-4 text-m text-gray-300">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="mt-5 pt-5 p-2 border-t border-gray-600 flex justify-between text-gray-100">
            <div className=" flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-15 bg-gray-600" />

            <div className="flex items-center gap-6 justify-end">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia do app NLW Copa"
        />
      </div>
      <FooterComponent />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
