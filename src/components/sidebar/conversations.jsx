import React, { useEffect } from 'react';
import {
  ConversationList,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from 'react-router-dom';
import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import { useAuthContext } from '../../contexts/auth/authContext';

import groupIco from "../../icons/group.svg";
import emilyIco from "../../icons/emily.d34aecd9.svg";
import SidebarAvatar from './avatar';
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

const Conversations = () => {
  // const { handleConversationClick, conversationAvatarStyle, isConnect } = useMessengerContext();

  const {user} = useAuthContext();
  const {chats, selectedChat} = useMessengerContext();
  const { openChat } = useSidebarContext();

  return (
    <ConversationList scrollable={true}>
      {chats?.map(chat => {
        const lastMessage = !!chat.messages.length ? chat.messages[chat.messages.length - 1] : undefined;
        return (
          <Conversation
            key={`chat-${chat.id}`}
            onClick={() => {
              openChat(chat);
            }}
            name={chat.type === 'group' ? <div><img src={groupIco} style={{width:20, height:20}} /> {chat.name}</div> : chat.name}
            lastSenderName={lastMessage?.sender.username === user?.username ? 'me' : lastMessage?.sender.username}
            info={lastMessage?.text}
            className={chat.id === selectedChat?.id ? 'cs-conversation--active' : ''}
            // lastActivityTime="18:20"
          >
            <SidebarAvatar as="Avatar" name={chat.name} src={chat.avatarImageBase64} />
          </Conversation>
        );
      })}
      {/* {Array(15).fill('no matter').map((el, index) => {
        return (
          <Conversation
            key={index}
            name={index+1}
          ></Conversation>
        )
      })} */}
    </ConversationList>
  );
}

export default Conversations;