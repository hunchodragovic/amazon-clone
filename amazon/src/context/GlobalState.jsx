import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { initialState } from "./AppReducer";
import { auth } from "../config/firebase"; // Import Firebase auth

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "SET_USER", user });
    });
    return unsubscribe;
  }, []);

  return (
    <GlobalContext.Provider
      value={{ basket: state.basket, user: state.user, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export const useAuth = () => {
  return useContext(GlobalContext);
};
