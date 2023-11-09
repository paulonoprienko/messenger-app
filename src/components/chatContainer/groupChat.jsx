import { useLayoutEffect, useState } from "react";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import { useAuthContext } from "../../contexts/auth/authContext";
import ChatLayout from "./chatLayout";

const GroupChat = () => {
  const { user } = useAuthContext();
  const { selectedChat } = useMessengerContext();

  const [isParticipant, setIsParticipant] = useState(false);
  useLayoutEffect(() => {
    setIsParticipant(
      !!selectedChat?.recipients.find((rec) => rec.id === user.id)
    );
  }, [selectedChat, isParticipant]);

  return (
    <ChatLayout
      isGroupParticipant={isParticipant}
      headerName={selectedChat?.name}
      headerAvatar={selectedChat?.avatarImageBase64}
    />
  );
};

export default GroupChat;
