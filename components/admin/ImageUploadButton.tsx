"use client";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useStorageTask, useStorage, useStorageDownloadURL } from "reactfire";
import type {
  UploadTaskSnapshot,
  UploadTask,
  StorageReference,
} from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner";
import { Input } from "../ui/input";

const UploadProgress = ({ uploadTask, storageRef }: any) => {
  const { status, data: uploadProgress } = useStorageTask<UploadTaskSnapshot>(
    uploadTask,
    storageRef
  );

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const { bytesTransferred, totalBytes } = uploadProgress;

  const percentComplete =
    Math.round(100 * (bytesTransferred / totalBytes)) + "%";
  console.log(`Uploading image: ${percentComplete} complete`);
  return <span>{percentComplete}</span>;
};


interface ImageUploadButtonProps {
  onImageURL: (imageURL: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageURL,
}) => {
  const [uploadTask, setUploadTask] = useState<UploadTask | undefined>(
    undefined
  );
  const [imageRef, setRef] = useState<StorageReference | undefined>(undefined);
  const storage = useStorage();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    const fileToUpload = fileList[0];
    const fileName = fileToUpload.name;
    const newRef = ref(storage, `images/${fileName}`);
    setRef(newRef);

    const uploadTask = uploadBytesResumable(newRef, fileToUpload);

    uploadTask.then((snapshot) => {
      console.log("upload complete");
      setUploadTask(undefined);

     getDownloadURL(snapshot.ref).then((imageUrl) => {
       // Invoke the callback to pass the image URL to the parent component (HospitalForm)
       onImageURL(imageUrl);
     });
    }).catch((error) => {
          console.error("Error uploading image:", error);
          setUploadTask(undefined);
        });
    setUploadTask(uploadTask);
  };

  return (
    <>
      <Input type="file" accept="image/png, image/jpeg" onChange={onChange} />
      {uploadTask ? (
        <UploadProgress uploadTask={uploadTask} storageRef={imageRef} />
      ) : (
        "Start an upload to view progress"
      )}

    </>
  );
};

export default ImageUploadButton;