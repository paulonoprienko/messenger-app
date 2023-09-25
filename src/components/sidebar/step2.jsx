import React, { useState } from 'react';
import { ArrowButton, Button, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import {
	MAIN_KEY,
	STEP_1,
} from "../../contexts/sidebar/leftBarKeys";
import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import { Form } from 'react-bootstrap';
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';
import ImageUpload from '../imageUpload';

const Step2 = () => {
	const { setActiveSidebarKey, setActiveNewGroupKey, selectedContacts } = useSidebarContext();
	const { createNewGroup } = useMessengerContext();
	const [ newGroupName, setNewGroupName ] = useState('');
	const [ avatarImageBase64, setAvatarImageBase64 ] = useState(null);

	return (
		<>
			<ConversationHeader className=" header-cmn">
				<ConversationHeader.Content>
					<ArrowButton
						direction="left"
						onClick={() => {
							setActiveNewGroupKey(STEP_1);
						}}
					/>
					<span>New group</span>
				</ConversationHeader.Content>
			</ConversationHeader>
			{/* <div>
				<ArrowButton
					direction="left"
					onClick={() => {
						setActiveNewGroupKey(STEP_1);
					}}
				/>
				<span>New group</span>
			</div> */}
			<ImageUpload setImage={setAvatarImageBase64} />
			<Form.Control
				type="text"
				placeholder="Group name"
				value={ newGroupName }
				onChange={e => setNewGroupName(e.target.value)}
			/>
			<div className="bm-btn">
				<Button
					border
					direction="right"
					labelPosition="left"
					disabled={ !newGroupName.trim() }
					onClick={() => {
						createNewGroup(selectedContacts, avatarImageBase64, newGroupName);
						setActiveSidebarKey(MAIN_KEY);
					}}
				>Create group</Button>
			</div>
		</>
	);
}

export default Step2;