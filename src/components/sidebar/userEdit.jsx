import React, { useState } from 'react'
import { Button, ConversationHeader } from '@chatscope/chat-ui-kit-react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import {
	MAIN_KEY,
} from "../../contexts/sidebar/leftBarKeys";
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';
import ImageUpload from '../imageUpload';
import { useMessengerContext } from '../../contexts/messenger/messengerContext';

const UserEdit = () => {
  const { setActiveSidebarKey } = useSidebarContext();
	const { editUser } = useMessengerContext();
  const [ avatarImageBase64, setAvatarImageBase64 ] = useState(null);
  return (
    <>
      <ConversationHeader className=" header-cmn">
				<ConversationHeader.Content>
					<Button
						className="user-button"
						border
						icon={<FontAwesomeIcon icon={faArrowLeft} />}
						onClick={() => {
							setActiveSidebarKey(MAIN_KEY);
						}}
					/>
					<span>Settings</span>
				</ConversationHeader.Content>
			</ConversationHeader>

      <ImageUpload setImage={setAvatarImageBase64} />

      <div className="bm-btn">
				<Button
					border
					direction="right"
					labelPosition="left"
					disabled={ !avatarImageBase64 }
          icon={<FontAwesomeIcon icon={faCheck} />}
					onClick={() => {
						editUser(avatarImageBase64);
						// setActiveSidebarKey(MAIN_KEY);
					}}
				>Edit</Button>
			</div>
    </>
  )
}

export default UserEdit;
