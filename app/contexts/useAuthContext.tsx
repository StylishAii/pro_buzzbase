"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { confirmAccountApi } from "@app/services/authService";

const AuthContext = createContext<{
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  confirmationMessage: string | null;
  confirmationError: string | null;
  confirmAccount: (token: string) => Promise<void>;
}>({
  isLoggedIn: undefined,
  setIsLoggedIn: () => {},
  confirmationMessage: null,
  confirmationError: null,
  confirmAccount: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [confirmationError, setConfirmationError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = Cookies.get("access-token");
      const client = Cookies.get("client");
      const uid = Cookies.get("uid");
      const baseURL = process.env.NEXT_PUBLIC_API_URL;

      if (accessToken && uid && client) {
        try {
          await axios.get(`${baseURL}/api/v1/auth/validate_token`, {
            headers: {
              "access-token": accessToken,
              client: client,
              uid: uid,
            },
          });
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    validateToken();
  }, []);

  const confirmAccount = async (token: string) => {
    try {
      const response = await confirmAccountApi(token);
      console.log("Response data:", response.data);
      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        setConfirmationMessage(response.data.message);
      }
    } catch (error: any) {
      console.error("Error:", error.response || error);
      setConfirmationError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        confirmationMessage,
        confirmationError,
        confirmAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
