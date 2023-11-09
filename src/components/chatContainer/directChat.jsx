import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import ChatLayout from "./chatLayout";

const DirectChat = () => {
  const { selectedUser } = useMessengerContext();

  return (
    <ChatLayout
      headerName={selectedUser?.username}
      headerAvatar={selectedUser?.avatarImageBase64}
    />
  );
};

export default DirectChat;
