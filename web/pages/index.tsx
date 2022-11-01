/* eslint-disable @next/next/no-typos */
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NLW COPA</title>
        <meta name="description" content="Welcome to NLW COPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to NLW COPA!</h1>
        <h2>Contagem: {count}</h2>
      </main>

      <footer
        className={styles.footer}
        style={{
          position: "fixed",
          bottom: "0",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/api/pools/count");
  const data = await response.json();

  console.log({ data });

  return {
    props: {
      ...data,
    },
  };
};
