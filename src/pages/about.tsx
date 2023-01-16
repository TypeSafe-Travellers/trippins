import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components";
import { boldFont, regularFont } from "../fonts";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>TypeSafe Travellers | About</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        className={clsx(
          "mx-12 my-auto pt-10",
          "flex flex-col gap-2",
          "h-[calc(100vh-70px)]",
          "items-center justify-center text-center",
        )}
      >
        <div
          className={clsx(
            "bg-slate-100/90 dark:bg-black",
            "border-2 border-solid border-black",
            "rounded-3xl px-5 pt-14 pb-8",
          )}
        >
          <div className={clsx(`${boldFont.className}`, "text-8xl", "pb-5")}>
            Typesafe Travellers
          </div>

          <div
            className={clsx(
              "text-2xl",
              "px-10",
              "text-justify",
              `${regularFont.className}`,
            )}
          >
            Welcome to our group trip-planning app! We are a team of travel
            enthusiasts who understand the challenges of planning a group trip.
            We created this app to make the process as easy and stress-free as
            possible. Our app allows users to create a trip itinerary, share it
            with their group, and collaborate on details such as accommodations,
            transportation, and activities. We believe that group trip planning
            should be fun and exciting, not overwhelming. That&apos;s why
            we&apos;ve designed our app to be user-friendly and intuitive. Thank
            you for choosing our group trip-planning app. Happy travels!
          </div>

          <div className={clsx(`${boldFont.className}`, "text-5xl", "pt-3")}>
            Tech Stack
          </div>
          <div className={clsx("text-2xl", `${regularFont.className}`)}>
            Next.js, TypeScript, Tailwind CSS, NextAuth.js, PlanetScale,
            Heroicons, Radix UI, Radix Icons, MySQL, Prisma, Repl.it, tRPC, Zod
          </div>

          <div className={clsx(`${boldFont.className}`, "text-5xl", "pt-3")}>
            Team
          </div>
          <div className={clsx("text-3xl", `${regularFont.className}`)}>
            Ayanava Karmakar // Subham Sarkar // Nishith Savla
          </div>
        </div>

        <footer
          className={clsx(`${regularFont.className}`, "text-2xl", "pt-5")}
        >
          &copy; {new Date().getFullYear()} Typesafe Travellers
        </footer>
      </main>
    </>
  );
};

export default About;
