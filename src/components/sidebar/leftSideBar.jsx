import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Search,
  Button,
  ConversationHeader,
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import { Tab } from "react-bootstrap";

import NewGroupPane from "./newGroupPane";
import Conversations from "./conversations";
import SearchResults from "./searchResults";

import {
  MAIN_KEY,
  PROFILE_KEY,
  PROFILE_INFO_KEY,
  PROFILE_EDIT_KEY,
  NEW_GROUP_KEY,
  CONVERSATIONS_KEY,
  SEARCH_RESULTS_KEY,
} from "../../contexts/sidebar/leftBarKeys";
import { useSidebarContext } from "../../contexts/sidebar/sidebarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faArrowLeft,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import UserEdit from "./userEdit";
import ProfileInfo from "./profileInfo";

const LeftSideBar = () => {
  const { search, sidebarClassName, isConnect } = useMessengerContext();
  const {
    activeSidebarKey,
    setActiveSidebarKey,
    activeMainKey,
    setActiveMainKey,
    activeProfileSidebarKey,
  } = useSidebarContext();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [headerButtonIcon, setHeaderButtonIcon] = useState(faUserCog);
  const [headerButtonClickHandler, setHeaderButtonClickHandler] =
    useState(null);

  useEffect(() => {
    if (searchInputValue) {
      setHeaderButtonIcon(faArrowLeft);
      setHeaderButtonClickHandler(() => handleBackToChatListClick);
      setActiveMainKey(SEARCH_RESULTS_KEY);
      search(searchInputValue);
    } else {
      setHeaderButtonIcon(faUserCog);
      setHeaderButtonClickHandler(() => handleUserEditClick);
      setActiveMainKey(CONVERSATIONS_KEY);
    }
  }, [searchInputValue]);

  const handleUserEditClick = () => {
    setActiveSidebarKey(PROFILE_KEY);
  };

  const handleBackToChatListClick = () => {
    setSearchInputValue("");
  };

  return (
    <Sidebar
      position="left"
      className={`left-bar ${sidebarClassName}`}
      scrollable={false}
    >
      <Tab.Container activeKey={activeSidebarKey}>
        <Tab.Content className="overflow-hidden flex-grow-1">
          <Tab.Pane eventKey={MAIN_KEY}>
            <Tab.Container activeKey={activeMainKey}>
              <ConversationHeader className=" header-cmn">
                <ConversationHeader.Content>
                  {isConnect ? (
                    <Button
                      className="user-button"
                      border
                      icon={<FontAwesomeIcon icon={headerButtonIcon} />}
                      onClick={headerButtonClickHandler}
                    />
                  ) : (
                    <div className="loader-header">
                      <Loader />
                    </div>
                  )}
                  <Search
                    // placeholder="Search..."
                    placeholder="Поиск людей и групп..."
                    value={searchInputValue}
                    onChange={(v) => setSearchInputValue(v)}
                    onClearClick={() => setSearchInputValue("")}
                    style={{ width: "100%" }}
                    className={
                      searchInputValue ? "header-search" : "header-search empty"
                    }
                  />
                </ConversationHeader.Content>
              </ConversationHeader>
              <Tab.Content className="overflow-auto flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                  <Conversations />
                  <div className="bm-btn">
                    <Button
                      border
                      icon={<FontAwesomeIcon icon={faUsers} />}
                      onClick={() => {
                        setActiveSidebarKey(NEW_GROUP_KEY);
                      }}
                    >
                      {/* New group */}
                      Создать группу
                    </Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey={SEARCH_RESULTS_KEY}>
                  <SearchResults setSearchInputValue={setSearchInputValue} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Tab.Pane>
          <Tab.Pane eventKey={NEW_GROUP_KEY}>
            {activeSidebarKey === NEW_GROUP_KEY && <NewGroupPane />}
          </Tab.Pane>
          <Tab.Pane eventKey={PROFILE_KEY}>
            <Tab.Container activeKey={activeProfileSidebarKey}>
              <Tab.Content>
                <Tab.Pane eventKey={PROFILE_INFO_KEY}>
                  <ProfileInfo />
                </Tab.Pane>
              </Tab.Content>
              <Tab.Content>
                <Tab.Pane eventKey={PROFILE_EDIT_KEY}>
                  <UserEdit />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Sidebar>
  );
};

export default LeftSideBar;
