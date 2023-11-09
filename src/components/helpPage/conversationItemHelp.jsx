import { Conversation } from "@chatscope/chat-ui-kit-react";
import React from "react";
import SidebarAvatar from "../sidebar/avatar";

const ConversationItemHelp = ({ onClick, className }) => {
  return (
    <Conversation
      className={className}
      onClick={onClick}
      name="Help"
      info="Справочная информация"
    >
      <SidebarAvatar
        as="Avatar"
        name="?"
        src="https://res.cloudinary.com/dbfyj3cs4/image/upload/v1699014634/egruiunxww5uoa9zeint.jpg"
      />
    </Conversation>
  );
};

export default ConversationItemHelp;
