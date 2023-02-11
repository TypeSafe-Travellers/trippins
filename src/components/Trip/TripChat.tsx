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
  const sendMessageMutation = api.tripMessages.sendMessage.useMutation();

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
        }}
      >
        send
      </button>
      {messages?.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>{message.senderId === userId ? userName : message.senderId}</p>
          <p>{message.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
