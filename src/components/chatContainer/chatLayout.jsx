import { useEffect, useRef } from "react";
import {
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
  Button,
} from "@chatscope/chat-ui-kit-react";
import Avatar from "react-avatar";

import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import { useAuthContext } from "../../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";
import {
  formatDateInMessageListView,
  formatDateInMessageView,
} from "../../utils/formattingDate";

export const ChatLayout = ({
  children,
  isGroupParticipant,
  headerName,
  headerAvatar,
}) => {
  const { user } = useAuthContext();
  const {
    selectChat,
    selectedChat,
    sendMessage,
    joinGroup,
    handleBackClick,
    chatContainerStyle,
    selectedUser,
    decrementUnread,
    onreadNotify,
  } = useMessengerContext();
  const navigate = useNavigate();

  const messageInputRef = useRef();

  useEffect(
    () => messageInputRef.current?.focus(),
    [selectedChat, isGroupParticipant]
  );

  useEffect(() => {
    const messageListContainer = document.querySelector(".chat-message-list");
    const unreadMessages = messageListContainer?.querySelectorAll(
      ".cs-message.cs-message--incoming[data-is-read=false]"
    );
    if (unreadMessages?.[0] !== undefined) {
      messageListContainer.children[0].scrollTop = unreadMessages[0].offsetTop;
    }
  }, [selectedChat?.id]);

  useEffect(() => {
    if (!selectedChat) return;

    const messageListContainer = document.querySelector(".chat-message-list");
    const unreadMessages = messageListContainer?.querySelectorAll(
      ".cs-message.cs-message--incoming[data-is-read=false]"
    );

    const cbFn = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          decrementUnread(
            selectedChat.id,
            entry.target.getAttribute("data-id")
          );
          observer.unobserve(entry.target);
          onreadNotify(entry.target.getAttribute("data-id"));
        }
      });
    };
    const options = {
      root: messageListContainer,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(cbFn, options);
    unreadMessages?.forEach((target, i) => {
      observer.observe(target);
    });

    return () => {
      unreadMessages?.forEach((target, i) => {
        observer.unobserve(target);
      });
    };
  }, [selectedChat]);

  return (
    <ChatContainer style={chatContainerStyle}>
      <ConversationHeader className="header-cmn">
        <ConversationHeader.Back
          onClick={() => {
            navigate("../");
            handleBackClick();
            selectChat(null);
          }}
        />
        <Avatar
          as="Avatar"
          maxInitials={2}
          size="100%"
          round={true}
          name={headerName}
          src={headerAvatar}
        />
        <ConversationHeader.Content userName={headerName} info="" />
        {selectedChat?.type === "group" && (
          <ConversationHeader.Actions>
            <InfoButton />
            {!isGroupParticipant && (
              <Button
                border
                style={{ padding: "0.3em 1em", fontWeight: "500" }}
                onClick={() => {
                  joinGroup(selectedChat.id);
                }}
              >
                {/* Join group */}
                Вступить в группу
              </Button>
            )}
          </ConversationHeader.Actions>
        )}
      </ConversationHeader>
      {/* <MessageList className="chat-message-list" typingIndicator={<TypingIndicator content="Emily is typing" />}> */}
      {selectedChat?.type !== "help" && (
        <MessageList className="chat-message-list">
          <MessageList.Content>
            {selectedChat?.messagesByDates?.map((sc) => {
              return (
                <div key={sc.date}>
                  <MessageSeparator
                    content={formatDateInMessageListView(sc.date)}
                  />
                  {sc.messages?.map((message) => {
                    const sentTime = formatDateInMessageView(message.createdAt);
                    return (
                      <Message
                        key={message.id}
                        data-id={message.id}
                        data-is-read={message.isRead}
                        model={{
                          sentTime,
                          sender: message.sender.username,
                          direction:
                            message.sender.username === user?.username
                              ? "outgoing"
                              : "incoming",
                          position: "single",
                        }}
                      >
                        {!(message.sender.username === user?.username) && (
                          <Avatar
                            as="Avatar"
                            maxInitials={2}
                            size="100%"
                            round={true}
                            name={message.sender.username}
                            src={
                              selectedChat?.recipients.find(
                                (rec) =>
                                  rec.username === message.sender.username
                              ).avatarImageBase64
                            }
                            className="chat-list-avatar"
                          />
                        )}
                        <Message.CustomContent>
                          {selectedChat.type === "group" &&
                          !(message.sender.username === user?.username) ? (
                            <div className="message-title">
                              <span>{message.sender.username}</span>
                            </div>
                          ) : null}
                          <div className="message-text">
                            {message.text}
                            <span className="message-meta">
                              <span className="message-time">{sentTime}</span>
                            </span>
                          </div>
                        </Message.CustomContent>
                      </Message>
                    );
                  })}
                </div>
              );
            })}
          </MessageList.Content>
        </MessageList>
      )}
      {children}
      {(selectedUser ||
        (selectedChat?.type === "group" && isGroupParticipant)) && (
        <MessageInput
          ref={messageInputRef}
          attachButton={false}
          // placeholder="Type message here"
          placeholder="Введите сообщение..."
          // autoFocus
          onSend={(_, __, textContent) =>
            sendMessage(textContent, selectedChat, selectedUser)
          }
        />
      )}
    </ChatContainer>
  );
};

export default ChatLayout;
