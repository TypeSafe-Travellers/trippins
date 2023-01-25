import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Footer, Navbar, TripDetailsContainer } from "../../components";
import { clsx } from "clsx";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { boldFont } from "../../fonts";

const UserTrip: NextPage = () => {
  const { query, push } = useRouter();
  const name = query.tripName;
  const description = query.tripDescription;
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }
  }, [push, status]);

  // TODO add validation to ensure that the user is a participant

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
        <title>Trippins | {name}</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        className={clsx(
          "flex h-[calc(100vh-200px)] w-screen items-center justify-center",
          "flex-col gap-2",
          "text-gray-900 dark:text-zinc-100",
        )}
      >
        <TripDetailsContainer
          name={name as string}
          description={description as string}
        />
      </main>

      <div className={clsx("relative bottom-3 text-center lg:bottom-6")}>
        <Footer />
      </div>
    </>
  );
};

export default UserTrip;
