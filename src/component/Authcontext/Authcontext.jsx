import { createContext , useState } from "react";

export let Authcontext = createContext();

export default function Authcontextprovider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token")??"");

  return (
    <Authcontext.Provider value={{ userToken, setUserToken }}>
      {children}
    </Authcontext.Provider>
  );
}
