import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { useRouter } from "next/compat/router";

const UserContext = createContext();


export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    router.push("/dashboard")
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    router.push("/login")
    // window.location.replace("/login");
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
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
