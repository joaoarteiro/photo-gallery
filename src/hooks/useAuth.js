import { useContext } from "react";
import { AuthContext } from "../context/authentication";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
