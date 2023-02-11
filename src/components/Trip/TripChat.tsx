import { type FC, useState, useEffect } from "react";
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
   * this is a bit of a hack to get the messages to update in real time
   */
  useEffect(() => {
    utils.tripMessages.getMessages.refetch({ tripId });

    return () => {
      utils.tripMessages.getMessages.invalidate({ tripId });
    };
  }, [messages, tripId, utils.tripMessages.getMessages]);

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
        className={clsx(
          `${regularFont.className}`,
          "mx-5 h-80 w-96 overflow-y-auto py-5 px-3",
          "flex flex-col gap-3 text-left",
          "rounded-lg border-4 border-solid border-black dark:border-gray-200",
          "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
          "bg-gradient-to-tl from-white/70 via-white/60 to-white/50 dark:from-black/70 dark:via-black/60 dark:to-black/50",
        )}
      >
        <div className={clsx("text-center text-lg lg:text-xl")}>
          Start chatting about your trip...
        </div>

        <hr />
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
            </p>
            <p>{getMessageTime(message.createdAt)}</p>
          </div>
        ))}
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
