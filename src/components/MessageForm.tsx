import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chat";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { onAddMessage } = useContext(ChatContext);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddMessage(message);

    setMessage("");
  };
  return (
    <form className="space-x-2 flex w-full" onSubmit={onSubmit}>
      <input
        required
        value={message}
        type="text"
        placeholder="Write a Message"
        className="border py-1 px-1 rounded-md w-full"
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <button className="bg-sky-400 rounded-md shadow-lg px-2 py-2 text-white">
        Send
      </button>
    </form>
  );
};

export default MessageForm;
