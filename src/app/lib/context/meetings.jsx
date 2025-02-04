import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const BRAINSNACK_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID; // Replace with your database ID
export const MEETINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MEETINGS_ID; // Replace with your collection ID


const MeetingsContext = createContext();


export function useMeetings() {
  return useContext(MeetingsContext);
}

export function MeetingsProvider(props) {
  const [Meetings, setMeetings] = useState([]);

  async function add(meeting) { 
    try {
      const response = await databases.createDocument(
        BRAINSNACK_DATABASE_ID,
        MEETINGS_COLLECTION_ID,
        ID.unique(),
        meeting
      );
      setMeetings((meeting) => console.log(response, meeting));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(BRAINSNACK_DATABASE_ID, MEETINGS_COLLECTION_ID, id);
      setMeetings((Meetings) => Meetings.filter((meeting) => meeting.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        BRAINSNACK_DATABASE_ID,
        MEETINGS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setMeetings(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <MeetingsContext.Provider value={{ current: Meetings, add, remove }}>
      {props.children}
    </MeetingsContext.Provider>
  );
}
