import { type FC, type UIEvent, useState, useEffect, useRef } from "react";
import { api } from "../../utils/api";
import clsx from "clsx";
import { regularFont } from "../../fonts";
import { getMessageTime } from "../../utils/getMessageTime";

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
          "flex flex-col gap-3 text-left",
          "mx-5 h-80 w-96 overflow-y-auto py-5 px-3",
          "scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-500 dark:scrollbar-thumb-indigo-900",
          "rounded-lg border-4 border-solid border-black dark:border-gray-200",
          "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
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
            className={clsx(`${message.senderId === userId && "text-right"}`)}
          >
            <p>{message.text}</p>
            <p>
              {message.senderId === userId
                ? null
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
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            sendMessageMutation.mutate({
              tripId,
              text: message,
              userId,
            });

            setMessage("");
          }}
        >
          send
        </button>
      </div>
    </>
  );
};
