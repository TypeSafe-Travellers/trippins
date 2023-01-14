import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import { ProfileContainer, ThemeToggle } from "../components";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>TypeSafe Travellers | Profile</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className={clsx(
            "flex min-h-screen justify-center",
            "flex-col gap-2",
            "text-gray-900 dark:text-zinc-200",
          )}
        >
          <ProfileContainer />
          <div className={clsx("absolute right-5 top-0 pt-5")}>
            <ThemeToggle />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
