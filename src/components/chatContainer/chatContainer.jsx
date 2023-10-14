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