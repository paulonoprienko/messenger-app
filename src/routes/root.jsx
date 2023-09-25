import React, { useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
} from "@chatscope/chat-ui-kit-react";
import { Outlet, useNavigate } from 'react-router-dom';

import LeftSideBar from '../components/sidebar/leftSideBar';
import { useAuthContext } from '../contexts/auth/authContext';
import { SidebarProvider } from '../contexts/sidebar/sidebarContext';

export default function Root() {

  const {user, isAuthenticated} = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <SidebarProvider>
      <MainContainer responsive style={{ position: "relative", height: "100vh" }}>
        <LeftSideBar />
        <Outlet />
      </MainContainer>
    </SidebarProvider>
  );
}