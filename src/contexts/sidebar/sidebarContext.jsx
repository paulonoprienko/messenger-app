import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  CONVERSATIONS_KEY,
  MAIN_KEY,
  STEP_1,
  PROFILE_INFO_KEY,
  PROFILE_EDIT_KEY,
} from "./leftBarKeys";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/authContext";
import { useMessengerContext } from "../messenger/messengerContext";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeSidebarKey, setActiveSidebarKey] = useState(MAIN_KEY);
  const [activeMainKey, setActiveMainKey] = useState(CONVERSATIONS_KEY);
  const [activeNewGroupKey, setActiveNewGroupKey] = useState(STEP_1);
  const [activeProfileSidebarKey, setActiveProfileSidebarKey] =
    useState(PROFILE_INFO_KEY);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { user } = useAuthContext();
  const { createdChat, handleConversationClick } = useMessengerContext();

  const navigate = useNavigate();
  const openChat = (chat) => {
    if (chat.type === "direct") {
      const interlocutor = chat.recipients.find(
        (recipient) => recipient.id !== user.id
      );
      navigate(`/${interlocutor.id}`);
    } else if (chat.type === "group") {
      navigate(`/-${chat.id}`);
    } else if (chat.type === "userdirect") {
      navigate(`/${chat.id}`);
    }
    handleConversationClick();
  };

  useEffect(() => {
    if (createdChat) {
      openChat(createdChat);
      setSelectedContacts([]);
      setActiveNewGroupKey(STEP_1);
      setActiveSidebarKey(MAIN_KEY);
    }
  }, [createdChat]);

  const v = useMemo(
    () => ({
      activeSidebarKey,
      activeMainKey,
      activeNewGroupKey,
      activeProfileSidebarKey,
      setActiveSidebarKey,
      setActiveMainKey,
      setActiveNewGroupKey,
      setActiveProfileSidebarKey,
      selectedContacts,
      setSelectedContacts,

      openChat,
    }),
    [
      activeSidebarKey,
      activeMainKey,
      activeNewGroupKey,
      activeProfileSidebarKey,
      setActiveSidebarKey,
      setActiveMainKey,
      setActiveNewGroupKey,
      setActiveProfileSidebarKey,
      selectedContacts,
      setSelectedContacts,

      openChat,
    ]
  );

  return (
    <SidebarContext.Provider value={v}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = () => React.useContext(SidebarContext);
