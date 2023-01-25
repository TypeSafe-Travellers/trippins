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
      <main>
        {name} - {description}
      </main>

      <div className={clsx("absolute bottom-3 lg:bottom-6")}>
        <Footer />
      </div>
    </>
  );
};

export default UserTrip;
