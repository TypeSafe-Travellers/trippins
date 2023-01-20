import clsx from "clsx";
import { boldFont, semiBoldFont } from "../../fonts";

export const HeroBanner = () => {
  return (
    <>
      <div
        className={clsx(
          "text-4xl lg:text-9xl",
          "text-center",
          `${boldFont.className}`,
        )}
      >
        Welcome to Trippins!
      </div>

      <div
        className={clsx(
          "text-3xl lg:text-7xl",
          "text-center",
          `${boldFont.className}`,
        )}
      >
        The ultimate group trip planning app.
      </div>

      <div
        className={clsx(
          "text-xl lg:text-5xl",
          "text-center",
          "px-40 py-5",
          `${semiBoldFont.className}`,
        )}
      >
        Say goodbye to the headache of group trip planning and hello to the
        convenience and organization of Trippins.
      </div>
    </>
  );
};
