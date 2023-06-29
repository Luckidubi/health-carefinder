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
      <div className="flex-1 pt-20 sm:pt-36 padding-x">
        <h1 className="hero__title">
        Find the nearest hospital to you and make an appointment        </h1>
        <p className="hero__subtitle">
        Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
        </p>

        <CustomButton
          btnType="button"
          title="Get Started"
          containerStyles="bg-blue-900 text-white rounded-full mt-10"
          handleClick={handleScroll}

        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/Rectangle 1.png" alt="hero image" fill className="object-contain" />
        </div>

      </div>
    </div>
  );
};

export default Hero;