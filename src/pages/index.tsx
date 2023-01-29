import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { boldFont } from "../fonts";
import { HomeContainer, Navbar } from "../components";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "loading")
    return (
      <div
        className={clsx(
          "flex min-h-screen items-center justify-center text-center",
          "text-4xl lg:text-7xl",
          `${boldFont.className}`,
        )}
      >
        Loading...
      </div>
    );

  return (
    <>
      <Head>
        <title>Trippins</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <HomeContainer />
      </main>
    </>
  );
};

export default Home;
