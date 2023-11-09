import React, { useState } from "react";
import {
  Button,
  ConversationHeader,
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { STEP_1 } from "../../contexts/sidebar/leftBarKeys";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import { Form } from "react-bootstrap";
import { useSidebarContext } from "../../contexts/sidebar/sidebarContext";
import ImageUpload from "../imageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Step2 = () => {
  const { setActiveNewGroupKey, selectedContacts } = useSidebarContext();
  const { createNewGroup } = useMessengerContext();
  const [newGroupName, setNewGroupName] = useState("");
  const [avatarImageBase64, setAvatarImageBase64] = useState(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <ConversationHeader className=" header-cmn">
        <ConversationHeader.Content>
          <Button
            className="user-button"
            border
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => {
              setActiveNewGroupKey(STEP_1);
            }}
          />
          {/* <span>New group</span> */}
          <span>Создание группы</span>
        </ConversationHeader.Content>
      </ConversationHeader>
      <ImageUpload image={avatarImageBase64} setImage={setAvatarImageBase64} />
      <div className="form-controls">
        <Form.Control
          type="text"
          // placeholder="Group name"
          placeholder="Имя группы"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
      </div>
      <div className="bm-btn">
        {!isPending ? (
          <Button
            border
            direction="right"
            labelPosition="left"
            disabled={!newGroupName.trim()}
            onClick={() => {
              createNewGroup(selectedContacts, avatarImageBase64, newGroupName);
              setIsPending(true);
            }}
          >
            {/* Create group */}
            Создать
          </Button>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Step2;
