import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "https://open-minder-v2-backend.up.railway.app";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function checkAndAutoLogin() {
      const token = getCookie("jwt");
      if (token) {
        try {
          dispatch({ type: "LOADING", payload: { isLoading: true } });
          const response = await axios.get(`${BASE_URL}/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === "success") {
            const { user } = response.data.data;
            dispatch({
              type: "SET_USER",
              payload: { user },
            });
          } else {
            // Token is no longer valid, logout the user
            dispatch({ type: "LOGOUT_SUCCESS" });
            document.cookie =
              "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Remove the invalid cookie
          }
        } catch (err) {
          console.error("Error checking token:", err);
          // Token is no longer valid, logout the user
          dispatch({ type: "LOGOUT_SUCCESS" });
          document.cookie =
            "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Remove the invalid cookie
        } finally {
          dispatch({ type: "LOADING", payload: { isLoading: false } });
        }
      } else {
        // No token found, set isLoading to false
        dispatch({ type: "LOADING", payload: { isLoading: false } });
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    }

    checkAndAutoLogin();
  }, [dispatch]);

  async function signup(name, username, email, password, passwordConfirm) {
    try {
      dispatch({ type: "LOADING", payload: { isLoading: true } });
      const response = await axios.post(`${BASE_URL}/api/v1/users/signup`, {
        name,
        username,
        email,
        password,
        passwordConfirm,
      });

      if (response.data.status === "success") {
        const token = response.data.token;
        const user = response.data.data.user;
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: { user },
        });
        toast.success("Successfully SignedIn! Also update your Profile.");
        document.cookie = `jwt=${token}; path=/; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()}`;
      } else {
        toast.error("Error Signin!");
        dispatch({ type: "LOADING", payload: { isLoading: false } });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch({ type: "LOADING", payload: { isLoading: false } });
    }
  }

  async function login(username, password) {
    try {
      dispatch({ type: "LOADING", payload: { isLoading: true } });
      const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        username,
        password,
      });

      if (response.data.status === "success") {
        const token = response.data.token;
        const user = response.data.data.user;
        // console.log(user);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user },
        });
        toast.success("Successfully Loggedin");
        document.cookie = `jwt=${token}; path=/; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()}`;
      } else {
        toast.error("Error Login");
        dispatch({ type: "LOADING", payload: { isLoading: false } });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch({ type: "LOADING", payload: { isLoading: false } });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT_SUCCESS" });
    toast.success("LoggedOut");
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        getCookie,
        isLoading,
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
