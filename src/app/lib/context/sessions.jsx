import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const BRAINSNACK_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID; // Replace with your database ID
export const SESSIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SESSIONS_ID; // Replace with your collection ID


const SessionContext = createContext();


export function useSessions() {
  return useContext(SessionsContext);
}

export function SessionsProvider(props) {
  const [sessions, setSessions] = useState([]);

  async function add(session) { 
    try {
      const response = await databases.createDocument(
        BRAINSNACK_DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response, ...ideas].slice(0, 10));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <SessionsContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </SessionsContext.Provider>
  );
}
