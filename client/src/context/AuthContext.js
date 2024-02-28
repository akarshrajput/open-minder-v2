import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT_SUCCESS":
    case "GET_USER":
    case "UPDATE_SUCCESS":
    case "DELETE_USER":
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  async function signup(name, username, email, password, passwordConfirm) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users/signup`, {
        name,
        username,
        email,
        password,
        passwordConfirm,
      });

      if (response.data.status === "success") {
        const { user, token } = response.data.data;
        console.log(user);
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: { user },
        });
        document.cookie = `jwt=${token}; path=/`;
      } else {
        console.error(response.data.message);
        // dispatch({ type: "SIGNUP_ERROR", payload: response.data.message });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        username,
        password,
      });
      //   console.log(response);
      if (response.data.status === "success") {
        const { user, token } = response.data.data;
        console.log(user);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user },
        });
        document.cookie = `jwt=${token}; path=/`;
      } else {
        console.error(response.data.message);
        // dispatch({ type: "SIGNUP_ERROR", payload: response.data.message });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  function logout() {}

  function getUser() {}

  function updateUser() {}

  function deleteUser() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
