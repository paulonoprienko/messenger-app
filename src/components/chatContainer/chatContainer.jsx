// import {
// 	ChatContainer as ChatContainerUI,
// 	ConversationHeader,
// 	Avatar,
// 	MessageList,
// 	Message,
// 	MessageInput,
// 	TypingIndicator,
// 	MessageSeparator,
// 	Button,
// } from "@chatscope/chat-ui-kit-react";
// import emilyIco from "../../icons/emily.d34aecd9.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useLayoutEffect, useState } from "react";
// import { useMessengerContext } from "../../contexts/messenger/messengerContext";
// import { useAuthContext } from "../../contexts/auth/authContext";

// export default function ChatContainer() {
// 	const { user } = useAuthContext();
// 	const { 
// 		selectChat,
// 		selectedChat,
// 		sendMessage,
// 		selectedUser,
// 		joinGroup,
// 		handleBackClick
// 	} = useMessengerContext();
// 	const navigate = useNavigate();
// 	const params = useParams();
	
// 	useEffect(() => {
// 		selectChat(params.chatId)
// 	}, [params, selectChat]);
	
// 	const [ isGroupParticipant, setIsGroupParticipant ] = useState(false);
// 	useLayoutEffect(() => {
// 		setIsGroupParticipant( !!(selectedChat?.recipients.find(rec => rec.id === user.id)) );			
// 	}, [selectedChat, isGroupParticipant]);

// 	return (
// 		<ChatContainerUI>
// 			<ConversationHeader className="header-cmn">
//         <ConversationHeader.Back onClick={() => {
//           navigate('../');
//           handleBackClick();
//           selectChat(undefined);
//         }} />
// 				<Avatar
// 					src={emilyIco}
// 					// name={selectedChat?.name} 
// 				/>
// 				<ConversationHeader.Content
// 					userName={(selectedChat?.type === "group") ? selectedChat?.name : selectedUser?.username}
// 					info=""
// 				/>
// 				{
// 					( selectedChat?.type === "group" && !isGroupParticipant ) && 
// 					<ConversationHeader.Actions>
// 						<Button border style={{padding: '0.3em 1em', fontWeight: '500'}}
// 							onClick={() => {joinGroup(selectedChat.id)}}
// 						>Join group</Button>
// 					</ConversationHeader.Actions>
// 				}         
// 			</ConversationHeader>
// 			{/* <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}> */}
// 			<MessageList className="chat-message-list">
// 				{/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
// 				{selectedChat?.messages?.map(message => {
// 					return (
// 						<Message key={message.id} model={{
// 							message: message.text,
// 							sentTime: "15 mins ago",
// 							sender: message.sender.username,
// 							direction: message.sender.username === user.username ? "outgoing" : "incoming",
// 							position: "single",
// 						}}>
// 							{!(message.sender.username === user.username) && <Avatar src={emilyIco} name={"Emily"} />}
// 							<Message.Footer
// 								sender={(selectedChat.type === 'group') ? message.sender.username : null}
// 								sentTime="just now"
// 							/>
// 						</Message>
// 					);
// 				})}
// 			</MessageList>

// 			{
// 				(selectedUser || (selectedChat?.type === "group" && isGroupParticipant)) &&
// 				<MessageInput
// 					attachButton={false}
// 					placeholder="Type message here"
// 					onSend={(textContent) => sendMessage(textContent, selectedChat, selectedUser)}
// 				/>
// 			}
// 		</ChatContainerUI>
// 	);
// }

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import DirectChat from "./directChat";
import GroupChat from "./groupChat";

const ChatContainer = () => {
	const {selectChat, selectedChat} = useMessengerContext();
	
	const params = useParams();
	
	useEffect(() => {
		selectChat(params.chatId)
	}, [params, selectChat]);

	return (
		<>
			{selectedChat?.type !== 'group'
      ? <DirectChat />
      : <GroupChat />}
		</>
	);
}

export default ChatContainer;