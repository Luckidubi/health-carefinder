"use client";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="hero">
      <div className="flex-1 pt-20 padding-x ">
        <h1 className="hero__title pb-5">
        Find the nearest hospital to you and make an appointment        </h1>
        <p className="hero__subtitle pb-5">
        Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
        </p>

        <CustomButton
          btnType="button"
          title="Get Started"
          containerStyles="bg-blue-900 text-white rounded-full mt-10"
          handleClick={handleScroll}

        />
      </div>
      <div className="hero__image-container pt-20">
        <div className="hero__image">
          <Image src="/Rectangle 1.png" alt="hero image"  height={600} width={700} className="object-contain" />
        </div>

      </div>
    </div>
  );
};

export default Hero;