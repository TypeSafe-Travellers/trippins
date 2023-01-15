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
          This is a website for people who want to travel the world, but do not
          want to be ripped off by the travel industry. Many a times, when a
          group of friends want to travel together, they have to go through the
          hassle of finding a travel agent, who will then book the tickets,
          hotels, and other things for them. This is a very time consuming
          process, and the travel agent will charge a hefty commission for this.
          This website aims to solve this problem by providing a platform for
          people to book their own tickets, hotels, and other things, and then
          share the cost with their friends. This way, they can save a lot of
          money, and also have a lot of fun.
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
          &copy; {new Date().getFullYear()} Typesafe Travellers
        </footer>
      </main>
    </>
  );
};

export default About;
