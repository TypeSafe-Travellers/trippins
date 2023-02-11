import { type FC, useState } from "react";
import { api } from "../../utils/api";

interface Props {
  tripId: string;
  userId: string;
  userName: string;
}

export const TripChat: FC<Props> = (props) => {
  const { tripId, userId, userName } = props;
  const [message, setMessage] = useState("");
  const { data: messages } = api.tripMessages.getMessages.useQuery({ tripId });
  const { data: trip } = api.userTrips.getSpecificTrip.useQuery({ tripId });
  const sendMessageMutation = api.tripMessages.sendMessage.useMutation();

  /**
   * map participants to an object with id and name
   * this is to avoid having to do a find on the participants array
   */
  const participantsMap = trip?.participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
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
      {messages?.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>
            {message.senderId === userId
              ? userName
              : participantsMap?.find(
                  (participant) => participant.id === message.senderId,
                )?.name || "Unknown"}
          </p>
          <p>{message.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
