import { type NextPage } from "next";
import Head from "next/head";
import { boldFont } from "../fonts";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({
    text: "We are the TypeSafe Travellers.",
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <div className="group relative mx-10 cursor-pointer">
          <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <div className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-black px-7 py-4 leading-none">
            <p
              className={`mx-5 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text px-6 pt-5 text-center text-4xl font-light text-transparent lg:text-7xl ${boldFont.className}`}
            >
              {hello.data ? hello.data.greeting : "Loading greeting..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
