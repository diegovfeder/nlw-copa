import { useContext } from "react";
import { AuthContext, IAuthContextData } from "../contexts/AuthContext";

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
