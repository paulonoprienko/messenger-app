import React, { useState, useEffect, useRef } from 'react'
import { Button, ConversationHeader } from '@chatscope/chat-ui-kit-react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPen, faSignOutAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import {
	MAIN_KEY,
  PROFILE_EDIT_KEY
} from "../../contexts/sidebar/leftBarKeys";
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';
import { useMessengerContext } from '../../contexts/messenger/messengerContext';
import Avatar from 'react-avatar';
import { useAuthContext } from '../../contexts/auth/authContext';

const ProfileInfo = () => {
  const { setActiveSidebarKey, setActiveProfileSidebarKey } = useSidebarContext();
  const { profile } = useMessengerContext();
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
					<div style={{flexGrow: 1}}>Profile</div>
          <ConversationHeader.Actions>
            <Button
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => {
                setActiveProfileSidebarKey(PROFILE_EDIT_KEY);
              }}
            />
            <LogoutDropdown />
          </ConversationHeader.Actions>
				</ConversationHeader.Content>
			</ConversationHeader>
      <ProfilePhoto name={profile.username} src={profile.avatarImageBase64} />
    </>
  )
}

const ProfilePhoto = ({name, src}) => {
  return (
    <div className="item-responsive">
      <Avatar className="profile-photo"
        maxInitials={2}
        size={"100%"}
        round={false}
        name={name}
        src={src}
      />
      <div className="profile-title">
        <h4>{name}</h4>
      </div>
    </div>
  );
}

const LogoutDropdown = () => {
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const { logOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen((prev) => !prev);
  }
  useEffect(() => {
    if(!isOpen) return;
    const handleClick = (e) => {
      if(!menuRef.current) return;
      if(!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [isOpen, onClose]);

  return (
    <div className={isOpen ? "my-show my-dropdown" : "my-dropdown"}>
      <div ref={btnRef}>

        <Button
          className={isOpen ? "dropdown-btn active" : "dropdown-btn"}
          icon={<FontAwesomeIcon icon={faEllipsisV} />}
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <div ref={menuRef} className={isOpen ? "my-show my-dropdown-menu" : "my-dropdown-menu"}>
        <ul className="my-dropdown-items">
          <li>
            <Button
              className="dropdown-li-btn"
              icon={<FontAwesomeIcon icon={faSignOutAlt} />}
              labelPosition='left'
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileInfo;
