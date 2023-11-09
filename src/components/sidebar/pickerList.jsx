import React, { useEffect } from "react";
import { ConversationList as PickerContainer } from "@chatscope/chat-ui-kit-react";
import { useAuthContext } from "../../contexts/auth/authContext";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import PickerItem from "./pickerItem";

const PickerList = ({
  handleCheckboxChange,
  searchInputValue,
  setSearchInputValue,
}) => {
  const { user } = useAuthContext();
  const { chats, search, searchResults } = useMessengerContext();

  useEffect(() => {
    search(searchInputValue, true);
  }, [searchInputValue]);

  const pickerList = !searchInputValue
    ? chats
        ?.filter((chat) => chat.type === "direct")
        .map((chat) => {
          return chat.recipients.find((rec) => rec.id !== user.id);
        })
    : searchResults.users;

  return (
    <PickerContainer scrollable={true} className="picker-container">
      {pickerList.map((contact) => (
        <PickerItem
          key={contact.id}
          as="Conversation"
          contact={contact}
          handleCheckboxChange={handleCheckboxChange}
          setSearchInputValue={setSearchInputValue}
        />
      ))}

      {/* {Array(15).fill('no matter').map((el, index) => {
        return (
          <PickerItem
          key={index}
          name={index+1}
          
          ></PickerItem>
        )
      })} */}
    </PickerContainer>
  );
};

export default PickerList;
