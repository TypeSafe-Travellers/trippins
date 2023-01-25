import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Footer, Navbar } from "../../components";
import { clsx } from "clsx";
import Head from "next/head";

const UserTrip: NextPage = () => {
  const { query } = useRouter();
  const name = query.tripName;
  const description = query.tripDescription;

  return (
    <>
      <Head>
        <title>Trippins | Trip Details</title>
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
        {name} - {description}
      </main>

      <div className={clsx("relative bottom-3 text-center lg:bottom-6")}>
        <Footer />
      </div>
    </>
  );
};

export default UserTrip;
