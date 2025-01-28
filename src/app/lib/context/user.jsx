import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";


const UserContext = createContext();


export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);


  async function login(email, password) {
    try {
      const currentSession = await account.get()
      if (currentSession) {
        window.location.href = "/dashboard"
        return
      }
      const loggedIn = await account.createEmailPasswordSession(email, password);
      setUser(loggedIn);
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.type !== "user_session_already_exists") {
        console.error("Login error:", error);
        throw error;
      }
      window.location.href = "/dashboard";
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    window.location.replace("/login");
  }

  async function register(email, password, name) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password, name);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
      window.location.href = '/login'
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    init();
  }, []);

  // if (isLoading) {
  //   return null
  // }

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
