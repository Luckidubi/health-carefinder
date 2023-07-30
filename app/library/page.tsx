"use client";
import LibraryCard from "@/components/LibraryCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { useLibrary } from "@/hooks";
import { convertToCSV, exportToCSV } from "@/lib/utils";
import { LibraryProps } from "@/models/Library";
import { ref, uploadString } from "firebase/storage";
import { useState } from "react";

import { useSigninCheck, useStorage, } from "reactfire";

const LibraryPage = () => {
  const { data: signinResult } = useSigninCheck();
  const user = signinResult?.user;
  const { library, isLoading, isError }: any = useLibrary(user?.uid || "");
  const storage = useStorage();


  const [csvToSave, setCsvToSave] = useState("");
  const { toast } = useToast();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-2xl py-6">No items in the library</div>
    );
  }
  console.log(library.length);
  if (!library || !Array.isArray(library) || library.length === 0) {
    return (
      <div className="text-center text-2xl py-6">No items in the library.</div>
    );
  }
  console.log(library.length);

  async function saveToFirebaseStorage() {
    try {
      const newRef = ref(storage, `library/${user?.uid}.csv`);

      const uploadTask = uploadString(newRef, csvToSave, "raw", {
        contentType: "text/csv",
      });

      uploadTask.then(() => {
        console.log("upload complete");
      });
    } catch (error) {}
  }

  const handleLibraryExport = async () => {
    try {
      const res = await fetch(`/api/library/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(library),
      });

      const csvData = await res.json();
      console.log("csv", csvData);
      exportToCSV(csvData);
      const csvFile = convertToCSV(csvData);
      setCsvToSave(csvFile);
      // Save to firebase storage
      await saveToFirebaseStorage();
    } catch (error) {
      toast({
        title: "Failed to export",
        variant: "destructive",
      });

      console.log(error);
    }
  };

  const handleDelete = async (library: LibraryProps) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this hospital?"
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/library/${library._id.toString()}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          toast({
            title: "Deleted Successfully",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to delete try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col py-8 flex-center space-y-2">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
        My Library
      </h2>
      <h3 className="text-center text-neutral-600 text-[18px] font-bold leading-8">
        Saved hospitals
      </h3>
      <div className="w-full py-3 flex flex-col ">
        <a
          onClick={handleLibraryExport}
          className="cursor-pointer hover:underline"
        >
          Download as CSV
        </a>
      </div>
      <div className="w-full py-3">
        {library.map((item: LibraryProps) => (
          <LibraryCard
            key={item.place_id}
            place_id={item.place_id}
            hospital_photo="/placeholder.png"
            hospital_address={item.hospital_address}
            hospital_name={item.hospital_name}
            handleDelete={() => handleDelete(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
