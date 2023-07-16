"use client";
import {ArrowRight, } from "lucide-react";
import Image from "next/image";

import { Button } from "./ui/button";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="hero bg-gray-200 ">
      <div className="flex-[1.5] pt-20 padding-x w-full mr-[xl]">
        <h1 className="hero__title pb-5 text-blue-900">
          Find the nearest hospital to you and make an appointment{" "}
        </h1>
        <p className="hero__subtitle pb-5 font-semibold">
          Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
        </p>

        <Button onClick={handleScroll} className="custom-btn hover:bg-blue-500">
          GET STARTED
          <ArrowRight className="ml-4 lg:h-8 w-12" />
        </Button>
      </div>
      <div className="hero__image-container lg:pt-20 pt-10 mb-[-500px] xl:mb-[-10px] w-full ">
        <div className="hero__image hidden xl:block ">
          <Image
            src="/Rectangle 1.png"
            alt="hero image"
            height={300}
            width={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;