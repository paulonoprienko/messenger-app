import {
	CONNECT_AUTH,
	SENDING_MESSAGE,
	SEARCH,
	CREATING_CHAT_WITH_MESSAGE,
	JOINING_GROUP,
	CREATING_GROUP,
	// AFTER_CREATING_GROUP,
	EDITING_USER,

} from "../eventsTypes";

const getInitialData = (data, state, currentUser) => {
	const chats = data.chats.map(chat => {
		if(chat.type === "direct") {
			const { username, avatarImageBase64 } = chat.recipients.find(recipient => recipient.id !== currentUser.id);
			return { ...chat, name: username, avatarImageBase64 };
		}
		else {
			return chat;
		}
	});

	return {
		...state,
		chats,
		isConnect: true,
	};
}

const addMessage = (data, state) => {
	console.log(data)
	const chats = state.chats.map(chat => {
		if(chat.id === data.chatId) {
			chat.messages = [...chat.messages, data.message];
		}
		return {
			...chat,
		}
	});
	return {
		...state,
		chats
	};
}

const updSearchResults = (data, state) => {
	// console.log(data)
	return {
		...state,
		searchResults: {
			users: data.users,
			groups: data.groups,
		},
	};
}

const addChat = (data, state, currentUser) => {
	console.log(data);
	const {username} = data.chat.recipients.find(recipient => recipient.id !== currentUser.id);
	data.chat = {...data.chat, name: username};
	const chats = [...state.chats, data.chat];
	return {
		...state,
		chats,
	};
}

const addGroupChat = (data, state) => {
	let chats;
	if(state.chats.some(chat => chat.id === data.chat.id)) {
		chats = [
			...state.chats.map(chat => {
				if(chat.id === data.chat.id) {
					return data.chat;
				}
				else return chat;
			})
		];
	}
	else {
		chats = [
			...state.chats,
			data.chat
		];
	}
	
	return {
		...state,
		chats,
	};
}


const MessengerReducer = (state, action) => {
	switch(action.type) {
		case CONNECT_AUTH:
			return getInitialData(action.payload.data, state, action.currentUser);

		case SENDING_MESSAGE:
			return addMessage(action.payload.data, state);

		case SEARCH:
			return updSearchResults(action.payload.data, state);

		case 'resetSearchResults':
			return {
				...state,
				searchResults: {
					users: [],
					groups: [],
				},
			};

		case CREATING_CHAT_WITH_MESSAGE:
			return addChat(action.payload.data, state, action.currentUser);

		case JOINING_GROUP:
			return addGroupChat(action.payload.data, state);

		case CREATING_GROUP:
			return addGroupChat(action.payload.data, state);

		case "afterCreatingGroup":
			return {
				...state,
				createdChat: action.payload.data.chat
			}

		case EDITING_USER:
			return state;

		default:
			return state;
	}
}

export default MessengerReducer;