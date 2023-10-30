import { useEffect, useRef, useState } from "react";
const socket = new WebSocket("ws://localhost:8000");
socket.addEventListener("open", () => {
  console.log("Open");
});
socket.addEventListener("close", () => {
  console.log("close");
});
function App() {
  const [nickname, setNickname] = useState("");
  const [previewNickname, setPreviewNickname] = useState("Anno");
  const [messages, setMessages] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);

  const ulref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (ulref.current) {
      ulref.current.scrollTop = ulref.current.scrollHeight;
    }
  }, [messageList]);
  useEffect(() => {
    const handler = (message: MessageEvent<any>) => {
      setMessageList((prev) => [...prev, message.data]);
    };
    socket.addEventListener("message", handler);
    return () => socket.removeEventListener("message", handler);
  }, []);

  const messageForm = (type: "nickname" | "message", payload: string) =>
    JSON.stringify({ type, payload });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNickname(nickname);
    setPreviewNickname(nickname);
    socket.send(messageForm("nickname", nickname));
  };
  const onSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageList((prev) => [...prev, `${previewNickname}: ${messages}`]);
    socket.send(messageForm("message", messages));
    setMessages("");
  };

  return (
    <div className="py-3 px-5 w-full h-full">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Zoom</h1>
      </header>
      <main className="flex items-center max-w-3xl mx-auto justify-center flex-col space-y-7">
        <form className="space-x-2" onSubmit={onSubmit}>
          <input
            type="text"
            required
            placeholder="Choose a Nickname"
            className="border py-1 px-1 rounded-md"
            onChange={(e) => setNickname(e.currentTarget.value)}
          />
          <button className="bg-sky-400 rounded-md shadow-lg px-2 py-2 text-white">
            Save
          </button>
        </form>
        <p>Your Nickname : {previewNickname}</p>
        <div className="w-full  h-56 rounded-md shadow-md relative  bg-gray-50">
          <ul ref={ulref} className="h-full overflow-auto">
            {messageList?.map((message, i) => (
              <li key={message + i}>{message}</li>
            ))}
          </ul>
        </div>
        <form className="space-x-2 flex w-full" onSubmit={onSubmitMessage}>
          <input
            required
            value={messages}
            type="text"
            placeholder="Write a Message"
            className="border py-1 px-1 rounded-md w-full"
            onChange={(e) => setMessages(e.currentTarget.value)}
          />
          <button className="bg-sky-400 rounded-md shadow-lg px-2 py-2 text-white">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
