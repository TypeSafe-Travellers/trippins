import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import { Navbar, ProfileContainer } from "../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { boldFont } from "../fonts";

const Profile: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

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
        </div>
      </main>
    </>
  );
};

export default Profile;
