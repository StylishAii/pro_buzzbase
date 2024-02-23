"use client";
import { fetcher } from "@app/hooks/swrFetcher";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import useSWR from "swr";

const defaultContextValue: UserContextType = {
  state: {
    userId: { id: null, team_id: null },
    usersUserId: { user_id: "" },
  },
  dispatch: () => {},
};

export const UserContext = createContext(defaultContextValue);

const initialState = {
  userId: { id: null, team_id: null },
  usersUserId: { user_id: "" },
};

interface UserProviderProps {
  children: ReactNode;
}

function reducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_USERS_USER_ID":
      return { ...state, usersUserId: action.payload };
    default:
      throw new Error();
  }
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: userId } = useSWR("/api/v1/users/current", fetcher);
  const { data: usersUserId } = useSWR(
    userId ? `/api/v1/users/${userId.id}/show_current_user_id` : null,
    fetcher
  );

  React.useEffect(() => {
    if (userId) dispatch({ type: "SET_USER_ID", payload: userId });
    if (usersUserId)
      dispatch({ type: "SET_USERS_USER_ID", payload: usersUserId });
  }, [userId, usersUserId]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
