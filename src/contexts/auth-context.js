import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();

function AuthProvider({ children, ...props }) {
  const [userInfo, setUserInfo] = useState({});

  const handleSetUserInfo = (user) => {
    setUserInfo(user);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (auth) => {
      setUserInfo(auth);
    });
  }, []);

  const value = { userInfo, handleSetUserInfo };
  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext  must be used within AuthProvider");

  return context;
}

export { AuthProvider, useAuthContext };
