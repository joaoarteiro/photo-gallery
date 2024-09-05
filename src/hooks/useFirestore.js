import { useState, useEffect } from "react";
import { dataBase } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;
    const getData = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(dataBase, collectionName),
          orderBy("createdAt")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            images.push(doc.data());
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching images: ", error);
      }
    };
    getData();

    //cleanup func
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);
  return { docs, isLoading };
};

export default useFirestore;
