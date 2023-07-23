"use client"
import LibraryCard from "@/components/LibraryCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLibrary } from "@/hooks";
import { LibraryProps } from "@/models/Library";

import { useSigninCheck } from "reactfire";

const LibraryPage = () => {
  const { data: signinResult } = useSigninCheck();
  const user = signinResult?.user;
  const { library, isLoading, isError }: any = useLibrary(user?.uid || "");

  if (isLoading) {
    return <LoadingSpinner />;
  }


  if(isError){
    return <div className="text-center text-2xl py-6">Something went wrong</div>
  }
console.log(library.length);
    if (!library || !Array.isArray(library) || library.length === 0) {
      return (
        <div className="text-center text-2xl py-6">
          No items in the library.
        </div>
      );
    }
  console.log(library.length);

  if (library.length === 1) {
    console.log(library.length);
    const item = library[0];
    return (
      <div className="flex flex-col py-8 flex-center space-y-2">
        <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
          My Library
        </h2>
        <h3 className="text-center text-neutral-600 text-[18px] font-bold leading-8">
          Saved hospitals
        </h3>
        <div className="w-full py-3">
          <LibraryCard
            key={item.id}
            place_id={item.place_id}
            hospital_photo="/placeholder.png"
            hospital_address={item.hospital_address}
            hospital_name={item.hospital_name}
          />
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col py-8 flex-center space-y-2">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
        My Library
      </h2>
      <h3 className="text-center text-neutral-600 text-[18px] font-bold leading-8">
        Saved hospitals
      </h3>
      <div className="w-full py-3">
        {library.map((item: LibraryProps) => (
          <LibraryCard
            key={item.id}
            place_id={item.place_id}
            hospital_photo="/placeholder.png"
            hospital_address={item.hospital_address}
            hospital_name={item.hospital_name}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
