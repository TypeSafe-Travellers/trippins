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
        Welcome to
        <span
          className={clsx(
            "bg-gradient-to-r from-indigo-400 to-fuchsia-400",
            "bg-clip-text text-transparent",
          )}
        >
          Trippins!
        </span>
      </div>

      <div
        className={clsx(
          "text-3xl lg:text-7xl",
          "text-center",
          `${boldFont.className}`,
        )}
      >
        The ultimate
        <span
          className={clsx(
            "bg-gradient-to-r from-emerald-400 to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` group trip planning `}
        </span>
        app.
      </div>

      <div
        className={clsx(
          "text-xl lg:text-5xl",
          "text-center",
          "px-40 py-5",
          `${semiBoldFont.className}`,
        )}
      >
        Say goodbye to the
        <span
          className={clsx(
            "bg-gradient-to-r from-emerald-400 to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` headache `}
        </span>
        of group trip planning and hello to the
        <span
          className={clsx(
            "bg-gradient-to-r from-emerald-400 to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` convenience `}
        </span>
        and
        <span
          className={clsx(
            "bg-gradient-to-r from-emerald-400 to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` organization `}
        </span>
        of
        <span
          className={clsx(
            "bg-gradient-to-r from-indigo-400 to-fuchsia-400",
            "bg-clip-text text-transparent",
          )}
        >
          {` Trippins.`}
        </span>
      </div>
    </>
  );
};
