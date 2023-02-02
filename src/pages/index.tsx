import Head from "next/head";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { HomeContainer, Navbar, Loading } from "../components";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <>
      <Head>
        <title>Trippins</title>
        <meta name="description" content="Group Trip Planning App" />
        <link
          rel="preload"
          as="font"
          href="../fonts/FoundersGrotesk-Bold.woff2"
          type="font/woff2"
        />
        <link
          rel="preload"
          as="font"
          href="../fonts/FoundersGrotesk-Semibold.woff2"
          type="font/woff2"
        />
        <link
          rel="preload"
          as="font"
          href="../fonts/FoundersGrotesk-Regular.woff2"
          type="font/woff2"
        />
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
