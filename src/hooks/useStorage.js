import { useState, useEffect } from "react";
import { bucket, dataBase } from "../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { collection, doc, addDoc } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(bucket, `images/${file.name}`);

    // metadata
    const metadata = {
      contentType: file.type,
    };
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setError("No permission");
            break;
          case "storage/canceled":
            // User canceled the upload
            setError("Upload canceled");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            setError("Unknown storage");
            break;
        }
      },
      async () => {
        try {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);

          // Store data in database
          await addDoc(collection(dataBase, "images"), {
            url: downloadURL,
            createdAt: new Date(),
          });
        } catch (error) {
          setError(error);
          console.error("Error occurred while uploading document: ", error);
        }
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
