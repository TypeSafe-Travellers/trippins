import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import { Navbar, ProfileContainer, ThemeToggle } from "../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Profile: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  return (
    <>
      <Head>
        <title>TypeSafe Travellers | Profile</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <div
          className={clsx(
            "flex h-[calc(100vh-70px)] w-screen justify-center",
            "flex-col gap-2",
            "text-gray-900 dark:text-zinc-200",
          )}
        >
          <ProfileContainer />
          <div className="pt-5 text-center">
            <ThemeToggle />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
