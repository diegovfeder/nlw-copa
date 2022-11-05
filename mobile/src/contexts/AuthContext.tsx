import { createContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import { api } from "../services/api";

interface IUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface IAuthContextData {
  signed: boolean;
  isLoading: boolean;
  user: IUser;
  signIn(): void;
  signOut(): void;
}

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState<IUser>({
    id: "000000",
    name: "username",
    avatarUrl: "",
  } as IUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId:
      "322330288864-kdrcg2lbf3mccsrdq8usg11evebi9evt.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
    }),
    scopes: ["profile", "email"],
  });

  const signIn = async () => {
    console.log("signIn");

    try {
      setIsLoading(true);
      await promptAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log("signOut");
  };

  const signInWithGoogle = async (access_token: string) => {
    try {
      setIsLoading(true);
      const tokenResponse = await api.post("/users", {
        access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get("/me");
      setuser(userInfoResponse.data.user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (res?.type === "success" && res?.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res]);

  return (
    <AuthContext.Provider
      value={{ signed: !!user, isLoading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
