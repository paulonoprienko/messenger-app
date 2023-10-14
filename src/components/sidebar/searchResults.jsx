import React from 'react';
import {
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import SidebarAvatar from './avatar';
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

const SearchResults = ({setSearchInputValue}) => {

  const { searchResults, selectUser, setSelectedChat, handleConversationClick } = useMessengerContext();
  const { openChat } = useSidebarContext();

  return (
    <>
      {(!!searchResults.users.length) && <div className="left-separation-headers">users:</div>}
      {searchResults.users.map(user => {
        user.type = "userdirect";
        return (
          <Conversation
            key={`user-${user.id}`}
            onClick={(event) => {
              handleConversationClick();
              selectUser(user);
              openChat(user);
              setSearchInputValue('');
            }}
            name={user.username}
          >
            <SidebarAvatar as="Avatar" name={user.username} src={user.avatarImageBase64} />
          </Conversation>
        );
      })}

      {(!!searchResults?.groups?.length) && <div className="left-separation-headers">group chats:</div>}
      {searchResults.groups?.map(group => {
        return (
          <Conversation
            key={`chat-${group.id}`}
            onClick={(event) => {
              setSelectedChat(group);
              selectUser(null);
              openChat(group);
              setSearchInputValue('');
            }}
            name={group.name}
          >
            <SidebarAvatar as="Avatar" name={group.name} src={group.avatarImageBase64} />
          </Conversation>
        );
      })}
    </>
  );
}

export default SearchResults;