import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const About = () => {
  return (
    <section className="flex flex-col xl:flex-row gap-4 md:pt-20">
      <div className="flex-[1.5] w-[80%]">
        <Image
          src="/Group 77.png"
          alt="About"
          width={600}
          height={900}
          className="object-contain"
        />
      </div>

      <div className="flex-1  w-[full]">
        <h2 className="hero__title pb-5 lg:text-[50px] tracking-wider text-[30px] font-semibold">
          Welcome to CareFinder{" "}
        </h2>
        <p className="hero__subtitle pb-5">
          Carefinder is a platform where users can search for hosiptals in their
          areas, export hospital details for your records and enhance your
          healthcare experience by connecting with others and sharing valuable
          resources.
        </p>

        <Button className="custom-btn hover:bg-blue-500">
         OUR SERVICES
          <ArrowRight className="ml-4 lg:h-8 w-12" />
        </Button>
      </div>
    </section>
  );
};

export default About;
