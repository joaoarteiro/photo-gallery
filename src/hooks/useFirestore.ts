import { useState, useEffect } from "react";
import { dataBase } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

type Image = {
  url: string;
  createdAt: Date;
  uploadedBy: string;
};

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: any;
    const getData = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(dataBase, collectionName),
          orderBy("createdAt", "desc")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images: any = [];
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
