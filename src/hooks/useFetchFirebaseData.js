import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

function useFetchFirebaseData(id, firebaseCollection) {
  const [data, setData] = useState();
  useEffect(() => {
    const getUserName = async () => {
      if (!id) return;
      const docRef = doc(db, firebaseCollection, id);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setData(snapshot?.data());
      });
      return unsubscribe;
    };
    getUserName();
  }, [id, firebaseCollection]);

  return { data };
}

export default useFetchFirebaseData;
