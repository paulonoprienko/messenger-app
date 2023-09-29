import React, {createContext, useMemo} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useAuthContext } from "../auth/authContext"; 

// const WS_URL = 'wss://admitted-busy-doom.glitch.me';
const WS_URL = process.env.REACT_APP_WS_URL;

const SocketContext = createContext();

console.log(process.env)

export function SocketProvider({children}) {

	const { user } = useAuthContext();

	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL, {
		onOpen: () => {
			console.log('WebSocket connection established.');
			sendJsonMessage({
				token: user.token,
				userId: user.id,
				username: user.username,
				// token: 'invalidToken',
				type: 'auth'
			});
		},
		onClose: (closeEvent) => {
			if(closeEvent.reason) {
				console.log('Access denied. Reason: ' + closeEvent.reason + '. WebSocket connection closed.');
			}
		},
		share: true,
		retryOnError: true,
		shouldReconnect: (closeEvent) => {
			if(closeEvent.reason === 'unauthorized') {
				return false
			}
			return true
		},
	}, (user ? true : false));

	const sendSocketMessage = (message) => {
		sendJsonMessage({
			...message,
			token: user.token,
		});
	}

	const v = useMemo(() => ({
		lastJsonMessage,
		sendSocketMessage,
		readyState,
	}), [lastJsonMessage, sendSocketMessage, readyState]);

	return (
		<SocketContext.Provider value={v}>
			{children}
		</SocketContext.Provider>
	);
}

export const useSocketContext = () => React.useContext(SocketContext);