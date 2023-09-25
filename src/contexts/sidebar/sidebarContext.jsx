import React, { createContext, useMemo, useState } from "react";
import {
  CONVERSATIONS_KEY,
  MAIN_KEY,
  STEP_1
} from "./leftBarKeys";

const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {
  const [activeSidebarKey, setActiveSidebarKey] = useState(MAIN_KEY);
  const [activeMainKey, setActiveMainKey] = useState(CONVERSATIONS_KEY);
  const [activeNewGroupKey, setActiveNewGroupKey] = useState(STEP_1);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const v = useMemo(() => ({
		activeSidebarKey,
    activeMainKey,
    activeNewGroupKey,
    setActiveSidebarKey,
    setActiveMainKey,
    setActiveNewGroupKey,
    selectedContacts,
    setSelectedContacts,
	}), [
    activeSidebarKey,
    activeMainKey,
    activeNewGroupKey,
    setActiveSidebarKey,
    setActiveMainKey,
    setActiveNewGroupKey,
    selectedContacts,
    setSelectedContacts,
  ]);

  return (
    <SidebarContext.Provider value={v}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => React.useContext(SidebarContext);