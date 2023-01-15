import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components";
import { regularFont, semiBoldFont } from "../fonts";

const About: NextPage = () => {
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
          "mx-12 my-auto",
          "flex flex-col gap-2",
          "h-[calc(100vh-70px)]",
          "items-center justify-center text-center",
        )}
      >
        <div className={clsx(`${semiBoldFont.className}`, "text-7xl")}>
          Typesafe Travellers
        </div>

        <div className={clsx("text-2xl", `${regularFont.className}`)}>
          Welcome to our group trip-planning app! We are a team of travel
          enthusiasts who understand the challenges of planning a group trip. We
          created this app to make the process as easy and stress-free as
          possible. Our app allows users to create a trip itinerary, share it
          with their group, and collaborate on details such as accommodations,
          transportation, and activities. We believe that group trip planning
          should be fun and exciting, not overwhelming. That's why we've
          designed our app to be user-friendly and intuitive. Thank you for
          choosing our group trip-planning app. Happy travels!
        </div>

        <div className={clsx("text-2xl", `${regularFont.className}`)}>
          <h1 className={clsx(`${semiBoldFont.className}`)}>Team</h1>
          Ayanava Karmakar, Subham Sarkar, Nishith Savla
        </div>

        <div className={clsx("text-2xl", `${regularFont.className}`)}>
          <h1 className={clsx(`${semiBoldFont.className}`)}>Tech Stack</h1>
          Next.js, TypeScript, Tailwind CSS, NextAuth.js, PlanetScale,
          Heroicons, Radix UI, Radix Icons, MySQL, Prisma, Repl.it, tRPC, Zod
        </div>

        <div className={clsx("text-2xl", `${regularFont.className}`)}>
          Made with &hearts; using the T3 stack
        </div>

        <footer className={clsx(`${regularFont.className}`, "text-xl")}>
          &copy; 2023 Typesafe Travellers
        </footer>
      </main>
    </>
  );
};

export default About;
