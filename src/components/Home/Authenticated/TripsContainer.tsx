import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";

// TODO remove after intergration backend
const dummyTripsData = [
  {
    id: 1,
    name: "Trip 1",
    description: "Trip 1 Description",
  },
  {
    id: 2,
    name: "Trip 2",
    description: "Trip 2 Description",
  },
  {
    id: 3,
    name: "Trip 3",
    description: "Trip 3 Description",
  },
  {
    id: 4,
    name: "Trip 4",
    description: "Trip 4 Description",
  },
  {
    id: 5,
    name: "Trip 5",
    description: "Trip 5 Description",
  },
];

// TODO add trip participants later
export const TripsContainer = () => {
  return (
    <div className={clsx("flex flex-col gap-10", "p-10")}>
      {dummyTripsData.map((trip) => (
        <div
          key={trip.id}
          className={clsx(
            "text-2xl lg:text-3xl",
            "mx-0 break-words px-3 pt-6 pb-4 lg:mx-20 lg:px-8",
            "dark:bg-gradient-to-tl dark:from-black/70 dark:via-black/60 dark:to-black/50",
            "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-700",
            "rounded-lg border-4 border-solid border-black dark:border-gray-200",
            "cursor-pointer",
          )}
        >
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            {trip.name}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            {trip.description}
          </div>
        </div>
      ))}
    </div>
  );
};
