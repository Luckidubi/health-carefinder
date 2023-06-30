import { services } from "@/constants";
import { ServiceCardProps } from "@/types";
import Image from "next/image";
import React from "react";

export const ServiceCard = ({ icon, title, value }: ServiceCardProps) => {
  return (
    <>
      <div className="flex flex-col flex-center gap-6 space-x-6 text-center shadow-md text-slate-500 shadow-slate-200  bg-gray-200 rounded-xl md:w-[300px] xl:w-[345px] w-[300px] h-[275px]">
        {/*  <!-- Icon --> */}
        <figure className="p-6 pb-0 w-20 h-20 bg-blue-900 rounded-full">
          <Image src={icon} alt="service icon" width={56} height={56} />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <h3 className="mb-4 text-xl font-mediumtext-black text-[15px] font-bold leading-snug">
            {title}
          </h3>
          <p className="text-black text-[12px] font-medium leading-none">
            {value}
          </p>
        </div>
      </div>
    </>
  );
};
const Services = () => {
  return (
    <section className="max-width padding-x padding y">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14;">
        {services.map((item) => (
          <ServiceCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
