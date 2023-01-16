import Link from "next/link";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <div className="max-w-md px-4 sm:max-w-2xl sm:px-6 md:max-w-3xl lg:max-w-4xl lg:px-0 xl:max-w-5xl 2xl:max-w-6xl">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
              Page not found...
              <span className="text-[hsl(200,100%,60%)]"> 404!</span>
            </h1>
            <div className="group mt-4 flex w-full items-center justify-center gap-4 xl:mt-8">
              <Link href="/" className="text-xl">
                Return to the homepage
                <svg
                  className="stroke ml-2 -mr-1 inline h-3 stroke-current stroke-2"
                  fill="none"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    className="opacity-0 transition group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="transition group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
