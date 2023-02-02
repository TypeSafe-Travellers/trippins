import clsx from "clsx";
import { Footer } from "../../Misc/Footer";
import { GetStartedButton, HeroBanner } from ".";

export const UnauthenticatedContainer = () => {
  return (
    <div
      className={clsx(
        "flex flex-col",
        "h-[calc(100vh-70px)] w-screen",
        "items-center justify-center",
      )}
    >
      <div className={clsx("p-5")}>
        <HeroBanner />
      </div>

      <div className={clsx("p-5")}>
        <GetStartedButton />
      </div>

      <div className={clsx("relative bottom-0 lg:bottom-3")}>
        <Footer />
      </div>
    </div>
  );
};
