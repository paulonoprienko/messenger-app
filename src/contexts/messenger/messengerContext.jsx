import React, {createContext, useCallback, useEffect, useMemo, useReducer, useState} from "react";
import MessengerReducer from "./messengerReducer";
import { useSocketContext } from "../socket/socketContext";
import { useAuthContext } from "../auth/authContext";

const MessengerContext = createContext();

export function MessengerProvider({children}) {
	const initialState = {
		chats: [],
		searchResults: {
			users: [],
			groups: [],
		},
		createdChat: null,
		isConnect: false,
	};

	const [state, dispatch] = useReducer(MessengerReducer, initialState);

	const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarClassName, setSidebarClassName] = useState('');
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

	const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);

  useEffect(() => {
    if (sidebarVisible) {
      setSidebarClassName('visible');
      setConversationAvatarStyle({ marginRight: "1em" });
      setChatContainerStyle({ display: "none" });
    } else {
      setSidebarClassName('');
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [sidebarVisible, setSidebarVisible, setConversationAvatarStyle, setChatContainerStyle]);


	const [selectedChat, setSelectedChat] = useState();
	const [selectedUser, setSelectedUser] = useState();

	const { lastJsonMessage, sendSocketMessage } = useSocketContext();
	const { user } = useAuthContext();

	useEffect(() => {
		if(!lastJsonMessage) return;
		if(typeof lastJsonMessage.data === 'string') {
			lastJsonMessage = JSON.parse(lastJsonMessage.data);
		}

		dispatch({
			type: lastJsonMessage.type,
			payload: {
				data: lastJsonMessage.data,
			},
			currentUser: user,
		});

	}, [lastJsonMessage]);

	const joinGroup = (chatId) => {
		sendSocketMessage({
			chatId,
			userId: user.id,
			type: 'joiningGroup',
		});
	}
	
	const sendMessage = (textContent, chat, user) => {
		console.log(chat, user)
		if(chat === undefined && user) {
			createChatWithMessage(textContent, user);
			return;
		}

		sendSocketMessage({
			message: textContent,
			chatId: chat.id,
			recipients: chat.recipients,
			type: 'sendingMessage',
		});
	}

	const createChatWithMessage = (textContent, user) => {
		sendSocketMessage({
			message: textContent,
			userId: user.id,
			type: 'creatingChatWithMessage',
		});
	}
	
	const selectChat = React.useCallback((id) => {
		if(!id) {
			setSelectedChat(null);
			setSelectedUser(null);
			return;
		}
		if(id[0] === '-') {
			const chat = state.chats.find(chat => chat.id === id.slice(1));
			if(chat) {
				setSelectedChat(chat);
			}
			setSelectedUser(null);
		}
		else {
			const chat = state.chats.find(chat => {
				if(chat.type === 'direct') {
					const interlocutor = chat.recipients.find(rec => rec.id === id && rec.id !== user.id);
					interlocutor && setSelectedUser(interlocutor);
					return !!interlocutor;
				}
				else return false;
			});
			setSelectedChat(state.chats.find(stateChat => stateChat.id === chat?.id));
		}
	}, [state.chats]);

	const search = React.useCallback((searchInputValue, usersOnly = false) => {
		if(!searchInputValue) {
			dispatch({
				type: 'resetSearchResults',
			});
			return;
		}
		sendSocketMessage({
			searchInputValue,
			usersOnly,
			type: 'search',
		});
	}, [sendSocketMessage]);

	const createNewGroup = (members, avatarImageBase64, name) => {
		sendSocketMessage({
			members,
			name: name.trim(),
			avatarImageBase64,
			type: 'groupCreating',
		});
	}

	const editUser = (avatarImageBase64) => {
		sendSocketMessage({
			avatarImageBase64,
			type: 'userEditing',
		});
	}

	const v = useMemo(() => ({
		chats: state.chats,
		selectedChat,
		selectChat,
		setSelectedChat,
		selectUser: setSelectedUser,
		selectedUser,
		sendMessage,
		search,
		searchResults: state.searchResults,
		joinGroup,
		createNewGroup,
		editUser,
		createdChat: state.createdChat,
		isConnect: state.isConnect,

		sidebarVisible,
		sidebarClassName,
		chatContainerStyle,
		conversationAvatarStyle,
		setSidebarVisible,
		handleBackClick,
		handleConversationClick,
	}), [
		state.chats,
		state.searchResults,
		selectedUser,
		selectedChat,
		state.createdChat,
		state.isConnect,

		sidebarVisible,
		sidebarClassName,
		chatContainerStyle,
		conversationAvatarStyle,
		setSidebarVisible,
		handleBackClick,
		handleConversationClick,
	]);

	return (
		<MessengerContext.Provider value={v}>
			{children}
		</MessengerContext.Provider>
	);
}

export const useMessengerContext = () => React.useContext(MessengerContext);