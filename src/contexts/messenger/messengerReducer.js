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

const mapMessagesCreationTime = (chat) => {
	return {
		...chat,
		messages: chat.messages.map(message => {
			return {
				...message,
				createdAt: new Date(message.createdAt)
			}
		}),
	};
}

const structureMessagesByDateSubarrays = (chat) => {
	let messagesByDates = [];
	let dateY = undefined;
	let dateM = undefined;
	let dateD = undefined;
	let el = null;
	chat.messages.forEach(message => {
		let date = message.createdAt;
		if(dateD !== date.getDate() || dateM !== date.getMonth() || dateY !== date.getFullYear()) {
			if(el) {
				messagesByDates.push(el);
			}
			dateD = date.getDate();
			dateM = date.getMonth();
			dateY = date.getFullYear();
			el = { date: new Date(`${dateY}-${dateM+1}-${dateD}`), messages: [] };
		}
		el.messages.push(message);

	});
	if(el) {
		messagesByDates.push(el);
	}

	return messagesByDates;
}

const getInitialData = (data, state, currentUser) => {
	const chats = data.chats.map(chat => {
		if(chat.type === "direct") {
			const mappedChat = mapMessagesCreationTime(chat);
			const { username, avatarImageBase64 } = mappedChat.recipients.find(recipient => recipient.id !== currentUser.id);
			return { ...mappedChat, name: username, avatarImageBase64, messagesByDates: structureMessagesByDateSubarrays(mappedChat) };
		}
		else {
			const mappedChat = mapMessagesCreationTime(chat);
			return { ...mappedChat, messagesByDates: structureMessagesByDateSubarrays(mappedChat) };
		}
	});

	return {
		...state,
		profile: data.profile,
		chats,
		isConnect: true,
	};
}

const addMessage = (data, state) => {
	const createdAt = new Date(data.message.createdAt);
	const chats = state.chats.map(chat => {
		if(chat.id === data.chatId) {
			chat.messages = [
				...chat.messages,
				{ ...data.message, createdAt }
			];
			
			const dateD = chat.messagesByDates[chat.messagesByDates.length-1]?.date.getDate();
			const dateM = chat.messagesByDates[chat.messagesByDates.length-1]?.date.getMonth();
			const dateY = chat.messagesByDates[chat.messagesByDates.length-1]?.date.getFullYear();

			if(dateD === createdAt.getDate() && dateM === createdAt.getMonth() && dateY === createdAt.getFullYear()) {
				chat.messagesByDates[chat.messagesByDates.length-1].messages = [
					...chat.messagesByDates[chat.messagesByDates.length-1].messages,
					{ ...data.message, createdAt }
				];
			} else {
				chat.messagesByDates = [
					...chat.messagesByDates,
					{
						date: new Date(`${createdAt.getFullYear()}-${createdAt.getMonth()+1}-${createdAt.getDate()}`),
						messages: [{ ...data.message, createdAt }]
					}
				];
			}

			chat.messagesByDates = [
				...chat.messagesByDates
			];
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
	const mappedChat = mapMessagesCreationTime(data.chat);
	const { username, avatarImageBase64 } = mappedChat.recipients.find(recipient => recipient.id !== currentUser.id);
	const chats = [
		...state.chats,
		{
			...mappedChat,
			name: username,
			avatarImageBase64,
			messagesByDates: structureMessagesByDateSubarrays(mappedChat)
		}
	];
	return {
		...state,
		chats,
	};
}

const addGroupChat = (data, state) => {
	let chats;
	const mappedChat = mapMessagesCreationTime(data.chat);
	if(state.chats.some(chat => chat.id === data.chat.id)) {
		chats = [
			...state.chats.map(chat => {
				if(chat.id === data.chat.id) {
					return {
						...mappedChat,
						messagesByDates: structureMessagesByDateSubarrays(mappedChat)
					};
				}
				else return chat;
			})
		];
	}
	else {
		
		chats = [
			...state.chats,
			{
				...mappedChat,
				messagesByDates: structureMessagesByDateSubarrays(mappedChat)
			}
		];
	}
	
	return {
		...state,
		chats,
	};
}

const userEditNotify = (data, state) => {
	const chats = [...state.chats];
	chats.forEach(chat => {
		chat.recipients.forEach(rec => {
			if(rec.id === data.userId) {
				rec.avatarImageBase64 = data.profile.avatar;
				if(chat.type === "direct") {
					chat.avatarImageBase64 = data.profile.avatar;
				}
			}
		});
	});
	
	return {
		...state,
		chats
	}
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
			console.log(state.profile)
			return {
				...state,
				profile: {...state.profile, avatarImageBase64: action.payload.data.profile.avatar},
			};

		case "userEditNotify":
			return userEditNotify(action.payload.data, state);

		default:
			return state;
	}
}

export default MessengerReducer;