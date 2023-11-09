import { ChatContainer, MessageList } from "@chatscope/chat-ui-kit-react";
import React, { useEffect } from "react";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";

export default function ChatContainerIndex() {
  const { setSidebarVisible } = useMessengerContext();
  useEffect(() => {
    setSidebarVisible(true);
  }, []);
  return (
    <ChatContainer className="chat-container-index">
      <MessageList>
        <MessageList.Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            fontSize: "1.2em",
          }}
        >
          {/* Select a chat to write a message. */}
          Выберите, кому хотите написать или воспользуйтесь поиском.
        </MessageList.Content>
      </MessageList>
    </ChatContainer>
  );
}
