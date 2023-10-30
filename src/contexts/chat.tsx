import { createContext, useEffect, useState } from "react";
import { socket } from "../service/server";
import { messageForm } from "../service/utils";
interface MessageContextProps {
  messageList: string[];
  nickname: string;
  onAddMessage: (message: string) => void;
  onChangeNickname: (nickname: string) => void;
}
const ChatContext = createContext<MessageContextProps>({
  messageList: [],
  nickname: "",
  onAddMessage: (): void => {},
  onChangeNickname: (): void => {},
});
const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState("Anno");
  const [messageList, setMessageList] = useState<string[]>([]);

  const onChangeNickname = (nickname: string) => {
    setNickname(nickname);
    socket.send(messageForm("nickname", nickname));
  };

  const onAddMessage = (message: string) => {
    setMessageList((prev) => [...prev, `${nickname}: ${message}`]);
    socket.send(messageForm("message", message));
  };

  useEffect(() => {
    const handler = (message: MessageEvent<any>) => {
      setMessageList((prev) => [...prev, message.data]);
    };
    socket.addEventListener("message", handler);
    return () => socket.removeEventListener("message", handler);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        onAddMessage,
        messageList,
        nickname,
        onChangeNickname,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
