import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import { Footer, Loading, Navbar, ProfileContainer } from "../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Profile: NextPage = () => {
  const { push } = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }
  }, [push, status]);

  if (status === "loading") return <Loading />;

  return (
    <>
      <Head>
        <title>Trippins | Profile</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        className={clsx(
          "flex h-[calc(100vh-70px)] w-screen items-center justify-center",
          "flex-col gap-2",
          "text-gray-900 dark:text-zinc-100",
        )}
      >
        <ProfileContainer />

        <div className={clsx("absolute bottom-3 lg:bottom-6")}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Profile;
