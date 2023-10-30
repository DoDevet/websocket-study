import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chat";

const NickNameForm = () => {
  const [nickname, setNickname] = useState("");
  const { onChangeNickname, nickname: nii } = useContext(ChatContext);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeNickname(nickname);
  };
  return (
    <>
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
      <p>Your Nickname : {nii}</p>
    </>
  );
};

export default NickNameForm;
