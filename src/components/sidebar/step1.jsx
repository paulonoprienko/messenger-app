import React, { useState } from "react";
import {
  ArrowButton,
  Button,
  ConversationHeader,
  Search,
} from "@chatscope/chat-ui-kit-react";
import { MAIN_KEY, STEP_2 } from "../../contexts/sidebar/leftBarKeys";

import PickerList from "./pickerList";
import { useSidebarContext } from "../../contexts/sidebar/sidebarContext";
import SidebarAvatar from "./avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Step1 = () => {
  const {
    setActiveSidebarKey,
    setActiveNewGroupKey,
    selectedContacts,
    setSelectedContacts,
  } = useSidebarContext();
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleCheckboxChange = (contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (
        prevSelectedContacts.find((psContact) => psContact.id === contact.id)
      ) {
        return prevSelectedContacts.filter((pContact) => {
          return pContact.id !== contact.id;
        });
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  return (
    <>
      <ConversationHeader className=" header-cmn">
        <ConversationHeader.Content>
          <Button
            className="user-button"
            border
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => {
              setSelectedContacts([]);
              setActiveSidebarKey(MAIN_KEY);
            }}
          />
          {/* <span>Add a member</span> */}
          <span>Добавить участника</span>
        </ConversationHeader.Content>
      </ConversationHeader>

      <div className="selected-container">
        {selectedContacts.map((selectedContact) => (
          <div
            key={selectedContact.id}
            className="selected-item"
            onClick={() => {
              handleCheckboxChange(selectedContact);
            }}
          >
            <SidebarAvatar
              name={selectedContact.username}
              src={selectedContact.avatarImageBase64}
              size="2rem"
              className=""
            />
            <div className="selected-item-name">{selectedContact.username}</div>
            <div className="selected-item-remove">
              <i className="icon-close"></i>
            </div>
          </div>
        ))}
      </div>
      <Search
        // placeholder="Who would you like to add?"
        placeholder="Пригласить кого-нибудь еще?"
        value={searchInputValue}
        onChange={(v) => setSearchInputValue(v)}
        onClearClick={() => setSearchInputValue("")}
      />
      <PickerList
        handleCheckboxChange={handleCheckboxChange}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
      <div className="bm-btn">
        <ArrowButton
          border
          direction="right"
          labelPosition="left"
          onClick={() => {
            setActiveNewGroupKey(STEP_2);
          }}
        >
          {/* Next step */}
          Далее
        </ArrowButton>
      </div>
    </>
  );
};

export default Step1;
