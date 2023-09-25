import React from 'react';
import {
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from 'react-router-dom';
import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import SidebarAvatar from './avatar';

const SearchResults = ({setSearchInputValue}) => {

  const {searchResults, selectUser, setSelectedChat, handleConversationClick} = useMessengerContext();
  const navigate = useNavigate();

  return (
    <>
      {(!!searchResults.users.length) && <div className="left-separation-headers">users:</div>}
      {searchResults.users.map(user => {
        return (
          <Conversation
            key={`user-${user.id}`}
            onClick={(event) => {
              handleConversationClick();
              selectUser(user);
              navigate(`/${user.id}`);
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
              handleConversationClick();
              setSelectedChat(group);
              selectUser(null);
              navigate(`/-${group.id}`);
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