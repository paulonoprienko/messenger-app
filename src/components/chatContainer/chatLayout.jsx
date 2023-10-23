import {
	ChatContainer,
	ConversationHeader,
	// Avatar,
	MessageList,
	Message,
	MessageInput,
	InfoButton,
	TypingIndicator,
	MessageSeparator,
	Button,
} from "@chatscope/chat-ui-kit-react";
import emilyIco from "../../icons/emily.d34aecd9.svg";
import Avatar from "react-avatar";

import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import { useAuthContext } from '../../contexts/auth/authContext';
import { useNavigate } from "react-router-dom";

export const ChatLayout = ({isGroupParticipant, headerName, headerAvatar}) => {

	const {user} = useAuthContext();
	const {selectChat, selectedChat, sendMessage, joinGroup, handleBackClick, chatContainerStyle, selectedUser} = useMessengerContext();
	const navigate = useNavigate();
	
	return (
		<ChatContainer style={chatContainerStyle}>
			<ConversationHeader className="header-cmn">
        <ConversationHeader.Back onClick={() => {
          navigate('../');
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
					{selectedChat?.type === 'group' && 
					<ConversationHeader.Actions>
					<InfoButton />
					{
						!isGroupParticipant && 
						<Button border style={{padding: '0.3em 1em', fontWeight: '500'}}
							onClick={() => {joinGroup(selectedChat.id)}}
						>Join group</Button>
					}
				</ConversationHeader.Actions>}
			</ConversationHeader>
			{/* <MessageList className="chat-message-list" typingIndicator={<TypingIndicator content="Emily is typing" />}> */}
			<MessageList className="chat-message-list">
				<MessageList.Content>
				{selectedChat?.messagesByDates?.map(sc => {
					return (
						<div key={sc.date}>
							<MessageSeparator
								content={`${sc.date.getFullYear()}-${sc.date.getMonth()+1}-${sc.date.getDate()}`}
							/>
							{sc.messages?.map(message => {
								let sentTimeHours = message.createdAt.getHours();
								let sentTimeMinutes = message.createdAt.getMinutes();
								sentTimeHours = sentTimeHours < 10 ? '0' + sentTimeHours : sentTimeHours;
								sentTimeMinutes = sentTimeMinutes < 10 ? '0' + sentTimeMinutes : sentTimeMinutes;
								return (
										<Message key={message.id} model={{
											sentTime: `${sentTimeHours}:${sentTimeMinutes}`,
											sender: message.sender.username,
											direction: message.sender.username === user?.username ? "outgoing" : "incoming",
											position: "single",
										}}>
											{
												!(message.sender.username === user?.username) &&
												<Avatar
													as="Avatar"
													maxInitials={2}
													size="100%"
													round={true}
													name={message.sender.username}
													src={selectedChat?.recipients.find(rec => rec.username === message.sender.username).avatarImageBase64}
													className="chat-list-avatar"
												/>
											}
											<Message.CustomContent>
												{
													(selectedChat.type === 'group' && !(message.sender.username === user?.username))
														? <div className="message-title">
															<span>{message.sender.username}</span>
														</div>
														: null
												}
												<div className="message-text">
													{message.text}
													<span className="message-meta">
														<span className="message-time">
															{`${sentTimeHours}:${sentTimeMinutes}`}
														</span>
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
				{/* {selectedChat?.messages?.map(message => {
					let sentTimeHours = message.createdAt.getHours();
					let sentTimeMinutes = message.createdAt.getMinutes();
					sentTimeHours = sentTimeHours < 10 ? '0' + sentTimeHours : sentTimeHours;
					sentTimeMinutes = sentTimeMinutes < 10 ? '0' + sentTimeMinutes : sentTimeMinutes;
					return (
							<Message key={message.id} model={{
								sentTime: `${sentTimeHours}:${sentTimeMinutes}`,
								sender: message.sender.username,
								direction: message.sender.username === user?.username ? "outgoing" : "incoming",
								position: "single",
							}}>
								{
									!(message.sender.username === user?.username) &&
									<Avatar
										as="Avatar"
										maxInitials={2}
										size="100%"
										round={true}
										name={message.sender.username}
										src={selectedChat?.recipients.find(rec => rec.username === message.sender.username).avatarImageBase64}
										className="chat-list-avatar"
									/>
								}
								<Message.CustomContent>
									{
										(selectedChat.type === 'group' && !(message.sender.username === user?.username))
											? <div className="message-title">
												<span>{message.sender.username}</span>
											</div>
											: null
									}
									<div className="message-text">
										{message.text}
										<span className="message-meta">
											<span className="message-time">
												{`${sentTimeHours}:${sentTimeMinutes}`}
											</span>
										</span>
									</div>
								</Message.CustomContent>
							</Message>
					);
				})} */}
			</MessageList>
			{
				(selectedUser || (selectedChat?.type === "group" && isGroupParticipant)) && 
				<MessageInput
					attachButton={false}
					placeholder="Type message here"
					onSend={(textContent) => sendMessage(textContent, selectedChat, selectedUser)}
				/>
			}
		</ChatContainer>
	);
}

export default ChatLayout;