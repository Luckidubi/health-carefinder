import LibraryCard from "@/components/LibraryCard";
import { hospitals } from "@/constants";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col py-8 flex-center space-y-2">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
        My Library
      </h2>
      <h3 className="text-center text-neutral-600 text-[18px] font-bold leading-8">
        Book Appointment to visit saved hospitals
      </h3>
      <div className="w-full py-3">
        {hospitals.map((item) => (
          <LibraryCard
            key={item.name}
            photo={item.photo}
            address={item.address}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
