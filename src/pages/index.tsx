import { type NextPage } from "next";
import { Footer, GetStartedButton, Navbar, NewTripButton } from "../components";
import { useSession } from "next-auth/react";
import Head from "next/head";
import clsx from "clsx";
import { boldFont, semiBoldFont } from "../fonts";
import { api } from "../utils/api";

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
        <div className="flex flex-col items-center gap-0">
          <div
            className={clsx(
              "text-4xl lg:text-9xl",
              "text-center",
              `${boldFont.className}`,
            )}
          >
            Welcome to Trippins!
          </div>

          <div
            className={clsx(
              "text-3xl lg:text-7xl",
              "text-center",
              `${boldFont.className}`,
            )}
          >
            The ultimate group trip planning app.
          </div>

          <div
            className={clsx(
              "text-xl lg:text-5xl",
              "text-center",
              "px-40 py-5",
              `${semiBoldFont.className}`,
            )}
          >
            Say goodbye to the headache of group trip planning and hello to the
            convenience and organization of Trippins.
          </div>

          <div className={clsx("pt-5")}>
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
