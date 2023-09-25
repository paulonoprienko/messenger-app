import React, {createContext, useEffect, useReducer} from "react";
import AuthReducer from "./authReducer";
import {
  LOGIN,
  SET_USER,
  LOGOUT,

} from "../eventsTypes";
import useLocalStorage from "../../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useLocalStorage('user');
  const initialState = {
    user: user,
    isAuthenticated: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  useEffect(() => {
    if(user) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    }
  }, [user]);


  const logInUser = async (username, password) => {
    let response = await fetch('http://localhost:8000/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    
    if(response.ok) {
      let data = await response.json();
      console.log(data)

      dispatch({
        type: LOGIN,
        payload: {
          data,
          setUser
        }
      });
    }
  }

  const register = async (username, password) => {
    let response = await fetch('http://localhost:8000/api/user/register', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    
    if(response.ok) {
      let data = await response.json();
      console.log(data)

      dispatch({
        type: LOGIN,
        payload: {
          data,
          setUser
        }
      });
    }
  }

  const v = {
    logInUser,
    register,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  };

  return (
    <AuthContext.Provider value={v}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);