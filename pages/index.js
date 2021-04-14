import Head from "next/head";
import { Sidebar } from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whats App 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
      </main>
    </div>
  );
}
