import ChatRoom from "./components/ChatRoom";
import NickNameForm from "./components/NicknameForm";
import MessageForm from "./components/MessageForm";
import { ChatContextProvider } from "./contexts/chat";
function App() {
  return (
    <ChatContextProvider>
      <div className="py-3 px-5 w-full h-full">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Zoom</h1>
        </header>
        <main className="flex items-center max-w-3xl mx-auto justify-center flex-col space-y-7">
          <NickNameForm />
          <ChatRoom />
          <MessageForm />
        </main>
      </div>
    </ChatContextProvider>
  );
}

export default App;
