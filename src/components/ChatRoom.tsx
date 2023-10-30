import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../contexts/chat";

export default function ChatRoom() {
  const { messageList } = useContext(ChatContext);
  const chatRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messageList, chatRef]);
  return (
    <div className="w-full h-56 rounded-md shadow-md relative  bg-gray-50">
      <ul ref={chatRef} className="h-full overflow-auto">
        {messageList?.map((message, i) => <li key={message + i}>{message}</li>)}
      </ul>
    </div>
  );
}
