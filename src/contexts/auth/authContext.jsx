import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";
import { LOGIN, SET_USER, LOGOUT, ERROR } from "../eventsTypes";
import useLocalStorage from "../../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const initialState = {
    user: user,
    isAuthenticated: false,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    }
  }, [user]);

  const logInUser = async (username, password) => {
    let response = await fetch(process.env.REACT_APP_LOGIN, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: LOGIN,
        payload: {
          data,
          setUser,
        },
      });
    } else {
      const message = (await response.json()).message;
      dispatch({
        type: ERROR,
        payload: {
          errMsg: message,
        },
      });
    }
  };

  const register = async (username, password) => {
    let response = await fetch(process.env.REACT_APP_REGISTER, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data);

      dispatch({
        type: LOGIN,
        payload: {
          data,
          setUser,
        },
      });
    } else {
      const message = (await response.json()).message;
      dispatch({
        type: ERROR,
        payload: {
          errMsg: message,
        },
      });
    }
  };

  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
    setUser(null);
  };

  const v = {
    logInUser,
    register,
    logOut,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
  };

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => React.useContext(AuthContext);
