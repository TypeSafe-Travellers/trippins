import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../../icons";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { regularFont } from "../../../fonts";

export const NewTripButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDescription, settripDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={clsx(
            `${regularFont.className}`,
            "inline-flex select-none items-center justify-center rounded-md px-5 pt-4 pb-2",
            "mx-auto",
            "text-2xl",
            "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900",
            "rounded-md border-2 border-solid border-black dark:border-gray-200",
            "bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-slate-900",
            "hover:bg-gray-50",
            "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
            // Register all radix states
            "group",
            "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
            "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
            "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50",
          )}
        >
          New Trip
        </button>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Content
              forceMount
              className={clsx(
                `${regularFont.className}`,
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-6 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-gray-100 dark:bg-gray-800",
              )}
            >
              <Dialog.Title className="text-2xl">Create New Trip</Dialog.Title>
              <Dialog.Description className="mt-2 text-xl">
                Fill this form to set up a new trip
              </Dialog.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label htmlFor="tripName" className="text-lg">
                    Trip Name
                  </label>
                  <input
                    id="tripName"
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    autoComplete="trip-name"
                    className={clsx(
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "text-xl",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="email" className="text-lg">
                    Trip Description
                  </label>
                  <textarea
                    id="tripDescriptionription"
                    value={tripDescription}
                    onChange={(e) => settripDescription(e.target.value)}
                    autoComplete="tripDescription"
                    className={clsx(
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "text-xl",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="startDate" className="text-lg">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    autoComplete="tripDescription"
                    className={clsx(
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "text-xl",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="endDate" className="text-lg">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    autoComplete="endDate"
                    className={clsx(
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "text-xl",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  />
                </fieldset>
              </form>

              <Dialog.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                )}
              >
                <CrossIcon />
              </Dialog.Close>
            </Dialog.Content>
          </Transition.Child>
        </Transition.Root>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
