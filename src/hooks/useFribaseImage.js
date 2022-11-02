import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

function useFribaseImage(
  setValue,
  getValues,
  imageName = null,
  deleteAvatarDoc = null
) {
  const [idUid, setIdUid] = useState("");
  const [changeID, setChangeID] = useState(false);
  const [progressImage, setProgressImage] = useState(0);
  const [imgDone, setImgDone] = useState(false);

  const idUuid = uuidv4();

  useEffect(() => {
    setIdUid(idUuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeID]);

  if (!setValue || !getValues) {
    console.error(
      "useFribaseImage must be passed the setValue param from useForm / react-hook-form"
    );
    return {};
  }

  const handleUploadImage = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, "images/" + file.name + idUid);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressImage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("default");
        }
      },
      (error) => {
        throw new Error(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (downloadURL) {
            setImgDone(true);
            setValue("image", downloadURL);
            console.log("File available at", downloadURL);
          }
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const fileImage = e.target.files[0];
    const imageUrlTemporary = URL.createObjectURL(fileImage);
    if (fileImage) {
      setValue("image", imageUrlTemporary);
      setValue("image_name", `${fileImage.name}${idUid}`);

      handleUploadImage(fileImage);
    }
  };

  const handleRemoveImage = (e) => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      `images/${imageName || getValues("image_name") + idUid}`
    );

    // Delete the file
    deleteObject(imageRef)
      .then(async () => {
        setValue("image", "");
        setProgressImage(0);
        setImgDone(false);
        deleteAvatarDoc && (await deleteAvatarDoc());
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    return;
  };

  const handlechangeID = () => {
    setImgDone(false);
    setChangeID(!changeID);
    setProgressImage(0);
  };
  return {
    handleSelectImage,
    handleRemoveImage,
    progressImage,
    setImgDone,
    imgDone,
    handlechangeID,
  };
}

export default useFribaseImage;
