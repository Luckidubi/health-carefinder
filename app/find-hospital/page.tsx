import HospitalCard from '@/components/HospitalCard';
import { hospitals } from '@/constants';
import React from 'react'

const page = () => {
  return (
    <div className="padding-x pt-12 w-full flex flex-col">
      <h4 className="pl-12 text-black text-[20px] sm:text-[30px] font-medium leading-10">
        Hospitals Nearby
      </h4>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6 pt-6 justify-items-center">
        {hospitals.map((item) => (
          <HospitalCard
            key={item.name}
            photo={item.photo}
            name={item.name}
            address={item.address}
          />
        ))}
      </div>
    </div>
  );
}

export default page