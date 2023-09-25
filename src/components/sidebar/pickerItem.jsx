import React, { useRef } from 'react';
import { Conversation } from '@chatscope/chat-ui-kit-react';
import { Form } from 'react-bootstrap';
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';
import SidebarAvatar from './avatar';

const PickerItem = ({ contact, handleCheckboxChange, setSearchInputValue }) => {

  const { selectedContacts } = useSidebarContext();

  const pickerCheck = useRef(null);

  const handlePickItem = () => {
    pickerCheck.current.click();
  }

  return (
    <Conversation onClick={handlePickItem}>
      <Conversation.Content>
        <Form.Group
          controlId={contact.id} 
          onClick={(e) => {
            handlePickItem();
            e.preventDefault();
          }}
        >
          <Form.Check
            type="checkbox"
            ref={pickerCheck}
            checked={!!selectedContacts.find(sContact => sContact.id === contact.id)}
            label={
              <>
                <SidebarAvatar name={contact.username} src={contact.avatarImageBase64} />
                <div>{contact.username}</div>
              </>
            }
            onChange={() => {
              handleCheckboxChange(contact);
              setSearchInputValue('');
            }}
            className="left-bar-form-check"
          >
          </Form.Check>
        </Form.Group>
      </Conversation.Content>
    </Conversation>
  );
}

export default PickerItem;