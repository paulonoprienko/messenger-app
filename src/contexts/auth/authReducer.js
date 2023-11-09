import { LOGIN, SET_USER, LOGOUT, ERROR } from "../eventsTypes";

const logInUser = ({ data, setUser }, state) => {
  setUser(data);
  return {
    ...state,
    user: {
      id: data.id,
      username: data.username,
      profileAvatar: data.profileAvatar,
      token: data.token,
    },
    isAuthenticated: true,
    error: null,
  };
};

const setUser = ({ id, username, profileAvatar, token }, state) => {
  return {
    ...state,
    user: {
      id,
      username,
      profileAvatar,
      token,
    },
    isAuthenticated: true,
  };
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return logInUser(action.payload, state);
    case SET_USER:
      return setUser(action.payload, state);
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case ERROR:
      return {
        ...state,
        error: {
          message: action.payload.errMsg,
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
