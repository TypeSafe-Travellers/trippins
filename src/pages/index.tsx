import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { boldFont } from "../fonts";
import { api } from "../utils/api";
import {
  Footer,
  GetStartedButton,
  HeroBanner,
  Navbar,
  NewTripButton,
} from "../components";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const hello = api.example.hello.useQuery({
    text: `${
      session?.user?.name ? session.user.name : "there"
    }! Welcome to Trippins.`,
  });

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
        <title>TypeSafe Travellers</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main
        className={clsx(
          "flex h-[calc(100vh-70px)] w-screen",
          "items-center justify-center",
        )}
      >
        <div className="flex flex-col items-center">
          <HeroBanner />

          <div className={clsx("py-6")}>
            {status === "authenticated" ? (
              <NewTripButton />
            ) : (
              <GetStartedButton />
            )}
          </div>

          <div className={clsx("absolute bottom-0 lg:bottom-3")}>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
