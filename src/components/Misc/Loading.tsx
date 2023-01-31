import clsx from "clsx";
import { boldFont } from "../../fonts";
import { TypeAnimation } from "react-type-animation";
import Head from "next/head";

export const Loading = () => {
  return (
    <>
      <Head>
        <title>Trippins — Loading</title>
      </Head>

      <main
        className={clsx(
          "flex min-h-screen items-center justify-center text-center",
          "text-4xl lg:text-7xl",
          `${boldFont.className}`,
        )}
      >
        Loading
        <TypeAnimation
          sequence={[" ", 50, ".", 125, "..", 250, "...", 500]}
          wrapper="div"
          cursor={false}
          repeat={Infinity}
        />
      </main>
    </>
  );
};

export const LoadingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[" ", 50, ".", 125, "..", 250, "...", 500]}
      wrapper="span"
      cursor={false}
      repeat={Infinity}
    />
  );
};
