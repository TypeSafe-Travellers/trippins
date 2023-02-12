import {
  type FC,
  type UIEvent,
  type MouseEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { api } from "../../utils/api";
import clsx from "clsx";
import { regularFont } from "../../fonts";
import { getMessageTime } from "../../utils/getMessageTime";
import { SendButton } from "../../icons";

interface Props {
  tripId: string;
  userId: string;
}

export const TripChat: FC<Props> = (props) => {
  const { tripId, userId } = props;
  const [message, setMessage] = useState("");
  const utils = api.useContext();
  const { data: messages } = api.tripMessages.getMessages.useQuery({ tripId });
  const { data: trip } = api.userTrips.getSpecificTrip.useQuery({ tripId });
  const sendMessageMutation = api.tripMessages.sendMessage.useMutation({
    onSuccess: () => {
      utils.tripMessages.getMessages.refetch({ tripId });

      /**
       * when a new message is sent
       * scroll to the bottom of the chat
       */
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 3000);
    },
  });

  /**
   * ref to the bottom of the chat
   * scrolls to the bottom when a new message is sent
   */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrollLock, setScrollLock] = useState(false);

  /**
   * if the user scrolls up, lock the scroll position
   */
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollTop >= 0) {
      setScrollLock(true);
    } else {
      setScrollLock(false);
    }
  };

  const handleSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sendMessageMutation.mutate({
      tripId,
      text: message,
      userId,
    });

    setMessage("");
  };

  /**
   * bit of a hack to get the messages to update in real time
   */
  useEffect(() => {
    /**
     * if the user has not scrolled up
     * scroll to the bottom of the chat
     */
    if (messagesEndRef.current && !scrollLock) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    utils.tripMessages.getMessages.refetch({ tripId });
    utils.userTrips.getSpecificTrip.refetch({ tripId });

    return () => {
      utils.tripMessages.getMessages.invalidate({ tripId });
      utils.userTrips.getSpecificTrip.invalidate({ tripId });
    };
  }, [
    tripId,
    messages,
    scrollLock,
    utils.tripMessages.getMessages,
    utils.userTrips.getSpecificTrip,
  ]);

  /**
   * map participants to an object with id and name
   * this is to avoid having to do a find on the participants array
   */
  const participantsMap = trip?.participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
  }));

  return (
    <>
      <div
        onScroll={(e) => handleScroll(e)}
        className={clsx(
          `${regularFont.className}`,
          "flex flex-col gap-3",
          "mx-5 h-80 w-96 overflow-y-auto p-5",
          "scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-500 dark:scrollbar-thumb-indigo-900",
          "rounded-lg border-4 border-solid border-black dark:border-gray-200",
          "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900",
          "bg-gradient-to-tl from-white/70 via-white/60 to-white/50 dark:from-black/70 dark:via-black/60 dark:to-black/50",
        )}
      >
        <div
          className={clsx(
            "font-semibold tracking-wider",
            "text-center text-lg lg:text-xl",
            "text-fuchsia-700 dark:text-fuchsia-200",
          )}
        >
          Start chatting about your trip...
        </div>

        <hr className="mx-auto w-full border border-black dark:border-gray-200" />

        {messages?.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "my-1 w-full break-words px-3 pt-5",
              "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
              "rounded-lg border border-solid border-black dark:border-white",
              `${
                message.senderId === userId
                  ? "bg-white dark:bg-black"
                  : "bg-gray-50 dark:bg-neutral-900"
              }`,
            )}
          >
            {/**
             * check if the message has a link or not
             */}
            {message.text.split(" ").map((part, i) => {
              if (part.startsWith("http") || part.startsWith("www")) {
                return (
                  <a
                    key={i}
                    className={clsx(
                      "text-blue-800 dark:text-blue-300",
                      "hover:underline",
                    )}
                    href={part}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={i}> {part} </span>;
            })}

            <hr
              className={clsx(
                "mx-auto mt-5 w-full border border-black",
                "dark:border-gray-200",
              )}
            />

            <p className={clsx("py-3 text-center")}>
              {message.senderId === userId
                ? "you"
                : participantsMap?.find(
                    (participant) => participant.id === message.senderId,
                  )?.name || "Unknown"}
              {` ${getMessageTime(message.createdAt)}`}
            </p>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="pt-5 text-center">
        <label>send message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={(e) => {
            handleSendMessage(e);
          }}
        >
          <SendButton />
        </button>
      </div>
    </>
  );
};
