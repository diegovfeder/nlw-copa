import { createContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

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

  const signInWithGoogle = async (accessToken: string) => {
    console.log("signInWithGoogle", accessToken);
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
