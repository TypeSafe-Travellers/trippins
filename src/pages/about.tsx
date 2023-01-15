import clsx from "clsx";
import { boldFont } from "../fonts";

const about = () => {
  return (
    <main
      className={clsx(
        "flex h-[calc(100vh-100px)] w-screen items-center justify-center",
      )}
    >
      <h1 className={clsx("")}>Typesafe Travellers</h1>
      <p className={clsx("")}>
        This is a website for people who want to travel the world, but do not
        want to be ripped off by the travel industry. Many a times, when a group
        of friends want to travel together, they have to go through the hassle
        of finding a travel agent, who will then book the tickets, hotels, and
        other things for them. This is a very time consuming process, and the
        travel agent will charge a hefty commission for this. This website aims
        to solve this problem by providing a platform for people to book their
        own tickets, hotels, and other things, and then share the cost with
        their friends. This way, they can save a lot of money, and also have a
        lot of fun.
      </p>
      <p>Made with &hearts; using the T3 stack</p>
      <footer>&copy; 2023 Typesafe Travellers</footer>
    </main>
  );
};

export default about;
