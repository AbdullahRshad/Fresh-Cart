import React, { useContext } from "react";
import { Authcontext } from "../Authcontext/Authcontext";
import Login from "../login/Login";

export default function Protectedroute({ children }) {
  const { userToken } = useContext(Authcontext);
  return <>{userToken ? children : <Login/>}</>;
}
